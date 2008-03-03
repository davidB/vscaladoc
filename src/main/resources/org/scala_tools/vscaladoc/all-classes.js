var filterPackages = function(){
  var selected = new Array();
  $('select#packages').each(function(item) {
      for (var i=0,a=0; i<this.options.length; i++) {
        if (this.options[i].selected == true) {
          selected[a] = this.options[i].value;
          a++;
        }
      }
  });
  if (selected.length == 0) {
    $("#classes li").addClass("packageSelected");
  } else {
    $("#classes li").each(function(index) {
        var item = jQuery(this);
        if (jQuery.inArray(item.attr("package"), selected) > -1) {
          item.addClass("packageSelected");
        } else {
          item.removeClass("packageSelected");
        }
    });
  }
  updateClassesDisplay();
}

var filter = function(selector) {
  $("#classes ." + selector).toggleClass("classTypeSelected");
  var btn = $("#filter_"+ selector);
  btn.toggleClass("off");
  $("#filter_"+ selector +"_cb").get(0).checked = !btn.hasClass("off");
  updateClassesDisplay();
}
var showAll = function() {
  $("#classes li").addClass("classTypeSelected");
  $("#classTypeFilter a[id^=filter_]").removeClass("off");
  $("#classTypeFilter input[id^=filter_]").each(function(){this.checked = true});
  updateClassesDisplay();
}
var hideAll = function() {
  $("#classes li").removeClass("classTypeSelected");
  $("#classTypeFilter a[id^=filter_]").addClass("off");
  $("#classTypeFilter input[id^=filter_]").each(function(){this.checked = false});
  updateClassesDisplay();
}
var updateClassesDisplay = function() {
  $("#classes li").hide();
  $("#classes li").filter("li.packageSelected").filter("li.classTypeSelected").show();
}
$(document).ready(function(){
  filterPackages();
  showAll();
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
                this.options[i].selected = (this.options[i].value == value);
            }
        }
    )
    return this;
}

var selectPackage = function(name) {
    $("#packages").selectOptions(name);
    filterPackages();
}
