package org.scala_tools.vscaladoc

import scala.tools.nsc._

import java.io.{File, FileWriter}
import java.net.{URI, URLEncoder}

//import scala.collection.jcl
//import scala.compat.Platform.{EOL => LINE_SEPARATOR}
import scala.xml.{NodeSeq, Text, Unparsed, Utility}

//TODO : copy from source directory
/**
 * @author David Bernard
 */
class HtmlRenderer(outputDir: File, env : HtmlPageHelper, fileHelper : FileHelper) {
  private
  val log = java.util.logging.Logger.getLogger(this.getClass.getName)

  def render(allPackages: Iterable[ModelExtractor#Package], allClasses: Iterable[ModelExtractor#ClassOrObject]) {
    copyResources()

    val allPkgSorted = allPackages.toList.sort(_.name.toLowerCase < _.name.toLowerCase)

    log.info("write page for overview")
    val page4overview = save(outputDir, new Page4Overview(env, allPkgSorted))

    log.info("write page for all-classes (list)")
    val page4allClasses = save(outputDir, new Page4AllClasses(env, allPkgSorted, allClasses))

    log.info("write index.html")
    save(outputDir, new Page4Index(env, page4allClasses, page4overview))

    log.info("write doc for  each classes")
    allClasses.foreach{ cls =>
      save(outputDir, new Page4ClassOrObject(env, cls, allClasses))
    }
  }

  def save(rootDir: File, page : HtmlPage) : HtmlPage = {
    val file = new File(rootDir, page.uri.getPath.substring(1))
    val parent = file.getParentFile()
    if (!parent.exists()) parent.mkdirs()
    val writer = new FileWriter(file)
    try {
      writer.write(page.dtype)
      writer.append(scala.compat.Platform.EOL)
      writer.append(page.html.toString())
      page
    } finally {
      writer.close()
    }
  }

  def copyResources() {
    val loader = this.getClass().getClassLoader()
    val buf = new Array[Byte](1024)
    def copyResource(name: String) = fileHelper.copyResource("org/scala_tools/vscaladoc/", name, outputDir, loader, buf)
    copyResource("reset.css")
    copyResource("jquery-1.3.2.js")
    copyResource("all-classes.js")
    copyResource("all-classes.css")
    copyResource("content.js")
    copyResource("content.css")
    copyResource("_highlighter/clipboard.swf")
    copyResource("_highlighter/shAll.js")
    copyResource("_highlighter/SyntaxHighlighter.css")
    copyResource("_images/class.png")
    copyResource("_images/object.png")
    copyResource("_images/trait.png")
  }

}

