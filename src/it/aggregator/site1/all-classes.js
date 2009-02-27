var cfg={filter4NameIgnoreCase:false,filter4NameAsRegExp:false};
var togglefilter4NameOptions=function(B){cfg[B]=!cfg[B];
$.cookie(B,cfg[B]);
$("input.option_"+B+"_cb").each(function(){this.checked=cfg[B]
});
updateFilter4NameRE()
};
$(document).ready(function(){for(optionName in cfg){cfg[optionName]=$.cookie(optionName);
cfg[optionName]=(cfg[optionName]==true||cfg[optionName]=="true");
$("input.option_"+optionName+"_cb").each(function(){this.checked=cfg[optionName]
})
}});
var filter4Packages=[];
var updateFilter4Packages=function(D){filter4Packages=[];
var E=$("#packagesFilter").get(0);
for(var F=0;
F<E.options.length;
F++){if(E.options[F].selected==true){filter4Packages.push(E.options[F].text)
}}updateClassesDisplay()
};
var checkFilter4Packages=function(C){if(filter4Packages.length<1){return true
}var D=C.attr("package");
return(jQuery.inArray(D,filter4Packages)!=-1)
};
var filter4Kind=[];
var maxKind=0;
var toggleFilter4Kind=function(E){var F=E.data;
var D=jQuery.inArray(F,filter4Kind);
if(D>-1){filter4Kind.splice(D,1)
}else{filter4Kind.push(F)
}$("#filter_"+F+"_cb").get(0).checked=(D<0);
updateClassesDisplay()
};
var checkFilter4Kind=function(C){if(filter4Kind.length==maxKind){return true
}var D=C.attr("class");
return(jQuery.inArray(D,filter4Kind)!=-1)
};
var filter4NameRE=null;
var filter4Name="";
var updateFilter4Name=function(B){filter4Name=this.value;
updateFilter4NameRE()
};
var updateFilter4NameRE=function(){if((filter4Name==null)||(filter4Name.length==0)){filter4NameRE=null
}else{var D=(cfg.filter4NameIgnoreCase)?"i":"";
var C=(cfg.filter4NameAsRegExp)?filter4Name:"^"+filter4Name;
filter4NameRE=new RegExp(C,D)
}updateClassesDisplay()
};
var checkFilter4Name=function(C){if(filter4NameRE==null){return true
}var D=C.children("a").text();
return filter4NameRE.test(D)
};
var lastUpdateClassDisplayCallId=null;
var updateClassesDisplay=function(){if(lastUpdateClassDisplayCallId!=null){clearTimeout(lastUpdateClassDisplayCallId)
}lastUpdateClassDisplayCallId=setTimeout("updateClassesDisplayNow()",300)
};
var updateClassesDisplayNow=function(){$("#classes li").each(function(){var B=$(this);
if(checkFilter4Packages(B)&&checkFilter4Kind(B)&&checkFilter4Name(B)){B.show()
}else{B.hide()
}})
};
$(document).ready(function(){$("#packagesFilter").each(function(){for(var B=0;
B<this.options.length;
B++){this.options[B].selected=false
}}).bind("change",updateFilter4Packages);
$("#kindFilters a").each(function(){var C=$(this);
var D=C.attr("id").substring("filter_".length);
C.bind("click",D,toggleFilter4Kind);
filter4Kind.push(D);
$("#filter_"+D+"_cb").get(0).checked=true;
maxKind++
});
$("#nameFilter").val("");
$("#nameFilter").bind("keyup",updateFilter4Name)
});
jQuery.fn.selectOptions=function(B){this.each(function(){if(this.nodeName.toLowerCase()!="select"){return 
}var A=this.options.length;
for(var D=0;
D<A;
D++){this.options[D].selected=(this.options[D].text==B)
}});
return this
};
var selectPackage=function(B){$("#packagesFilter").selectOptions(B);
updateFilter4Packages()
};
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
