package org.scala_tools.vscaladoc

import scala.tools.nsc.symtab
import scala.xml.{NodeSeq, Text}
import scala.tools.nsc.symtab.Symbols
import scala.tools.nsc.symtab.Types

class Page4ClassOrObject(cls: ModelExtractor#ClassOrObject, allClasses: Iterable[ModelExtractor#ClassOrObject]) extends ContentPage {
  case class Member(entity: ModelExtractor#Entity, inheritedFrom:Option[Symbols#Symbol]);

  def uri = Services.linkHelper.uriFor(cls).getOrElse(null)
  def link(tpe: Types#Type) = Services.linkHelper.link(uri)(tpe)

  override def title = super.title + " : " + cls.fullName('.')

  override def header = surroundHeader(None)
  override def body = surroundBody(Some(
    <xml:group>
      <!-- ======== START OF CLASS DATA ======== -->
      <h2>
      <span style="font-size:80%">{cls.fullName('.')}</span>
      <br/>
      {cls.kind} {cls.name}
      </h2>
      <div id="intro">
      {signatureFor(cls)}
      {extendsFor(cls)}
      <br/>
      {htmlize(cls.decodeComment, false)}
      <br/>
      {linkToCompanion}
      {linkToSource}
      </div>
      {directKnownSubclasses}
      {nestedClasses}
      {section("Constructors", Services.modelHelper.isConstructor, asXmlConstructor)}
      {section("Fields", Services.modelHelper.isField, asXmlField)}
      {section("Methods", Services.modelHelper.isMethod, asXmlField)}
      <!-- ========= END OF CLASS DATA ========= -->
    </xml:group>
  ))

  //TODO: create a UML graph (with graphviz or txt)
  def extendsFor(entity: ModelExtractor#Entity) : NodeSeq = {
    if (entity.parents.isEmpty) NodeSeq.Empty
    else {
      <code class="signature">
        <br/>&nbsp;extends
        {DocUtil.NodeWrapper(entity.parents.elements.map(_.normalize)).mkXML(Text(""), Text(" with "), Text(""))({v=> link(v)})}
      </code>
    }
  }

  //TODO: to implement Direct Know Subclasses
  def directKnownSubclasses : NodeSeq = {
    val subClasses = Services.modelHelper.findSubClassesOf(cls)
    if (!subClasses.isEmpty) {
      <xml:group>
        <h3>Direct Known Subclasses</h3>
        {subClasses.map(m => Services.linkHelper.link(m, uri, None, None) ++ Text(", "))}
      </xml:group>
    } else {
      NodeSeq.Empty
    }
  }

  //def inheritanceGraph : NodeSeq = Text(Services.modelHelper.inheritanceGraphOf(cls))

  def nestedClasses : NodeSeq = {
    val nclasses = findMembers(Services.modelHelper.isNestedClass, true)
    if (nclasses.length > 0) {
      <xml:group>
        <h3>Nested Classes</h3>
        {nclasses.map(m => Services.linkHelper.link(m.entity, uri, None, None) ++ Text(", "))}
      </xml:group>
    } else {
      NodeSeq.Empty
    }
  }

  def linkToCompanion : NodeSeq = {
    val src = cls.sym.sourceFile
    val line = cls.sym.pos.line
    Services.modelHelper.findCompanionOf(cls, allClasses)
      .map(u => Text("Companion: ") ++ Services.linkHelper.link(u, uri, None, None) ++ <br/>)
      .getOrElse(NodeSeq.Empty)
  }

  def linkToSource : NodeSeq = {
    val src = cls.sym.sourceFile
    val line = cls.sym.pos.line
    Services.sourceHtmlizer.scalaToHtml(src.file)
      .flatMap(f => Services.linkHelper.uriFor(f))
      .map(u => Text("Source :") ++ <a href={relativize(u)+"#"+line}>{Text(src.name + line.map("(" + _ +")").getOrElse(""))}</a>)
      .getOrElse(NodeSeq.Empty)
  }

  def section(subtitle: String, filter: ModelExtractor#ClassOrObject#Member=> Boolean, renderer: Member => NodeSeq) = {
    val items = findMembers(filter, true)
    if (items.length > 0) {
      <xml:group>
        <!-- =========== {subtitle} =========== -->
        <h3><a name={subtitle}>&nbsp;</a>{subtitle}</h3>
        <table border="1" width="100%" cellpadding="3" cellspacing="0" summary="">
        <tbody class="TableRowColor">
        {items.map(renderer(_))}
        </tbody>
        </table>
      </xml:group>
    } else {
      NodeSeq.Empty
    }
  }

  /**
   * generate a a filtered list of Members (ordored by name)
   */
   def findMembers(filter: ModelExtractor#ClassOrObject#Member=> Boolean, includeInherited: Boolean): List[Member] = {
    //var back = cls.members0(filter).map(Member(_, None)).toList
    var back = (for ((tpe, member) <- cls.decls; if filter(member)) yield Member(member, None)).toList
    if (includeInherited) {
      back = back ::: (for ((tpe,members) <- cls.inherited; member <- members.filter(m => filter(m))) yield Member(member, Some(tpe))).toList
    }
    back.sort(_.entity.name < _.entity.name)
  }

  def asXmlConstructor(member: Member) = {
    val entity = member.entity
    <tr class={member.inheritedFrom.map(v => "isInherited").getOrElse("") + (if (entity.sym.isDeprecated) " isDeprecated" else "")}>
      <td class="signature">
        {signatureFor(entity)}
        {htmlize(entity.decodeComment)}
      </td>
    </tr>
  }

//"sym :" + entity.sym + "|flagsString:" + entity.flagsString + "|kind:" + entity.kind + "|resultType:" + entity.resultType
  //TODO: manage deprecated
  //TODO: manage override
  def asXmlField(member: Member) = {
    val entity = member.entity
    val isDeprecated = if ((entity.sym.isDeprecated) || (entity.decodeComment.map(_.attributes.exists(_.tag.toLowerCase == "deprecated")).getOrElse(false))) " isDeprecated" else ""
    val isInherited = member.inheritedFrom.map(v => "isInherited").getOrElse("")
    <tr class={isInherited + isDeprecated}>
      <td class="name">
        <b>{entity.name}</b>
      </td>
      <td class="signature">
        {signatureFor(entity)}
        {codeAsDoc(entity)}
        {htmlize(entity.decodeComment)}
      </td>
      <td class="type">{entity.resultType.map(link(_)).getOrElse(NodeSeq.Empty)}{extendsFor(entity)}</td>
      <td class="remarks">
        {/** TODO add override from */}
        {member.inheritedFrom.map(Services.linkHelper.link(_, uri, None, None)).getOrElse(NodeSeq.Empty)}
      </td>
    </tr>
  }

  private def codeAsDoc(entity: ModelExtractor#Entity) = {
    entity.decodeComment match {
      case Some(comment) if (comment.attributes.exists(_.tag == "codeAsDoc")) => <pre class="codeAsDoc">{Text(entity.sym.pos.lineContent)}</pre>
      case _ => NodeSeq.Empty
    }
  }
  private def printIf(what: Option[Types#Type], before: String, after: String): NodeSeq =
    if (what.isEmpty) NodeSeq.Empty
    else Text(before) ++ link(what.get) ++ Text(after)

  def signatureFor(entity: ModelExtractor#Entity): NodeSeq = {
    <code class="signature">{
    Text((entity.flagsString + " " + entity.kind + " " +entity.name).trim) ++
    DocUtil.NodeWrapper(entity.typeParams.elements).surround("[", "]")(e =>
      Text((e.variance + " " + e.name).trim) ++ printIf(e.hi, " <: ", "") ++ printIf(e.lo, " >: ", "")
    ) ++
    printIf(entity.hi, " <: ", "") ++ printIf(entity.lo, " >: ", "") ++
    entity.params.map(xs =>
      DocUtil.NodeWrapper(xs.elements).mkXML("(", ", ", ")")(arg =>
        Text((arg.flagsString + " " + arg.name).trim + " : ") ++ link(arg.resultType.get)
      )
    )
    }
    </code>
  }


  override def navBarCell1 = {
    <xml:group>
      <a href={relativize("site:/overview.html")}>OVERVIEW</a>&nbsp;|&nbsp;
      {Services.modelHelper.packageFor(cls.sym).map(Services.linkHelper.link(_, uri, Some("PACKAGE"), None) ++ Text(" | ")).getOrElse(NodeSeq.Empty)}
      <a href="#Constructors">CONSTR</a>&nbsp;|&nbsp;
      <a href="#Fields">FIELDS</a>&nbsp;|&nbsp;
      <a href="#Methods">METHODS</a>
    </xml:group>
  }
  override def navBarCell3 = {
    <a class="btnInherited" href="#" onclick="toggleInherited()" title="show/hide inherited">INHERITED<input type="checkbox" checked="true" class="filter_inherited_cb"/></a>
  }

}


