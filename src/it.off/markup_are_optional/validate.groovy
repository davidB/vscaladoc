import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.xpath.*

overview = new File(basedir, 'target/site/scaladocs/overview.html')
assert overview.exists()


builder  = DocumentBuilderFactory.newInstance().newDocumentBuilder()
overviewXml = builder.parse(overview)

def xpath = XPathFactory.newInstance().newXPath()

// If markup are not in the classpath the log a message but don't fail to start and return blanck for package.xxx
def packagesXml = xpath.evaluate( '//body/div[@id="packages"]/dl', overviewXml, XPathConstants.NODE )
assert xpath.evaluate( 'dt/a', packagesXml, XPathConstants.NODESET ).collect { node -> node.textContent } == ['itest.demo1', 'itest.demo2']
xpath.evaluate( 'dd', packagesXml, XPathConstants.NODESET ).each {
	assert it.textContent.trim().length() == 0
}