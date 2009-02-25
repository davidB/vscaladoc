package org.scala_tools.vscaladoc

abstract class Format(name: String)
case object HtmlFormat extends Format("html")
case object MarkdownFormat extends Format("markdown")
case object TextileFormat extends Format("textile")

/**
 * @author david.bernard
 * @author robey
 */
//TODO sync, use same rules (creation, usage,...) for source and markup htmlizer
class Htmlizer4Markup(defaultFormat: Format, fileHelper : FileHelper) {

  private
  val extensions = List("", "html", "md", "markdown", "textile", "txt")

  lazy
  val textile2txt = {
    val klass = Class.forName("JTextile")
    val method = klass.getMethod("textile", classOf[String])
    s: String => method.invoke(null, s).asInstanceOf[String]
  }

  lazy
  val markdown2html = {
    val klass = Class.forName("com.petebevin.markdown.MarkdownProcessor")
    val processor = klass.newInstance
    val method = klass.getMethod("markdown", classOf[String])
    s: String => method.invoke(processor, s).asInstanceOf[String]
  }

  lazy
  val default2html = format2method(defaultFormat)

  def format2method(format : Format) = try {
    format match {
      case HtmlFormat => { s: String => s }
      case MarkdownFormat => markdown2html
      case TextileFormat => textile2txt
      case _ => throw new UnsupportedOperationException("don't know how to convert to html for :" + format)
    }
  } catch {
    case e: ClassNotFoundException =>
      throw new IllegalStateException("Class " + e.getMessage + " not found, but required by markup '" + format + "'")
  }

  def onFile(subPath : String): Option[String] = {
    for {
      (realFile, ext) <- fileHelper.findFileWithExt(subPath, extensions)
      txt <- fileHelper.readTextFromFile(realFile)
    } yield ext match {
      case "md" | "markdown" => format2method(MarkdownFormat)(txt)
      case "textile" => format2method(TextileFormat)(txt)
      case "html" => format2method(HtmlFormat)(txt)
      case _ => txt
    }
  }

  def apply(text: String) = default2html(text)
}
