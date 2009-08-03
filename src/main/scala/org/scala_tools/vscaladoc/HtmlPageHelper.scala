package org.scala_tools.vscaladoc

/**
 * @author David Bernard
 */
class HtmlPageHelper(val linkHelper : LinkHelper, val markupProcessor : Htmlizer4Markup, val sourceHtmlizer : Htmlizer4Source, val modelHelper : ModelHelper) {
  import java.net.URI
  import scala.xml.{NodeSeq, Text, Unparsed, Utility}

  //TODO refactor
  def encodingString = Services.cfg.encodingString
  def versionString = Services.cfg.versionString
  def pageHeader: NodeSeq = Services.cfg.pageHeader
  def pageFooter: NodeSeq = Services.cfg.pageFooter
  def windowTitle = Services.cfg.windowTitle
  def overviewTitle: NodeSeq = Services.cfg.overviewTitle

  def htmlize(comment: Option[ModelExtractor#Comment]) : NodeSeq = htmlize(comment, true)

  //TODO group attr.tag with same value
  def htmlize(comment: Option[ModelExtractor#Comment], splitDetails: Boolean) : NodeSeq = {
    def listAttributes(c: ModelExtractor#Comment) = {
      if (c.attributes.filter(_.body.trim.length > 0).isEmpty) {
        NodeSeq.Empty
      } else {
       var last = ""
       // TODO use a logical order instead of alphabetical
       // TODO allow plug of special tag
       <dl>{c.attributes.sort(_.tag < _.tag).filter(_.body.trim.length > 0).map(attr => <xml:group>
         {
           if (last != attr.tag) {
             last = attr.tag
             <dt>{attr.tag}</dt>
           } else {
             NodeSeq.Empty
           }
         }
         <dd><code>{attr.option}</code> - { 
           if (attr.tag ==  "see") {
             //TODO create link for @see tag
             Unparsed(markupProcessor(attr.body))
           } else {
             Unparsed(markupProcessor(attr.body))
           }
         }</dd>
          </xml:group>)
        }</dl>
      }
    }

    def display(c: ModelExtractor#Comment, body: String) = {
      <div class="apiComments">
        {Unparsed(body)}
        {listAttributes(c)}
      </div>
    }

    def displayWithDetails(c: ModelExtractor#Comment, body: String) = {
      var detailsPos = body.indexOf('.')
      if (body.startsWith("<p>")) detailsPos= body.indexOf("</p>") + 3
      if (detailsPos == -1) {
        detailsPos = body.length
      }
      val first = body.substring(0, detailsPos)
      val details = if ((detailsPos+1) < body.length) body.substring(detailsPos+1).trim else ""
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
      case Some(c: ModelExtractor#Comment) =>
        val body = markupProcessor(c.body)
        if (splitDetails) {
          displayWithDetails(c, body)
        } else {
          display(c, body)
      }
      case None => NodeSeq.Empty
    }
  }
}
