package org.scala_tools.vscaladoc

import java.net.{URI, URLEncoder}
import java.io.{File}
import scala.xml.{NodeSeq, Text}
import scala.tools.nsc.symtab.{Types, Symbols}
import scala.tools.nsc.Global

class LinkHelper(siteDir: File, fh: FileHelper, val global: Global) {

  private var sitePackage : List[String] = Nil
  private var remotePackage : List[(String, URI)] = Nil

  def addSitePackage(pkg : String) {
    val p = pkg + "."
    sitePackage = (p :: sitePackage).sort(_.length > _.length)
  }

  def addRemotePackage(pkg : String, baseUri: URI) {
    val p = pkg + "."
    remotePackage = ((p, baseUri) :: remotePackage).sort(_._1.length > _._1.length)
  }

  //private val FILE_EXTENSION_HTML = ".html"
  //private val NAME_SUFFIX_OBJECT  = "$object"
  //private val NAME_SUFFIX_PACKAGE = "$package"

  //TODO create a testcase
  def relativize(uri : URI, from : URI) : Option[String] = {
    if (uri == null) {
      None
    } else if ((from == null) || (uri.getScheme != from.getScheme)) {
      Some(uri.toASCIIString())
    } else if (!uri.isAbsolute || !from.isAbsolute) {
      None
    } else {
      val uriPath = uri.getPath.split('/')
      val fromPath = from.getPath.split('/')
      var i = 0
      while ((uriPath.length > i) && (fromPath.length > i) && (uriPath(i) == fromPath(i))) {
        i = i+1
      }
      //println("uri " + (uriPath.foreach(str => print(str.toString + " | "))))
      //println("from " + (fromPath.foreach(str => print(str.toString + " | "))))
      //println("fromPath.length - (i+1)" + fromPath.length + " - " + (i+1))
      val b1 = List.make((fromPath.length - i - 1), "..")
      //println("b1 : " + b1.toString)
      val b2 = uriPath.subArray(i, uriPath.length)
      //println("b2 : " + b2.toString)
      val back = b1 ++  b2
      Some(back.foldLeft(".")(_ +"/"+_))
    }
  }

  //def link(from: URI)(entity: ModelExtractor#Entity):NodeSeq = link(entity, from, None, None)

  def link(entity: ModelExtractor#Entity, from: URI):NodeSeq = link(entity, from, None, None)

  def link(entity: ModelExtractor#Entity, from: URI, label:Option[String], target: Option[String]):NodeSeq = link(entity.sym, from, label, target)

  //def link(tpe: Types#Type, from: URI):NodeSeq = link(tpe.typeSymbol.asInstanceOf[Symbols#Symbol], from, None, None)
  def link(sym: Symbols#Symbol, from: URI) :NodeSeq = link(sym, from, None, None)

  def link(sym: Symbols#Symbol, from: URI, label:Option[String], target: Option[String]):NodeSeq = uriFor(sym) match {
    case Some(uri:URI) => <a href={relativize(uri, from).getOrElse("#")} title={sym.fullNameString('.')} target={target.getOrElse(null)}>{Text(label.getOrElse(sym.nameString))}</a>
    case None => <a href="javascript:void" class="noref" title={sym.fullNameString('.')} >{Text(label.getOrElse(sym.nameString))}</a>
  }

  //TODO manage class, TopLevelObject, and member (def, object, val var) differently
  //TODO use site scheme for local define (define by package)
  //TODO use api scheme for remote  defined
  //TODO for methods and parameter to the anchor/fragment
//  private def uriFor(entity: ModelExtractor#Entity): Option[URI] = {
//    if (entity == null) return None
//    //Some(new URI("api", entity.fullName('.') + "/" + entity.listName, entity.name))
//    var pkgPath = entity.fullName('/')
//    pkgPath = "/" + pkgPath.substring(0, Math.max(0, pkgPath.length -  entity.listName.length -1))
//    val scheme = "site"
//    entity match {
//      case ent: ModelExtractor#Clazz => Some(new URI(scheme, pkgPath + "/" + entity.listName + ".html", null))
//      case ent: ModelExtractor#TopLevelObject => Some(new URI(scheme, pkgPath + "/" + entity.listName + "$object.html", null))
//      case _ => println("failed to find uri for " + entity.listName);  None //uriFor(entity.owner).map(new URI(_.scheme, _.ssp, entity.name))
//    }
//  }
//

  def uriFor(entity: ModelExtractor#Entity): Option[URI] = uriFor(entity.sym)

  def uriFor(file: File): Option[URI] = {
    val path = fh.relativePathUnderDir(file, siteDir);
    Some(new URI("site", path, null))
  }

//  private def uriFor(sym: Types#Symbol): Option[URI] = uriFor(sym.asInstanceOf[Symbols#Symbol])

  private def uriFor(sym: Symbols#Symbol): Option[URI] = {
    if (sym == null) return None
    //Some(new URI("api", entity.fullName('.') + "/" + entity.listName, entity.name))
    /*
    println("search package for " +  sym.fullNameString('.'))
    println("isPackage :" + sym.isPackage)
    println("isRoot :" + sym.isRoot)
    println("isModule :" + sym.isModule)
    println("isClass :" + sym.isClass)
    println("isModuleClass :" + sym.isModuleClass)
    println("isType :" + sym.isType)
    */
    val scheme = "site"
    if (sym.isPackage || sym.isModuleClass) {
      Some(new URI(scheme, "/overview.html", sym.fullNameString('.')))
    } else if (sym.isModule || sym.isClass || sym.isType || sym.isTrait) {
      val pkg = Services.modelHelper.packageFor(sym)
      //println("find package " +  pkg.map(_.fullNameString('.')))
      var pkgPath = ""
      var fileName = sym.fullNameString('.')
      if ((!pkg.isEmpty) && (pkg.get != sym)) {
        fileName = fileName.substring(pkg.get.fullNameString('.').length + 1)
        pkgPath = pkgPath + pkg.get.fullNameString('/')
        //println("use package :" + pkgPath + " :: " + fileName)
      }
      fileName = URLEncoder.encode(fileName, "UTF-8")
      findBaseURI(pkg.get.fullNameString('.')) match {
        case Some(baseUri) => {
          if (sym.isModule) {
            Some(baseUri.resolve(pkgPath + "/" + fileName + "$object.html"))
          } else {
            Some(baseUri.resolve(pkgPath + "/" + fileName + ".html"))
          }
        }
        case None => println("failed to find baseUri for " + sym.fullNameString('.') + " :: "+ pkg.get.fullNameString('.')); None
      }
    } else if (sym.isMethod || sym.isValue || sym.isVariable) {
      uriFor(sym.owner).map(uri => new URI(uri.getScheme, uri.getSchemeSpecificPart, sym.nameString))
    } else {
      println("failed to find uri for " + sym);
      //Thread.dumpStack()
      None //uriFor(entity.owner).map(new URI(_.scheme, _.ssp, entity.name))
    }
  }

  private def findBaseURI(pkg : String) : Option[URI] = {
    val p = pkg + "."
    if (sitePackage.exists(x => p.startsWith(x))) {
      Some(new URI("site", "/", null))
    } else {
      remotePackage.find(x => p.startsWith(x._1)).map(_._2)
    }
  }

  def link(from: URI)(tp: Types#Type) : NodeSeq = {
    val tpe = tp//.normalize
    val tpeg = tpe.asInstanceOf[global.Type]
    if (!tpe.typeArgs.isEmpty) {
      if (global.definitions.isFunctionType(tpeg)) {
        val (args,r) = tpe.typeArgs.splitAt(tpe.typeArgs.length - 1);
        DocUtil.NodeWrapper(args.elements).mkXML("(", ", ", ")")(link(from)) ++ Text(" => ") ++ link(from)(r.head);
      } else if (tpe.typeSymbol == global.definitions.RepeatedParamClass) {
        assert(tpe.typeArgs.length == 1)
        link(from)(tpe.typeArgs(0)) ++ Text("*")
      } else if (tpe.typeSymbol == global.definitions.ByNameParamClass) {
        assert(tpe.typeArgs.length == 1)
        Text("=> ") ++ link(from)(tpe.typeArgs(0))
      } else if (tpe.typeSymbol.name.toString.startsWith("Tuple") &&
                 tpe.typeSymbol.owner.name == global.nme.scala_.toTypeName) {
        DocUtil.NodeWrapper(tpe.typeArgs.elements).mkXML("(", ", ", ")")(link(from))
      } else
        link(tpe.typeSymbol.asInstanceOf[Symbols#Symbol], from) ++ DocUtil.NodeWrapper(tpe.typeArgs.elements).surround("[", "]")(link(from))
    } else tpe match {
      case t : global.PolyType =>
        link(from)(t.resultType) ++ DocUtil.NodeWrapper(t.typeParams.elements).surround("[", "]")({s => Text(s.toString)})
      case t : global.RefinedType =>
        val parents1 =
          if ((t.parents.length > 1) &&
              (t.parents.head.typeSymbol eq global.definitions.ObjectClass)) t.parents.tail;
          else t.parents;
        DocUtil.NodeWrapper(parents1.elements).mkXML(Text(""), <code> with </code>, Text(""))(link(from));
      case _ => link(tpe.typeSymbol.asInstanceOf[Symbols#Symbol], from)
    }
  }


}

