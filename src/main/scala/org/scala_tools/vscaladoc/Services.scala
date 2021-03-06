package org.scala_tools.vscaladoc

import scala.xml.{NodeSeq, Text}
import java.io.File
import scala.tools.nsc.Global


/**
 * Singleton services Factory/locator use to access other services and components.
 *
 * @author David Bernard
 */
object Services {
    //
    //  val stylesheetSetting = settings.stylesheetfile
    //
    //  def pageHeader  = load(settings.pageheader.value)
    //  def pageFooter  = load(settings.pagefooter.value)
    //  def pageTop     = load(settings.pagetop.value)
    //  def pageBottom  = load(settings.pagebottom.value)
    /**
     * central configuration
     */
    object cfg {
      var encodingString = "UTF-8"
      var versionString = "1.2"
      var pageHeader: NodeSeq = Text("header")
      var pageFooter: NodeSeq = Text("footer")
      var windowTitle = "API"
      var overviewTitle: NodeSeq = Text("Overview")
      var sourcedir = new File(".")
      var outputdir = new File(".")
      var htmlizeSource = true
      var format = "html"
      var global: Global = _ //TODO: try to remove dependency to global

      def setFrom(settings : VSettings) {
        pageFooter =  DocUtil.load(settings.pagebottom.value)
        pageHeader =  DocUtil.load(settings.pagetop.value)
        windowTitle = settings.windowtitle.value
        overviewTitle = DocUtil.load(settings.doctitle.value) //load
        sourcedir = new File(settings.sourcepath.value)
        outputdir = new File(settings.outdir.value)
        format = if (settings.formatMarkdown.value) {
          "markdown"
        } else if (settings.formatTextile.value) {
          "textile"
        } else {
          "html"
        }
      }
    }

    /** @codeAsDoc */
    lazy val fileHelper = new FileHelper(cfg.sourcedir)

    /** @codeAsDoc */
    lazy val linkHelper = new LinkHelper(cfg.outputdir, fileHelper, cfg.global)

    /** @codeAsDoc */
    lazy val modelHelper = new ModelHelper()

    lazy val htmlizer4Source : Htmlizer4Source = {
      if (cfg.htmlizeSource) {
        new Htmlizer4SourceOn(cfg.sourcedir, cfg.outputdir, fileHelper, linkHelper)
      } else {
        new Htmlizer4SourceOff()
      }
    }

    /** @codeAsDoc */
    lazy val htmlRenderer = new HtmlRenderer(cfg.outputdir, htmlPageHelper, fileHelper)

    /** @codeAsDoc */
    lazy val htmlPageHelper = new HtmlPageHelper(linkHelper, htmlizer4Markup, htmlizer4Source, modelHelper)

    /** @codeAsDoc */
    lazy val htmlizer4Markup = new Htmlizer4Markup(cfg.format, fileHelper)
}
