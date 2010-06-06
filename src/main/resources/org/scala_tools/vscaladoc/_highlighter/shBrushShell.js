dp.sh.Brushes.Shell = function()
{
	//var keywords =	'';
    
	this.regexList = [
		{ regex: dp.sh.RegexLib.SingleLinePerlComments,							css: 'comment' },		// one line comments
		//{ regex: new RegExp(this.GetKeywords(keywords), 'gm'),					css: 'keyword' }		// keywords
		];

	this.CssClass = 'dp-sh';
	this.Style =	'.dp-sh .annotation { color: #646464; }' +
					'.dp-sh .number { color: #C00000; }';
}

dp.sh.Brushes.Shell.prototype	= new dp.sh.Highlighter();
dp.sh.Brushes.Shell.Aliases	= ['shell'];
