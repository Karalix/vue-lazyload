/*!
 * Vue-Lazyload.js v1.0.4
 * (c) 2017 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueLazyload=e()}(this,function(){"use strict";function t(t,e){if(t.length){var n=t.indexOf(e);return n>-1?t.splice(n,1):void 0}}function e(t,e){if(!t||!e)return t||{};if(t instanceof Object)for(var n in e)t[n]=e[n];return t}function n(t,e){for(var n=!1,r=0,i=t.length;r<i;r++)if(e(t[r])){n=!0;break}return n}function r(t,e){if("IMG"===t.tagName&&t.getAttribute("data-srcset")){var n=t.getAttribute("data-srcset"),r=[],i=t.parentNode,o=i.offsetWidth*e,s=void 0,a=void 0,u=void 0;n=n.trim().split(","),n.map(function(t){t=t.trim(),s=t.lastIndexOf(" "),-1===s?(a=t,u=999998):(a=t.substr(0,s),u=parseInt(t.substr(s+1,t.length-s-2),10)),r.push([u,a])}),r.sort(function(t,e){if(t[0]<e[0])return-1;if(t[0]>e[0])return 1;if(t[0]===e[0]){if(-1!==e[1].indexOf(".webp",e[1].length-5))return 1;if(-1!==t[1].indexOf(".webp",t[1].length-5))return-1}return 0});for(var d="",l=void 0,c=r.length,h=0;h<c;h++)if(l=r[h],l[0]>=o){d=l[1];break}return d}}function i(t,e){for(var n=void 0,r=0,i=t.length;r<i;r++)if(e(t[r])){n=t[r];break}return n}function o(){if(!h)return!1;var t=!0,e=document;try{var n=e.createElement("object");n.type="image/webp",n.style.visibility="hidden",n.innerHTML="!",e.body.appendChild(n),t=!n.offsetWidth,e.body.removeChild(n)}catch(e){t=!1}return t}function s(t,e){var n=null,r=0;return function(){if(!n){var i=Date.now()-r,o=this,s=arguments,a=function(){r=Date.now(),n=!1,t.apply(o,s)};i>=e?a():n=setTimeout(a,e)}}}function a(t){return null!==t&&"object"===(void 0===t?"undefined":d(t))}function u(t){if(!(t instanceof Object))return[];if(Object.keys)return Object.keys(t);var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var a={key:t,arg:e,resolve:n,reject:i,next:null};s?s=s.next=a:(o=s=a,r(t,e))})}function r(n,o){try{var s=e[n](o),a=s.value;a instanceof t?Promise.resolve(a.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(s.done?"return":"normal",s.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}o=o.next,o?r(o.key,o.arg):s=null}var o,s;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),h="undefined"!=typeof window,f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return h&&window.devicePixelRatio||t},p=function(){if(h){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}}(),v={on:function(t,e,n){p?t.addEventListener(e,n,{passive:!0}):t.addEventListener(e,n,!1)},off:function(t,e,n){t.removeEventListener(e,n)}},y=function(t,e,n){var r=new Image;r.src=t.src,r.onload=function(){e({naturalHeight:r.naturalHeight,naturalWidth:r.naturalWidth,src:r.src})},r.onerror=function(t){n(t)}},g=function(t,e){return"undefined"!=typeof getComputedStyle?getComputedStyle(t,null).getPropertyValue(e):t.style[e]},m=function(t){return g(t,"overflow")+g(t,"overflow-y")+g(t,"overflow-x")},w=function(t){if(h){if(!(t instanceof HTMLElement))return window;for(var e=t;e&&e!==document.body&&e!==document.documentElement&&e.parentNode;){if(/(scroll|auto)/.test(m(e)))return e;e=e.parentNode}return window}},b={},L=function(){function t(e){var n=e.el,r=e.src,i=e.error,o=e.loading,s=e.bindType,a=e.$parent,u=e.options,d=e.elRenderer;l(this,t),this.el=n,this.src=r,this.error=i,this.loading=o,this.bindType=s,this.attempt=0,this.naturalHeight=0,this.naturalWidth=0,this.options=u,this.filter(),this.initState(),this.performanceData={init:Date.now(),loadStart:null,loadEnd:null},this.rect=n.getBoundingClientRect(),this.$parent=a,this.elRenderer=d,this.render("loading",!1)}return c(t,[{key:"initState",value:function(){this.state={error:!1,loaded:!1,rendered:!1,rested:!1}}},{key:"record",value:function(t){this.performanceData[t]=Date.now()}},{key:"update",value:function(t){var e=t.src,n=t.loading,r=t.error,i=this.src;this.src=e,this.loading=n,this.error=r,this.filter(),i!==this.src&&(this.attempt=0,this.initState())}},{key:"getRect",value:function(){this.rect=this.el.getBoundingClientRect()}},{key:"checkIsNear",value:function(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad*1.5&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad*1.5&&this.rect.right>0}},{key:"checkInView",value:function(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad&&this.rect.right>0}},{key:"filter",value:function(){var t=this;u(this.options.filter).map(function(e){t.options.filter[e](t,t.options)})}},{key:"renderLoading",value:function(t){var e=this;y({src:this.loading},function(n){e.render("loading",!1),t()})}},{key:"load",value:function(){var t=this;return this.attempt>this.options.attempt-1&&this.state.error?void(this.options.silent||console.log("error end")):this.state.loaded||b[this.src]?this.render("loaded",!0):void this.renderLoading(function(){t.attempt++,t.record("loadStart"),y({src:t.src},function(e){t.naturalHeight=e.naturalHeight,t.naturalWidth=e.naturalWidth,t.state.loaded=!0,t.state.error=!1,t.record("loadEnd"),t.render("loaded",!1),b[t.src]=1},function(e){t.state.error=!0,t.state.loaded=!1,t.render("error",!1)})})}},{key:"rest",value:function(){this.rested=!0}},{key:"unrest",value:function(){this.rested=!1}},{key:"render",value:function(t,e){this.elRenderer(this,t,e)}},{key:"performance",value:function(){var t="loading",e=0;return this.state.loaded&&(t="loaded",e=(this.performanceData.loadEnd-this.performanceData.loadStart)/1e3),this.state.error&&(t="error"),{src:this.src,state:t,time:e}}},{key:"destroy",value:function(){this.el=null,this.src=null,this.error=null,this.loading=null,this.bindType=null,this.attempt=0}}]),t}(),k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",T=["scroll","wheel","mousewheel","resize","animationend","transitionend","touchmove"],A=function(u){return function(){function d(t){var e=this,n=t.preLoad,r=t.error,i=t.preLoadTop,a=t.loading,u=t.attempt,c=t.silent,h=t.scale,p=t.listenEvents,v=(t.hasbind,t.filter),y=t.adapter;l(this,d),this.ListenerQueue=[],this.TargetIndex=0,this.TargetQueue=[],this.options={silent:c||!0,preLoad:n||1.3,preLoadTop:i||0,error:r||k,loading:a||k,attempt:u||3,scale:h||f(h),ListenEvents:p||T,hasbind:!1,supportWebp:o(),filter:v||{},adapter:y||{}},this._initEvent(),this.lazyLoadHandler=s(function(){var t=!1;e.ListenerQueue.forEach(function(e){e.state.loaded?e.state.rested&&!e.checkIsNear()?e.rest():e.unrest():(t=e.checkInView())&&e.load()})},200)}return c(d,[{key:"config",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e(this.options,t)}},{key:"performance",value:function(){var t=[];return this.ListenerQueue.map(function(e){t.push(e.performance())}),t}},{key:"addLazyBox",value:function(t){this.ListenerQueue.push(t),h&&(this._addListenerTarget(window),t.$el&&t.$el.parentNode&&this._addListenerTarget(t.$el.parentNode))}},{key:"add",value:function(t,e,i){var o=this;if(n(this.ListenerQueue,function(e){return e.el===t}))return this.update(t,e),u.nextTick(this.lazyLoadHandler);var s=this._valueFormatter(e.value),a=s.src,d=s.loading,l=s.error;u.nextTick(function(){a=r(t,o.options.scale)||a;var n=Object.keys(e.modifiers)[0],s=void 0;n&&(s=i.context.$refs[n],s=s?s.$el||s:document.getElementById(n)),s||(s=w(t));var c=new L({bindType:e.arg,$parent:s,el:t,loading:d,error:l,src:a,elRenderer:o._elRenderer.bind(o),options:o.options});o.ListenerQueue.push(c),h&&(o._addListenerTarget(window),o._addListenerTarget(s)),o.lazyLoadHandler(),u.nextTick(function(){return o.lazyLoadHandler()})})}},{key:"update",value:function(t,e){var n=this,r=this._valueFormatter(e.value),o=r.src,s=r.loading,a=r.error,d=i(this.ListenerQueue,function(e){return e.el===t});d&&d.update({src:o,loading:s,error:a}),this.lazyLoadHandler(),u.nextTick(function(){return n.lazyLoadHandler()})}},{key:"remove",value:function(e){if(e){var n=i(this.ListenerQueue,function(t){return t.el===e});n&&(this._removeListenerTarget(n.$parent),this._removeListenerTarget(window),t(this.ListenerQueue,n)&&n.destroy())}}},{key:"removeComponent",value:function(e){e&&(t(this.ListenerQueue,e),e.$parent&&e.$el.parentNode&&this._removeListenerTarget(e.$el.parentNode),this._removeListenerTarget(window))}},{key:"_addListenerTarget",value:function(t){if(t){var e=i(this.TargetQueue,function(e){return e.el===t});return e?e.childrenCount++:(e={el:t,id:++this.TargetIndex,childrenCount:1,listened:!0},this._initListen(e.el,!0),this.TargetQueue.push(e)),this.TargetIndex}}},{key:"_removeListenerTarget",value:function(t){var e=this;this.TargetQueue.forEach(function(n,r){n.el===t&&(--n.childrenCount||(e._initListen(n.el,!1),e.TargetQueue.splice(r,1),n=null))})}},{key:"_initListen",value:function(t,e){var n=this;this.options.ListenEvents.forEach(function(r){return v[e?"on":"off"](t,r,n.lazyLoadHandler)})}},{key:"_initEvent",value:function(){var e=this;this.Event={listeners:{loading:[],loaded:[],error:[]}},this.$on=function(t,n){e.Event.listeners[t].push(n)},this.$once=function(t,n){function r(){i.$off(t,r),n.apply(i,arguments)}var i=e;e.$on(t,r)},this.$off=function(n,r){if(!r)return void(e.Event.listeners[n]=[]);t(e.Event.listeners[n],r)},this.$emit=function(t,n,r){e.Event.listeners[t].forEach(function(t){return t(n,r)})}}},{key:"_elRenderer",value:function(t,e,n){if(t.el){var r=t.el,i=t.bindType,o=void 0;switch(e){case"loading":o=t.loading;break;case"error":o=t.error;break;default:o=t.src}i?r.style[i]="url("+o+")":r.getAttribute("src")!==o&&r.setAttribute("src",o),r.setAttribute("lazy",e),this.$emit(e,t,n),this.options.adapter[e]&&this.options.adapter[e](t,this.options)}}},{key:"_valueFormatter",value:function(t){var e=t,n=this.options.loading,r=this.options.error;return a(t)&&(t.src||this.options.silent||console.error("Vue Lazyload warning: miss src with "+t),e=t.src,n=t.loading||this.options.loading,r=t.error||this.options.error),{src:e,loading:n,error:r}}}]),d}()},E=function(t){return{props:{tag:{type:String,default:"div"}},render:function(t){return!1===this.show?t(this.tag):t(this.tag,null,this.$slots.default)},data:function(){return{state:{loaded:!1,rested:!1},rect:{},show:!1}},mounted:function(){t.addLazyBox(this),t.lazyLoadHandler()},beforeDestroy:function(){t.removeComponent(this)},methods:{getRect:function(){this.rect=this.$el.getBoundingClientRect()},checkInView:function(){return this.getRect(),h&&this.rect.top<window.innerHeight*t.options.preLoad&&this.rect.bottom>0&&this.rect.left<window.innerWidth*t.options.preLoad&&this.rect.right>0},checkIsNear:function(){return this.getRect(),h&&this.rect.top<window.innerHeight*t.options.preLoad*1.5&&this.rect.bottom>0&&this.rect.left<window.innerWidth*t.options.preLoad*1.5&&this.rect.right>0},load:function(){this.show=!0,this.state.loaded=!0,this.$emit("show",this)},rest:function(){this.rested=!0,this.$emit("rest",this)},unrest:function(){this.rested=!1,this.$emit("unrest",this)}}}};return{install:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=A(t),i=new r(n),o="2"===t.version.split(".")[0];t.prototype.$Lazyload=i,n.lazyComponent&&t.component("lazy-component",E(i)),o?t.directive("lazy",{bind:i.add.bind(i),update:i.update.bind(i),componentUpdated:i.lazyLoadHandler.bind(i),unbind:i.remove.bind(i)}):t.directive("lazy",{bind:i.lazyLoadHandler.bind(i),update:function(t,n){e(this.vm.$refs,this.vm.$els),i.add(this.el,{modifiers:this.modifiers||{},arg:this.arg,value:t,oldValue:n},{context:this.vm})},unbind:function(){i.remove(this.el)}})}}});
