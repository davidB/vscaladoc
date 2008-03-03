package org.scala_tools.vscaladoc

import java.io._
import scala.io._

/**
 * @author David Bernard
 */
class FileHelper(val sourceDir: File) {

  def relativePathUnderDir(file: File, dir: File) = {
    val r = dir.getCanonicalPath
    val p = file.getCanonicalPath
    assume(p.startsWith(r), "file should be under " + dir)
    p.substring(r.length)
  }

  def copy(src: File, dest: File, header: String, footer: String) {
    val in = new FileReader(src)
    val out = new FileWriter(dest)
    dest.getParentFile.mkdirs()
    val buf = new Array[Char](1024)
    try {
      out.write(header);
      var len = 0
      while ({len = in.read(buf); len != -1}) {
        out.write(buf, 0, len)
      }
      out.write(footer);
    } finally {
      in.close()
      out.close()
    }
  }

  /**
   * fullpath of the resource :
   * in = srcPath + subPath
   * dest = destDir + File.separator + subPath
   */
  def copyResource(srcPath: String, subPath: String, destDir: File, loader: ClassLoader, buf: Array[Byte]) {
    val in = loader.getResourceAsStream(srcPath + subPath)
    if (in == null) {
      throw new IllegalArgumentException(srcPath + subPath + " not found")
    }
    val dest = new File(destDir, subPath)
    dest.getParentFile.mkdirs()
    val out = new FileOutputStream(dest)
    try {
      var len = 0
      while ({len = in.read(buf); len != -1}) {
        out.write(buf, 0, len)
      }
    } finally {
      in.close()
      out.close()
    }
  }

  def readTextFromSrcDir(subPath: String) :Option[String] = {
    readTextFromFile(new File(sourceDir, subPath))
  }

  def readTextFromFile(f : File) :Option[String] = {
    if (f.exists) {
      Some(Source.fromFile(f).getLines.mkString(""))
    } else {
      None
    }
  }

  /**
   * write string in file (encoding: UTF-8)
   */
  def writeTextToFile(f : File, txt : String, header: Option[String], footer: Option[String]) {
    val out = new FileOutputStream(f)
    try {
      val enc = "UTF-8"
      header.foreach(s => out.write(s.getBytes(enc)))
      out.write(txt.getBytes(enc))
      footer.foreach(s => out.write(s.getBytes(enc)))
    } finally {
      try {
        out.close()
      } catch {
        case _ => //ignore
      }
    }
  }

}
