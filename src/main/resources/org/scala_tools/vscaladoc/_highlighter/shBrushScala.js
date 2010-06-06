dp.sh.Brushes.Scala = function()
{
	var keywords =	'abstract case catch class def' +
        ' do else extends false final' +
        ' finally for if implicit import lazy' +
        ' match new null object override' +
        ' package private protected requires return' +
        ' sealed super this throw trait' +
        ' try true type val var' +
        ' while with yield' +        
        ' _ : = => <- <: <% <: # @';

    
	this.regexList = [
		{ regex: dp.sh.RegexLib.SingleLineCComments,							css: 'comment' },		// one line comments
		{ regex: dp.sh.RegexLib.MultiLineCComments,								css: 'comment' },		// multiline comments
		{ regex: dp.sh.RegexLib.DoubleQuotedString,								css: 'string' },		// strings
		{ regex: dp.sh.RegexLib.SingleQuotedString,								css: 'string' },		// strings
		{ regex: new RegExp('\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b', 'gi'),	css: 'number' },		// numbers
		{ regex: new RegExp('(?!\\@interface\\b)\\@[\\$\\w]+\\b', 'g'),			css: 'annotation' },	// annotation @anno
		{ regex: new RegExp('\\@interface\\b', 'g'),							css: 'keyword' },		// @interface keyword
		{ regex: new RegExp(this.GetKeywords(keywords), 'gm'),					css: 'keyword' }		// java keyword
		];

	this.CssClass = 'dp-sc';
	this.Style =	'.dp-sc .annotation { color: #646464; }' +
					'.dp-sc .number { color: #C00000; }';
}

dp.sh.Brushes.Scala.prototype	= new dp.sh.Highlighter();
dp.sh.Brushes.Scala.Aliases	= ['scala'];
