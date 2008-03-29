package org.scala_tools.vscaladoc

import scala.tools.nsc._

import java.io.{File, FileWriter}
import java.net.{URI, URLEncoder}

//import scala.collection.jcl
//import scala.compat.Platform.{EOL => LINE_SEPARATOR}
import scala.xml.{NodeSeq, Text, Unparsed, Utility}

/**
 * @author David Bernard
 */
trait HtmlPage {
  /** to override */
  def uri: URI
  /** to override */
  def title: String = Services.cfg.windowTitle
  /** to override */
  def header: Option[NodeSeq] = None
  /** to override */
  def body: Option[NodeSeq] = None

  def relativize(that: URI) : String = Services.linkHelper.relativize(that, this.uri).getOrElse("#")
  def relativize(that: String) : String = relativize(new URI(that))

  def htmlize(comment: Option[ModelExtractor#Comment]) : NodeSeq = htmlize(comment, true)

  //TODO group attr.tag with same value
  def htmlize(comment: Option[ModelExtractor#Comment], splitDetails: Boolean) : NodeSeq = {
    def listAttributes(c: ModelExtractor#Comment) = {
      if (c.attributes.filter(_.body.trim.length > 0).isEmpty) {
        NodeSeq.Empty
      } else {
       var last = ""
       <dl>{c.attributes.sort(_.tag < _.tag).filter(_.body.trim.length > 0).map(attr => <xml:group>
         {
           if (last != attr.tag) {
             last = attr.tag
             <dt>{attr.tag}</dt>
           } else {
             NodeSeq.Empty
           }
         }
          <dd><code>{attr.option}</code> - {Unparsed(attr.body)}</dd>
          </xml:group>)
        }</dl>
      }
    }
    def display(c: ModelExtractor#Comment) = {
      <div class="apiComments">
        {Unparsed(c.body)}
        {listAttributes(c)}
      </div>
    }
    def displayWithDetails(c: ModelExtractor#Comment) = {
      var detailsPos = c.body.indexOf('.')
      if (c.body.startsWith("<p>")) detailsPos= c.body.indexOf("</p>") + 3
      if (detailsPos == -1) {
        detailsPos = c.body.length
      }
      val first = c.body.substring(0, detailsPos)
      val details = if ((detailsPos+1) < c.body.length) c.body.substring(detailsPos+1).trim else ""
      <div class="apiComments">
        {Unparsed(first)}
        { if ((details.length > 0) || (c.attributes.filter(_.body.trim.length > 0).size > 0)) {
            <xml:group>
              <a href="javascript://" onclick="jQuery(this).next().toggle()" class="detailsBtn">[details]</a>
              <div class="apiCommentsDetails">
                {Unparsed(details)}
                {listAttributes(c)}
              </div>
            </xml:group>
          } else {
            NodeSeq.Empty
          }
        }
      </div>
    }

    comment match {
      case Some(c: ModelExtractor#Comment) => {
        if (splitDetails) {
          displayWithDetails(c)
        } else {
          display(c)
        }
      }
      case None => NodeSeq.Empty
    }
  }

  val dtype = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">"
  val encoding = Services.cfg.encodingString
  val header0 =
    <xml:group>
      <title>{Text(title)}</title>
      <meta http-equiv="content-type" content={"text/html; charset=" + encoding}/>
      <meta name="generator" content={System.getProperty("doc.generator", "scaladoc (" + Services.cfg.versionString + ")")}/>
      <script type="text/javascript" src={relativize("site:/jquery-1.2.3.js")}></script>
    </xml:group>

  def html =
    <html>
      <head>
      {header0}
      {header.getOrElse(NodeSeq.Empty)}
      </head>
      {body.getOrElse(NodeSeq.Empty)}
    </html>

  def save(rootDir: File) = {
    val file = new File(rootDir, uri.getPath.substring(1))
    val parent = file.getParentFile()
    if (!parent.exists()) parent.mkdirs()
    val writer = new FileWriter(file)
    try {
      writer.write(dtype)
      writer.append(scala.compat.Platform.EOL)
      writer.append(html.toString())
    } finally {
      writer.close()
    }
  }
}

class Page4Blank(filename: String) extends HtmlPage {
  def uri = new URI("site:" + filename)
  override def body = Some(<body/>)
}

class Page4Index(navFrame: HtmlPage, contentFrame: HtmlPage) extends HtmlPage {
  def uri = new URI("site:/index.html")
  override def body = Some(
    <frameset cols="250px, *">
      <frame src={relativize(navFrame.uri)} name="navFrame" scrolling="yes"/>
      <frame src={relativize(contentFrame.uri)} name="contentFrame" scrolling="yes"/>
    </frameset>
  )
}


class Page4AllClasses(allPackages: Iterable[ModelExtractor#Package], allClasses: Iterable[ModelExtractor#ClassOrObject]) extends HtmlPage {
  def uri = new URI("site:/all-classes.html")
  override def title = "List of all classes and objects"

  override def header = Some(
    <xml:group>
      <link rel="stylesheet" href={relativize("site:/all-classes.css")} type="text/css"/>
      <script id="all-classes" src={relativize("site:/all-classes.js")}></script>
    </xml:group>
  )

  override def body = Some(
    <xml:group>
      {filtersBody}
      {classesBody}
    </xml:group>
  )

  //TODO : bind onchange, onclick from js
  private def filtersBody: NodeSeq = {
//          <a id="filterAll" href="#" onclick="showAll()" title="All">[A]</a>
//          <a id="filterNode" href="#" onclick="hideAll()" title="None">[N]</a>
    <xml:group>
      <h2>Filters</h2>
      <div class="ctrl">
        <select id="packagesFilter" multiple="true" size="6.5">
          {allPackages.map(pkg => <option>{pkg.name}</option>)}
        </select>
        <div id="kindFilters">
          <a id="filter_class" class="class" href="#" title="Class">Class<input type="checkbox" checked="true" id="filter_class_cb"/></a>
          <a id="filter_trait" class="trait" href="#" title="Trait">Trait<input type="checkbox" checked="true" id="filter_trait_cb"/></a>
          <a id="filter_object" class="object" href="#" title="Object">Object<input type="checkbox" checked="true" id="filter_object_cb"/></a>
        </div>
        <input id="nameFilter" type="text"/>
      </div>
    </xml:group>
  }

  // <a href={urlFor(cls)} target={contentFrame} title={cls.fullName('.')}>{cls.name}</a>
  private def classesBody: NodeSeq = {
    val namePlusMap = new scala.collection.mutable.HashMap[String, String]()
    def compare(t1: ModelExtractor#ClassOrObject, t2: ModelExtractor#ClassOrObject) = {
      if (t1.name.toLowerCase == t2.name.toLowerCase) {
        val f1 = t1.fullName('.')
        val f2 = t2.fullName('.')
        if (f1 != f2) {
          namePlusMap(f1) = f1.substring(0, f1.length-t1.name.length)
          namePlusMap(f2) = f2.substring(0, f2.length-t2.name.length)
          f1.toLowerCase < f2.toLowerCase
        } else {
          t1.kind < t2.kind
        }
      } else {
        t1.name.toLowerCase < t2.name.toLowerCase
      }
    }
    val classes = allClasses.toList.sort((t1, t2) => compare(t1,t2))
    def css(cls: ModelExtractor#ClassOrObject) = cls.kind
    <xml:group>
      <h2>Classes</h2>
      <ul id="classes">
      {classes.map(cls => <li class={css(cls)} title={css(cls)} package={Services.modelHelper.packageFor(cls.sym).get.fullNameString('.')}>{Services.linkHelper.link(cls, this.uri, None, Some("contentFrame"))}{namePlusMap.get(cls.fullName('.')).map(" ("+_+")").getOrElse("")}</li>)}
      </ul>
    </xml:group>
  }

}

//TODO manage next and prev (as meta link and navbar)
/*
      <script id="shCore.js" src={relativize("site:/_highlighter/shCore.js")} language='javascript' ></script>
      <script id="shBrushCSharp.js" src={relativize("site:/_highlighter/shBrushCSharp.js")} language='javascript' ></script>
      <script id="shBrushJava.js" src={relativize("site:/_highlighter/shBrushJava.js")} language='javascript' ></script>
      <script id="shBrushScala.js" src={relativize("site:/_highlighter/shBrushScala.js")} language='javascript' ></script>
      <script id="shBrushShell.js" src={relativize("site:/_highlighter/shBrushShell.js")} language='javascript' ></script>
      <script id="shBrushSql.js" src={relativize("site:/_highlighter/shBrushSql.js")} language='javascript' ></script>
      <script id="shBrushXml.js" src={relativize("site:/_highlighter/shBrushXml.js")} language='javascript' ></script>
*/
abstract class ContentPage extends HtmlPage{
   def surroundHeader(nodes: Option[NodeSeq]) = Some(
    <xml:group>
      <link rel="stylesheet" href={relativize("site:/content.css")} type="text/css"/>
      <script id="content.js" src={relativize("site:/content.js")} language='javascript' ></script>
      <link rel='stylesheet' href={relativize("site:/_highlighter/SyntaxHighlighter.css")} type='text/css'/>
      <script id="shAll.js" src={relativize("site:/_highlighter/shAll.js")} language='javascript' ></script>
      {nodes.getOrElse("")}
    </xml:group>
  )

  def surroundBody(nodes: Option[NodeSeq]) = Some(
    <xml:group>
      <div class="header">{Services.cfg.pageHeader}</div>
      <!-- ========= START OF TOP NAVBAR ======= -->
      <a name="navbar_top"><!-- --></a>
      {navBar}
      <!-- ========= END OF TOP NAVBAR ========= -->
      {nodes.getOrElse("")}
      <!-- ======= START OF BOTTOM NAVBAR ====== -->
      <a name="navbar_bottom"><!-- --></a>
      {navBar}
      <!-- ======== END OF BOTTOM NAVBAR ======= -->
      {Services.cfg.pageFooter}
      <script language='javascript'>
        dp.SyntaxHighlighter.ClipboardSwf = '{relativize("site:/_highlighter/clipboard.swf")}';
        dp.SyntaxHighlighter.HighlightAll('code');
      </script>
    </xml:group>
  )

  def navBar = {
    <table border="0" width="100%" cellpadding="1" cellspacing="0" class="NavBar">
      <tr>
        <td class="NavBarCell1">{navBarCell1}</td>
        <td class="NavBarCell2">{navBarCell2}</td>
        <td class="NavBarCell3">{navBarCell3}</td>
      </tr>
    </table>
  }

  def navBarCell1 : NodeSeq = NodeSeq.Empty
  def navBarCell2 : NodeSeq = {
    <xml:group>
      <a href={relativize("site:/index.html")} target="_top">FRAMES</a>
      &nbsp;&nbsp;
      <a href={val path=uri.getPath; path.substring(path.lastIndexOf('/')+1)} target="_top">NO FRAMES</a>
    </xml:group>
  }
  def navBarCell3 : NodeSeq = NodeSeq.Empty


}

class Page4Overview(allPackages: Iterable[ModelExtractor#Package]) extends ContentPage {
  def uri = new URI("site:/overview.html")
  override def title = super.title + " : Overview"
  override def header = surroundHeader(None)
  override def body = surroundBody(Some(
    <xml:group>
      {pageTitle}
      {overviewComment}
      {packages}
    </xml:group>
  ))

  private def pageTitle: NodeSeq = {<h1>{Services.cfg.overviewTitle}</h1>}

  /**
   * workaround because compiler doesn't read overview.html
   */
  private def overviewComment: NodeSeq = <div>{Unparsed(Services.fileHelper.readTextFromSrcDir("overview.html").getOrElse(""))}</div>

  private def packages = {
    <div>
      <h2>Packages</h2>
      <dl>
        {allPackages.map(
          pkg => <xml:group>
            <dt><a href={"javascript:selectPackage('" +pkg.name + "')"}>{pkg.name}</a></dt>
            <dd>
              {htmlize(pkg.decodeComment)}
              { //workaround because compiler doesn't read package.html
                val path = pkg.fullName('/') + "/package.html"
                Unparsed(Services.fileHelper.readTextFromSrcDir(path).getOrElse(""))
              }
            </dd>
          </xml:group>)
        }
      </dl>
    </div>
  }
}


