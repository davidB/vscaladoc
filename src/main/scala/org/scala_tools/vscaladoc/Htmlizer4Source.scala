package org.scala_tools.vscaladoc

import java.io.{File, FileWriter, FileReader}
import java.net.URI

/**
 * @author David Bernard
 */
trait Htmlizer4Source {
  def scalaToHtml(src :File) : Option[File]
}

class Htmlizer4SourceOn (val inDir: File, val outDir: File, val fh: FileHelper, val lh: LinkHelper) extends Htmlizer4Source {
  private def relativize(uri: URI, from: URI) = lh.relativize(uri, from).getOrElse("__notFound__" + uri.getPath)

  def header(dest: URI) = Some("""
  <html>
  <head>
    <link href='""" + relativize(new URI("site:/_highlighter/SyntaxHighlighter.css"), dest) + """' rel='stylesheet' type='text/css'/>
    <script language='javascript' src='""" + relativize(new URI("site:/_highlighter/shAll.js"), dest) + """'></script>
  </head>
  <body>
    <pre name="code" class="scala" style="width:100%">
""")

  def footer(dest: URI) = Some("""</pre>
    <script language='javascript'>
      dp.SyntaxHighlighter.ClipboardSwf = '""" + relativize(new URI("site:/_highlighter/clipboard.swf"), dest) + """';
      dp.SyntaxHighlighter.HighlightAll('code');
    </script>
  </body>
  </html>
""")

  //TODO: escape the source code
  /**
   * @return the uri of the generated html
   */
  def scalaToHtml(src :File) = {
    val dest = new File(outDir, fh.relativePathUnderDir(src, inDir) + ".html")
    if (!dest.exists || dest.lastModified < src.lastModified) {
      val uri = lh.uriFor(dest).get
      var txt = fh.readTextFromFile(src).getOrElse("")
      txt = txt.replace("<", "&lt;")
      fh.writeTextToFile(dest, txt, header(uri), footer(uri))
    }
    Some(dest)
  }

  def copyResources() {
    val loader = this.getClass().getClassLoader()
    val buf = new Array[Byte](1024)
    def copyResource(name: String) = fh.copyResource("org/scala_tools/vscaladoc/", name, outDir, loader, buf)
    copyResource("_highlighter/clipboard.swf")
    copyResource("_highlighter/shAll.js")
    copyResource("_highlighter/SyntaxHighlighter.css")
  }

  copyResources()
}

class Htmlizer4SourceOff extends Htmlizer4Source {
  def scalaToHtml(src :File) = None
}

