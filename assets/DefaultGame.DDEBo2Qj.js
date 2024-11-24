const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Game.DmX-uOGg.js","assets/jsx-runtime.CRkqtJS5.js","assets/index.B52nOzfP.js","assets/index.DcIy302Z.js","assets/ButtonPromise.lZbXWg4O.js","assets/Loading.Store.sVdA6XqR.js","assets/CircleLoading.DnCBQFdf.js","assets/SocialIcon.BguoIGj3.js","assets/ToastAssets.Clm6xbZs.js"])))=>i.map(i=>d[i]);
import{j as d}from"./jsx-runtime.CRkqtJS5.js";import{R as L,r as b}from"./index.B52nOzfP.js";import{m as A}from"./Loading.Store.sVdA6XqR.js";import{d as D,t as w}from"./ToastAssets.Clm6xbZs.js";import{u as $}from"./index.DcIy302Z.js";const j="modulepreload",C=function(e){return"/"+e},E={},G=function(t,r,n){let s=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),a=l?.nonce||l?.getAttribute("nonce");s=Promise.allSettled(r.map(i=>{if(i=C(i),i in E)return;E[i]=!0;const u=i.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${p}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":j,u||(m.as="script"),m.crossOrigin="",m.href=i,a&&m.setAttribute("nonce",a),document.head.appendChild(m),u)return new Promise((R,T)=>{m.addEventListener("load",R),m.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${i}`)))})}))}function o(l){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=l,window.dispatchEvent(a),!a.defaultPrevented)throw l}return s.then(l=>{for(const a of l||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},I=L.lazy(()=>G(()=>import("./Game.DmX-uOGg.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8])));function k({path:e}){return d.jsx(d.Fragment,{children:d.jsx(b.Suspense,{fallback:d.jsxs(d.Fragment,{children:[d.jsx("div",{className:"skeleton p-2 br-8",style:{width:"310px",height:"360px"}}),d.jsx("div",{className:"skeleton p-2 br-8",style:{width:"85%",height:"36px",maxWidth:"400px",animationDelay:".1s"}}),d.jsx("div",{className:"skeleton p-2 br-8",style:{width:"90%",height:"36px",maxWidth:"400px",animationDelay:".2s"}}),d.jsx("div",{className:"skeleton p-2 br-8",style:{width:"85%",height:"36px",maxWidth:"400px",animationDelay:".3s"}})]}),children:d.jsx(I,{path:e})})})}const g=A({tries:6,length:5,lang:"en"}),y={},h=async(e,t,r)=>{const n=`${e}-${t}-${r}`;if(y[n])return y[n];const s=new AbortController,o=s.signal,l=setTimeout(()=>s.abort(),5e3);try{const a=await fetch(`/api/${e}/${t}/${r}`,{signal:o});if(clearTimeout(l),!a.ok)throw new Error(`Error ${a.status}: No se pudo obtener las palabras`);const i=await a.json();return y[n]=i,i}catch(a){console.log(a)}},P=async(e,t)=>{try{const r=await h("game",e,t);if(!r||r.length===0)throw new Error("No hay palabras disponibles");const n=Math.floor(Math.random()*r.length);return r[n]}catch(r){return console.log(r),null}},v={},_=async(e,t,r)=>{const n=`${t}-${r}`;if(!v[n]){const s=await h("dic",t,r);v[n]=new Set(s.map(o=>o.toLowerCase()))}return v[n].has(e.toLowerCase())},K=async(e,t)=>{console.log("Preloading data"),await h("dic",e,t)},x={getWord:P,getByLangLength:h,existWord:_,preloadData:K},O=(e,t)=>{const r=typeof t=="string"?t:JSON.stringify(t);localStorage.setItem(e,r)},J=e=>{const t=localStorage.getItem(e);if(!t)return{};try{return JSON.parse(t)}catch(r){return console.error("Error parsing JSON from localStorage:",r),t}},M=e=>{if(!localStorage.getItem(e)){console.log("Storage not found");return}localStorage.removeItem(e)},U=e=>JSON.parse(JSON.stringify(e)),V=e=>JSON.parse(e),q=e=>JSON.stringify(e),W={set:O,get:J,remove:M,inmutable:U,parse:V,stringify:q},F=(e,t)=>{let r=Array(e.length).fill("false"),n={};e.split("").forEach(o=>{n[o]=(n[o]||0)+1});for(let o=0;o<e.length;o++)t[o]===e[o]&&(r[o]="true",n[t[o]]-=1);for(let o=0;o<e.length;o++)r[o]==="false"&&n[t[o]]>0&&(r[o]="exist",n[t[o]]-=1);const s=r.every(o=>o==="true");return{result:r,isWin:s}},B=async(e,t,r)=>{const n=W.get(`wordguess-${e}`).game||S;if(n?.word==="")try{const s=await x.getWord(t,r);n.word=s}catch(s){console.error("Error fetching word:",s),n.isWin=!1}c.set(n),N(e)},N=e=>{W.set(`wordguess-${e}`,{game:c.get(),setting:g.get()})},f={compareWord:F,saveLocal:N,validatePrevData:B},S={word:"",guess:"",valid:Array.from({length:6},()=>Array.from({length:5},()=>({letter:"",state:void 0}))),currentRow:0,currentLetter:0,isWin:void 0,waiting:!1},c=D(S),Y=e=>{const t=c.get(),r=g.get();if(t.currentLetter>=r.length||t.isWin||t.currentRow>=r.tries)return;const n=t.valid[t.currentRow][t.currentLetter];n.letter=e,n.state=void 0,c.setKey("currentLetter",t.currentLetter+1)},z=()=>{const e=c.get();if(e.currentLetter<=0||e.isWin||e.currentRow>=e.valid.length)return;const t=[...e.valid],r=e.currentLetter-1,s=e.valid[e.currentRow][e.currentLetter]?.letter?e.currentLetter:r;s<0||(t[e.currentRow][s]={letter:"",state:void 0},c.set({...e,currentLetter:s,valid:t}))},H=async e=>{const t={...c.get()},r=g.get();if(t.isWin||t.currentRow>t.valid.length-1)return;const n=t.valid[t.currentRow].every(u=>u.letter),s=document.querySelector(`[data-row="${t.currentRow}"]`),o=u=>{s?.classList.add("error"),w.error(u),setTimeout(()=>{s?.classList.remove("error")},400)};if(!n){o("Field is not complete");return}w.dismiss();const l=t.valid[t.currentRow].map(u=>u.letter).join("");if(!await x.existWord(l,r.lang,r.length)){o("Invalid word");return}const i=f.compareWord(t.word.toUpperCase(),l.toUpperCase());i.result.forEach((u,p)=>{t.valid[t.currentRow][p].state=u}),i.isWin?(c.setKey("isWin",!0),setTimeout(()=>{c.setKey("waiting",!0)},t.valid[0].length*310)):t.currentRow===t.valid.length-1?(c.setKey("isWin",!1),setTimeout(()=>{c.setKey("waiting",!0),w.show(t.word)},t.valid[0].length*310)):(t.currentLetter=0,t.currentRow=t.currentRow+1,t.guess="",c.set(t)),f.saveLocal(e)},Q=async e=>{const t=g.get(),r={...S,valid:Array.from({length:t.tries},()=>Array.from({length:t.length},()=>({letter:"",state:void 0})))},n=await x.getWord(t.lang,t.length);r.word=n,c.set(r),f.saveLocal(e),document.querySelectorAll(".key-box").forEach(o=>o.removeAttribute("data-valid"))},ot={typing:Y,backspace:z,enter:H,restart:Q};function nt(){const e=$(g);return L.useEffect(()=>{f.validatePrevData("default",e.lang,e.length)},[]),d.jsx(k,{path:"default"})}export{nt as D,x as G,ot as M,c as _,g as a};
