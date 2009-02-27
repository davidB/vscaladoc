package org.scala_tools.vscaladoc

abstract class Format(val name : String, val ext : List[String]) {
  def toHtml(s : String) : String
}

class HtmlFormat extends Format("html", List("html", "")) {
  def toHtml(s : String) : String = s
}

class RawTxtFormat extends Format("raw", List("txt")) {
  def toHtml(s : String) : String = s
}

class MarkdownFormat extends Format("markdown", List("markdown", "md", "mdown", "mkd", "mkdn")) {
//    val klass = Class.forName("com.petebevin.markdown.MarkdownProcessor")
//    val processor = klass.newInstance
//    val method = klass.getMethod("markdown", classOf[String])
//    s: String => method.invoke(processor, s).asInstanceOf[String]
  private lazy
  val _parser = new com.petebevin.markdown.MarkdownProcessor()
  def toHtml(s : String) : String = _parser.markdown(s)
}

abstract class WikitextFormat(name : String, ext : List[String]) extends Format(name, ext) {
  import org.eclipse.mylyn.wikitext.core.parser.MarkupParser
  import org.eclipse.mylyn.wikitext.core.parser.builder.HtmlDocumentBuilder

  //    val klass = Class.forName("JTextile")
  //    val method = klass.getMethod("textile", classOf[String])

  protected
  def _parser : MarkupParser

  def toHtml(s : String) = {
    val out = new java.io.StringWriter()
    _parser.setBuilder(new HtmlDocumentBuilder(out))
    _parser.parse(s, false)
    _parser.setBuilder(null)
    out.toString()
  }
}

class TextileFormat extends WikitextFormat("textile", List("textile")) {
  import org.eclipse.mylyn.wikitext.core.parser.MarkupParser
  import org.eclipse.mylyn.wikitext.textile.core.TextileLanguage

  //    val klass = Class.forName("JTextile")
  //    val method = klass.getMethod("textile", classOf[String])

  protected lazy
  val _parser = new MarkupParser(new TextileLanguage())
}

class MediaWikiFormat extends WikitextFormat("mediawiki", List("mw")) {
  import org.eclipse.mylyn.wikitext.core.parser.MarkupParser
  import org.eclipse.mylyn.wikitext.mediawiki.core.MediaWikiLanguage

  //    val klass = Class.forName("JTextile")
  //    val method = klass.getMethod("textile", classOf[String])

  protected lazy
  val _parser = new MarkupParser(new MediaWikiLanguage())
}

class ConfluenceFormat extends WikitextFormat("confluence", List("confluence")) {
  import org.eclipse.mylyn.wikitext.core.parser.MarkupParser
  import org.eclipse.mylyn.wikitext.confluence.core.ConfluenceLanguage

  //    val klass = Class.forName("JTextile")
  //    val method = klass.getMethod("textile", classOf[String])

  protected lazy
  val _parser = new MarkupParser(new ConfluenceLanguage())
}

/**
 * @author david.bernard
 * @author robey
 */
//TODO sync, use same rules (creation, usage,...) for source and markup htmlizer
class Htmlizer4Markup(defaultFormat: String, fileHelper : FileHelper) {

  private
  val _htmlizers = {
    var b : List[Format] = Nil
    List("HtmlFormat", "MarkdownFormat", "TextileFormat", "ConfluenceFormat", "MediaWikiFormat", "RawTxtFormat").reverse.foreach { format =>
      try {
        val fo = Class.forName(this.getClass.getPackage.getName + "." + format)
        b = fo.newInstance().asInstanceOf[Format] :: b
      } catch {
        case t => print("fail to register :" + format, t)
      }
    }
    b
  }

  private
  val extensions = _htmlizers.flatMap(_.ext)//List("", "html", "md", "markdown", "textile", "txt")

  def findHtmlizerByExt(ext : String) = _htmlizers.find(x => x.ext.contains(ext))

  private lazy
  val _htmlizerDefault = _htmlizers.find(x => x.name.equalsIgnoreCase(defaultFormat)).
    orElse(findHtmlizerByExt("html")).
    getOrElse(new HtmlFormat())

  def onString(txt : String, ext : String) = findHtmlizerByExt(ext).getOrElse(_htmlizerDefault).toHtml(txt)

  def onFile(subPath : String): Option[String] = {
    for {
      (realFile, ext) <- fileHelper.findFileWithExt(subPath, extensions)
      txt <- fileHelper.readTextFromFile(realFile)
    } yield onString(txt, ext)
  }

  def apply(text: String) = _htmlizerDefault.toHtml(text)
}
