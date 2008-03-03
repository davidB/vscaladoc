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
      var versionString = "0.1-SNAPSHOT"
      var pageHeader: NodeSeq = Text("header")
      var pageFooter: NodeSeq = Text("footer")
      var windowTitle = "API"
      var overviewTitle: NodeSeq = Text("Overview")
      var sourcedir = new File(".")
      var outputdir = new File(".")
      var htmlizeSource = true
      var global: Global = _ //TODO: try to remove dependency to global
    }

    lazy val fileHelper = new FileHelper(cfg.sourcedir)

    lazy val linkHelper = new LinkHelper(cfg.outputdir, fileHelper, cfg.global)

    lazy val modelHelper = new ModelHelper()

    lazy val sourceHtmlizer : SourceHtmlizer = {
      if (cfg.htmlizeSource) {
        new SourceHtmlizerOn(cfg.sourcedir, cfg.outputdir, fileHelper, linkHelper)
      } else {
        new SourceHtmlizerOff()
      }
    }

    lazy val htmlRenderer = new HtmlRenderer(cfg.outputdir, fileHelper)
}
