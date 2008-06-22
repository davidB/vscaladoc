var cfg_showInherited = true;

var toggleInherited= function() {
  cfg_showInherited = !cfg_showInherited;
  $.cookie('showInherited', cfg_showInherited);
  updateInherited();
}

var updateInherited = function() {
  $("input.filter_inherited_cb").each(function(){this.checked = cfg_showInherited});
  if (cfg_showInherited) {
      $("tr.isInherited").show();
  } else {
      $("tr.isInherited").hide();
  }
}

$(document).ready(function(){
  parent.document.title=document.title;
  cfg_showInherited = $.cookie('showInherited');
  cfg_showInherited = (cfg_showInherited == true || cfg_showInherited == "true");
  updateInherited();
  $("div.apiCommentsDetails").hide();
});

var selectPackage = function(name) {
    if(parent.navFrame) {
        parent.navFrame.selectPackage(name);
    }
}
