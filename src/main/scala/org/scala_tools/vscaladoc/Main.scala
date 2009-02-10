/* scaladoc, a documentation generator for Scala
* Copyright 2005-2008 LAMP/EPFL
* @author  Martin Odersky
* @author  Geoffrey Washburn
*/
// $Id: ScalaDoc.scala 14270 2008-03-05 15:07:14Z washburn $

//package scala.tools.nsc
package org.scala_tools.vscaladoc

import java.io.File

import scala.tools.nsc._
//import scala.tools.nsc.doc.DefaultDocDriver
import scala.tools.nsc.reporters.{Reporter, ConsoleReporter}
import scala.tools.nsc.util.FakePos //{Position}


// extra settings
class VSettings(f: String => Unit) extends doc.Settings(f) {
  val formatHtml = BooleanSetting("-format-html", "Process doc strings as raw HTML (default)")
  val formatMarkdown = BooleanSetting("-format-markdown", "Process doc strings as markdown")
  val formatTextile = BooleanSetting("-format-textile", "Process doc strings as textile")
}

/** The main class for scaladoc, a frontend for the Scala compiler
* that generates documentation from source files.
*/
object Main {

  val versionMsg = "Scala documentation generator " +
  Properties.versionString + " -- " +
  Properties.copyrightString

  var reporter: ConsoleReporter = _

  def error(msg: String) {
    reporter.error(/*new Position */FakePos("scalac"),
    msg + "\n  scalac -help  gives more information")
  }

  def process(args: Array[String]) {
    val docSettings = new VSettings(error)
    reporter = new ConsoleReporter(docSettings)
    val command = new CompilerCommand(List.fromArray(args), docSettings, error, false)
    if (command.settings.version.value)
    reporter.info(null, versionMsg, true)
    else {
      if (command.settings.target.value == "msil") {
        val libpath = System.getProperty("msil.libpath")
        if (libpath != null)
        command.settings.assemrefs.value =
        command.settings.assemrefs.value + File.pathSeparator + libpath
      }
      try {
        object compiler extends Global(command.settings, reporter) {
          override val onlyPresentation = true
        }
        if (reporter.hasErrors) {
          reporter.flush()
          return
        }

        if (command.settings.help.value || command.settings.Xhelp.value || command.settings.Yhelp.value) {
          if (command.settings.help.value) {
            reporter.info(null, command.usageMsg, true)
            reporter.info(null, compiler.pluginOptionsHelp, true)
          }
          if (command.settings.Xhelp.value) {
            reporter.info(null, command.xusageMsg, true)
          }
          if (command.settings.Yhelp.value) {
            reporter.info(null, command.yusageMsg, true)
          }
        } else if (command.settings.showPlugins.value) {
          reporter.info(null, compiler.pluginDescriptions, true)
        } else if (command.settings.showPhases.value) {
          reporter.info(null, compiler.phaseDescriptions, true)
        } else {
          val generator = new DocDriver {
            lazy val global: compiler.type = compiler
            lazy val settings = docSettings
          }
          generator.init()
          val run = new compiler.Run
          run compile command.files
          generator.process(run.units)
          reporter.printSummary()
        }
      } catch {
        case ex @ FatalError(msg) =>
        if (command.settings.debug.value) {
          ex.printStackTrace();
        }
        reporter.error(null, "fatal error: " + msg)
      }
    }
  }

  def main(args: Array[String]) {
    process(args)
    exit(if (reporter.hasErrors) 1 else 0)
  }

}
