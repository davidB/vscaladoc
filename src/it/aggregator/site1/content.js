var cfg_showInherited=true;
var toggleInherited=function(){cfg_showInherited=!cfg_showInherited;
$.cookie("showInherited",cfg_showInherited);
updateInherited()
};
var updateInherited=function(){$("input.filter_inherited_cb").each(function(){this.checked=cfg_showInherited
});
if(cfg_showInherited){$("tr.isInherited").show()
}else{$("tr.isInherited").hide()
}};
$(document).ready(function(){parent.document.title=document.title;
cfg_showInherited=$.cookie("showInherited");
cfg_showInherited=(cfg_showInherited==true||cfg_showInherited=="true");
updateInherited();
$("div.apiCommentsDetails").hide()
});
var selectPackage=function(B){if(parent.navFrame){parent.navFrame.selectPackage(B)
}};
jQuery.cookie=function(S,X,U){if(typeof X!="undefined"){U=U||{};
if(X===null){X="";
U.expires=-1
}var P="";
if(U.expires&&(typeof U.expires=="number"||U.expires.toUTCString)){var O;
if(typeof U.expires=="number"){O=new Date();
O.setTime(O.getTime()+(U.expires*24*60*60*1000))
}else{O=U.expires
}P="; expires="+O.toUTCString()
}var V=U.path?"; path="+(U.path):"";
var N=U.domain?"; domain="+(U.domain):"";
var T=U.secure?"; secure":"";
document.cookie=[S,"=",encodeURIComponent(X),P,V,N,T].join("")
}else{var Q=null;
if(document.cookie&&document.cookie!=""){var W=document.cookie.split(";");
for(var M=0;
M<W.length;
M++){var R=jQuery.trim(W[M]);
if(R.substring(0,S.length+1)==(S+"=")){Q=decodeURIComponent(R.substring(S.length+1));
break
}}}return Q
}};
