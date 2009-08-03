package org.scala_tools.vscaladoc

import java.net.{URI}
import scala.xml.{NodeSeq, Text, Unparsed, Node, Elem, Group}

abstract
class Page4AllClasses(env : HtmlPageHelper) extends HtmlPage(env) {
  val uri = new URI("site:/all-classes.html")
  override def title = "List of all classes and objects"

  override def header = Some(
    <xml:group>
      <link rel="stylesheet" href={relativize("site:/all-classes.css")} type="text/css"/>
      <script id="all-classes" src={relativize("site:/all-classes.js")}></script>
    </xml:group>
  )

  override def body = Some(
    <body>
      {filtersBody}
      {classesBody}
    </body>
  )

  //TODO : bind onchange, onclick from js
  private def filtersBody: NodeSeq = {
//          <a id="filterAll" href="#" onclick="showAll()" title="All">[A]</a>
//          <a id="filterNode" href="#" onclick="hideAll()" title="None">[N]</a>
    <xml:group>
      <h2>Filters</h2>
      <div class="ctrl">
        <select id="packagesFilter" multiple="true" size="6.5">
          {packagesOption.toList.sort(_.child(0).first.text < _.child(0).first.text)}
        </select>
        <div id="kindFilters">
          <a id="filter_class" class="class" href="#" title="Class">Class<input type="checkbox" checked="true" id="filter_class_cb"/></a>
          <a id="filter_trait" class="trait" href="#" title="Trait">Trait<input type="checkbox" checked="true" id="filter_trait_cb"/></a>
          <a id="filter_object" class="object" href="#" title="Object">Object<input type="checkbox" checked="true" id="filter_object_cb"/></a>
        </div>
        <input id="nameFilter" type="text"/><br/>
        <a href="#" onclick="$('#userOptions').toggle()">Options</a><br/>
        <div id="userOptions" style="text-align:left">
          <a class="btnOption" href="#" onclick="togglefilter4NameOptions('filter4NameIgnoreCase')"><input type="checkbox" checked="false" class="option_filter4NameIgnoreCase_cb"/>Name filter ignore case</a><br/>
          <a class="btnOption" href="#" onclick="togglefilter4NameOptions('filter4NameAsRegExp')"><input type="checkbox" checked="false" class="option_filter4NameAsRegExp_cb"/>Name filter is reg. exp.</a><br/>
        </div>
      </div>
    </xml:group>
  }

  // <a href={urlFor(cls)} target={contentFrame} title={cls.fullName('.')}>{cls.name}</a>
  //TODO add support from NamePlus
  private def classesBody: NodeSeq = {
    val namePlusMap = new scala.collection.mutable.HashMap[String, String]()
    def findName(li : Node) : String = li.child(0).first.text
    def findKind(li : Node) : String = li.attribute("title").map(_.first.text).getOrElse("")
    def findFullName(li : Node) : String = li.child(0).first.attribute("title").map(_.first.text).getOrElse("")
    def compare(li1: Node, li2: Node) = {
      val n1 = findName(li1).toLowerCase
      val n2 = findName(li2).toLowerCase
      if ( n1 == n2) {
        val f1 = findFullName(li1)
        val f2 = findFullName(li2)
        namePlusMap(f1) = f1.substring(0, f1.length - n1.length)
        namePlusMap(f2) = f2.substring(0, f2.length - n2.length)
        if (f1 != f2) {
          f1.toLowerCase < f2.toLowerCase
        } else {
          findKind(li1) < findKind(li2)
        }
      } else {
        n1 < n2
      }
    }
    <xml:group>
      <h2>Classes</h2>
      <ul id="classes">
        {
          classesLi.toList.sort((li1, li2) => compare(li1, li2)).map{ li =>
            Elem(li.prefix, li.label, li.attributes, li.scope, Group(List(li.child(0), Text(namePlusMap.get(findFullName(li)).map(" ("+_+")").getOrElse("")))))
          }
        }
      </ul>
    </xml:group>
  }

  protected
  def packagesOption : NodeSeq

  protected
  def classesLi : NodeSeq

}

class Page4AllClassesOnXml(env : HtmlPageHelper, val packagesOption : NodeSeq, val classesLi : NodeSeq) extends Page4AllClasses(env)

class Page4AllClassesOnModel(env : HtmlPageHelper, allPackages: Iterable[ModelExtractor#Package], allClasses: Iterable[ModelExtractor#ClassOrObject]) extends Page4AllClasses(env) {
  protected
  def packagesOption = {
    <xml:group>{allPackages.map(pkg => <option value="{pkg.name}">{pkg.name}</option>)}</xml:group>
  }

  protected
  def classesLi = {
//    val namePlusMap = new scala.collection.mutable.HashMap[String, String]()
    def css(cls: ModelExtractor#ClassOrObject) = cls.kind
//    def compare(t1: ModelExtractor#ClassOrObject, t2: ModelExtractor#ClassOrObject) = {
//      if (t1.name.toLowerCase == t2.name.toLowerCase) {
//        val f1 = t1.fullName('.')
//        val f2 = t2.fullName('.')
//        if (f1 != f2) {
//          namePlusMap(f1) = f1.substring(0, f1.length-t1.name.length)
//          namePlusMap(f2) = f2.substring(0, f2.length-t2.name.length)
//          f1.toLowerCase < f2.toLowerCase
//        } else {
//          t1.kind < t2.kind
//        }
//      } else {
//        t1.name.toLowerCase < t2.name.toLowerCase
//      }
//    }
//
//    val classes = allClasses.toList.sort((t1, t2) => compare(t1,t2))
    allClasses.toList.map(cls => <li class={css(cls)} title={css(cls)} package={env.modelHelper.packageFor(cls.sym).get.fullNameString('.')}>{env.linkHelper.link(cls, this.uri, None, Some("contentFrame"))}</li>)
  }
}