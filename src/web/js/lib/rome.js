// @bevacqua/rome@v3.0.2, MIT licensed. https://github.com/bevacqua/rome
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.rome=e()}}(function(){return function e(t,n,o){function r(i,s){if(!n[i]){if(!t[i]){var u="function"==typeof require&&require;if(!s&&u)return u(i,!0);if(a)return a(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return r(n?n:e)},l,l.exports,e,t,n,o)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(e,t){t.exports=function(e,t){return Array.prototype.slice.call(e,t)}},{}],2:[function(e,t){"use strict";function n(e,t,n){function i(){h.sleeping=!0}function s(){return u()}function u(e){var n=t.getBoundingClientRect(),o=document.body.scrollTop||document.documentElement.scrollTop;return v?(e=v.read(),{x:(e.absolute?0:n.left)+e.x,y:(e.absolute?0:n.top)+o+e.y+20}):{x:n.left,y:n.top+o}}function c(e){l(e)}function l(n){if(p)throw new Error("Bullseye can't refresh after being destroyed. Create another instance instead.");if(v&&!n)return h.sleeping=!1,v.refresh(),void 0;var o=u(n);v||t===e||(o.y+=t.offsetHeight),e.style.left=o.x+"px",e.style.top=o.y+"px"}function d(){v&&v.destroy(),o.remove(window,"resize",y),p=!0}var f=n,m=t&&t.tagName;m||2!==arguments.length||(f=t),m||(t=e),f||(f={});var p=!1,y=r(l,30),h={update:f.autoupdateToCaret!==!1&&c},v=f.caret&&a(t,h);return l(),f.tracking!==!1&&o.add(window,"resize",y),{read:s,refresh:l,destroy:d,sleep:i}}var o=e("crossvent"),r=e("./throttle"),a=e("./tailormade");t.exports=n},{"./tailormade":6,"./throttle":7,crossvent:3}],3:[function(e,t){(function(n){"use strict";function o(e,t,n,o){return e.addEventListener(t,n,o)}function r(e,t,n){return e.attachEvent("on"+t,c(e,t,n))}function a(e,t,n,o){return e.removeEventListener(t,n,o)}function i(e,t,n){var o=l(e,t,n);return o?e.detachEvent("on"+t,o):void 0}function s(e,t,n){function o(){var e;return p.createEvent?(e=p.createEvent("Event"),e.initEvent(t,!0,!0)):p.createEventObject&&(e=p.createEventObject()),e}function r(){return new f(t,{detail:n})}var a=-1===m.indexOf(t)?r():o();e.dispatchEvent?e.dispatchEvent(a):e.fireEvent("on"+t,a)}function u(e,t,o){return function(t){var r=t||n.event;r.target=r.target||r.srcElement,r.preventDefault=r.preventDefault||function(){r.returnValue=!1},r.stopPropagation=r.stopPropagation||function(){r.cancelBubble=!0},r.which=r.which||r.keyCode,o.call(e,r)}}function c(e,t,n){var o=l(e,t,n)||u(e,t,n);return v.push({wrapper:o,element:e,type:t,fn:n}),o}function l(e,t,n){var o=d(e,t,n);if(o){var r=v[o].wrapper;return v.splice(o,1),r}}function d(e,t,n){var o,r;for(o=0;o<v.length;o++)if(r=v[o],r.element===e&&r.type===t&&r.fn===n)return o}var f=e("custom-event"),m=e("./eventmap"),p=n.document,y=o,h=a,v=[];n.addEventListener||(y=r,h=i),t.exports={add:y,remove:h,fabricate:s}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./eventmap":4,"custom-event":5}],4:[function(e,t){(function(e){"use strict";var n=[],o="",r=/^on/;for(o in e)r.test(o)&&n.push(o.slice(2));t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(e,t){(function(e){function n(){try{var e=new o("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(t){}return!1}var o=e.CustomEvent;t.exports=n()?o:"undefined"!=typeof document&&"function"==typeof document.createEvent?function(e,t){var n=document.createEvent("CustomEvent");return t?n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail):n.initCustomEvent(e,!1,!1,void 0),n}:function(e,t){var n=document.createEventObject();return n.type=e,t?(n.bubbles=Boolean(t.bubbles),n.cancelable=Boolean(t.cancelable),n.detail=t.detail):(n.bubbles=!1,n.cancelable=!1,n.detail=void 0),n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(e,t){(function(n){"use strict";function o(e,t){function n(){}function o(){return(x?m:p)()}function i(){return C.sleeping?void 0:(C.update||n)(o())}function m(){var t=r(e),n=v(),o=y(n,t.start);return d.body.removeChild(n.mirror),o}function p(){var e=u();if(e.rangeCount){var t=e.getRangeAt(0),n="P"===t.startContainer.nodeName&&0===t.startOffset;if(n)return{x:t.startContainer.offsetLeft,y:t.startContainer.offsetTop,absolute:!0};if(t.getClientRects){var o=t.getClientRects();if(o.length>0)return{x:o[0].left,y:o[0].top,absolute:!0}}}return{x:0,y:0}}function y(t,n){var o=d.createElement("span"),r=t.mirror,a=t.computed;return g(r,h(e).substring(0,n)),"INPUT"===e.tagName&&(r.textContent=r.textContent.replace(/\s/g," ")),g(o,h(e).substring(n)||"."),r.appendChild(o),{x:o.offsetLeft+parseInt(a.borderLeftWidth),y:o.offsetTop+parseInt(a.borderTopWidth)}}function h(e){return x?e.value:e.innerHTML}function v(){function t(e){r[e]=n[e]}var n=l.getComputedStyle?getComputedStyle(e):e.currentStyle,o=d.createElement("div"),r=o.style;return d.body.appendChild(o),"INPUT"!==e.tagName&&(r.wordWrap="break-word"),r.whiteSpace="pre-wrap",r.position="absolute",r.visibility="hidden",c.forEach(t),f?(r.width=parseInt(n.width)-2+"px",e.scrollHeight>parseInt(n.height)&&(r.overflowY="scroll")):r.overflow="hidden",{mirror:o,computed:n}}function g(e,t){x?e.textContent=t:e.innerHTML=t}function b(t){var n=t?"remove":"add";a[n](e,"keydown",E),a[n](e,"keyup",E),a[n](e,"input",E),a[n](e,"paste",E),a[n](e,"change",E)}function w(){b(!0)}var x="INPUT"===e.tagName||"TEXTAREA"===e.tagName,E=s(i,30),C=t||{};return b(),{read:o,refresh:E,destroy:w}}var r=e("sell"),a=e("crossvent"),i=e("seleccion"),s=e("./throttle"),u=i.get,c=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing"],l=n,d=document,f=null!==l.mozInnerScreenX&&void 0!==l.mozInnerScreenX;t.exports=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./throttle":7,crossvent:3,seleccion:19,sell:21}],7:[function(e,t){"use strict";function n(e,t){var n,o=-1/0;return function(){function r(){clearTimeout(n),n=null;var a=o+t,i=Date.now();i>a?(o=i,e()):n=setTimeout(r,a-i)}n||r()}}t.exports=n},{}],8:[function(e,t){"use strict";var n=e("ticky");t.exports=function(e,t,o){e&&n(function(){e.apply(o||null,t||[])})}},{ticky:22}],9:[function(e,t){"use strict";var n=e("atoa"),o=e("./debounce");t.exports=function(e,t){var r=t||{},a={};return void 0===e&&(e={}),e.on=function(t,n){return a[t]?a[t].push(n):a[t]=[n],e},e.once=function(t,n){return n._once=!0,e.on(t,n),e},e.off=function(t,n){var o=arguments.length;if(1===o)delete a[t];else if(0===o)a={};else{var r=a[t];if(!r)return e;r.splice(r.indexOf(n),1)}return e},e.emit=function(){var t=n(arguments);return e.emitterSnapshot(t.shift()).apply(this,t)},e.emitterSnapshot=function(t){var i=(a[t]||[]).slice(0);return function(){var a=n(arguments),s=this||e;if("error"===t&&r.throws!==!1&&!i.length)throw 1===a.length?a[0]:a;return i.forEach(function(n){r.async?o(n,a,s):n.apply(s,a),n._once&&e.off(t,n)}),e}},e}},{"./debounce":8,atoa:1}],10:[function(e,t){(function(n){"use strict";function o(e,t,n,o){return e.addEventListener(t,n,o)}function r(e,t,n){return e.attachEvent("on"+t,c(e,t,n))}function a(e,t,n,o){return e.removeEventListener(t,n,o)}function i(e,t,n){return e.detachEvent("on"+t,l(e,t,n))}function s(e,t,n){function o(){var e;return p.createEvent?(e=p.createEvent("Event"),e.initEvent(t,!0,!0)):p.createEventObject&&(e=p.createEventObject()),e}function r(){return new f(t,{detail:n})}var a=-1===m.indexOf(t)?r():o();e.dispatchEvent?e.dispatchEvent(a):e.fireEvent("on"+t,a)}function u(e,t,o){return function(t){var r=t||n.event;r.target=r.target||r.srcElement,r.preventDefault=r.preventDefault||function(){r.returnValue=!1},r.stopPropagation=r.stopPropagation||function(){r.cancelBubble=!0},r.which=r.which||r.keyCode,o.call(e,r)}}function c(e,t,n){var o=l(e,t,n)||u(e,t,n);return v.push({wrapper:o,element:e,type:t,fn:n}),o}function l(e,t,n){var o=d(e,t,n);if(o){var r=v[o].wrapper;return v.splice(o,1),r}}function d(e,t,n){var o,r;for(o=0;o<v.length;o++)if(r=v[o],r.element===e&&r.type===t&&r.fn===n)return o}var f=e("custom-event"),m=e("./eventmap"),p=document,y=o,h=a,v=[];n.addEventListener||(y=r,h=i),t.exports={add:y,remove:h,fabricate:s}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./eventmap":11,"custom-event":12}],11:[function(e,t){(function(e){"use strict";var n=[],o="",r=/^on/;for(o in e)r.test(o)&&n.push(o.slice(2));t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],12:[function(e,t){(function(e){function n(){try{var e=new o("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(t){}return!1}var o=e.CustomEvent;t.exports=n()?o:"function"==typeof document.createEvent?function(e,t){var n=document.createEvent("CustomEvent");return t?n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail):n.initCustomEvent(e,!1,!1,void 0),n}:function(e,t){var n=document.createEventObject();return n.type=e,t?(n.bubbles=Boolean(t.bubbles),n.cancelable=Boolean(t.cancelable),n.detail=t.detail):(n.bubbles=!1,n.cancelable=!1,n.detail=void 0),n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],13:[function(e,t){(function(n){"use strict";var o,r=n.document,a=e("./getSelectionRaw"),i=e("./getSelectionNullOp"),s=e("./getSelectionSynthetic"),u=e("./isHost");o=u.method(n,"getSelection")?a:"object"==typeof r.selection&&r.selection?s:i,t.exports=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./getSelectionNullOp":14,"./getSelectionRaw":15,"./getSelectionSynthetic":16,"./isHost":17}],14:[function(e,t){"use strict";function n(){}function o(){return{removeAllRanges:n,addRange:n}}t.exports=o},{}],15:[function(e,t){(function(e){"use strict";function n(){return e.getSelection()}t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],16:[function(e,t){(function(n){"use strict";function o(e){var t=this,n=e.createRange();this._selection=e,this._ranges=[],"Control"===e.type?f(t):l(n)?d(t,n):s(t)}function r(e,t){for(var n,o=b.createControlRange(),r=0,a=t.length;a>r;++r){n=c(t[r]);try{o.add(n)}catch(i){throw new Error("setRanges(): Element could not be added to control selection")}}o.select(),f(e)}function a(e,t){var n=e.getAllRanges();e.removeAllRanges();for(var o=0,r=n.length;r>o;++o)p(t,n[o])||e.addRange(n[o]);e.rangeCount||s(e)}function i(e,t){var n="start",o="end";e.anchorNode=t[n+"Container"],e.anchorOffset=t[n+"Offset"],e.focusNode=t[o+"Container"],e.focusOffset=t[o+"Offset"]}function s(e){e.anchorNode=e.focusNode=null,e.anchorOffset=e.focusOffset=0,e.rangeCount=0,e.isCollapsed=!0,e._ranges.length=0}function u(e){if(!e.length||1!==e[0].nodeType)return!1;for(var t=1,n=e.length;n>t;++t)if(!y(e[0],e[t]))return!1;return!0}function c(e){var t=e.getNodes();if(!u(t))throw new Error("getSingleElementFromRange(): range did not consist of a single element");return t[0]}function l(e){return e&&void 0!==e.text}function d(e,t){e._ranges=[t],i(e,t,!1),e.rangeCount=1,e.isCollapsed=t.collapsed}function f(e){if(e._ranges.length=0,"None"===e._selection.type)s(e);else{var t=e._selection.createRange();if(l(t))d(e,t);else{e.rangeCount=t.length;for(var n,o=0;o<e.rangeCount;++o)n=g.createRange(),n.selectNode(t.item(o)),e._ranges.push(n);e.isCollapsed=1===e.rangeCount&&e._ranges[0].collapsed,i(e,e._ranges[e.rangeCount-1],!1)}}}function m(e,t){for(var n=e._selection.createRange(),o=c(t),r=b.createControlRange(),a=0,i=n.length;i>a;++a)r.add(n.item(a));try{r.add(o)}catch(s){throw new Error("addRange(): Element could not be added to control selection")}r.select(),f(e)}function p(e,t){return e.startContainer===t.startContainer&&e.startOffset===t.startOffset&&e.endContainer===t.endContainer&&e.endOffset===t.endOffset}function y(e,t){for(var n=t;n.parentNode;){if(n.parentNode===e)return!0;n=n.parentNode}return!1}function h(){return new o(n.document.selection)}var v=e("./rangeToTextRange"),g=n.document,b=g.body,w=o.prototype;w.removeAllRanges=function(){var e;try{this._selection.empty(),"None"!==this._selection.type&&(e=b.createTextRange(),e.select(),this._selection.empty())}catch(t){}s(this)},w.addRange=function(e){"Control"===this._selection.type?m(this,e):(v(e).select(),this._ranges[0]=e,this.rangeCount=1,this.isCollapsed=this._ranges[0].collapsed,i(this,e,!1))},w.setRanges=function(e){this.removeAllRanges();var t=e.length;t>1?r(this,e):t&&this.addRange(e[0])},w.getRangeAt=function(e){if(0>e||e>=this.rangeCount)throw new Error("getRangeAt(): index out of bounds");return this._ranges[e].cloneRange()},w.removeRange=function(e){if("Control"!==this._selection.type)return a(this,e),void 0;for(var t,n=this._selection.createRange(),o=c(e),r=b.createControlRange(),i=!1,s=0,u=n.length;u>s;++s)t=n.item(s),t!==o||i?r.add(n.item(s)):i=!0;r.select(),f(this)},w.eachRange=function(e,t){var n=0,o=this._ranges.length;for(n=0;o>n;++n)if(e(this.getRangeAt(n)))return t},w.getAllRanges=function(){var e=[];return this.eachRange(function(t){e.push(t)}),e},w.setSingleRange=function(e){this.removeAllRanges(),this.addRange(e)},t.exports=h}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./rangeToTextRange":18}],17:[function(e,t){"use strict";function n(e,t){var n=typeof e[t];return"function"===n||!("object"!==n||!e[t])||"unknown"===n}function o(e,t){return"undefined"!=typeof e[t]}function r(e){return function(t,n){for(var o=n.length;o--;)if(!e(t,n[o]))return!1;return!0}}t.exports={method:n,methods:r(n),property:o,properties:r(o)}},{}],18:[function(e,t){(function(e){"use strict";function n(e){if(e.collapsed)return r({node:e.startContainer,offset:e.startOffset},!0);var t=r({node:e.startContainer,offset:e.startOffset},!0),n=r({node:e.endContainer,offset:e.endOffset},!1),o=i.createTextRange();return o.setEndPoint("StartToStart",t),o.setEndPoint("EndToEnd",n),o}function o(e){var t=e.nodeType;return 3===t||4===t||8===t}function r(e,t){var n,r,s,u,c=e.offset,l=i.createTextRange(),d=o(e.node);return d?(n=e.node,r=n.parentNode):(u=e.node.childNodes,n=c<u.length?u[c]:null,r=e.node),s=a.createElement("span"),s.innerHTML="&#feff;",n?r.insertBefore(s,n):r.appendChild(s),l.moveToElementText(s),l.collapse(!t),r.removeChild(s),d&&l[t?"moveStart":"moveEnd"]("character",c),l}var a=e.document,i=a.body;t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],19:[function(e,t){"use strict";var n=e("./getSelection"),o=e("./setSelection");t.exports={get:n,set:o}},{"./getSelection":13,"./setSelection":20}],20:[function(e,t){(function(n){"use strict";function o(e){function t(){var t=r(),n=i.createRange();e.startContainer&&(e.endContainer?n.setEnd(e.endContainer,e.endOffset):n.setEnd(e.startContainer,e.startOffset),n.setStart(e.startContainer,e.startOffset),t.removeAllRanges(),t.addRange(n))}function n(){a(e).select()}i.createRange?t():n()}var r=e("./getSelection"),a=e("./rangeToTextRange"),i=n.document;t.exports=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./getSelection":13,"./rangeToTextRange":18}],21:[function(e,t){"use strict";function n(e){return{start:e.selectionStart,end:e.selectionEnd}}function o(e){function t(t,o){return n!==e&&(n?n.focus():e.blur()),{start:t,end:o}}var n=document.activeElement;n!==e&&e.focus();var o=document.selection.createRange(),i=o.getBookmark(),s=e.value,u=r(s),c=o.parentElement();if(null===c||!a(c))return t(0,0);o.text=u+o.text+u;var l=e.value;return e.value=s,o.moveToBookmark(i),o.select(),t(l.indexOf(u),l.lastIndexOf(u)-u.length)}function r(e){var t;do t="@@marker."+Math.random()*new Date;while(-1!==e.indexOf(t));return t}function a(e){return"INPUT"===e.tagName&&"text"===e.type||"TEXTAREA"===e.tagName}function i(e,t){e.selectionStart=u(e,t.start),e.selectionEnd=u(e,t.end)}function s(e,t){var n=e.createTextRange();"end"===t.start&&"end"===t.end?(n.collapse(!1),n.select()):(n.collapse(!0),n.moveEnd("character",u(e,t.end)),n.moveStart("character",u(e,t.start)),n.select())}function u(e,t){return"end"===t?e.value.length:t||0}function c(e,t){return 2===arguments.length&&d(e,t),l(e)}var l=n,d=i;document.selection&&document.selection.createRange&&(l=o,d=s),t.exports=c},{}],22:[function(e,t){var n,o="function"==typeof setImmediate;n=o?function(e){setImmediate(e)}:function(e){setTimeout(e,0)},t.exports=n},{}],23:[function(e,t){"use strict";function n(e,t){var n=u[e.id];return n&&n[t.id]}function o(e,t){var n=u[e.id];n||(n=u[e.id]={});var o=a(t);n[t.id]=o,e.on("data",o),e.on("destroyed",r.bind(null,e,t))}function r(e,t){var n=u[e.id];if(n){var o=n[t.id];e.off("data",o),delete n[t.id]}}function a(e){return function(){e.refresh()}}function i(e,t){s(t.associated)||n(e,t)||o(e,t)}var s=e("./isInput"),u={};t.exports={add:i,remove:r}},{"./isInput":33}],24:[function(e,t){"use strict";function n(e){function t(){return St}function n(n){return lt=l(n||e,St),mt||(mt=i({className:lt.styles.container})),pt=lt.weekdayFormat,yt=pt.length,vt=o,ht=o,gt=o,bt=o,lt.appendTo.appendChild(mt),X(mt),Ot=!1,dt=lt.initialValue?lt.initialValue:d.moment(),ft=dt.clone(),St.back=j,St.container=mt,St.destroyed=!1,St.destroy=y.bind(St,!1),St.emitValues=W,St.getDate=st,St.getDateString=ut,St.getMoment=ct,St.hide=A,St.next=B,St.options=v,St.options.reset=g,St.refresh=z,St.restore=t,St.setValue=U,St.show=S,h(),p(),St}function p(){St.emit("ready",c(lt))}function y(e){mt&&mt.parentNode&&mt.parentNode.removeChild(mt),lt&&h(!0);var o=St.emitterSnapshot("destroyed");return St.back=m,St.destroyed=!0,St.destroy=t,St.emitValues=t,St.getDate=m,St.getDateString=m,St.getMoment=m,St.hide=t,St.next=m,St.options=t,St.options.reset=t,St.refresh=t,St.restore=n,St.setValue=t,St.show=t,St.off(),e!==!0&&o(),St}function h(e){var t=e?"remove":"add";lt.autoHideOnBlur&&r[t](document.documentElement,"focus",D,!0),lt.autoHideOnClick&&r[t](document,"click",M)}function v(e){return 0===arguments.length?c(lt):(y(),n(e),St)}function g(){return v({appendTo:lt.appendTo})}function b(){Ot||(Ot=!0,w(),x(),St.emit("render"))}function w(){function e(e){var t=i({className:lt.styles.month,parent:wt});0===e&&(xt=i({type:"button",className:lt.styles.back,attributes:{type:"button"},parent:t})),e===lt.monthsInCalendar-1&&(Et=i({type:"button",className:lt.styles.next,attributes:{type:"button"},parent:t}));var n,o=i({className:lt.styles.monthLabel,parent:t}),r=i({type:"table",className:lt.styles.dayTable,parent:t}),a=i({type:"thead",className:lt.styles.dayHead,parent:r}),s=i({type:"tr",className:lt.styles.dayRow,parent:a}),u=i({type:"tbody",className:lt.styles.dayBody,parent:r});for(n=0;yt>n;n++)i({type:"th",className:lt.styles.dayHeadElem,parent:s,text:pt[E(n)]});u.setAttribute(Nt,e),kt.push({label:o,body:u})}if(lt.date){var t;for(kt=[],wt=i({className:lt.styles.date,parent:mt}),t=0;t<lt.monthsInCalendar;t++)e(t);r.add(xt,"click",j),r.add(Et,"click",B),r.add(wt,"click",nt)}}function x(){if(lt.time&&lt.timeInterval){var e=i({className:lt.styles.time,parent:mt});Ct=i({className:lt.styles.selectedTime,parent:e,text:dt.format(lt.timeFormat)}),r.add(Ct,"click",T),Tt=i({className:lt.styles.timeList,parent:e}),r.add(Tt,"click",it);for(var t=d.moment("00:00:00","HH:mm:ss"),n=t.clone().add(1,"days");t.isBefore(n);)i({className:lt.styles.timeOption,parent:Tt,text:t.format(lt.timeFormat)}),t.add(lt.timeInterval,"seconds")}}function E(e,t){var n=t?-1:1,o=e+lt.weekStart*n;return(o>=yt||0>o)&&(o+=yt*-n),o}function C(){if(lt.time&&Ot){var e,t,n,o,r=Tt.children,a=r.length;for(o=0;a>o;o++)n=r[o],t=d.moment(s(n),lt.timeFormat),e=at(dt.clone(),t),n.style.display=J(e,!1,lt.timeValidator)?"block":"none"}}function T(e){var t="boolean"==typeof e?e:"none"===Tt.style.display;t?O():N()}function O(){Tt&&(Tt.style.display="block")}function N(){Tt&&(Tt.style.display="none")}function k(){mt.style.display="inline-block",St.emit("show")}function R(){"none"!==mt.style.display&&(mt.style.display="none",St.emit("hide"))}function S(){return b(),z(),T(!lt.date),k(),St}function A(){return N(),setTimeout(R,0),St}function F(){N();var e=f.contains(mt,lt.styles.positioned);return e&&setTimeout(R,0),St}function I(e){var t=e.target;if(t===St.associated)return!0;for(;t;){if(t===mt)return!0;t=t.parentNode}}function D(e){I(e)||F()}function M(e){I(e)||F()}function j(){H("subtract")}function B(){H("add")}function H(e){var t,n="add"===e?-1:1,o=lt.monthsInCalendar+n*rt(bt);ft[e](o,"months"),t=Z(ft.clone()),dt=t||dt,t&&(ft=t.clone()),_(),St.emit("add"===e?"next":"back",dt.month())}function _(e){V(),q(),e!==!0&&W(),C()}function V(){function e(e,t){var n=ft.clone().add(t,"months");s(e.label,n.format(lt.monthFormat)),X(e.body)}if(lt.date&&Ot){var t=ft.year(),n=ft.month(),o=ft.date();if(o!==gt||n!==vt||t!==ht){var r=P();if(gt=ft.date(),vt=ft.month(),ht=ft.year(),r)return L(),void 0;kt.forEach(e),$()}}}function L(){function e(e){var t,n=[];for(t=0;t<e.length;t++)n.push(e[t]);return n}function t(t){return e(t.children)}function n(e){return!f.contains(e,lt.styles.dayPrevMonth)&&!f.contains(e,lt.styles.dayNextMonth)}var o=ft.date()-1;ot(!1),kt.forEach(function(r){var a;Y(r.date,ft)&&(a=e(r.body.children).map(t),a=Array.prototype.concat.apply([],a).filter(n),ot(a[o]))})}function P(){function e(e){return ht?Y(e.date,ft):!1}return kt.some(e)}function Y(e,t){return e&&t&&e.year()===t.year()&&e.month()===t.month()}function q(){lt.time&&Ot&&s(Ct,dt.format(lt.timeFormat))}function W(){return St.emit("data",ut()),St.emit("year",dt.year()),St.emit("month",dt.month()),St.emit("day",dt.day()),St.emit("time",dt.format(lt.timeFormat)),St}function z(){return ht=!1,vt=!1,gt=!1,_(!0),St}function U(e){var t=u(e,lt.inputFormat);if(null!==t)return dt=Z(t)||dt,ft=dt.clone(),_(!0),St}function X(e,t){for(;e&&e.firstChild;)e.removeChild(e.firstChild);t===!0&&e.parentNode.removeChild(e)}function $(){var e;for(e=0;e<lt.monthsInCalendar;e++)G(e)}function G(e){function t(e){var t,o,r;for(t=0;t<e.length;t++)f.children.length===yt&&(f=i({type:"tr",className:lt.styles.dayRow,parent:a.body})),o=e.base.clone().add(t,"days"),r=i({type:"td",parent:f,text:o.format(lt.dayFormat),className:n(o,e.cell.join(" ").split(" ")).join(" ")}),e.selectable&&o.date()===c&&ot(r)}function n(e,t){return J(e,!0,lt.dateValidator)||t.push(y),t}function o(e,t){return e&&t.push(lt.styles.dayConcealed),t}var r,a=kt[e],s=ft.clone().add(e,"months"),u=s.daysInMonth(),c=s.month()!==dt.month()?-1:dt.date(),l=s.clone().date(1),d=E(l.day(),!0),f=i({type:"tr",className:lt.styles.dayRow,parent:a.body}),m=o(0!==e,[lt.styles.dayBodyElem,lt.styles.dayPrevMonth]),p=o(e!==lt.monthsInCalendar-1,[lt.styles.dayBodyElem,lt.styles.dayNextMonth]),y=lt.styles.dayDisabled;t({base:l.clone().subtract(d,"days"),length:d,cell:m}),t({base:l.clone(),length:u,cell:[lt.styles.dayBodyElem],selectable:!0}),r=l.clone().add(u,"days"),t({base:r,length:yt-f.children.length,cell:p}),xt.disabled=!K(l,!0),Et.disabled=!Q(r,!0),a.date=s.clone()}function J(e,t,n){if(!K(e,t))return!1;if(!Q(e,t))return!1;var o=(n||Function.prototype).call(St,e.toDate());return o!==!1}function K(e,t){var n=lt.min?t?lt.min.clone().startOf("day"):lt.min:!1;return!n||!e.isBefore(n)}function Q(e,t){var n=lt.max?t?lt.max.clone().endOf("day"):lt.max:!1;return!n||!e.isAfter(n)}function Z(e){if(lt.min&&e.isBefore(lt.min))return Z(lt.min.clone());if(lt.max&&e.isAfter(lt.max))return Z(lt.max.clone());var t=e.clone().subtract(1,"days");return tt(t,e,"add")?et(t):(t=e.clone(),tt(t,e,"subtract")?et(t):void 0)}function et(e){var t,n=e.clone().subtract(lt.timeInterval,"seconds"),o=Math.ceil(Rt/lt.timeInterval);for(t=0;o>t;t++)if(n.add(lt.timeInterval,"seconds"),n.date()>e.date()&&n.subtract(1,"days"),lt.timeValidator.call(St,n.toDate())!==!1)return n}function tt(e,t,n){for(var o=!1;o===!1&&(e[n](1,"days"),e.month()===t.month());)o=lt.dateValidator.call(St,e.toDate());return o!==!1}function nt(e){var t=e.target;if(!f.contains(t,lt.styles.dayDisabled)&&f.contains(t,lt.styles.dayBodyElem)){var n=parseInt(s(t),10),o=f.contains(t,lt.styles.dayPrevMonth),r=f.contains(t,lt.styles.dayNextMonth),a=rt(t)-rt(bt);dt.add(a,"months"),(o||r)&&dt.add(o?-1:1,"months"),ot(t),dt.date(n),at(dt,Z(dt)||dt),ft=dt.clone(),lt.autoClose===!0&&F(),_()}}function ot(e){bt&&f.remove(bt,lt.styles.selectedDay),e&&f.add(e,lt.styles.selectedDay),bt=e}function rt(e){for(var t;e&&e.getAttribute;){if(t=e.getAttribute(Nt),"string"==typeof t)return parseInt(t,10);e=e.parentNode}return 0}function at(e,t){return e.hour(t.hour()).minute(t.minute()).second(t.second()),e}function it(e){var t=e.target;if(f.contains(t,lt.styles.timeOption)){var n=d.moment(s(t),lt.timeFormat);at(dt,n),ft=dt.clone(),W(),q(),!lt.date&&lt.autoClose===!0||"time"===lt.autoClose?F():N()}}function st(){return dt.toDate()}function ut(e){return dt.format(e||lt.inputFormat)}function ct(){return dt.clone()}var lt,dt,ft,mt,pt,yt,ht,vt,gt,bt,wt,xt,Et,Ct,Tt,Ot=!1,Nt="data-rome-offset",kt=[],Rt=86400,St=a({associated:e.associated});return n(),setTimeout(p,0),St}var o,r=e("crossvent"),a=e("contra/emitter"),i=e("./dom"),s=e("./text"),u=e("./parse"),c=e("./clone"),l=e("./defaults"),d=e("./momentum"),f=e("./classes"),m=e("./noop");t.exports=n},{"./classes":25,"./clone":26,"./defaults":28,"./dom":29,"./momentum":34,"./noop":35,"./parse":36,"./text":48,"contra/emitter":9,crossvent:10}],25:[function(e,t){"use strict";function n(e){return e.className.replace(s,"").split(u)}function o(e,t){e.className=t.join(" ")}function r(e,t){var n=a(e,t);n.push(t),o(e,n)}function a(e,t){var r=n(e),a=r.indexOf(t);return-1!==a&&(r.splice(a,1),o(e,r)),r}function i(e,t){return-1!==n(e).indexOf(t)}var s=/^\s+|\s+$/g,u=/\s+/;t.exports={add:r,remove:a,contains:i}},{}],26:[function(e,t){"use strict";function n(e){var t,r={};for(var a in e)t=e[a],r[a]=t?o.isMoment(t)?t.clone():t._isStylesConfiguration?n(t):t:t;return r}var o=e("./momentum");t.exports=n},{"./momentum":34}],27:[function(e,t){"use strict";function n(e,t){var n,s=o.find(e);return s?s:(n=i(e)?r(e,t):a(e,t),o.assign(e,n),n)}var o=e("./index"),r=e("./input"),a=e("./inline"),i=e("./isInput");t.exports=n},{"./index":30,"./inline":31,"./input":32,"./isInput":33}],28:[function(e,t){"use strict";function n(e,t){var n,i,s=e||{};if(s.autoHideOnClick===i&&(s.autoHideOnClick=!0),s.autoHideOnBlur===i&&(s.autoHideOnBlur=!0),s.autoClose===i&&(s.autoClose=!0),s.appendTo===i&&(s.appendTo=document.body),"parent"===s.appendTo){if(!r(t.associated))throw new Error("Inline calendars must be appended to a parent node explicitly.");s.appendTo=t.associated.parentNode}if(s.invalidate===i&&(s.invalidate=!0),s.required===i&&(s.required=!1),s.date===i&&(s.date=!0),s.time===i&&(s.time=!0),s.date===!1&&s.time===!1)throw new Error("At least one of `date` or `time` must be `true`.");if(s.inputFormat===i&&(s.inputFormat=s.date&&s.time?"YYYY-MM-DD HH:mm":s.date?"YYYY-MM-DD":"HH:mm"),s.initialValue=s.initialValue===i?null:o(s.initialValue,s.inputFormat),s.min=s.min===i?null:o(s.min,s.inputFormat),s.max=s.max===i?null:o(s.max,s.inputFormat),s.timeInterval===i&&(s.timeInterval=1800),s.min&&s.max)if(s.max.isBefore(s.min)&&(n=s.max,s.max=s.min,s.min=n),s.date===!0){if(s.max.clone().subtract(1,"days").isBefore(s.min))throw new Error("`max` must be at least one day after `min`")}else if(1e3*s.timeInterval-s.min%(1e3*s.timeInterval)>s.max-s.min)throw new Error("`min` to `max` range must allow for at least one time option that matches `timeInterval`");if(s.dateValidator===i&&(s.dateValidator=Function.prototype),s.timeValidator===i&&(s.timeValidator=Function.prototype),s.timeFormat===i&&(s.timeFormat="HH:mm"),s.weekStart===i&&(s.weekStart=a.moment().weekday(0).day()),s.weekdayFormat===i&&(s.weekdayFormat="min"),"long"===s.weekdayFormat)s.weekdayFormat=a.moment.weekdays();else if("short"===s.weekdayFormat)s.weekdayFormat=a.moment.weekdaysShort();else if("min"===s.weekdayFormat)s.weekdayFormat=a.moment.weekdaysMin();else if(!Array.isArray(s.weekdayFormat)||s.weekdayFormat.length<7)throw new Error("`weekdays` must be `min`, `short`, or `long`");s.monthsInCalendar===i&&(s.monthsInCalendar=1),s.monthFormat===i&&(s.monthFormat="MMMM YYYY"),s.dayFormat===i&&(s.dayFormat="DD"),s.styles===i&&(s.styles={}),s.styles._isStylesConfiguration=!0;var u=s.styles;return u.back===i&&(u.back="rd-back"),u.container===i&&(u.container="rd-container"),u.positioned===i&&(u.positioned="rd-container-attachment"),u.date===i&&(u.date="rd-date"),u.dayBody===i&&(u.dayBody="rd-days-body"),u.dayBodyElem===i&&(u.dayBodyElem="rd-day-body"),u.dayPrevMonth===i&&(u.dayPrevMonth="rd-day-prev-month"),u.dayNextMonth===i&&(u.dayNextMonth="rd-day-next-month"),u.dayDisabled===i&&(u.dayDisabled="rd-day-disabled"),u.dayConcealed===i&&(u.dayConcealed="rd-day-concealed"),u.dayHead===i&&(u.dayHead="rd-days-head"),u.dayHeadElem===i&&(u.dayHeadElem="rd-day-head"),u.dayRow===i&&(u.dayRow="rd-days-row"),u.dayTable===i&&(u.dayTable="rd-days"),u.month===i&&(u.month="rd-month"),u.monthLabel===i&&(u.monthLabel="rd-month-label"),u.next===i&&(u.next="rd-next"),u.selectedDay===i&&(u.selectedDay="rd-day-selected"),u.selectedTime===i&&(u.selectedTime="rd-time-selected"),u.time===i&&(u.time="rd-time"),u.timeList===i&&(u.timeList="rd-time-list"),u.timeOption===i&&(u.timeOption="rd-time-option"),s}var o=e("./parse"),r=e("./isInput"),a=e("./momentum");t.exports=n},{"./isInput":33,"./momentum":34,"./parse":36}],29:[function(e,t){"use strict";function n(e){var t=e||{};t.type||(t.type="div");var n=document.createElement(t.type);return t.className&&(n.className=t.className),t.text&&(n.innerText=n.textContent=t.text),t.attributes&&Object.keys(t.attributes).forEach(function(e){n.setAttribute(e,t.attributes[e])}),t.parent&&t.parent.appendChild(n),n}t.exports=n},{}],30:[function(e,t){"use strict";function n(e){if("number"!=typeof e&&e&&e.getAttribute)return n(e.getAttribute(a));var t=i[e];return t!==r?t:null}function o(e,t){e.setAttribute(a,t.id=i.push(t)-1)}var r,a="data-rome-id",i=[];t.exports={find:n,assign:o}},{}],31:[function(e,t){"use strict";function n(e,t){var n=t||{};n.appendTo=e,n.associated=e;var r=o(n);return r.show(),r}var o=e("./calendar");t.exports=n},{"./calendar":24}],32:[function(e,t){"use strict";function n(e,t){function n(t){w=i(t||w,T),c.add(T.container,w.styles.positioned),o.add(T.container,"mousedown",m),o.add(T.container,"click",f),T.getDate=b(T.getDate),T.getDateString=b(T.getDateString),T.getMoment=b(T.getMoment),w.initialValue&&(e.value=w.initialValue.format(w.inputFormat)),C=r(T.container,e),T.on("data",v),T.on("show",C.refresh),d(),O()}function l(){d(!0),C.destroy(),C=null}function d(t){var r=t?"remove":"add";o[r](e,"click",y),o[r](e,"touchend",y),o[r](e,"focusin",y),o[r](e,"change",O),o[r](e,"keypress",O),o[r](e,"keydown",O),o[r](e,"input",O),w.invalidate&&o[r](e,"blur",p),t?(T.once("ready",n),T.off("destroyed",l)):(T.off("ready",n),T.once("destroyed",l))}function f(){E=!0,e.focus(),E=!1}function m(){function e(){x=!1}x=!0,setTimeout(e,0)}function p(){x||g()||T.emitValues()}function y(){E||T.show()}function h(){var t=e.value.trim();if(!g()){var n=u.moment(t,w.inputFormat,w.strictParse);T.setValue(n)}}function v(t){e.value=t}function g(){return w.required===!1&&""===e.value.trim()
  }function b(e){return function(){return g()?null:e.apply(this,arguments)}}var w=t||{};w.associated=e;var x,E,C,T=s(w),O=a(h,30);return n(w),T}var o=e("crossvent"),r=e("bullseye"),a=e("./throttle"),i=(e("./clone"),e("./defaults")),s=e("./calendar"),u=e("./momentum"),c=e("./classes");t.exports=n},{"./calendar":24,"./classes":25,"./clone":26,"./defaults":28,"./momentum":34,"./throttle":49,bullseye:2,crossvent:10}],33:[function(e,t){"use strict";function n(e){return e&&e.nodeName&&"input"===e.nodeName.toLowerCase()}t.exports=n},{}],34:[function(e,t){"use strict";function n(e){return e&&Object.prototype.hasOwnProperty.call(e,"_isAMomentObject")}var o={moment:null,isMoment:n};t.exports=o},{}],35:[function(e,t){"use strict";function n(){}t.exports=n},{}],36:[function(e,t){"use strict";function n(e,t){return"string"==typeof e?r.moment(e,t):"[object Date]"===Object.prototype.toString.call(e)?r.moment(e):r.isMoment(e)?e.clone():void 0}function o(e,t){var o=n(e,"string"==typeof t?t:null);return o&&o.isValid()?o:null}var r=e("./momentum");t.exports=o},{"./momentum":34}],37:[function(){"use strict";Array.prototype.filter||(Array.prototype.filter=function(e,t){var n=[];return this.forEach(function(o,r,a){e.call(t,o,r,a)&&n.push(o)},t),n})},{}],38:[function(){"use strict";Array.prototype.forEach||(Array.prototype.forEach=function(e,t){if(void 0===this||null===this||"function"!=typeof e)throw new TypeError;for(var n=this,o=n.length,r=0;o>r;r++)r in n&&e.call(t,n[r],r,n)})},{}],39:[function(){"use strict";Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){if(void 0===this||null===this)throw new TypeError;var n=this.length;for(t=+t||0,1/0===Math.abs(t)?t=0:0>t&&(t+=n,0>t&&(t=0));n>t;t++)if(this[t]===e)return t;return-1})},{}],40:[function(){"use strict";Array.isArray||(Array.isArray=function(e){return""+e!==e&&"[object Array]"===Object.prototype.toString.call(e)})},{}],41:[function(){"use strict";Array.prototype.map||(Array.prototype.map=function(e,t){var n,o,r;if(null==this)throw new TypeError("this is null or not defined");var a=Object(this),i=a.length>>>0;if("function"!=typeof e)throw new TypeError(e+" is not a function");for(arguments.length>1&&(n=t),o=new Array(i),r=0;i>r;)r in a&&(o[r]=e.call(n,a[r],r,a)),r++;return o})},{}],42:[function(){"use strict";Array.prototype.some||(Array.prototype.some=function(e,t){var n,o;if(null==this)throw new TypeError("this is null or not defined");var r=Object(this),a=r.length>>>0;if("function"!=typeof e)throw new TypeError(e+" is not a function");for(arguments.length>1&&(n=t),o=0;a>o;){if(o in r){var i=e.call(n,r[o],o,r);if(i)return!0}o++}return!1})},{}],43:[function(){"use strict";Function.prototype.bind||(Function.prototype.bind=function(e){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,o=function(){},r=function(){var r=this instanceof o&&e?this:e,a=t.concat(Array.prototype.slice.call(arguments));return n.apply(r,a)};return o.prototype=this.prototype,r.prototype=new o,r})},{}],44:[function(){"use strict";var e=Object.prototype.hasOwnProperty,t=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],o=n.length;Object.keys||(Object.keys=function(r){if("object"!=typeof r&&("function"!=typeof r||null===r))throw new TypeError("Object.keys called on non-object");var a,i,s=[];for(a in r)e.call(r,a)&&s.push(a);if(t)for(i=0;o>i;i++)e.call(r,n[i])&&s.push(n[i]);return s})},{}],45:[function(){"use strict";String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")})},{}],46:[function(e,t){"use strict";e("./polyfills/function.bind"),e("./polyfills/array.foreach"),e("./polyfills/array.map"),e("./polyfills/array.filter"),e("./polyfills/array.isarray"),e("./polyfills/array.indexof"),e("./polyfills/array.some"),e("./polyfills/string.trim"),e("./polyfills/object.keys");var n=e("./core"),o=e("./index"),r=e("./use");n.use=r.bind(n),n.find=o.find,n.val=e("./validators"),t.exports=n},{"./core":27,"./index":30,"./polyfills/array.filter":37,"./polyfills/array.foreach":38,"./polyfills/array.indexof":39,"./polyfills/array.isarray":40,"./polyfills/array.map":41,"./polyfills/array.some":42,"./polyfills/function.bind":43,"./polyfills/object.keys":44,"./polyfills/string.trim":45,"./use":50,"./validators":51}],47:[function(e,t){(function(n){var o=e("./rome"),r=e("./momentum");if(o.use(n.moment),void 0===r.moment)throw new Error("rome depends on moment.js, you can get it at http://momentjs.com, or you could use the bundled distribution file instead.");t.exports=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./momentum":34,"./rome":46}],48:[function(e,t){"use strict";function n(e,t){return 2===arguments.length&&(e.innerText=e.textContent=t),e.innerText||e.textContent}t.exports=n},{}],49:[function(e,t){"use strict";t.exports=function(e,t){var n,o=-1/0;return function(){function r(){clearTimeout(n),n=null;var a=o+t,i=+new Date;i>a?(o=i,e.apply(this,arguments)):n=setTimeout(r,a-i)}n||r()}}},{}],50:[function(e,t){"use strict";function n(e){this.moment=o.moment=e}var o=e("./momentum");t.exports=n},{"./momentum":34}],51:[function(e,t){"use strict";function n(e){return function(t){var n=a(t);return function(o){var s=r.find(t),u=a(o),c=n||s&&s.getMoment();return c?(s&&i.add(this,s),e(u,c)):!0}}}function o(e,t){return function(n,o){function s(e){var t,n,o=r.find(e);return o?t=n=o.getMoment():Array.isArray(e)?(t=e[0],n=e[1]):t=n=e,o&&i.add(o,this),{start:a(t).startOf("day").toDate(),end:a(n).endOf("day").toDate()}}var u,c=arguments.length;return Array.isArray(n)?u=n:1===c?u=[n]:2===c&&(u=[[n,o]]),function(n){return u.map(s.bind(this))[e](t.bind(this,n))}}}var r=e("./index"),a=e("./parse"),i=e("./association"),s=n(function(e,t){return e>=t}),u=n(function(e,t){return e>t}),c=n(function(e,t){return t>=e}),l=n(function(e,t){return t>e}),d=o("every",function(e,t){return t.start>e||t.end<e}),f=o("some",function(e,t){return t.start<=e&&t.end>=e});t.exports={afterEq:s,after:u,beforeEq:c,before:l,except:d,only:f}},{"./association":23,"./index":30,"./parse":36}]},{},[47])(47)});
export default rome;