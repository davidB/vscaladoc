/* NSC -- new Scala compiler
 * Copyright 2007-2008 LAMP/EPFL
 * @author  Sean McDirmid
 */
// $Id: ModelExtractor.scala 13089 2007-10-17 13:53:37Z michelou $

package org.scala_tools.vscaladoc

import scala.tools.nsc._
import scala.tools.nsc.doc.{ModelExtractor => OrigModelExtractor}
import scala.collection.jcl
import compat.Platform.{EOL => LINE_SEPARATOR}


/** This class attempts to reverse engineer source code intent from compiler
 *  symbol objects.
 *
 * @author Sean McDirmid
 */
trait ModelExtractor extends OrigModelExtractor {
  val global: Global
  import global._

  def isValOrVar(e: Symbol) = ((e.isValue) && e.hasFlag(symtab.Flags.ACCESSOR))
  def isChildObject(e: Symbol) = (e.isModule && !e.isRoot)
  /** a method with no parameters and return type != Unit */
  def isDefField(e: Symbol) = (e.isMethod && !e.isConstructor && !e.hasFlag(symtab.Flags.ACCESSOR) && (e.tpe.kind != "NoType"))

  //isValOrVar(e) || isChildObject(e) || isDefField(e)
  //  ((e.isValue) && e.hasFlag(symtab.Flags.ACCESSOR)) || (e.isModule && !e.isRoot) || (e.isMethod && !e.isConstructor && !e.hasFlag(symtab.Flags.ACCESSOR) && (e.tpe.kind != "NoType"))
//  val ExFields = new Category("ExField")(e => (e.isValue) && e.hasFlag(symtab.Flags.ACCESSOR)) {
//    override def plural = "Extended Fields";
//  }

//  override val Values = new Category("Value")(e => ((e.isValue) && e.hasFlag(symtab.Flags.ACCESSOR)) ||
//    (e.isModule && !e.isRoot) ||
//    (e.isMethod && !e.isConstructor && !e.hasFlag(symtab.Flags.ACCESSOR) && (e.typeParams.length < 1) )) {
//    override def plural = "Values and Variables";
//  }
}
