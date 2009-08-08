import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.xpath.*

try {

overview = new File(basedir, 'target/site/scaladocs/overview.html')
assert overview.exists()


builderFact  = DocumentBuilderFactory.newInstance()
builderFact.setFeature("http://xml.org/sax/features/validation", false)
builderFact.setFeature("http://xml.org/sax/features/external-parameter-entities", false)
builderFact.setFeature("http://apache.org/xml/features/nonvalidating/load-dtd-grammar", false)
builderFact.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false)
builderFact.setValidating(false)
builderFact.setSchema(null)
builder = builderFact.newDocumentBuilder()
overviewXml = builder.parse(overview)

def xpath = XPathFactory.newInstance().newXPath()

def packagesXml = xpath.evaluate( '//body/div[@id="packages"]/dl', overviewXml, XPathConstants.NODE )
assert xpath.evaluate( 'dt/a', packagesXml, XPathConstants.NODESET ).collect { node -> node.textContent } == ['itest.demo1', 'itest.demo2']
xpath.evaluate( 'dd', packagesXml, XPathConstants.NODESET ).each {
	assert it.textContent.trim().length() != 0
}

return true
} catch (Throwable t) {
  t.printStackTrace()
  return false
}