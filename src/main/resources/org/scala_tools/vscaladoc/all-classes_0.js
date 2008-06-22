// manage user Options
var cfg = {
  filter4NameIgnoreCase : false,
  filter4NameAsRegExp : false
};

var togglefilter4NameOptions = function(optionName) {
  cfg[optionName] = !cfg[optionName];
  $.cookie(optionName, cfg[optionName]);
  $("input.option_" + optionName + "_cb").each(function(){this.checked = cfg[optionName]});
  updateFilter4NameRE();
};

$(document).ready(function(){
  for (optionName in cfg) {
    cfg[optionName] = $.cookie(optionName);
    cfg[optionName] = (cfg[optionName] == true || cfg[optionName] == "true");
    $("input.option_" + optionName + "_cb").each(function(){this.checked = cfg[optionName]});
  };
});

// Filter

var filter4Packages = [];
var updateFilter4Packages = function(evt){
    filter4Packages = [];
    var select = $("#packagesFilter").get(0);//evt.target; //this
    for (var i=0; i<select.options.length; i++) {
        if (select.options[i].selected == true) {
            filter4Packages.push(select.options[i].text);
        }
    }
    updateClassesDisplay();
};

var checkFilter4Packages = function(jqElem) {
    if (filter4Packages.length < 1) {
        return true;
    }
    var pkg = jqElem.attr('package');
    return  (jQuery.inArray(pkg, filter4Packages) != -1);
}

var filter4Kind = [];
var maxKind = 0;
var toggleFilter4Kind = function(evt) {
    var kind = evt.data;
    var index = jQuery.inArray(kind, filter4Kind);
    if (index > -1) {
        filter4Kind.splice(index,1);
    } else {
        filter4Kind.push(kind);
    }
    $("#filter_" + kind +"_cb").get(0).checked= (index < 0);
    updateClassesDisplay();
};

var checkFilter4Kind = function(jqElem) {
    if (filter4Kind.length == maxKind)  {
        return true;
    }
    var kind = jqElem.attr('class');
    return (jQuery.inArray(kind, filter4Kind) != -1);
};

var filter4NameRE = null;
var filter4Name = "";

var updateFilter4Name = function(evt) {
    filter4Name = this.value;
    updateFilter4NameRE();
}
var updateFilter4NameRE = function() {
    if ((filter4Name == null) || (filter4Name.length == 0)) {
      filter4NameRE = null;
    } else {
      var flags = (cfg.filter4NameIgnoreCase) ? "i": "";
      var pattern = (cfg.filter4NameAsRegExp) ? filter4Name : "^" + filter4Name;
      filter4NameRE = new RegExp(pattern, flags);
    }
    updateClassesDisplay();
};

var checkFilter4Name = function(jqElem) {
    if (filter4NameRE == null)  {
        return true;
    }
    var name = jqElem.children("a").text();
    return filter4NameRE.test(name);
};

var lastUpdateClassDisplayCallId = null;
var updateClassesDisplay = function() {
    if (lastUpdateClassDisplayCallId != null) {
        clearTimeout(lastUpdateClassDisplayCallId);
    }
    lastUpdateClassDisplayCallId = setTimeout("updateClassesDisplayNow()", 300);
};
var updateClassesDisplayNow = function() {
    $("#classes li").each(function() {
            var jqElem = $(this);
            //alert(jqElem + " "+ checkFilter4Packages(jqElem) + " " + checkFilter4Kind(jqElem));
            if (checkFilter4Packages(jqElem) && checkFilter4Kind(jqElem) && checkFilter4Name(jqElem)) {
                jqElem.show();
            } else {
                jqElem.hide();
            }
    });
};

$(document).ready(function(){
        $("#packagesFilter")
        .each(function() {
                for (var i=0; i<this.options.length; i++) {
                    this.options[i].selected = false;
                }
        })
        .bind("change", updateFilter4Packages)
        ;
        $("#kindFilters a").each(function() {
                var jqElem = $(this);
                var kind = jqElem.attr("id").substring("filter_".length);
                jqElem.bind("click", kind, toggleFilter4Kind);
                filter4Kind.push(kind);
                $("#filter_" + kind +"_cb").get(0).checked= true;
                maxKind++;
        });
        //$("#nameFilter").bind("keypress", function(){console.log("keypress")});
        //$("#nameFilter").bind("keydown", function(){console.log("keydown")});
        //$("#nameFilter").bind("keyup", function(){console.log("keyup")});
        $("#nameFilter").val("");
        $("#nameFilter").bind("keyup", updateFilter4Name);
});

/**
* Selects an option by value
*
* @name     selectOptions
* @author   Mathias Bank (http://www.mathias-bank.de)
* @param    value specifies, which options should be selected
* @example  jQuery("#myselect").selectOptions("val1");
*
*/
jQuery.fn.selectOptions = function(value) {
    this.each(
        function()	{
            if(this.nodeName.toLowerCase() != "select") return;

            // get number of options
            var optionsLength = this.options.length;


            for(var i = 0; i<optionsLength; i++) {
                this.options[i].selected = (this.options[i].text == value);
            }
        }
    );
    return this;
};

var selectPackage = function(name) {
    $("#packagesFilter").selectOptions(name);
    updateFilter4Packages();
};
