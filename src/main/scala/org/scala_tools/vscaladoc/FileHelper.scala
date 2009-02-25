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

  def findFileWithExt(baseFile : File, extensions : List[String]) :Option[(File, String)] = {
    val basePath = baseFile.getCanonicalPath
    extensions.
      map(ext => (new File(basePath + "." + ext), ext)).
      filter(t => t._1.exists).
      firstOption
  }

  def findFileWithExt(baseSubPath : String, extensions : List[String]) :Option[(File, String)] = findFileWithExt(new File(sourceDir, baseSubPath), extensions)

  def readTextFromFile(f : File) :Option[String] = {
    if (f.exists) {
      Some(Source.fromFile(f).getLines.mkString(""))
    } else {
      None
    }
  }

  def readTextFromSrcDir(subPath: String) :Option[String] = {
    readTextFromFile(new File(sourceDir, subPath))
  }

  /**
   * write string in file (encoding: UTF-8)
   */
  def writeTextToFile(f : File, txt : String, header: Option[String], footer: Option[String]) {
    f.getParentFile.mkdirs()
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
  //-----------------------------------------------------------------------
  /**
   * Deletes a directory recursively.
   *
   * @param directory  directory to delete
   * @throws IOException in case deletion is unsuccessful
   * @since 1.2
   */
  def deleteDirectory(directory : File) {
    if (!directory.exists()) {
      return;
    }

    cleanDirectory(directory)
    if (!directory.delete()) {
      throw new IOException("Unable to delete directory " + directory + ".")
    }
  }

  /**
   * Deletes a file, never throwing an exception. If file is a directory, delete it and all sub-directories.
   * <p>
   * The difference between File.delete() and this method are:
   * <ul>
   * <li>A directory to be deleted does not have to be empty.</li>
   * <li>No exceptions are thrown when a file or directory cannot be deleted.</li>
   * </ul>
   *
   * @param file  file or directory to delete, can be <code>null</code>
   * @return <code>true</code> if the file or directory was deleted, otherwise
   * <code>false</code>
   *
   * @since 1.2
   */
  def deleteQuietly(file: File) : Boolean = {
    if (file == null) {
      return false
    }
    try {
      if (file.isDirectory()) {
        cleanDirectory(file);
      }
    } catch {
      case exc : Exception => ()
    }

    try {
      return file.delete()
    } catch {
      case exc: Exception => return false
    }
  }

  /**
   * Cleans a directory without deleting it.
   *
   * @param directory directory to clean
   * @throws IOException in case cleaning is unsuccessful
   * @since 1.2
   */
  def cleanDirectory(directory: File) {
    if (!directory.exists()) {
      throw new IllegalArgumentException(directory + " does not exist")
    }

    if (!directory.isDirectory()) {
      throw new IllegalArgumentException(directory + " is not a directory")
    }

    val files = directory.listFiles();
    if (files == null) {  // null if security restricted
      throw new IOException("Failed to list contents of " + directory)
    }

    var exception : Exception = null
    files.foreach {file =>
      try {
        forceDelete(file)
      } catch {
        case exc : Exception => exception = exc
      }
    }

    if (null != exception) {
      throw exception
    }
  }
  /**
   * Deletes a file. If file is a directory, delete it and all sub-directories.
   * <p>
   * The difference between File.delete() and this method are:
   * <ul>
   * <li>A directory to be deleted does not have to be empty.</li>
   * <li>You get exceptions when a file or directory cannot be deleted.
   *      (java.io.File methods returns a boolean)</li>
   * </ul>
   *
   * @param file  file or directory to delete, must not be <code>null</code>
   * @throws NullPointerException if the directory is <code>null</code>
   * @throws FileNotFoundException if the file was not found
   * @throws IOException in case deletion is unsuccessful
   * @since 1.2
   */
  def forceDelete(file : File) {
    if (!file.exists()) {
      return
    }
    if (file.isDirectory()) {
      deleteDirectory(file);
    } else if (!file.delete()) {
      throw new IOException("Unable to delete file: " + file)
    }
  }

}
