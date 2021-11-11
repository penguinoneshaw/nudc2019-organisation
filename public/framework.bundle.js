/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),n=new Map;class i{constructor(t,n){if(this._$cssResult$=!0,n!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=n.get(this.cssText);return t&&void 0===e&&(n.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const s=(t,...n)=>{const s=1===t.length?t[0]:n.reduce(((e,n,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1]),t[0]);return new i(s,e)},r=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let n="";for(const e of t.cssRules)n+=e.cssText;return(t=>new i("string"==typeof t?t:t+"",e))(n)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var o;const a=window.trustedTypes,l=a?a.emptyScript:"",h=window.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},c=(t,e)=>e!==t&&(e==e||t==t),u={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:c};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,n)=>{const i=this._$Eh(n,e);void 0!==i&&(this._$Eu.set(i,n),t.push(i))})),t}static createProperty(t,e=u){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const n="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,n,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(i){const s=this[t];this[e]=i,this.requestUpdate(t,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||u}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of e)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,n;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(n=t.hostConnected)||void 0===n||n.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const n=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{t?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),i=window.litNonce;void 0!==i&&n.setAttribute("nonce",i),n.textContent=t.cssText,e.appendChild(n)}))})(n,this.constructor.elementStyles),n}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ES(t,e,n=u){var i,s;const r=this.constructor._$Eh(t,n);if(void 0!==r&&!0===n.reflect){const o=(null!==(s=null===(i=n.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==s?s:d.toAttribute)(e,n.type);this._$Ei=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Ei=null}}_$AK(t,e){var n,i,s;const r=this.constructor,o=r._$Eu.get(t);if(void 0!==o&&this._$Ei!==o){const t=r.getPropertyOptions(o),a=t.converter,l=null!==(s=null!==(i=null===(n=a)||void 0===n?void 0:n.fromAttribute)&&void 0!==i?i:"function"==typeof a?a:null)&&void 0!==s?s:d.fromAttribute;this._$Ei=o,this[o]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,n){let i=!0;void 0!==t&&(((n=n||this.constructor.getPropertyOptions(t)).hasChanged||c)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===n.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,n))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(n)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(n)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:p}),(null!==(o=globalThis.reactiveElementVersions)&&void 0!==o?o:globalThis.reactiveElementVersions=[]).push("1.0.2");const f=globalThis.trustedTypes,_=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,v=`lit$${(Math.random()+"").slice(9)}$`,g="?"+v,b=`<${g}>`,y=document,$=(t="")=>y.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,w=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,x=/>/g,C=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,z=/'/g,U=/"/g,k=/^(?:script|style|textarea)$/i,N=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),R=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),P=new WeakMap,O=y.createTreeWalker(y,129,null,!1),I=(t,e)=>{const n=t.length-1,i=[];let s,r=2===e?"<svg>":"",o=E;for(let e=0;e<n;e++){const n=t[e];let a,l,h=-1,d=0;for(;d<n.length&&(o.lastIndex=d,l=o.exec(n),null!==l);)d=o.lastIndex,o===E?"!--"===l[1]?o=S:void 0!==l[1]?o=x:void 0!==l[2]?(k.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=C):void 0!==l[3]&&(o=C):o===C?">"===l[0]?(o=null!=s?s:E,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?C:'"'===l[3]?U:z):o===U||o===z?o=C:o===S||o===x?o=E:(o=C,s=void 0);const c=o===C&&t[e+1].startsWith("/>")?" ":"";r+=o===E?n+b:h>=0?(i.push(a),n.slice(0,h)+"$lit$"+n.slice(h)+v+c):n+v+(-2===h?(i.push(void 0),e):c)}const a=r+(t[n]||"<?>")+(2===e?"</svg>":"");return[void 0!==_?_.createHTML(a):a,i]};class H{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let s=0,r=0;const o=t.length-1,a=this.parts,[l,h]=I(t,e);if(this.el=H.createElement(l,n),O.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=O.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(v)){const n=h[r++];if(t.push(e),void 0!==n){const t=i.getAttribute(n.toLowerCase()+"$lit$").split(v),e=/([.?@])?(.*)/.exec(n);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?B:"?"===e[1]?V:"@"===e[1]?q:j})}else a.push({type:6,index:s})}for(const e of t)i.removeAttribute(e)}if(k.test(i.tagName)){const t=i.textContent.split(v),e=t.length-1;if(e>0){i.textContent=f?f.emptyScript:"";for(let n=0;n<e;n++)i.append(t[n],$()),O.nextNode(),a.push({type:2,index:++s});i.append(t[e],$())}}}else if(8===i.nodeType)if(i.data===g)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(v,t+1));)a.push({type:7,index:s}),t+=v.length-1}s++}}static createElement(t,e){const n=y.createElement("template");return n.innerHTML=t,n}}function M(t,e,n=t,i){var s,r,o,a;if(e===R)return e;let l=void 0!==i?null===(s=n._$Cl)||void 0===s?void 0:s[i]:n._$Cu;const h=A(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,n,i)),void 0!==i?(null!==(o=(a=n)._$Cl)&&void 0!==o?o:a._$Cl=[])[i]=l:n._$Cu=l),void 0!==l&&(e=M(t,l._$AS(t,e.values),l,i)),e}class L{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:n},parts:i}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:y).importNode(n,!0);O.currentNode=s;let r=O.nextNode(),o=0,a=0,l=i[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new D(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new W(r,this,t)),this.v.push(e),l=i[++a]}o!==(null==l?void 0:l.index)&&(r=O.nextNode(),o++)}return s}m(t){let e=0;for(const n of this.v)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class D{constructor(t,e,n,i){var s;this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cg=null===(s=null==i?void 0:i.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),A(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==R&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return w(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==T&&A(this._$AH)?this._$AA.nextSibling.data=t:this.S(y.createTextNode(t)),this._$AH=t}T(t){var e;const{values:n,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=H.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.m(n);else{const t=new L(s,this),e=t.p(this.options);t.m(n),this.S(e),this._$AH=t}}_$AC(t){let e=P.get(t.strings);return void 0===e&&P.set(t.strings,e=new H(t)),e}M(t){w(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,i=0;for(const s of t)i===e.length?e.push(n=new D(this.A($()),this.A($()),this,this.options)):n=e[i],n._$AI(s),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var n;for(null===(n=this._$AP)||void 0===n||n.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class j{constructor(t,e,n,i,s){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=T}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,n,i){const s=this.strings;let r=!1;if(void 0===s)t=M(this,t,e,0),r=!A(t)||t!==this._$AH&&t!==R,r&&(this._$AH=t);else{const i=t;let o,a;for(t=s[0],o=0;o<s.length-1;o++)a=M(this,i[n+o],e,o),a===R&&(a=this._$AH[o]),r||(r=!A(a)||a!==this._$AH[o]),a===T?t=T:t!==T&&(t+=(null!=a?a:"")+s[o+1]),this._$AH[o]=a}r&&!i&&this.k(t)}k(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class B extends j{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===T?void 0:t}}const F=f?f.emptyScript:"";class V extends j{constructor(){super(...arguments),this.type=4}k(t){t&&t!==T?this.element.setAttribute(this.name,F):this.element.removeAttribute(this.name)}}class q extends j{constructor(t,e,n,i,s){super(t,e,n,i,s),this.type=5}_$AI(t,e=this){var n;if((t=null!==(n=M(this,t,e,0))&&void 0!==n?n:T)===R)return;const i=this._$AH,s=t===T&&i!==T||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==T&&(i===T||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,n;"function"==typeof this._$AH?this._$AH.call(null!==(n=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==n?n:this.element,t):this._$AH.handleEvent(t)}}class W{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const K=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G,J;null==K||K(H,D),(null!==(m=globalThis.litHtmlVersions)&&void 0!==m?m:globalThis.litHtmlVersions=[]).push("2.0.2");class Z extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const n=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=n.firstChild),n}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,n)=>{var i,s;const r=null!==(i=null==n?void 0:n.renderBefore)&&void 0!==i?i:e;let o=r._$litPart$;if(void 0===o){const t=null!==(s=null==n?void 0:n.renderBefore)&&void 0!==s?s:null;r._$litPart$=o=new D(e.insertBefore($(),t),t,void 0,null!=n?n:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return R}}Z.finalized=!0,Z._$litElement$=!0,null===(G=globalThis.litElementHydrateSupport)||void 0===G||G.call(globalThis,{LitElement:Z});const Q=globalThis.litElementPolyfillSupport;null==Q||Q({LitElement:Z}),(null!==(J=globalThis.litElementVersions)&&void 0!==J?J:globalThis.litElementVersions=[]).push("3.0.2");class X extends Z{static get styles(){return[s`
        :host {
          grid-area: body;
          transition: transform 0.3s ease-in-out, opacity 0.2s ease-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          text-align: center;
          font-size: 32px;
        }

        :host(:not([active])) {
          opacity: 0;
        }

        section {
          max-width: 800px;
        }
      `]}static get properties(){return{active:{type:Boolean,notify:!0,reflect:!0},title:{type:String},body:{type:String}}}constructor(){super(),this.title=this.title||"Northern Universities Dance Competition"}render(){return N`
      <header>
        <h1>${this.title}</h1>
      </header>
      ${this.body?N` <section>${this.body}</section> `:""}
    `}hideSlide(){return this.active=!1,this.active}showSlide(){return this.active=!0,this.active}shouldUpdate(){return!0}}const Y=io(),tt=document.createElement("style");tt.innerHTML=['/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n','body {\n  --app-primary-color: #004205;\n  --app-secondary-color: #5c366a;\n  --app-secondary-darker: #2a1930;\n  --app-contrast-primary-color: white;\n  --app-contrast-primary-color: white;\n  --body-fonts: "Roboto", "Segoe UI", "Tahoma", "Geneva", Verdana, sans-serif;\n  --header-fonts: "Roboto Slab", "Palatino Linotype", "Palatino", serif;\n  width: 100vw;\n  height: 100vh;\n  position: relative;\n}\n\n* {\n  box-sizing: border-box;\n}'].join(""),document.head.appendChild(tt),window.customElements.define("dancesport-frame",X),window.customElements.define("dancesport-frameholder",class extends Z{static get styles(){return s`
      :host {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: grid;
        z-index: -2;
        grid-template-areas: "logo logo" "body body" "footer footer";
        grid-template-rows: 80px auto 80px;
        grid-template-columns: 1fr 5fr;
        transition: transform 0.3s ease-in-out;
        background-color: white;
        font-family: var(--header-fonts);
        background-color: white;
      }

      #frames::after {
        content: "";
        background: url(logo.svg) no-repeat center center;
        position: fixed;
        background-size: 80%;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        opacity: 0.1;
        z-index: -1;
      }

      header {
        grid-area: logo;
        font-size: 1em;
        background-color: var(--app-primary-color, darkgreen);
        color: var(--app-contrast-primary-color, white);
        text-align: center;
        font-variant: small-caps;
      }

      section {
        font-family: var(--body-fonts);
      }

      #sidebar {
        border-right: double thick var(--app-primary-color);
        grid-area: sidebar;
      }

      :host([loading]) {
        opacity: 0;
      }

      #frames {
        display: contents;
        transition: opacity 0.1s cubic-bezier(0, 0.3, 0.6, 1);
      }

      footer {
        grid-area: footer;
        background-color: var(--app-primary-color, darkgreen);
        color: var(--app-primary-contrast-color, white);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      #nextup {
        font-style: italic;
        font-size: 1.4em;
      }

      #nextup::before {
        content: "Next: ";
        font-style: normal;
      }
    `}static get properties(){return{_slides:{type:Array},_competitions:{type:Object},_current_slide:{type:Number},_sponsors:{type:Array},_compere:{type:String},title:{type:String}}}constructor(){super(),this.title=this.title||"Northern Universities Dance Competition",this._slides=[{type:"standard"}],this._current_slide=0,this.setAttribute("loading",!0)}_current_slide_frame(){return this.shadowRoot.querySelectorAll("#frames > *")[this._current_slide]}_next_event(){let t=(this._current_slide+1)%this._slides.length;if(!this._slides[t])return"END OF COMPETITION!";if(0==t)return"END OF COMPETITION!";const e=this._slides[t];switch(e.type){case"round":return[this._competitions[e.competition].category,this._competitions[e.competition].event,Number.isInteger(parseInt(e.round),10)?`Round ${e.round}`:e.round].join(" ");case"offbeat":return"Offbeat - "+e.title;default:return e.title}}updateConfig(){fetch("/config").then((t=>t.json())).then((t=>{this._competitions=t.competitions,this._compere=t.compere,this._sponsors=t.sponsors,this._slides=t.slides,this.removeAttribute("loading")})).catch((t=>console.error(t)))}firstUpdated(){this.updateConfig(),document.body.addEventListener("keydown",(t=>{switch(t.key){case"ArrowRight":this.nextSlide();break;case"ArrowLeft":this.prevSlide();break;case"f":this.requestFullscreen()}})),document.body.addEventListener("touchstart",(()=>{this.requestFullscreen()})),this._current_slide_frame().showSlide()}set slide(t){let e;if(e=Array.isArray(t)?t[0]:t,!(e<this._slides.length&&e>=0))throw new Error("Slide not available to switch to.");this._current_slide_frame().hideSlide(),this._current_slide=e,Array.isArray(t)&&t.length>1&&void 0!==this._current_slide_frame().subframe&&(this._current_slide_frame().subframe=(([,...t])=>t)(t)),this._current_slide_frame().showSlide()}get slide(){return[this._current_slide,this._current_slide_frame().subframe]}nextSlide(){this._current_slide_frame().nextSubframe&&this._current_slide_frame().nextSubframe()||(this._current_slide_frame().hideSlide(),this.slide=this._next_slide_number(),this._current_slide_frame().showSlide()),this.dispatchEvent(new CustomEvent("slide-changed",{detail:{slide:this.slide},bubbles:!0,cancelable:!0}))}_next_slide_number(){return(this._current_slide+1)%this._slides.length}_prev_slide_number(){return(this._current_slide-1<0?this._slides.length:this._current_slide)-1}prevSlide(){this._current_slide_frame().hideSlide(),this.slide=this._prev_slide_number(),this._current_slide_frame().showSlide(),this.dispatchEvent(new CustomEvent("slide-changed",{detail:{slide:this.slide},bubbles:!0,cancelable:!0}))}render(){try{return N`
        <header>
          <h1>${this.title}</h1>
        </header>
        <div id="frames">
          ${this._slides.map((t=>{switch(t.type){case"round":try{return N`<round-frame
                    .title="${this._competitions[t.competition].category+" "+this._competitions[t.competition].event}"
                    .round="${t.round}"
                    .heats="${t.heats}"
                    .recalls=${t.recalls}
                    .dances=${this._competitions[t.competition].dances||[]}
                  ></round-frame>`}catch(e){console.error(e,t)}case"offbeat":return N`<offbeat-frame
                  .title="${t.title}"
                  .university="${t.university}"
                ></offbeat-frame>`;default:return N`<dancesport-frame
                  .title="${t.title}"
                  .body="${t.body}"
                ></dancesport-frame>`}}))}
        </div>
        <footer>
          ${this._compere?N`<div>Compère: ${this._compere}</div>`:""}
          <div id="nextup">${this._next_event()}</div>
          ${this._slides[this._current_slide].sponsor?N`<div>
                Kindly Sponsored By ${this._slides[this._current_slide].sponsor}
              </div>`:""}
        </footer>
      `}catch(t){console.log(t,this._competitions,this._slides)}}}),window.customElements.define("round-frame",class extends X{static get styles(){return[...super.styles,s``]}static get properties(){return{...super.properties,round:{type:Number},heats:{type:Number},recalls:{type:Array},_current_heat:{type:Number},_current_dance:{type:Number},dances:{type:Array}}}constructor(){super(),this.title=this.title||"Northern Universities Dance Competition",this.recalls=this.recalls||[],this._current_heat=1,this._current_dance=0,this.dances=this.dances||[]}render(){return N`
      <header>
        <h1>${this.title}</h1>
        ${this.dances.length>1?N` <h2>${this.dances[this._current_dance]}</h2>`:""}
        <h2>
          ${Number.isInteger(parseInt(this.round,10))?N`Round ${this.round}`:this.round}
        </h2>
        ${1!=this.heats?N`<h3>Heat ${this._current_heat}/${this.heats}</h3>`:""}
      </header>
      ${this.recalls?N`
            <section>
              <h1>Recalls</h1>
              ${this.recalls.join(",\t")}
            </section>
          `:""}
    `}set heat(t){if(t>this.heats||t<=0)throw new Error("Invalid Heat Number"+t);return this._current_heat=t,t}set dance(t){if(t>=this.dances.length||t<0)throw new Error("Invalid Dance Number"+t);return this._current_dance=t,t}set subframe(t){if(Array.isArray(t)&&(t=t[0]),t>=this.dances.length*this.heats)return new Error("Invalid Heat Number"+t);this.dance=Math.floor(t/this.heats),this.heat=t%this.heats+1}get subframe(){return this._current_dance*this.heats+(this._current_heat-1)}nextSubframe(){return!(this.subframe+1>=this.heats*this.dances.length)&&(this.subframe=this.subframe+1,!0)}hideSlide(){super.hideSlide(),this.subframe=0}}),window.customElements.define("offbeat-frame",class extends X{static get styles(){return[...super.styles,s``]}static get properties(){return{...super.properties,university:{type:Number}}}constructor(){super()}render(){return N`
      <header>
        <h1>Offbeat</h1>
        <h2>${this.university} &mdash; ${this.title}</h2>
      </header>
    `}});const et=document.querySelector("dancesport-frameholder");Y.on("current-slide",(t=>{et.slide=t})),Y.on("reconnect",(t=>{et.updateConfig()})),document.addEventListener("slide-changed",(t=>{Y.emit("slide-changed",t.detail.slide)}));
