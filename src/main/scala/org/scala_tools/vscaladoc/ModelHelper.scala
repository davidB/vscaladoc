package org.scala_tools.vscaladoc

import scala.tools.nsc.symtab.{Types, Symbols}
import scala.collection.mutable.{HashMap, Set, HashSet}

class ModelHelper {
  //def packageFor(entity: ModelExtractor#Entity): String = packageFor(entity.sym).map(_.fullNameString('.')).getOrElse("")
  private val subClassesMap = new HashMap[Symbols#Symbol, Set[Symbols#Symbol]] {
    override def default(key: Symbols#Symbol) = {
      val back = new HashSet[Symbols#Symbol]()
      this(key) = back
      back
    }
  }

  def updateSubClasses(allClasses: Iterable[ModelExtractor#ClassOrObject]) {
    for(cls <- allClasses; superTpe <- cls.parents) {
      subClassesMap(superTpe.typeSymbol.asInstanceOf[Symbols#Symbol]) += cls.sym
    }
  }

  def findSubClassesOf(tpe : Symbols#Symbol) = subClassesMap(tpe)
  def findSubClassesOf(cls : ModelExtractor#ClassOrObject) : Set[Symbols#Symbol] = findSubClassesOf(cls.sym)

  def inheritanceGraphOf(cls: ModelExtractor#ClassOrObject) = {
    def findParentEdge(tpe: Types#Type) : List[String] = {tpe.parents.map(p => "\"" + tpe + "\" -> \"" + p.normalize +"\"") ::: tpe.parents.flatMap(p => findParentEdge(p.normalize))}
    var edges = cls.parents.map(p => "\"" + cls.name + "\" -> \"" + p.normalize + "\"") ++ cls.parents.flatMap(p => findParentEdge(p.normalize))
    edges.mkString("digraph G {\n edge [shape=onormal];\n", ";\n", "}")
  }

  def packageFor(sym: Symbols#Symbol): Option[Symbols#Symbol] = {
    try {
      if ((sym.isPackage) || (sym.isModuleClass)) {
        Some(sym)
      } else if (sym.owner != null) {
        packageFor(sym.owner)
      //} else if (sym != Symbols.NoSymbol) {
      //  null
      } else {
        None
      }
    } catch {
      case e => println("failed to find symbol for : " + sym +  " : "+ e.getMessage); None
    }
  }

  def isConstructor(e: ModelExtractor#ClassOrObject#Member) = e.sym.isConstructor

  // can't use matcher on ModelExtractor#ClassOrObject#Val => use isInstanceOf
  // correction: could do "case x :ModelExtractor#ClassOrObject#Val => ..." but keep isInstanceOf
  def isField(e: ModelExtractor#ClassOrObject#Member) = {
    (e.isInstanceOf[ModelExtractor#ClassOrObject#Val]) ||
    ((e.isInstanceOf[ModelExtractor#ClassOrObject#Def]) && (e.valueParams.length < 1) && (e.typeParams.length < 1) && (e.sym.defString.indexOf("(") == -1) && (e.resultType.map(_.toString).getOrElse("Unit") != "Unit") && !isConstructor(e)) ||
    (e.isInstanceOf[ModelExtractor#ClassOrObject#NestedObject])
  }

  def isMethod(e: ModelExtractor#ClassOrObject#Member) = {
    !isConstructor(e) &&
    (e.isInstanceOf[ModelExtractor#ClassOrObject#Def]) &&
    !isField(e)
  }

  def isNestedClass(e: ModelExtractor#ClassOrObject#Member) = {
    (e.isInstanceOf[ModelExtractor#ClassOrObject#NestedClass])
  }

  def findCompanionOf(e: ModelExtractor#ClassOrObject, allClasses: Iterable[ModelExtractor#ClassOrObject]) : Option[ModelExtractor#ClassOrObject] = {
    val fqn = e.fullName('.')
    allClasses.find(i => (i != e) && i.fullName('.') == fqn)
  }

}
