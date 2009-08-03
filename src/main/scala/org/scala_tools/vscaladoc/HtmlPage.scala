package org.scala_tools.vscaladoc

import scala.tools.nsc._

import java.io.{File, FileWriter}
import java.net.{URI, URLEncoder}

//import scala.collection.jcl
//import scala.compat.Platform.{EOL => LINE_SEPARATOR}
import scala.xml.{NodeSeq, Text, Unparsed, Utility}


abstract
class HtmlPage(env : HtmlPageHelper) {
  /** to override */
  def uri: URI
  /** to override */
  def title: String = env.windowTitle
  /** to override */
  def header: Option[NodeSeq] = None
  /** to override */
  def body: Option[NodeSeq] = None

  def relativize(that: URI) : String = env.linkHelper.relativize(that, this.uri).getOrElse("#")
  def relativize(that: String) : String = relativize(new URI(that))

  val dtype = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">"
  def header0 =
    <xml:group>
      <title>{Text(title)}</title>
      <meta http-equiv="content-type" content={"text/html; charset=" + env.encodingString}/>
      <meta name="generator" content={System.getProperty("doc.generator", "scaladoc (" + env.versionString + ")")}/>
      <script type="text/javascript" src={relativize("site:/jquery-1.3.2.js")}></script>
    </xml:group>

  def html =
    <html>
      <head>
      {header0}
      {header.getOrElse(NodeSeq.Empty)}
      </head>
      {body.getOrElse(NodeSeq.Empty)}
    </html>

}

class Page4Blank(env : HtmlPageHelper, filename: String) extends HtmlPage(env) {
  def uri = new URI("site:" + filename)
  override def body = Some(<body/>)
}

class Page4Index(env : HtmlPageHelper, navFrame: HtmlPage, contentFrame: HtmlPage) extends HtmlPage(env) {
  val uri = new URI("site:/index.html")
  override def body = Some(
    <frameset cols="250px, *">
      <frame src={relativize(navFrame.uri)} name="navFrame" scrolling="yes"/>
      <frame src={relativize(contentFrame.uri)} name="contentFrame" scrolling="yes"/>
    </frameset>
  )
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
abstract
class ContentPage(env : HtmlPageHelper) extends HtmlPage(env){
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
    <body>
      <div class="header">{env.pageHeader}</div>
      <!-- ========= START OF TOP NAVBAR ======= -->
      <a name="navbar_top"><!-- --></a>
      {navBar}
      <!-- ========= END OF TOP NAVBAR ========= -->
      {nodes.getOrElse("")}
      <!-- ======= START OF BOTTOM NAVBAR ====== -->
      <a name="navbar_bottom"><!-- --></a>
      {navBar}
      <!-- ======== END OF BOTTOM NAVBAR ======= -->
      {env.pageFooter}
      <script language='javascript'>
        dp.SyntaxHighlighter.ClipboardSwf = '{relativize("site:/_highlighter/clipboard.swf")}';
        dp.SyntaxHighlighter.HighlightAll('code');
      </script>
    </body>
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

