import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.xpath.*

overview = new File(basedir, 'target/site/scaladocs/overview.html')
assert overview.exists()


builder  = DocumentBuilderFactory.newInstance().newDocumentBuilder()
overviewXml = builder.parse(overview)

def xpath = XPathFactory.newInstance().newXPath()

def packagesXml = xpath.evaluate( '//body/div[@id="packages"]/dl', overviewXml, XPathConstants.NODE )
assert xpath.evaluate( 'dt/a', packagesXml, XPathConstants.NODESET ).collect { node -> node.textContent } == ['itest.demo1', 'itest.demo2']
xpath.evaluate( 'dd', packagesXml, XPathConstants.NODESET ).each {
	assert it.textContent.trim().length() != 0
}