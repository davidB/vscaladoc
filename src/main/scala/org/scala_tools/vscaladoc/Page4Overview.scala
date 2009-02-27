package org.scala_tools.vscaladoc

import java.net.{URI}
import scala.xml.{NodeSeq, Text, Unparsed}

abstract
class Page4Overview(env : HtmlPageHelper) extends ContentPage(env) {
  val uri = new URI("site:/overview.html")
  override def title = super.title + " : Overview"
  override def header = surroundHeader(None)
  override def body = surroundBody(Some(
    <xml:group>
      {pageTitle}
      {overviewComment}
      {packages}
    </xml:group>
  ))

  private def pageTitle: NodeSeq = {<h1>{env.overviewTitle}</h1>}

  /**
   * workaround because compiler doesn't read overview.html
   */
  private def overviewComment: NodeSeq =
    <div id="overview_desc">
      {Unparsed(env.markupProcessor.onFile("overview").getOrElse(""))}
    </div>

  private def packages = {
    <div id="packages">
      <h2>Packages</h2>
      { packagesDl }
    </div>
  }

  protected
  def packagesDl : NodeSeq
}

class Page4OverviewOnXml(env : HtmlPageHelper, val packagesDl : NodeSeq) extends Page4Overview(env)

class Page4OverviewOnModel(env : HtmlPageHelper, allPackages : Iterable[ModelExtractor#Package]) extends Page4Overview(env) {

  protected
  def packagesDl = {
    <dl>
      {allPackages.map(
        pkg => <xml:group>
          <dt><a href={"javascript:selectPackage('" +pkg.name + "')"}>{pkg.name}</a></dt>
          <dd>
            {env.htmlize(pkg.decodeComment)}
            { //workaround because compiler doesn't read package.html
              Unparsed(env.markupProcessor.onFile(pkg.fullName('/') + "/package").getOrElse(""))
            }
          </dd>
        </xml:group>)
      }
    </dl>
  }
}
