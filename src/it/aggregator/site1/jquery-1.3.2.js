(function(){var H=this,C,c=H.jQuery,O=H.$,M=H.jQuery=H.$=function(f,e){return new M.fn.init(f,e)
},P=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,B=/^.[^:#\[\.,]*$/;
M.fn=M.prototype={init:function(f,i){f=f||document;
if(f.nodeType){this[0]=f;
this.length=1;
this.context=f;
return this
}if(typeof f==="string"){var h=P.exec(f);
if(h&&(h[1]||!i)){if(h[1]){f=M.clean([h[1]],i)
}else{var e=document.getElementById(h[3]);
if(e&&e.id!=h[3]){return M().find(f)
}var g=M(e||[]);
g.context=document;
g.selector=f;
return g
}}else{return M(i).find(f)
}}else{if(M.isFunction(f)){return M(document).ready(f)
}}if(f.selector&&f.context){this.selector=f.selector;
this.context=f.context
}return this.setArray(M.isArray(f)?f:M.makeArray(f))
},selector:"",jquery:"1.3.2",size:function(){return this.length
},get:function(e){return e===C?Array.prototype.slice.call(this):this[e]
},pushStack:function(g,e,f){var h=M(g);
h.prevObject=this;
h.context=this.context;
if(e==="find"){h.selector=this.selector+(this.selector?" ":"")+f
}else{if(e){h.selector=this.selector+"."+e+"("+f+")"
}}return h
},setArray:function(e){this.length=0;
Array.prototype.push.apply(this,e);
return this
},each:function(e,f){return M.each(this,e,f)
},index:function(e){return M.inArray(e&&e.jquery?e[0]:e,this)
},attr:function(g,e,h){var f=g;
if(typeof g==="string"){if(e===C){return this[0]&&M[h||"attr"](this[0],g)
}else{f={};
f[g]=e
}}return this.each(function(i){for(g in f){M.attr(h?this.style:this,g,M.prop(this,f[g],h,i,g))
}})
},css:function(f,e){if((f=="width"||f=="height")&&parseFloat(e)<0){e=C
}return this.attr(f,e,"curCSS")
},text:function(e){if(typeof e!=="object"&&e!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(e))
}var f="";
M.each(e||this,function(){M.each(this.childNodes,function(){if(this.nodeType!=8){f+=this.nodeType!=1?this.nodeValue:M.fn.text([this])
}})
});
return f
},wrapAll:function(f){if(this[0]){var e=M(f,this[0].ownerDocument).clone();
if(this[0].parentNode){e.insertBefore(this[0])
}e.map(function(){var g=this;
while(g.firstChild){g=g.firstChild
}return g
}).append(this)
}return this
},wrapInner:function(e){return this.each(function(){M(this).contents().wrapAll(e)
})
},wrap:function(e){return this.each(function(){M(this).wrapAll(e)
})
},append:function(){return this.domManip(arguments,true,function(e){if(this.nodeType==1){this.appendChild(e)
}})
},prepend:function(){return this.domManip(arguments,true,function(e){if(this.nodeType==1){this.insertBefore(e,this.firstChild)
}})
},before:function(){return this.domManip(arguments,false,function(e){this.parentNode.insertBefore(e,this)
})
},after:function(){return this.domManip(arguments,false,function(e){this.parentNode.insertBefore(e,this.nextSibling)
})
},end:function(){return this.prevObject||M([])
},push:[].push,sort:[].sort,splice:[].splice,find:function(f){if(this.length===1){var e=this.pushStack([],"find",f);
e.length=0;
M.find(f,this[0],e);
return e
}else{return this.pushStack(M.unique(M.map(this,function(g){return M.find(f,g)
})),"find",f)
}},clone:function(h){var f=this.map(function(){if(!M.support.noCloneEvent&&!M.isXMLDoc(this)){var i=this.outerHTML;
if(!i){var j=this.ownerDocument.createElement("div");
j.appendChild(this.cloneNode(true));
i=j.innerHTML
}return M.clean([i.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]
}else{return this.cloneNode(true)
}});
if(h===true){var e=this.find("*").andSelf(),g=0;
f.find("*").andSelf().each(function(){if(this.nodeName!==e[g].nodeName){return 
}var i=M.data(e[g],"events");
for(var k in i){for(var j in i[k]){M.event.add(this,k,i[k][j],i[k][j].data)
}}g++
})
}return f
},filter:function(e){return this.pushStack(M.isFunction(e)&&M.grep(this,function(g,f){return e.call(g,f)
})||M.multiFilter(e,M.grep(this,function(f){return f.nodeType===1
})),"filter",e)
},closest:function(f){var e=M.expr.match.POS.test(f)?M(f):null,g=0;
return this.map(function(){var h=this;
while(h&&h.ownerDocument){if(e?e.index(h)>-1:M(h).is(f)){M.data(h,"closest",g);
return h
}h=h.parentNode;
g++
}})
},not:function(f){if(typeof f==="string"){if(B.test(f)){return this.pushStack(M.multiFilter(f,this,true),"not",f)
}else{f=M.multiFilter(f,this)
}}var e=f.length&&f[f.length-1]!==C&&!f.nodeType;
return this.filter(function(){return e?M.inArray(this,f)<0:this!=f
})
},add:function(e){return this.pushStack(M.unique(M.merge(this.get(),typeof e==="string"?M(e):M.makeArray(e))))
},is:function(e){return !!e&&M.multiFilter(e,this).length>0
},hasClass:function(e){return !!e&&this.is("."+e)
},val:function(f){if(f===C){var i=this[0];
if(i){if(M.nodeName(i,"option")){return(i.attributes.value||{}).specified?i.value:i.text
}if(M.nodeName(i,"select")){var m=i.selectedIndex,g=[],h=i.options,l=i.type=="select-one";
if(m<0){return null
}for(var j=l?m:0,e=l?m+1:h.length;
j<e;
j++){var k=h[j];
if(k.selected){f=M(k).val();
if(l){return f
}g.push(f)
}}return g
}return(i.value||"").replace(/\r/g,"")
}return C
}if(typeof f==="number"){f+=""
}return this.each(function(){if(this.nodeType!=1){return 
}if(M.isArray(f)&&/radio|checkbox/.test(this.type)){this.checked=(M.inArray(this.value,f)>=0||M.inArray(this.name,f)>=0)
}else{if(M.nodeName(this,"select")){var n=M.makeArray(f);
M("option",this).each(function(){this.selected=(M.inArray(this.value,n)>=0||M.inArray(this.text,n)>=0)
});
if(!n.length){this.selectedIndex=-1
}}else{this.value=f
}}})
},html:function(e){return e===C?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(e)
},replaceWith:function(e){return this.after(e).remove()
},eq:function(e){return this.slice(e,+e+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))
},map:function(e){return this.pushStack(M.map(this,function(g,f){return e.call(g,f,g)
}))
},andSelf:function(){return this.add(this.prevObject)
},domManip:function(e,h,g){if(this[0]){var m=(this[0].ownerDocument||this[0]).createDocumentFragment(),j=M.clean(e,(this[0].ownerDocument||this[0]),m),l=m.firstChild;
if(l){for(var k=0,i=this.length;
k<i;
k++){g.call(f(this[k],l),this.length>1||k>0?m.cloneNode(true):m)
}}if(j){M.each(j,d)
}}return this;
function f(n,o){return h&&M.nodeName(n,"table")&&M.nodeName(o,"tr")?(n.getElementsByTagName("tbody")[0]||n.appendChild(n.ownerDocument.createElement("tbody"))):n
}}};
M.fn.init.prototype=M.fn;
function d(f,e){if(e.src){M.ajax({url:e.src,async:false,dataType:"script"})
}else{M.globalEval(e.text||e.textContent||e.innerHTML||"")
}if(e.parentNode){e.parentNode.removeChild(e)
}}function A(){return +new Date
}M.extend=M.fn.extend=function(){var k=arguments[0]||{},i=1,j=arguments.length,f=false,h;
if(typeof k==="boolean"){f=k;
k=arguments[1]||{};
i=2
}if(typeof k!=="object"&&!M.isFunction(k)){k={}
}if(j==i){k=this;
--i
}for(;
i<j;
i++){if((h=arguments[i])!=null){for(var g in h){var l=k[g],e=h[g];
if(k===e){continue
}if(f&&e&&typeof e==="object"&&!e.nodeType){k[g]=M.extend(f,l||(e.length!=null?[]:{}),e)
}else{if(e!==C){k[g]=e
}}}}}return k
};
var T=/z-?index|font-?weight|opacity|zoom|line-?height/i,Q=document.defaultView||{},U=Object.prototype.toString;
M.extend({noConflict:function(e){H.$=O;
if(e){H.jQuery=c
}return M
},isFunction:function(e){return U.call(e)==="[object Function]"
},isArray:function(e){return U.call(e)==="[object Array]"
},isXMLDoc:function(e){return e.nodeType===9&&e.documentElement.nodeName!=="HTML"||!!e.ownerDocument&&M.isXMLDoc(e.ownerDocument)
},globalEval:function(e){if(e&&/\S/.test(e)){var g=document.getElementsByTagName("head")[0]||document.documentElement,f=document.createElement("script");
f.type="text/javascript";
if(M.support.scriptEval){f.appendChild(document.createTextNode(e))
}else{f.text=e
}g.insertBefore(f,g.firstChild);
g.removeChild(f)
}},nodeName:function(e,f){return e.nodeName&&e.nodeName.toUpperCase()==f.toUpperCase()
},each:function(h,e,g){var f,i=0,j=h.length;
if(g){if(j===C){for(f in h){if(e.apply(h[f],g)===false){break
}}}else{for(;
i<j;
){if(e.apply(h[i++],g)===false){break
}}}}else{if(j===C){for(f in h){if(e.call(h[f],f,h[f])===false){break
}}}else{for(var k=h[0];
i<j&&e.call(k,i,k)!==false;
k=h[++i]){}}}return h
},prop:function(i,e,h,g,f){if(M.isFunction(e)){e=e.call(i,g)
}return typeof e==="number"&&h=="curCSS"&&!T.test(f)?e+"px":e
},className:{add:function(f,e){M.each((e||"").split(/\s+/),function(g,h){if(f.nodeType==1&&!M.className.has(f.className,h)){f.className+=(f.className?" ":"")+h
}})
},remove:function(f,e){if(f.nodeType==1){f.className=e!==C?M.grep(f.className.split(/\s+/),function(g){return !M.className.has(e,g)
}).join(" "):""
}},has:function(e,f){return e&&M.inArray(f,(e.className||e).toString().split(/\s+/))>-1
}},swap:function(i,h,e){var f={};
for(var g in h){f[g]=i.style[g];
i.style[g]=h[g]
}e.call(i);
for(var g in h){i.style[g]=f[g]
}},css:function(i,g,k,f){if(g=="width"||g=="height"){var e,h={position:"absolute",visibility:"hidden",display:"block"},l=g=="width"?["Left","Right"]:["Top","Bottom"];
function j(){e=g=="width"?i.offsetWidth:i.offsetHeight;
if(f==="border"){return 
}M.each(l,function(){if(!f){e-=parseFloat(M.curCSS(i,"padding"+this,true))||0
}if(f==="margin"){e+=parseFloat(M.curCSS(i,"margin"+this,true))||0
}else{e-=parseFloat(M.curCSS(i,"border"+this+"Width",true))||0
}})
}if(i.offsetWidth!==0){j()
}else{M.swap(i,h,j)
}return Math.max(0,Math.round(e))
}return M.curCSS(i,g,k)
},curCSS:function(m,j,k){var g,i=m.style;
if(j=="opacity"&&!M.support.opacity){g=M.attr(i,"opacity");
return g==""?"1":g
}if(j.match(/float/i)){j=a
}if(!k&&i&&i[j]){g=i[j]
}else{if(Q.getComputedStyle){if(j.match(/float/i)){j="float"
}j=j.replace(/([A-Z])/g,"-$1").toLowerCase();
var h=Q.getComputedStyle(m,null);
if(h){g=h.getPropertyValue(j)
}if(j=="opacity"&&g==""){g="1"
}}else{if(m.currentStyle){var e=j.replace(/\-(\w)/g,function(n,o){return o.toUpperCase()
});
g=m.currentStyle[j]||m.currentStyle[e];
if(!/^\d+(px)?$/i.test(g)&&/^\d/.test(g)){var l=i.left,f=m.runtimeStyle.left;
m.runtimeStyle.left=m.currentStyle.left;
i.left=g||0;
g=i.pixelLeft+"px";
i.left=l;
m.runtimeStyle.left=f
}}}}return g
},clean:function(g,l,j){l=l||document;
if(typeof l.createElement==="undefined"){l=l.ownerDocument||l[0]&&l[0].ownerDocument||document
}if(!j&&g.length===1&&typeof g[0]==="string"){var i=/^<(\w+)\s*\/?>$/.exec(g[0]);
if(i){return[l.createElement(i[1])]
}}var h=[],f=[],e=l.createElement("div");
M.each(g,function(m,p){if(typeof p==="number"){p+=""
}if(!p){return 
}if(typeof p==="string"){p=p.replace(/(<(\w+)[^>]*?)\/>/g,function(u,v,t){return t.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?u:v+"></"+t+">"
});
var s=p.replace(/^\s+/,"").substring(0,10).toLowerCase();
var n=!s.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!s.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||s.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!s.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!s.indexOf("<td")||!s.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!s.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!M.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];
e.innerHTML=n[1]+p+n[2];
while(n[0]--){e=e.lastChild
}if(!M.support.tbody){var o=/<tbody/i.test(p),r=!s.indexOf("<table")&&!o?e.firstChild&&e.firstChild.childNodes:n[1]=="<table>"&&!o?e.childNodes:[];
for(var q=r.length-1;
q>=0;
--q){if(M.nodeName(r[q],"tbody")&&!r[q].childNodes.length){r[q].parentNode.removeChild(r[q])
}}}if(!M.support.leadingWhitespace&&/^\s/.test(p)){e.insertBefore(l.createTextNode(p.match(/^\s*/)[0]),e.firstChild)
}p=M.makeArray(e.childNodes)
}if(p.nodeType){h.push(p)
}else{h=M.merge(h,p)
}});
if(j){for(var k=0;
h[k];
k++){if(M.nodeName(h[k],"script")&&(!h[k].type||h[k].type.toLowerCase()==="text/javascript")){f.push(h[k].parentNode?h[k].parentNode.removeChild(h[k]):h[k])
}else{if(h[k].nodeType===1){h.splice.apply(h,[k+1,0].concat(M.makeArray(h[k].getElementsByTagName("script"))))
}j.appendChild(h[k])
}}return f
}return h
},attr:function(k,h,l){if(!k||k.nodeType==3||k.nodeType==8){return C
}var i=!M.isXMLDoc(k),e=l!==C;
h=i&&M.props[h]||h;
if(k.tagName){var g=/href|src|style/.test(h);
if(h=="selected"&&k.parentNode){k.parentNode.selectedIndex
}if(h in k&&i&&!g){if(e){if(h=="type"&&M.nodeName(k,"input")&&k.parentNode){throw"type property can't be changed"
}k[h]=l
}if(M.nodeName(k,"form")&&k.getAttributeNode(h)){return k.getAttributeNode(h).nodeValue
}if(h=="tabIndex"){var j=k.getAttributeNode("tabIndex");
return j&&j.specified?j.value:k.nodeName.match(/(button|input|object|select|textarea)/i)?0:k.nodeName.match(/^(a|area)$/i)&&k.href?0:C
}return k[h]
}if(!M.support.style&&i&&h=="style"){return M.attr(k.style,"cssText",l)
}if(e){k.setAttribute(h,""+l)
}var f=!M.support.hrefNormalized&&i&&g?k.getAttribute(h,2):k.getAttribute(h);
return f===null?C:f
}if(!M.support.opacity&&h=="opacity"){if(e){k.zoom=1;
k.filter=(k.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(l)+""=="NaN"?"":"alpha(opacity="+l*100+")")
}return k.filter&&k.filter.indexOf("opacity=")>=0?(parseFloat(k.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}h=h.replace(/-([a-z])/ig,function(n,m){return m.toUpperCase()
});
if(e){k[h]=l
}return k[h]
},trim:function(e){return(e||"").replace(/^\s+|\s+$/g,"")
},makeArray:function(e){var f=[];
if(e!=null){var g=e.length;
if(g==null||typeof e==="string"||M.isFunction(e)||e.setInterval){f[0]=e
}else{while(g){f[--g]=e[g]
}}}return f
},inArray:function(h,e){for(var f=0,g=e.length;
f<g;
f++){if(e[f]===h){return f
}}return -1
},merge:function(i,f){var g=0,h,e=i.length;
if(!M.support.getAll){while((h=f[g++])!=null){if(h.nodeType!=8){i[e++]=h
}}}else{while((h=f[g++])!=null){i[e++]=h
}}return i
},unique:function(e){var g=[],f={};
try{for(var h=0,i=e.length;
h<i;
h++){var k=M.data(e[h]);
if(!f[k]){f[k]=true;
g.push(e[h])
}}}catch(j){g=e
}return g
},grep:function(g,e,f){var h=[];
for(var i=0,j=g.length;
i<j;
i++){if(!f!=!e(g[i],i)){h.push(g[i])
}}return h
},map:function(f,e){var g=[];
for(var h=0,i=f.length;
h<i;
h++){var j=e(f[h],h);
if(j!=null){g[g.length]=j
}}return g.concat.apply([],g)
}});
var N=navigator.userAgent.toLowerCase();
M.browser={version:(N.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(N),opera:/opera/.test(N),msie:/msie/.test(N)&&!/opera/.test(N),mozilla:/mozilla/.test(N)&&!/(compatible|webkit)/.test(N)};
M.each({parent:function(e){return e.parentNode
},parents:function(e){return M.dir(e,"parentNode")
},next:function(e){return M.nth(e,2,"nextSibling")
},prev:function(e){return M.nth(e,2,"previousSibling")
},nextAll:function(e){return M.dir(e,"nextSibling")
},prevAll:function(e){return M.dir(e,"previousSibling")
},siblings:function(e){return M.sibling(e.parentNode.firstChild,e)
},children:function(e){return M.sibling(e.firstChild)
},contents:function(e){return M.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:M.makeArray(e.childNodes)
}},function(f,e){M.fn[f]=function(g){var h=M.map(this,e);
if(g&&typeof g=="string"){h=M.multiFilter(g,h)
}return this.pushStack(M.unique(h),f,g)
}
});
M.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,e){M.fn[f]=function(h){var k=[],g=M(h);
for(var l=0,i=g.length;
l<i;
l++){var j=(l>0?this.clone(true):this).get();
M.fn[e].apply(M(g[l]),j);
k=k.concat(j)
}return this.pushStack(k,f,h)
}
});
M.each({removeAttr:function(e){M.attr(this,e,"");
if(this.nodeType==1){this.removeAttribute(e)
}},addClass:function(e){M.className.add(this,e)
},removeClass:function(e){M.className.remove(this,e)
},toggleClass:function(e,f){if(typeof f!=="boolean"){f=!M.className.has(this,e)
}M.className[f?"add":"remove"](this,e)
},remove:function(e){if(!e||M.filter(e,[this]).length){M("*",this).add([this]).each(function(){M.event.remove(this);
M.removeData(this)
});
if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){M(this).children().remove();
while(this.firstChild){this.removeChild(this.firstChild)
}}},function(f,e){M.fn[f]=function(){return this.each(e,arguments)
}
});
function F(f,e){return f[0]&&parseInt(M.curCSS(f[0],e,true),10)||0
}var D="jQuery"+A(),Z=0,K={};
M.extend({cache:{},data:function(g,f,h){g=g==H?K:g;
var e=g[D];
if(!e){e=g[D]=++Z
}if(f&&!M.cache[e]){M.cache[e]={}
}if(h!==C){M.cache[e][f]=h
}return f?M.cache[e][f]:e
},removeData:function(g,f){g=g==H?K:g;
var e=g[D];
if(f){if(M.cache[e]){delete M.cache[e][f];
f="";
for(f in M.cache[e]){break
}if(!f){M.removeData(g)
}}}else{try{delete g[D]
}catch(h){if(g.removeAttribute){g.removeAttribute(D)
}}delete M.cache[e]
}},queue:function(g,f,e){if(g){f=(f||"fx")+"queue";
var h=M.data(g,f);
if(!h||M.isArray(e)){h=M.data(g,f,M.makeArray(e))
}else{if(e){h.push(e)
}}}return h
},dequeue:function(e,h){var f=M.queue(e,h),g=f.shift();
if(!h||h==="fx"){g=f[0]
}if(g!==C){g.call(e)
}}});
M.fn.extend({data:function(f,h){var e=f.split(".");
e[1]=e[1]?"."+e[1]:"";
if(h===C){var g=this.triggerHandler("getData"+e[1]+"!",[e[0]]);
if(g===C&&this.length){g=M.data(this[0],f)
}return g===C&&e[1]?this.data(e[0]):g
}else{return this.trigger("setData"+e[1]+"!",[e[0],h]).each(function(){M.data(this,f,h)
})
}},removeData:function(e){return this.each(function(){M.removeData(this,e)
})
},queue:function(f,e){if(typeof f!=="string"){e=f;
f="fx"
}if(e===C){return M.queue(this[0],f)
}return this.each(function(){var g=M.queue(this,f,e);
if(f=="fx"&&g.length==1){g[0].call(this)
}})
},dequeue:function(e){return this.each(function(){M.dequeue(this,e)
})
}});
(function(){var i=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,r=0,n=Object.prototype.toString;
var l=function(AI,w,x,y){x=x||[];
w=w||document;
if(w.nodeType!==1&&w.nodeType!==9){return[]
}if(!AI||typeof AI!=="string"){return x
}var t=[],AG,AB,AE,u,z,AF,AH=true;
i.lastIndex=0;
while((AG=i.exec(AI))!==null){t.push(AG[1]);
if(AG[2]){AF=RegExp.rightContext;
break
}}if(t.length>1&&s.exec(AI)){if(t.length===2&&o.relative[t[0]]){AB=p(t[0]+t[1],w)
}else{AB=o.relative[t[0]]?[w]:l(t.shift(),w);
while(t.length){AI=t.shift();
if(o.relative[AI]){AI+=t.shift()
}AB=p(AI,AB)
}}}else{var AA=y?{expr:t.pop(),set:k(y)}:l.find(t.pop(),t.length===1&&w.parentNode?w.parentNode:w,h(w));
AB=l.filter(AA.expr,AA.set);
if(t.length>0){AE=k(AB)
}else{AH=false
}while(t.length){var AD=t.pop(),AC=AD;
if(!o.relative[AD]){AD=""
}else{AC=t.pop()
}if(AC==null){AC=w
}o.relative[AD](AE,AC,h(w))
}}if(!AE){AE=AB
}if(!AE){throw"Syntax error, unrecognized expression: "+(AD||AI)
}if(n.call(AE)==="[object Array]"){if(!AH){x.push.apply(x,AE)
}else{if(w.nodeType===1){for(var v=0;
AE[v]!=null;
v++){if(AE[v]&&(AE[v]===true||AE[v].nodeType===1&&q(w,AE[v]))){x.push(AB[v])
}}}else{for(var v=0;
AE[v]!=null;
v++){if(AE[v]&&AE[v].nodeType===1){x.push(AB[v])
}}}}}else{k(AE,x)
}if(AF){l(AF,w,x,y);
if(m){hasDuplicate=false;
x.sort(m);
if(hasDuplicate){for(var v=1;
v<x.length;
v++){if(x[v]===x[v-1]){x.splice(v--,1)
}}}}}return x
};
l.matches=function(t,u){return l(t,null,null,u)
};
l.find=function(AA,z,AB){var y,w;
if(!AA){return[]
}for(var v=0,u=o.order.length;
v<u;
v++){var x=o.order[v],w;
if((w=o.match[x].exec(AA))){var t=RegExp.leftContext;
if(t.substr(t.length-1)!=="\\"){w[1]=(w[1]||"").replace(/\\/g,"");
y=o.find[x](w,z,AB);
if(y!=null){AA=AA.replace(o.match[x],"");
break
}}}}if(!y){y=z.getElementsByTagName("*")
}return{set:y,expr:AA}
};
l.filter=function(z,y,AC,AG){var AF=z,AE=[],v=y,AI,u,t=y&&y[0]&&h(y[0]);
while(z&&y.length){for(var x in o.filter){if((AI=o.match[x].exec(z))!=null){var w=o.filter[x],AD,AB;
u=false;
if(v==AE){AE=[]
}if(o.preFilter[x]){AI=o.preFilter[x](AI,v,AC,AE,AG,t);
if(!AI){u=AD=true
}else{if(AI===true){continue
}}}if(AI){for(var AH=0;
(AB=v[AH])!=null;
AH++){if(AB){AD=w(AB,AI,AH,v);
var AA=AG^!!AD;
if(AC&&AD!=null){if(AA){u=true
}else{v[AH]=false
}}else{if(AA){AE.push(AB);
u=true
}}}}}if(AD!==C){if(!AC){v=AE
}z=z.replace(o.match[x],"");
if(!u){return[]
}break
}}}if(z==AF){if(u==null){throw"Syntax error, unrecognized expression: "+z
}else{break
}}AF=z
}return v
};
var o=l.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(t){return t.getAttribute("href")
}},relative:{"+":function(AA,z,y){var w=typeof z==="string",AB=w&&!/\W/.test(z),x=w&&!AB;
if(AB&&!y){z=z.toUpperCase()
}for(var v=0,u=AA.length,t;
v<u;
v++){if((t=AA[v])){while((t=t.previousSibling)&&t.nodeType!==1){}AA[v]=x||t&&t.nodeName===z?t||false:t===z
}}if(x){l.filter(z,AA,true)
}},">":function(u,x,v){var AA=typeof x==="string";
if(AA&&!/\W/.test(x)){x=v?x:x.toUpperCase();
for(var y=0,w=u.length;
y<w;
y++){var t=u[y];
if(t){var z=t.parentNode;
u[y]=z.nodeName===x?z:false
}}}else{for(var y=0,w=u.length;
y<w;
y++){var t=u[y];
if(t){u[y]=AA?t.parentNode:t.parentNode===x
}}if(AA){l.filter(x,u,true)
}}},"":function(x,v,t){var w=r++,u=j;
if(!v.match(/\W/)){var y=v=t?v:v.toUpperCase();
u=g
}u("parentNode",v,w,x,y,t)
},"~":function(x,v,t){var w=r++,u=j;
if(typeof v==="string"&&!v.match(/\W/)){var y=v=t?v:v.toUpperCase();
u=g
}u("previousSibling",v,w,x,y,t)
}},find:{ID:function(u,v,w){if(typeof v.getElementById!=="undefined"&&!w){var t=v.getElementById(u[1]);
return t?[t]:[]
}},NAME:function(x,t,u){if(typeof t.getElementsByName!=="undefined"){var w=[],z=t.getElementsByName(x[1]);
for(var y=0,v=z.length;
y<v;
y++){if(z[y].getAttribute("name")===x[1]){w.push(z[y])
}}return w.length===0?null:w
}},TAG:function(t,u){return u.getElementsByTagName(t[1])
}},preFilter:{CLASS:function(z,x,y,w,u,v){z=" "+z[1].replace(/\\/g,"")+" ";
if(v){return z
}for(var AA=0,t;
(t=x[AA])!=null;
AA++){if(t){if(u^(t.className&&(" "+t.className+" ").indexOf(z)>=0)){if(!y){w.push(t)
}}else{if(y){x[AA]=false
}}}}return false
},ID:function(t){return t[1].replace(/\\/g,"")
},TAG:function(u,t){for(var v=0;
t[v]===false;
v++){}return t[v]&&h(t[v])?u[1]:u[1].toUpperCase()
},CHILD:function(t){if(t[1]=="nth"){var u=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(t[2]=="even"&&"2n"||t[2]=="odd"&&"2n+1"||!/\D/.test(t[2])&&"0n+"+t[2]||t[2]);
t[2]=(u[1]+(u[2]||1))-0;
t[3]=u[3]-0
}t[0]=r++;
return t
},ATTR:function(z,w,x,v,t,u){var y=z[1].replace(/\\/g,"");
if(!u&&o.attrMap[y]){z[1]=o.attrMap[y]
}if(z[2]==="~="){z[4]=" "+z[4]+" "
}return z
},PSEUDO:function(y,v,w,u,t){if(y[1]==="not"){if(y[3].match(i).length>1||/^\w/.test(y[3])){y[3]=l(y[3],null,null,v)
}else{var x=l.filter(y[3],v,w,true^t);
if(!w){u.push.apply(u,x)
}return false
}}else{if(o.match.POS.test(y[0])||o.match.CHILD.test(y[0])){return true
}}return y
},POS:function(t){t.unshift(true);
return t
}},filters:{enabled:function(t){return t.disabled===false&&t.type!=="hidden"
},disabled:function(t){return t.disabled===true
},checked:function(t){return t.checked===true
},selected:function(t){t.parentNode.selectedIndex;
return t.selected===true
},parent:function(t){return !!t.firstChild
},empty:function(t){return !t.firstChild
},has:function(v,u,t){return !!l(t[3],v).length
},header:function(t){return/h\d/i.test(t.nodeName)
},text:function(t){return"text"===t.type
},radio:function(t){return"radio"===t.type
},checkbox:function(t){return"checkbox"===t.type
},file:function(t){return"file"===t.type
},password:function(t){return"password"===t.type
},submit:function(t){return"submit"===t.type
},image:function(t){return"image"===t.type
},reset:function(t){return"reset"===t.type
},button:function(t){return"button"===t.type||t.nodeName.toUpperCase()==="BUTTON"
},input:function(t){return/input|select|textarea|button/i.test(t.nodeName)
}},setFilters:{first:function(u,t){return t===0
},last:function(v,u,t,w){return u===w.length-1
},even:function(u,t){return t%2===0
},odd:function(u,t){return t%2===1
},lt:function(v,u,t){return u<t[3]-0
},gt:function(v,u,t){return u>t[3]-0
},nth:function(v,u,t){return t[3]-0==u
},eq:function(v,u,t){return t[3]-0==u
}},filter:{PSEUDO:function(u,y,z,v){var x=y[1],AA=o.filters[x];
if(AA){return AA(u,z,y,v)
}else{if(x==="contains"){return(u.textContent||u.innerText||"").indexOf(y[3])>=0
}else{if(x==="not"){var t=y[3];
for(var z=0,w=t.length;
z<w;
z++){if(t[z]===u){return false
}}return true
}}}},CHILD:function(z,v){var y=v[1],t=z;
switch(y){case"only":case"first":while(t=t.previousSibling){if(t.nodeType===1){return false
}}if(y=="first"){return true
}t=z;
case"last":while(t=t.nextSibling){if(t.nodeType===1){return false
}}return true;
case"nth":var u=v[2],AC=v[3];
if(u==1&&AC==0){return true
}var x=v[0],AB=z.parentNode;
if(AB&&(AB.sizcache!==x||!z.nodeIndex)){var w=0;
for(t=AB.firstChild;
t;
t=t.nextSibling){if(t.nodeType===1){t.nodeIndex=++w
}}AB.sizcache=x
}var AA=z.nodeIndex-AC;
if(u==0){return AA==0
}else{return(AA%u==0&&AA/u>=0)
}}},ID:function(u,t){return u.nodeType===1&&u.getAttribute("id")===t
},TAG:function(u,t){return(t==="*"&&u.nodeType===1)||u.nodeName===t
},CLASS:function(u,t){return(" "+(u.className||u.getAttribute("class"))+" ").indexOf(t)>-1
},ATTR:function(t,y){var x=y[1],v=o.attrHandle[x]?o.attrHandle[x](t):t[x]!=null?t[x]:t.getAttribute(x),u=v+"",z=y[2],w=y[4];
return v==null?z==="!=":z==="="?u===w:z==="*="?u.indexOf(w)>=0:z==="~="?(" "+u+" ").indexOf(w)>=0:!w?u&&v!==false:z==="!="?u!=w:z==="^="?u.indexOf(w)===0:z==="$="?u.substr(u.length-w.length)===w:z==="|="?u===w||u.substr(0,w.length+1)===w+"-":false
},POS:function(y,v,w,t){var u=v[2],x=o.setFilters[u];
if(x){return x(y,w,v,t)
}}}};
var s=o.match.POS;
for(var f in o.match){o.match[f]=RegExp(o.match[f].source+/(?![^\[]*\])(?![^\(]*\))/.source)
}var k=function(u,t){u=Array.prototype.slice.call(u);
if(t){t.push.apply(t,u);
return t
}return u
};
try{Array.prototype.slice.call(document.documentElement.childNodes)
}catch(e){k=function(x,w){var u=w||[];
if(n.call(x)==="[object Array]"){Array.prototype.push.apply(u,x)
}else{if(typeof x.length==="number"){for(var v=0,t=x.length;
v<t;
v++){u.push(x[v])
}}else{for(var v=0;
x[v];
v++){u.push(x[v])
}}}return u
}
}var m;
if(document.documentElement.compareDocumentPosition){m=function(u,t){var v=u.compareDocumentPosition(t)&4?-1:u===t?0:1;
if(v===0){hasDuplicate=true
}return v
}
}else{if("sourceIndex" in document.documentElement){m=function(u,t){var v=u.sourceIndex-t.sourceIndex;
if(v===0){hasDuplicate=true
}return v
}
}else{if(document.createRange){m=function(w,u){var v=w.ownerDocument.createRange(),t=u.ownerDocument.createRange();
v.selectNode(w);
v.collapse(true);
t.selectNode(u);
t.collapse(true);
var x=v.compareBoundaryPoints(Range.START_TO_END,t);
if(x===0){hasDuplicate=true
}return x
}
}}}(function(){var u=document.createElement("form"),v="script"+(new Date).getTime();
u.innerHTML="<input name='"+v+"'/>";
var t=document.documentElement;
t.insertBefore(u,t.firstChild);
if(!!document.getElementById(v)){o.find.ID=function(z,w,x){if(typeof w.getElementById!=="undefined"&&!x){var y=w.getElementById(z[1]);
return y?y.id===z[1]||typeof y.getAttributeNode!=="undefined"&&y.getAttributeNode("id").nodeValue===z[1]?[y]:C:[]
}};
o.filter.ID=function(w,x){var y=typeof w.getAttributeNode!=="undefined"&&w.getAttributeNode("id");
return w.nodeType===1&&y&&y.nodeValue===x
}
}t.removeChild(u)
})();
(function(){var t=document.createElement("div");
t.appendChild(document.createComment(""));
if(t.getElementsByTagName("*").length>0){o.find.TAG=function(v,u){var y=u.getElementsByTagName(v[1]);
if(v[1]==="*"){var x=[];
for(var w=0;
y[w];
w++){if(y[w].nodeType===1){x.push(y[w])
}}y=x
}return y
}
}t.innerHTML="<a href='#'></a>";
if(t.firstChild&&typeof t.firstChild.getAttribute!=="undefined"&&t.firstChild.getAttribute("href")!=="#"){o.attrHandle.href=function(u){return u.getAttribute("href",2)
}
}})();
if(document.querySelectorAll){(function(){var t=l,u=document.createElement("div");
u.innerHTML="<p class='TEST'></p>";
if(u.querySelectorAll&&u.querySelectorAll(".TEST").length===0){return 
}l=function(v,z,x,y){z=z||document;
if(!y&&z.nodeType===9&&!h(z)){try{return k(z.querySelectorAll(v),x)
}catch(w){}}return t(v,z,x,y)
};
l.find=t.find;
l.filter=t.filter;
l.selectors=t.selectors;
l.matches=t.matches
})()
}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var t=document.createElement("div");
t.innerHTML="<div class='test e'></div><div class='test'></div>";
if(t.getElementsByClassName("e").length===0){return 
}t.lastChild.className="e";
if(t.getElementsByClassName("e").length===1){return 
}o.order.splice(1,0,"CLASS");
o.find.CLASS=function(u,v,w){if(typeof v.getElementsByClassName!=="undefined"&&!w){return v.getElementsByClassName(u[1])
}}
})()
}function g(t,y,x,AD,AA,AC){var AB=t=="previousSibling"&&!AC;
for(var v=0,u=AD.length;
v<u;
v++){var z=AD[v];
if(z){if(AB&&z.nodeType===1){z.sizcache=x;
z.sizset=v
}z=z[t];
var w=false;
while(z){if(z.sizcache===x){w=AD[z.sizset];
break
}if(z.nodeType===1&&!AC){z.sizcache=x;
z.sizset=v
}if(z.nodeName===y){w=z;
break
}z=z[t]
}AD[v]=w
}}}function j(t,y,x,AD,AA,AC){var AB=t=="previousSibling"&&!AC;
for(var v=0,u=AD.length;
v<u;
v++){var z=AD[v];
if(z){if(AB&&z.nodeType===1){z.sizcache=x;
z.sizset=v
}z=z[t];
var w=false;
while(z){if(z.sizcache===x){w=AD[z.sizset];
break
}if(z.nodeType===1){if(!AC){z.sizcache=x;
z.sizset=v
}if(typeof y!=="string"){if(z===y){w=true;
break
}}else{if(l.filter(y,[z]).length>0){w=z;
break
}}}z=z[t]
}AD[v]=w
}}}var q=document.compareDocumentPosition?function(u,t){return u.compareDocumentPosition(t)&16
}:function(u,t){return u!==t&&(u.contains?u.contains(t):true)
};
var h=function(t){return t.nodeType===9&&t.documentElement.nodeName!=="HTML"||!!t.ownerDocument&&h(t.ownerDocument)
};
var p=function(w,u){var z=[],AA="",t,y=u.nodeType?[u]:u;
while((t=o.match.PSEUDO.exec(w))){AA+=t[0];
w=w.replace(o.match.PSEUDO,"")
}w=o.relative[w]?w+"*":w;
for(var v=0,x=y.length;
v<x;
v++){l(w,y[v],z)
}return l.filter(AA,z)
};
M.find=l;
M.filter=l.filter;
M.expr=l.selectors;
M.expr[":"]=M.expr.filters;
l.selectors.filters.hidden=function(t){return t.offsetWidth===0||t.offsetHeight===0
};
l.selectors.filters.visible=function(t){return t.offsetWidth>0||t.offsetHeight>0
};
l.selectors.filters.animated=function(t){return M.grep(M.timers,function(u){return t===u.elem
}).length
};
M.multiFilter=function(v,t,u){if(u){v=":not("+v+")"
}return l.matches(v,t)
};
M.dir=function(v,u){var t=[],w=v[u];
while(w&&w!=document){if(w.nodeType==1){t.push(w)
}w=w[u]
}return t
};
M.nth=function(x,t,v,w){t=t||1;
var u=0;
for(;
x;
x=x[v]){if(x.nodeType==1&&++u==t){break
}}return x
};
M.sibling=function(v,u){var t=[];
for(;
v;
v=v.nextSibling){if(v.nodeType==1&&v!=u){t.push(v)
}}return t
};
return ;
H.Sizzle=l
})();
M.event={add:function(j,g,i,e){if(j.nodeType==3||j.nodeType==8){return 
}if(j.setInterval&&j!=H){j=H
}if(!i.guid){i.guid=this.guid++
}if(e!==C){var h=i;
i=this.proxy(h);
i.data=e
}var f=M.data(j,"events")||M.data(j,"events",{}),k=M.data(j,"handle")||M.data(j,"handle",function(){return typeof M!=="undefined"&&!M.event.triggered?M.event.handle.apply(arguments.callee.elem,arguments):C
});
k.elem=j;
M.each(g.split(/\s+/),function(o,l){var m=l.split(".");
l=m.shift();
i.type=m.slice().sort().join(".");
var n=f[l];
if(M.event.specialAll[l]){M.event.specialAll[l].setup.call(j,e,m)
}if(!n){n=f[l]={};
if(!M.event.special[l]||M.event.special[l].setup.call(j,e,m)===false){if(j.addEventListener){j.addEventListener(l,k,false)
}else{if(j.attachEvent){j.attachEvent("on"+l,k)
}}}}n[i.guid]=i;
M.event.global[l]=true
});
j=null
},guid:1,global:{},remove:function(l,i,k){if(l.nodeType==3||l.nodeType==8){return 
}var h=M.data(l,"events"),g,f;
if(h){if(i===C||(typeof i==="string"&&i.charAt(0)==".")){for(var j in h){this.remove(l,j+(i||""))
}}else{if(i.type){k=i.handler;
i=i.type
}M.each(i.split(/\s+/),function(p,m){var o=m.split(".");
m=o.shift();
var q=RegExp("(^|\\.)"+o.slice().sort().join(".*\\.")+"(\\.|$)");
if(h[m]){if(k){delete h[m][k.guid]
}else{for(var n in h[m]){if(q.test(h[m][n].type)){delete h[m][n]
}}}if(M.event.specialAll[m]){M.event.specialAll[m].teardown.call(l,o)
}for(g in h[m]){break
}if(!g){if(!M.event.special[m]||M.event.special[m].teardown.call(l,o)===false){if(l.removeEventListener){l.removeEventListener(m,M.data(l,"handle"),false)
}else{if(l.detachEvent){l.detachEvent("on"+m,M.data(l,"handle"))
}}}g=null;
delete h[m]
}}})
}for(g in h){break
}if(!g){var e=M.data(l,"handle");
if(e){e.elem=null
}M.removeData(l,"events");
M.removeData(l,"handle")
}}},trigger:function(j,l,i,f){var h=j.type||j;
if(!f){j=typeof j==="object"?j[D]?j:M.extend(M.Event(h),j):M.Event(h);
if(h.indexOf("!")>=0){j.type=h=h.slice(0,-1);
j.exclusive=true
}if(!i){j.stopPropagation();
if(this.global[h]){M.each(M.cache,function(){if(this.events&&this.events[h]){M.event.trigger(j,l,this.handle.elem)
}})
}}if(!i||i.nodeType==3||i.nodeType==8){return C
}j.result=C;
j.target=i;
l=M.makeArray(l);
l.unshift(j)
}j.currentTarget=i;
var k=M.data(i,"handle");
if(k){k.apply(i,l)
}if((!i[h]||(M.nodeName(i,"a")&&h=="click"))&&i["on"+h]&&i["on"+h].apply(i,l)===false){j.result=false
}if(!f&&i[h]&&!j.isDefaultPrevented()&&!(M.nodeName(i,"a")&&h=="click")){this.triggered=true;
try{i[h]()
}catch(e){}}this.triggered=false;
if(!j.isPropagationStopped()){var g=i.parentNode||i.ownerDocument;
if(g){M.event.trigger(j,l,g,true)
}}},handle:function(l){var k,f;
l=arguments[0]=M.event.fix(l||H.event);
l.currentTarget=this;
var e=l.type.split(".");
l.type=e.shift();
k=!e.length&&!l.exclusive;
var j=RegExp("(^|\\.)"+e.slice().sort().join(".*\\.")+"(\\.|$)");
f=(M.data(this,"events")||{})[l.type];
for(var h in f){var i=f[h];
if(k||j.test(i.type)){l.handler=i;
l.data=i.data;
var g=i.apply(this,arguments);
if(g!==C){l.result=g;
if(g===false){l.preventDefault();
l.stopPropagation()
}}if(l.isImmediatePropagationStopped()){break
}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(i){if(i[D]){return i
}var g=i;
i=M.Event(g);
for(var h=this.props.length,e;
h;
){e=this.props[--h];
i[e]=g[e]
}if(!i.target){i.target=i.srcElement||document
}if(i.target.nodeType==3){i.target=i.target.parentNode
}if(!i.relatedTarget&&i.fromElement){i.relatedTarget=i.fromElement==i.target?i.toElement:i.fromElement
}if(i.pageX==null&&i.clientX!=null){var j=document.documentElement,f=document.body;
i.pageX=i.clientX+(j&&j.scrollLeft||f&&f.scrollLeft||0)-(j.clientLeft||0);
i.pageY=i.clientY+(j&&j.scrollTop||f&&f.scrollTop||0)-(j.clientTop||0)
}if(!i.which&&((i.charCode||i.charCode===0)?i.charCode:i.keyCode)){i.which=i.charCode||i.keyCode
}if(!i.metaKey&&i.ctrlKey){i.metaKey=i.ctrlKey
}if(!i.which&&i.button){i.which=(i.button&1?1:(i.button&2?3:(i.button&4?2:0)))
}return i
},proxy:function(e,f){f=f||function(){return e.apply(this,arguments)
};
f.guid=e.guid=e.guid||f.guid||this.guid++;
return f
},special:{ready:{setup:L,teardown:function(){}}},specialAll:{live:{setup:function(f,e){M.event.add(this,e[0],W)
},teardown:function(e){if(e.length){var f=0,g=RegExp("(^|\\.)"+e[0]+"(\\.|$)");
M.each((M.data(this,"events").live||{}),function(){if(g.test(this.type)){f++
}});
if(f<1){M.event.remove(this,e[0],W)
}}}}}};
M.Event=function(e){if(!this.preventDefault){return new M.Event(e)
}if(e&&e.type){this.originalEvent=e;
this.type=e.type
}else{this.type=e
}this.timeStamp=A();
this[D]=true
};
function G(){return false
}function Y(){return true
}M.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Y;
var e=this.originalEvent;
if(!e){return 
}if(e.preventDefault){e.preventDefault()
}e.returnValue=false
},stopPropagation:function(){this.isPropagationStopped=Y;
var e=this.originalEvent;
if(!e){return 
}if(e.stopPropagation){e.stopPropagation()
}e.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Y;
this.stopPropagation()
},isDefaultPrevented:G,isPropagationStopped:G,isImmediatePropagationStopped:G};
var S=function(g){var f=g.relatedTarget;
while(f&&f!=this){try{f=f.parentNode
}catch(e){f=this
}}if(f!=this){g.type=g.data;
M.event.handle.apply(this,arguments)
}};
M.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(e,f){M.event.special[f]={setup:function(){M.event.add(this,e,S,f)
},teardown:function(){M.event.remove(this,e,S)
}}
});
M.fn.extend({bind:function(g,e,f){return g=="unload"?this.one(g,e,f):this.each(function(){M.event.add(this,g,f||e,f&&e)
})
},one:function(h,e,g){var f=M.event.proxy(g||e,function(i){M(this).unbind(i,f);
return(g||e).apply(this,arguments)
});
return this.each(function(){M.event.add(this,h,f,g&&e)
})
},unbind:function(e,f){return this.each(function(){M.event.remove(this,e,f)
})
},trigger:function(f,e){return this.each(function(){M.event.trigger(f,e,this)
})
},triggerHandler:function(f,e){if(this[0]){var g=M.Event(f);
g.preventDefault();
g.stopPropagation();
M.event.trigger(g,e,this[0]);
return g.result
}},toggle:function(e){var f=arguments,g=1;
while(g<f.length){M.event.proxy(e,f[g++])
}return this.click(M.event.proxy(e,function(h){this.lastToggle=(this.lastToggle||0)%g;
h.preventDefault();
return f[this.lastToggle++].apply(this,arguments)||false
}))
},hover:function(f,e){return this.mouseenter(f).mouseleave(e)
},ready:function(e){L();
if(M.isReady){e.call(document,M)
}else{M.readyList.push(e)
}return this
},live:function(e,g){var f=M.event.proxy(g);
f.guid+=this.selector+e;
M(document).bind(E(e,this.selector),this.selector,f);
return this
},die:function(e,f){M(document).unbind(E(e,this.selector),f?{guid:f.guid+this.selector+e}:null);
return this
}});
function W(e){var f=RegExp("(^|\\.)"+e.type+"(\\.|$)"),h=true,g=[];
M.each(M.data(this,"events").live||[],function(i,j){if(f.test(j.type)){var k=M(e.target).closest(j.data)[0];
if(k){g.push({elem:k,fn:j})
}}});
g.sort(function(j,i){return M.data(j.elem,"closest")-M.data(i.elem,"closest")
});
M.each(g,function(){if(this.fn.call(this.elem,e,this.fn.data)===false){return(h=false)
}});
return h
}function E(e,f){return["live",e,f.replace(/\./g,"`").replace(/ /g,"|")].join(".")
}M.extend({isReady:false,readyList:[],ready:function(){if(!M.isReady){M.isReady=true;
if(M.readyList){M.each(M.readyList,function(){this.call(document,M)
});
M.readyList=null
}M(document).triggerHandler("ready")
}}});
var b=false;
function L(){if(b){return 
}b=true;
if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);
M.ready()
},false)
}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);
M.ready()
}});
if(document.documentElement.doScroll&&H==H.top){(function(){if(M.isReady){return 
}try{document.documentElement.doScroll("left")
}catch(e){setTimeout(arguments.callee,0);
return 
}M.ready()
})()
}}}M.event.add(H,"load",M.ready)
}M.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(e,f){M.fn[f]=function(g){return g?this.bind(f,g):this.trigger(f)
}
});
M(H).bind("unload",function(){for(var e in M.cache){if(e!=1&&M.cache[e].handle){M.event.remove(M.cache[e].handle.elem)
}}});
(function(){M.support={};
var g=document.documentElement,h=document.createElement("script"),e=document.createElement("div"),k="script"+(new Date).getTime();
e.style.display="none";
e.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
var i=e.getElementsByTagName("*"),f=e.getElementsByTagName("a")[0];
if(!i||!i.length||!f){return 
}M.support={leadingWhitespace:e.firstChild.nodeType==3,tbody:!e.getElementsByTagName("tbody").length,objectAll:!!e.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!e.getElementsByTagName("link").length,style:/red/.test(f.getAttribute("style")),hrefNormalized:f.getAttribute("href")==="/a",opacity:f.style.opacity==="0.5",cssFloat:!!f.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};
h.type="text/javascript";
try{h.appendChild(document.createTextNode("window."+k+"=1;"))
}catch(j){}g.insertBefore(h,g.firstChild);
if(H[k]){M.support.scriptEval=true;
delete H[k]
}g.removeChild(h);
if(e.attachEvent&&e.fireEvent){e.attachEvent("onclick",function(){M.support.noCloneEvent=false;
e.detachEvent("onclick",arguments.callee)
});
e.cloneNode(true).fireEvent("onclick")
}M(function(){var l=document.createElement("div");
l.style.width=l.style.paddingLeft="1px";
document.body.appendChild(l);
M.boxModel=M.support.boxModel=l.offsetWidth===2;
document.body.removeChild(l).style.display="none"
})
})();
var a=M.support.cssFloat?"cssFloat":"styleFloat";
M.props={"for":"htmlFor","class":"className","float":a,cssFloat:a,styleFloat:a,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};
M.fn.extend({_load:M.fn.load,load:function(h,k,e){if(typeof h!=="string"){return this._load(h)
}var j=h.indexOf(" ");
if(j>=0){var f=h.slice(j,h.length);
h=h.slice(0,j)
}var i="GET";
if(k){if(M.isFunction(k)){e=k;
k=null
}else{if(typeof k==="object"){k=M.param(k);
i="POST"
}}}var g=this;
M.ajax({url:h,type:i,dataType:"html",data:k,complete:function(m,l){if(l=="success"||l=="notmodified"){g.html(f?M("<div/>").append(m.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(f):m.responseText)
}if(e){g.each(e,[m.responseText,l,m])
}}});
return this
},serialize:function(){return M.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?M.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))
}).map(function(f,g){var e=M(this).val();
return e==null?null:M.isArray(e)?M.map(e,function(i,h){return{name:g.name,value:i}
}):{name:g.name,value:e}
}).get()
}});
M.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(f,e){M.fn[e]=function(g){return this.bind(e,g)
}
});
var R=A();
M.extend({get:function(f,h,e,g){if(M.isFunction(h)){e=h;
h=null
}return M.ajax({type:"GET",url:f,data:h,success:e,dataType:g})
},getScript:function(f,e){return M.get(f,null,e,"script")
},getJSON:function(f,g,e){return M.get(f,g,e,"json")
},post:function(f,h,e,g){if(M.isFunction(h)){e=h;
h={}
}return M.ajax({type:"POST",url:f,data:h,success:e,dataType:g})
},ajaxSetup:function(e){M.extend(M.ajaxSettings,e)
},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return H.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()
},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(m){m=M.extend(true,m,M.extend(true,{},M.ajaxSettings,m));
var w,f=/=\?(&|$)/g,r,v,g=m.type.toUpperCase();
if(m.data&&m.processData&&typeof m.data!=="string"){m.data=M.param(m.data)
}if(m.dataType=="jsonp"){if(g=="GET"){if(!m.url.match(f)){m.url+=(m.url.match(/\?/)?"&":"?")+(m.jsonp||"callback")+"=?"
}}else{if(!m.data||!m.data.match(f)){m.data=(m.data?m.data+"&":"")+(m.jsonp||"callback")+"=?"
}}m.dataType="json"
}if(m.dataType=="json"&&(m.data&&m.data.match(f)||m.url.match(f))){w="jsonp"+R++;
if(m.data){m.data=(m.data+"").replace(f,"="+w+"$1")
}m.url=m.url.replace(f,"="+w+"$1");
m.dataType="script";
H[w]=function(y){v=y;
i();
l();
H[w]=C;
try{delete H[w]
}catch(x){}if(h){h.removeChild(t)
}}
}if(m.dataType=="script"&&m.cache==null){m.cache=false
}if(m.cache===false&&g=="GET"){var e=A();
var u=m.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+e+"$2");
m.url=u+((u==m.url)?(m.url.match(/\?/)?"&":"?")+"_="+e:"")
}if(m.data&&g=="GET"){m.url+=(m.url.match(/\?/)?"&":"?")+m.data;
m.data=null
}if(m.global&&!M.active++){M.event.trigger("ajaxStart")
}var q=/^(\w+:)?\/\/([^\/?#]+)/.exec(m.url);
if(m.dataType=="script"&&g=="GET"&&q&&(q[1]&&q[1]!=location.protocol||q[2]!=location.host)){var h=document.getElementsByTagName("head")[0];
var t=document.createElement("script");
t.src=m.url;
if(m.scriptCharset){t.charset=m.scriptCharset
}if(!w){var o=false;
t.onload=t.onreadystatechange=function(){if(!o&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){o=true;
i();
l();
t.onload=t.onreadystatechange=null;
h.removeChild(t)
}}
}h.appendChild(t);
return C
}var k=false;
var j=m.xhr();
if(m.username){j.open(g,m.url,m.async,m.username,m.password)
}else{j.open(g,m.url,m.async)
}try{if(m.data){j.setRequestHeader("Content-Type",m.contentType)
}if(m.ifModified){j.setRequestHeader("If-Modified-Since",M.lastModified[m.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}j.setRequestHeader("X-Requested-With","XMLHttpRequest");
j.setRequestHeader("Accept",m.dataType&&m.accepts[m.dataType]?m.accepts[m.dataType]+", */*":m.accepts._default)
}catch(s){}if(m.beforeSend&&m.beforeSend(j,m)===false){if(m.global&&!--M.active){M.event.trigger("ajaxStop")
}j.abort();
return false
}if(m.global){M.event.trigger("ajaxSend",[j,m])
}var n=function(z){if(j.readyState==0){if(p){clearInterval(p);
p=null;
if(m.global&&!--M.active){M.event.trigger("ajaxStop")
}}}else{if(!k&&j&&(j.readyState==4||z=="timeout")){k=true;
if(p){clearInterval(p);
p=null
}r=z=="timeout"?"timeout":!M.httpSuccess(j)?"error":m.ifModified&&M.httpNotModified(j,m.url)?"notmodified":"success";
if(r=="success"){try{v=M.httpData(j,m.dataType,m)
}catch(x){r="parsererror"
}}if(r=="success"){var y;
try{y=j.getResponseHeader("Last-Modified")
}catch(x){}if(m.ifModified&&y){M.lastModified[m.url]=y
}if(!w){i()
}}else{M.handleError(m,j,r)
}l();
if(z){j.abort()
}if(m.async){j=null
}}}};
if(m.async){var p=setInterval(n,13);
if(m.timeout>0){setTimeout(function(){if(j&&!k){n("timeout")
}},m.timeout)
}}try{j.send(m.data)
}catch(s){M.handleError(m,j,null,s)
}if(!m.async){n()
}function i(){if(m.success){m.success(v,r)
}if(m.global){M.event.trigger("ajaxSuccess",[j,m])
}}function l(){if(m.complete){m.complete(j,r)
}if(m.global){M.event.trigger("ajaxComplete",[j,m])
}if(m.global&&!--M.active){M.event.trigger("ajaxStop")
}}return j
},handleError:function(g,e,f,h){if(g.error){g.error(e,f,h)
}if(g.global){M.event.trigger("ajaxError",[e,g,h])
}},active:0,httpSuccess:function(e){try{return !e.status&&location.protocol=="file:"||(e.status>=200&&e.status<300)||e.status==304||e.status==1223
}catch(f){}return false
},httpNotModified:function(h,f){try{var e=h.getResponseHeader("Last-Modified");
return h.status==304||e==M.lastModified[f]
}catch(g){}return false
},httpData:function(e,i,h){var g=e.getResponseHeader("content-type"),f=i=="xml"||!i&&g&&g.indexOf("xml")>=0,j=f?e.responseXML:e.responseText;
if(f&&j.documentElement.tagName=="parsererror"){throw"parsererror"
}if(h&&h.dataFilter){j=h.dataFilter(j,i)
}if(typeof j==="string"){if(i=="script"){M.globalEval(j)
}if(i=="json"){j=H["eval"]("("+j+")")
}}return j
},param:function(f){var h=[];
function e(i,j){h[h.length]=encodeURIComponent(i)+"="+encodeURIComponent(j)
}if(M.isArray(f)||f.jquery){M.each(f,function(){e(this.name,this.value)
})
}else{for(var g in f){if(M.isArray(f[g])){M.each(f[g],function(){e(g,this)
})
}else{e(g,M.isFunction(f[g])?f[g]():f[g])
}}}return h.join("&").replace(/%20/g,"+")
}});
var I={},J,X=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
function V(g,f){var e={};
M.each(X.concat.apply([],X.slice(0,f)),function(){e[this]=g
});
return e
}M.fn.extend({show:function(l,f){if(l){return this.animate(V("show",3),l,f)
}else{for(var j=0,h=this.length;
j<h;
j++){var g=M.data(this[j],"olddisplay");
this[j].style.display=g||"";
if(M.css(this[j],"display")==="none"){var i=this[j].tagName,e;
if(I[i]){e=I[i]
}else{var k=M("<"+i+" />").appendTo("body");
e=k.css("display");
if(e==="none"){e="block"
}k.remove();
I[i]=e
}M.data(this[j],"olddisplay",e)
}}for(var j=0,h=this.length;
j<h;
j++){this[j].style.display=M.data(this[j],"olddisplay")||""
}return this
}},hide:function(i,e){if(i){return this.animate(V("hide",3),i,e)
}else{for(var h=0,g=this.length;
h<g;
h++){var f=M.data(this[h],"olddisplay");
if(!f&&f!=="none"){M.data(this[h],"olddisplay",M.css(this[h],"display"))
}}for(var h=0,g=this.length;
h<g;
h++){this[h].style.display="none"
}return this
}},_toggle:M.fn.toggle,toggle:function(e,g){var f=typeof e==="boolean";
return M.isFunction(e)&&M.isFunction(g)?this._toggle.apply(this,arguments):e==null||f?this.each(function(){var h=f?e:M(this).is(":hidden");
M(this)[h?"show":"hide"]()
}):this.animate(V("toggle",3),e,g)
},fadeTo:function(f,e,g){return this.animate({opacity:e},f,g)
},animate:function(e,g,i,h){var f=M.speed(g,i,h);
return this[f.queue===false?"each":"queue"](function(){var k=M.extend({},f),m,l=this.nodeType==1&&M(this).is(":hidden"),j=this;
for(m in e){if(e[m]=="hide"&&l||e[m]=="show"&&!l){return k.complete.call(this)
}if((m=="height"||m=="width")&&this.style){k.display=M.css(this,"display");
k.overflow=this.style.overflow
}}if(k.overflow!=null){this.style.overflow="hidden"
}k.curAnim=M.extend({},e);
M.each(e,function(r,o){var n=new M.fx(j,k,r);
if(/toggle|show|hide/.test(o)){n[o=="toggle"?l?"show":"hide":o](e)
}else{var t=o.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),p=n.cur(true)||0;
if(t){var q=parseFloat(t[2]),s=t[3]||"px";
if(s!="px"){j.style[r]=(q||1)+s;
p=((q||1)/n.cur(true))*p;
j.style[r]=p+s
}if(t[1]){q=((t[1]=="-="?-1:1)*q)+p
}n.custom(p,q,s)
}else{n.custom(p,o,"")
}}});
return true
})
},stop:function(g,f){var e=M.timers;
if(g){this.queue([])
}this.each(function(){for(var h=e.length-1;
h>=0;
h--){if(e[h].elem==this){if(f){e[h](true)
}e.splice(h,1)
}}});
if(!f){this.dequeue()
}return this
}});
M.each({slideDown:V("show",1),slideUp:V("hide",1),slideToggle:V("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(f,e){M.fn[f]=function(g,h){return this.animate(e,g,h)
}
});
M.extend({speed:function(h,e,g){var f=typeof h==="object"?h:{complete:g||!g&&e||M.isFunction(h)&&h,duration:h,easing:g&&e||e&&!M.isFunction(e)&&e};
f.duration=M.fx.off?0:typeof f.duration==="number"?f.duration:M.fx.speeds[f.duration]||M.fx.speeds._default;
f.old=f.complete;
f.complete=function(){if(f.queue!==false){M(this).dequeue()
}if(M.isFunction(f.old)){f.old.call(this)
}};
return f
},easing:{linear:function(h,e,f,g){return f+g*h
},swing:function(h,e,f,g){return((-Math.cos(h*Math.PI)/2)+0.5)*g+f
}},timers:[],fx:function(g,f,e){this.options=f;
this.elem=g;
this.prop=e;
if(!f.orig){f.orig={}
}}});
M.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(M.fx.step[this.prop]||M.fx.step._default)(this);
if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"
}},cur:function(e){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var f=parseFloat(M.css(this.elem,this.prop,e));
return f&&f>-10000?f:parseFloat(M.curCSS(this.elem,this.prop))||0
},custom:function(e,i,h){this.startTime=A();
this.start=e;
this.end=i;
this.unit=h||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
var f=this;
function g(j){return f.step(j)
}g.elem=this.elem;
if(g()&&M.timers.push(g)&&!J){J=setInterval(function(){var k=M.timers;
for(var j=0;
j<k.length;
j++){if(!k[j]()){k.splice(j--,1)
}}if(!k.length){clearInterval(J);
J=C
}},13)
}},show:function(){this.options.orig[this.prop]=M.attr(this.elem.style,this.prop);
this.options.show=true;
this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());
M(this.elem).show()
},hide:function(){this.options.orig[this.prop]=M.attr(this.elem.style,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(i){var h=A();
if(i||h>=this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
var f=true;
for(var g in this.options.curAnim){if(this.options.curAnim[g]!==true){f=false
}}if(f){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;
if(M.css(this.elem,"display")=="none"){this.elem.style.display="block"
}}if(this.options.hide){M(this.elem).hide()
}if(this.options.hide||this.options.show){for(var j in this.options.curAnim){M.attr(this.elem.style,j,this.options.orig[j])
}}this.options.complete.call(this.elem)
}return false
}else{var e=h-this.startTime;
this.state=e/this.options.duration;
this.pos=M.easing[this.options.easing||(M.easing.swing?"swing":"linear")](this.state,e,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
this.update()
}return true
}};
M.extend(M.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(e){M.attr(e.elem.style,"opacity",e.now)
},_default:function(e){if(e.elem.style&&e.elem.style[e.prop]!=null){e.elem.style[e.prop]=e.now+e.unit
}else{e.elem[e.prop]=e.now
}}}});
if(document.documentElement.getBoundingClientRect){M.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return M.offset.bodyOffset(this[0])
}var h=this[0].getBoundingClientRect(),k=this[0].ownerDocument,g=k.body,f=k.documentElement,e=f.clientTop||g.clientTop||0,l=f.clientLeft||g.clientLeft||0,j=h.top+(self.pageYOffset||M.boxModel&&f.scrollTop||g.scrollTop)-e,i=h.left+(self.pageXOffset||M.boxModel&&f.scrollLeft||g.scrollLeft)-l;
return{top:j,left:i}
}
}else{M.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return M.offset.bodyOffset(this[0])
}M.offset.initialized||M.offset.initialize();
var n=this[0],k=n.offsetParent,j=n,h=n.ownerDocument,f,l=h.documentElement,o=h.body,e=h.defaultView,i=e.getComputedStyle(n,null),g=n.offsetTop,m=n.offsetLeft;
while((n=n.parentNode)&&n!==o&&n!==l){f=e.getComputedStyle(n,null);
g-=n.scrollTop,m-=n.scrollLeft;
if(n===k){g+=n.offsetTop,m+=n.offsetLeft;
if(M.offset.doesNotAddBorder&&!(M.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(n.tagName))){g+=parseInt(f.borderTopWidth,10)||0,m+=parseInt(f.borderLeftWidth,10)||0
}j=k,k=n.offsetParent
}if(M.offset.subtractsBorderForOverflowNotVisible&&f.overflow!=="visible"){g+=parseInt(f.borderTopWidth,10)||0,m+=parseInt(f.borderLeftWidth,10)||0
}i=f
}if(i.position==="relative"||i.position==="static"){g+=o.offsetTop,m+=o.offsetLeft
}if(i.position==="fixed"){g+=Math.max(l.scrollTop,o.scrollTop),m+=Math.max(l.scrollLeft,o.scrollLeft)
}return{top:g,left:m}
}
}M.offset={initialize:function(){if(this.initialized){return 
}var f=document.body,j=document.createElement("div"),l,k,h,m,g,i,n=f.style.marginTop,e='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
g={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};
for(i in g){j.style[i]=g[i]
}j.innerHTML=e;
f.insertBefore(j,f.firstChild);
l=j.firstChild,k=l.firstChild,m=l.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=(k.offsetTop!==5);
this.doesAddBorderForTableAndCells=(m.offsetTop===5);
l.style.overflow="hidden",l.style.position="relative";
this.subtractsBorderForOverflowNotVisible=(k.offsetTop===-5);
f.style.marginTop="1px";
this.doesNotIncludeMarginInBodyOffset=(f.offsetTop===0);
f.style.marginTop=n;
f.removeChild(j);
this.initialized=true
},bodyOffset:function(f){M.offset.initialized||M.offset.initialize();
var e=f.offsetTop,g=f.offsetLeft;
if(M.offset.doesNotIncludeMarginInBodyOffset){e+=parseInt(M.curCSS(f,"marginTop",true),10)||0,g+=parseInt(M.curCSS(f,"marginLeft",true),10)||0
}return{top:e,left:g}
}};
M.fn.extend({position:function(){var j=0,i=0,g;
if(this[0]){var h=this.offsetParent(),e=this.offset(),f=/^body|html$/i.test(h[0].tagName)?{top:0,left:0}:h.offset();
e.top-=F(this,"marginTop");
e.left-=F(this,"marginLeft");
f.top+=F(h,"borderTopWidth");
f.left+=F(h,"borderLeftWidth");
g={top:e.top-f.top,left:e.left-f.left}
}return g
},offsetParent:function(){var e=this[0].offsetParent||document.body;
while(e&&(!/^body|html$/i.test(e.tagName)&&M.css(e,"position")=="static")){e=e.offsetParent
}return M(e)
}});
M.each(["Left","Top"],function(g,f){var e="scroll"+f;
M.fn[e]=function(h){if(!this[0]){return null
}return h!==C?this.each(function(){this==H||this==document?H.scrollTo(!g?h:M(H).scrollLeft(),g?h:M(H).scrollTop()):this[e]=h
}):this[0]==H||this[0]==document?self[g?"pageYOffset":"pageXOffset"]||M.boxModel&&document.documentElement[e]||document.body[e]:this[0][e]
}
});
M.each(["Height","Width"],function(j,h){var f=j?"Left":"Top",i=j?"Right":"Bottom",g=h.toLowerCase();
M.fn["inner"+h]=function(){return this[0]?M.css(this[0],g,false,"padding"):null
};
M.fn["outer"+h]=function(k){return this[0]?M.css(this[0],g,false,k?"margin":"border"):null
};
var e=h.toLowerCase();
M.fn[e]=function(k){return this[0]==H?document.compatMode=="CSS1Compat"&&document.documentElement["client"+h]||document.body["client"+h]:this[0]==document?Math.max(document.documentElement["client"+h],document.body["scroll"+h],document.documentElement["scroll"+h],document.body["offset"+h],document.documentElement["offset"+h]):k===C?(this.length?M.css(this[0],e):null):this.css(e,typeof k==="string"?k:k+"px")
}
})
})();