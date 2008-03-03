/*
 * @author David Bernard
 */

package org.scala_tools.compiler.reporters

import scala.tools.nsc._
import reporters._
import util._

import java.io.{BufferedReader, InputStreamReader, IOException, PrintWriter}

/**
 * This class implements a Reporter that displays messages on a text
 * console.
 */
class MyConsoleReporter(settings: Settings, reader: BufferedReader, writer: PrintWriter) extends ConsoleReporter(settings, reader, writer) {
  def this(settings: Settings) =
    this(settings, Console.in, new PrintWriter(Console.err, true))

  /** Prints the message with the given position indication. */
  override def printMessage(posIn: Position, msg: String) {
    if (posIn ne null) {
      val pos = posIn.inUltimateSource(posIn.source.getOrElse(null))
      val buf = new StringBuilder(msg)
      if (!pos.source.isEmpty) {
        buf.insert(0, " ")
        buf.insert(0, pos.line.map(ln => ":" + pos.line.get + "," + pos.column.get + ":").get(":"))
      }
      //println(getSource.file)
      pos match {
      case FakePos(msg) =>
        buf.insert(0, msg + " ")
      case _ if !pos.source.isEmpty =>
        val file = pos.source.get.file
        buf.insert(0, if (shortname) file.name else file.path)
      case _ =>
      }
      printMessage(buf.toString())
      if (!pos.line.isEmpty)
        printSourceLine(pos)
    } else
      printMessage(msg)
  }

}
