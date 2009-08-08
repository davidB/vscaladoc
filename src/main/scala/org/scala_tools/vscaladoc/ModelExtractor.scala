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

  // override original code to support more tags
  import java.util.regex.Pattern

  // patterns for standard tags with 1 and 2 arguments
  protected
  val pat1 = Pattern.compile("[ \t]*@(author|deprecated|pre|return|see|since|todo|version|ex|note|codeAsDoc)[ \t]*(.*)")
  protected
  val pat2 = Pattern.compile("[ \t]*@(exception|param|throws)[ \t]+(\\p{Graph}*)[ \t]*(.*)")

  override
  protected def decodeComment(comment0: String): Comment = {
    val comment = comment0 // .substring("/**".length, comment0.length - "*/".length)
    val tok = new java.util.StringTokenizer(comment, LINE_SEPARATOR)
    val buf = new StringBuilder
    type AttrDescr = (String, String, StringBuilder)
    val attributes = new collection.mutable.ListBuffer[AttrDescr]
    var attr: AttrDescr = null
    while (tok.hasMoreTokens) {
      val s = tok.nextToken.replaceFirst("\\p{Space}?\\*", "")
      val mat1 = pat1.matcher(s)
      if (mat1.matches) {
        attr = (mat1.group(1), null, new StringBuilder(mat1.group(2)))
        //if (kind != CONSTRUCTOR)
        attributes += attr
      } else {
        val mat2 = pat2.matcher(s)
        if (mat2.matches) {
          attr = (mat2.group(1), mat2.group(2), new StringBuilder(mat2.group(3)))
          //if (kind != CLASS)
          attributes += attr
        } else if (attr ne null)
          attr._3.append(s + LINE_SEPARATOR)
        else
          buf.append(s + LINE_SEPARATOR)
      }
    }
    Comment(buf.toString, attributes.toList.map({x => Tag(x._1,x._2,x._3.toString)}))
  }
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
