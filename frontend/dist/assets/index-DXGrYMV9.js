(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Oc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Oe={},ps=[],mn=()=>{},pp=()=>!1,Ca=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Vc=t=>t.startsWith("onUpdate:"),Et=Object.assign,Dc=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Oy=Object.prototype.hasOwnProperty,Pe=(t,e)=>Oy.call(t,e),le=Array.isArray,ms=t=>Zi(t)==="[object Map]",xs=t=>Zi(t)==="[object Set]",qh=t=>Zi(t)==="[object Date]",me=t=>typeof t=="function",Ke=t=>typeof t=="string",an=t=>typeof t=="symbol",De=t=>t!==null&&typeof t=="object",mp=t=>(De(t)||me(t))&&me(t.then)&&me(t.catch),gp=Object.prototype.toString,Zi=t=>gp.call(t),Vy=t=>Zi(t).slice(8,-1),_p=t=>Zi(t)==="[object Object]",Nc=t=>Ke(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,pi=Oc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ka=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},Dy=/-\w/g,_r=ka(t=>t.replace(Dy,e=>e.slice(1).toUpperCase())),Ny=/\B([A-Z])/g,Yr=ka(t=>t.replace(Ny,"-$1").toLowerCase()),yp=ka(t=>t.charAt(0).toUpperCase()+t.slice(1)),_l=ka(t=>t?`on${yp(t)}`:""),ur=(t,e)=>!Object.is(t,e),jo=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},vp=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},Oa=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let zh;const Va=()=>zh||(zh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Vi(t){if(le(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Ke(r)?Fy(r):Vi(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Ke(t)||De(t))return t}const xy=/;(?![^(]*\))/g,My=/:([^]+)/,Ly=/\/\*[^]*?\*\//g;function Fy(t){const e={};return t.replace(Ly,"").split(xy).forEach(n=>{if(n){const r=n.split(My);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function gn(t){let e="";if(Ke(t))e=t;else if(le(t))for(let n=0;n<t.length;n++){const r=gn(t[n]);r&&(e+=r+" ")}else if(De(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Uy="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",By=Oc(Uy);function Ep(t){return!!t||t===""}function jy(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=Hr(t[r],e[r]);return n}function Hr(t,e){if(t===e)return!0;let n=qh(t),r=qh(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=an(t),r=an(e),n||r)return t===e;if(n=le(t),r=le(e),n||r)return n&&r?jy(t,e):!1;if(n=De(t),r=De(e),n||r){if(!n||!r)return!1;const s=Object.keys(t).length,i=Object.keys(e).length;if(s!==i)return!1;for(const o in t){const l=t.hasOwnProperty(o),c=e.hasOwnProperty(o);if(l&&!c||!l&&c||!Hr(t[o],e[o]))return!1}}return String(t)===String(e)}function xc(t,e){return t.findIndex(n=>Hr(n,e))}const Tp=t=>!!(t&&t.__v_isRef===!0),Ue=t=>Ke(t)?t:t==null?"":le(t)||De(t)&&(t.toString===gp||!me(t.toString))?Tp(t)?Ue(t.value):JSON.stringify(t,wp,2):String(t),wp=(t,e)=>Tp(e)?wp(t,e.value):ms(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[yl(r,i)+" =>"]=s,n),{})}:xs(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>yl(n))}:an(e)?yl(e):De(e)&&!le(e)&&!_p(e)?String(e):e,yl=(t,e="")=>{var n;return an(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let kt;class $y{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=kt,!e&&kt&&(this.index=(kt.scopes||(kt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=kt;try{return kt=this,e()}finally{kt=n}}}on(){++this._on===1&&(this.prevScope=kt,kt=this)}off(){this._on>0&&--this._on===0&&(kt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Hy(){return kt}let Ne;const vl=new WeakSet;class Ip{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,kt&&kt.active&&kt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,vl.has(this)&&(vl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||bp(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Gh(this),Rp(this);const e=Ne,n=rn;Ne=this,rn=!0;try{return this.fn()}finally{Sp(this),Ne=e,rn=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Fc(e);this.deps=this.depsTail=void 0,Gh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?vl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){jl(this)&&this.run()}get dirty(){return jl(this)}}let Ap=0,mi,gi;function bp(t,e=!1){if(t.flags|=8,e){t.next=gi,gi=t;return}t.next=mi,mi=t}function Mc(){Ap++}function Lc(){if(--Ap>0)return;if(gi){let e=gi;for(gi=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;mi;){let e=mi;for(mi=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function Rp(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Sp(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Fc(r),qy(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function jl(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Pp(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Pp(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Di)||(t.globalVersion=Di,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!jl(t))))return;t.flags|=2;const e=t.dep,n=Ne,r=rn;Ne=t,rn=!0;try{Rp(t);const s=t.fn(t._value);(e.version===0||ur(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{Ne=n,rn=r,Sp(t),t.flags&=-3}}function Fc(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Fc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function qy(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let rn=!0;const Cp=[];function Fn(){Cp.push(rn),rn=!1}function Un(){const t=Cp.pop();rn=t===void 0?!0:t}function Gh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Ne;Ne=void 0;try{e()}finally{Ne=n}}}let Di=0;class zy{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Uc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ne||!rn||Ne===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ne)n=this.activeLink=new zy(Ne,this),Ne.deps?(n.prevDep=Ne.depsTail,Ne.depsTail.nextDep=n,Ne.depsTail=n):Ne.deps=Ne.depsTail=n,kp(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Ne.depsTail,n.nextDep=void 0,Ne.depsTail.nextDep=n,Ne.depsTail=n,Ne.deps===n&&(Ne.deps=r)}return n}trigger(e){this.version++,Di++,this.notify(e)}notify(e){Mc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Lc()}}}function kp(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)kp(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const $l=new WeakMap,Br=Symbol(""),Hl=Symbol(""),Ni=Symbol("");function gt(t,e,n){if(rn&&Ne){let r=$l.get(t);r||$l.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new Uc),s.map=r,s.key=n),s.track()}}function kn(t,e,n,r,s,i){const o=$l.get(t);if(!o){Di++;return}const l=c=>{c&&c.trigger()};if(Mc(),e==="clear")o.forEach(l);else{const c=le(t),h=c&&Nc(n);if(c&&n==="length"){const d=Number(r);o.forEach((p,m)=>{(m==="length"||m===Ni||!an(m)&&m>=d)&&l(p)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),h&&l(o.get(Ni)),e){case"add":c?h&&l(o.get("length")):(l(o.get(Br)),ms(t)&&l(o.get(Hl)));break;case"delete":c||(l(o.get(Br)),ms(t)&&l(o.get(Hl)));break;case"set":ms(t)&&l(o.get(Br));break}}Lc()}function as(t){const e=Se(t);return e===t?e:(gt(e,"iterate",Ni),Qt(t)?e:e.map(ln))}function Da(t){return gt(t=Se(t),"iterate",Ni),t}function nr(t,e){return Bn(t)?jr(t)?Is(ln(e)):Is(e):ln(e)}const Gy={__proto__:null,[Symbol.iterator](){return El(this,Symbol.iterator,t=>nr(this,t))},concat(...t){return as(this).concat(...t.map(e=>le(e)?as(e):e))},entries(){return El(this,"entries",t=>(t[1]=nr(this,t[1]),t))},every(t,e){return Sn(this,"every",t,e,void 0,arguments)},filter(t,e){return Sn(this,"filter",t,e,n=>n.map(r=>nr(this,r)),arguments)},find(t,e){return Sn(this,"find",t,e,n=>nr(this,n),arguments)},findIndex(t,e){return Sn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Sn(this,"findLast",t,e,n=>nr(this,n),arguments)},findLastIndex(t,e){return Sn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Sn(this,"forEach",t,e,void 0,arguments)},includes(...t){return Tl(this,"includes",t)},indexOf(...t){return Tl(this,"indexOf",t)},join(t){return as(this).join(t)},lastIndexOf(...t){return Tl(this,"lastIndexOf",t)},map(t,e){return Sn(this,"map",t,e,void 0,arguments)},pop(){return si(this,"pop")},push(...t){return si(this,"push",t)},reduce(t,...e){return Wh(this,"reduce",t,e)},reduceRight(t,...e){return Wh(this,"reduceRight",t,e)},shift(){return si(this,"shift")},some(t,e){return Sn(this,"some",t,e,void 0,arguments)},splice(...t){return si(this,"splice",t)},toReversed(){return as(this).toReversed()},toSorted(t){return as(this).toSorted(t)},toSpliced(...t){return as(this).toSpliced(...t)},unshift(...t){return si(this,"unshift",t)},values(){return El(this,"values",t=>nr(this,t))}};function El(t,e,n){const r=Da(t),s=r[e]();return r!==t&&!Qt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const Wy=Array.prototype;function Sn(t,e,n,r,s,i){const o=Da(t),l=o!==t&&!Qt(t),c=o[e];if(c!==Wy[e]){const p=c.apply(t,i);return l?ln(p):p}let h=n;o!==t&&(l?h=function(p,m){return n.call(this,nr(t,p),m,t)}:n.length>2&&(h=function(p,m){return n.call(this,p,m,t)}));const d=c.call(o,h,r);return l&&s?s(d):d}function Wh(t,e,n,r){const s=Da(t);let i=n;return s!==t&&(Qt(t)?n.length>3&&(i=function(o,l,c){return n.call(this,o,l,c,t)}):i=function(o,l,c){return n.call(this,o,nr(t,l),c,t)}),s[e](i,...r)}function Tl(t,e,n){const r=Se(t);gt(r,"iterate",Ni);const s=r[e](...n);return(s===-1||s===!1)&&$c(n[0])?(n[0]=Se(n[0]),r[e](...n)):s}function si(t,e,n=[]){Fn(),Mc();const r=Se(t)[e].apply(t,n);return Lc(),Un(),r}const Ky=Oc("__proto__,__v_isRef,__isVue"),Op=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(an));function Qy(t){an(t)||(t=String(t));const e=Se(this);return gt(e,"has",t),e.hasOwnProperty(t)}class Vp{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?iv:Mp:i?xp:Np).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=le(e);if(!s){let c;if(o&&(c=Gy[n]))return c;if(n==="hasOwnProperty")return Qy}const l=Reflect.get(e,n,vt(e)?e:r);if((an(n)?Op.has(n):Ky(n))||(s||gt(e,"get",n),i))return l;if(vt(l)){const c=o&&Nc(n)?l:l.value;return s&&De(c)?zl(c):c}return De(l)?s?zl(l):Ms(l):l}}class Dp extends Vp{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];const o=le(e)&&Nc(n);if(!this._isShallow){const h=Bn(i);if(!Qt(r)&&!Bn(r)&&(i=Se(i),r=Se(r)),!o&&vt(i)&&!vt(r))return h||(i.value=r),!0}const l=o?Number(n)<e.length:Pe(e,n),c=Reflect.set(e,n,r,vt(e)?e:s);return e===Se(s)&&(l?ur(r,i)&&kn(e,"set",n,r):kn(e,"add",n,r)),c}deleteProperty(e,n){const r=Pe(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&kn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!an(n)||!Op.has(n))&&gt(e,"has",n),r}ownKeys(e){return gt(e,"iterate",le(e)?"length":Br),Reflect.ownKeys(e)}}class Jy extends Vp{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Yy=new Dp,Xy=new Jy,Zy=new Dp(!0);const ql=t=>t,ko=t=>Reflect.getPrototypeOf(t);function ev(t,e,n){return function(...r){const s=this.__v_raw,i=Se(s),o=ms(i),l=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,h=s[t](...r),d=n?ql:e?Is:ln;return!e&&gt(i,"iterate",c?Hl:Br),{next(){const{value:p,done:m}=h.next();return m?{value:p,done:m}:{value:l?[d(p[0]),d(p[1])]:d(p),done:m}},[Symbol.iterator](){return this}}}}function Oo(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function tv(t,e){const n={get(s){const i=this.__v_raw,o=Se(i),l=Se(s);t||(ur(s,l)&&gt(o,"get",s),gt(o,"get",l));const{has:c}=ko(o),h=e?ql:t?Is:ln;if(c.call(o,s))return h(i.get(s));if(c.call(o,l))return h(i.get(l));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&gt(Se(s),"iterate",Br),s.size},has(s){const i=this.__v_raw,o=Se(i),l=Se(s);return t||(ur(s,l)&&gt(o,"has",s),gt(o,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const o=this,l=o.__v_raw,c=Se(l),h=e?ql:t?Is:ln;return!t&&gt(c,"iterate",Br),l.forEach((d,p)=>s.call(i,h(d),h(p),o))}};return Et(n,t?{add:Oo("add"),set:Oo("set"),delete:Oo("delete"),clear:Oo("clear")}:{add(s){!e&&!Qt(s)&&!Bn(s)&&(s=Se(s));const i=Se(this);return ko(i).has.call(i,s)||(i.add(s),kn(i,"add",s,s)),this},set(s,i){!e&&!Qt(i)&&!Bn(i)&&(i=Se(i));const o=Se(this),{has:l,get:c}=ko(o);let h=l.call(o,s);h||(s=Se(s),h=l.call(o,s));const d=c.call(o,s);return o.set(s,i),h?ur(i,d)&&kn(o,"set",s,i):kn(o,"add",s,i),this},delete(s){const i=Se(this),{has:o,get:l}=ko(i);let c=o.call(i,s);c||(s=Se(s),c=o.call(i,s)),l&&l.call(i,s);const h=i.delete(s);return c&&kn(i,"delete",s,void 0),h},clear(){const s=Se(this),i=s.size!==0,o=s.clear();return i&&kn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=ev(s,t,e)}),n}function Bc(t,e){const n=tv(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Pe(n,s)&&s in r?n:r,s,i)}const nv={get:Bc(!1,!1)},rv={get:Bc(!1,!0)},sv={get:Bc(!0,!1)};const Np=new WeakMap,xp=new WeakMap,Mp=new WeakMap,iv=new WeakMap;function ov(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function av(t){return t.__v_skip||!Object.isExtensible(t)?0:ov(Vy(t))}function Ms(t){return Bn(t)?t:jc(t,!1,Yy,nv,Np)}function Lp(t){return jc(t,!1,Zy,rv,xp)}function zl(t){return jc(t,!0,Xy,sv,Mp)}function jc(t,e,n,r,s){if(!De(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=av(t);if(i===0)return t;const o=s.get(t);if(o)return o;const l=new Proxy(t,i===2?r:n);return s.set(t,l),l}function jr(t){return Bn(t)?jr(t.__v_raw):!!(t&&t.__v_isReactive)}function Bn(t){return!!(t&&t.__v_isReadonly)}function Qt(t){return!!(t&&t.__v_isShallow)}function $c(t){return t?!!t.__v_raw:!1}function Se(t){const e=t&&t.__v_raw;return e?Se(e):t}function lv(t){return!Pe(t,"__v_skip")&&Object.isExtensible(t)&&vp(t,"__v_skip",!0),t}const ln=t=>De(t)?Ms(t):t,Is=t=>De(t)?zl(t):t;function vt(t){return t?t.__v_isRef===!0:!1}function ze(t){return Fp(t,!1)}function cv(t){return Fp(t,!0)}function Fp(t,e){return vt(t)?t:new uv(t,e)}class uv{constructor(e,n){this.dep=new Uc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Se(e),this._value=n?e:ln(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||Qt(e)||Bn(e);e=r?e:Se(e),ur(e,n)&&(this._rawValue=e,this._value=r?e:ln(e),this.dep.trigger())}}function Be(t){return vt(t)?t.value:t}const hv={get:(t,e,n)=>e==="__v_raw"?t:Be(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return vt(s)&&!vt(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Up(t){return jr(t)?t:new Proxy(t,hv)}class dv{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Uc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Di-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Ne!==this)return bp(this,!0),!0}get value(){const e=this.dep.track();return Pp(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function fv(t,e,n=!1){let r,s;return me(t)?r=t:(r=t.get,s=t.set),new dv(r,s,n)}const Vo={},ra=new WeakMap;let Nr;function pv(t,e=!1,n=Nr){if(n){let r=ra.get(n);r||ra.set(n,r=[]),r.push(t)}}function mv(t,e,n=Oe){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:l,call:c}=n,h=z=>s?z:Qt(z)||s===!1||s===0?On(z,1):On(z);let d,p,m,_,P=!1,V=!1;if(vt(t)?(p=()=>t.value,P=Qt(t)):jr(t)?(p=()=>h(t),P=!0):le(t)?(V=!0,P=t.some(z=>jr(z)||Qt(z)),p=()=>t.map(z=>{if(vt(z))return z.value;if(jr(z))return h(z);if(me(z))return c?c(z,2):z()})):me(t)?e?p=c?()=>c(t,2):t:p=()=>{if(m){Fn();try{m()}finally{Un()}}const z=Nr;Nr=d;try{return c?c(t,3,[_]):t(_)}finally{Nr=z}}:p=mn,e&&s){const z=p,he=s===!0?1/0:s;p=()=>On(z(),he)}const S=Hy(),x=()=>{d.stop(),S&&S.active&&Dc(S.effects,d)};if(i&&e){const z=e;e=(...he)=>{z(...he),x()}}let B=V?new Array(t.length).fill(Vo):Vo;const H=z=>{if(!(!(d.flags&1)||!d.dirty&&!z))if(e){const he=d.run();if(s||P||(V?he.some((ue,A)=>ur(ue,B[A])):ur(he,B))){m&&m();const ue=Nr;Nr=d;try{const A=[he,B===Vo?void 0:V&&B[0]===Vo?[]:B,_];B=he,c?c(e,3,A):e(...A)}finally{Nr=ue}}}else d.run()};return l&&l(H),d=new Ip(p),d.scheduler=o?()=>o(H,!1):H,_=z=>pv(z,!1,d),m=d.onStop=()=>{const z=ra.get(d);if(z){if(c)c(z,4);else for(const he of z)he();ra.delete(d)}},e?r?H(!0):B=d.run():o?o(H.bind(null,!0),!0):d.run(),x.pause=d.pause.bind(d),x.resume=d.resume.bind(d),x.stop=x,x}function On(t,e=1/0,n){if(e<=0||!De(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,vt(t))On(t.value,e,n);else if(le(t))for(let r=0;r<t.length;r++)On(t[r],e,n);else if(xs(t)||ms(t))t.forEach(r=>{On(r,e,n)});else if(_p(t)){for(const r in t)On(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&On(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function eo(t,e,n,r){try{return r?t(...r):t()}catch(s){Na(s,e,n)}}function wn(t,e,n,r){if(me(t)){const s=eo(t,e,n,r);return s&&mp(s)&&s.catch(i=>{Na(i,e,n)}),s}if(le(t)){const s=[];for(let i=0;i<t.length;i++)s.push(wn(t[i],e,n,r));return s}}function Na(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Oe;if(e){let l=e.parent;const c=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const d=l.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](t,c,h)===!1)return}l=l.parent}if(i){Fn(),eo(i,null,10,[t,c,h]),Un();return}}gv(t,n,s,r,o)}function gv(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const St=[];let dn=-1;const gs=[];let rr=null,ls=0;const Bp=Promise.resolve();let sa=null;function Hc(t){const e=sa||Bp;return t?e.then(this?t.bind(this):t):e}function _v(t){let e=dn+1,n=St.length;for(;e<n;){const r=e+n>>>1,s=St[r],i=xi(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function qc(t){if(!(t.flags&1)){const e=xi(t),n=St[St.length-1];!n||!(t.flags&2)&&e>=xi(n)?St.push(t):St.splice(_v(e),0,t),t.flags|=1,jp()}}function jp(){sa||(sa=Bp.then(Hp))}function yv(t){le(t)?gs.push(...t):rr&&t.id===-1?rr.splice(ls+1,0,t):t.flags&1||(gs.push(t),t.flags|=1),jp()}function Kh(t,e,n=dn+1){for(;n<St.length;n++){const r=St[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;St.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function $p(t){if(gs.length){const e=[...new Set(gs)].sort((n,r)=>xi(n)-xi(r));if(gs.length=0,rr){rr.push(...e);return}for(rr=e,ls=0;ls<rr.length;ls++){const n=rr[ls];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}rr=null,ls=0}}const xi=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Hp(t){try{for(dn=0;dn<St.length;dn++){const e=St[dn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),eo(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;dn<St.length;dn++){const e=St[dn];e&&(e.flags&=-2)}dn=-1,St.length=0,$p(),sa=null,(St.length||gs.length)&&Hp()}}let yt=null,qp=null;function ia(t){const e=yt;return yt=t,qp=t&&t.type.__scopeId||null,e}function Ut(t,e=yt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&la(-1);const i=ia(e);let o;try{o=t(...s)}finally{ia(i),r._d&&la(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function en(t,e){if(yt===null)return t;const n=Fa(yt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,l,c=Oe]=e[s];i&&(me(i)&&(i={mounted:i,updated:i}),i.deep&&On(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:l,modifiers:c}))}return t}function Vr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const l=s[o];i&&(l.oldValue=i[o].value);let c=l.dir[r];c&&(Fn(),wn(c,n,8,[t.el,l,t,e]),Un())}}function $o(t,e){if(Pt){let n=Pt.provides;const r=Pt.parent&&Pt.parent.provides;r===n&&(n=Pt.provides=Object.create(r)),n[t]=e}}function sn(t,e,n=!1){const r=yE();if(r||ys){let s=ys?ys._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&me(e)?e.call(r&&r.proxy):e}}const vv=Symbol.for("v-scx"),Ev=()=>sn(vv);function _i(t,e,n){return zp(t,e,n)}function zp(t,e,n=Oe){const{immediate:r,deep:s,flush:i,once:o}=n,l=Et({},n),c=e&&r||!e&&i!=="post";let h;if(Fi){if(i==="sync"){const _=Ev();h=_.__watcherHandles||(_.__watcherHandles=[])}else if(!c){const _=()=>{};return _.stop=mn,_.resume=mn,_.pause=mn,_}}const d=Pt;l.call=(_,P,V)=>wn(_,d,P,V);let p=!1;i==="post"?l.scheduler=_=>{bt(_,d&&d.suspense)}:i!=="sync"&&(p=!0,l.scheduler=(_,P)=>{P?_():qc(_)}),l.augmentJob=_=>{e&&(_.flags|=4),p&&(_.flags|=2,d&&(_.id=d.uid,_.i=d))};const m=mv(t,e,l);return Fi&&(h?h.push(m):c&&m()),m}function Tv(t,e,n){const r=this.proxy,s=Ke(t)?t.includes(".")?Gp(r,t):()=>r[t]:t.bind(r,r);let i;me(e)?i=e:(i=e.handler,n=e);const o=to(this),l=zp(s,i.bind(r),n);return o(),l}function Gp(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const Wp=Symbol("_vte"),wv=t=>t.__isTeleport,yi=t=>t&&(t.disabled||t.disabled===""),Qh=t=>t&&(t.defer||t.defer===""),Jh=t=>typeof SVGElement<"u"&&t instanceof SVGElement,Yh=t=>typeof MathMLElement=="function"&&t instanceof MathMLElement,Gl=(t,e)=>{const n=t&&t.to;return Ke(n)?e?e(n):null:n},Kp={name:"Teleport",__isTeleport:!0,process(t,e,n,r,s,i,o,l,c,h){const{mc:d,pc:p,pbc:m,o:{insert:_,querySelector:P,createText:V,createComment:S}}=h,x=yi(e.props);let{shapeFlag:B,children:H,dynamicChildren:z}=e;if(t==null){const he=e.el=V(""),ue=e.anchor=V("");_(he,n,r),_(ue,n,r);const A=(E,b)=>{B&16&&d(H,E,b,s,i,o,l,c)},y=()=>{const E=e.target=Gl(e.props,P),b=Qp(E,e,V,_);E&&(o!=="svg"&&Jh(E)?o="svg":o!=="mathml"&&Yh(E)&&(o="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(E),x||(A(E,b),Ho(e,!1)))};x&&(A(n,ue),Ho(e,!0)),Qh(e.props)?(e.el.__isMounted=!1,bt(()=>{y(),delete e.el.__isMounted},i)):y()}else{if(Qh(e.props)&&t.el.__isMounted===!1){bt(()=>{Kp.process(t,e,n,r,s,i,o,l,c,h)},i);return}e.el=t.el,e.targetStart=t.targetStart;const he=e.anchor=t.anchor,ue=e.target=t.target,A=e.targetAnchor=t.targetAnchor,y=yi(t.props),E=y?n:ue,b=y?he:A;if(o==="svg"||Jh(ue)?o="svg":(o==="mathml"||Yh(ue))&&(o="mathml"),z?(m(t.dynamicChildren,z,E,s,i,o,l),Kc(t,e,!0)):c||p(t,e,E,b,s,i,o,l,!1),x)y?e.props&&t.props&&e.props.to!==t.props.to&&(e.props.to=t.props.to):Do(e,n,he,h,1);else if((e.props&&e.props.to)!==(t.props&&t.props.to)){const R=e.target=Gl(e.props,P);R&&Do(e,R,null,h,0)}else y&&Do(e,ue,A,h,1);Ho(e,x)}},remove(t,e,n,{um:r,o:{remove:s}},i){const{shapeFlag:o,children:l,anchor:c,targetStart:h,targetAnchor:d,target:p,props:m}=t;if(p&&(s(h),s(d)),i&&s(c),o&16){const _=i||!yi(m);for(let P=0;P<l.length;P++){const V=l[P];r(V,e,n,_,!!V.dynamicChildren)}}},move:Do,hydrate:Iv};function Do(t,e,n,{o:{insert:r},m:s},i=2){i===0&&r(t.targetAnchor,e,n);const{el:o,anchor:l,shapeFlag:c,children:h,props:d}=t,p=i===2;if(p&&r(o,e,n),(!p||yi(d))&&c&16)for(let m=0;m<h.length;m++)s(h[m],e,n,2);p&&r(l,e,n)}function Iv(t,e,n,r,s,i,{o:{nextSibling:o,parentNode:l,querySelector:c,insert:h,createText:d}},p){function m(V,S,x,B){S.anchor=p(o(V),S,l(V),n,r,s,i),S.targetStart=x,S.targetAnchor=B}const _=e.target=Gl(e.props,c),P=yi(e.props);if(_){const V=_._lpa||_.firstChild;if(e.shapeFlag&16)if(P)m(t,e,V,V&&o(V));else{e.anchor=o(t);let S=V;for(;S;){if(S&&S.nodeType===8){if(S.data==="teleport start anchor")e.targetStart=S;else if(S.data==="teleport anchor"){e.targetAnchor=S,_._lpa=e.targetAnchor&&o(e.targetAnchor);break}}S=o(S)}e.targetAnchor||Qp(_,e,d,h),p(V&&o(V),e,_,n,r,s,i)}Ho(e,P)}else P&&e.shapeFlag&16&&m(t,e,t,o(t));return e.anchor&&o(e.anchor)}const Av=Kp;function Ho(t,e){const n=t.ctx;if(n&&n.ut){let r,s;for(e?(r=t.el,s=t.anchor):(r=t.targetStart,s=t.targetAnchor);r&&r!==s;)r.nodeType===1&&r.setAttribute("data-v-owner",n.uid),r=r.nextSibling;n.ut()}}function Qp(t,e,n,r){const s=e.targetStart=n(""),i=e.targetAnchor=n("");return s[Wp]=i,t&&(r(s,t),r(i,t)),i}const bv=Symbol("_leaveCb");function zc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,zc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function tt(t,e){return me(t)?Et({name:t.name},e,{setup:t}):t}function Jp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const oa=new WeakMap;function vi(t,e,n,r,s=!1){if(le(t)){t.forEach((P,V)=>vi(P,e&&(le(e)?e[V]:e),n,r,s));return}if(_s(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&vi(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?Fa(r.component):r.el,o=s?null:i,{i:l,r:c}=t,h=e&&e.r,d=l.refs===Oe?l.refs={}:l.refs,p=l.setupState,m=Se(p),_=p===Oe?pp:P=>Pe(m,P);if(h!=null&&h!==c){if(Xh(e),Ke(h))d[h]=null,_(h)&&(p[h]=null);else if(vt(h)){h.value=null;const P=e;P.k&&(d[P.k]=null)}}if(me(c))eo(c,l,12,[o,d]);else{const P=Ke(c),V=vt(c);if(P||V){const S=()=>{if(t.f){const x=P?_(c)?p[c]:d[c]:c.value;if(s)le(x)&&Dc(x,i);else if(le(x))x.includes(i)||x.push(i);else if(P)d[c]=[i],_(c)&&(p[c]=d[c]);else{const B=[i];c.value=B,t.k&&(d[t.k]=B)}}else P?(d[c]=o,_(c)&&(p[c]=o)):V&&(c.value=o,t.k&&(d[t.k]=o))};if(o){const x=()=>{S(),oa.delete(t)};x.id=-1,oa.set(t,x),bt(x,n)}else Xh(t),S()}}}function Xh(t){const e=oa.get(t);e&&(e.flags|=8,oa.delete(t))}Va().requestIdleCallback;Va().cancelIdleCallback;const _s=t=>!!t.type.__asyncLoader,Yp=t=>t.type.__isKeepAlive;function Rv(t,e){Xp(t,"a",e)}function Sv(t,e){Xp(t,"da",e)}function Xp(t,e,n=Pt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(xa(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Yp(s.parent.vnode)&&Pv(r,e,n,s),s=s.parent}}function Pv(t,e,n,r){const s=xa(e,t,r,!0);Zp(()=>{Dc(r[e],s)},n)}function xa(t,e,n=Pt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Fn();const l=to(n),c=wn(e,n,t,o);return l(),Un(),c});return r?s.unshift(i):s.push(i),i}}const Gn=t=>(e,n=Pt)=>{(!Fi||t==="sp")&&xa(t,(...r)=>e(...r),n)},Cv=Gn("bm"),kv=Gn("m"),Ov=Gn("bu"),Vv=Gn("u"),Dv=Gn("bum"),Zp=Gn("um"),Nv=Gn("sp"),xv=Gn("rtg"),Mv=Gn("rtc");function Lv(t,e=Pt){xa("ec",t,e)}const Fv=Symbol.for("v-ndc");function xr(t,e,n,r){let s;const i=n,o=le(t);if(o||Ke(t)){const l=o&&jr(t);let c=!1,h=!1;l&&(c=!Qt(t),h=Bn(t),t=Da(t)),s=new Array(t.length);for(let d=0,p=t.length;d<p;d++)s[d]=e(c?h?Is(ln(t[d])):ln(t[d]):t[d],d,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let l=0;l<t;l++)s[l]=e(l+1,l,void 0,i)}else if(De(t))if(t[Symbol.iterator])s=Array.from(t,(l,c)=>e(l,c,void 0,i));else{const l=Object.keys(t);s=new Array(l.length);for(let c=0,h=l.length;c<h;c++){const d=l[c];s[c]=e(t[d],d,c,i)}}else s=[];return s}function Wl(t,e,n={},r,s){if(yt.ce||yt.parent&&_s(yt.parent)&&yt.parent.ce){const h=Object.keys(n).length>0;return e!=="default"&&(n.name=e),ie(),jt(Ge,null,[Ve("slot",n,r)],h?-2:64)}let i=t[e];i&&i._c&&(i._d=!1),ie();const o=i&&em(i(n)),l=n.key||o&&o.key,c=jt(Ge,{key:(l&&!an(l)?l:`_${e}`)+(!o&&r?"_fb":"")},o||[],o&&t._===1?64:-2);return i&&i._c&&(i._d=!0),c}function em(t){return t.some(e=>Li(e)?!(e.type===jn||e.type===Ge&&!em(e.children)):!0)?t:null}const Kl=t=>t?ym(t)?Fa(t):Kl(t.parent):null,Ei=Et(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Kl(t.parent),$root:t=>Kl(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>nm(t),$forceUpdate:t=>t.f||(t.f=()=>{qc(t.update)}),$nextTick:t=>t.n||(t.n=Hc.bind(t.proxy)),$watch:t=>Tv.bind(t)}),wl=(t,e)=>t!==Oe&&!t.__isScriptSetup&&Pe(t,e),Uv={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:l,appContext:c}=t;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(wl(r,e))return o[e]=1,r[e];if(s!==Oe&&Pe(s,e))return o[e]=2,s[e];if(Pe(i,e))return o[e]=3,i[e];if(n!==Oe&&Pe(n,e))return o[e]=4,n[e];Ql&&(o[e]=0)}}const h=Ei[e];let d,p;if(h)return e==="$attrs"&&gt(t.attrs,"get",""),h(t);if((d=l.__cssModules)&&(d=d[e]))return d;if(n!==Oe&&Pe(n,e))return o[e]=4,n[e];if(p=c.config.globalProperties,Pe(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return wl(s,e)?(s[e]=n,!0):r!==Oe&&Pe(r,e)?(r[e]=n,!0):Pe(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,props:i,type:o}},l){let c;return!!(n[l]||t!==Oe&&l[0]!=="$"&&Pe(t,l)||wl(e,l)||Pe(i,l)||Pe(r,l)||Pe(Ei,l)||Pe(s.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Pe(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Zh(t){return le(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Ql=!0;function Bv(t){const e=nm(t),n=t.proxy,r=t.ctx;Ql=!1,e.beforeCreate&&ed(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:l,provide:c,inject:h,created:d,beforeMount:p,mounted:m,beforeUpdate:_,updated:P,activated:V,deactivated:S,beforeDestroy:x,beforeUnmount:B,destroyed:H,unmounted:z,render:he,renderTracked:ue,renderTriggered:A,errorCaptured:y,serverPrefetch:E,expose:b,inheritAttrs:R,components:k,directives:w,filters:wt}=e;if(h&&jv(h,r,null),o)for(const we in o){const ve=o[we];me(ve)&&(r[we]=ve.bind(n))}if(s){const we=s.call(n,n);De(we)&&(t.data=Ms(we))}if(Ql=!0,i)for(const we in i){const ve=i[we],xt=me(ve)?ve.bind(n,n):me(ve.get)?ve.get.bind(n,n):mn,Xt=!me(ve)&&me(ve.set)?ve.set.bind(n):mn,qt=Nt({get:xt,set:Xt});Object.defineProperty(r,we,{enumerable:!0,configurable:!0,get:()=>qt.value,set:Le=>qt.value=Le})}if(l)for(const we in l)tm(l[we],r,n,we);if(c){const we=me(c)?c.call(n):c;Reflect.ownKeys(we).forEach(ve=>{$o(ve,we[ve])})}d&&ed(d,t,"c");function Qe(we,ve){le(ve)?ve.forEach(xt=>we(xt.bind(n))):ve&&we(ve.bind(n))}if(Qe(Cv,p),Qe(kv,m),Qe(Ov,_),Qe(Vv,P),Qe(Rv,V),Qe(Sv,S),Qe(Lv,y),Qe(Mv,ue),Qe(xv,A),Qe(Dv,B),Qe(Zp,z),Qe(Nv,E),le(b))if(b.length){const we=t.exposed||(t.exposed={});b.forEach(ve=>{Object.defineProperty(we,ve,{get:()=>n[ve],set:xt=>n[ve]=xt,enumerable:!0})})}else t.exposed||(t.exposed={});he&&t.render===mn&&(t.render=he),R!=null&&(t.inheritAttrs=R),k&&(t.components=k),w&&(t.directives=w),E&&Jp(t)}function jv(t,e,n=mn){le(t)&&(t=Jl(t));for(const r in t){const s=t[r];let i;De(s)?"default"in s?i=sn(s.from||r,s.default,!0):i=sn(s.from||r):i=sn(s),vt(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function ed(t,e,n){wn(le(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function tm(t,e,n,r){let s=r.includes(".")?Gp(n,r):()=>n[r];if(Ke(t)){const i=e[t];me(i)&&_i(s,i)}else if(me(t))_i(s,t.bind(n));else if(De(t))if(le(t))t.forEach(i=>tm(i,e,n,r));else{const i=me(t.handler)?t.handler.bind(n):e[t.handler];me(i)&&_i(s,i,t)}}function nm(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,l=i.get(e);let c;return l?c=l:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(h=>aa(c,h,o,!0)),aa(c,e,o)),De(e)&&i.set(e,c),c}function aa(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&aa(t,i,n,!0),s&&s.forEach(o=>aa(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const l=$v[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const $v={data:td,props:nd,emits:nd,methods:ai,computed:ai,beforeCreate:At,created:At,beforeMount:At,mounted:At,beforeUpdate:At,updated:At,beforeDestroy:At,beforeUnmount:At,destroyed:At,unmounted:At,activated:At,deactivated:At,errorCaptured:At,serverPrefetch:At,components:ai,directives:ai,watch:qv,provide:td,inject:Hv};function td(t,e){return e?t?function(){return Et(me(t)?t.call(this,this):t,me(e)?e.call(this,this):e)}:e:t}function Hv(t,e){return ai(Jl(t),Jl(e))}function Jl(t){if(le(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function At(t,e){return t?[...new Set([].concat(t,e))]:e}function ai(t,e){return t?Et(Object.create(null),t,e):e}function nd(t,e){return t?le(t)&&le(e)?[...new Set([...t,...e])]:Et(Object.create(null),Zh(t),Zh(e??{})):e}function qv(t,e){if(!t)return e;if(!e)return t;const n=Et(Object.create(null),t);for(const r in e)n[r]=At(t[r],e[r]);return n}function rm(){return{app:null,config:{isNativeTag:pp,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zv=0;function Gv(t,e){return function(r,s=null){me(r)||(r=Et({},r)),s!=null&&!De(s)&&(s=null);const i=rm(),o=new WeakSet,l=[];let c=!1;const h=i.app={_uid:zv++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:AE,get config(){return i.config},set config(d){},use(d,...p){return o.has(d)||(d&&me(d.install)?(o.add(d),d.install(h,...p)):me(d)&&(o.add(d),d(h,...p))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,p){return p?(i.components[d]=p,h):i.components[d]},directive(d,p){return p?(i.directives[d]=p,h):i.directives[d]},mount(d,p,m){if(!c){const _=h._ceVNode||Ve(r,s);return _.appContext=i,m===!0?m="svg":m===!1&&(m=void 0),t(_,d,m),c=!0,h._container=d,d.__vue_app__=h,Fa(_.component)}},onUnmount(d){l.push(d)},unmount(){c&&(wn(l,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(d,p){return i.provides[d]=p,h},runWithContext(d){const p=ys;ys=h;try{return d()}finally{ys=p}}};return h}}let ys=null;const Wv=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${_r(e)}Modifiers`]||t[`${Yr(e)}Modifiers`];function Kv(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Oe;let s=n;const i=e.startsWith("update:"),o=i&&Wv(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>Ke(d)?d.trim():d)),o.number&&(s=n.map(Oa)));let l,c=r[l=_l(e)]||r[l=_l(_r(e))];!c&&i&&(c=r[l=_l(Yr(e))]),c&&wn(c,t,6,s);const h=r[l+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,wn(h,t,6,s)}}const Qv=new WeakMap;function sm(t,e,n=!1){const r=n?Qv:e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},l=!1;if(!me(t)){const c=h=>{const d=sm(h,e,!0);d&&(l=!0,Et(o,d))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!l?(De(t)&&r.set(t,null),null):(le(i)?i.forEach(c=>o[c]=null):Et(o,i),De(t)&&r.set(t,o),o)}function Ma(t,e){return!t||!Ca(e)?!1:(e=e.slice(2).replace(/Once$/,""),Pe(t,e[0].toLowerCase()+e.slice(1))||Pe(t,Yr(e))||Pe(t,e))}function rd(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:l,emit:c,render:h,renderCache:d,props:p,data:m,setupState:_,ctx:P,inheritAttrs:V}=t,S=ia(t);let x,B;try{if(n.shapeFlag&4){const z=s||r,he=z;x=pn(h.call(he,z,d,p,_,m,P)),B=l}else{const z=e;x=pn(z.length>1?z(p,{attrs:l,slots:o,emit:c}):z(p,null)),B=e.props?l:Jv(l)}}catch(z){Ti.length=0,Na(z,t,1),x=Ve(jn)}let H=x;if(B&&V!==!1){const z=Object.keys(B),{shapeFlag:he}=H;z.length&&he&7&&(i&&z.some(Vc)&&(B=Yv(B,i)),H=As(H,B,!1,!0))}return n.dirs&&(H=As(H,null,!1,!0),H.dirs=H.dirs?H.dirs.concat(n.dirs):n.dirs),n.transition&&zc(H,n.transition),x=H,ia(S),x}const Jv=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ca(n))&&((e||(e={}))[n]=t[n]);return e},Yv=(t,e)=>{const n={};for(const r in t)(!Vc(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Xv(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:l,patchFlag:c}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?sd(r,o,h):!!o;if(c&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const m=d[p];if(o[m]!==r[m]&&!Ma(h,m))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===o?!1:r?o?sd(r,o,h):!0:!!o;return!1}function sd(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!Ma(n,i))return!0}return!1}function Zv({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const im={},om=()=>Object.create(im),am=t=>Object.getPrototypeOf(t)===im;function eE(t,e,n,r=!1){const s={},i=om();t.propsDefaults=Object.create(null),lm(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Lp(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function tE(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,l=Se(s),[c]=t.propsOptions;let h=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let p=0;p<d.length;p++){let m=d[p];if(Ma(t.emitsOptions,m))continue;const _=e[m];if(c)if(Pe(i,m))_!==i[m]&&(i[m]=_,h=!0);else{const P=_r(m);s[P]=Yl(c,l,P,_,t,!1)}else _!==i[m]&&(i[m]=_,h=!0)}}}else{lm(t,e,s,i)&&(h=!0);let d;for(const p in l)(!e||!Pe(e,p)&&((d=Yr(p))===p||!Pe(e,d)))&&(c?n&&(n[p]!==void 0||n[d]!==void 0)&&(s[p]=Yl(c,l,p,void 0,t,!0)):delete s[p]);if(i!==l)for(const p in i)(!e||!Pe(e,p))&&(delete i[p],h=!0)}h&&kn(t.attrs,"set","")}function lm(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,l;if(e)for(let c in e){if(pi(c))continue;const h=e[c];let d;s&&Pe(s,d=_r(c))?!i||!i.includes(d)?n[d]=h:(l||(l={}))[d]=h:Ma(t.emitsOptions,c)||(!(c in r)||h!==r[c])&&(r[c]=h,o=!0)}if(i){const c=Se(n),h=l||Oe;for(let d=0;d<i.length;d++){const p=i[d];n[p]=Yl(s,c,p,h[p],t,!Pe(h,p))}}return o}function Yl(t,e,n,r,s,i){const o=t[n];if(o!=null){const l=Pe(o,"default");if(l&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&me(c)){const{propsDefaults:h}=s;if(n in h)r=h[n];else{const d=to(s);r=h[n]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!l?r=!1:o[1]&&(r===""||r===Yr(n))&&(r=!0))}return r}const nE=new WeakMap;function cm(t,e,n=!1){const r=n?nE:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},l=[];let c=!1;if(!me(t)){const d=p=>{c=!0;const[m,_]=cm(p,e,!0);Et(o,m),_&&l.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!c)return De(t)&&r.set(t,ps),ps;if(le(i))for(let d=0;d<i.length;d++){const p=_r(i[d]);id(p)&&(o[p]=Oe)}else if(i)for(const d in i){const p=_r(d);if(id(p)){const m=i[d],_=o[p]=le(m)||me(m)?{type:m}:Et({},m),P=_.type;let V=!1,S=!0;if(le(P))for(let x=0;x<P.length;++x){const B=P[x],H=me(B)&&B.name;if(H==="Boolean"){V=!0;break}else H==="String"&&(S=!1)}else V=me(P)&&P.name==="Boolean";_[0]=V,_[1]=S,(V||Pe(_,"default"))&&l.push(p)}}const h=[o,l];return De(t)&&r.set(t,h),h}function id(t){return t[0]!=="$"&&!pi(t)}const Gc=t=>t==="_"||t==="_ctx"||t==="$stable",Wc=t=>le(t)?t.map(pn):[pn(t)],rE=(t,e,n)=>{if(e._n)return e;const r=Ut((...s)=>Wc(e(...s)),n);return r._c=!1,r},um=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Gc(s))continue;const i=t[s];if(me(i))e[s]=rE(s,i,r);else if(i!=null){const o=Wc(i);e[s]=()=>o}}},hm=(t,e)=>{const n=Wc(e);t.slots.default=()=>n},dm=(t,e,n)=>{for(const r in e)(n||!Gc(r))&&(t[r]=e[r])},sE=(t,e,n)=>{const r=t.slots=om();if(t.vnode.shapeFlag&32){const s=e._;s?(dm(r,e,n),n&&vp(r,"_",s,!0)):um(e,r)}else e&&hm(t,e)},iE=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Oe;if(r.shapeFlag&32){const l=e._;l?n&&l===1?i=!1:dm(s,e,n):(i=!e.$stable,um(e,s)),o=e}else e&&(hm(t,e),o={default:1});if(i)for(const l in s)!Gc(l)&&o[l]==null&&delete s[l]},bt=uE;function oE(t){return aE(t)}function aE(t,e){const n=Va();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:l,createComment:c,setText:h,setElementText:d,parentNode:p,nextSibling:m,setScopeId:_=mn,insertStaticContent:P}=t,V=(v,I,C,N=null,U=null,L=null,K=void 0,G=null,q=!!I.dynamicChildren)=>{if(v===I)return;v&&!ii(v,I)&&(N=M(v),Le(v,U,L,!0),v=null),I.patchFlag===-2&&(q=!1,I.dynamicChildren=null);const{type:$,ref:ne,shapeFlag:J}=I;switch($){case La:S(v,I,C,N);break;case jn:x(v,I,C,N);break;case qo:v==null&&B(I,C,N,K);break;case Ge:k(v,I,C,N,U,L,K,G,q);break;default:J&1?he(v,I,C,N,U,L,K,G,q):J&6?w(v,I,C,N,U,L,K,G,q):(J&64||J&128)&&$.process(v,I,C,N,U,L,K,G,q,Z)}ne!=null&&U?vi(ne,v&&v.ref,L,I||v,!I):ne==null&&v&&v.ref!=null&&vi(v.ref,null,L,v,!0)},S=(v,I,C,N)=>{if(v==null)r(I.el=l(I.children),C,N);else{const U=I.el=v.el;I.children!==v.children&&h(U,I.children)}},x=(v,I,C,N)=>{v==null?r(I.el=c(I.children||""),C,N):I.el=v.el},B=(v,I,C,N)=>{[v.el,v.anchor]=P(v.children,I,C,N,v.el,v.anchor)},H=({el:v,anchor:I},C,N)=>{let U;for(;v&&v!==I;)U=m(v),r(v,C,N),v=U;r(I,C,N)},z=({el:v,anchor:I})=>{let C;for(;v&&v!==I;)C=m(v),s(v),v=C;s(I)},he=(v,I,C,N,U,L,K,G,q)=>{if(I.type==="svg"?K="svg":I.type==="math"&&(K="mathml"),v==null)ue(I,C,N,U,L,K,G,q);else{const $=v.el&&v.el._isVueCE?v.el:null;try{$&&$._beginPatch(),E(v,I,U,L,K,G,q)}finally{$&&$._endPatch()}}},ue=(v,I,C,N,U,L,K,G)=>{let q,$;const{props:ne,shapeFlag:J,transition:ee,dirs:ce}=v;if(q=v.el=o(v.type,L,ne&&ne.is,ne),J&8?d(q,v.children):J&16&&y(v.children,q,null,N,U,Il(v,L),K,G),ce&&Vr(v,null,N,"created"),A(q,v,v.scopeId,K,N),ne){for(const pe in ne)pe!=="value"&&!pi(pe)&&i(q,pe,null,ne[pe],L,N);"value"in ne&&i(q,"value",null,ne.value,L),($=ne.onVnodeBeforeMount)&&hn($,N,v)}ce&&Vr(v,null,N,"beforeMount");const se=lE(U,ee);se&&ee.beforeEnter(q),r(q,I,C),(($=ne&&ne.onVnodeMounted)||se||ce)&&bt(()=>{$&&hn($,N,v),se&&ee.enter(q),ce&&Vr(v,null,N,"mounted")},U)},A=(v,I,C,N,U)=>{if(C&&_(v,C),N)for(let L=0;L<N.length;L++)_(v,N[L]);if(U){let L=U.subTree;if(I===L||mm(L.type)&&(L.ssContent===I||L.ssFallback===I)){const K=U.vnode;A(v,K,K.scopeId,K.slotScopeIds,U.parent)}}},y=(v,I,C,N,U,L,K,G,q=0)=>{for(let $=q;$<v.length;$++){const ne=v[$]=G?sr(v[$]):pn(v[$]);V(null,ne,I,C,N,U,L,K,G)}},E=(v,I,C,N,U,L,K)=>{const G=I.el=v.el;let{patchFlag:q,dynamicChildren:$,dirs:ne}=I;q|=v.patchFlag&16;const J=v.props||Oe,ee=I.props||Oe;let ce;if(C&&Dr(C,!1),(ce=ee.onVnodeBeforeUpdate)&&hn(ce,C,I,v),ne&&Vr(I,v,C,"beforeUpdate"),C&&Dr(C,!0),(J.innerHTML&&ee.innerHTML==null||J.textContent&&ee.textContent==null)&&d(G,""),$?b(v.dynamicChildren,$,G,C,N,Il(I,U),L):K||ve(v,I,G,null,C,N,Il(I,U),L,!1),q>0){if(q&16)R(G,J,ee,C,U);else if(q&2&&J.class!==ee.class&&i(G,"class",null,ee.class,U),q&4&&i(G,"style",J.style,ee.style,U),q&8){const se=I.dynamicProps;for(let pe=0;pe<se.length;pe++){const Ie=se[pe],st=J[Ie],it=ee[Ie];(it!==st||Ie==="value")&&i(G,Ie,st,it,U,C)}}q&1&&v.children!==I.children&&d(G,I.children)}else!K&&$==null&&R(G,J,ee,C,U);((ce=ee.onVnodeUpdated)||ne)&&bt(()=>{ce&&hn(ce,C,I,v),ne&&Vr(I,v,C,"updated")},N)},b=(v,I,C,N,U,L,K)=>{for(let G=0;G<I.length;G++){const q=v[G],$=I[G],ne=q.el&&(q.type===Ge||!ii(q,$)||q.shapeFlag&198)?p(q.el):C;V(q,$,ne,null,N,U,L,K,!0)}},R=(v,I,C,N,U)=>{if(I!==C){if(I!==Oe)for(const L in I)!pi(L)&&!(L in C)&&i(v,L,I[L],null,U,N);for(const L in C){if(pi(L))continue;const K=C[L],G=I[L];K!==G&&L!=="value"&&i(v,L,G,K,U,N)}"value"in C&&i(v,"value",I.value,C.value,U)}},k=(v,I,C,N,U,L,K,G,q)=>{const $=I.el=v?v.el:l(""),ne=I.anchor=v?v.anchor:l("");let{patchFlag:J,dynamicChildren:ee,slotScopeIds:ce}=I;ce&&(G=G?G.concat(ce):ce),v==null?(r($,C,N),r(ne,C,N),y(I.children||[],C,ne,U,L,K,G,q)):J>0&&J&64&&ee&&v.dynamicChildren&&v.dynamicChildren.length===ee.length?(b(v.dynamicChildren,ee,C,U,L,K,G),(I.key!=null||U&&I===U.subTree)&&Kc(v,I,!0)):ve(v,I,C,ne,U,L,K,G,q)},w=(v,I,C,N,U,L,K,G,q)=>{I.slotScopeIds=G,v==null?I.shapeFlag&512?U.ctx.activate(I,C,N,K,q):wt(I,C,N,U,L,K,q):Ht(v,I,q)},wt=(v,I,C,N,U,L,K)=>{const G=v.component=_E(v,N,U);if(Yp(v)&&(G.ctx.renderer=Z),vE(G,!1,K),G.asyncDep){if(U&&U.registerDep(G,Qe,K),!v.el){const q=G.subTree=Ve(jn);x(null,q,I,C),v.placeholder=q.el}}else Qe(G,v,I,C,U,L,K)},Ht=(v,I,C)=>{const N=I.component=v.component;if(Xv(v,I,C))if(N.asyncDep&&!N.asyncResolved){we(N,I,C);return}else N.next=I,N.update();else I.el=v.el,N.vnode=I},Qe=(v,I,C,N,U,L,K)=>{const G=()=>{if(v.isMounted){let{next:J,bu:ee,u:ce,parent:se,vnode:pe}=v;{const ht=fm(v);if(ht){J&&(J.el=pe.el,we(v,J,K)),ht.asyncDep.then(()=>{v.isUnmounted||G()});return}}let Ie=J,st;Dr(v,!1),J?(J.el=pe.el,we(v,J,K)):J=pe,ee&&jo(ee),(st=J.props&&J.props.onVnodeBeforeUpdate)&&hn(st,se,J,pe),Dr(v,!0);const it=rd(v),zt=v.subTree;v.subTree=it,V(zt,it,p(zt.el),M(zt),v,U,L),J.el=it.el,Ie===null&&Zv(v,it.el),ce&&bt(ce,U),(st=J.props&&J.props.onVnodeUpdated)&&bt(()=>hn(st,se,J,pe),U)}else{let J;const{el:ee,props:ce}=I,{bm:se,m:pe,parent:Ie,root:st,type:it}=v,zt=_s(I);Dr(v,!1),se&&jo(se),!zt&&(J=ce&&ce.onVnodeBeforeMount)&&hn(J,Ie,I),Dr(v,!0);{st.ce&&st.ce._def.shadowRoot!==!1&&st.ce._injectChildStyle(it);const ht=v.subTree=rd(v);V(null,ht,C,N,v,U,L),I.el=ht.el}if(pe&&bt(pe,U),!zt&&(J=ce&&ce.onVnodeMounted)){const ht=I;bt(()=>hn(J,Ie,ht),U)}(I.shapeFlag&256||Ie&&_s(Ie.vnode)&&Ie.vnode.shapeFlag&256)&&v.a&&bt(v.a,U),v.isMounted=!0,I=C=N=null}};v.scope.on();const q=v.effect=new Ip(G);v.scope.off();const $=v.update=q.run.bind(q),ne=v.job=q.runIfDirty.bind(q);ne.i=v,ne.id=v.uid,q.scheduler=()=>qc(ne),Dr(v,!0),$()},we=(v,I,C)=>{I.component=v;const N=v.vnode.props;v.vnode=I,v.next=null,tE(v,I.props,N,C),iE(v,I.children,C),Fn(),Kh(v),Un()},ve=(v,I,C,N,U,L,K,G,q=!1)=>{const $=v&&v.children,ne=v?v.shapeFlag:0,J=I.children,{patchFlag:ee,shapeFlag:ce}=I;if(ee>0){if(ee&128){Xt($,J,C,N,U,L,K,G,q);return}else if(ee&256){xt($,J,C,N,U,L,K,G,q);return}}ce&8?(ne&16&&Ct($,U,L),J!==$&&d(C,J)):ne&16?ce&16?Xt($,J,C,N,U,L,K,G,q):Ct($,U,L,!0):(ne&8&&d(C,""),ce&16&&y(J,C,N,U,L,K,G,q))},xt=(v,I,C,N,U,L,K,G,q)=>{v=v||ps,I=I||ps;const $=v.length,ne=I.length,J=Math.min($,ne);let ee;for(ee=0;ee<J;ee++){const ce=I[ee]=q?sr(I[ee]):pn(I[ee]);V(v[ee],ce,C,null,U,L,K,G,q)}$>ne?Ct(v,U,L,!0,!1,J):y(I,C,N,U,L,K,G,q,J)},Xt=(v,I,C,N,U,L,K,G,q)=>{let $=0;const ne=I.length;let J=v.length-1,ee=ne-1;for(;$<=J&&$<=ee;){const ce=v[$],se=I[$]=q?sr(I[$]):pn(I[$]);if(ii(ce,se))V(ce,se,C,null,U,L,K,G,q);else break;$++}for(;$<=J&&$<=ee;){const ce=v[J],se=I[ee]=q?sr(I[ee]):pn(I[ee]);if(ii(ce,se))V(ce,se,C,null,U,L,K,G,q);else break;J--,ee--}if($>J){if($<=ee){const ce=ee+1,se=ce<ne?I[ce].el:N;for(;$<=ee;)V(null,I[$]=q?sr(I[$]):pn(I[$]),C,se,U,L,K,G,q),$++}}else if($>ee)for(;$<=J;)Le(v[$],U,L,!0),$++;else{const ce=$,se=$,pe=new Map;for($=se;$<=ee;$++){const ot=I[$]=q?sr(I[$]):pn(I[$]);ot.key!=null&&pe.set(ot.key,$)}let Ie,st=0;const it=ee-se+1;let zt=!1,ht=0;const Jn=new Array(it);for($=0;$<it;$++)Jn[$]=0;for($=ce;$<=J;$++){const ot=v[$];if(st>=it){Le(ot,U,L,!0);continue}let Gt;if(ot.key!=null)Gt=pe.get(ot.key);else for(Ie=se;Ie<=ee;Ie++)if(Jn[Ie-se]===0&&ii(ot,I[Ie])){Gt=Ie;break}Gt===void 0?Le(ot,U,L,!0):(Jn[Gt-se]=$+1,Gt>=ht?ht=Gt:zt=!0,V(ot,I[Gt],C,null,U,L,K,G,q),st++)}const zs=zt?cE(Jn):ps;for(Ie=zs.length-1,$=it-1;$>=0;$--){const ot=se+$,Gt=I[ot],po=I[ot+1],ns=ot+1<ne?po.el||pm(po):N;Jn[$]===0?V(null,Gt,C,ns,U,L,K,G,q):zt&&(Ie<0||$!==zs[Ie]?qt(Gt,C,ns,2):Ie--)}}},qt=(v,I,C,N,U=null)=>{const{el:L,type:K,transition:G,children:q,shapeFlag:$}=v;if($&6){qt(v.component.subTree,I,C,N);return}if($&128){v.suspense.move(I,C,N);return}if($&64){K.move(v,I,C,Z);return}if(K===Ge){r(L,I,C);for(let J=0;J<q.length;J++)qt(q[J],I,C,N);r(v.anchor,I,C);return}if(K===qo){H(v,I,C);return}if(N!==2&&$&1&&G)if(N===0)G.beforeEnter(L),r(L,I,C),bt(()=>G.enter(L),U);else{const{leave:J,delayLeave:ee,afterLeave:ce}=G,se=()=>{v.ctx.isUnmounted?s(L):r(L,I,C)},pe=()=>{L._isLeaving&&L[bv](!0),J(L,()=>{se(),ce&&ce()})};ee?ee(L,se,pe):pe()}else r(L,I,C)},Le=(v,I,C,N=!1,U=!1)=>{const{type:L,props:K,ref:G,children:q,dynamicChildren:$,shapeFlag:ne,patchFlag:J,dirs:ee,cacheIndex:ce}=v;if(J===-2&&(U=!1),G!=null&&(Fn(),vi(G,null,C,v,!0),Un()),ce!=null&&(I.renderCache[ce]=void 0),ne&256){I.ctx.deactivate(v);return}const se=ne&1&&ee,pe=!_s(v);let Ie;if(pe&&(Ie=K&&K.onVnodeBeforeUnmount)&&hn(Ie,I,v),ne&6)Mt(v.component,C,N);else{if(ne&128){v.suspense.unmount(C,N);return}se&&Vr(v,null,I,"beforeUnmount"),ne&64?v.type.remove(v,I,C,Z,N):$&&!$.hasOnce&&(L!==Ge||J>0&&J&64)?Ct($,I,C,!1,!0):(L===Ge&&J&384||!U&&ne&16)&&Ct(q,I,C),N&&Fe(v)}(pe&&(Ie=K&&K.onVnodeUnmounted)||se)&&bt(()=>{Ie&&hn(Ie,I,v),se&&Vr(v,null,I,"unmounted")},C)},Fe=v=>{const{type:I,el:C,anchor:N,transition:U}=v;if(I===Ge){Qn(C,N);return}if(I===qo){z(v);return}const L=()=>{s(C),U&&!U.persisted&&U.afterLeave&&U.afterLeave()};if(v.shapeFlag&1&&U&&!U.persisted){const{leave:K,delayLeave:G}=U,q=()=>K(C,L);G?G(v.el,L,q):q()}else L()},Qn=(v,I)=>{let C;for(;v!==I;)C=m(v),s(v),v=C;s(I)},Mt=(v,I,C)=>{const{bum:N,scope:U,job:L,subTree:K,um:G,m:q,a:$}=v;od(q),od($),N&&jo(N),U.stop(),L&&(L.flags|=8,Le(K,v,I,C)),G&&bt(G,I),bt(()=>{v.isUnmounted=!0},I)},Ct=(v,I,C,N=!1,U=!1,L=0)=>{for(let K=L;K<v.length;K++)Le(v[K],I,C,N,U)},M=v=>{if(v.shapeFlag&6)return M(v.component.subTree);if(v.shapeFlag&128)return v.suspense.next();const I=m(v.anchor||v.el),C=I&&I[Wp];return C?m(C):I};let X=!1;const Q=(v,I,C)=>{let N;v==null?I._vnode&&(Le(I._vnode,null,null,!0),N=I._vnode.component):V(I._vnode||null,v,I,null,null,null,C),I._vnode=v,X||(X=!0,Kh(N),$p(),X=!1)},Z={p:V,um:Le,m:qt,r:Fe,mt:wt,mc:y,pc:ve,pbc:b,n:M,o:t};return{render:Q,hydrate:void 0,createApp:Gv(Q)}}function Il({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Dr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function lE(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Kc(t,e,n=!1){const r=t.children,s=e.children;if(le(r)&&le(s))for(let i=0;i<r.length;i++){const o=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=sr(s[i]),l.el=o.el),!n&&l.patchFlag!==-2&&Kc(o,l)),l.type===La&&(l.patchFlag!==-1?l.el=o.el:l.__elIndex=i+(t.type===Ge?1:0)),l.type===jn&&!l.el&&(l.el=o.el)}}function cE(t){const e=t.slice(),n=[0];let r,s,i,o,l;const c=t.length;for(r=0;r<c;r++){const h=t[r];if(h!==0){if(s=n[n.length-1],t[s]<h){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)l=i+o>>1,t[n[l]]<h?i=l+1:o=l;h<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function fm(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:fm(e)}function od(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function pm(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?pm(e.subTree):null}const mm=t=>t.__isSuspense;function uE(t,e){e&&e.pendingBranch?le(t)?e.effects.push(...t):e.effects.push(t):yv(t)}const Ge=Symbol.for("v-fgt"),La=Symbol.for("v-txt"),jn=Symbol.for("v-cmt"),qo=Symbol.for("v-stc"),Ti=[];let Bt=null;function ie(t=!1){Ti.push(Bt=t?null:[])}function hE(){Ti.pop(),Bt=Ti[Ti.length-1]||null}let Mi=1;function la(t,e=!1){Mi+=t,t<0&&Bt&&e&&(Bt.hasOnce=!0)}function gm(t){return t.dynamicChildren=Mi>0?Bt||ps:null,hE(),Mi>0&&Bt&&Bt.push(t),t}function ye(t,e,n,r,s,i){return gm(T(t,e,n,r,s,i,!0))}function jt(t,e,n,r,s){return gm(Ve(t,e,n,r,s,!0))}function Li(t){return t?t.__v_isVNode===!0:!1}function ii(t,e){return t.type===e.type&&t.key===e.key}const _m=({key:t})=>t??null,zo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ke(t)||vt(t)||me(t)?{i:yt,r:t,k:e,f:!!n}:t:null);function T(t,e=null,n=null,r=0,s=null,i=t===Ge?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&_m(e),ref:e&&zo(e),scopeId:qp,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:yt};return l?(Qc(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Ke(n)?8:16),Mi>0&&!o&&Bt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Bt.push(c),c}const Ve=dE;function dE(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Fv)&&(t=jn),Li(t)){const l=As(t,e,!0);return n&&Qc(l,n),Mi>0&&!i&&Bt&&(l.shapeFlag&6?Bt[Bt.indexOf(t)]=l:Bt.push(l)),l.patchFlag=-2,l}if(IE(t)&&(t=t.__vccOpts),e){e=fE(e);let{class:l,style:c}=e;l&&!Ke(l)&&(e.class=gn(l)),De(c)&&($c(c)&&!le(c)&&(c=Et({},c)),e.style=Vi(c))}const o=Ke(t)?1:mm(t)?128:wv(t)?64:De(t)?4:me(t)?2:0;return T(t,e,n,r,s,o,i,!0)}function fE(t){return t?$c(t)||am(t)?Et({},t):t:null}function As(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:l,transition:c}=t,h=e?pE(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&_m(h),ref:e&&e.ref?n&&i?le(i)?i.concat(zo(e)):[i,zo(e)]:zo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ge?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&As(t.ssContent),ssFallback:t.ssFallback&&As(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&zc(d,c.clone(d)),d}function Vt(t=" ",e=0){return Ve(La,null,t,e)}function wi(t,e){const n=Ve(qo,null,t);return n.staticCount=e,n}function Dt(t="",e=!1){return e?(ie(),jt(jn,null,t)):Ve(jn,null,t)}function pn(t){return t==null||typeof t=="boolean"?Ve(jn):le(t)?Ve(Ge,null,t.slice()):Li(t)?sr(t):Ve(La,null,String(t))}function sr(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:As(t)}function Qc(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(le(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Qc(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!am(e)?e._ctx=yt:s===3&&yt&&(yt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else me(e)?(e={default:e,_ctx:yt},n=32):(e=String(e),r&64?(n=16,e=[Vt(e)]):n=8);t.children=e,t.shapeFlag|=n}function pE(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=gn([e.class,r.class]));else if(s==="style")e.style=Vi([e.style,r.style]);else if(Ca(s)){const i=e[s],o=r[s];o&&i!==o&&!(le(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function hn(t,e,n,r=null){wn(t,e,7,[n,r])}const mE=rm();let gE=0;function _E(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||mE,i={uid:gE++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new $y(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:cm(r,s),emitsOptions:sm(r,s),emit:null,emitted:null,propsDefaults:Oe,inheritAttrs:r.inheritAttrs,ctx:Oe,data:Oe,props:Oe,attrs:Oe,slots:Oe,refs:Oe,setupState:Oe,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Kv.bind(null,i),t.ce&&t.ce(i),i}let Pt=null;const yE=()=>Pt||yt;let ca,Xl;{const t=Va(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};ca=e("__VUE_INSTANCE_SETTERS__",n=>Pt=n),Xl=e("__VUE_SSR_SETTERS__",n=>Fi=n)}const to=t=>{const e=Pt;return ca(t),t.scope.on(),()=>{t.scope.off(),ca(e)}},ad=()=>{Pt&&Pt.scope.off(),ca(null)};function ym(t){return t.vnode.shapeFlag&4}let Fi=!1;function vE(t,e=!1,n=!1){e&&Xl(e);const{props:r,children:s}=t.vnode,i=ym(t);eE(t,r,i,e),sE(t,s,n||e);const o=i?EE(t,e):void 0;return e&&Xl(!1),o}function EE(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Uv);const{setup:r}=n;if(r){Fn();const s=t.setupContext=r.length>1?wE(t):null,i=to(t),o=eo(r,t,0,[t.props,s]),l=mp(o);if(Un(),i(),(l||t.sp)&&!_s(t)&&Jp(t),l){if(o.then(ad,ad),e)return o.then(c=>{ld(t,c)}).catch(c=>{Na(c,t,0)});t.asyncDep=o}else ld(t,o)}else vm(t)}function ld(t,e,n){me(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:De(e)&&(t.setupState=Up(e)),vm(t)}function vm(t,e,n){const r=t.type;t.render||(t.render=r.render||mn);{const s=to(t);Fn();try{Bv(t)}finally{Un(),s()}}}const TE={get(t,e){return gt(t,"get",""),t[e]}};function wE(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,TE),slots:t.slots,emit:t.emit,expose:e}}function Fa(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Up(lv(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Ei)return Ei[n](t)},has(e,n){return n in e||n in Ei}})):t.proxy}function IE(t){return me(t)&&"__vccOpts"in t}const Nt=(t,e)=>fv(t,e,Fi);function Em(t,e,n){try{la(-1);const r=arguments.length;return r===2?De(e)&&!le(e)?Li(e)?Ve(t,null,[e]):Ve(t,e):Ve(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Li(n)&&(n=[n]),Ve(t,e,n))}finally{la(1)}}const AE="3.5.26";/**
* @vue/runtime-dom v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Zl;const cd=typeof window<"u"&&window.trustedTypes;if(cd)try{Zl=cd.createPolicy("vue",{createHTML:t=>t})}catch{}const Tm=Zl?t=>Zl.createHTML(t):t=>t,bE="http://www.w3.org/2000/svg",RE="http://www.w3.org/1998/Math/MathML",Cn=typeof document<"u"?document:null,ud=Cn&&Cn.createElement("template"),SE={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?Cn.createElementNS(bE,t):e==="mathml"?Cn.createElementNS(RE,t):n?Cn.createElement(t,{is:n}):Cn.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Cn.createTextNode(t),createComment:t=>Cn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Cn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{ud.innerHTML=Tm(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const l=ud.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},PE=Symbol("_vtc");function CE(t,e,n){const r=t[PE];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const hd=Symbol("_vod"),kE=Symbol("_vsh"),OE=Symbol(""),VE=/(?:^|;)\s*display\s*:/;function DE(t,e,n){const r=t.style,s=Ke(n);let i=!1;if(n&&!s){if(e)if(Ke(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&Go(r,l,"")}else for(const o in e)n[o]==null&&Go(r,o,"");for(const o in n)o==="display"&&(i=!0),Go(r,o,n[o])}else if(s){if(e!==n){const o=r[OE];o&&(n+=";"+o),r.cssText=n,i=VE.test(n)}}else e&&t.removeAttribute("style");hd in t&&(t[hd]=i?r.display:"",t[kE]&&(r.display="none"))}const dd=/\s*!important$/;function Go(t,e,n){if(le(n))n.forEach(r=>Go(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=NE(t,e);dd.test(n)?t.setProperty(Yr(r),n.replace(dd,""),"important"):t[r]=n}}const fd=["Webkit","Moz","ms"],Al={};function NE(t,e){const n=Al[e];if(n)return n;let r=_r(e);if(r!=="filter"&&r in t)return Al[e]=r;r=yp(r);for(let s=0;s<fd.length;s++){const i=fd[s]+r;if(i in t)return Al[e]=i}return e}const pd="http://www.w3.org/1999/xlink";function md(t,e,n,r,s,i=By(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(pd,e.slice(6,e.length)):t.setAttributeNS(pd,e,n):n==null||i&&!Ep(n)?t.removeAttribute(e):t.setAttribute(e,i?"":an(n)?String(n):n)}function gd(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Tm(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=Ep(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function Vn(t,e,n,r){t.addEventListener(e,n,r)}function xE(t,e,n,r){t.removeEventListener(e,n,r)}const _d=Symbol("_vei");function ME(t,e,n,r,s=null){const i=t[_d]||(t[_d]={}),o=i[e];if(r&&o)o.value=r;else{const[l,c]=LE(e);if(r){const h=i[e]=BE(r,s);Vn(t,l,h,c)}else o&&(xE(t,l,o,c),i[e]=void 0)}}const yd=/(?:Once|Passive|Capture)$/;function LE(t){let e;if(yd.test(t)){e={};let r;for(;r=t.match(yd);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Yr(t.slice(2)),e]}let bl=0;const FE=Promise.resolve(),UE=()=>bl||(FE.then(()=>bl=0),bl=Date.now());function BE(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;wn(jE(r,n.value),e,5,[r])};return n.value=t,n.attached=UE(),n}function jE(t,e){if(le(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const vd=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,$E=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?CE(t,r,o):e==="style"?DE(t,n,r):Ca(e)?Vc(e)||ME(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):HE(t,e,r,o))?(gd(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&md(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Ke(r))?gd(t,_r(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),md(t,e,r,o))};function HE(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&vd(e)&&me(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return vd(e)&&Ke(n)?!1:e in t}const yr=t=>{const e=t.props["onUpdate:modelValue"]||!1;return le(e)?n=>jo(e,n):e};function qE(t){t.target.composing=!0}function Ed(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Jt=Symbol("_assign");function Td(t,e,n){return e&&(t=t.trim()),n&&(t=Oa(t)),t}const hr={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[Jt]=yr(s);const i=r||s.props&&s.props.type==="number";Vn(t,e?"change":"input",o=>{o.target.composing||t[Jt](Td(t.value,n,i))}),(n||i)&&Vn(t,"change",()=>{t.value=Td(t.value,n,i)}),e||(Vn(t,"compositionstart",qE),Vn(t,"compositionend",Ed),Vn(t,"change",Ed))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[Jt]=yr(o),t.composing)return;const l=(i||t.type==="number")&&!/^0\d/.test(t.value)?Oa(t.value):t.value,c=e??"";l!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===c)||(t.value=c))}},wm={deep:!0,created(t,e,n){t[Jt]=yr(n),Vn(t,"change",()=>{const r=t._modelValue,s=bs(t),i=t.checked,o=t[Jt];if(le(r)){const l=xc(r,s),c=l!==-1;if(i&&!c)o(r.concat(s));else if(!i&&c){const h=[...r];h.splice(l,1),o(h)}}else if(xs(r)){const l=new Set(r);i?l.add(s):l.delete(s),o(l)}else o(Am(t,i))})},mounted:wd,beforeUpdate(t,e,n){t[Jt]=yr(n),wd(t,e,n)}};function wd(t,{value:e,oldValue:n},r){t._modelValue=e;let s;if(le(e))s=xc(e,r.props.value)>-1;else if(xs(e))s=e.has(r.props.value);else{if(e===n)return;s=Hr(e,Am(t,!0))}t.checked!==s&&(t.checked=s)}const zE={created(t,{value:e},n){t.checked=Hr(e,n.props.value),t[Jt]=yr(n),Vn(t,"change",()=>{t[Jt](bs(t))})},beforeUpdate(t,{value:e,oldValue:n},r){t[Jt]=yr(r),e!==n&&(t.checked=Hr(e,r.props.value))}},Im={deep:!0,created(t,{value:e,modifiers:{number:n}},r){const s=xs(e);Vn(t,"change",()=>{const i=Array.prototype.filter.call(t.options,o=>o.selected).map(o=>n?Oa(bs(o)):bs(o));t[Jt](t.multiple?s?new Set(i):i:i[0]),t._assigning=!0,Hc(()=>{t._assigning=!1})}),t[Jt]=yr(r)},mounted(t,{value:e}){Id(t,e)},beforeUpdate(t,e,n){t[Jt]=yr(n)},updated(t,{value:e}){t._assigning||Id(t,e)}};function Id(t,e){const n=t.multiple,r=le(e);if(!(n&&!r&&!xs(e))){for(let s=0,i=t.options.length;s<i;s++){const o=t.options[s],l=bs(o);if(n)if(r){const c=typeof l;c==="string"||c==="number"?o.selected=e.some(h=>String(h)===String(l)):o.selected=xc(e,l)>-1}else o.selected=e.has(l);else if(Hr(bs(o),e)){t.selectedIndex!==s&&(t.selectedIndex=s);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function bs(t){return"_value"in t?t._value:t.value}function Am(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const ec={created(t,e,n){No(t,e,n,null,"created")},mounted(t,e,n){No(t,e,n,null,"mounted")},beforeUpdate(t,e,n,r){No(t,e,n,r,"beforeUpdate")},updated(t,e,n,r){No(t,e,n,r,"updated")}};function GE(t,e){switch(t){case"SELECT":return Im;case"TEXTAREA":return hr;default:switch(e){case"checkbox":return wm;case"radio":return zE;default:return hr}}}function No(t,e,n,r,s){const o=GE(t.tagName,n.props&&n.props.type)[s];o&&o(t,e,n,r)}const WE=["ctrl","shift","alt","meta"],KE={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>WE.some(n=>t[`${n}Key`]&&!e.includes(n))},Ui=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=((s,...i)=>{for(let o=0;o<e.length;o++){const l=KE[e[o]];if(l&&l(s,e))return}return t(s,...i)}))},QE=Et({patchProp:$E},SE);let Ad;function JE(){return Ad||(Ad=oE(QE))}const YE=((...t)=>{const e=JE().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=ZE(r);if(!s)return;const i=e._component;!me(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,XE(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function XE(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function ZE(t){return Ke(t)?document.querySelector(t):t}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const cs=typeof document<"u";function bm(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function eT(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&bm(t.default)}const Re=Object.assign;function Rl(t,e){const n={};for(const r in e){const s=e[r];n[r]=cn(s)?s.map(t):t(s)}return n}const Ii=()=>{},cn=Array.isArray;function bd(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}const Rm=/#/g,tT=/&/g,nT=/\//g,rT=/=/g,sT=/\?/g,Sm=/\+/g,iT=/%5B/g,oT=/%5D/g,Pm=/%5E/g,aT=/%60/g,Cm=/%7B/g,lT=/%7C/g,km=/%7D/g,cT=/%20/g;function Jc(t){return t==null?"":encodeURI(""+t).replace(lT,"|").replace(iT,"[").replace(oT,"]")}function uT(t){return Jc(t).replace(Cm,"{").replace(km,"}").replace(Pm,"^")}function tc(t){return Jc(t).replace(Sm,"%2B").replace(cT,"+").replace(Rm,"%23").replace(tT,"%26").replace(aT,"`").replace(Cm,"{").replace(km,"}").replace(Pm,"^")}function hT(t){return tc(t).replace(rT,"%3D")}function dT(t){return Jc(t).replace(Rm,"%23").replace(sT,"%3F")}function fT(t){return dT(t).replace(nT,"%2F")}function Bi(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const pT=/\/$/,mT=t=>t.replace(pT,"");function Sl(t,e,n="/"){let r,s={},i="",o="";const l=e.indexOf("#");let c=e.indexOf("?");return c=l>=0&&c>l?-1:c,c>=0&&(r=e.slice(0,c),i=e.slice(c,l>0?l:e.length),s=t(i.slice(1))),l>=0&&(r=r||e.slice(0,l),o=e.slice(l,e.length)),r=vT(r??e,n),{fullPath:r+i+o,path:r,query:s,hash:Bi(o)}}function gT(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Rd(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function _T(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&Rs(e.matched[r],n.matched[s])&&Om(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Rs(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Om(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!yT(t[n],e[n]))return!1;return!0}function yT(t,e){return cn(t)?Sd(t,e):cn(e)?Sd(e,t):(t==null?void 0:t.valueOf())===(e==null?void 0:e.valueOf())}function Sd(t,e){return cn(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function vT(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,l;for(o=0;o<r.length;o++)if(l=r[o],l!==".")if(l==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const er={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let nc=(function(t){return t.pop="pop",t.push="push",t})({}),Pl=(function(t){return t.back="back",t.forward="forward",t.unknown="",t})({});function ET(t){if(!t)if(cs){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),mT(t)}const TT=/^[^#]+#/;function wT(t,e){return t.replace(TT,"#")+e}function IT(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const Ua=()=>({left:window.scrollX,top:window.scrollY});function AT(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=IT(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Pd(t,e){return(history.state?history.state.position-e:-1)+t}const rc=new Map;function bT(t,e){rc.set(t,e)}function RT(t){const e=rc.get(t);return rc.delete(t),e}function ST(t){return typeof t=="string"||t&&typeof t=="object"}function Vm(t){return typeof t=="string"||typeof t=="symbol"}let qe=(function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t})({});const Dm=Symbol("");qe.MATCHER_NOT_FOUND+"",qe.NAVIGATION_GUARD_REDIRECT+"",qe.NAVIGATION_ABORTED+"",qe.NAVIGATION_CANCELLED+"",qe.NAVIGATION_DUPLICATED+"";function Ss(t,e){return Re(new Error,{type:t,[Dm]:!0},e)}function Pn(t,e){return t instanceof Error&&Dm in t&&(e==null||!!(t.type&e))}const PT=["params","query","hash"];function CT(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of PT)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function kT(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(Sm," "),i=s.indexOf("="),o=Bi(i<0?s:s.slice(0,i)),l=i<0?null:Bi(s.slice(i+1));if(o in e){let c=e[o];cn(c)||(c=e[o]=[c]),c.push(l)}else e[o]=l}return e}function Cd(t){let e="";for(let n in t){const r=t[n];if(n=hT(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(cn(r)?r.map(s=>s&&tc(s)):[r&&tc(r)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+n,s!=null&&(e+="="+s))})}return e}function OT(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=cn(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const VT=Symbol(""),kd=Symbol(""),Ba=Symbol(""),Yc=Symbol(""),sc=Symbol("");function oi(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function ir(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((l,c)=>{const h=m=>{m===!1?c(Ss(qe.NAVIGATION_ABORTED,{from:n,to:e})):m instanceof Error?c(m):ST(m)?c(Ss(qe.NAVIGATION_GUARD_REDIRECT,{from:e,to:m})):(o&&r.enterCallbacks[s]===o&&typeof m=="function"&&o.push(m),l())},d=i(()=>t.call(r&&r.instances[s],e,n,h));let p=Promise.resolve(d);t.length<3&&(p=p.then(h)),p.catch(m=>c(m))})}function Cl(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const l in o.components){let c=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(bm(c)){const h=(c.__vccOpts||c)[e];h&&i.push(ir(h,n,r,o,l,s))}else{let h=c();i.push(()=>h.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const p=eT(d)?d.default:d;o.mods[l]=d,o.components[l]=p;const m=(p.__vccOpts||p)[e];return m&&ir(m,n,r,o,l,s)()}))}}return i}function DT(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const l=e.matched[o];l&&(t.matched.find(h=>Rs(h,l))?r.push(l):n.push(l));const c=t.matched[o];c&&(e.matched.find(h=>Rs(h,c))||s.push(c))}return[n,r,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let NT=()=>location.protocol+"//"+location.host;function Nm(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let o=s.includes(t.slice(i))?t.slice(i).length:1,l=s.slice(o);return l[0]!=="/"&&(l="/"+l),Rd(l,"")}return Rd(n,t)+r+s}function xT(t,e,n,r){let s=[],i=[],o=null;const l=({state:m})=>{const _=Nm(t,location),P=n.value,V=e.value;let S=0;if(m){if(n.value=_,e.value=m,o&&o===P){o=null;return}S=V?m.position-V.position:0}else r(_);s.forEach(x=>{x(n.value,P,{delta:S,type:nc.pop,direction:S?S>0?Pl.forward:Pl.back:Pl.unknown})})};function c(){o=n.value}function h(m){s.push(m);const _=()=>{const P=s.indexOf(m);P>-1&&s.splice(P,1)};return i.push(_),_}function d(){if(document.visibilityState==="hidden"){const{history:m}=window;if(!m.state)return;m.replaceState(Re({},m.state,{scroll:Ua()}),"")}}function p(){for(const m of i)m();i=[],window.removeEventListener("popstate",l),window.removeEventListener("pagehide",d),document.removeEventListener("visibilitychange",d)}return window.addEventListener("popstate",l),window.addEventListener("pagehide",d),document.addEventListener("visibilitychange",d),{pauseListeners:c,listen:h,destroy:p}}function Od(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?Ua():null}}function MT(t){const{history:e,location:n}=window,r={value:Nm(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,h,d){const p=t.indexOf("#"),m=p>-1?(n.host&&document.querySelector("base")?t:t.slice(p))+c:NT()+t+c;try{e[d?"replaceState":"pushState"](h,"",m),s.value=h}catch(_){console.error(_),n[d?"replace":"assign"](m)}}function o(c,h){i(c,Re({},e.state,Od(s.value.back,c,s.value.forward,!0),h,{position:s.value.position}),!0),r.value=c}function l(c,h){const d=Re({},s.value,e.state,{forward:c,scroll:Ua()});i(d.current,d,!0),i(c,Re({},Od(r.value,c,null),{position:d.position+1},h),!1),r.value=c}return{location:r,state:s,push:l,replace:o}}function LT(t){t=ET(t);const e=MT(t),n=xT(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Re({location:"",base:t,go:r,createHref:wT.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}let Lr=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t})({});var Xe=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t})(Xe||{});const FT={type:Lr.Static,value:""},UT=/[a-zA-Z0-9_]/;function BT(t){if(!t)return[[]];if(t==="/")return[[FT]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${h}": ${_}`)}let n=Xe.Static,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let l=0,c,h="",d="";function p(){h&&(n===Xe.Static?i.push({type:Lr.Static,value:h}):n===Xe.Param||n===Xe.ParamRegExp||n===Xe.ParamRegExpEnd?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Lr.Param,value:h,regexp:d,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),h="")}function m(){h+=c}for(;l<t.length;){if(c=t[l++],c==="\\"&&n!==Xe.ParamRegExp){r=n,n=Xe.EscapeNext;continue}switch(n){case Xe.Static:c==="/"?(h&&p(),o()):c===":"?(p(),n=Xe.Param):m();break;case Xe.EscapeNext:m(),n=r;break;case Xe.Param:c==="("?n=Xe.ParamRegExp:UT.test(c)?m():(p(),n=Xe.Static,c!=="*"&&c!=="?"&&c!=="+"&&l--);break;case Xe.ParamRegExp:c===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+c:n=Xe.ParamRegExpEnd:d+=c;break;case Xe.ParamRegExpEnd:p(),n=Xe.Static,c!=="*"&&c!=="?"&&c!=="+"&&l--,d="";break;default:e("Unknown state");break}}return n===Xe.ParamRegExp&&e(`Unfinished custom RegExp for param "${h}"`),p(),o(),s}const Vd="[^/]+?",jT={sensitive:!1,strict:!1,start:!0,end:!0};var Rt=(function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t})(Rt||{});const $T=/[.+*?^${}()[\]/\\]/g;function HT(t,e){const n=Re({},jT,e),r=[];let s=n.start?"^":"";const i=[];for(const h of t){const d=h.length?[]:[Rt.Root];n.strict&&!h.length&&(s+="/");for(let p=0;p<h.length;p++){const m=h[p];let _=Rt.Segment+(n.sensitive?Rt.BonusCaseSensitive:0);if(m.type===Lr.Static)p||(s+="/"),s+=m.value.replace($T,"\\$&"),_+=Rt.Static;else if(m.type===Lr.Param){const{value:P,repeatable:V,optional:S,regexp:x}=m;i.push({name:P,repeatable:V,optional:S});const B=x||Vd;if(B!==Vd){_+=Rt.BonusCustomRegExp;try{`${B}`}catch(z){throw new Error(`Invalid custom RegExp for param "${P}" (${B}): `+z.message)}}let H=V?`((?:${B})(?:/(?:${B}))*)`:`(${B})`;p||(H=S&&h.length<2?`(?:/${H})`:"/"+H),S&&(H+="?"),s+=H,_+=Rt.Dynamic,S&&(_+=Rt.BonusOptional),V&&(_+=Rt.BonusRepeatable),B===".*"&&(_+=Rt.BonusWildcard)}d.push(_)}r.push(d)}if(n.strict&&n.end){const h=r.length-1;r[h][r[h].length-1]+=Rt.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function l(h){const d=h.match(o),p={};if(!d)return null;for(let m=1;m<d.length;m++){const _=d[m]||"",P=i[m-1];p[P.name]=_&&P.repeatable?_.split("/"):_}return p}function c(h){let d="",p=!1;for(const m of t){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const _ of m)if(_.type===Lr.Static)d+=_.value;else if(_.type===Lr.Param){const{value:P,repeatable:V,optional:S}=_,x=P in h?h[P]:"";if(cn(x)&&!V)throw new Error(`Provided param "${P}" is an array but it is not repeatable (* or + modifiers)`);const B=cn(x)?x.join("/"):x;if(!B)if(S)m.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${P}"`);d+=B}}return d||"/"}return{re:o,score:r,keys:i,parse:l,stringify:c}}function qT(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===Rt.Static+Rt.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===Rt.Static+Rt.Segment?1:-1:0}function xm(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=qT(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Dd(r))return 1;if(Dd(s))return-1}return s.length-r.length}function Dd(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const zT={strict:!1,end:!0,sensitive:!1};function GT(t,e,n){const r=HT(BT(t.path),n),s=Re(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function WT(t,e){const n=[],r=new Map;e=bd(zT,e);function s(p){return r.get(p)}function i(p,m,_){const P=!_,V=xd(p);V.aliasOf=_&&_.record;const S=bd(e,p),x=[V];if("alias"in p){const z=typeof p.alias=="string"?[p.alias]:p.alias;for(const he of z)x.push(xd(Re({},V,{components:_?_.record.components:V.components,path:he,aliasOf:_?_.record:V})))}let B,H;for(const z of x){const{path:he}=z;if(m&&he[0]!=="/"){const ue=m.record.path,A=ue[ue.length-1]==="/"?"":"/";z.path=m.record.path+(he&&A+he)}if(B=GT(z,m,S),_?_.alias.push(B):(H=H||B,H!==B&&H.alias.push(B),P&&p.name&&!Md(B)&&o(p.name)),Mm(B)&&c(B),V.children){const ue=V.children;for(let A=0;A<ue.length;A++)i(ue[A],B,_&&_.children[A])}_=_||B}return H?()=>{o(H)}:Ii}function o(p){if(Vm(p)){const m=r.get(p);m&&(r.delete(p),n.splice(n.indexOf(m),1),m.children.forEach(o),m.alias.forEach(o))}else{const m=n.indexOf(p);m>-1&&(n.splice(m,1),p.record.name&&r.delete(p.record.name),p.children.forEach(o),p.alias.forEach(o))}}function l(){return n}function c(p){const m=JT(p,n);n.splice(m,0,p),p.record.name&&!Md(p)&&r.set(p.record.name,p)}function h(p,m){let _,P={},V,S;if("name"in p&&p.name){if(_=r.get(p.name),!_)throw Ss(qe.MATCHER_NOT_FOUND,{location:p});S=_.record.name,P=Re(Nd(m.params,_.keys.filter(H=>!H.optional).concat(_.parent?_.parent.keys.filter(H=>H.optional):[]).map(H=>H.name)),p.params&&Nd(p.params,_.keys.map(H=>H.name))),V=_.stringify(P)}else if(p.path!=null)V=p.path,_=n.find(H=>H.re.test(V)),_&&(P=_.parse(V),S=_.record.name);else{if(_=m.name?r.get(m.name):n.find(H=>H.re.test(m.path)),!_)throw Ss(qe.MATCHER_NOT_FOUND,{location:p,currentLocation:m});S=_.record.name,P=Re({},m.params,p.params),V=_.stringify(P)}const x=[];let B=_;for(;B;)x.unshift(B.record),B=B.parent;return{name:S,path:V,params:P,matched:x,meta:QT(x)}}t.forEach(p=>i(p));function d(){n.length=0,r.clear()}return{addRoute:i,resolve:h,removeRoute:o,clearRoutes:d,getRoutes:l,getRecordMatcher:s}}function Nd(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function xd(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:KT(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function KT(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Md(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function QT(t){return t.reduce((e,n)=>Re(e,n.meta),{})}function JT(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;xm(t,e[i])<0?r=i:n=i+1}const s=YT(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function YT(t){let e=t;for(;e=e.parent;)if(Mm(e)&&xm(t,e)===0)return e}function Mm({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Ld(t){const e=sn(Ba),n=sn(Yc),r=Nt(()=>{const c=Be(t.to);return e.resolve(c)}),s=Nt(()=>{const{matched:c}=r.value,{length:h}=c,d=c[h-1],p=n.matched;if(!d||!p.length)return-1;const m=p.findIndex(Rs.bind(null,d));if(m>-1)return m;const _=Fd(c[h-2]);return h>1&&Fd(d)===_&&p[p.length-1].path!==_?p.findIndex(Rs.bind(null,c[h-2])):m}),i=Nt(()=>s.value>-1&&tw(n.params,r.value.params)),o=Nt(()=>s.value>-1&&s.value===n.matched.length-1&&Om(n.params,r.value.params));function l(c={}){if(ew(c)){const h=e[Be(t.replace)?"replace":"push"](Be(t.to)).catch(Ii);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>h),h}return Promise.resolve()}return{route:r,href:Nt(()=>r.value.href),isActive:i,isExactActive:o,navigate:l}}function XT(t){return t.length===1?t[0]:t}const ZT=tt({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Ld,setup(t,{slots:e}){const n=Ms(Ld(t)),{options:r}=sn(Ba),s=Nt(()=>({[Ud(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Ud(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&XT(e.default(n));return t.custom?i:Em("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),qr=ZT;function ew(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function tw(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!cn(s)||s.length!==r.length||r.some((i,o)=>i.valueOf()!==s[o].valueOf()))return!1}return!0}function Fd(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Ud=(t,e,n)=>t??e??n,nw=tt({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=sn(sc),s=Nt(()=>t.route||r.value),i=sn(kd,0),o=Nt(()=>{let h=Be(i);const{matched:d}=s.value;let p;for(;(p=d[h])&&!p.components;)h++;return h}),l=Nt(()=>s.value.matched[o.value]);$o(kd,Nt(()=>o.value+1)),$o(VT,l),$o(sc,s);const c=ze();return _i(()=>[c.value,l.value,t.name],([h,d,p],[m,_,P])=>{d&&(d.instances[p]=h,_&&_!==d&&h&&h===m&&(d.leaveGuards.size||(d.leaveGuards=_.leaveGuards),d.updateGuards.size||(d.updateGuards=_.updateGuards))),h&&d&&(!_||!Rs(d,_)||!m)&&(d.enterCallbacks[p]||[]).forEach(V=>V(h))},{flush:"post"}),()=>{const h=s.value,d=t.name,p=l.value,m=p&&p.components[d];if(!m)return Bd(n.default,{Component:m,route:h});const _=p.props[d],P=_?_===!0?h.params:typeof _=="function"?_(h):_:null,S=Em(m,Re({},P,e,{onVnodeUnmounted:x=>{x.component.isUnmounted&&(p.instances[d]=null)},ref:c}));return Bd(n.default,{Component:S,route:h})||S}}});function Bd(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Xc=nw;function rw(t){const e=WT(t.routes,t),n=t.parseQuery||kT,r=t.stringifyQuery||Cd,s=t.history,i=oi(),o=oi(),l=oi(),c=cv(er);let h=er;cs&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Rl.bind(null,M=>""+M),p=Rl.bind(null,fT),m=Rl.bind(null,Bi);function _(M,X){let Q,Z;return Vm(M)?(Q=e.getRecordMatcher(M),Z=X):Z=M,e.addRoute(Z,Q)}function P(M){const X=e.getRecordMatcher(M);X&&e.removeRoute(X)}function V(){return e.getRoutes().map(M=>M.record)}function S(M){return!!e.getRecordMatcher(M)}function x(M,X){if(X=Re({},X||c.value),typeof M=="string"){const C=Sl(n,M,X.path),N=e.resolve({path:C.path},X),U=s.createHref(C.fullPath);return Re(C,N,{params:m(N.params),hash:Bi(C.hash),redirectedFrom:void 0,href:U})}let Q;if(M.path!=null)Q=Re({},M,{path:Sl(n,M.path,X.path).path});else{const C=Re({},M.params);for(const N in C)C[N]==null&&delete C[N];Q=Re({},M,{params:p(C)}),X.params=p(X.params)}const Z=e.resolve(Q,X),ge=M.hash||"";Z.params=d(m(Z.params));const v=gT(r,Re({},M,{hash:uT(ge),path:Z.path})),I=s.createHref(v);return Re({fullPath:v,hash:ge,query:r===Cd?OT(M.query):M.query||{}},Z,{redirectedFrom:void 0,href:I})}function B(M){return typeof M=="string"?Sl(n,M,c.value.path):Re({},M)}function H(M,X){if(h!==M)return Ss(qe.NAVIGATION_CANCELLED,{from:X,to:M})}function z(M){return A(M)}function he(M){return z(Re(B(M),{replace:!0}))}function ue(M,X){const Q=M.matched[M.matched.length-1];if(Q&&Q.redirect){const{redirect:Z}=Q;let ge=typeof Z=="function"?Z(M,X):Z;return typeof ge=="string"&&(ge=ge.includes("?")||ge.includes("#")?ge=B(ge):{path:ge},ge.params={}),Re({query:M.query,hash:M.hash,params:ge.path!=null?{}:M.params},ge)}}function A(M,X){const Q=h=x(M),Z=c.value,ge=M.state,v=M.force,I=M.replace===!0,C=ue(Q,Z);if(C)return A(Re(B(C),{state:typeof C=="object"?Re({},ge,C.state):ge,force:v,replace:I}),X||Q);const N=Q;N.redirectedFrom=X;let U;return!v&&_T(r,Z,Q)&&(U=Ss(qe.NAVIGATION_DUPLICATED,{to:N,from:Z}),qt(Z,Z,!0,!1)),(U?Promise.resolve(U):b(N,Z)).catch(L=>Pn(L)?Pn(L,qe.NAVIGATION_GUARD_REDIRECT)?L:Xt(L):ve(L,N,Z)).then(L=>{if(L){if(Pn(L,qe.NAVIGATION_GUARD_REDIRECT))return A(Re({replace:I},B(L.to),{state:typeof L.to=="object"?Re({},ge,L.to.state):ge,force:v}),X||N)}else L=k(N,Z,!0,I,ge);return R(N,Z,L),L})}function y(M,X){const Q=H(M,X);return Q?Promise.reject(Q):Promise.resolve()}function E(M){const X=Qn.values().next().value;return X&&typeof X.runWithContext=="function"?X.runWithContext(M):M()}function b(M,X){let Q;const[Z,ge,v]=DT(M,X);Q=Cl(Z.reverse(),"beforeRouteLeave",M,X);for(const C of Z)C.leaveGuards.forEach(N=>{Q.push(ir(N,M,X))});const I=y.bind(null,M,X);return Q.push(I),Ct(Q).then(()=>{Q=[];for(const C of i.list())Q.push(ir(C,M,X));return Q.push(I),Ct(Q)}).then(()=>{Q=Cl(ge,"beforeRouteUpdate",M,X);for(const C of ge)C.updateGuards.forEach(N=>{Q.push(ir(N,M,X))});return Q.push(I),Ct(Q)}).then(()=>{Q=[];for(const C of v)if(C.beforeEnter)if(cn(C.beforeEnter))for(const N of C.beforeEnter)Q.push(ir(N,M,X));else Q.push(ir(C.beforeEnter,M,X));return Q.push(I),Ct(Q)}).then(()=>(M.matched.forEach(C=>C.enterCallbacks={}),Q=Cl(v,"beforeRouteEnter",M,X,E),Q.push(I),Ct(Q))).then(()=>{Q=[];for(const C of o.list())Q.push(ir(C,M,X));return Q.push(I),Ct(Q)}).catch(C=>Pn(C,qe.NAVIGATION_CANCELLED)?C:Promise.reject(C))}function R(M,X,Q){l.list().forEach(Z=>E(()=>Z(M,X,Q)))}function k(M,X,Q,Z,ge){const v=H(M,X);if(v)return v;const I=X===er,C=cs?history.state:{};Q&&(Z||I?s.replace(M.fullPath,Re({scroll:I&&C&&C.scroll},ge)):s.push(M.fullPath,ge)),c.value=M,qt(M,X,Q,I),Xt()}let w;function wt(){w||(w=s.listen((M,X,Q)=>{if(!Mt.listening)return;const Z=x(M),ge=ue(Z,Mt.currentRoute.value);if(ge){A(Re(ge,{replace:!0,force:!0}),Z).catch(Ii);return}h=Z;const v=c.value;cs&&bT(Pd(v.fullPath,Q.delta),Ua()),b(Z,v).catch(I=>Pn(I,qe.NAVIGATION_ABORTED|qe.NAVIGATION_CANCELLED)?I:Pn(I,qe.NAVIGATION_GUARD_REDIRECT)?(A(Re(B(I.to),{force:!0}),Z).then(C=>{Pn(C,qe.NAVIGATION_ABORTED|qe.NAVIGATION_DUPLICATED)&&!Q.delta&&Q.type===nc.pop&&s.go(-1,!1)}).catch(Ii),Promise.reject()):(Q.delta&&s.go(-Q.delta,!1),ve(I,Z,v))).then(I=>{I=I||k(Z,v,!1),I&&(Q.delta&&!Pn(I,qe.NAVIGATION_CANCELLED)?s.go(-Q.delta,!1):Q.type===nc.pop&&Pn(I,qe.NAVIGATION_ABORTED|qe.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),R(Z,v,I)}).catch(Ii)}))}let Ht=oi(),Qe=oi(),we;function ve(M,X,Q){Xt(M);const Z=Qe.list();return Z.length?Z.forEach(ge=>ge(M,X,Q)):console.error(M),Promise.reject(M)}function xt(){return we&&c.value!==er?Promise.resolve():new Promise((M,X)=>{Ht.add([M,X])})}function Xt(M){return we||(we=!M,wt(),Ht.list().forEach(([X,Q])=>M?Q(M):X()),Ht.reset()),M}function qt(M,X,Q,Z){const{scrollBehavior:ge}=t;if(!cs||!ge)return Promise.resolve();const v=!Q&&RT(Pd(M.fullPath,0))||(Z||!Q)&&history.state&&history.state.scroll||null;return Hc().then(()=>ge(M,X,v)).then(I=>I&&AT(I)).catch(I=>ve(I,M,X))}const Le=M=>s.go(M);let Fe;const Qn=new Set,Mt={currentRoute:c,listening:!0,addRoute:_,removeRoute:P,clearRoutes:e.clearRoutes,hasRoute:S,getRoutes:V,resolve:x,options:t,push:z,replace:he,go:Le,back:()=>Le(-1),forward:()=>Le(1),beforeEach:i.add,beforeResolve:o.add,afterEach:l.add,onError:Qe.add,isReady:xt,install(M){M.component("RouterLink",qr),M.component("RouterView",Xc),M.config.globalProperties.$router=Mt,Object.defineProperty(M.config.globalProperties,"$route",{enumerable:!0,get:()=>Be(c)}),cs&&!Fe&&c.value===er&&(Fe=!0,z(s.location).catch(Z=>{}));const X={};for(const Z in er)Object.defineProperty(X,Z,{get:()=>c.value[Z],enumerable:!0});M.provide(Ba,Mt),M.provide(Yc,Lp(X)),M.provide(sc,c);const Q=M.unmount;Qn.add(M),M.unmount=function(){Qn.delete(M),Qn.size<1&&(h=er,w&&w(),w=null,c.value=er,Fe=!1,we=!1),Q()}}};function Ct(M){return M.reduce((X,Q)=>X.then(()=>E(Q)),Promise.resolve())}return Mt}function Zc(){return sn(Ba)}function Lm(t){return sn(Yc)}const sw=tt({__name:"App",setup(t){return(e,n)=>(ie(),jt(Be(Xc)))}}),un=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},iw={},ow={class:"auth-shell"},aw={class:"auth-grid"},lw={class:"auth-left"},cw={class:"auth-right"};function uw(t,e){return ie(),ye("main",ow,[e[0]||(e[0]=T("div",{class:"auth-bg","aria-hidden":"true"},[T("span",{class:"orb orb-one"}),T("span",{class:"orb orb-two"}),T("span",{class:"orb orb-three"})],-1)),T("div",aw,[T("section",lw,[Wl(t.$slots,"left",{},void 0)]),T("section",cw,[Wl(t.$slots,"right",{},void 0)])])])}const eu=un(iw,[["render",uw],["__scopeId","data-v-4388afae"]]),hw={class:"modal-card"},dw={class:"field"},fw=["value"],pw={class:"field"},mw={key:0,class:"error"},gw=tt({__name:"GoogleOrgModal",props:{modelValue:{type:Boolean},email:{}},emits:["update:modelValue","complete"],setup(t,{emit:e}){const n=t,r=e,s=ze(""),i=ze("");_i(()=>n.modelValue,c=>{c&&(s.value="",i.value="")});const o=()=>r("update:modelValue",!1),l=()=>{if(!s.value.trim()){i.value="Organization name is required.";return}r("complete",{organization:s.value.trim(),email:n.email}),o()};return(c,h)=>(ie(),jt(Av,{to:"body"},[t.modelValue?(ie(),ye("div",{key:0,class:"modal-backdrop",onClick:Ui(o,["self"])},[T("div",hw,[T("header",{class:"modal-header"},[h[1]||(h[1]=T("p",{class:"modal-title"},"Complete your workspace",-1)),T("button",{class:"close",type:"button",onClick:o},"Close")]),h[5]||(h[5]=T("p",{class:"modal-copy"}," This looks like your first time signing in with Google. Add your organization name to finish setup. ",-1)),T("form",{class:"modal-form",onSubmit:Ui(l,["prevent"])},[T("div",dw,[h[2]||(h[2]=T("label",{class:"label",for:"googleEmail"},"Google account",-1)),T("input",{id:"googleEmail",class:"input",type:"email",value:t.email||"",placeholder:"you@company.com",disabled:""},null,8,fw)]),T("div",pw,[h[3]||(h[3]=T("label",{class:"label",for:"orgName"},"Organization name",-1)),en(T("input",{id:"orgName","onUpdate:modelValue":h[0]||(h[0]=d=>s.value=d),class:"input",type:"text",placeholder:"Your company or team",required:""},null,512),[[hr,s.value,void 0,{trim:!0}]])]),i.value?(ie(),ye("p",mw,Ue(i.value),1)):Dt("",!0),T("div",{class:"actions"},[T("button",{class:"btn btn-outline",type:"button",onClick:o},"Cancel"),h[4]||(h[4]=T("button",{class:"btn btn-primary",type:"submit"},"Continue",-1))])],32)])])):Dt("",!0)]))}}),Fm=un(gw,[["__scopeId","data-v-60549e69"]]),_w=()=>{};var jd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Um=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},yw=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Bm={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,c=s+2<t.length,h=c?t[s+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let m=(l&15)<<2|h>>6,_=h&63;c||(_=64,o||(m=64)),r.push(n[d],n[p],n[m],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Um(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):yw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new vw;const m=i<<2|l>>4;if(r.push(m),h!==64){const _=l<<4&240|h>>2;if(r.push(_),p!==64){const P=h<<6&192|p;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class vw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ew=function(t){const e=Um(t);return Bm.encodeByteArray(e,!0)},ua=function(t){return Ew(t).replace(/\./g,"")},jm=function(t){try{return Bm.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ww=()=>Tw().__FIREBASE_DEFAULTS__,Iw=()=>{if(typeof process>"u"||typeof jd>"u")return;const t=jd.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Aw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&jm(t[1]);return e&&JSON.parse(e)},ja=()=>{try{return _w()||ww()||Iw()||Aw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},$m=t=>{var e,n;return(n=(e=ja())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},bw=t=>{const e=$m(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Hm=()=>{var t;return(t=ja())===null||t===void 0?void 0:t.config},qm=t=>{var e;return(e=ja())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function zm(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[ua(JSON.stringify(n)),ua(JSON.stringify(o)),""].join(".")}const Ai={};function Pw(){const t={prod:[],emulator:[]};for(const e of Object.keys(Ai))Ai[e]?t.emulator.push(e):t.prod.push(e);return t}function Cw(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let $d=!1;function Gm(t,e){if(typeof window>"u"||typeof document>"u"||!Ls(window.location.host)||Ai[t]===e||Ai[t]||$d)return;Ai[t]=e;function n(m){return`__firebase__banner__${m}`}const r="__firebase__banner",i=Pw().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function l(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function c(m,_){m.setAttribute("width","24"),m.setAttribute("id",_),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{$d=!0,o()},m}function d(m,_){m.setAttribute("id",_),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=Cw(r),_=n("text"),P=document.getElementById(_)||document.createElement("span"),V=n("learnmore"),S=document.getElementById(V)||document.createElement("a"),x=n("preprendIcon"),B=document.getElementById(x)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const H=m.element;l(H),d(S,V);const z=h();c(B,x),H.append(B,P,S,z),document.body.appendChild(H)}i?(P.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function kw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Tt())}function Ow(){var t;const e=(t=ja())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Vw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Dw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Nw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xw(){const t=Tt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Mw(){return!Ow()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Lw(){try{return typeof indexedDB=="object"}catch{return!1}}function Fw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw="FirebaseError";class Wn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Uw,Object.setPrototypeOf(this,Wn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,no.prototype.create)}}class no{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Bw(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Wn(s,l,r)}}function Bw(t,e){return t.replace(jw,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const jw=/\{\$([^}]+)}/g;function $w(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function zr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Hd(i)&&Hd(o)){if(!zr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Hd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function li(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ci(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Hw(t,e){const n=new qw(t,e);return n.subscribe.bind(n)}class qw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");zw(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=kl),s.error===void 0&&(s.error=kl),s.complete===void 0&&(s.complete=kl);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function zw(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function kl(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(t){return t&&t._delegate?t._delegate:t}class Gr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Rw;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Kw(e))try{this.getOrInitializeService({instanceIdentifier:Mr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Mr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Mr){return this.instances.has(e)}getOptions(e=Mr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ww(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Mr){return this.component?this.component.multipleInstances?e:Mr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ww(t){return t===Mr?void 0:t}function Kw(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Gw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Ee||(Ee={}));const Jw={debug:Ee.DEBUG,verbose:Ee.VERBOSE,info:Ee.INFO,warn:Ee.WARN,error:Ee.ERROR,silent:Ee.SILENT},Yw=Ee.INFO,Xw={[Ee.DEBUG]:"log",[Ee.VERBOSE]:"log",[Ee.INFO]:"info",[Ee.WARN]:"warn",[Ee.ERROR]:"error"},Zw=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Xw[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class tu{constructor(e){this.name=e,this._logLevel=Yw,this._logHandler=Zw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Jw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ee.DEBUG,...e),this._logHandler(this,Ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ee.VERBOSE,...e),this._logHandler(this,Ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ee.INFO,...e),this._logHandler(this,Ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ee.WARN,...e),this._logHandler(this,Ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ee.ERROR,...e),this._logHandler(this,Ee.ERROR,...e)}}const eI=(t,e)=>e.some(n=>t instanceof n);let qd,zd;function tI(){return qd||(qd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nI(){return zd||(zd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Wm=new WeakMap,ic=new WeakMap,Km=new WeakMap,Ol=new WeakMap,nu=new WeakMap;function rI(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(dr(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Wm.set(n,t)}).catch(()=>{}),nu.set(e,t),e}function sI(t){if(ic.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ic.set(t,e)}let oc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ic.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Km.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return dr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function iI(t){oc=t(oc)}function oI(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Vl(this),e,...n);return Km.set(r,e.sort?e.sort():[e]),dr(r)}:nI().includes(t)?function(...e){return t.apply(Vl(this),e),dr(Wm.get(this))}:function(...e){return dr(t.apply(Vl(this),e))}}function aI(t){return typeof t=="function"?oI(t):(t instanceof IDBTransaction&&sI(t),eI(t,tI())?new Proxy(t,oc):t)}function dr(t){if(t instanceof IDBRequest)return rI(t);if(Ol.has(t))return Ol.get(t);const e=aI(t);return e!==t&&(Ol.set(t,e),nu.set(e,t)),e}const Vl=t=>nu.get(t);function lI(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=dr(o);return r&&o.addEventListener("upgradeneeded",c=>{r(dr(o.result),c.oldVersion,c.newVersion,dr(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const cI=["get","getKey","getAll","getAllKeys","count"],uI=["put","add","delete","clear"],Dl=new Map;function Gd(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Dl.get(e))return Dl.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=uI.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||cI.includes(n)))return;const i=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),s&&c.done]))[0]};return Dl.set(e,i),i}iI(t=>({...t,get:(e,n,r)=>Gd(e,n)||t.get(e,n,r),has:(e,n)=>!!Gd(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(dI(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function dI(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ac="@firebase/app",Wd="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=new tu("@firebase/app"),fI="@firebase/app-compat",pI="@firebase/analytics-compat",mI="@firebase/analytics",gI="@firebase/app-check-compat",_I="@firebase/app-check",yI="@firebase/auth",vI="@firebase/auth-compat",EI="@firebase/database",TI="@firebase/data-connect",wI="@firebase/database-compat",II="@firebase/functions",AI="@firebase/functions-compat",bI="@firebase/installations",RI="@firebase/installations-compat",SI="@firebase/messaging",PI="@firebase/messaging-compat",CI="@firebase/performance",kI="@firebase/performance-compat",OI="@firebase/remote-config",VI="@firebase/remote-config-compat",DI="@firebase/storage",NI="@firebase/storage-compat",xI="@firebase/firestore",MI="@firebase/ai",LI="@firebase/firestore-compat",FI="firebase",UI="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lc="[DEFAULT]",BI={[ac]:"fire-core",[fI]:"fire-core-compat",[mI]:"fire-analytics",[pI]:"fire-analytics-compat",[_I]:"fire-app-check",[gI]:"fire-app-check-compat",[yI]:"fire-auth",[vI]:"fire-auth-compat",[EI]:"fire-rtdb",[TI]:"fire-data-connect",[wI]:"fire-rtdb-compat",[II]:"fire-fn",[AI]:"fire-fn-compat",[bI]:"fire-iid",[RI]:"fire-iid-compat",[SI]:"fire-fcm",[PI]:"fire-fcm-compat",[CI]:"fire-perf",[kI]:"fire-perf-compat",[OI]:"fire-rc",[VI]:"fire-rc-compat",[DI]:"fire-gcs",[NI]:"fire-gcs-compat",[xI]:"fire-fst",[LI]:"fire-fst-compat",[MI]:"fire-vertex","fire-js":"fire-js",[FI]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha=new Map,jI=new Map,cc=new Map;function Kd(t,e){try{t.container.addComponent(e)}catch(n){$n.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ps(t){const e=t.name;if(cc.has(e))return $n.debug(`There were multiple attempts to register component ${e}.`),!1;cc.set(e,t);for(const n of ha.values())Kd(n,t);for(const n of jI.values())Kd(n,t);return!0}function ru(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ft(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fr=new no("app","Firebase",$I);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Gr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=UI;function Qm(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:lc,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw fr.create("bad-app-name",{appName:String(s)});if(n||(n=Hm()),!n)throw fr.create("no-options");const i=ha.get(s);if(i){if(zr(n,i.options)&&zr(r,i.config))return i;throw fr.create("duplicate-app",{appName:s})}const o=new Qw(s);for(const c of cc.values())o.addComponent(c);const l=new HI(n,r,o);return ha.set(s,l),l}function Jm(t=lc){const e=ha.get(t);if(!e&&t===lc&&Hm())return Qm();if(!e)throw fr.create("no-app",{appName:t});return e}function pr(t,e,n){var r;let s=(r=BI[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),$n.warn(l.join(" "));return}Ps(new Gr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qI="firebase-heartbeat-database",zI=1,ji="firebase-heartbeat-store";let Nl=null;function Ym(){return Nl||(Nl=lI(qI,zI,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ji)}catch(n){console.warn(n)}}}}).catch(t=>{throw fr.create("idb-open",{originalErrorMessage:t.message})})),Nl}async function GI(t){try{const n=(await Ym()).transaction(ji),r=await n.objectStore(ji).get(Xm(t));return await n.done,r}catch(e){if(e instanceof Wn)$n.warn(e.message);else{const n=fr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});$n.warn(n.message)}}}async function Qd(t,e){try{const r=(await Ym()).transaction(ji,"readwrite");await r.objectStore(ji).put(e,Xm(t)),await r.done}catch(n){if(n instanceof Wn)$n.warn(n.message);else{const r=fr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});$n.warn(r.message)}}}function Xm(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI=1024,KI=30;class QI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new YI(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Jd();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>KI){const o=XI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$n.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Jd(),{heartbeatsToSend:r,unsentEntries:s}=JI(this._heartbeatsCache.heartbeats),i=ua(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return $n.warn(n),""}}}function Jd(){return new Date().toISOString().substring(0,10)}function JI(t,e=WI){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Yd(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Yd(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class YI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Lw()?Fw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await GI(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Qd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Qd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Yd(t){return ua(JSON.stringify({version:2,heartbeats:t})).length}function XI(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZI(t){Ps(new Gr("platform-logger",e=>new hI(e),"PRIVATE")),Ps(new Gr("heartbeat",e=>new QI(e),"PRIVATE")),pr(ac,Wd,t),pr(ac,Wd,"esm2017"),pr("fire-js","")}ZI("");function su(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Zm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const eA=Zm,eg=new no("auth","Firebase",Zm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=new tu("@firebase/auth");function tA(t,...e){da.logLevel<=Ee.WARN&&da.warn(`Auth (${Fs}): ${t}`,...e)}function Wo(t,...e){da.logLevel<=Ee.ERROR&&da.error(`Auth (${Fs}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(t,...e){throw ou(t,...e)}function on(t,...e){return ou(t,...e)}function iu(t,e,n){const r=Object.assign(Object.assign({},eA()),{[e]:n});return new no("auth","Firebase",r).create(e,{appName:t.name})}function Mn(t){return iu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function nA(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&Yt(t,"argument-error"),iu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ou(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return eg.create(t,...e)}function oe(t,e,...n){if(!t)throw ou(e,...n)}function Nn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Wo(e),new Error(e)}function Hn(t,e){t||Nn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uc(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function rA(){return Xd()==="http:"||Xd()==="https:"}function Xd(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(rA()||Dw()||"connection"in navigator)?navigator.onLine:!0}function iA(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,n){this.shortDelay=e,this.longDelay=n,Hn(n>e,"Short delay should be less than long delay!"),this.isMobile=kw()||Nw()}get(){return sA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(t,e){Hn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Nn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Nn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Nn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aA=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],lA=new so(3e4,6e4);function Rr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Kn(t,e,n,r,s={}){return ng(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=ro(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:c},i);return Vw()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&Ls(t.emulatorConfig.host)&&(h.credentials="include"),tg.fetch()(await rg(t,t.config.apiHost,n,l),h)})}async function ng(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},oA),e);try{const s=new uA(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw xo(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw xo(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw xo(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw xo(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw iu(t,d,h);Yt(t,d)}}catch(s){if(s instanceof Wn)throw s;Yt(t,"network-request-failed",{message:String(s)})}}async function io(t,e,n,r,s={}){const i=await Kn(t,e,n,r,s);return"mfaPendingCredential"in i&&Yt(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function rg(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?au(t.config,s):`${t.config.apiScheme}://${s}`;return aA.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function cA(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class uA{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(on(this.auth,"network-request-failed")),lA.get())})}}function xo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=on(t,e,r);return s.customData._tokenResponse=n,s}function Zd(t){return t!==void 0&&t.enterprise!==void 0}class hA{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return cA(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function dA(t,e){return Kn(t,"GET","/v2/recaptchaConfig",Rr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fA(t,e){return Kn(t,"POST","/v1/accounts:delete",e)}async function fa(t,e){return Kn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pA(t,e=!1){return $t(t).getIdToken(e)}async function mA(t,e=!1){const n=$t(t),r=await n.getIdToken(e),s=lu(r);oe(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:bi(xl(s.auth_time)),issuedAtTime:bi(xl(s.iat)),expirationTime:bi(xl(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function xl(t){return Number(t)*1e3}function lu(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Wo("JWT malformed, contained fewer than 3 sections"),null;try{const s=jm(n);return s?JSON.parse(s):(Wo("Failed to decode base64 JWT payload"),null)}catch(s){return Wo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ef(t){const e=lu(t);return oe(e,"internal-error"),oe(typeof e.exp<"u","internal-error"),oe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cs(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Wn&&gA(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function gA({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _A{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=bi(this.lastLoginAt),this.creationTime=bi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pa(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Cs(t,fa(n,{idToken:r}));oe(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?sg(i.providerUserInfo):[],l=vA(t.providerData,o),c=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),d=c?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new hc(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function yA(t){const e=$t(t);await pa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function vA(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function sg(t){return t.map(e=>{var{providerId:n}=e,r=su(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EA(t,e){const n=await ng(t,{},async()=>{const r=ro({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await rg(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return t.emulatorConfig&&Ls(t.emulatorConfig.host)&&(c.credentials="include"),tg.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function TA(t,e){return Kn(t,"POST","/v2/accounts:revokeToken",Rr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){oe(e.idToken,"internal-error"),oe(typeof e.idToken<"u","internal-error"),oe(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ef(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){oe(e.length!==0,"internal-error");const n=ef(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(oe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await EA(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new vs;return r&&(oe(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(oe(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(oe(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new vs,this.toJSON())}_performRefresh(){return Nn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(t,e){oe(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class tn{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=su(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new _A(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new hc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Cs(this,this.stsTokenManager.getToken(this.auth,e));return oe(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return mA(this,e)}reload(){return yA(this)}_assign(e){this!==e&&(oe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new tn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){oe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await pa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ft(this.auth.app))return Promise.reject(Mn(this.auth));const e=await this.getIdToken();return await Cs(this,fA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,c,h,d;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,m=(s=n.email)!==null&&s!==void 0?s:void 0,_=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,P=(o=n.photoURL)!==null&&o!==void 0?o:void 0,V=(l=n.tenantId)!==null&&l!==void 0?l:void 0,S=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,x=(h=n.createdAt)!==null&&h!==void 0?h:void 0,B=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:H,emailVerified:z,isAnonymous:he,providerData:ue,stsTokenManager:A}=n;oe(H&&A,e,"internal-error");const y=vs.fromJSON(this.name,A);oe(typeof H=="string",e,"internal-error"),tr(p,e.name),tr(m,e.name),oe(typeof z=="boolean",e,"internal-error"),oe(typeof he=="boolean",e,"internal-error"),tr(_,e.name),tr(P,e.name),tr(V,e.name),tr(S,e.name),tr(x,e.name),tr(B,e.name);const E=new tn({uid:H,auth:e,email:m,emailVerified:z,displayName:p,isAnonymous:he,photoURL:P,phoneNumber:_,tenantId:V,stsTokenManager:y,createdAt:x,lastLoginAt:B});return ue&&Array.isArray(ue)&&(E.providerData=ue.map(b=>Object.assign({},b))),S&&(E._redirectEventId=S),E}static async _fromIdTokenResponse(e,n,r=!1){const s=new vs;s.updateFromServerResponse(n);const i=new tn({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await pa(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];oe(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?sg(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new vs;l.updateFromIdToken(r);const c=new tn({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new hc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf=new Map;function xn(t){Hn(t instanceof Function,"Expected a class definition");let e=tf.get(t);return e?(Hn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,tf.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}ig.type="NONE";const nf=ig;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ko(t,e,n){return`firebase:${t}:${e}:${n}`}class Es{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ko(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ko("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await fa(this.auth,{idToken:e}).catch(()=>{});return n?tn._fromGetAccountInfoResponse(this.auth,n,e):null}return tn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Es(xn(nf),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||xn(nf);const o=Ko(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const d=await h._get(o);if(d){let p;if(typeof d=="string"){const m=await fa(e,{idToken:d}).catch(()=>{});if(!m)break;p=await tn._fromGetAccountInfoResponse(e,m,d)}else p=tn._fromJSON(e,d);h!==i&&(l=p),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Es(i,e,r):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Es(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(cg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(og(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hg(e))return"Blackberry";if(dg(e))return"Webos";if(ag(e))return"Safari";if((e.includes("chrome/")||lg(e))&&!e.includes("edge/"))return"Chrome";if(ug(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function og(t=Tt()){return/firefox\//i.test(t)}function ag(t=Tt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function lg(t=Tt()){return/crios\//i.test(t)}function cg(t=Tt()){return/iemobile/i.test(t)}function ug(t=Tt()){return/android/i.test(t)}function hg(t=Tt()){return/blackberry/i.test(t)}function dg(t=Tt()){return/webos/i.test(t)}function cu(t=Tt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function wA(t=Tt()){var e;return cu(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function IA(){return xw()&&document.documentMode===10}function fg(t=Tt()){return cu(t)||ug(t)||dg(t)||hg(t)||/windows phone/i.test(t)||cg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pg(t,e=[]){let n;switch(t){case"Browser":n=rf(Tt());break;case"Worker":n=`${rf(Tt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Fs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AA{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bA(t,e={}){return Kn(t,"GET","/v2/passwordPolicy",Rr(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA=6;class SA{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:RA,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PA{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new sf(this),this.idTokenSubscription=new sf(this),this.beforeStateQueue=new AA(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=eg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=xn(n)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Es.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await fa(this,{idToken:e}),r=await tn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Ft(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return oe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await pa(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=iA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ft(this.app))return Promise.reject(Mn(this));const n=e?$t(e):null;return n&&oe(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&oe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ft(this.app)?Promise.reject(Mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ft(this.app)?Promise.reject(Mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(xn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await bA(this),n=new SA(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new no("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await TA(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&xn(e)||this._popupRedirectResolver;oe(n,this,"argument-error"),this.redirectPersistenceManager=await Es.create(this,[xn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(oe(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return oe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;if(Ft(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&tA(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Sr(t){return $t(t)}class sf{constructor(e){this.auth=e,this.observer=null,this.addObserver=Hw(n=>this.observer=n)}get next(){return oe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $a={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function CA(t){$a=t}function mg(t){return $a.loadJS(t)}function kA(){return $a.recaptchaEnterpriseScript}function OA(){return $a.gapiScript}function VA(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class DA{constructor(){this.enterprise=new NA}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class NA{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const xA="recaptcha-enterprise",gg="NO_RECAPTCHA";class MA{constructor(e){this.type=xA,this.auth=Sr(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{dA(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new hA(c);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(c=>{l(c)})})}function s(i,o,l){const c=window.grecaptcha;Zd(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(gg)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new DA().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&Zd(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=kA();c.length!==0&&(c+=l),mg(c).then(()=>{s(l,i,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function of(t,e,n,r=!1,s=!1){const i=new MA(t);let o;if(s)o=gg;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const l=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,h=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function dc(t,e,n,r,s){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await of(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await of(t,e,n,n==="getOobCode");return r(t,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LA(t,e){const n=ru(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(zr(i,e??{}))return s;Yt(s,"already-initialized")}return n.initialize({options:e})}function FA(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(xn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function UA(t,e,n){const r=Sr(t);oe(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=_g(e),{host:o,port:l}=BA(e),c=l===null?"":`:${l}`,h={url:`${i}//${o}${c}/`},d=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){oe(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),oe(zr(h,r.config.emulator)&&zr(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Ls(o)?(zm(`${i}//${o}${c}`),Gm("Auth",!0)):jA()}function _g(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function BA(t){const e=_g(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:af(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:af(o)}}}function af(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function jA(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Nn("not implemented")}_getIdTokenResponse(e){return Nn("not implemented")}_linkToIdToken(e,n){return Nn("not implemented")}_getReauthenticationResolver(e){return Nn("not implemented")}}async function $A(t,e){return Kn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HA(t,e){return io(t,"POST","/v1/accounts:signInWithPassword",Rr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qA(t,e){return io(t,"POST","/v1/accounts:signInWithEmailLink",Rr(t,e))}async function zA(t,e){return io(t,"POST","/v1/accounts:signInWithEmailLink",Rr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i extends uu{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new $i(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new $i(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return dc(e,n,"signInWithPassword",HA);case"emailLink":return qA(e,{email:this._email,oobCode:this._password});default:Yt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return dc(e,r,"signUpPassword",$A);case"emailLink":return zA(e,{idToken:n,email:this._email,oobCode:this._password});default:Yt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ts(t,e){return io(t,"POST","/v1/accounts:signInWithIdp",Rr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GA="http://localhost";class Wr extends uu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Wr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Yt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=su(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Wr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ts(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ts(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ts(e,n)}buildRequest(){const e={requestUri:GA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ro(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WA(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function KA(t){const e=li(ci(t)).link,n=e?li(ci(e)).deep_link_id:null,r=li(ci(t)).deep_link_id;return(r?li(ci(r)).link:null)||r||n||e||t}class hu{constructor(e){var n,r,s,i,o,l;const c=li(ci(e)),h=(n=c.apiKey)!==null&&n!==void 0?n:null,d=(r=c.oobCode)!==null&&r!==void 0?r:null,p=WA((s=c.mode)!==null&&s!==void 0?s:null);oe(h&&d&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=d,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.lang)!==null&&o!==void 0?o:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=KA(e);try{return new hu(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(){this.providerId=Us.PROVIDER_ID}static credential(e,n){return $i._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=hu.parseLink(n);return oe(r,"argument-error"),$i._fromEmailAndCode(e,r.code,r.tenantId)}}Us.PROVIDER_ID="password";Us.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Us.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo extends du{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends oo{constructor(){super("facebook.com")}static credential(e){return Wr._fromParams({providerId:or.PROVIDER_ID,signInMethod:or.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return or.credentialFromTaggedObject(e)}static credentialFromError(e){return or.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return or.credential(e.oauthAccessToken)}catch{return null}}}or.FACEBOOK_SIGN_IN_METHOD="facebook.com";or.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn extends oo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Wr._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Dn.credentialFromTaggedObject(e)}static credentialFromError(e){return Dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Dn.credential(n,r)}catch{return null}}}Dn.GOOGLE_SIGN_IN_METHOD="google.com";Dn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar extends oo{constructor(){super("github.com")}static credential(e){return Wr._fromParams({providerId:ar.PROVIDER_ID,signInMethod:ar.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ar.credentialFromTaggedObject(e)}static credentialFromError(e){return ar.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ar.credential(e.oauthAccessToken)}catch{return null}}}ar.GITHUB_SIGN_IN_METHOD="github.com";ar.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends oo{constructor(){super("twitter.com")}static credential(e,n){return Wr._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return lr.credential(n,r)}catch{return null}}}lr.TWITTER_SIGN_IN_METHOD="twitter.com";lr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QA(t,e){return io(t,"POST","/v1/accounts:signUp",Rr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await tn._fromIdTokenResponse(e,r,s),o=lf(r);return new Kr({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=lf(r);return new Kr({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function lf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma extends Wn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ma.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new ma(e,n,r,s)}}function yg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ma._fromErrorAndOperation(t,i,e,r):i})}async function JA(t,e,n=!1){const r=await Cs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Kr._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YA(t,e,n=!1){const{auth:r}=t;if(Ft(r.app))return Promise.reject(Mn(r));const s="reauthenticate";try{const i=await Cs(t,yg(r,s,e,t),n);oe(i.idToken,r,"internal-error");const o=lu(i.idToken);oe(o,r,"internal-error");const{sub:l}=o;return oe(t.uid===l,r,"user-mismatch"),Kr._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Yt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vg(t,e,n=!1){if(Ft(t.app))return Promise.reject(Mn(t));const r="signIn",s=await yg(t,r,e),i=await Kr._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function XA(t,e){return vg(Sr(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eg(t){const e=Sr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function ZA(t,e,n){if(Ft(t.app))return Promise.reject(Mn(t));const r=Sr(t),o=await dc(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",QA).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Eg(t),c}),l=await Kr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function e0(t,e,n){return Ft(t.app)?Promise.reject(Mn(t)):XA($t(t),Us.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Eg(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t0(t,e){return Kn(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function n0(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=$t(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Cs(r,t0(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:c})=>c==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function r0(t,e,n,r){return $t(t).onIdTokenChanged(e,n,r)}function s0(t,e,n){return $t(t).beforeAuthStateChanged(e,n)}const ga="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ga,"1"),this.storage.removeItem(ga),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i0=1e3,o0=10;class wg extends Tg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);IA()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,o0):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},i0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}wg.type="LOCAL";const a0=wg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig extends Tg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ig.type="SESSION";const Ag=Ig;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l0(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Ha(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async h=>h(n.origin,i)),c=await l0(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ha.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fu(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const h=fu("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(m.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(){return window}function u0(t){_n().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bg(){return typeof _n().WorkerGlobalScope<"u"&&typeof _n().importScripts=="function"}async function h0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function d0(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function f0(){return bg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg="firebaseLocalStorageDb",p0=1,_a="firebaseLocalStorage",Sg="fbase_key";class ao{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function qa(t,e){return t.transaction([_a],e?"readwrite":"readonly").objectStore(_a)}function m0(){const t=indexedDB.deleteDatabase(Rg);return new ao(t).toPromise()}function fc(){const t=indexedDB.open(Rg,p0);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(_a,{keyPath:Sg})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(_a)?e(r):(r.close(),await m0(),e(await fc()))})})}async function cf(t,e,n){const r=qa(t,!0).put({[Sg]:e,value:n});return new ao(r).toPromise()}async function g0(t,e){const n=qa(t,!1).get(e),r=await new ao(n).toPromise();return r===void 0?null:r.value}function uf(t,e){const n=qa(t,!0).delete(e);return new ao(n).toPromise()}const _0=800,y0=3;class Pg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await fc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>y0)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return bg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ha._getInstance(f0()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await h0(),!this.activeServiceWorker)return;this.sender=new c0(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||d0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await fc();return await cf(e,ga,"1"),await uf(e,ga),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>cf(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>g0(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>uf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=qa(s,!1).getAll();return new ao(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Pg.type="LOCAL";const v0=Pg;new so(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cg(t,e){return e?xn(e):(oe(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu extends uu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ts(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ts(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ts(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function E0(t){return vg(t.auth,new pu(t),t.bypassAuthState)}function T0(t){const{auth:e,user:n}=t;return oe(n,e,"internal-error"),YA(n,new pu(t),t.bypassAuthState)}async function w0(t){const{auth:e,user:n}=t;return oe(n,e,"internal-error"),JA(n,new pu(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return E0;case"linkViaPopup":case"linkViaRedirect":return w0;case"reauthViaPopup":case"reauthViaRedirect":return T0;default:Yt(this.auth,"internal-error")}}resolve(e){Hn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Hn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I0=new so(2e3,1e4);async function A0(t,e,n){if(Ft(t.app))return Promise.reject(on(t,"operation-not-supported-in-this-environment"));const r=Sr(t);nA(t,e,du);const s=Cg(r,n);return new Fr(r,"signInViaPopup",e,s).executeNotNull()}class Fr extends kg{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Fr.currentPopupAction&&Fr.currentPopupAction.cancel(),Fr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return oe(e,this.auth,"internal-error"),e}async onExecution(){Hn(this.filter.length===1,"Popup operations only handle one event");const e=fu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(on(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(on(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Fr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(on(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,I0.get())};e()}}Fr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b0="pendingRedirect",Qo=new Map;class R0 extends kg{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Qo.get(this.auth._key());if(!e){try{const r=await S0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Qo.set(this.auth._key(),e)}return this.bypassAuthState||Qo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function S0(t,e){const n=k0(e),r=C0(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function P0(t,e){Qo.set(t._key(),e)}function C0(t){return xn(t._redirectPersistence)}function k0(t){return Ko(b0,t.config.apiKey,t.name)}async function O0(t,e,n=!1){if(Ft(t.app))return Promise.reject(Mn(t));const r=Sr(t),s=Cg(r,e),o=await new R0(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V0=600*1e3;class D0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!N0(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Og(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(on(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=V0&&this.cachedEventUids.clear(),this.cachedEventUids.has(hf(e))}saveEventToCache(e){this.cachedEventUids.add(hf(e)),this.lastProcessedEventTime=Date.now()}}function hf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Og({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function N0(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Og(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function x0(t,e={}){return Kn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,L0=/^https?/;async function F0(t){if(t.config.emulator)return;const{authorizedDomains:e}=await x0(t);for(const n of e)try{if(U0(n))return}catch{}Yt(t,"unauthorized-domain")}function U0(t){const e=uc(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!L0.test(n))return!1;if(M0.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B0=new so(3e4,6e4);function df(){const t=_n().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function j0(t){return new Promise((e,n)=>{var r,s,i;function o(){df(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{df(),n(on(t,"network-request-failed"))},timeout:B0.get()})}if(!((s=(r=_n().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=_n().gapi)===null||i===void 0)&&i.load)o();else{const l=VA("iframefcb");return _n()[l]=()=>{gapi.load?o():n(on(t,"network-request-failed"))},mg(`${OA()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw Jo=null,e})}let Jo=null;function $0(t){return Jo=Jo||j0(t),Jo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H0=new so(5e3,15e3),q0="__/auth/iframe",z0="emulator/auth/iframe",G0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},W0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function K0(t){const e=t.config;oe(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?au(e,z0):`https://${t.config.authDomain}/${q0}`,r={apiKey:e.apiKey,appName:t.name,v:Fs},s=W0.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ro(r).slice(1)}`}async function Q0(t){const e=await $0(t),n=_n().gapi;return oe(n,t,"internal-error"),e.open({where:document.body,url:K0(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:G0,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=on(t,"network-request-failed"),l=_n().setTimeout(()=>{i(o)},H0.get());function c(){_n().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Y0=500,X0=600,Z0="_blank",eb="http://localhost";class ff{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function tb(t,e,n,r=Y0,s=X0){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},J0),{width:r.toString(),height:s.toString(),top:i,left:o}),h=Tt().toLowerCase();n&&(l=lg(h)?Z0:n),og(h)&&(e=e||eb,c.scrollbars="yes");const d=Object.entries(c).reduce((m,[_,P])=>`${m}${_}=${P},`,"");if(wA(h)&&l!=="_self")return nb(e||"",l),new ff(null);const p=window.open(e||"",l,d);oe(p,t,"popup-blocked");try{p.focus()}catch{}return new ff(p)}function nb(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rb="__/auth/handler",sb="emulator/auth/handler",ib=encodeURIComponent("fac");async function pf(t,e,n,r,s,i){oe(t.config.authDomain,t,"auth-domain-config-required"),oe(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Fs,eventId:s};if(e instanceof du){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",$w(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof oo){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await t._getAppCheckToken(),h=c?`#${ib}=${encodeURIComponent(c)}`:"";return`${ob(t)}?${ro(l).slice(1)}${h}`}function ob({config:t}){return t.emulator?au(t,sb):`https://${t.authDomain}/${rb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml="webStorageSupport";class ab{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ag,this._completeRedirectFn=O0,this._overrideRedirectResult=P0}async _openPopup(e,n,r,s){var i;Hn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await pf(e,n,r,uc(),s);return tb(e,o,fu())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await pf(e,n,r,uc(),s);return u0(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Hn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Q0(e),r=new D0(e);return n.register("authEvent",s=>(oe(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ml,{type:Ml},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Ml];o!==void 0&&n(!!o),Yt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=F0(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return fg()||ag()||cu()}}const lb=ab;var mf="@firebase/auth",gf="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){oe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ub(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function hb(t){Ps(new Gr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;oe(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pg(t)},h=new PA(r,s,i,c);return FA(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ps(new Gr("auth-internal",e=>{const n=Sr(e.getProvider("auth").getImmediate());return(r=>new cb(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),pr(mf,gf,ub(t)),pr(mf,gf,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const db=300,fb=qm("authIdTokenMaxAge")||db;let _f=null;const pb=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>fb)return;const s=n==null?void 0:n.token;_f!==s&&(_f=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function mb(t=Jm()){const e=ru(t,"auth");if(e.isInitialized())return e.getImmediate();const n=LA(t,{popupRedirectResolver:lb,persistence:[v0,a0,Ag]}),r=qm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=pb(i.toString());s0(n,o,()=>o(n.currentUser)),r0(n,l=>o(l))}}const s=$m("auth");return s&&UA(n,`http://${s}`),n}function gb(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}CA({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=on("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",gb().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});hb("Browser");var yf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var mr,Vg;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,y){function E(){}E.prototype=y.prototype,A.D=y.prototype,A.prototype=new E,A.prototype.constructor=A,A.C=function(b,R,k){for(var w=Array(arguments.length-2),wt=2;wt<arguments.length;wt++)w[wt-2]=arguments[wt];return y.prototype[R].apply(b,w)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,y,E){E||(E=0);var b=Array(16);if(typeof y=="string")for(var R=0;16>R;++R)b[R]=y.charCodeAt(E++)|y.charCodeAt(E++)<<8|y.charCodeAt(E++)<<16|y.charCodeAt(E++)<<24;else for(R=0;16>R;++R)b[R]=y[E++]|y[E++]<<8|y[E++]<<16|y[E++]<<24;y=A.g[0],E=A.g[1],R=A.g[2];var k=A.g[3],w=y+(k^E&(R^k))+b[0]+3614090360&4294967295;y=E+(w<<7&4294967295|w>>>25),w=k+(R^y&(E^R))+b[1]+3905402710&4294967295,k=y+(w<<12&4294967295|w>>>20),w=R+(E^k&(y^E))+b[2]+606105819&4294967295,R=k+(w<<17&4294967295|w>>>15),w=E+(y^R&(k^y))+b[3]+3250441966&4294967295,E=R+(w<<22&4294967295|w>>>10),w=y+(k^E&(R^k))+b[4]+4118548399&4294967295,y=E+(w<<7&4294967295|w>>>25),w=k+(R^y&(E^R))+b[5]+1200080426&4294967295,k=y+(w<<12&4294967295|w>>>20),w=R+(E^k&(y^E))+b[6]+2821735955&4294967295,R=k+(w<<17&4294967295|w>>>15),w=E+(y^R&(k^y))+b[7]+4249261313&4294967295,E=R+(w<<22&4294967295|w>>>10),w=y+(k^E&(R^k))+b[8]+1770035416&4294967295,y=E+(w<<7&4294967295|w>>>25),w=k+(R^y&(E^R))+b[9]+2336552879&4294967295,k=y+(w<<12&4294967295|w>>>20),w=R+(E^k&(y^E))+b[10]+4294925233&4294967295,R=k+(w<<17&4294967295|w>>>15),w=E+(y^R&(k^y))+b[11]+2304563134&4294967295,E=R+(w<<22&4294967295|w>>>10),w=y+(k^E&(R^k))+b[12]+1804603682&4294967295,y=E+(w<<7&4294967295|w>>>25),w=k+(R^y&(E^R))+b[13]+4254626195&4294967295,k=y+(w<<12&4294967295|w>>>20),w=R+(E^k&(y^E))+b[14]+2792965006&4294967295,R=k+(w<<17&4294967295|w>>>15),w=E+(y^R&(k^y))+b[15]+1236535329&4294967295,E=R+(w<<22&4294967295|w>>>10),w=y+(R^k&(E^R))+b[1]+4129170786&4294967295,y=E+(w<<5&4294967295|w>>>27),w=k+(E^R&(y^E))+b[6]+3225465664&4294967295,k=y+(w<<9&4294967295|w>>>23),w=R+(y^E&(k^y))+b[11]+643717713&4294967295,R=k+(w<<14&4294967295|w>>>18),w=E+(k^y&(R^k))+b[0]+3921069994&4294967295,E=R+(w<<20&4294967295|w>>>12),w=y+(R^k&(E^R))+b[5]+3593408605&4294967295,y=E+(w<<5&4294967295|w>>>27),w=k+(E^R&(y^E))+b[10]+38016083&4294967295,k=y+(w<<9&4294967295|w>>>23),w=R+(y^E&(k^y))+b[15]+3634488961&4294967295,R=k+(w<<14&4294967295|w>>>18),w=E+(k^y&(R^k))+b[4]+3889429448&4294967295,E=R+(w<<20&4294967295|w>>>12),w=y+(R^k&(E^R))+b[9]+568446438&4294967295,y=E+(w<<5&4294967295|w>>>27),w=k+(E^R&(y^E))+b[14]+3275163606&4294967295,k=y+(w<<9&4294967295|w>>>23),w=R+(y^E&(k^y))+b[3]+4107603335&4294967295,R=k+(w<<14&4294967295|w>>>18),w=E+(k^y&(R^k))+b[8]+1163531501&4294967295,E=R+(w<<20&4294967295|w>>>12),w=y+(R^k&(E^R))+b[13]+2850285829&4294967295,y=E+(w<<5&4294967295|w>>>27),w=k+(E^R&(y^E))+b[2]+4243563512&4294967295,k=y+(w<<9&4294967295|w>>>23),w=R+(y^E&(k^y))+b[7]+1735328473&4294967295,R=k+(w<<14&4294967295|w>>>18),w=E+(k^y&(R^k))+b[12]+2368359562&4294967295,E=R+(w<<20&4294967295|w>>>12),w=y+(E^R^k)+b[5]+4294588738&4294967295,y=E+(w<<4&4294967295|w>>>28),w=k+(y^E^R)+b[8]+2272392833&4294967295,k=y+(w<<11&4294967295|w>>>21),w=R+(k^y^E)+b[11]+1839030562&4294967295,R=k+(w<<16&4294967295|w>>>16),w=E+(R^k^y)+b[14]+4259657740&4294967295,E=R+(w<<23&4294967295|w>>>9),w=y+(E^R^k)+b[1]+2763975236&4294967295,y=E+(w<<4&4294967295|w>>>28),w=k+(y^E^R)+b[4]+1272893353&4294967295,k=y+(w<<11&4294967295|w>>>21),w=R+(k^y^E)+b[7]+4139469664&4294967295,R=k+(w<<16&4294967295|w>>>16),w=E+(R^k^y)+b[10]+3200236656&4294967295,E=R+(w<<23&4294967295|w>>>9),w=y+(E^R^k)+b[13]+681279174&4294967295,y=E+(w<<4&4294967295|w>>>28),w=k+(y^E^R)+b[0]+3936430074&4294967295,k=y+(w<<11&4294967295|w>>>21),w=R+(k^y^E)+b[3]+3572445317&4294967295,R=k+(w<<16&4294967295|w>>>16),w=E+(R^k^y)+b[6]+76029189&4294967295,E=R+(w<<23&4294967295|w>>>9),w=y+(E^R^k)+b[9]+3654602809&4294967295,y=E+(w<<4&4294967295|w>>>28),w=k+(y^E^R)+b[12]+3873151461&4294967295,k=y+(w<<11&4294967295|w>>>21),w=R+(k^y^E)+b[15]+530742520&4294967295,R=k+(w<<16&4294967295|w>>>16),w=E+(R^k^y)+b[2]+3299628645&4294967295,E=R+(w<<23&4294967295|w>>>9),w=y+(R^(E|~k))+b[0]+4096336452&4294967295,y=E+(w<<6&4294967295|w>>>26),w=k+(E^(y|~R))+b[7]+1126891415&4294967295,k=y+(w<<10&4294967295|w>>>22),w=R+(y^(k|~E))+b[14]+2878612391&4294967295,R=k+(w<<15&4294967295|w>>>17),w=E+(k^(R|~y))+b[5]+4237533241&4294967295,E=R+(w<<21&4294967295|w>>>11),w=y+(R^(E|~k))+b[12]+1700485571&4294967295,y=E+(w<<6&4294967295|w>>>26),w=k+(E^(y|~R))+b[3]+2399980690&4294967295,k=y+(w<<10&4294967295|w>>>22),w=R+(y^(k|~E))+b[10]+4293915773&4294967295,R=k+(w<<15&4294967295|w>>>17),w=E+(k^(R|~y))+b[1]+2240044497&4294967295,E=R+(w<<21&4294967295|w>>>11),w=y+(R^(E|~k))+b[8]+1873313359&4294967295,y=E+(w<<6&4294967295|w>>>26),w=k+(E^(y|~R))+b[15]+4264355552&4294967295,k=y+(w<<10&4294967295|w>>>22),w=R+(y^(k|~E))+b[6]+2734768916&4294967295,R=k+(w<<15&4294967295|w>>>17),w=E+(k^(R|~y))+b[13]+1309151649&4294967295,E=R+(w<<21&4294967295|w>>>11),w=y+(R^(E|~k))+b[4]+4149444226&4294967295,y=E+(w<<6&4294967295|w>>>26),w=k+(E^(y|~R))+b[11]+3174756917&4294967295,k=y+(w<<10&4294967295|w>>>22),w=R+(y^(k|~E))+b[2]+718787259&4294967295,R=k+(w<<15&4294967295|w>>>17),w=E+(k^(R|~y))+b[9]+3951481745&4294967295,A.g[0]=A.g[0]+y&4294967295,A.g[1]=A.g[1]+(R+(w<<21&4294967295|w>>>11))&4294967295,A.g[2]=A.g[2]+R&4294967295,A.g[3]=A.g[3]+k&4294967295}r.prototype.u=function(A,y){y===void 0&&(y=A.length);for(var E=y-this.blockSize,b=this.B,R=this.h,k=0;k<y;){if(R==0)for(;k<=E;)s(this,A,k),k+=this.blockSize;if(typeof A=="string"){for(;k<y;)if(b[R++]=A.charCodeAt(k++),R==this.blockSize){s(this,b),R=0;break}}else for(;k<y;)if(b[R++]=A[k++],R==this.blockSize){s(this,b),R=0;break}}this.h=R,this.o+=y},r.prototype.v=function(){var A=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);A[0]=128;for(var y=1;y<A.length-8;++y)A[y]=0;var E=8*this.o;for(y=A.length-8;y<A.length;++y)A[y]=E&255,E/=256;for(this.u(A),A=Array(16),y=E=0;4>y;++y)for(var b=0;32>b;b+=8)A[E++]=this.g[y]>>>b&255;return A};function i(A,y){var E=l;return Object.prototype.hasOwnProperty.call(E,A)?E[A]:E[A]=y(A)}function o(A,y){this.h=y;for(var E=[],b=!0,R=A.length-1;0<=R;R--){var k=A[R]|0;b&&k==y||(E[R]=k,b=!1)}this.g=E}var l={};function c(A){return-128<=A&&128>A?i(A,function(y){return new o([y|0],0>y?-1:0)}):new o([A|0],0>A?-1:0)}function h(A){if(isNaN(A)||!isFinite(A))return p;if(0>A)return S(h(-A));for(var y=[],E=1,b=0;A>=E;b++)y[b]=A/E|0,E*=4294967296;return new o(y,0)}function d(A,y){if(A.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(A.charAt(0)=="-")return S(d(A.substring(1),y));if(0<=A.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=h(Math.pow(y,8)),b=p,R=0;R<A.length;R+=8){var k=Math.min(8,A.length-R),w=parseInt(A.substring(R,R+k),y);8>k?(k=h(Math.pow(y,k)),b=b.j(k).add(h(w))):(b=b.j(E),b=b.add(h(w)))}return b}var p=c(0),m=c(1),_=c(16777216);t=o.prototype,t.m=function(){if(V(this))return-S(this).m();for(var A=0,y=1,E=0;E<this.g.length;E++){var b=this.i(E);A+=(0<=b?b:4294967296+b)*y,y*=4294967296}return A},t.toString=function(A){if(A=A||10,2>A||36<A)throw Error("radix out of range: "+A);if(P(this))return"0";if(V(this))return"-"+S(this).toString(A);for(var y=h(Math.pow(A,6)),E=this,b="";;){var R=z(E,y).g;E=x(E,R.j(y));var k=((0<E.g.length?E.g[0]:E.h)>>>0).toString(A);if(E=R,P(E))return k+b;for(;6>k.length;)k="0"+k;b=k+b}},t.i=function(A){return 0>A?0:A<this.g.length?this.g[A]:this.h};function P(A){if(A.h!=0)return!1;for(var y=0;y<A.g.length;y++)if(A.g[y]!=0)return!1;return!0}function V(A){return A.h==-1}t.l=function(A){return A=x(this,A),V(A)?-1:P(A)?0:1};function S(A){for(var y=A.g.length,E=[],b=0;b<y;b++)E[b]=~A.g[b];return new o(E,~A.h).add(m)}t.abs=function(){return V(this)?S(this):this},t.add=function(A){for(var y=Math.max(this.g.length,A.g.length),E=[],b=0,R=0;R<=y;R++){var k=b+(this.i(R)&65535)+(A.i(R)&65535),w=(k>>>16)+(this.i(R)>>>16)+(A.i(R)>>>16);b=w>>>16,k&=65535,w&=65535,E[R]=w<<16|k}return new o(E,E[E.length-1]&-2147483648?-1:0)};function x(A,y){return A.add(S(y))}t.j=function(A){if(P(this)||P(A))return p;if(V(this))return V(A)?S(this).j(S(A)):S(S(this).j(A));if(V(A))return S(this.j(S(A)));if(0>this.l(_)&&0>A.l(_))return h(this.m()*A.m());for(var y=this.g.length+A.g.length,E=[],b=0;b<2*y;b++)E[b]=0;for(b=0;b<this.g.length;b++)for(var R=0;R<A.g.length;R++){var k=this.i(b)>>>16,w=this.i(b)&65535,wt=A.i(R)>>>16,Ht=A.i(R)&65535;E[2*b+2*R]+=w*Ht,B(E,2*b+2*R),E[2*b+2*R+1]+=k*Ht,B(E,2*b+2*R+1),E[2*b+2*R+1]+=w*wt,B(E,2*b+2*R+1),E[2*b+2*R+2]+=k*wt,B(E,2*b+2*R+2)}for(b=0;b<y;b++)E[b]=E[2*b+1]<<16|E[2*b];for(b=y;b<2*y;b++)E[b]=0;return new o(E,0)};function B(A,y){for(;(A[y]&65535)!=A[y];)A[y+1]+=A[y]>>>16,A[y]&=65535,y++}function H(A,y){this.g=A,this.h=y}function z(A,y){if(P(y))throw Error("division by zero");if(P(A))return new H(p,p);if(V(A))return y=z(S(A),y),new H(S(y.g),S(y.h));if(V(y))return y=z(A,S(y)),new H(S(y.g),y.h);if(30<A.g.length){if(V(A)||V(y))throw Error("slowDivide_ only works with positive integers.");for(var E=m,b=y;0>=b.l(A);)E=he(E),b=he(b);var R=ue(E,1),k=ue(b,1);for(b=ue(b,2),E=ue(E,2);!P(b);){var w=k.add(b);0>=w.l(A)&&(R=R.add(E),k=w),b=ue(b,1),E=ue(E,1)}return y=x(A,R.j(y)),new H(R,y)}for(R=p;0<=A.l(y);){for(E=Math.max(1,Math.floor(A.m()/y.m())),b=Math.ceil(Math.log(E)/Math.LN2),b=48>=b?1:Math.pow(2,b-48),k=h(E),w=k.j(y);V(w)||0<w.l(A);)E-=b,k=h(E),w=k.j(y);P(k)&&(k=m),R=R.add(k),A=x(A,w)}return new H(R,A)}t.A=function(A){return z(this,A).h},t.and=function(A){for(var y=Math.max(this.g.length,A.g.length),E=[],b=0;b<y;b++)E[b]=this.i(b)&A.i(b);return new o(E,this.h&A.h)},t.or=function(A){for(var y=Math.max(this.g.length,A.g.length),E=[],b=0;b<y;b++)E[b]=this.i(b)|A.i(b);return new o(E,this.h|A.h)},t.xor=function(A){for(var y=Math.max(this.g.length,A.g.length),E=[],b=0;b<y;b++)E[b]=this.i(b)^A.i(b);return new o(E,this.h^A.h)};function he(A){for(var y=A.g.length+1,E=[],b=0;b<y;b++)E[b]=A.i(b)<<1|A.i(b-1)>>>31;return new o(E,A.h)}function ue(A,y){var E=y>>5;y%=32;for(var b=A.g.length-E,R=[],k=0;k<b;k++)R[k]=0<y?A.i(k+E)>>>y|A.i(k+E+1)<<32-y:A.i(k+E);return new o(R,A.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Vg=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=d,mr=o}).apply(typeof yf<"u"?yf:typeof self<"u"?self:typeof window<"u"?window:{});var Mo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dg,ui,Ng,Yo,pc,xg,Mg,Lg;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,f){return a==Array.prototype||a==Object.prototype||(a[u]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Mo=="object"&&Mo];for(var u=0;u<a.length;++u){var f=a[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,u){if(u)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var O=a[g];if(!(O in f))break e;f=f[O]}a=a[a.length-1],g=f[a],u=u(g),u!=g&&u!=null&&e(f,a,{configurable:!0,writable:!0,value:u})}}function i(a,u){a instanceof String&&(a+="");var f=0,g=!1,O={next:function(){if(!g&&f<a.length){var D=f++;return{value:u(D,a[D]),done:!1}}return g=!0,{done:!0,value:void 0}}};return O[Symbol.iterator]=function(){return O},O}s("Array.prototype.values",function(a){return a||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function d(a,u,f){return a.call.apply(a.bind,arguments)}function p(a,u,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var O=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(O,g),a.apply(u,O)}}return function(){return a.apply(u,arguments)}}function m(a,u,f){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,m.apply(null,arguments)}function _(a,u){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function P(a,u){function f(){}f.prototype=u.prototype,a.aa=u.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,O,D){for(var W=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)W[ke-2]=arguments[ke];return u.prototype[O].apply(g,W)}}function V(a){const u=a.length;if(0<u){const f=Array(u);for(let g=0;g<u;g++)f[g]=a[g];return f}return[]}function S(a,u){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(c(g)){const O=a.length||0,D=g.length||0;a.length=O+D;for(let W=0;W<D;W++)a[O+W]=g[W]}else a.push(g)}}class x{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function B(a){return/^[\s\xa0]*$/.test(a)}function H(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function z(a){return z[" "](a),a}z[" "]=function(){};var he=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function ue(a,u,f){for(const g in a)u.call(f,a[g],g,a)}function A(a,u){for(const f in a)u.call(void 0,a[f],f,a)}function y(a){const u={};for(const f in a)u[f]=a[f];return u}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(a,u){let f,g;for(let O=1;O<arguments.length;O++){g=arguments[O];for(f in g)a[f]=g[f];for(let D=0;D<E.length;D++)f=E[D],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function R(a){var u=1;a=a.split(":");const f=[];for(;0<u&&a.length;)f.push(a.shift()),u--;return a.length&&f.push(a.join(":")),f}function k(a){l.setTimeout(()=>{throw a},0)}function w(){var a=xt;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class wt{constructor(){this.h=this.g=null}add(u,f){const g=Ht.get();g.set(u,f),this.h?this.h.next=g:this.g=g,this.h=g}}var Ht=new x(()=>new Qe,a=>a.reset());class Qe{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let we,ve=!1,xt=new wt,Xt=()=>{const a=l.Promise.resolve(void 0);we=()=>{a.then(qt)}};var qt=()=>{for(var a;a=w();){try{a.h.call(a.g)}catch(f){k(f)}var u=Ht;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}ve=!1};function Le(){this.s=this.s,this.C=this.C}Le.prototype.s=!1,Le.prototype.ma=function(){this.s||(this.s=!0,this.N())},Le.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Fe(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Fe.prototype.h=function(){this.defaultPrevented=!0};var Qn=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return a})();function Mt(a,u){if(Fe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(he){e:{try{z(u.nodeName);var O=!0;break e}catch{}O=!1}O||(u=null)}}else f=="mouseover"?u=a.fromElement:f=="mouseout"&&(u=a.toElement);this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Ct[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Mt.aa.h.call(this)}}P(Mt,Fe);var Ct={2:"touch",3:"pen",4:"mouse"};Mt.prototype.h=function(){Mt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var M="closure_listenable_"+(1e6*Math.random()|0),X=0;function Q(a,u,f,g,O){this.listener=a,this.proxy=null,this.src=u,this.type=f,this.capture=!!g,this.ha=O,this.key=++X,this.da=this.fa=!1}function Z(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ge(a){this.src=a,this.g={},this.h=0}ge.prototype.add=function(a,u,f,g,O){var D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);var W=I(a,u,g,O);return-1<W?(u=a[W],f||(u.fa=!1)):(u=new Q(u,this.src,D,!!g,O),u.fa=f,a.push(u)),u};function v(a,u){var f=u.type;if(f in a.g){var g=a.g[f],O=Array.prototype.indexOf.call(g,u,void 0),D;(D=0<=O)&&Array.prototype.splice.call(g,O,1),D&&(Z(u),a.g[f].length==0&&(delete a.g[f],a.h--))}}function I(a,u,f,g){for(var O=0;O<a.length;++O){var D=a[O];if(!D.da&&D.listener==u&&D.capture==!!f&&D.ha==g)return O}return-1}var C="closure_lm_"+(1e6*Math.random()|0),N={};function U(a,u,f,g,O){if(Array.isArray(u)){for(var D=0;D<u.length;D++)U(a,u[D],f,g,O);return null}return f=ce(f),a&&a[M]?a.K(u,f,h(g)?!!g.capture:!1,O):L(a,u,f,!1,g,O)}function L(a,u,f,g,O,D){if(!u)throw Error("Invalid event type");var W=h(O)?!!O.capture:!!O,ke=J(a);if(ke||(a[C]=ke=new ge(a)),f=ke.add(u,f,g,W,D),f.proxy)return f;if(g=K(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)Qn||(O=W),O===void 0&&(O=!1),a.addEventListener(u.toString(),g,O);else if(a.attachEvent)a.attachEvent($(u.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function K(){function a(f){return u.call(a.src,a.listener,f)}const u=ne;return a}function G(a,u,f,g,O){if(Array.isArray(u))for(var D=0;D<u.length;D++)G(a,u[D],f,g,O);else g=h(g)?!!g.capture:!!g,f=ce(f),a&&a[M]?(a=a.i,u=String(u).toString(),u in a.g&&(D=a.g[u],f=I(D,f,g,O),-1<f&&(Z(D[f]),Array.prototype.splice.call(D,f,1),D.length==0&&(delete a.g[u],a.h--)))):a&&(a=J(a))&&(u=a.g[u.toString()],a=-1,u&&(a=I(u,f,g,O)),(f=-1<a?u[a]:null)&&q(f))}function q(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[M])v(u.i,a);else{var f=a.type,g=a.proxy;u.removeEventListener?u.removeEventListener(f,g,a.capture):u.detachEvent?u.detachEvent($(f),g):u.addListener&&u.removeListener&&u.removeListener(g),(f=J(u))?(v(f,a),f.h==0&&(f.src=null,u[C]=null)):Z(a)}}}function $(a){return a in N?N[a]:N[a]="on"+a}function ne(a,u){if(a.da)a=!0;else{u=new Mt(u,this);var f=a.listener,g=a.ha||a.src;a.fa&&q(a),a=f.call(g,u)}return a}function J(a){return a=a[C],a instanceof ge?a:null}var ee="__closure_events_fn_"+(1e9*Math.random()>>>0);function ce(a){return typeof a=="function"?a:(a[ee]||(a[ee]=function(u){return a.handleEvent(u)}),a[ee])}function se(){Le.call(this),this.i=new ge(this),this.M=this,this.F=null}P(se,Le),se.prototype[M]=!0,se.prototype.removeEventListener=function(a,u,f,g){G(this,a,u,f,g)};function pe(a,u){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=u.type||u,typeof u=="string")u=new Fe(u,a);else if(u instanceof Fe)u.target=u.target||a;else{var O=u;u=new Fe(g,a),b(u,O)}if(O=!0,f)for(var D=f.length-1;0<=D;D--){var W=u.g=f[D];O=Ie(W,g,!0,u)&&O}if(W=u.g=a,O=Ie(W,g,!0,u)&&O,O=Ie(W,g,!1,u)&&O,f)for(D=0;D<f.length;D++)W=u.g=f[D],O=Ie(W,g,!1,u)&&O}se.prototype.N=function(){if(se.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var f=a.g[u],g=0;g<f.length;g++)Z(f[g]);delete a.g[u],a.h--}}this.F=null},se.prototype.K=function(a,u,f,g){return this.i.add(String(a),u,!1,f,g)},se.prototype.L=function(a,u,f,g){return this.i.add(String(a),u,!0,f,g)};function Ie(a,u,f,g){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var O=!0,D=0;D<u.length;++D){var W=u[D];if(W&&!W.da&&W.capture==f){var ke=W.listener,at=W.ha||W.src;W.fa&&v(a.i,W),O=ke.call(at,g)!==!1&&O}}return O&&!g.defaultPrevented}function st(a,u,f){if(typeof a=="function")f&&(a=m(a,f));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(a,u||0)}function it(a){a.g=st(()=>{a.g=null,a.i&&(a.i=!1,it(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class zt extends Le{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:it(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ht(a){Le.call(this),this.h=a,this.g={}}P(ht,Le);var Jn=[];function zs(a){ue(a.g,function(u,f){this.g.hasOwnProperty(f)&&q(u)},a),a.g={}}ht.prototype.N=function(){ht.aa.N.call(this),zs(this)},ht.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ot=l.JSON.stringify,Gt=l.JSON.parse,po=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function ns(){}ns.prototype.h=null;function Zu(a){return a.h||(a.h=a.i())}function eh(){}var Gs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function rl(){Fe.call(this,"d")}P(rl,Fe);function sl(){Fe.call(this,"c")}P(sl,Fe);var Pr={},th=null;function mo(){return th=th||new se}Pr.La="serverreachability";function nh(a){Fe.call(this,Pr.La,a)}P(nh,Fe);function Ws(a){const u=mo();pe(u,new nh(u))}Pr.STAT_EVENT="statevent";function rh(a,u){Fe.call(this,Pr.STAT_EVENT,a),this.stat=u}P(rh,Fe);function It(a){const u=mo();pe(u,new rh(u,a))}Pr.Ma="timingevent";function sh(a,u){Fe.call(this,Pr.Ma,a),this.size=u}P(sh,Fe);function Ks(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},u)}function Qs(){this.g=!0}Qs.prototype.xa=function(){this.g=!1};function ly(a,u,f,g,O,D){a.info(function(){if(a.g)if(D)for(var W="",ke=D.split("&"),at=0;at<ke.length;at++){var be=ke[at].split("=");if(1<be.length){var dt=be[0];be=be[1];var ft=dt.split("_");W=2<=ft.length&&ft[1]=="type"?W+(dt+"="+be+"&"):W+(dt+"=redacted&")}}else W=null;else W=D;return"XMLHTTP REQ ("+g+") [attempt "+O+"]: "+u+`
`+f+`
`+W})}function cy(a,u,f,g,O,D,W){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+O+"]: "+u+`
`+f+`
`+D+" "+W})}function rs(a,u,f,g){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+hy(a,f)+(g?" "+g:"")})}function uy(a,u){a.info(function(){return"TIMEOUT: "+u})}Qs.prototype.info=function(){};function hy(a,u){if(!a.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var O=g[1];if(Array.isArray(O)&&!(1>O.length)){var D=O[0];if(D!="noop"&&D!="stop"&&D!="close")for(var W=1;W<O.length;W++)O[W]=""}}}}return ot(f)}catch{return u}}var go={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ih={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},il;function _o(){}P(_o,ns),_o.prototype.g=function(){return new XMLHttpRequest},_o.prototype.i=function(){return{}},il=new _o;function Yn(a,u,f,g){this.j=a,this.i=u,this.l=f,this.R=g||1,this.U=new ht(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new oh}function oh(){this.i=null,this.g="",this.h=!1}var ah={},ol={};function al(a,u,f){a.L=1,a.v=To(bn(u)),a.m=f,a.P=!0,lh(a,null)}function lh(a,u){a.F=Date.now(),yo(a),a.A=bn(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),wh(f.i,"t",g),a.C=0,f=a.j.J,a.h=new oh,a.g=Bh(a.j,f?u:null,!a.m),0<a.O&&(a.M=new zt(m(a.Y,a,a.g),a.O)),u=a.U,f=a.g,g=a.ca;var O="readystatechange";Array.isArray(O)||(O&&(Jn[0]=O.toString()),O=Jn);for(var D=0;D<O.length;D++){var W=U(f,O[D],g||u.handleEvent,!1,u.h||u);if(!W)break;u.g[W.key]=W}u=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),Ws(),ly(a.i,a.u,a.A,a.l,a.R,a.m)}Yn.prototype.ca=function(a){a=a.target;const u=this.M;u&&Rn(a)==3?u.j():this.Y(a)},Yn.prototype.Y=function(a){try{if(a==this.g)e:{const ft=Rn(this.g);var u=this.g.Ba();const os=this.g.Z();if(!(3>ft)&&(ft!=3||this.g&&(this.h.h||this.g.oa()||Ch(this.g)))){this.J||ft!=4||u==7||(u==8||0>=os?Ws(3):Ws(2)),ll(this);var f=this.g.Z();this.X=f;t:if(ch(this)){var g=Ch(this.g);a="";var O=g.length,D=Rn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Cr(this),Js(this);var W="";break t}this.h.i=new l.TextDecoder}for(u=0;u<O;u++)this.h.h=!0,a+=this.h.i.decode(g[u],{stream:!(D&&u==O-1)});g.length=0,this.h.g+=a,this.C=0,W=this.h.g}else W=this.g.oa();if(this.o=f==200,cy(this.i,this.u,this.A,this.l,this.R,ft,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ke,at=this.g;if((ke=at.g?at.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(ke)){var be=ke;break t}}be=null}if(f=be)rs(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,cl(this,f);else{this.o=!1,this.s=3,It(12),Cr(this),Js(this);break e}}if(this.P){f=!0;let Zt;for(;!this.J&&this.C<W.length;)if(Zt=dy(this,W),Zt==ol){ft==4&&(this.s=4,It(14),f=!1),rs(this.i,this.l,null,"[Incomplete Response]");break}else if(Zt==ah){this.s=4,It(15),rs(this.i,this.l,W,"[Invalid Chunk]"),f=!1;break}else rs(this.i,this.l,Zt,null),cl(this,Zt);if(ch(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ft!=4||W.length!=0||this.h.h||(this.s=1,It(16),f=!1),this.o=this.o&&f,!f)rs(this.i,this.l,W,"[Invalid Chunked Response]"),Cr(this),Js(this);else if(0<W.length&&!this.W){this.W=!0;var dt=this.j;dt.g==this&&dt.ba&&!dt.M&&(dt.j.info("Great, no buffering proxy detected. Bytes received: "+W.length),ml(dt),dt.M=!0,It(11))}}else rs(this.i,this.l,W,null),cl(this,W);ft==4&&Cr(this),this.o&&!this.J&&(ft==4?Mh(this.j,this):(this.o=!1,yo(this)))}else Cy(this.g),f==400&&0<W.indexOf("Unknown SID")?(this.s=3,It(12)):(this.s=0,It(13)),Cr(this),Js(this)}}}catch{}finally{}};function ch(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function dy(a,u){var f=a.C,g=u.indexOf(`
`,f);return g==-1?ol:(f=Number(u.substring(f,g)),isNaN(f)?ah:(g+=1,g+f>u.length?ol:(u=u.slice(g,g+f),a.C=g+f,u)))}Yn.prototype.cancel=function(){this.J=!0,Cr(this)};function yo(a){a.S=Date.now()+a.I,uh(a,a.I)}function uh(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ks(m(a.ba,a),u)}function ll(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Yn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(uy(this.i,this.A),this.L!=2&&(Ws(),It(17)),Cr(this),this.s=2,Js(this)):uh(this,this.S-a)};function Js(a){a.j.G==0||a.J||Mh(a.j,a)}function Cr(a){ll(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,zs(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function cl(a,u){try{var f=a.j;if(f.G!=0&&(f.g==a||ul(f.h,a))){if(!a.K&&ul(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var O=g;if(O[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)So(f),bo(f);else break e;pl(f),It(18)}}else f.za=O[1],0<f.za-f.T&&37500>O[2]&&f.F&&f.v==0&&!f.C&&(f.C=Ks(m(f.Za,f),6e3));if(1>=fh(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Or(f,11)}else if((a.K||f.g==a)&&So(f),!B(u))for(O=f.Da.g.parse(u),u=0;u<O.length;u++){let be=O[u];if(f.T=be[0],be=be[1],f.G==2)if(be[0]=="c"){f.K=be[1],f.ia=be[2];const dt=be[3];dt!=null&&(f.la=dt,f.j.info("VER="+f.la));const ft=be[4];ft!=null&&(f.Aa=ft,f.j.info("SVER="+f.Aa));const os=be[5];os!=null&&typeof os=="number"&&0<os&&(g=1.5*os,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Zt=a.g;if(Zt){const Co=Zt.g?Zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Co){var D=g.h;D.g||Co.indexOf("spdy")==-1&&Co.indexOf("quic")==-1&&Co.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(hl(D,D.h),D.h=null))}if(g.D){const gl=Zt.g?Zt.g.getResponseHeader("X-HTTP-Session-Id"):null;gl&&(g.ya=gl,xe(g.I,g.D,gl))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var W=a;if(g.qa=Uh(g,g.J?g.ia:null,g.W),W.K){ph(g.h,W);var ke=W,at=g.L;at&&(ke.I=at),ke.B&&(ll(ke),yo(ke)),g.g=W}else Nh(g);0<f.i.length&&Ro(f)}else be[0]!="stop"&&be[0]!="close"||Or(f,7);else f.G==3&&(be[0]=="stop"||be[0]=="close"?be[0]=="stop"?Or(f,7):fl(f):be[0]!="noop"&&f.l&&f.l.ta(be),f.v=0)}}Ws(4)}catch{}}var fy=class{constructor(a,u){this.g=a,this.map=u}};function hh(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function dh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function fh(a){return a.h?1:a.g?a.g.size:0}function ul(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function hl(a,u){a.g?a.g.add(u):a.h=u}function ph(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}hh.prototype.cancel=function(){if(this.i=mh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function mh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const f of a.g.values())u=u.concat(f.D);return u}return V(a.i)}function py(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var u=[],f=a.length,g=0;g<f;g++)u.push(a[g]);return u}u=[],f=0;for(g in a)u[f++]=a[g];return u}function my(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var u=[];a=a.length;for(var f=0;f<a;f++)u.push(f);return u}u=[],f=0;for(const g in a)u[f++]=g;return u}}}function gh(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var f=my(a),g=py(a),O=g.length,D=0;D<O;D++)u.call(void 0,g[D],f&&f[D],a)}var _h=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function gy(a,u){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),O=null;if(0<=g){var D=a[f].substring(0,g);O=a[f].substring(g+1)}else D=a[f];u(D,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function kr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof kr){this.h=a.h,vo(this,a.j),this.o=a.o,this.g=a.g,Eo(this,a.s),this.l=a.l;var u=a.i,f=new Zs;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),yh(this,f),this.m=a.m}else a&&(u=String(a).match(_h))?(this.h=!1,vo(this,u[1]||"",!0),this.o=Ys(u[2]||""),this.g=Ys(u[3]||"",!0),Eo(this,u[4]),this.l=Ys(u[5]||"",!0),yh(this,u[6]||"",!0),this.m=Ys(u[7]||"")):(this.h=!1,this.i=new Zs(null,this.h))}kr.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Xs(u,vh,!0),":");var f=this.g;return(f||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Xs(u,vh,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Xs(f,f.charAt(0)=="/"?vy:yy,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Xs(f,Ty)),a.join("")};function bn(a){return new kr(a)}function vo(a,u,f){a.j=f?Ys(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Eo(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function yh(a,u,f){u instanceof Zs?(a.i=u,wy(a.i,a.h)):(f||(u=Xs(u,Ey)),a.i=new Zs(u,a.h))}function xe(a,u,f){a.i.set(u,f)}function To(a){return xe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ys(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Xs(a,u,f){return typeof a=="string"?(a=encodeURI(a).replace(u,_y),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function _y(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var vh=/[#\/\?@]/g,yy=/[#\?:]/g,vy=/[#\?]/g,Ey=/[#\?@]/g,Ty=/#/g;function Zs(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Xn(a){a.g||(a.g=new Map,a.h=0,a.i&&gy(a.i,function(u,f){a.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}t=Zs.prototype,t.add=function(a,u){Xn(this),this.i=null,a=ss(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(u),this.h+=1,this};function Eh(a,u){Xn(a),u=ss(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function Th(a,u){return Xn(a),u=ss(a,u),a.g.has(u)}t.forEach=function(a,u){Xn(this),this.g.forEach(function(f,g){f.forEach(function(O){a.call(u,O,g,this)},this)},this)},t.na=function(){Xn(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let g=0;g<u.length;g++){const O=a[g];for(let D=0;D<O.length;D++)f.push(u[g])}return f},t.V=function(a){Xn(this);let u=[];if(typeof a=="string")Th(this,a)&&(u=u.concat(this.g.get(ss(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)u=u.concat(a[f])}return u},t.set=function(a,u){return Xn(this),this.i=null,a=ss(this,a),Th(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},t.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function wh(a,u,f){Eh(a,u),0<f.length&&(a.i=null,a.g.set(ss(a,u),V(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var g=u[f];const D=encodeURIComponent(String(g)),W=this.V(g);for(g=0;g<W.length;g++){var O=D;W[g]!==""&&(O+="="+encodeURIComponent(String(W[g]))),a.push(O)}}return this.i=a.join("&")};function ss(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function wy(a,u){u&&!a.j&&(Xn(a),a.i=null,a.g.forEach(function(f,g){var O=g.toLowerCase();g!=O&&(Eh(this,g),wh(this,O,f))},a)),a.j=u}function Iy(a,u){const f=new Qs;if(l.Image){const g=new Image;g.onload=_(Zn,f,"TestLoadImage: loaded",!0,u,g),g.onerror=_(Zn,f,"TestLoadImage: error",!1,u,g),g.onabort=_(Zn,f,"TestLoadImage: abort",!1,u,g),g.ontimeout=_(Zn,f,"TestLoadImage: timeout",!1,u,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else u(!1)}function Ay(a,u){const f=new Qs,g=new AbortController,O=setTimeout(()=>{g.abort(),Zn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:g.signal}).then(D=>{clearTimeout(O),D.ok?Zn(f,"TestPingServer: ok",!0,u):Zn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(O),Zn(f,"TestPingServer: error",!1,u)})}function Zn(a,u,f,g,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),g(f)}catch{}}function by(){this.g=new po}function Ry(a,u,f){const g=f||"";try{gh(a,function(O,D){let W=O;h(O)&&(W=ot(O)),u.push(g+D+"="+encodeURIComponent(W))})}catch(O){throw u.push(g+"type="+encodeURIComponent("_badmap")),O}}function wo(a){this.l=a.Ub||null,this.j=a.eb||!1}P(wo,ns),wo.prototype.g=function(){return new Io(this.l,this.j)},wo.prototype.i=(function(a){return function(){return a}})({});function Io(a,u){se.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(Io,se),t=Io.prototype,t.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,ti(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ei(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ti(this)),this.g&&(this.readyState=3,ti(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ih(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ih(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?ei(this):ti(this),this.readyState==3&&Ih(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,ei(this))},t.Qa=function(a){this.g&&(this.response=a,ei(this))},t.ga=function(){this.g&&ei(this)};function ei(a){a.readyState=4,a.l=null,a.j=null,a.v=null,ti(a)}t.setRequestHeader=function(a,u){this.u.append(a,u)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=u.next();return a.join(`\r
`)};function ti(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Io.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Ah(a){let u="";return ue(a,function(f,g){u+=g,u+=":",u+=f,u+=`\r
`}),u}function dl(a,u,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=Ah(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):xe(a,u,f))}function He(a){se.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(He,se);var Sy=/^https?$/i,Py=["POST","PUT"];t=He.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,u,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():il.g(),this.v=this.o?Zu(this.o):Zu(il),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(D){bh(this,D);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var O in g)f.set(O,g[O]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const D of g.keys())f.set(D,g.get(D));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(D=>D.toLowerCase()=="content-type"),O=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Py,u,void 0))||g||O||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,W]of f)this.g.setRequestHeader(D,W);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ph(this),this.u=!0,this.g.send(a),this.u=!1}catch(D){bh(this,D)}};function bh(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,Rh(a),Ao(a)}function Rh(a){a.A||(a.A=!0,pe(a,"complete"),pe(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,pe(this,"complete"),pe(this,"abort"),Ao(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ao(this,!0)),He.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Sh(this):this.bb())},t.bb=function(){Sh(this)};function Sh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Rn(a)!=4||a.Z()!=2)){if(a.u&&Rn(a)==4)st(a.Ea,0,a);else if(pe(a,"readystatechange"),Rn(a)==4){a.h=!1;try{const W=a.Z();e:switch(W){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var g;if(g=W===0){var O=String(a.D).match(_h)[1]||null;!O&&l.self&&l.self.location&&(O=l.self.location.protocol.slice(0,-1)),g=!Sy.test(O?O.toLowerCase():"")}f=g}if(f)pe(a,"complete"),pe(a,"success");else{a.m=6;try{var D=2<Rn(a)?a.g.statusText:""}catch{D=""}a.l=D+" ["+a.Z()+"]",Rh(a)}}finally{Ao(a)}}}}function Ao(a,u){if(a.g){Ph(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||pe(a,"ready");try{f.onreadystatechange=g}catch{}}}function Ph(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function Rn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<Rn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),Gt(u)}};function Ch(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Cy(a){const u={};a=(a.g&&2<=Rn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(B(a[g]))continue;var f=R(a[g]);const O=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const D=u[O]||[];u[O]=D,D.push(f)}A(u,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ni(a,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||u}function kh(a){this.Aa=0,this.i=[],this.j=new Qs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ni("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ni("baseRetryDelayMs",5e3,a),this.cb=ni("retryDelaySeedMs",1e4,a),this.Wa=ni("forwardChannelMaxRetries",2,a),this.wa=ni("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new hh(a&&a.concurrentRequestLimit),this.Da=new by,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=kh.prototype,t.la=8,t.G=1,t.connect=function(a,u,f,g){It(0),this.W=a,this.H=u||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=Uh(this,null,this.W),Ro(this)};function fl(a){if(Oh(a),a.G==3){var u=a.U++,f=bn(a.I);if(xe(f,"SID",a.K),xe(f,"RID",u),xe(f,"TYPE","terminate"),ri(a,f),u=new Yn(a,a.j,u),u.L=2,u.v=To(bn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=Bh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),yo(u)}Fh(a)}function bo(a){a.g&&(ml(a),a.g.cancel(),a.g=null)}function Oh(a){bo(a),a.u&&(l.clearTimeout(a.u),a.u=null),So(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Ro(a){if(!dh(a.h)&&!a.s){a.s=!0;var u=a.Ga;we||Xt(),ve||(we(),ve=!0),xt.add(u,a),a.B=0}}function ky(a,u){return fh(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ks(m(a.Ga,a,u),Lh(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const O=new Yn(this,this.j,a);let D=this.o;if(this.S&&(D?(D=y(D),b(D,this.S)):D=this.S),this.m!==null||this.O||(O.H=D,D=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(u+=g,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=Dh(this,O,u),f=bn(this.I),xe(f,"RID",a),xe(f,"CVER",22),this.D&&xe(f,"X-HTTP-Session-Id",this.D),ri(this,f),D&&(this.O?u="headers="+encodeURIComponent(String(Ah(D)))+"&"+u:this.m&&dl(f,this.m,D)),hl(this.h,O),this.Ua&&xe(f,"TYPE","init"),this.P?(xe(f,"$req",u),xe(f,"SID","null"),O.T=!0,al(O,f,null)):al(O,f,u),this.G=2}}else this.G==3&&(a?Vh(this,a):this.i.length==0||dh(this.h)||Vh(this))};function Vh(a,u){var f;u?f=u.l:f=a.U++;const g=bn(a.I);xe(g,"SID",a.K),xe(g,"RID",f),xe(g,"AID",a.T),ri(a,g),a.m&&a.o&&dl(g,a.m,a.o),f=new Yn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),u&&(a.i=u.D.concat(a.i)),u=Dh(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),hl(a.h,f),al(f,g,u)}function ri(a,u){a.H&&ue(a.H,function(f,g){xe(u,g,f)}),a.l&&gh({},function(f,g){xe(u,g,f)})}function Dh(a,u,f){f=Math.min(a.i.length,f);var g=a.l?m(a.l.Na,a.l,a):null;e:{var O=a.i;let D=-1;for(;;){const W=["count="+f];D==-1?0<f?(D=O[0].g,W.push("ofs="+D)):D=0:W.push("ofs="+D);let ke=!0;for(let at=0;at<f;at++){let be=O[at].g;const dt=O[at].map;if(be-=D,0>be)D=Math.max(0,O[at].g-100),ke=!1;else try{Ry(dt,W,"req"+be+"_")}catch{g&&g(dt)}}if(ke){g=W.join("&");break e}}}return a=a.i.splice(0,f),u.D=a,g}function Nh(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;we||Xt(),ve||(we(),ve=!0),xt.add(u,a),a.v=0}}function pl(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ks(m(a.Fa,a),Lh(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,xh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ks(m(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,It(10),bo(this),xh(this))};function ml(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function xh(a){a.g=new Yn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=bn(a.qa);xe(u,"RID","rpc"),xe(u,"SID",a.K),xe(u,"AID",a.T),xe(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&xe(u,"TO",a.ja),xe(u,"TYPE","xmlhttp"),ri(a,u),a.m&&a.o&&dl(u,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=To(bn(u)),f.m=null,f.P=!0,lh(f,a)}t.Za=function(){this.C!=null&&(this.C=null,bo(this),pl(this),It(19))};function So(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Mh(a,u){var f=null;if(a.g==u){So(a),ml(a),a.g=null;var g=2}else if(ul(a.h,u))f=u.D,ph(a.h,u),g=1;else return;if(a.G!=0){if(u.o)if(g==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var O=a.B;g=mo(),pe(g,new sh(g,f)),Ro(a)}else Nh(a);else if(O=u.s,O==3||O==0&&0<u.X||!(g==1&&ky(a,u)||g==2&&pl(a)))switch(f&&0<f.length&&(u=a.h,u.i=u.i.concat(f)),O){case 1:Or(a,5);break;case 4:Or(a,10);break;case 3:Or(a,6);break;default:Or(a,2)}}}function Lh(a,u){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*u}function Or(a,u){if(a.j.info("Error code "+u),u==2){var f=m(a.fb,a),g=a.Xa;const O=!g;g=new kr(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||vo(g,"https"),To(g),O?Iy(g.toString(),f):Ay(g.toString(),f)}else It(2);a.G=0,a.l&&a.l.sa(u),Fh(a),Oh(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),It(2)):(this.j.info("Failed to ping google.com"),It(1))};function Fh(a){if(a.G=0,a.ka=[],a.l){const u=mh(a.h);(u.length!=0||a.i.length!=0)&&(S(a.ka,u),S(a.ka,a.i),a.h.i.length=0,V(a.i),a.i.length=0),a.l.ra()}}function Uh(a,u,f){var g=f instanceof kr?bn(f):new kr(f);if(g.g!="")u&&(g.g=u+"."+g.g),Eo(g,g.s);else{var O=l.location;g=O.protocol,u=u?u+"."+O.hostname:O.hostname,O=+O.port;var D=new kr(null);g&&vo(D,g),u&&(D.g=u),O&&Eo(D,O),f&&(D.l=f),g=D}return f=a.D,u=a.ya,f&&u&&xe(g,f,u),xe(g,"VER",a.la),ri(a,g),g}function Bh(a,u,f){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new He(new wo({eb:f})):new He(a.pa),u.Ha(a.J),u}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function jh(){}t=jh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Po(){}Po.prototype.g=function(a,u){return new Lt(a,u)};function Lt(a,u){se.call(this),this.g=new kh(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!B(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!B(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new is(this)}P(Lt,se),Lt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Lt.prototype.close=function(){fl(this.g)},Lt.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=ot(a),a=f);u.i.push(new fy(u.Ya++,a)),u.G==3&&Ro(u)},Lt.prototype.N=function(){this.g.l=null,delete this.j,fl(this.g),delete this.g,Lt.aa.N.call(this)};function $h(a){rl.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const f in u){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}P($h,rl);function Hh(){sl.call(this),this.status=1}P(Hh,sl);function is(a){this.g=a}P(is,jh),is.prototype.ua=function(){pe(this.g,"a")},is.prototype.ta=function(a){pe(this.g,new $h(a))},is.prototype.sa=function(a){pe(this.g,new Hh)},is.prototype.ra=function(){pe(this.g,"b")},Po.prototype.createWebChannel=Po.prototype.g,Lt.prototype.send=Lt.prototype.o,Lt.prototype.open=Lt.prototype.m,Lt.prototype.close=Lt.prototype.close,Lg=function(){return new Po},Mg=function(){return mo()},xg=Pr,pc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},go.NO_ERROR=0,go.TIMEOUT=8,go.HTTP_ERROR=6,Yo=go,ih.COMPLETE="complete",Ng=ih,eh.EventType=Gs,Gs.OPEN="a",Gs.CLOSE="b",Gs.ERROR="c",Gs.MESSAGE="d",se.prototype.listen=se.prototype.K,ui=eh,He.prototype.listenOnce=He.prototype.L,He.prototype.getLastError=He.prototype.Ka,He.prototype.getLastErrorCode=He.prototype.Ba,He.prototype.getStatus=He.prototype.Z,He.prototype.getResponseJson=He.prototype.Oa,He.prototype.getResponseText=He.prototype.oa,He.prototype.send=He.prototype.ea,He.prototype.setWithCredentials=He.prototype.Ha,Dg=He}).apply(typeof Mo<"u"?Mo:typeof self<"u"?self:typeof window<"u"?window:{});const vf="@firebase/firestore",Ef="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}mt.UNAUTHENTICATED=new mt(null),mt.GOOGLE_CREDENTIALS=new mt("google-credentials-uid"),mt.FIRST_PARTY=new mt("first-party-uid"),mt.MOCK_USER=new mt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bs="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=new tu("@firebase/firestore");function us(){return Qr.logLevel}function Y(t,...e){if(Qr.logLevel<=Ee.DEBUG){const n=e.map(mu);Qr.debug(`Firestore (${Bs}): ${t}`,...n)}}function qn(t,...e){if(Qr.logLevel<=Ee.ERROR){const n=e.map(mu);Qr.error(`Firestore (${Bs}): ${t}`,...n)}}function vr(t,...e){if(Qr.logLevel<=Ee.WARN){const n=e.map(mu);Qr.warn(`Firestore (${Bs}): ${t}`,...n)}}function mu(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(n){return JSON.stringify(n)})(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,Fg(t,r,n)}function Fg(t,e,n){let r=`FIRESTORE (${Bs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw qn(r),new Error(r)}function Ce(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||Fg(e,s,r)}function fe(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class te extends Wn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(){this.promise=new Promise(((e,n)=>{this.resolve=e,this.reject=n}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _b{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable((()=>n(mt.UNAUTHENTICATED)))}shutdown(){}}class yb{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class vb{constructor(e){this.t=e,this.currentUser=mt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ce(this.o===void 0,42304);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new gr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new gr,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},l=c=>{Y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(Y("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new gr)}}),0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==e?(Y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ce(typeof r.accessToken=="string",31837,{l:r}),new Ug(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ce(e===null||typeof e=="string",2055,{h:e}),new mt(e)}}class Eb{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=mt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Tb{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new Eb(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable((()=>n(mt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Tf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class wb{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ft(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Ce(this.o===void 0,3512);const r=i=>{i.error!=null&&Y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,Y("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{Y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):Y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Tf(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((n=>n?(Ce(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Tf(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ib(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bg(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Ib(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function _e(t,e){return t<e?-1:t>e?1:0}function mc(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),s=e.codePointAt(n);if(r!==s){if(r<128&&s<128)return _e(r,s);{const i=Bg(),o=Ab(i.encode(wf(t,n)),i.encode(wf(e,n)));return o!==0?o:_e(r,s)}}n+=r>65535?2:1}return _e(t.length,e.length)}function wf(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function Ab(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return _e(t[n],e[n]);return _e(t.length,e.length)}function ks(t,e,n){return t.length===e.length&&t.every(((r,s)=>n(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If="__name__";class fn{constructor(e,n,r){n===void 0?n=0:n>e.length&&ae(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&ae(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return fn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof fn?e.forEach((r=>{n.push(r)})):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=fn.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return _e(e.length,n.length)}static compareSegments(e,n){const r=fn.isNumericId(e),s=fn.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?fn.extractNumericId(e).compare(fn.extractNumericId(n)):mc(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return mr.fromString(e.substring(4,e.length-2))}}class je extends fn{construct(e,n,r){return new je(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new te(j.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((s=>s.length>0)))}return new je(n)}static emptyPath(){return new je([])}}const bb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ct extends fn{construct(e,n,r){return new ct(e,n,r)}static isValidIdentifier(e){return bb.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ct.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===If}static keyField(){return new ct([If])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new te(j.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new te(j.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new te(j.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new te(j.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ct(n)}static emptyPath(){return new ct([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.path=e}static fromPath(e){return new re(je.fromString(e))}static fromName(e){return new re(je.fromString(e).popFirst(5))}static empty(){return new re(je.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&je.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return je.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new re(new je(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rb(t,e,n){if(!n)throw new te(j.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Sb(t,e,n,r){if(e===!0&&r===!0)throw new te(j.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Af(t){if(!re.isDocumentKey(t))throw new te(j.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function jg(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function _u(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ae(12329,{type:typeof t})}function Hi(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new te(j.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=_u(t);throw new te(j.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(t,e){const n={typeString:t};return e&&(n.value=e),n}function lo(t,e){if(!jg(t))throw new te(j.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new te(j.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf=-62135596800,Rf=1e6;class Me{static now(){return Me.fromMillis(Date.now())}static fromDate(e){return Me.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Rf);return new Me(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new te(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new te(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<bf)throw new te(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new te(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Rf}_compareTo(e){return this.seconds===e.seconds?_e(this.nanoseconds,e.nanoseconds):_e(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(lo(e,Me._jsonSchema))return new Me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-bf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Me._jsonSchemaVersion="firestore/timestamp/1.0",Me._jsonSchema={type:Ye("string",Me._jsonSchemaVersion),seconds:Ye("number"),nanoseconds:Ye("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{static fromTimestamp(e){return new de(e)}static min(){return new de(new Me(0,0))}static max(){return new de(new Me(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi=-1;function Pb(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=de.fromTimestamp(r===1e9?new Me(n+1,0):new Me(n,r));return new Er(s,re.empty(),e)}function Cb(t){return new Er(t.readTime,t.key,qi)}class Er{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Er(de.min(),re.empty(),qi)}static max(){return new Er(de.max(),re.empty(),qi)}}function kb(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=re.comparator(t.documentKey,e.documentKey),n!==0?n:_e(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ob="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Vb{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function js(t){if(t.code!==j.FAILED_PRECONDITION||t.message!==Ob)throw t;Y("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ae(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new F(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}}))}toPromise(){return new Promise(((e,n)=>{this.next(e,n)}))}wrapUserFunction(e){try{const n=e();return n instanceof F?n:F.resolve(n)}catch(n){return F.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction((()=>e(n))):F.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction((()=>e(n))):F.reject(n)}static resolve(e){return new F(((n,r)=>{n(e)}))}static reject(e){return new F(((n,r)=>{r(e)}))}static waitFor(e){return new F(((n,r)=>{let s=0,i=0,o=!1;e.forEach((l=>{++s,l.next((()=>{++i,o&&i===s&&n()}),(c=>r(c)))})),o=!0,i===s&&n()}))}static or(e){let n=F.resolve(!1);for(const r of e)n=n.next((s=>s?F.resolve(s):r()));return n}static forEach(e,n){const r=[];return e.forEach(((s,i)=>{r.push(n.call(this,s,i))})),this.waitFor(r)}static mapArray(e,n){return new F(((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const h=c;n(e[h]).next((d=>{o[h]=d,++l,l===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,n){return new F(((r,s)=>{const i=()=>{e()===!0?n().next((()=>{i()}),s):r()};i()}))}}function Db(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function $s(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this._e(r),this.ae=r=>n.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}za.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu=-1;function Ga(t){return t==null}function ya(t){return t===0&&1/t==-1/0}function Nb(t){return typeof t=="number"&&Number.isInteger(t)&&!ya(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g="";function xb(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Sf(e)),e=Mb(t.get(n),e);return Sf(e)}function Mb(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case $g:n+="";break;default:n+=i}}return n}function Sf(t){return t+$g+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Xr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Hg(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e,n){this.comparator=e,this.root=n||lt.EMPTY}insert(e,n){return new $e(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,lt.BLACK,null,null))}remove(e){return new $e(this.comparator,this.root.remove(e,this.comparator).copy(null,null,lt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((n,r)=>(e(n,r),!1)))}toString(){const e=[];return this.inorderTraversal(((n,r)=>(e.push(`${n}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Lo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Lo(this.root,e,this.comparator,!1)}getReverseIterator(){return new Lo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Lo(this.root,e,this.comparator,!0)}}class Lo{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class lt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??lt.RED,this.left=s??lt.EMPTY,this.right=i??lt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new lt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return lt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return lt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,lt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,lt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ae(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ae(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ae(27949);return e+(this.isRed()?0:1)}}lt.EMPTY=null,lt.RED=!0,lt.BLACK=!1;lt.EMPTY=new class{constructor(){this.size=0}get key(){throw ae(57766)}get value(){throw ae(16141)}get color(){throw ae(16727)}get left(){throw ae(29726)}get right(){throw ae(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new lt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.comparator=e,this.data=new $e(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((n,r)=>(e(n),!1)))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Cf(this.data.getIterator())}getIteratorFrom(e){return new Cf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach((r=>{n=n.add(r)})),n}isEqual(e){if(!(e instanceof et)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((n=>{e.push(n)})),e}toString(){const e=[];return this.forEach((n=>e.push(n))),"SortedSet("+e.toString()+")"}copy(e){const n=new et(this.comparator);return n.data=e,n}}class Cf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e){this.fields=e,e.sort(ct.comparator)}static empty(){return new nn([])}unionWith(e){let n=new et(ct.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new nn(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ks(this.fields,e.fields,((n,r)=>n.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.binaryString=e}static fromBase64String(e){const n=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new qg("Invalid base64 string: "+i):i}})(e);return new ut(n)}static fromUint8Array(e){const n=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new ut(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return _e(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ut.EMPTY_BYTE_STRING=new ut("");const Lb=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Tr(t){if(Ce(!!t,39018),typeof t=="string"){let e=0;const n=Lb.exec(t);if(Ce(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:We(t.seconds),nanos:We(t.nanos)}}function We(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function wr(t){return typeof t=="string"?ut.fromBase64String(t):ut.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zg="server_timestamp",Gg="__type__",Wg="__previous_value__",Kg="__local_write_time__";function vu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[Gg])===null||n===void 0?void 0:n.stringValue)===zg}function Wa(t){const e=t.mapValue.fields[Wg];return vu(e)?Wa(e):e}function zi(t){const e=Tr(t.mapValue.fields[Kg].timestampValue);return new Me(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fb{constructor(e,n,r,s,i,o,l,c,h,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=d}}const va="(default)";class Gi{constructor(e,n){this.projectId=e,this.database=n||va}static empty(){return new Gi("","")}get isDefaultDatabase(){return this.database===va}isEqual(e){return e instanceof Gi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qg="__type__",Ub="__max__",Fo={mapValue:{}},Jg="__vector__",Ea="value";function Ir(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?vu(t)?4:jb(t)?9007199254740991:Bb(t)?10:11:ae(28295,{value:t})}function In(t,e){if(t===e)return!0;const n=Ir(t);if(n!==Ir(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return zi(t).isEqual(zi(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Tr(s.timestampValue),l=Tr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos})(t,e);case 5:return t.stringValue===e.stringValue;case 6:return(function(s,i){return wr(s.bytesValue).isEqual(wr(i.bytesValue))})(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return(function(s,i){return We(s.geoPointValue.latitude)===We(i.geoPointValue.latitude)&&We(s.geoPointValue.longitude)===We(i.geoPointValue.longitude)})(t,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return We(s.integerValue)===We(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=We(s.doubleValue),l=We(i.doubleValue);return o===l?ya(o)===ya(l):isNaN(o)&&isNaN(l)}return!1})(t,e);case 9:return ks(t.arrayValue.values||[],e.arrayValue.values||[],In);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Pf(o)!==Pf(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!In(o[c],l[c])))return!1;return!0})(t,e);default:return ae(52216,{left:t})}}function Wi(t,e){return(t.values||[]).find((n=>In(n,e)))!==void 0}function Os(t,e){if(t===e)return 0;const n=Ir(t),r=Ir(e);if(n!==r)return _e(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return _e(t.booleanValue,e.booleanValue);case 2:return(function(i,o){const l=We(i.integerValue||i.doubleValue),c=We(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(t,e);case 3:return kf(t.timestampValue,e.timestampValue);case 4:return kf(zi(t),zi(e));case 5:return mc(t.stringValue,e.stringValue);case 6:return(function(i,o){const l=wr(i),c=wr(o);return l.compareTo(c)})(t.bytesValue,e.bytesValue);case 7:return(function(i,o){const l=i.split("/"),c=o.split("/");for(let h=0;h<l.length&&h<c.length;h++){const d=_e(l[h],c[h]);if(d!==0)return d}return _e(l.length,c.length)})(t.referenceValue,e.referenceValue);case 8:return(function(i,o){const l=_e(We(i.latitude),We(o.latitude));return l!==0?l:_e(We(i.longitude),We(o.longitude))})(t.geoPointValue,e.geoPointValue);case 9:return Of(t.arrayValue,e.arrayValue);case 10:return(function(i,o){var l,c,h,d;const p=i.fields||{},m=o.fields||{},_=(l=p[Ea])===null||l===void 0?void 0:l.arrayValue,P=(c=m[Ea])===null||c===void 0?void 0:c.arrayValue,V=_e(((h=_==null?void 0:_.values)===null||h===void 0?void 0:h.length)||0,((d=P==null?void 0:P.values)===null||d===void 0?void 0:d.length)||0);return V!==0?V:Of(_,P)})(t.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Fo.mapValue&&o===Fo.mapValue)return 0;if(i===Fo.mapValue)return 1;if(o===Fo.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),h=o.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const m=mc(c[p],d[p]);if(m!==0)return m;const _=Os(l[c[p]],h[d[p]]);if(_!==0)return _}return _e(c.length,d.length)})(t.mapValue,e.mapValue);default:throw ae(23264,{le:n})}}function kf(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return _e(t,e);const n=Tr(t),r=Tr(e),s=_e(n.seconds,r.seconds);return s!==0?s:_e(n.nanos,r.nanos)}function Of(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Os(n[s],r[s]);if(i)return i}return _e(n.length,r.length)}function Vs(t){return gc(t)}function gc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?(function(n){const r=Tr(n);return`time(${r.seconds},${r.nanos})`})(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?(function(n){return wr(n).toBase64()})(t.bytesValue):"referenceValue"in t?(function(n){return re.fromName(n).toString()})(t.referenceValue):"geoPointValue"in t?(function(n){return`geo(${n.latitude},${n.longitude})`})(t.geoPointValue):"arrayValue"in t?(function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=gc(i);return r+"]"})(t.arrayValue):"mapValue"in t?(function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${gc(n.fields[o])}`;return s+"}"})(t.mapValue):ae(61005,{value:t})}function Xo(t){switch(Ir(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Wa(t);return e?16+Xo(e):16;case 5:return 2*t.stringValue.length;case 6:return wr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Xo(i)),0)})(t.arrayValue);case 10:case 11:return(function(r){let s=0;return Xr(r.fields,((i,o)=>{s+=i.length+Xo(o)})),s})(t.mapValue);default:throw ae(13486,{value:t})}}function _c(t){return!!t&&"integerValue"in t}function Eu(t){return!!t&&"arrayValue"in t}function Vf(t){return!!t&&"nullValue"in t}function Df(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Zo(t){return!!t&&"mapValue"in t}function Bb(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[Qg])===null||n===void 0?void 0:n.stringValue)===Jg}function Ri(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Xr(t.mapValue.fields,((n,r)=>e.mapValue.fields[n]=Ri(r))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ri(t.arrayValue.values[n]);return e}return Object.assign({},t)}function jb(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===Ub}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e){this.value=e}static empty(){return new Wt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Zo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ri(n)}setAll(e){let n=ct.emptyPath(),r={},s=[];e.forEach(((o,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=Ri(o):s.push(l.lastSegment())}));const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Zo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return In(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Zo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Xr(n,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Wt(Ri(this.value))}}function Yg(t){const e=[];return Xr(t.fields,((n,r)=>{const s=new ct([n]);if(Zo(r)){const i=Yg(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new nn(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new _t(e,0,de.min(),de.min(),de.min(),Wt.empty(),0)}static newFoundDocument(e,n,r,s){return new _t(e,1,n,de.min(),r,s,0)}static newNoDocument(e,n){return new _t(e,2,n,de.min(),de.min(),Wt.empty(),0)}static newUnknownDocument(e,n){return new _t(e,3,n,de.min(),de.min(),Wt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(de.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Wt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=de.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof _t&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e,n){this.position=e,this.inclusive=n}}function Nf(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=re.comparator(re.fromName(o.referenceValue),n.key):r=Os(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function xf(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!In(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,n="asc"){this.field=e,this.dir=n}}function $b(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{}class Ze extends Xg{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new qb(e,n,r):n==="array-contains"?new Wb(e,r):n==="in"?new Kb(e,r):n==="not-in"?new Qb(e,r):n==="array-contains-any"?new Jb(e,r):new Ze(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new zb(e,r):new Gb(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Os(n,this.value)):n!==null&&Ir(this.value)===Ir(n)&&this.matchesComparison(Os(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ae(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class An extends Xg{constructor(e,n){super(),this.filters=e,this.op=n,this.he=null}static create(e,n){return new An(e,n)}matches(e){return Zg(this)?this.filters.find((n=>!n.matches(e)))===void 0:this.filters.find((n=>n.matches(e)))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce(((e,n)=>e.concat(n.getFlattenedFilters())),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Zg(t){return t.op==="and"}function e_(t){return Hb(t)&&Zg(t)}function Hb(t){for(const e of t.filters)if(e instanceof An)return!1;return!0}function yc(t){if(t instanceof Ze)return t.field.canonicalString()+t.op.toString()+Vs(t.value);if(e_(t))return t.filters.map((e=>yc(e))).join(",");{const e=t.filters.map((n=>yc(n))).join(",");return`${t.op}(${e})`}}function t_(t,e){return t instanceof Ze?(function(r,s){return s instanceof Ze&&r.op===s.op&&r.field.isEqual(s.field)&&In(r.value,s.value)})(t,e):t instanceof An?(function(r,s){return s instanceof An&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,l)=>i&&t_(o,s.filters[l])),!0):!1})(t,e):void ae(19439)}function n_(t){return t instanceof Ze?(function(n){return`${n.field.canonicalString()} ${n.op} ${Vs(n.value)}`})(t):t instanceof An?(function(n){return n.op.toString()+" {"+n.getFilters().map(n_).join(" ,")+"}"})(t):"Filter"}class qb extends Ze{constructor(e,n,r){super(e,n,r),this.key=re.fromName(r.referenceValue)}matches(e){const n=re.comparator(e.key,this.key);return this.matchesComparison(n)}}class zb extends Ze{constructor(e,n){super(e,"in",n),this.keys=r_("in",n)}matches(e){return this.keys.some((n=>n.isEqual(e.key)))}}class Gb extends Ze{constructor(e,n){super(e,"not-in",n),this.keys=r_("not-in",n)}matches(e){return!this.keys.some((n=>n.isEqual(e.key)))}}function r_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map((r=>re.fromName(r.referenceValue)))}class Wb extends Ze{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Eu(n)&&Wi(n.arrayValue,this.value)}}class Kb extends Ze{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Wi(this.value.arrayValue,n)}}class Qb extends Ze{constructor(e,n){super(e,"not-in",n)}matches(e){if(Wi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Wi(this.value.arrayValue,n)}}class Jb extends Ze{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Eu(n)||!n.arrayValue.values)&&n.arrayValue.values.some((r=>Wi(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yb{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.Pe=null}}function Mf(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Yb(t,e,n,r,s,i,o)}function Tu(t){const e=fe(t);if(e.Pe===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map((r=>yc(r))).join(","),n+="|ob:",n+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Ga(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((r=>Vs(r))).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((r=>Vs(r))).join(",")),e.Pe=n}return e.Pe}function wu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!$b(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!t_(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!xf(t.startAt,e.startAt)&&xf(t.endAt,e.endAt)}function vc(t){return re.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function Xb(t,e,n,r,s,i,o,l){return new Ka(t,e,n,r,s,i,o,l)}function Iu(t){return new Ka(t)}function Lf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Zb(t){return t.collectionGroup!==null}function Si(t){const e=fe(t);if(e.Te===null){e.Te=[];const n=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new et(ct.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(l=l.add(h.field))}))})),l})(e).forEach((i=>{n.has(i.canonicalString())||i.isKeyField()||e.Te.push(new wa(i,r))})),n.has(ct.keyField().canonicalString())||e.Te.push(new wa(ct.keyField(),r))}return e.Te}function yn(t){const e=fe(t);return e.Ie||(e.Ie=eR(e,Si(t))),e.Ie}function eR(t,e){if(t.limitType==="F")return Mf(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new wa(s.field,i)}));const n=t.endAt?new Ta(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ta(t.startAt.position,t.startAt.inclusive):null;return Mf(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Ec(t,e,n){return new Ka(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Qa(t,e){return wu(yn(t),yn(e))&&t.limitType===e.limitType}function s_(t){return`${Tu(yn(t))}|lt:${t.limitType}`}function hs(t){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((s=>n_(s))).join(", ")}]`),Ga(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((s=>Vs(s))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((s=>Vs(s))).join(",")),`Target(${r})`})(yn(t))}; limitType=${t.limitType})`}function Ja(t,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):re.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(t,e)&&(function(r,s){for(const i of Si(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(t,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(t,e)&&(function(r,s){return!(r.startAt&&!(function(o,l,c){const h=Nf(o,l,c);return o.inclusive?h<=0:h<0})(r.startAt,Si(r),s)||r.endAt&&!(function(o,l,c){const h=Nf(o,l,c);return o.inclusive?h>=0:h>0})(r.endAt,Si(r),s))})(t,e)}function tR(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function i_(t){return(e,n)=>{let r=!1;for(const s of Si(t)){const i=nR(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function nR(t,e,n){const r=t.field.isKeyField()?re.comparator(e.key,n.key):(function(i,o,l){const c=o.data.field(i),h=l.data.field(i);return c!==null&&h!==null?Os(c,h):ae(42886)})(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ae(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Xr(this.inner,((n,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Hg(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rR=new $e(re.comparator);function zn(){return rR}const o_=new $e(re.comparator);function hi(...t){let e=o_;for(const n of t)e=e.insert(n.key,n);return e}function a_(t){let e=o_;return t.forEach(((n,r)=>e=e.insert(n,r.overlayedDocument))),e}function Ur(){return Pi()}function l_(){return Pi()}function Pi(){return new Zr((t=>t.toString()),((t,e)=>t.isEqual(e)))}const sR=new $e(re.comparator),iR=new et(re.comparator);function Te(...t){let e=iR;for(const n of t)e=e.add(n);return e}const oR=new et(_e);function aR(){return oR}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ya(e)?"-0":e}}function c_(t){return{integerValue:""+t}}function lR(t,e){return Nb(e)?c_(e):Au(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(){this._=void 0}}function cR(t,e,n){return t instanceof Ki?(function(s,i){const o={fields:{[Gg]:{stringValue:zg},[Kg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&vu(i)&&(i=Wa(i)),i&&(o.fields[Wg]=i),{mapValue:o}})(n,e):t instanceof Qi?h_(t,e):t instanceof Ji?d_(t,e):(function(s,i){const o=u_(s,i),l=Ff(o)+Ff(s.Ee);return _c(o)&&_c(s.Ee)?c_(l):Au(s.serializer,l)})(t,e)}function uR(t,e,n){return t instanceof Qi?h_(t,e):t instanceof Ji?d_(t,e):n}function u_(t,e){return t instanceof Ia?(function(r){return _c(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class Ki extends Ya{}class Qi extends Ya{constructor(e){super(),this.elements=e}}function h_(t,e){const n=f_(e);for(const r of t.elements)n.some((s=>In(s,r)))||n.push(r);return{arrayValue:{values:n}}}class Ji extends Ya{constructor(e){super(),this.elements=e}}function d_(t,e){let n=f_(e);for(const r of t.elements)n=n.filter((s=>!In(s,r)));return{arrayValue:{values:n}}}class Ia extends Ya{constructor(e,n){super(),this.serializer=e,this.Ee=n}}function Ff(t){return We(t.integerValue||t.doubleValue)}function f_(t){return Eu(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hR{constructor(e,n){this.field=e,this.transform=n}}function dR(t,e){return t.field.isEqual(e.field)&&(function(r,s){return r instanceof Qi&&s instanceof Qi||r instanceof Ji&&s instanceof Ji?ks(r.elements,s.elements,In):r instanceof Ia&&s instanceof Ia?In(r.Ee,s.Ee):r instanceof Ki&&s instanceof Ki})(t.transform,e.transform)}class fR{constructor(e,n){this.version=e,this.transformResults=n}}class Ln{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ln}static exists(e){return new Ln(void 0,e)}static updateTime(e){return new Ln(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ea(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Xa{}function p_(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new g_(t.key,Ln.none()):new co(t.key,t.data,Ln.none());{const n=t.data,r=Wt.empty();let s=new et(ct.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new es(t.key,r,new nn(s.toArray()),Ln.none())}}function pR(t,e,n){t instanceof co?(function(s,i,o){const l=s.value.clone(),c=Bf(s.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(t,e,n):t instanceof es?(function(s,i,o){if(!ea(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Bf(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(m_(s)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(t,e,n):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,n)}function Ci(t,e,n,r){return t instanceof co?(function(i,o,l,c){if(!ea(i.precondition,o))return l;const h=i.value.clone(),d=jf(i.fieldTransforms,c,o);return h.setAll(d),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(t,e,n,r):t instanceof es?(function(i,o,l,c){if(!ea(i.precondition,o))return l;const h=jf(i.fieldTransforms,c,o),d=o.data;return d.setAll(m_(i)),d.setAll(h),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(t,e,n,r):(function(i,o,l){return ea(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l})(t,e,n)}function mR(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=u_(r.transform,s||null);i!=null&&(n===null&&(n=Wt.empty()),n.set(r.field,i))}return n||null}function Uf(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ks(r,s,((i,o)=>dR(i,o)))})(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class co extends Xa{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class es extends Xa{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function m_(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function Bf(t,e,n){const r=new Map;Ce(t.length===n.length,32656,{Ae:n.length,Re:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,uR(o,l,n[s]))}return r}function jf(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,cR(i,o,e))}return r}class g_ extends Xa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class gR extends Xa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&pR(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Ci(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Ci(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=l_();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const c=p_(o,l);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(de.min())})),r}keys(){return this.mutations.reduce(((e,n)=>e.add(n.key)),Te())}isEqual(e){return this.batchId===e.batchId&&ks(this.mutations,e.mutations,((n,r)=>Uf(n,r)))&&ks(this.baseMutations,e.baseMutations,((n,r)=>Uf(n,r)))}}class bu{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Ce(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let s=(function(){return sR})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new bu(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yR{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vR{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je,Ae;function ER(t){switch(t){case j.OK:return ae(64938);case j.CANCELLED:case j.UNKNOWN:case j.DEADLINE_EXCEEDED:case j.RESOURCE_EXHAUSTED:case j.INTERNAL:case j.UNAVAILABLE:case j.UNAUTHENTICATED:return!1;case j.INVALID_ARGUMENT:case j.NOT_FOUND:case j.ALREADY_EXISTS:case j.PERMISSION_DENIED:case j.FAILED_PRECONDITION:case j.ABORTED:case j.OUT_OF_RANGE:case j.UNIMPLEMENTED:case j.DATA_LOSS:return!0;default:return ae(15467,{code:t})}}function __(t){if(t===void 0)return qn("GRPC error has no .code"),j.UNKNOWN;switch(t){case Je.OK:return j.OK;case Je.CANCELLED:return j.CANCELLED;case Je.UNKNOWN:return j.UNKNOWN;case Je.DEADLINE_EXCEEDED:return j.DEADLINE_EXCEEDED;case Je.RESOURCE_EXHAUSTED:return j.RESOURCE_EXHAUSTED;case Je.INTERNAL:return j.INTERNAL;case Je.UNAVAILABLE:return j.UNAVAILABLE;case Je.UNAUTHENTICATED:return j.UNAUTHENTICATED;case Je.INVALID_ARGUMENT:return j.INVALID_ARGUMENT;case Je.NOT_FOUND:return j.NOT_FOUND;case Je.ALREADY_EXISTS:return j.ALREADY_EXISTS;case Je.PERMISSION_DENIED:return j.PERMISSION_DENIED;case Je.FAILED_PRECONDITION:return j.FAILED_PRECONDITION;case Je.ABORTED:return j.ABORTED;case Je.OUT_OF_RANGE:return j.OUT_OF_RANGE;case Je.UNIMPLEMENTED:return j.UNIMPLEMENTED;case Je.DATA_LOSS:return j.DATA_LOSS;default:return ae(39323,{code:t})}}(Ae=Je||(Je={}))[Ae.OK=0]="OK",Ae[Ae.CANCELLED=1]="CANCELLED",Ae[Ae.UNKNOWN=2]="UNKNOWN",Ae[Ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ae[Ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ae[Ae.NOT_FOUND=5]="NOT_FOUND",Ae[Ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ae[Ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ae[Ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ae[Ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ae[Ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ae[Ae.ABORTED=10]="ABORTED",Ae[Ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ae[Ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ae[Ae.INTERNAL=13]="INTERNAL",Ae[Ae.UNAVAILABLE=14]="UNAVAILABLE",Ae[Ae.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TR=new mr([4294967295,4294967295],0);function $f(t){const e=Bg().encode(t),n=new Vg;return n.update(e),new Uint8Array(n.digest())}function Hf(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new mr([n,r],0),new mr([s,i],0)]}class Ru{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new di(`Invalid padding: ${n}`);if(r<0)throw new di(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new di(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new di(`Invalid padding when bitmap length is 0: ${n}`);this.fe=8*e.length-n,this.ge=mr.fromNumber(this.fe)}pe(e,n,r){let s=e.add(n.multiply(mr.fromNumber(r)));return s.compare(TR)===1&&(s=new mr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const n=$f(e),[r,s]=Hf(n);for(let i=0;i<this.hashCount;i++){const o=this.pe(r,s,i);if(!this.ye(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Ru(i,s,n);return r.forEach((l=>o.insert(l))),o}insert(e){if(this.fe===0)return;const n=$f(e),[r,s]=Hf(n);for(let i=0;i<this.hashCount;i++){const o=this.pe(r,s,i);this.we(o)}}we(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class di extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,uo.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Za(de.min(),s,new $e(_e),zn(),Te())}}class uo{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new uo(r,n,Te(),Te(),Te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,n,r,s){this.Se=e,this.removedTargetIds=n,this.key=r,this.be=s}}class y_{constructor(e,n){this.targetId=e,this.De=n}}class v_{constructor(e,n,r=ut.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class qf{constructor(){this.ve=0,this.Ce=zf(),this.Fe=ut.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=Te(),n=Te(),r=Te();return this.Ce.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ae(38017,{changeType:i})}})),new uo(this.Fe,this.Me,e,n,r)}ke(){this.xe=!1,this.Ce=zf()}qe(e,n){this.xe=!0,this.Ce=this.Ce.insert(e,n)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,Ce(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class wR{constructor(e){this.We=e,this.Ge=new Map,this.ze=zn(),this.je=Uo(),this.Je=Uo(),this.He=new $e(_e)}Ye(e){for(const n of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(n,e.be):this.Xe(n,e.key,e.be);for(const n of e.removedTargetIds)this.Xe(n,e.key,e.be)}et(e){this.forEachTarget(e,(n=>{const r=this.tt(n);switch(e.state){case 0:this.nt(n)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(n);break;case 3:this.nt(n)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(n)&&(this.rt(n),r.Be(e.resumeToken));break;default:ae(56790,{state:e.state})}}))}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Ge.forEach(((r,s)=>{this.nt(s)&&n(s)}))}it(e){const n=e.targetId,r=e.De.count,s=this.st(n);if(s){const i=s.target;if(vc(i))if(r===0){const o=new re(i.path);this.Xe(n,o,_t.newNoDocument(o,de.min()))}else Ce(r===1,20013,{expectedCount:r});else{const o=this.ot(n);if(o!==r){const l=this._t(e),c=l?this.ut(l,e,o):1;if(c!==0){this.rt(n);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(n,h)}}}}}_t(e){const n=e.De.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=wr(r).toUint8Array()}catch(c){if(c instanceof qg)return vr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Ru(o,s,i)}catch(c){return vr(c instanceof di?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.fe===0?null:l}ut(e,n,r){return n.De.count===r-this.ht(e,n.targetId)?0:2}ht(e,n){const r=this.We.getRemoteKeysForTarget(n);let s=0;return r.forEach((i=>{const o=this.We.lt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Xe(n,i,null),s++)})),s}Pt(e){const n=new Map;this.Ge.forEach(((i,o)=>{const l=this.st(o);if(l){if(i.current&&vc(l.target)){const c=new re(l.target.path);this.Tt(c).has(o)||this.It(o,c)||this.Xe(o,c,_t.newNoDocument(c,e))}i.Ne&&(n.set(o,i.Le()),i.ke())}}));let r=Te();this.Je.forEach(((i,o)=>{let l=!0;o.forEachWhile((c=>{const h=this.st(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(i))})),this.ze.forEach(((i,o)=>o.setReadTime(e)));const s=new Za(e,n,this.He,this.ze,r);return this.ze=zn(),this.je=Uo(),this.Je=Uo(),this.He=new $e(_e),s}Ze(e,n){if(!this.nt(e))return;const r=this.It(e,n.key)?2:0;this.tt(e).qe(n.key,r),this.ze=this.ze.insert(n.key,n),this.je=this.je.insert(n.key,this.Tt(n.key).add(e)),this.Je=this.Je.insert(n.key,this.dt(n.key).add(e))}Xe(e,n,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,n)?s.qe(n,1):s.Qe(n),this.Je=this.Je.insert(n,this.dt(n).delete(e)),this.Je=this.Je.insert(n,this.dt(n).add(e)),r&&(this.ze=this.ze.insert(n,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const n=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let n=this.Ge.get(e);return n||(n=new qf,this.Ge.set(e,n)),n}dt(e){let n=this.Je.get(e);return n||(n=new et(_e),this.Je=this.Je.insert(e,n)),n}Tt(e){let n=this.je.get(e);return n||(n=new et(_e),this.je=this.je.insert(e,n)),n}nt(e){const n=this.st(e)!==null;return n||Y("WatchChangeAggregator","Detected inactive target",e),n}st(e){const n=this.Ge.get(e);return n&&n.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new qf),this.We.getRemoteKeysForTarget(e).forEach((n=>{this.Xe(e,n,null)}))}It(e,n){return this.We.getRemoteKeysForTarget(e).has(n)}}function Uo(){return new $e(re.comparator)}function zf(){return new $e(re.comparator)}const IR={asc:"ASCENDING",desc:"DESCENDING"},AR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},bR={and:"AND",or:"OR"};class RR{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Tc(t,e){return t.useProto3Json||Ga(e)?e:{value:e}}function Aa(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function E_(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function SR(t,e){return Aa(t,e.toTimestamp())}function vn(t){return Ce(!!t,49232),de.fromTimestamp((function(n){const r=Tr(n);return new Me(r.seconds,r.nanos)})(t))}function Su(t,e){return wc(t,e).canonicalString()}function wc(t,e){const n=(function(s){return new je(["projects",s.projectId,"databases",s.database])})(t).child("documents");return e===void 0?n:n.child(e)}function T_(t){const e=je.fromString(t);return Ce(R_(e),10190,{key:e.toString()}),e}function Ic(t,e){return Su(t.databaseId,e.path)}function Ll(t,e){const n=T_(e);if(n.get(1)!==t.databaseId.projectId)throw new te(j.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new te(j.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new re(I_(n))}function w_(t,e){return Su(t.databaseId,e)}function PR(t){const e=T_(t);return e.length===4?je.emptyPath():I_(e)}function Ac(t){return new je(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function I_(t){return Ce(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function Gf(t,e,n){return{name:Ic(t,e),fields:n.value.mapValue.fields}}function CR(t,e){let n;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ae(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,d){return h.useProto3Json?(Ce(d===void 0||typeof d=="string",58123),ut.fromBase64String(d||"")):(Ce(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),ut.fromUint8Array(d||new Uint8Array))})(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&(function(h){const d=h.code===void 0?j.UNKNOWN:__(h.code);return new te(d,h.message||"")})(o);n=new v_(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ll(t,r.document.name),i=vn(r.document.updateTime),o=r.document.createTime?vn(r.document.createTime):de.min(),l=new Wt({mapValue:{fields:r.document.fields}}),c=_t.newFoundDocument(s,i,o,l),h=r.targetIds||[],d=r.removedTargetIds||[];n=new ta(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ll(t,r.document),i=r.readTime?vn(r.readTime):de.min(),o=_t.newNoDocument(s,i),l=r.removedTargetIds||[];n=new ta([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ll(t,r.document),i=r.removedTargetIds||[];n=new ta([],i,s,null)}else{if(!("filter"in e))return ae(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new vR(s,i),l=r.targetId;n=new y_(l,o)}}return n}function kR(t,e){let n;if(e instanceof co)n={update:Gf(t,e.key,e.value)};else if(e instanceof g_)n={delete:Ic(t,e.key)};else if(e instanceof es)n={update:Gf(t,e.key,e.data),updateMask:UR(e.fieldMask)};else{if(!(e instanceof gR))return ae(16599,{Rt:e.type});n={verify:Ic(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const l=o.transform;if(l instanceof Ki)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Qi)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ji)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ia)return{fieldPath:o.field.canonicalString(),increment:l.Ee};throw ae(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(n.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:SR(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ae(27497)})(t,e.precondition)),n}function OR(t,e){return t&&t.length>0?(Ce(e!==void 0,14353),t.map((n=>(function(s,i){let o=s.updateTime?vn(s.updateTime):vn(i);return o.isEqual(de.min())&&(o=vn(i)),new fR(o,s.transformResults||[])})(n,e)))):[]}function VR(t,e){return{documents:[w_(t,e.path)]}}function DR(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=w_(t,s);const i=(function(h){if(h.length!==0)return b_(An.create(h,"and"))})(e.filters);i&&(n.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((d=>(function(m){return{field:ds(m.field),direction:MR(m.dir)}})(d)))})(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Tc(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(n.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{Vt:n,parent:s}}function NR(t){let e=PR(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Ce(r===1,65062);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=(function(p){const m=A_(p);return m instanceof An&&e_(m)?m.getFilters():[m]})(n.where));let o=[];n.orderBy&&(o=(function(p){return p.map((m=>(function(P){return new wa(fs(P.field),(function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(P.direction))})(m)))})(n.orderBy));let l=null;n.limit&&(l=(function(p){let m;return m=typeof p=="object"?p.value:p,Ga(m)?null:m})(n.limit));let c=null;n.startAt&&(c=(function(p){const m=!!p.before,_=p.values||[];return new Ta(_,m)})(n.startAt));let h=null;return n.endAt&&(h=(function(p){const m=!p.before,_=p.values||[];return new Ta(_,m)})(n.endAt)),Xb(e,s,o,i,l,"F",c,h)}function xR(t,e){const n=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ae(28987,{purpose:s})}})(e.purpose);return n==null?null:{"goog-listen-tags":n}}function A_(t){return t.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=fs(n.unaryFilter.field);return Ze.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=fs(n.unaryFilter.field);return Ze.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=fs(n.unaryFilter.field);return Ze.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=fs(n.unaryFilter.field);return Ze.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ae(61313);default:return ae(60726)}})(t):t.fieldFilter!==void 0?(function(n){return Ze.create(fs(n.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ae(58110);default:return ae(50506)}})(n.fieldFilter.op),n.fieldFilter.value)})(t):t.compositeFilter!==void 0?(function(n){return An.create(n.compositeFilter.filters.map((r=>A_(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ae(1026)}})(n.compositeFilter.op))})(t):ae(30097,{filter:t})}function MR(t){return IR[t]}function LR(t){return AR[t]}function FR(t){return bR[t]}function ds(t){return{fieldPath:t.canonicalString()}}function fs(t){return ct.fromServerFormat(t.fieldPath)}function b_(t){return t instanceof Ze?(function(n){if(n.op==="=="){if(Df(n.value))return{unaryFilter:{field:ds(n.field),op:"IS_NAN"}};if(Vf(n.value))return{unaryFilter:{field:ds(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Df(n.value))return{unaryFilter:{field:ds(n.field),op:"IS_NOT_NAN"}};if(Vf(n.value))return{unaryFilter:{field:ds(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ds(n.field),op:LR(n.op),value:n.value}}})(t):t instanceof An?(function(n){const r=n.getFilters().map((s=>b_(s)));return r.length===1?r[0]:{compositeFilter:{op:FR(n.op),filters:r}}})(t):ae(54877,{filter:t})}function UR(t){const e=[];return t.fields.forEach((n=>e.push(n.canonicalString()))),{fieldPaths:e}}function R_(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e,n,r,s,i=de.min(),o=de.min(),l=ut.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new cr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new cr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new cr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new cr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BR{constructor(e){this.gt=e}}function jR(t){const e=NR({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Ec(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $R{constructor(){this.Dn=new HR}addToCollectionParentIndex(e,n){return this.Dn.add(n),F.resolve()}getCollectionParents(e,n){return F.resolve(this.Dn.getEntries(n))}addFieldIndex(e,n){return F.resolve()}deleteFieldIndex(e,n){return F.resolve()}deleteAllFieldIndexes(e){return F.resolve()}createTargetIndexes(e,n){return F.resolve()}getDocumentsMatchingTarget(e,n){return F.resolve(null)}getIndexType(e,n){return F.resolve(0)}getFieldIndexes(e,n){return F.resolve([])}getNextCollectionGroupToUpdate(e){return F.resolve(null)}getMinOffset(e,n){return F.resolve(Er.min())}getMinOffsetFromCollectionGroup(e,n){return F.resolve(Er.min())}updateCollectionGroup(e,n,r){return F.resolve()}updateIndexEntries(e,n){return F.resolve()}}class HR{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new et(je.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new et(je.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},S_=41943040;class Ot{static withCacheSize(e){return new Ot(e,Ot.DEFAULT_COLLECTION_PERCENTILE,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ot.DEFAULT_COLLECTION_PERCENTILE=10,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ot.DEFAULT=new Ot(S_,Ot.DEFAULT_COLLECTION_PERCENTILE,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ot.DISABLED=new Ot(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Ds(0)}static ur(){return new Ds(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf="LruGarbageCollector",qR=1048576;function Qf([t,e],[n,r]){const s=_e(t,n);return s===0?_e(e,r):s}class zR{constructor(e){this.Tr=e,this.buffer=new et(Qf),this.Ir=0}dr(){return++this.Ir}Er(e){const n=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Qf(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class GR{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){Y(Kf,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){$s(n)?Y(Kf,"Ignoring IndexedDB error during garbage collection: ",n):await js(n)}await this.Rr(3e5)}))}}class WR{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.mr(e).next((r=>Math.floor(n/100*r)))}nthSequenceNumber(e,n){if(n===0)return F.resolve(za.ue);const r=new zR(n);return this.Vr.forEachTarget(e,(s=>r.Er(s.sequenceNumber))).next((()=>this.Vr.gr(e,(s=>r.Er(s))))).next((()=>r.maxValue))}removeTargets(e,n,r){return this.Vr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(Y("LruGarbageCollector","Garbage collection skipped; disabled"),F.resolve(Wf)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(Y("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Wf):this.pr(e,n)))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,n){let r,s,i,o,l,c,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(Y("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,l=Date.now(),this.removeTargets(e,r,n)))).next((p=>(i=p,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(h=Date.now(),us()<=Ee.DEBUG&&Y("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(l-o)+`ms
	Removed ${i} targets in `+(c-l)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-d}ms`),F.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function KR(t,e){return new WR(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QR{constructor(){this.changes=new Zr((e=>e.toString()),((e,n)=>e.isEqual(n))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,_t.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?F.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JR{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YR{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,n)))).next((s=>(r!==null&&Ci(r.mutation,s,nn.empty(),Me.now()),s)))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.getLocalViewOfDocuments(e,r,Te()).next((()=>r))))}getLocalViewOfDocuments(e,n,r=Te()){const s=Ur();return this.populateOverlays(e,s,n).next((()=>this.computeViews(e,n,s,r).next((i=>{let o=hi();return i.forEach(((l,c)=>{o=o.insert(l,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,n){const r=Ur();return this.populateOverlays(e,r,n).next((()=>this.computeViews(e,n,r,Te())))}populateOverlays(e,n,r){const s=[];return r.forEach((i=>{n.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,l)=>{n.set(o,l)}))}))}computeViews(e,n,r,s){let i=zn();const o=Pi(),l=(function(){return Pi()})();return n.forEach(((c,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof es)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),Ci(d.mutation,h,d.mutation.getFieldMask(),Me.now())):o.set(h.key,nn.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((h,d)=>o.set(h,d))),n.forEach(((h,d)=>{var p;return l.set(h,new JR(d,(p=o.get(h))!==null&&p!==void 0?p:null))})),l)))}recalculateAndSaveOverlays(e,n){const r=Pi();let s=new $e(((o,l)=>o-l)),i=Te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next((o=>{for(const l of o)l.keys().forEach((c=>{const h=n.get(c);if(h===null)return;let d=r.get(c)||nn.empty();d=l.applyToLocalView(h,d),r.set(c,d);const p=(s.get(l.batchId)||Te()).add(c);s=s.insert(l.batchId,p)}))})).next((()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,d=c.value,p=l_();d.forEach((m=>{if(!i.has(m)){const _=p_(n.get(m),r.get(m));_!==null&&p.set(m,_),i=i.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return F.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,n,r,s){return(function(o){return re.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Zb(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):F.resolve(Ur());let l=qi,c=i;return o.next((h=>F.forEach(h,((d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?F.resolve():this.remoteDocumentCache.getEntry(e,d).next((m=>{c=c.insert(d,m)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,c,h,Te()))).next((d=>({batchId:l,changes:a_(d)})))))}))}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new re(n)).next((r=>{let s=hi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=hi();return this.indexManager.getCollectionParents(e,i).next((l=>F.forEach(l,(c=>{const h=(function(p,m){return new Ka(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((d=>{d.forEach(((p,m)=>{o=o.insert(p,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s)))).next((o=>{i.forEach(((c,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,_t.newInvalidDocument(d)))}));let l=hi();return o.forEach(((c,h)=>{const d=i.get(c);d!==void 0&&Ci(d.mutation,h,nn.empty(),Me.now()),Ja(n,h)&&(l=l.insert(c,h))})),l}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XR{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,n){return F.resolve(this.Br.get(n))}saveBundleMetadata(e,n){return this.Br.set(n.id,(function(s){return{id:s.id,version:s.version,createTime:vn(s.createTime)}})(n)),F.resolve()}getNamedQuery(e,n){return F.resolve(this.Lr.get(n))}saveNamedQuery(e,n){return this.Lr.set(n.name,(function(s){return{name:s.name,query:jR(s.bundledQuery),readTime:vn(s.readTime)}})(n)),F.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZR{constructor(){this.overlays=new $e(re.comparator),this.kr=new Map}getOverlay(e,n){return F.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Ur();return F.forEach(n,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,n,r){return r.forEach(((s,i)=>{this.wt(e,n,i)})),F.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.kr.delete(r)),F.resolve()}getOverlaysForCollection(e,n,r){const s=Ur(),i=n.length+1,o=new re(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return F.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new $e(((h,d)=>h-d));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=Ur(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const l=Ur(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,d)=>l.set(h,d))),!(l.size()>=s)););return F.resolve(l)}wt(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new yR(n,r));let i=this.kr.get(n);i===void 0&&(i=Te(),this.kr.set(n,i)),this.kr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(){this.sessionToken=ut.EMPTY_BYTE_STRING}getSessionToken(e){return F.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(){this.qr=new et(nt.Qr),this.$r=new et(nt.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,n){const r=new nt(e,n);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,n){e.forEach((r=>this.addReference(r,n)))}removeReference(e,n){this.Wr(new nt(e,n))}Gr(e,n){e.forEach((r=>this.removeReference(r,n)))}zr(e){const n=new re(new je([])),r=new nt(n,e),s=new nt(n,e+1),i=[];return this.$r.forEachInRange([r,s],(o=>{this.Wr(o),i.push(o.key)})),i}jr(){this.qr.forEach((e=>this.Wr(e)))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const n=new re(new je([])),r=new nt(n,e),s=new nt(n,e+1);let i=Te();return this.$r.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const n=new nt(e,0),r=this.qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class nt{constructor(e,n){this.key=e,this.Hr=n}static Qr(e,n){return re.comparator(e.key,n.key)||_e(e.Hr,n.Hr)}static Ur(e,n){return _e(e.Hr,n.Hr)||re.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.er=1,this.Yr=new et(nt.Qr)}checkEmpty(e){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new _R(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.Yr=this.Yr.add(new nt(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return F.resolve(o)}lookupMutationBatch(e,n){return F.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.Xr(r),i=s<0?0:s;return F.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?yu:this.er-1)}getAllMutationBatches(e){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new nt(n,0),s=new nt(n,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],(o=>{const l=this.Zr(o.Hr);i.push(l)})),F.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new et(_e);return n.forEach((s=>{const i=new nt(s,0),o=new nt(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,o],(l=>{r=r.add(l.Hr)}))})),F.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;re.isDocumentKey(i)||(i=i.child(""));const o=new nt(new re(i),0);let l=new et(_e);return this.Yr.forEachWhile((c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.Hr)),!0)}),o),F.resolve(this.ei(l))}ei(e){const n=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&n.push(s)})),n}removeMutationBatch(e,n){Ce(this.ti(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return F.forEach(n.mutations,(s=>{const i=new nt(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Yr=r}))}rr(e){}containsKey(e,n){const r=new nt(n,0),s=this.Yr.firstAfterOrEqual(r);return F.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,F.resolve()}ti(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e){this.ni=e,this.docs=(function(){return new $e(re.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.ni(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return F.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(n))}getEntries(e,n){let r=zn();return n.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():_t.newInvalidDocument(s))})),F.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=zn();const o=n.path,l=new re(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||kb(Cb(d),r)<=0||(s.has(d.key)||Ja(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return F.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ae(9500)}ri(e,n){return F.forEach(this.docs,(r=>n(r)))}newChangeBuffer(e){return new rS(this)}getSize(e){return F.resolve(this.size)}}class rS extends QR{constructor(e){super(),this.Or=e}applyChanges(e){const n=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?n.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)})),F.waitFor(n)}getFromCache(e,n){return this.Or.getEntry(e,n)}getAllFromCache(e,n){return this.Or.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sS{constructor(e){this.persistence=e,this.ii=new Zr((n=>Tu(n)),wu),this.lastRemoteSnapshotVersion=de.min(),this.highestTargetId=0,this.si=0,this.oi=new Pu,this.targetCount=0,this._i=Ds.ar()}forEachTarget(e,n){return this.ii.forEach(((r,s)=>n(s))),F.resolve()}getLastRemoteSnapshotVersion(e){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return F.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.si&&(this.si=n),F.resolve()}hr(e){this.ii.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this._i=new Ds(n),this.highestTargetId=n),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,n){return this.hr(n),this.targetCount+=1,F.resolve()}updateTargetData(e,n){return this.hr(n),F.resolve()}removeTargetData(e,n){return this.ii.delete(n.target),this.oi.zr(n.targetId),this.targetCount-=1,F.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.ii.forEach(((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.ii.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)})),F.waitFor(i).next((()=>s))}getTargetCount(e){return F.resolve(this.targetCount)}getTargetData(e,n){const r=this.ii.get(n)||null;return F.resolve(r)}addMatchingKeys(e,n,r){return this.oi.Kr(n,r),F.resolve()}removeMatchingKeys(e,n,r){this.oi.Gr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),F.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.oi.zr(n),F.resolve()}getMatchingKeysForTargetId(e,n){const r=this.oi.Jr(n);return F.resolve(r)}containsKey(e,n){return F.resolve(this.oi.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e,n){this.ai={},this.overlays={},this.ui=new za(0),this.ci=!1,this.ci=!0,this.li=new eS,this.referenceDelegate=e(this),this.hi=new sS(this),this.indexManager=new $R,this.remoteDocumentCache=(function(s){return new nS(s)})((r=>this.referenceDelegate.Pi(r))),this.serializer=new BR(n),this.Ti=new XR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new ZR,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ai[e.toKey()];return r||(r=new tS(n,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,n,r){Y("MemoryPersistence","Starting transaction:",e);const s=new iS(this.ui.next());return this.referenceDelegate.Ii(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ei(e,n){return F.or(Object.values(this.ai).map((r=>()=>r.containsKey(e,n))))}}class iS extends Vb{constructor(e){super(),this.currentSequenceNumber=e}}class Cu{constructor(e){this.persistence=e,this.Ai=new Pu,this.Ri=null}static Vi(e){return new Cu(e)}get mi(){if(this.Ri)return this.Ri;throw ae(60996)}addReference(e,n,r){return this.Ai.addReference(r,n),this.mi.delete(r.toString()),F.resolve()}removeReference(e,n,r){return this.Ai.removeReference(r,n),this.mi.add(r.toString()),F.resolve()}markPotentiallyOrphaned(e,n){return this.mi.add(n.toString()),F.resolve()}removeTarget(e,n){this.Ai.zr(n.targetId).forEach((s=>this.mi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next((s=>{s.forEach((i=>this.mi.add(i.toString())))})).next((()=>r.removeTargetData(e,n)))}Ii(){this.Ri=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.mi,(r=>{const s=re.fromPath(r);return this.fi(e,s).next((i=>{i||n.removeEntry(s,de.min())}))})).next((()=>(this.Ri=null,n.apply(e))))}updateLimboDocument(e,n){return this.fi(e,n).next((r=>{r?this.mi.delete(n.toString()):this.mi.add(n.toString())}))}Pi(e){return 0}fi(e,n){return F.or([()=>F.resolve(this.Ai.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ei(e,n)])}}class ba{constructor(e,n){this.persistence=e,this.gi=new Zr((r=>xb(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=KR(this,n)}static Vi(e,n){return new ba(e,n)}Ii(){}di(e){return F.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}mr(e){const n=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>n.next((s=>r+s))))}yr(e){let n=0;return this.gr(e,(r=>{n++})).next((()=>n))}gr(e,n){return F.forEach(this.gi,((r,s)=>this.Sr(e,r,s).next((i=>i?F.resolve():n(s)))))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,(o=>this.Sr(e,o,n).next((l=>{l||(r++,i.removeEntry(o,de.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,n){return this.gi.set(n,e.currentSequenceNumber),F.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.gi.set(r,e.currentSequenceNumber),F.resolve()}removeReference(e,n,r){return this.gi.set(r,e.currentSequenceNumber),F.resolve()}updateLimboDocument(e,n){return this.gi.set(n,e.currentSequenceNumber),F.resolve()}Pi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Xo(e.data.value)),n}Sr(e,n,r){return F.or([()=>this.persistence.Ei(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.gi.get(n);return F.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Is=r,this.ds=s}static Es(e,n){let r=Te(),s=Te();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ku(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aS{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=(function(){return Mw()?8:Db(Tt())>0?6:4})()}initialize(e,n){this.gs=e,this.indexManager=n,this.As=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ps(e,n).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ys(e,n,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new oS;return this.ws(e,n,o).next((l=>{if(i.result=l,this.Rs)return this.Ss(e,n,o,l.size)}))})).next((()=>i.result))}Ss(e,n,r,s){return r.documentReadCount<this.Vs?(us()<=Ee.DEBUG&&Y("QueryEngine","SDK will not create cache indexes for query:",hs(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),F.resolve()):(us()<=Ee.DEBUG&&Y("QueryEngine","Query:",hs(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(us()<=Ee.DEBUG&&Y("QueryEngine","The SDK decides to create cache indexes for query:",hs(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,yn(n))):F.resolve())}ps(e,n){if(Lf(n))return F.resolve(null);let r=yn(n);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(n.limit!==null&&s===1&&(n=Ec(n,null,"F"),r=yn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=Te(...i);return this.gs.getDocuments(e,o).next((l=>this.indexManager.getMinOffset(e,r).next((c=>{const h=this.bs(n,l);return this.Ds(n,h,o,c.readTime)?this.ps(e,Ec(n,null,"F")):this.vs(e,h,n,c)}))))})))))}ys(e,n,r,s){return Lf(n)||s.isEqual(de.min())?F.resolve(null):this.gs.getDocuments(e,r).next((i=>{const o=this.bs(n,i);return this.Ds(n,o,r,s)?F.resolve(null):(us()<=Ee.DEBUG&&Y("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),hs(n)),this.vs(e,o,n,Pb(s,qi)).next((l=>l)))}))}bs(e,n){let r=new et(i_(e));return n.forEach(((s,i)=>{Ja(e,i)&&(r=r.add(i))})),r}Ds(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,n,r){return us()<=Ee.DEBUG&&Y("QueryEngine","Using full collection scan to execute query:",hs(n)),this.gs.getDocumentsMatchingQuery(e,n,Er.min(),r)}vs(e,n,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next((i=>(n.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou="LocalStore",lS=3e8;class cS{constructor(e,n,r,s){this.persistence=e,this.Cs=n,this.serializer=s,this.Fs=new $e(_e),this.Ms=new Zr((i=>Tu(i)),wu),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new YR(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(n=>e.collect(n,this.Fs)))}}function uS(t,e,n,r){return new cS(t,e,n,r)}async function C_(t,e){const n=fe(t);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,n.Ns(e),n.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],l=[];let c=Te();for(const h of s){o.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){l.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(r,c).next((h=>({Bs:h,removedBatchIds:o,addedBatchIds:l})))}))}))}function hS(t,e){const n=fe(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=n.Os.newChangeBuffer({trackRemovals:!0});return(function(l,c,h,d){const p=h.batch,m=p.keys();let _=F.resolve();return m.forEach((P=>{_=_.next((()=>d.getEntry(c,P))).next((V=>{const S=h.docVersions.get(P);Ce(S!==null,48541),V.version.compareTo(S)<0&&(p.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),d.addEntry(V)))}))})),_.next((()=>l.mutationQueue.removeMutationBatch(c,p)))})(n,r,e,i).next((()=>i.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let c=Te();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c})(e)))).next((()=>n.localDocuments.getDocuments(r,s)))}))}function k_(t){const e=fe(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>e.hi.getLastRemoteSnapshotVersion(n)))}function dS(t,e){const n=fe(t),r=e.snapshotVersion;let s=n.Fs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=n.Os.newChangeBuffer({trackRemovals:!0});s=n.Fs;const l=[];e.targetChanges.forEach(((d,p)=>{const m=s.get(p);if(!m)return;l.push(n.hi.removeMatchingKeys(i,d.removedDocuments,p).next((()=>n.hi.addMatchingKeys(i,d.addedDocuments,p))));let _=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?_=_.withResumeToken(ut.EMPTY_BYTE_STRING,de.min()).withLastLimboFreeSnapshotVersion(de.min()):d.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(d.resumeToken,r)),s=s.insert(p,_),(function(V,S,x){return V.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=lS?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0})(m,_,d)&&l.push(n.hi.updateTargetData(i,_))}));let c=zn(),h=Te();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))})),l.push(fS(i,o,e.documentUpdates).next((d=>{c=d.Ls,h=d.ks}))),!r.isEqual(de.min())){const d=n.hi.getLastRemoteSnapshotVersion(i).next((p=>n.hi.setTargetsMetadata(i,i.currentSequenceNumber,r)));l.push(d)}return F.waitFor(l).next((()=>o.apply(i))).next((()=>n.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(n.Fs=s,i)))}function fS(t,e,n){let r=Te(),s=Te();return n.forEach((i=>r=r.add(i))),e.getEntries(t,r).next((i=>{let o=zn();return n.forEach(((l,c)=>{const h=i.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(de.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):Y(Ou,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)})),{Ls:o,ks:s}}))}function pS(t,e){const n=fe(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=yu),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function mS(t,e){const n=fe(t);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return n.hi.getTargetData(r,e).next((i=>i?(s=i,F.resolve(s)):n.hi.allocateTargetId(r).next((o=>(s=new cr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.hi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=n.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Fs=n.Fs.insert(r.targetId,r),n.Ms.set(e,r.targetId)),r}))}async function bc(t,e,n){const r=fe(t),s=r.Fs.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!$s(o))throw o;Y(Ou,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function Jf(t,e,n){const r=fe(t);let s=de.min(),i=Te();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,h,d){const p=fe(c),m=p.Ms.get(d);return m!==void 0?F.resolve(p.Fs.get(m)):p.hi.getTargetData(h,d)})(r,o,yn(e)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(o,l.targetId).next((c=>{i=c}))})).next((()=>r.Cs.getDocumentsMatchingQuery(o,e,n?s:de.min(),n?i:Te()))).next((l=>(gS(r,tR(e),l),{documents:l,qs:i})))))}function gS(t,e,n){let r=t.xs.get(e)||de.min();n.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),t.xs.set(e,r)}class Yf{constructor(){this.activeTargetIds=aR()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class _S{constructor(){this.Fo=new Yf,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,n,r){this.Mo[e]=n}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Yf,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yS{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf="ConnectivityMonitor";class Zf{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){Y(Xf,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){Y(Xf,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bo=null;function Rc(){return Bo===null?Bo=(function(){return 268435456+Math.round(2147483648*Math.random())})():Bo++,"0x"+Bo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="RestConnection",vS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ES{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=n+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===va?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,n,r,s,i){const o=Rc(),l=this.Go(e,n.toUriEncodedString());Y(Fl,`Sending RPC '${e}' ${o}:`,l,r);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(c,s,i);const{host:h}=new URL(l),d=Ls(h);return this.jo(e,l,c,r,d).then((p=>(Y(Fl,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw vr(Fl,`RPC '${e}' ${o} failed with error: `,p,"url: ",l,"request:",r),p}))}Jo(e,n,r,s,i,o){return this.Wo(e,n,r,s,i)}zo(e,n,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Bs})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Go(e,n){const r=vS[e];return`${this.$o}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="WebChannelConnection";class wS extends ES{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,n,r,s,i){const o=Rc();return new Promise(((l,c)=>{const h=new Dg;h.setWithCredentials(!0),h.listenOnce(Ng.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Yo.NO_ERROR:const p=h.getResponseJson();Y(pt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),l(p);break;case Yo.TIMEOUT:Y(pt,`RPC '${e}' ${o} timed out`),c(new te(j.DEADLINE_EXCEEDED,"Request time out"));break;case Yo.HTTP_ERROR:const m=h.getStatus();if(Y(pt,`RPC '${e}' ${o} failed with status:`,m,"response text:",h.getResponseText()),m>0){let _=h.getResponseJson();Array.isArray(_)&&(_=_[0]);const P=_==null?void 0:_.error;if(P&&P.status&&P.message){const V=(function(x){const B=x.toLowerCase().replace(/_/g,"-");return Object.values(j).indexOf(B)>=0?B:j.UNKNOWN})(P.status);c(new te(V,P.message))}else c(new te(j.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new te(j.UNAVAILABLE,"Connection failed."));break;default:ae(9055,{c_:e,streamId:o,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{Y(pt,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);Y(pt,`RPC '${e}' ${o} sending request:`,s),h.send(n,"POST",d,r,15)}))}P_(e,n,r){const s=Rc(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Lg(),l=Mg(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.zo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const d=i.join("");Y(pt,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=o.createWebChannel(d,c);this.T_(p);let m=!1,_=!1;const P=new TS({Ho:S=>{_?Y(pt,`Not sending because RPC '${e}' stream ${s} is closed:`,S):(m||(Y(pt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),Y(pt,`RPC '${e}' stream ${s} sending:`,S),p.send(S))},Yo:()=>p.close()}),V=(S,x,B)=>{S.listen(x,(H=>{try{B(H)}catch(z){setTimeout((()=>{throw z}),0)}}))};return V(p,ui.EventType.OPEN,(()=>{_||(Y(pt,`RPC '${e}' stream ${s} transport opened.`),P.s_())})),V(p,ui.EventType.CLOSE,(()=>{_||(_=!0,Y(pt,`RPC '${e}' stream ${s} transport closed`),P.__(),this.I_(p))})),V(p,ui.EventType.ERROR,(S=>{_||(_=!0,vr(pt,`RPC '${e}' stream ${s} transport errored. Name:`,S.name,"Message:",S.message),P.__(new te(j.UNAVAILABLE,"The operation could not be completed")))})),V(p,ui.EventType.MESSAGE,(S=>{var x;if(!_){const B=S.data[0];Ce(!!B,16349);const H=B,z=(H==null?void 0:H.error)||((x=H[0])===null||x===void 0?void 0:x.error);if(z){Y(pt,`RPC '${e}' stream ${s} received error:`,z);const he=z.status;let ue=(function(E){const b=Je[E];if(b!==void 0)return __(b)})(he),A=z.message;ue===void 0&&(ue=j.INTERNAL,A="Unknown error status: "+he+" with message "+z.message),_=!0,P.__(new te(ue,A)),p.close()}else Y(pt,`RPC '${e}' stream ${s} received:`,B),P.a_(B)}})),V(l,xg.STAT_EVENT,(S=>{S.stat===pc.PROXY?Y(pt,`RPC '${e}' stream ${s} detected buffering proxy`):S.stat===pc.NOPROXY&&Y(pt,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{P.o_()}),0),P}terminate(){this.u_.forEach((e=>e.close())),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter((n=>n===e))}}function Ul(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(t){return new RR(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Fi=e,this.timerId=n,this.d_=r,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const n=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,n-r);s>0&&Y("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep="PersistentStream";class V_{constructor(e,n,r,s,i,o,l,c){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new O_(e,n)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():n&&n.code===j.RESOURCE_EXHAUSTED?(qn(n.toString()),qn("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):n&&n.code===j.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(n)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),n=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===n&&this.W_(r,s)}),(r=>{e((()=>{const s=new te(j.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}W_(e,n){const r=this.K_(this.b_);this.stream=this.z_(e,n),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.e_((()=>{r((()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.e_())))})),this.stream.n_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.C_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return Y(ep,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return n=>{this.Fi.enqueueAndForget((()=>this.b_===e?n():(Y(ep,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class IS extends V_{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}z_(e,n){return this.connection.P_("Listen",e,n)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const n=CR(this.serializer,e),r=(function(i){if(!("targetChange"in i))return de.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?de.min():o.readTime?vn(o.readTime):de.min()})(e);return this.listener.J_(n,r)}H_(e){const n={};n.database=Ac(this.serializer),n.addTarget=(function(i,o){let l;const c=o.target;if(l=vc(c)?{documents:VR(i,c)}:{query:DR(i,c).Vt},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=E_(i,o.resumeToken);const h=Tc(i,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(de.min())>0){l.readTime=Aa(i,o.snapshotVersion.toTimestamp());const h=Tc(i,o.expectedCount);h!==null&&(l.expectedCount=h)}return l})(this.serializer,e);const r=xR(this.serializer,e);r&&(n.labels=r),this.k_(n)}Y_(e){const n={};n.database=Ac(this.serializer),n.removeTarget=e,this.k_(n)}}class AS extends V_{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,n){return this.connection.P_("Write",e,n)}j_(e){return Ce(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Ce(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){Ce(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const n=OR(e.writeResults,e.commitTime),r=vn(e.commitTime);return this.listener.ta(r,n)}na(){const e={};e.database=Ac(this.serializer),this.k_(e)}X_(e){const n={streamToken:this.lastStreamToken,writes:e.map((r=>kR(this.serializer,r)))};this.k_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{}class RS extends bS{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new te(j.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,wc(n,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new te(j.UNKNOWN,i.toString())}))}Jo(e,n,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.Jo(e,wc(n,r),s,o,l,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new te(j.UNKNOWN,o.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}class SS{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(qn(n),this._a=!1):Y("OnlineStateTracker",n)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr="RemoteStore";class PS{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo((o=>{r.enqueueAndForget((async()=>{ts(this)&&(Y(Jr,"Restarting streams for network reachability change."),await(async function(c){const h=fe(c);h.Ia.add(4),await ho(h),h.Aa.set("Unknown"),h.Ia.delete(4),await tl(h)})(this))}))})),this.Aa=new SS(r,s)}}async function tl(t){if(ts(t))for(const e of t.da)await e(!0)}async function ho(t){for(const e of t.da)await e(!1)}function D_(t,e){const n=fe(t);n.Ta.has(e.targetId)||(n.Ta.set(e.targetId,e),xu(n)?Nu(n):Hs(n).x_()&&Du(n,e))}function Vu(t,e){const n=fe(t),r=Hs(n);n.Ta.delete(e),r.x_()&&N_(n,e),n.Ta.size===0&&(r.x_()?r.B_():ts(n)&&n.Aa.set("Unknown"))}function Du(t,e){if(t.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(de.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Hs(t).H_(e)}function N_(t,e){t.Ra.$e(e),Hs(t).Y_(e)}function Nu(t){t.Ra=new wR({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>t.Ta.get(e)||null,lt:()=>t.datastore.serializer.databaseId}),Hs(t).start(),t.Aa.aa()}function xu(t){return ts(t)&&!Hs(t).M_()&&t.Ta.size>0}function ts(t){return fe(t).Ia.size===0}function x_(t){t.Ra=void 0}async function CS(t){t.Aa.set("Online")}async function kS(t){t.Ta.forEach(((e,n)=>{Du(t,e)}))}async function OS(t,e){x_(t),xu(t)?(t.Aa.la(e),Nu(t)):t.Aa.set("Unknown")}async function VS(t,e,n){if(t.Aa.set("Online"),e instanceof v_&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const l of i.targetIds)s.Ta.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.Ta.delete(l),s.Ra.removeTarget(l))})(t,e)}catch(r){Y(Jr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ra(t,r)}else if(e instanceof ta?t.Ra.Ye(e):e instanceof y_?t.Ra.it(e):t.Ra.et(e),!n.isEqual(de.min()))try{const r=await k_(t.localStore);n.compareTo(r)>=0&&await(function(i,o){const l=i.Ra.Pt(o);return l.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.Ta.get(h);d&&i.Ta.set(h,d.withResumeToken(c.resumeToken,o))}})),l.targetMismatches.forEach(((c,h)=>{const d=i.Ta.get(c);if(!d)return;i.Ta.set(c,d.withResumeToken(ut.EMPTY_BYTE_STRING,d.snapshotVersion)),N_(i,c);const p=new cr(d.target,c,h,d.sequenceNumber);Du(i,p)})),i.remoteSyncer.applyRemoteEvent(l)})(t,n)}catch(r){Y(Jr,"Failed to raise snapshot:",r),await Ra(t,r)}}async function Ra(t,e,n){if(!$s(e))throw e;t.Ia.add(1),await ho(t),t.Aa.set("Offline"),n||(n=()=>k_(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{Y(Jr,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await tl(t)}))}function M_(t,e){return e().catch((n=>Ra(t,n,e)))}async function nl(t){const e=fe(t),n=Ar(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:yu;for(;DS(e);)try{const s=await pS(e.localStore,r);if(s===null){e.Pa.length===0&&n.B_();break}r=s.batchId,NS(e,s)}catch(s){await Ra(e,s)}L_(e)&&F_(e)}function DS(t){return ts(t)&&t.Pa.length<10}function NS(t,e){t.Pa.push(e);const n=Ar(t);n.x_()&&n.Z_&&n.X_(e.mutations)}function L_(t){return ts(t)&&!Ar(t).M_()&&t.Pa.length>0}function F_(t){Ar(t).start()}async function xS(t){Ar(t).na()}async function MS(t){const e=Ar(t);for(const n of t.Pa)e.X_(n.mutations)}async function LS(t,e,n){const r=t.Pa.shift(),s=bu.from(r,e,n);await M_(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await nl(t)}async function FS(t,e){e&&Ar(t).Z_&&await(async function(r,s){if((function(o){return ER(o)&&o!==j.ABORTED})(s.code)){const i=r.Pa.shift();Ar(r).N_(),await M_(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await nl(r)}})(t,e),L_(t)&&F_(t)}async function tp(t,e){const n=fe(t);n.asyncQueue.verifyOperationInProgress(),Y(Jr,"RemoteStore received new credentials");const r=ts(n);n.Ia.add(3),await ho(n),r&&n.Aa.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await tl(n)}async function US(t,e){const n=fe(t);e?(n.Ia.delete(2),await tl(n)):e||(n.Ia.add(2),await ho(n),n.Aa.set("Unknown"))}function Hs(t){return t.Va||(t.Va=(function(n,r,s){const i=fe(n);return i.ia(),new IS(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(t.datastore,t.asyncQueue,{Zo:CS.bind(null,t),e_:kS.bind(null,t),n_:OS.bind(null,t),J_:VS.bind(null,t)}),t.da.push((async e=>{e?(t.Va.N_(),xu(t)?Nu(t):t.Aa.set("Unknown")):(await t.Va.stop(),x_(t))}))),t.Va}function Ar(t){return t.ma||(t.ma=(function(n,r,s){const i=fe(n);return i.ia(),new AS(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),e_:xS.bind(null,t),n_:FS.bind(null,t),ea:MS.bind(null,t),ta:LS.bind(null,t)}),t.da.push((async e=>{e?(t.ma.N_(),await nl(t)):(await t.ma.stop(),t.Pa.length>0&&(Y(Jr,`Stopping write stream with ${t.Pa.length} pending writes`),t.Pa=[]))}))),t.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new gr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new Mu(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new te(j.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Lu(t,e){if(qn("AsyncQueue",`${e}: ${t}`),$s(t))return new te(j.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{static emptySet(e){return new ws(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||re.comparator(n.key,r.key):(n,r)=>re.comparator(n.key,r.key),this.keyedMap=hi(),this.sortedSet=new $e(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((n,r)=>(e(n),!1)))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ws)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((n=>{e.push(n.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new ws;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(){this.fa=new $e(re.comparator)}track(e){const n=e.doc.key,r=this.fa.get(n);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(n,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(n):e.type===1&&r.type===2?this.fa=this.fa.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):ae(63341,{At:e,ga:r}):this.fa=this.fa.insert(n,e)}pa(){const e=[];return this.fa.inorderTraversal(((n,r)=>{e.push(r)})),e}}class Ns{constructor(e,n,r,s,i,o,l,c,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach((l=>{o.push({type:0,doc:l})})),new Ns(e,n,ws.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Qa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BS{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some((e=>e.ba()))}}class jS{constructor(){this.queries=rp(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(n,r){const s=fe(n),i=s.queries;s.queries=rp(),i.forEach(((o,l)=>{for(const c of l.wa)c.onError(r)}))})(this,new te(j.ABORTED,"Firestore shutting down"))}}function rp(){return new Zr((t=>s_(t)),Qa)}async function $S(t,e){const n=fe(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new BS,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await n.onListen(s,!0);break;case 1:i.ya=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=Lu(o,`Initialization of query '${hs(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.wa.push(e),e.va(n.onlineState),i.ya&&e.Ca(i.ya)&&Fu(n)}async function HS(t,e){const n=fe(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.wa.indexOf(e);o>=0&&(i.wa.splice(o,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function qS(t,e){const n=fe(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.wa)l.Ca(s)&&(r=!0);o.ya=s}}r&&Fu(n)}function zS(t,e,n){const r=fe(t),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(n);r.queries.delete(e)}function Fu(t){t.Da.forEach((e=>{e.next()}))}var Sc,sp;(sp=Sc||(Sc={})).Fa="default",sp.Cache="cache";class GS{constructor(e,n,r){this.query=e,this.Ma=n,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Ns(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),n=!0):this.Ba(e,this.onlineState)&&(this.La(e),n=!0),this.Oa=e,n}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let n=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),n=!0),n}Ba(e,n){if(!e.fromCache||!this.ba())return!0;const r=n!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const n=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}La(e){e=Ns.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Sc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(e){this.key=e}}class B_{constructor(e){this.key=e}}class WS{constructor(e,n){this.query=e,this.Ha=n,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=Te(),this.mutatedKeys=Te(),this.Xa=i_(e),this.eu=new ws(this.Xa)}get tu(){return this.Ha}nu(e,n){const r=n?n.ru:new np,s=n?n.eu:this.eu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,p)=>{const m=s.get(d),_=Ja(this.query,p)?p:null,P=!!m&&this.mutatedKeys.has(m.key),V=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let S=!1;m&&_?m.data.isEqual(_.data)?P!==V&&(r.track({type:3,doc:_}),S=!0):this.iu(m,_)||(r.track({type:2,doc:_}),S=!0,(c&&this.Xa(_,c)>0||h&&this.Xa(_,h)<0)&&(l=!0)):!m&&_?(r.track({type:0,doc:_}),S=!0):m&&!_&&(r.track({type:1,doc:m}),S=!0,(c||h)&&(l=!0)),S&&(_?(o=o.add(_),i=V?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{eu:o,ru:r,Ds:l,mutatedKeys:i}}iu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort(((d,p)=>(function(_,P){const V=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ae(20277,{At:S})}};return V(_)-V(P)})(d.type,p.type)||this.Xa(d.doc,p.doc))),this.su(r),s=s!=null&&s;const l=n&&!s?this.ou():[],c=this.Za.size===0&&this.current&&!s?1:0,h=c!==this.Ya;return this.Ya=c,o.length!==0||h?{snapshot:new Ns(this.query,e.eu,i,o,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new np,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach((n=>this.Ha=this.Ha.add(n))),e.modifiedDocuments.forEach((n=>{})),e.removedDocuments.forEach((n=>this.Ha=this.Ha.delete(n))),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=Te(),this.eu.forEach((r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))}));const n=[];return e.forEach((r=>{this.Za.has(r)||n.push(new B_(r))})),this.Za.forEach((r=>{e.has(r)||n.push(new U_(r))})),n}uu(e){this.Ha=e.qs,this.Za=Te();const n=this.nu(e.documents);return this.applyChanges(n,!0)}cu(){return Ns.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Uu="SyncEngine";class KS{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class QS{constructor(e){this.key=e,this.lu=!1}}class JS{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new Zr((l=>s_(l)),Qa),this.Tu=new Map,this.Iu=new Set,this.du=new $e(re.comparator),this.Eu=new Map,this.Au=new Pu,this.Ru={},this.Vu=new Map,this.mu=Ds.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function YS(t,e,n=!0){const r=G_(t);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await j_(r,e,n,!0),s}async function XS(t,e){const n=G_(t);await j_(n,e,!0,!1)}async function j_(t,e,n,r){const s=await mS(t.localStore,yn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await ZS(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&D_(t.remoteStore,s),l}async function ZS(t,e,n,r,s){t.gu=(p,m,_)=>(async function(V,S,x,B){let H=S.view.nu(x);H.Ds&&(H=await Jf(V.localStore,S.query,!1).then((({documents:A})=>S.view.nu(A,H))));const z=B&&B.targetChanges.get(S.targetId),he=B&&B.targetMismatches.get(S.targetId)!=null,ue=S.view.applyChanges(H,V.isPrimaryClient,z,he);return op(V,S.targetId,ue._u),ue.snapshot})(t,p,m,_);const i=await Jf(t.localStore,e,!0),o=new WS(e,i.qs),l=o.nu(i.documents),c=uo.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(l,t.isPrimaryClient,c);op(t,n,h._u);const d=new KS(e,n,o);return t.Pu.set(e,d),t.Tu.has(n)?t.Tu.get(n).push(e):t.Tu.set(n,[e]),h.snapshot}async function e1(t,e,n){const r=fe(t),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter((o=>!Qa(o,e)))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await bc(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Vu(r.remoteStore,s.targetId),Pc(r,s.targetId)})).catch(js)):(Pc(r,s.targetId),await bc(r.localStore,s.targetId,!0))}async function t1(t,e){const n=fe(t),r=n.Pu.get(e),s=n.Tu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Vu(n.remoteStore,r.targetId))}async function n1(t,e,n){const r=c1(t);try{const s=await(function(o,l){const c=fe(o),h=Me.now(),d=l.reduce(((_,P)=>_.add(P.key)),Te());let p,m;return c.persistence.runTransaction("Locally write mutations","readwrite",(_=>{let P=zn(),V=Te();return c.Os.getEntries(_,d).next((S=>{P=S,P.forEach(((x,B)=>{B.isValidDocument()||(V=V.add(x))}))})).next((()=>c.localDocuments.getOverlayedDocuments(_,P))).next((S=>{p=S;const x=[];for(const B of l){const H=mR(B,p.get(B.key).overlayedDocument);H!=null&&x.push(new es(B.key,H,Yg(H.value.mapValue),Ln.exists(!0)))}return c.mutationQueue.addMutationBatch(_,h,x,l)})).next((S=>{m=S;const x=S.applyToLocalDocumentSet(p,V);return c.documentOverlayCache.saveOverlays(_,S.batchId,x)}))})).then((()=>({batchId:m.batchId,changes:a_(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,l,c){let h=o.Ru[o.currentUser.toKey()];h||(h=new $e(_e)),h=h.insert(l,c),o.Ru[o.currentUser.toKey()]=h})(r,s.batchId,n),await fo(r,s.changes),await nl(r.remoteStore)}catch(s){const i=Lu(s,"Failed to persist write");n.reject(i)}}async function $_(t,e){const n=fe(t);try{const r=await dS(n.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=n.Eu.get(i);o&&(Ce(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.lu=!0:s.modifiedDocuments.size>0?Ce(o.lu,14607):s.removedDocuments.size>0&&(Ce(o.lu,42227),o.lu=!1))})),await fo(n,r,e)}catch(r){await js(r)}}function ip(t,e,n){const r=fe(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Pu.forEach(((i,o)=>{const l=o.view.va(e);l.snapshot&&s.push(l.snapshot)})),(function(o,l){const c=fe(o);c.onlineState=l;let h=!1;c.queries.forEach(((d,p)=>{for(const m of p.wa)m.va(l)&&(h=!0)})),h&&Fu(c)})(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function r1(t,e,n){const r=fe(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Eu.get(e),i=s&&s.key;if(i){let o=new $e(re.comparator);o=o.insert(i,_t.newNoDocument(i,de.min()));const l=Te().add(i),c=new Za(de.min(),new Map,new $e(_e),o,l);await $_(r,c),r.du=r.du.remove(i),r.Eu.delete(e),Bu(r)}else await bc(r.localStore,e,!1).then((()=>Pc(r,e,n))).catch(js)}async function s1(t,e){const n=fe(t),r=e.batch.batchId;try{const s=await hS(n.localStore,e);q_(n,r,null),H_(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await fo(n,s)}catch(s){await js(s)}}async function i1(t,e,n){const r=fe(t);try{const s=await(function(o,l){const c=fe(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let d;return c.mutationQueue.lookupMutationBatch(h,l).next((p=>(Ce(p!==null,37113),d=p.keys(),c.mutationQueue.removeMutationBatch(h,p)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,d,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d))).next((()=>c.localDocuments.getDocuments(h,d)))}))})(r.localStore,e);q_(r,e,n),H_(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await fo(r,s)}catch(s){await js(s)}}function H_(t,e){(t.Vu.get(e)||[]).forEach((n=>{n.resolve()})),t.Vu.delete(e)}function q_(t,e,n){const r=fe(t);let s=r.Ru[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ru[r.currentUser.toKey()]=s}}function Pc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Tu.get(e))t.Pu.delete(r),n&&t.hu.pu(r,n);t.Tu.delete(e),t.isPrimaryClient&&t.Au.zr(e).forEach((r=>{t.Au.containsKey(r)||z_(t,r)}))}function z_(t,e){t.Iu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Vu(t.remoteStore,n),t.du=t.du.remove(e),t.Eu.delete(n),Bu(t))}function op(t,e,n){for(const r of n)r instanceof U_?(t.Au.addReference(r.key,e),o1(t,r)):r instanceof B_?(Y(Uu,"Document no longer in limbo: "+r.key),t.Au.removeReference(r.key,e),t.Au.containsKey(r.key)||z_(t,r.key)):ae(19791,{yu:r})}function o1(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Iu.has(r)||(Y(Uu,"New document in limbo: "+n),t.Iu.add(r),Bu(t))}function Bu(t){for(;t.Iu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new re(je.fromString(e)),r=t.mu.next();t.Eu.set(r,new QS(n)),t.du=t.du.insert(n,r),D_(t.remoteStore,new cr(yn(Iu(n.path)),r,"TargetPurposeLimboResolution",za.ue))}}async function fo(t,e,n){const r=fe(t),s=[],i=[],o=[];r.Pu.isEmpty()||(r.Pu.forEach(((l,c)=>{o.push(r.gu(c,e,n).then((h=>{var d;if((h||n)&&r.isPrimaryClient){const p=h?!h.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=ku.Es(c.targetId,h);i.push(p)}})))})),await Promise.all(o),r.hu.J_(s),await(async function(c,h){const d=fe(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>F.forEach(h,(m=>F.forEach(m.Is,(_=>d.persistence.referenceDelegate.addReference(p,m.targetId,_))).next((()=>F.forEach(m.ds,(_=>d.persistence.referenceDelegate.removeReference(p,m.targetId,_)))))))))}catch(p){if(!$s(p))throw p;Y(Ou,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const _=d.Fs.get(m),P=_.snapshotVersion,V=_.withLastLimboFreeSnapshotVersion(P);d.Fs=d.Fs.insert(m,V)}}})(r.localStore,i))}async function a1(t,e){const n=fe(t);if(!n.currentUser.isEqual(e)){Y(Uu,"User change. New user:",e.toKey());const r=await C_(n.localStore,e);n.currentUser=e,(function(i,o){i.Vu.forEach((l=>{l.forEach((c=>{c.reject(new te(j.CANCELLED,o))}))})),i.Vu.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await fo(n,r.Bs)}}function l1(t,e){const n=fe(t),r=n.Eu.get(e);if(r&&r.lu)return Te().add(r.key);{let s=Te();const i=n.Tu.get(e);if(!i)return s;for(const o of i){const l=n.Pu.get(o);s=s.unionWith(l.view.tu)}return s}}function G_(t){const e=fe(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=$_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=l1.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=r1.bind(null,e),e.hu.J_=qS.bind(null,e.eventManager),e.hu.pu=zS.bind(null,e.eventManager),e}function c1(t){const e=fe(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=s1.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=i1.bind(null,e),e}class Sa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=el(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,n){return null}Fu(e,n){return null}vu(e){return uS(this.persistence,new aS,e.initialUser,this.serializer)}Du(e){return new P_(Cu.Vi,this.serializer)}bu(e){return new _S}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Sa.provider={build:()=>new Sa};class u1 extends Sa{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,n){Ce(this.persistence.referenceDelegate instanceof ba,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new GR(r,e.asyncQueue,n)}Du(e){const n=this.cacheSizeBytes!==void 0?Ot.withCacheSize(this.cacheSizeBytes):Ot.DEFAULT;return new P_((r=>ba.Vi(r,n)),this.serializer)}}class Cc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ip(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=a1.bind(null,this.syncEngine),await US(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new jS})()}createDatastore(e){const n=el(e.databaseInfo.databaseId),r=(function(i){return new wS(i)})(e.databaseInfo);return(function(i,o,l,c){return new RS(i,o,l,c)})(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return(function(r,s,i,o,l){return new PS(r,s,i,o,l)})(this.localStore,this.datastore,e.asyncQueue,(n=>ip(this.syncEngine,n,0)),(function(){return Zf.C()?new Zf:new yS})())}createSyncEngine(e,n){return(function(s,i,o,l,c,h,d){const p=new JS(s,i,o,l,c,h);return d&&(p.fu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await(async function(s){const i=fe(s);Y(Jr,"RemoteStore shutting down."),i.Ia.add(5),await ho(i),i.Ea.shutdown(),i.Aa.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Cc.provider={build:()=>new Cc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h1{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):qn("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,n){setTimeout((()=>{this.muted||e(n)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const br="FirestoreClient";class d1{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=mt.UNAUTHENTICATED,this.clientId=gu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{Y(br,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(Y(br,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new gr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Lu(n,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Bl(t,e){t.asyncQueue.verifyOperationInProgress(),Y(br,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async s=>{r.isEqual(s)||(await C_(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>{vr("Terminating Firestore due to IndexedDb database deletion"),t.terminate().then((()=>{Y("Terminating Firestore due to IndexedDb database deletion completed successfully")})).catch((s=>{vr("Terminating Firestore due to IndexedDb database deletion failed",s)}))})),t._offlineComponents=e}async function ap(t,e){t.asyncQueue.verifyOperationInProgress();const n=await f1(t);Y(br,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener((r=>tp(e.remoteStore,r))),t.setAppCheckTokenChangeListener(((r,s)=>tp(e.remoteStore,s))),t._onlineComponents=e}async function f1(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){Y(br,"Using user provided OfflineComponentProvider");try{await Bl(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!(function(s){return s.name==="FirebaseError"?s.code===j.FAILED_PRECONDITION||s.code===j.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(n))throw n;vr("Error using user provided cache. Falling back to memory cache: "+n),await Bl(t,new Sa)}}else Y(br,"Using default OfflineComponentProvider"),await Bl(t,new u1(void 0));return t._offlineComponents}async function W_(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(Y(br,"Using user provided OnlineComponentProvider"),await ap(t,t._uninitializedComponentsProvider._online)):(Y(br,"Using default OnlineComponentProvider"),await ap(t,new Cc))),t._onlineComponents}function p1(t){return W_(t).then((e=>e.syncEngine))}async function m1(t){const e=await W_(t),n=e.eventManager;return n.onListen=YS.bind(null,e.syncEngine),n.onUnlisten=e1.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=XS.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=t1.bind(null,e.syncEngine),n}function g1(t,e,n={}){const r=new gr;return t.asyncQueue.enqueueAndForget((async()=>(function(i,o,l,c,h){const d=new h1({next:m=>{d.Ou(),o.enqueueAndForget((()=>HS(i,p)));const _=m.docs.has(l);!_&&m.fromCache?h.reject(new te(j.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&m.fromCache&&c&&c.source==="server"?h.reject(new te(j.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new GS(Iu(l.path),d,{includeMetadataChanges:!0,ka:!0});return $S(i,p)})(await m1(t),t.asyncQueue,e,n,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q_="firestore.googleapis.com",cp=!0;class up{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new te(j.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Q_,this.ssl=cp}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:cp;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=S_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qR)throw new te(j.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Sb("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=K_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new te(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new te(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new te(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ju{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new up({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new te(j.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new te(j.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new up(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new _b;switch(r.type){case"firstParty":return new Tb(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new te(j.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=lp.get(n);r&&(Y("ComponentProvider","Removing Datastore"),lp.delete(n),r.terminate())})(this),Promise.resolve()}}function _1(t,e,n,r={}){var s;t=Hi(t,ju);const i=Ls(e),o=t._getSettings(),l=Object.assign(Object.assign({},o),{emulatorOptions:t._getEmulatorOptions()}),c=`${e}:${n}`;i&&(zm(`https://${c}`),Gm("Firestore",!0)),o.host!==Q_&&o.host!==c&&vr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},o),{host:c,ssl:i,emulatorOptions:r});if(!zr(h,l)&&(t._setSettings(h),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=mt.MOCK_USER;else{d=Sw(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new te(j.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new mt(m)}t._authCredentials=new yb(new Ug(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new $u(this.firestore,e,this._query)}}class rt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Yi(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new rt(this.firestore,e,this._key)}toJSON(){return{type:rt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(lo(n,rt._jsonSchema))return new rt(e,r||null,new re(je.fromString(n.referencePath)))}}rt._jsonSchemaVersion="firestore/documentReference/1.0",rt._jsonSchema={type:Ye("string",rt._jsonSchemaVersion),referencePath:Ye("string")};class Yi extends $u{constructor(e,n,r){super(e,n,Iu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new rt(this.firestore,null,new re(e))}withConverter(e){return new Yi(this.firestore,e,this._path)}}function Hu(t,e,...n){if(t=$t(t),arguments.length===1&&(e=gu.newId()),Rb("doc","path",e),t instanceof ju){const r=je.fromString(e,...n);return Af(r),new rt(t,null,new re(r))}{if(!(t instanceof rt||t instanceof Yi))throw new te(j.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(je.fromString(e,...n));return Af(r),new rt(t.firestore,t instanceof Yi?t.converter:null,new re(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp="AsyncQueue";class dp{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new O_(this,"async_queue_retry"),this.oc=()=>{const r=Ul();r&&Y(hp,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const n=Ul();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const n=Ul();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise((()=>{}));const n=new gr;return this.uc((()=>this.Xu&&this.rc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Zu.push(e),this.cc())))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!$s(e))throw e;Y(hp,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_((()=>this.cc()))}}uc(e){const n=this._c.then((()=>(this.nc=!0,e().catch((r=>{throw this.tc=r,this.nc=!1,qn("INTERNAL UNHANDLED ERROR: ",fp(r)),r})).then((r=>(this.nc=!1,r))))));return this._c=n,n}enqueueAfterDelay(e,n,r){this.ac(),this.sc.indexOf(e)>-1&&(n=0);const s=Mu.createAndSchedule(this,e,n,r,(i=>this.lc(i)));return this.ec.push(s),s}ac(){this.tc&&ae(47125,{hc:fp(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const n of this.ec)if(n.timerId===e)return!0;return!1}Ic(e){return this.Pc().then((()=>{this.ec.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.ec)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Pc()}))}dc(e){this.sc.push(e)}lc(e){const n=this.ec.indexOf(e);this.ec.splice(n,1)}}function fp(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class qu extends ju{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new dp,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new dp(e),this._firestoreClient=void 0,await e}}}function y1(t,e){const n=typeof t=="object"?t:Jm(),r=typeof t=="string"?t:va,s=ru(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=bw("firestore");i&&_1(s,...i)}return s}function J_(t){if(t._terminated)throw new te(j.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||v1(t),t._firestoreClient}function v1(t){var e,n,r;const s=t._freezeSettings(),i=(function(l,c,h,d){return new Fb(l,c,h,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,K_(d.experimentalLongPollingOptions),d.useFetchStreams,d.isUsingEmulator)})(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new d1(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&(function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}})(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Kt(ut.fromBase64String(e))}catch(n){throw new te(j.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Kt(ut.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Kt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(lo(e,Kt._jsonSchema))return Kt.fromBase64String(e.bytes)}}Kt._jsonSchemaVersion="firestore/bytes/1.0",Kt._jsonSchema={type:Ye("string",Kt._jsonSchemaVersion),bytes:Ye("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new te(j.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ct(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new te(j.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new te(j.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return _e(this._lat,e._lat)||_e(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:En._jsonSchemaVersion}}static fromJSON(e){if(lo(e,En._jsonSchema))return new En(e.latitude,e.longitude)}}En._jsonSchemaVersion="firestore/geoPoint/1.0",En._jsonSchema={type:Ye("string",En._jsonSchemaVersion),latitude:Ye("number"),longitude:Ye("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e){this._values=(e||[]).map((n=>n))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Tn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(lo(e,Tn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((n=>typeof n=="number")))return new Tn(e.vectorValues);throw new te(j.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Tn._jsonSchemaVersion="firestore/vectorValue/1.0",Tn._jsonSchema={type:Ye("string",Tn._jsonSchemaVersion),vectorValues:Ye("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E1=/^__.*__$/;class T1{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new es(e,this.data,this.fieldMask,n,this.fieldTransforms):new co(e,this.data,n,this.fieldTransforms)}}function Y_(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ae(40011,{Ec:t})}}class Wu{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Wu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Pa(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find((n=>e.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>e.isPrefixOf(n.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Y_(this.Ec)&&E1.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class w1{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||el(e)}Dc(e,n,r,s=!1){return new Wu({Ec:e,methodName:n,bc:r,path:ct.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function I1(t){const e=t._freezeSettings(),n=el(t._databaseId);return new w1(t._databaseId,!!e.ignoreUndefinedProperties,n)}function A1(t,e,n,r,s,i={}){const o=t.Dc(i.merge||i.mergeFields?2:0,e,n,s);ty("Data must be an object, but it was:",o,r);const l=Z_(r,o);let c,h;if(i.merge)c=new nn(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const m=b1(e,p,n);if(!o.contains(m))throw new te(j.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);S1(d,m)||d.push(m)}c=new nn(d),h=o.fieldTransforms.filter((p=>c.covers(p.field)))}else c=null,h=o.fieldTransforms;return new T1(new Wt(l),c,h)}class Ku extends Gu{_toFieldTransform(e){return new hR(e.path,new Ki)}isEqual(e){return e instanceof Ku}}function X_(t,e){if(ey(t=$t(t)))return ty("Unsupported field value:",e,t),Z_(t,e);if(t instanceof Gu)return(function(r,s){if(!Y_(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const l of r){let c=X_(l,s.yc(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}})(t,e)}return(function(r,s){if((r=$t(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return lR(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Me.fromDate(r);return{timestampValue:Aa(s.serializer,i)}}if(r instanceof Me){const i=new Me(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Aa(s.serializer,i)}}if(r instanceof En)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Kt)return{bytesValue:E_(s.serializer,r._byteString)};if(r instanceof rt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Su(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Tn)return(function(o,l){return{mapValue:{fields:{[Qg]:{stringValue:Jg},[Ea]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return Au(l.serializer,h)}))}}}}}})(r,s);throw s.wc(`Unsupported field value: ${_u(r)}`)})(t,e)}function Z_(t,e){const n={};return Hg(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Xr(t,((r,s)=>{const i=X_(s,e.Vc(r));i!=null&&(n[r]=i)})),{mapValue:{fields:n}}}function ey(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Me||t instanceof En||t instanceof Kt||t instanceof rt||t instanceof Gu||t instanceof Tn)}function ty(t,e,n){if(!ey(n)||!jg(n)){const r=_u(n);throw r==="an object"?e.wc(t+" a custom object"):e.wc(t+" "+r)}}function b1(t,e,n){if((e=$t(e))instanceof zu)return e._internalPath;if(typeof e=="string")return ny(t,e);throw Pa("Field path arguments must be of type string or ",t,!1,void 0,n)}const R1=new RegExp("[~\\*/\\[\\]]");function ny(t,e,n){if(e.search(R1)>=0)throw Pa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new zu(...e.split("."))._internalPath}catch{throw Pa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Pa(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new te(j.INVALID_ARGUMENT,l+t+c)}function S1(t,e){return t.some((n=>n.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new P1(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(sy("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class P1 extends ry{data(){return super.data()}}function sy(t,e){return typeof e=="string"?ny(t,e):e instanceof zu?e._internalPath:e._delegate._internalPath}class C1{convertValue(e,n="none"){switch(Ir(e)){case 0:return null;case 1:return e.booleanValue;case 2:return We(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(wr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ae(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Xr(e,((s,i)=>{r[s]=this.convertValue(i,n)})),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n[Ea].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map((o=>We(o.doubleValue)));return new Tn(i)}convertGeoPoint(e){return new En(We(e.latitude),We(e.longitude))}convertArray(e,n){return(e.values||[]).map((r=>this.convertValue(r,n)))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Wa(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(zi(e));default:return null}}convertTimestamp(e){const n=Tr(e);return new Me(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=je.fromString(e);Ce(R_(r),9688,{name:e});const s=new Gi(r.get(1),r.get(3)),i=new re(r.popFirst(5));return s.isEqual(n)||qn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k1(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class fi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class $r extends ry{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new na(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(sy("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new te(j.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=$r._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}$r._jsonSchemaVersion="firestore/documentSnapshot/1.0",$r._jsonSchema={type:Ye("string",$r._jsonSchemaVersion),bundleSource:Ye("string","DocumentSnapshot"),bundleName:Ye("string"),bundle:Ye("string")};class na extends $r{data(e={}){return super.data(e)}}class ki{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new fi(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((n=>e.push(n))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach((r=>{e.call(n,new na(this._firestore,this._userDataWriter,r.key,r,new fi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new te(j.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((l=>{const c=new na(s._firestore,s._userDataWriter,l.doc.key,l.doc,new fi(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>i||l.type!==3)).map((l=>{const c=new na(s._firestore,s._userDataWriter,l.doc.key,l.doc,new fi(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:O1(l.type),doc:c,oldIndex:h,newIndex:d}}))}})(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new te(j.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ki._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=gu.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function O1(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ae(61501,{type:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V1(t){t=Hi(t,rt);const e=Hi(t.firestore,qu);return g1(J_(e),t._key).then((n=>x1(e,t,n)))}ki._jsonSchemaVersion="firestore/querySnapshot/1.0",ki._jsonSchema={type:Ye("string",ki._jsonSchemaVersion),bundleSource:Ye("string","QuerySnapshot"),bundleName:Ye("string"),bundle:Ye("string")};class D1 extends C1{constructor(e){super(),this.firestore=e}convertBytes(e){return new Kt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new rt(this.firestore,null,n)}}function Qu(t,e,n){t=Hi(t,rt);const r=Hi(t.firestore,qu),s=k1(t.converter,e,n);return N1(r,[A1(I1(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Ln.none())])}function N1(t,e){return(function(r,s){const i=new gr;return r.asyncQueue.enqueueAndForget((async()=>n1(await p1(r),s,i))),i.promise})(J_(t),e)}function x1(t,e,n){const r=n.docs.get(e._key),s=new D1(t);return new $r(t,s,e._key,r,new fi(n.hasPendingWrites,n.fromCache),e.converter)}function Xi(){return new Ku("serverTimestamp")}(function(e,n=!0){(function(s){Bs=s})(Fs),Ps(new Gr("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new qu(new vb(r.getProvider("auth-internal")),new wb(o,r.getProvider("app-check-internal")),(function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new te(j.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Gi(h.options.projectId,d)})(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l}),"PUBLIC").setMultipleInstances(!0)),pr(vf,Ef,e),pr(vf,Ef,"esm2017")})();var M1="firebase",L1="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pr(M1,L1,"app");const F1={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0},iy=Qm(F1),Ju=mb(iy),Yu=y1(iy);async function Xu(t){const e=await pA(t,!0);localStorage.setItem("auth_token",e)}async function U1(t){const e=await e0(Ju,t.email,t.password);return await Xu(e.user),e.user}async function B1(t){const e=await ZA(Ju,t.email,t.password);return t.name&&await n0(e.user,{displayName:t.name}),await Xu(e.user),await Qu(Hu(Yu,"users",e.user.uid),{name:t.name??null,email:t.email,organization:t.organization??null,teamSize:t.teamSize??null,provider:"password",createdAt:Xi(),updatedAt:Xi()},{merge:!0}),e.user}async function oy(){var i;const t=new Dn;t.setCustomParameters({prompt:"select_account"});const e=await A0(Ju,t);await Xu(e.user);const n=Hu(Yu,"users",e.user.uid),r=await V1(n),s=!r.exists()||!((i=r.data())!=null&&i.organization);return r.exists()||await Qu(n,{name:e.user.displayName??null,email:e.user.email??null,provider:"google",createdAt:Xi(),updatedAt:Xi()},{merge:!0}),{user:e.user,needsOrganization:s}}async function ay(t,e,n){await Qu(Hu(Yu,"users",t),{organization:e,teamSize:null,updatedAt:Xi()},{merge:!0})}const j1={class:"card auth-card reveal delay-1"},$1={class:"field"},H1={class:"field"},q1={class:"password"},z1=["type"],G1={class:"form-row"},W1={class:"checkbox"},K1={key:0,class:"error"},Q1=["disabled"],J1={class:"footer"},Y1=tt({__name:"LoginPage",setup(t){const e=Ms({email:"",password:"",remember:!0}),n=ze(!1),r=ze(!1),s=ze(""),i=ze(!1),o=ze(null),l=ze(""),c=Zc(),h=async()=>{var m,_;s.value="",r.value=!0;try{await U1({email:e.email,password:e.password}),c.push("/app/dashboard")}catch(P){s.value=((_=(m=P==null?void 0:P.response)==null?void 0:m.data)==null?void 0:_.message)??"Unable to sign in right now."}finally{r.value=!1}},d=async()=>{s.value="";try{const m=await oy();if(m.needsOrganization){o.value=m.user.uid,l.value=m.user.email??"",i.value=!0;return}c.push("/app/dashboard")}catch(m){s.value=(m==null?void 0:m.message)??"Google sign-in failed."}},p=async m=>{var _,P;if(!o.value){s.value="Google sign-in session missing.";return}try{await ay(o.value,m.organization),c.push("/app/dashboard")}catch(V){s.value=((P=(_=V==null?void 0:V.response)==null?void 0:_.data)==null?void 0:P.message)??"Google sign-in failed."}finally{i.value=!1}};return(m,_)=>(ie(),ye(Ge,null,[Ve(eu,null,{left:Ut(()=>[..._[5]||(_[5]=[T("div",{class:"brand reveal"},[T("div",{class:"logo"},[T("svg",{viewBox:"0 0 48 48","aria-hidden":"true"},[T("path",{d:"M12 9h18c5 0 9 4 9 9v12c0 5-4 9-9 9H12c-5 0-9-4-9-9V18c0-5 4-9 9-9Z",fill:"url(#logoGradient)"}),T("path",{d:"M16 24c6 2 8 8 8 8s4-6 8-8c-4-2-8-8-8-8s-2 6-8 8Z",fill:"#ffffff",opacity:"0.9"}),T("defs",null,[T("linearGradient",{id:"logoGradient",x1:"0",x2:"1",y1:"0",y2:"1"},[T("stop",{offset:"0","stop-color":"#0f766e"}),T("stop",{offset:"1","stop-color":"#0c4a6e"})])])])]),T("div",null,[T("p",{class:"brand-title"},"SignFlow"),T("p",{class:"brand-sub"},"Enterprise E-Signature Platform")])],-1),T("div",{class:"hero"},[T("h1",{class:"hero-title reveal delay-1"},"Welcome back."),T("p",{class:"hero-copy reveal delay-2"}," Sign in to access your documents, track signature progress, and keep a verifiable audit trail. "),T("ul",{class:"hero-list"},[T("li",{class:"reveal delay-1"},"Secure document signing"),T("li",{class:"reveal delay-2"},"Real-time status visibility"),T("li",{class:"reveal delay-3"},"Immutable audit trail"),T("li",{class:"reveal delay-4"},"Enterprise-grade governance")])],-1)])]),right:Ut(()=>[T("div",j1,[_[13]||(_[13]=T("div",{class:"card-header"},[T("p",{class:"card-title"},"Sign in"),T("p",{class:"helper"},"Enter your credentials to access your account.")],-1)),T("form",{class:"form",onSubmit:Ui(h,["prevent"])},[T("div",$1,[_[6]||(_[6]=T("label",{class:"label",for:"email"},"Email address",-1)),en(T("input",{id:"email","onUpdate:modelValue":_[0]||(_[0]=P=>e.email=P),type:"email",class:"input",placeholder:"you@company.com",autocomplete:"email",required:""},null,512),[[hr,e.email,void 0,{trim:!0}]])]),T("div",H1,[_[7]||(_[7]=T("label",{class:"label",for:"password"},"Password",-1)),T("div",q1,[en(T("input",{id:"password","onUpdate:modelValue":_[1]||(_[1]=P=>e.password=P),type:n.value?"text":"password",class:"input",placeholder:"Enter your password",autocomplete:"current-password",required:""},null,8,z1),[[ec,e.password]]),T("button",{class:"ghost",type:"button",onClick:_[2]||(_[2]=P=>n.value=!n.value)},Ue(n.value?"Hide":"Show"),1)])]),T("div",G1,[T("label",W1,[en(T("input",{"onUpdate:modelValue":_[3]||(_[3]=P=>e.remember=P),type:"checkbox"},null,512),[[wm,e.remember]]),_[8]||(_[8]=Vt(" Remember me ",-1))]),Ve(Be(qr),{class:"link",to:"/forgot-password"},{default:Ut(()=>[..._[9]||(_[9]=[Vt("Forgot password?",-1)])]),_:1})]),s.value?(ie(),ye("p",K1,Ue(s.value),1)):Dt("",!0),T("button",{class:"btn btn-primary",type:"submit",disabled:r.value},Ue(r.value?"Signing in...":"Sign in"),9,Q1)],32),_[14]||(_[14]=T("div",{class:"divider"},"Or continue with",-1)),T("div",{class:"social"},[T("button",{class:"btn btn-outline",type:"button",onClick:d},[..._[10]||(_[10]=[T("span",{class:"social-icon"},"G",-1),Vt(" Continue with Google ",-1)])])]),T("p",J1,[_[12]||(_[12]=Vt(" Don't have an account? ",-1)),Ve(Be(qr),{class:"link",to:"/register"},{default:Ut(()=>[..._[11]||(_[11]=[Vt("Sign up for free",-1)])]),_:1})])])]),_:1}),Ve(Fm,{modelValue:i.value,"onUpdate:modelValue":_[4]||(_[4]=P=>i.value=P),email:l.value,onComplete:p},null,8,["modelValue","email"])],64))}}),X1=un(Y1,[["__scopeId","data-v-d75db58e"]]),Z1={class:"card auth-card reveal delay-1"},eP={class:"progress"},tP={class:"card-header"},nP={class:"card-title"},rP={class:"helper"},sP={key:0,class:"step"},iP={class:"field"},oP={class:"field"},aP={class:"field"},lP={class:"password"},cP=["type"],uP={class:"field"},hP=["type"],dP={key:1,class:"step"},fP={class:"field"},pP={class:"field"},mP={key:2,class:"error"},gP={class:"actions"},_P=["disabled"],yP={class:"footer"},vP=tt({__name:"RegisterPage",setup(t){const e=Ms({name:"",email:"",password:"",confirmPassword:"",organization:"",teamSize:""}),n=ze(1),r=ze(!1),s=ze(!1),i=ze(""),o=ze(!1),l=ze(null),c=ze(""),h=Zc(),d=()=>!e.name||!e.email||!e.password||!e.confirmPassword?(i.value="Please fill out all required fields.",!1):e.password.length<8?(i.value="Password must be at least 8 characters.",!1):e.password!==e.confirmPassword?(i.value="Passwords do not match.",!1):!0,p=()=>e.organization?!0:(i.value="Organization name is required.",!1),m=async()=>{var V,S;if(i.value="",n.value===1){if(!d())return;n.value=2;return}if(p()){s.value=!0;try{await B1({name:e.name,email:e.email,password:e.password,organization:e.organization,teamSize:e.teamSize}),h.push("/app/dashboard")}catch(x){i.value=((S=(V=x==null?void 0:x.response)==null?void 0:V.data)==null?void 0:S.message)??"Unable to create account right now."}finally{s.value=!1}}},_=async()=>{i.value="";try{const V=await oy();if(V.needsOrganization){l.value=V.user.uid,c.value=V.user.email??"",o.value=!0;return}h.push("/app/dashboard")}catch(V){i.value=(V==null?void 0:V.message)??"Google sign-up failed."}},P=async V=>{var S,x;if(!l.value){i.value="Google sign-in session missing.";return}try{await ay(l.value,V.organization),h.push("/app/dashboard")}catch(B){i.value=((x=(S=B==null?void 0:B.response)==null?void 0:S.data)==null?void 0:x.message)??"Google sign-up failed."}finally{o.value=!1}};return(V,S)=>(ie(),ye(Ge,null,[Ve(eu,null,{left:Ut(()=>[...S[9]||(S[9]=[T("div",{class:"brand reveal"},[T("div",{class:"logo"},[T("svg",{viewBox:"0 0 48 48","aria-hidden":"true"},[T("path",{d:"M12 9h18c5 0 9 4 9 9v12c0 5-4 9-9 9H12c-5 0-9-4-9-9V18c0-5 4-9 9-9Z",fill:"url(#logoGradient)"}),T("path",{d:"M16 24c6 2 8 8 8 8s4-6 8-8c-4-2-8-8-8-8s-2 6-8 8Z",fill:"#ffffff",opacity:"0.9"}),T("defs",null,[T("linearGradient",{id:"logoGradient",x1:"0",x2:"1",y1:"0",y2:"1"},[T("stop",{offset:"0","stop-color":"#0f766e"}),T("stop",{offset:"1","stop-color":"#0c4a6e"})])])])]),T("div",null,[T("p",{class:"brand-title"},"SignFlow"),T("p",{class:"brand-sub"},"Enterprise E-Signature Platform")])],-1),T("div",{class:"hero"},[T("p",{class:"hero-eyebrow reveal delay-1"},"Join thousands of teams"),T("h1",{class:"hero-title reveal delay-2"},"Start signing with confidence."),T("p",{class:"hero-copy reveal delay-3"}," Create an account to send and track documents with a clear, auditable signing workflow. "),T("ul",{class:"hero-list"},[T("li",{class:"reveal delay-1"},"Fast onboarding in minutes"),T("li",{class:"reveal delay-2"},"No credit card required"),T("li",{class:"reveal delay-3"},"Cancel anytime"),T("li",{class:"reveal delay-4"},"Priority onboarding support")])],-1)])]),right:Ut(()=>[T("div",Z1,[T("div",eP,[T("span",{class:gn(["dot",n.value===1?"active":""])},"1",2),S[10]||(S[10]=T("span",{class:"line"},null,-1)),T("span",{class:gn(["dot",n.value===2?"active":""])},"2",2)]),T("div",tP,[T("p",nP,Ue(n.value===1?"Personal information":"Organization details"),1),T("p",rP,Ue(n.value===1?"Create your personal account.":"Tell us where you work."),1)]),T("form",{class:"form",onSubmit:Ui(m,["prevent"])},[n.value===1?(ie(),ye("div",sP,[T("div",iP,[S[11]||(S[11]=T("label",{class:"label",for:"name"},"Full name",-1)),en(T("input",{id:"name","onUpdate:modelValue":S[0]||(S[0]=x=>e.name=x),type:"text",class:"input",placeholder:"Jane Doe",autocomplete:"name",required:""},null,512),[[hr,e.name,void 0,{trim:!0}]])]),T("div",oP,[S[12]||(S[12]=T("label",{class:"label",for:"email"},"Work email",-1)),en(T("input",{id:"email","onUpdate:modelValue":S[1]||(S[1]=x=>e.email=x),type:"email",class:"input",placeholder:"you@company.com",autocomplete:"email",required:""},null,512),[[hr,e.email,void 0,{trim:!0}]])]),T("div",aP,[S[13]||(S[13]=T("label",{class:"label",for:"password"},"Password",-1)),T("div",lP,[en(T("input",{id:"password","onUpdate:modelValue":S[2]||(S[2]=x=>e.password=x),type:r.value?"text":"password",class:"input",placeholder:"At least 8 characters",autocomplete:"new-password",required:""},null,8,cP),[[ec,e.password]]),T("button",{class:"ghost",type:"button",onClick:S[3]||(S[3]=x=>r.value=!r.value)},Ue(r.value?"Hide":"Show"),1)])]),T("div",uP,[S[14]||(S[14]=T("label",{class:"label",for:"confirmPassword"},"Confirm password",-1)),en(T("input",{id:"confirmPassword","onUpdate:modelValue":S[4]||(S[4]=x=>e.confirmPassword=x),type:r.value?"text":"password",class:"input",placeholder:"Confirm your password",autocomplete:"new-password",required:""},null,8,hP),[[ec,e.confirmPassword]])])])):(ie(),ye("div",dP,[T("div",fP,[S[15]||(S[15]=T("label",{class:"label",for:"organization"},"Organization name",-1)),en(T("input",{id:"organization","onUpdate:modelValue":S[5]||(S[5]=x=>e.organization=x),type:"text",class:"input",placeholder:"Company or team name",required:""},null,512),[[hr,e.organization,void 0,{trim:!0}]])]),T("div",pP,[S[17]||(S[17]=T("label",{class:"label",for:"teamSize"},"Team size",-1)),en(T("select",{id:"teamSize","onUpdate:modelValue":S[6]||(S[6]=x=>e.teamSize=x),class:"input"},[...S[16]||(S[16]=[T("option",{value:""},"Select size",-1),T("option",{value:"1-10"},"1-10",-1),T("option",{value:"11-50"},"11-50",-1),T("option",{value:"51-200"},"51-200",-1),T("option",{value:"201-500"},"201-500",-1),T("option",{value:"500+"},"500+",-1)])],512),[[Im,e.teamSize]])])])),i.value?(ie(),ye("p",mP,Ue(i.value),1)):Dt("",!0),T("div",gP,[n.value===2?(ie(),ye("button",{key:0,class:"btn btn-outline",type:"button",onClick:S[7]||(S[7]=x=>n.value=1)}," Back ")):Dt("",!0),T("button",{class:"btn btn-primary",type:"submit",disabled:s.value},Ue(n.value===1?"Continue":s.value?"Creating account...":"Create account"),9,_P)])],32),S[21]||(S[21]=T("div",{class:"divider"},"Or continue with",-1)),T("button",{class:"btn btn-outline",type:"button",onClick:_},[...S[18]||(S[18]=[T("span",{class:"social-icon"},"G",-1),Vt(" Continue with Google ",-1)])]),T("p",yP,[S[20]||(S[20]=Vt(" Already have an account? ",-1)),Ve(Be(qr),{class:"link",to:"/login"},{default:Ut(()=>[...S[19]||(S[19]=[Vt("Sign in",-1)])]),_:1})])])]),_:1}),Ve(Fm,{modelValue:o.value,"onUpdate:modelValue":S[8]||(S[8]=x=>o.value=x),email:c.value,onComplete:P},null,8,["modelValue","email"])],64))}}),EP=un(vP,[["__scopeId","data-v-535b4766"]]),TP={class:"card auth-card reveal delay-1"},wP={class:"field"},IP={class:"footer"},AP=tt({__name:"ForgotPasswordPage",setup(t){const e=ze(""),n=()=>{console.info("Password reset requested",{email:e.value})};return(r,s)=>(ie(),jt(eu,null,{left:Ut(()=>[...s[1]||(s[1]=[T("div",{class:"hero"},[T("h1",{class:"hero-title reveal"},"Reset your password"),T("p",{class:"hero-copy reveal delay-1"}," Enter your email and we will send a secure reset link. ")],-1)])]),right:Ut(()=>[T("div",TP,[s[6]||(s[6]=T("div",{class:"card-header"},[T("p",{class:"card-title"},"Forgot password"),T("p",{class:"helper"},"We will email you a reset link.")],-1)),T("form",{class:"form",onSubmit:Ui(n,["prevent"])},[T("div",wP,[s[2]||(s[2]=T("label",{class:"label",for:"email"},"Email address",-1)),en(T("input",{id:"email","onUpdate:modelValue":s[0]||(s[0]=i=>e.value=i),type:"email",class:"input",placeholder:"you@company.com",required:""},null,512),[[hr,e.value,void 0,{trim:!0}]])]),s[5]||(s[5]=T("button",{class:"btn btn-primary",type:"submit"},"Send reset link",-1)),T("p",IP,[s[4]||(s[4]=Vt(" Remembered your password? ",-1)),Ve(Be(qr),{class:"link",to:"/login"},{default:Ut(()=>[...s[3]||(s[3]=[Vt("Back to sign in",-1)])]),_:1})])],32)])]),_:1}))}}),bP=un(AP,[["__scopeId","data-v-addc3979"]]),RP={class:"not-found"},SP={class:"card"},PP=tt({__name:"NotFoundPage",setup(t){return(e,n)=>(ie(),ye("main",RP,[T("div",SP,[n[1]||(n[1]=T("p",{class:"code"},"404",-1)),n[2]||(n[2]=T("h1",{class:"title"},"Page not found",-1)),n[3]||(n[3]=T("p",{class:"copy"},"We could not find the page you are looking for.",-1)),Ve(Be(qr),{class:"btn btn-primary",to:"/login"},{default:Ut(()=>[...n[0]||(n[0]=[Vt("Back to sign in",-1)])]),_:1})])]))}}),CP=un(PP,[["__scopeId","data-v-beaa41b3"]]),kP=[{label:"Dashboard",path:"/app/dashboard",icon:"dashboard"},{label:"Documents",path:"/app/documents",icon:"documents"},{label:"Analytics",path:"/app/analytics",icon:"analytics"},{label:"Sent",path:"/app/sent",icon:"sent"},{label:"Received",path:"/app/received",icon:"received"},{label:"Audit Trail",path:"/app/audit-trail",icon:"audit"},{label:"Settings",path:"/app/settings",icon:"settings"}],OP={class:"sidebar-header"},VP={class:"brand"},DP={key:0,class:"brand-name"},NP={key:0},xP={key:1},MP={class:"nav"},LP=["innerHTML"],FP={key:0,class:"label"},UP={class:"sidebar-footer"},BP={class:"user-card"},jP={key:0},$P=tt({__name:"Sidebar",props:{collapsed:{type:Boolean},mobileOpen:{type:Boolean}},emits:["toggle","close"],setup(t){const e=Lm(),n={dashboard:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',documents:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/></svg>',analytics:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5"/><rect x="7" y="12" width="3" height="7" rx="1"/><rect x="12" y="9" width="3" height="10" rx="1"/><rect x="17" y="6" width="3" height="13" rx="1"/></svg>',sent:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12l18-9-4 18-5-7-9-2Z"/><path d="M12 14l5 5"/></svg>',received:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7"/><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/></svg>',audit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l3 3v15a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M8 9h8"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>',settings:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/><path d="M4 12h2"/><path d="M18 12h2"/><path d="M12 4v2"/><path d="M12 18v2"/><path d="M6.2 6.2l1.4 1.4"/><path d="M16.4 16.4l1.4 1.4"/><path d="M6.2 17.8l1.4-1.4"/><path d="M16.4 7.6l1.4-1.4"/></svg>'};return(r,s)=>(ie(),ye("div",null,[t.mobileOpen?(ie(),ye("div",{key:0,class:"backdrop",onClick:s[0]||(s[0]=i=>r.$emit("close"))})):Dt("",!0),T("aside",{class:gn(["sidebar",{collapsed:t.collapsed,open:t.mobileOpen}])},[T("div",OP,[T("div",VP,[s[3]||(s[3]=wi('<span class="logo" data-v-9fe94d7c><svg viewBox="0 0 32 32" aria-hidden="true" data-v-9fe94d7c><path d="M7 6h18a7 7 0 0 1 7 7v6a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7v-6a7 7 0 0 1 7-7Z" fill="url(#sidebarGradient)" data-v-9fe94d7c></path><path d="M11 16c4 1 5 5 5 5s3-4 5-5c-3-1-5-5-5-5s-1 4-5 5Z" fill="#fff" data-v-9fe94d7c></path><defs data-v-9fe94d7c><linearGradient id="sidebarGradient" x1="0" x2="1" y1="0" y2="1" data-v-9fe94d7c><stop offset="0" stop-color="var(--accent)" data-v-9fe94d7c></stop><stop offset="1" stop-color="var(--accent-strong)" data-v-9fe94d7c></stop></linearGradient></defs></svg></span>',1)),t.collapsed?Dt("",!0):(ie(),ye("span",DP,"SignFlow"))]),T("button",{class:"collapse",type:"button",onClick:s[1]||(s[1]=i=>r.$emit("toggle"))},[t.collapsed?(ie(),ye("span",NP,">")):(ie(),ye("span",xP,"<"))])]),T("nav",MP,[(ie(!0),ye(Ge,null,xr(Be(kP),i=>(ie(),jt(Be(qr),{key:i.path,to:i.path,class:gn(["nav-item",{active:Be(e).path.startsWith(i.path)}]),onClick:s[2]||(s[2]=o=>r.$emit("close"))},{default:Ut(()=>[T("span",{class:"icon",innerHTML:n[i.icon]},null,8,LP),t.collapsed?Dt("",!0):(ie(),ye("span",FP,Ue(i.label),1))]),_:2},1032,["to","class"]))),128))]),T("div",UP,[T("div",BP,[s[5]||(s[5]=T("span",{class:"avatar"},"JD",-1)),t.collapsed?Dt("",!0):(ie(),ye("div",jP,[...s[4]||(s[4]=[T("p",{class:"user-name"},"John Doe",-1),T("p",{class:"user-email"},"john@company.com",-1)])]))])])],2)]))}}),HP=un($P,[["__scopeId","data-v-9fe94d7c"]]),Oi=ze("system"),kc=t=>{const e=document.documentElement;if(t==="system"){const n=window.matchMedia("(prefers-color-scheme: dark)").matches;e.setAttribute("data-theme",n?"dark":"light")}else e.setAttribute("data-theme",t)},qP=()=>{const t=localStorage.getItem("theme_mode");Oi.value=t??"system",kc(Oi.value),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{Oi.value==="system"&&kc("system")})},zP=()=>({themeMode:Oi,setTheme:e=>{Oi.value=e,localStorage.setItem("theme_mode",e),kc(e)}}),GP={class:"topbar"},WP={class:"topbar-left"},KP={class:"title"},QP={class:"topbar-right"},JP={class:"theme"},YP={key:0,class:"menu-card"},XP={key:0,class:"check"},ZP={key:0,class:"check"},eC={key:0,class:"check"},tC={key:0,class:"profile-menu"},nC=tt({__name:"Topbar",props:{title:{}},emits:["toggle-mobile"],setup(t){const e=Zc(),{themeMode:n,setTheme:r}=zP(),s=ze(!1),i=ze(!1),o=()=>{i.value=!1,e.push("/app/settings")},l=()=>{i.value=!1,e.push("/app/settings")},c=()=>{localStorage.removeItem("auth_token"),e.push("/login")};return(h,d)=>(ie(),ye("header",GP,[T("div",WP,[T("button",{class:"menu",type:"button",onClick:d[0]||(d[0]=p=>h.$emit("toggle-mobile"))},[...d[6]||(d[6]=[T("span",null,null,-1),T("span",null,null,-1),T("span",null,null,-1)])]),T("h1",KP,Ue(t.title),1)]),T("div",QP,[T("div",JP,[T("button",{class:"icon-btn",type:"button",onClick:d[1]||(d[1]=p=>s.value=!s.value)},[...d[7]||(d[7]=[wi('<svg viewBox="0 0 24 24" aria-hidden="true" data-v-a135e513><path d="M12 4v2" data-v-a135e513></path><path d="M12 18v2" data-v-a135e513></path><path d="M4 12h2" data-v-a135e513></path><path d="M18 12h2" data-v-a135e513></path><path d="M6.3 6.3l1.4 1.4" data-v-a135e513></path><path d="M16.3 16.3l1.4 1.4" data-v-a135e513></path><path d="M6.3 17.7l1.4-1.4" data-v-a135e513></path><path d="M16.3 7.7l1.4-1.4" data-v-a135e513></path><circle cx="12" cy="12" r="4" data-v-a135e513></circle></svg>',1)])]),s.value?(ie(),ye("div",YP,[T("button",{class:"menu-item",type:"button",onClick:d[2]||(d[2]=p=>Be(r)("light"))},[d[8]||(d[8]=T("span",null,"Light",-1)),Be(n)==="light"?(ie(),ye("span",XP,"v")):Dt("",!0)]),T("button",{class:"menu-item",type:"button",onClick:d[3]||(d[3]=p=>Be(r)("dark"))},[d[9]||(d[9]=T("span",null,"Dark",-1)),Be(n)==="dark"?(ie(),ye("span",ZP,"v")):Dt("",!0)]),T("button",{class:"menu-item",type:"button",onClick:d[4]||(d[4]=p=>Be(r)("system"))},[d[10]||(d[10]=T("span",null,"System",-1)),Be(n)==="system"?(ie(),ye("span",eC,"v")):Dt("",!0)])])):Dt("",!0)]),d[12]||(d[12]=wi('<div class="notifications" data-v-a135e513><button class="icon-btn" type="button" data-v-a135e513><svg viewBox="0 0 24 24" aria-hidden="true" data-v-a135e513><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" data-v-a135e513></path><path d="M13.7 21a2 2 0 0 1-3.4 0" data-v-a135e513></path></svg></button><span class="badge" data-v-a135e513>2</span></div>',1)),T("div",{class:"profile",onClick:d[5]||(d[5]=p=>i.value=!i.value)},[d[11]||(d[11]=wi('<span class="avatar" data-v-a135e513>JD</span><div class="profile-info" data-v-a135e513><p class="profile-name" data-v-a135e513>John Doe</p><p class="profile-role" data-v-a135e513>Admin</p></div><svg class="chev" viewBox="0 0 24 24" aria-hidden="true" data-v-a135e513><path d="m6 9 6 6 6-6" data-v-a135e513></path></svg>',3)),i.value?(ie(),ye("div",tC,[T("button",{type:"button",class:"menu-item",onClick:o},"Profile"),T("button",{type:"button",class:"menu-item",onClick:l},"Settings"),T("button",{type:"button",class:"menu-item danger",onClick:c},"Log out")])):Dt("",!0)])])]))}}),rC=un(nC,[["__scopeId","data-v-a135e513"]]),sC={class:"app-shell"},iC={class:"app-main"},oC={class:"app-content"},aC=tt({__name:"AppLayout",setup(t){const e=Lm(),n=ze(!1),r=ze(!1),s=()=>{n.value=!n.value},i=Nt(()=>e.meta.title??"SignFlow Platform");return(o,l)=>(ie(),ye("div",sC,[Ve(HP,{collapsed:n.value,"mobile-open":r.value,onToggle:s,onClose:l[0]||(l[0]=c=>r.value=!1)},null,8,["collapsed","mobile-open"]),T("div",iC,[Ve(rC,{title:i.value,onToggleMobile:l[1]||(l[1]=c=>r.value=!0)},null,8,["title"]),T("main",oC,[Ve(Be(Xc))])])]))}}),lC=un(aC,[["__scopeId","data-v-5ae3efbd"]]),cC={class:"dashboard"},uC={class:"stats-grid"},hC={class:"stat-meta"},dC={class:"stat-label"},fC={class:"stat-value"},pC=["innerHTML"],mC={class:"grid-two"},gC={class:"panel reveal"},_C={class:"chart"},yC={viewBox:"0 0 360 180","aria-hidden":"true"},vC={class:"grid"},EC=["y1","y2"],TC=["d"],wC=["cx","cy"],IC={class:"chart-labels"},AC={class:"grid-two wide"},bC={class:"panel reveal"},RC={class:"bars"},SC={class:"bars-stack"},PC={class:"bar-label"},CC={class:"panel reveal"},kC={class:"activity-list"},OC=["innerHTML"],VC={class:"activity-content"},DC={class:"activity-title"},NC={class:"activity-sub"},xC={class:"activity-time"},MC=tt({__name:"DashboardPage",setup(t){const e=[{label:"Total Documents",value:"221",change:"+12.5%",trend:"up",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/><path d="M8 13h8"/><path d="M8 17h6"/></svg>'},{label:"Signed Today",value:"28",change:"+8.2%",trend:"up",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/><path d="M9 14l2 2 4-4"/></svg>'},{label:"Pending",value:"42",change:"-3.1%",trend:"down",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'},{label:"Completed",value:"156",change:"+15.3%",trend:"up",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/><path d="M9 14l2 2 4-4"/></svg>'}],n=[12,18,15,25,22,30,28],r=["Jan 6","Jan 7","Jan 8","Jan 9","Jan 10","Jan 11","Jan 12"],s=Nt(()=>{const d=Math.max(...n),p=Math.min(...n),m=d-p||1;return n.map((_,P)=>{const V=30+P*310/(n.length-1),S=150-(_-p)/m*110;return{x:V,y:S}})}),i=Nt(()=>s.value.map((d,p)=>`${p===0?"M":"L"}${d.x} ${d.y}`).join(" ")),o=[{label:"Mon",signed:14,pending:8},{label:"Tue",signed:22,pending:11},{label:"Wed",signed:17,pending:6},{label:"Thu",signed:25,pending:9},{label:"Fri",signed:30,pending:5},{label:"Sat",signed:12,pending:3},{label:"Sun",signed:9,pending:2}],l=Math.max(...o.map(d=>d.signed+d.pending)),c=o.map(d=>({...d,signedPercent:Math.round(d.signed/l*100),pendingPercent:Math.round(d.pending/l*100)})),h=[{title:"Document signed",document:"Employment Contract - Sarah Miller",status:"success",statusLabel:"Completed",time:"2 minutes ago",icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'},{title:"Document viewed",document:"NDA Agreement - Tech Corp",status:"info",statusLabel:"Viewed",time:"15 minutes ago",icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'},{title:"Document sent",document:"Service Agreement - ABC Ltd",status:"warning",statusLabel:"Pending",time:"1 hour ago",icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'},{title:"Document signed",document:"Partnership Agreement - XYZ Inc",status:"success",statusLabel:"Completed",time:"2 hours ago",icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'},{title:"Document expired",document:"Lease Agreement - Property Co",status:"danger",statusLabel:"Expired",time:"3 hours ago",icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'}];return(d,p)=>(ie(),ye("div",cC,[p[5]||(p[5]=T("section",{class:"page-header reveal"},[T("h2",null,"Dashboard"),T("p",null,"Welcome back! Here's your signing activity overview.")],-1)),T("section",uC,[(ie(),ye(Ge,null,xr(e,m=>T("article",{key:m.label,class:"stat-card reveal"},[T("div",hC,[T("p",dC,Ue(m.label),1),T("h3",fC,Ue(m.value),1),T("p",{class:gn(["stat-change",m.trend])},Ue(m.change)+" vs last week",3)]),T("div",{class:gn(["stat-icon",m.trend])},[T("span",{innerHTML:m.icon},null,8,pC)],2)])),64))]),T("section",mC,[T("article",gC,[p[0]||(p[0]=T("div",{class:"panel-header"},[T("h3",null,"Document Activity"),T("p",null,"Documents processed over the last 7 days")],-1)),T("div",_C,[(ie(),ye("svg",yC,[T("g",vC,[(ie(),ye(Ge,null,xr(5,m=>T("line",{key:m,x1:"30",y1:m*30,x2:"340",y2:m*30},null,8,EC)),64))]),T("path",{d:i.value,class:"line"},null,8,TC),(ie(!0),ye(Ge,null,xr(s.value,(m,_)=>(ie(),ye("circle",{key:_,class:"dot",cx:m.x,cy:m.y,r:"4"},null,8,wC))),128))])),T("div",IC,[(ie(),ye(Ge,null,xr(r,m=>T("span",{key:m},Ue(m),1)),64))])])]),p[1]||(p[1]=wi('<article class="panel reveal" data-v-ccd41b67><div class="panel-header" data-v-ccd41b67><h3 data-v-ccd41b67>Status Distribution</h3><p data-v-ccd41b67>Document status breakdown</p></div><div class="donut-wrap" data-v-ccd41b67><div class="donut" data-v-ccd41b67></div><ul class="legend" data-v-ccd41b67><li data-v-ccd41b67><span class="dot success" data-v-ccd41b67></span>Completed: 156</li><li data-v-ccd41b67><span class="dot warning" data-v-ccd41b67></span>Pending: 42</li><li data-v-ccd41b67><span class="dot danger" data-v-ccd41b67></span>Expired: 8</li><li data-v-ccd41b67><span class="dot neutral" data-v-ccd41b67></span>Draft: 15</li></ul></div></article>',1))]),T("section",AC,[T("article",bC,[p[2]||(p[2]=T("div",{class:"panel-header"},[T("h3",null,"Weekly Performance"),T("p",null,"Signed vs pending documents this week")],-1)),T("div",RC,[(ie(!0),ye(Ge,null,xr(Be(c),m=>(ie(),ye("div",{key:m.label,class:"bar-group"},[T("div",SC,[T("span",{class:"bar signed",style:Vi({height:`${m.signedPercent}%`})},null,4),T("span",{class:"bar pending",style:Vi({height:`${m.pendingPercent}%`})},null,4)]),T("span",PC,Ue(m.label),1)]))),128))]),p[3]||(p[3]=T("div",{class:"bars-legend"},[T("span",null,[T("i",{class:"legend-dot signed"}),Vt(" signed")]),T("span",null,[T("i",{class:"legend-dot pending"}),Vt(" pending")])],-1))]),T("article",CC,[p[4]||(p[4]=T("div",{class:"panel-header"},[T("h3",null,"Recent Activity"),T("p",null,"Latest document updates")],-1)),T("div",kC,[(ie(),ye(Ge,null,xr(h,m=>T("div",{key:m.title,class:"activity-item"},[T("span",{class:"activity-icon",innerHTML:m.icon},null,8,OC),T("div",VC,[T("p",DC,Ue(m.title),1),T("p",NC,Ue(m.document),1),T("span",{class:gn(["status",m.status])},Ue(m.statusLabel),3),T("span",xC,Ue(m.time),1)])])),64))])])])]))}}),LC=un(MC,[["__scopeId","data-v-ccd41b67"]]),FC={class:"empty"},UC={class:"empty-card"},BC=tt({__name:"EmptyState",props:{title:{},description:{}},setup(t){return(e,n)=>(ie(),ye("section",FC,[T("div",UC,[T("h2",null,Ue(t.title),1),T("p",null,Ue(t.description),1),Wl(e.$slots,"default",{},void 0)])]))}}),qs=un(BC,[["__scopeId","data-v-f9b55d14"]]),jC=tt({__name:"DocumentsPage",setup(t){return(e,n)=>(ie(),jt(qs,{title:"Documents",description:"Your uploaded documents will be listed here."}))}}),$C=tt({__name:"AnalyticsPage",setup(t){return(e,n)=>(ie(),jt(qs,{title:"Analytics",description:"Charts and insights will appear here once documents start flowing."}))}}),HC=tt({__name:"SentPage",setup(t){return(e,n)=>(ie(),jt(qs,{title:"Sent",description:"Track documents you have sent to others here."}))}}),qC=tt({__name:"ReceivedPage",setup(t){return(e,n)=>(ie(),jt(qs,{title:"Received",description:"Documents sent to you for signing will appear here."}))}}),zC=tt({__name:"AuditTrailPage",setup(t){return(e,n)=>(ie(),jt(qs,{title:"Audit Trail",description:"Audit activity will be visible here per document."}))}}),GC=tt({__name:"SettingsPage",setup(t){return(e,n)=>(ie(),jt(qs,{title:"Settings",description:"Profile, security, and notification preferences will be managed here."}))}}),WC=[{path:"/",redirect:"/login"},{path:"/login",name:"login",component:X1},{path:"/register",name:"register",component:EP},{path:"/forgot-password",name:"forgot-password",component:bP},{path:"/app",component:lC,children:[{path:"dashboard",name:"dashboard",component:LC,meta:{title:"Dashboard"}},{path:"documents",name:"documents",component:jC,meta:{title:"Documents"}},{path:"analytics",name:"analytics",component:$C,meta:{title:"Analytics"}},{path:"sent",name:"sent",component:HC,meta:{title:"Sent"}},{path:"received",name:"received",component:qC,meta:{title:"Received"}},{path:"audit-trail",name:"audit-trail",component:zC,meta:{title:"Audit Trail"}},{path:"settings",name:"settings",component:GC,meta:{title:"Settings"}}]},{path:"/:pathMatch(.*)*",name:"not-found",component:CP}],KC=rw({history:LT(),routes:WC,scrollBehavior:()=>({top:0})});qP();YE(sw).use(KC).mount("#app");
