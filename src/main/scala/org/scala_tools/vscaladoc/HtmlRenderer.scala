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
class HtmlRenderer(outputDir: File, fh: FileHelper) {

  def render(allPackages: Iterable[ModelExtractor#Package], allClasses: Iterable[ModelExtractor#ClassOrObject]) {
    copyResources()
    val allPkgSorted = allPackages.toList.sort(_.name.toLowerCase < _.name.toLowerCase)
    val page4overview = new Page4Overview(allPkgSorted)
    page4overview.save(outputDir)

    val page4allClasses = new Page4AllClasses(allPkgSorted, allClasses)
    page4allClasses.save(outputDir)

    val page4index = new Page4Index(page4allClasses, page4overview)
    page4index.save(outputDir)

    allClasses.foreach(cls => new Page4ClassOrObject(cls, allClasses).save(outputDir))
  }

  def copyResources() {
    val loader = this.getClass().getClassLoader()
    val buf = new Array[Byte](1024)
    def copyResource(name: String) = fh.copyResource("org/scala_tools/vscaladoc/", name, outputDir, loader, buf)
    copyResource("reset.css")
    copyResource("jquery-1.2.3.js")
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

