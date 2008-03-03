package org.scala_tools.vscaladoc.demo

/**
 * Class to test class name with special character
 */
class :: {}

/**
 * Doc of DemoA (object)
 * ....
 * <pre name="code" class="scala">
 *  val x = DemoA.noArgsReturnString
 * </pre>
 *
 * @author <a href="ghgjh">au1</a>
 * @author au2 (au2@foo.bar)
 */
object DemoA {
  /** description of variable */
  var variable = "Hello"
  /** description of value */
  val value = "World"
  def noArgsReturnString = "noArg"
  def noArgsNoReturn {}
  def zeroArgsReturnString() = "zeroArgs"
  def zeroArgsNoReturn() = {}
  /**
   * method bkjjghkjhg
   * @param i an integer
   * @param s a String
   * @return concatenation of i and s
   */
  def twoArgs(i: Int, s: String) = {s.length + i}
}

/**
 * Class use to test the scaladoc 2 renderer
 */
class DemoA {
  var variable = "Hello"
  val value = "World"
  def noArgsReturnString = "noArg"
  def noArgsNoReturn {}
  def zeroArgsReturnString() = "zeroArgs"
  def zeroArgsNoReturn() = {}
  /**@codeAsDoc*/
  def twoArgsAndCodeAsDoc(i: Int, s: String) = {s.length + i}
}


