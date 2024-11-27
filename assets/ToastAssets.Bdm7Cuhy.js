import{c as g}from"./SocialIcon.C7nT6lAC.js";import{j as o}from"./jsx-runtime.CRkqtJS5.js";import{C as T}from"./CircleLoading.DnCBQFdf.js";function M(t,e){let n=y(e),s=t;for(let r of n){if(s===void 0)break;s=s[r]}return s}function A(t,e,n){return h(t??{},y(e),n)}function h(t,e,n){let s=e[0],r=Array.isArray(t)?[...t]:{...t};return e.length===1?(n===void 0?Array.isArray(r)?r.splice(s,1):delete r[s]:r[s]=n,r):(R(r,s,e[1]),r[s]=h(r[s],e.slice(1),n),r)}const m=/(.*)\[(\d+)\]/;function y(t){return t.split(".").flatMap(e=>w(e))}function w(t){if(m.test(t)){let[,e,n]=t.match(m);return[...w(e),n]}return[t]}const z=/^\d+$/;function R(t,e,n){if(e in t)return;z.test(n)?t[e]=Array(parseInt(n,10)+1):t[e]={}}function D(t={}){let e=g(t);return e.setKey=(n,s)=>{if(M(e.value,n)!==s){let r=e.value;e.value=A(e.value,n,s),e.notify(r,n)}},e}const j=()=>Date.now()+Math.random();let B=0;const K=()=>{const t=Date.now().toString(36),e=Math.random().toString(36).substring(2,8),n=(B++).toString(36);return`${t}-${n}-${e}`},P=async(t,...e)=>{const n=performance.now();try{await t(...e)}catch(s){console.log(s)}finally{return performance.now()-n}},$=()=>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),f={IDnumber:j,IDstring:K,timeTracker:P,isMobile:$},v=g({id:0}),i=D(),l=t=>{const e=t.toastID||"init",n=i.get()[e]||[],s={...t,toastID:e,state:!0,id:t.id};return i.setKey(e,[...n,s]),v.set(n[0]||s),t.id},c=(t,e)=>l({...e,message:t,id:f.IDnumber()}),E=async(t,e)=>{setTimeout(()=>c(t,e),e?.delay||350)},b=(t,e)=>l({...e,children:t,id:f.IDnumber()}),C=async(t,e)=>{const n=e?.toastID||"init",s=f.IDnumber();let r;e?.loading&&(r=l({...e,message:e.loading,type:"loading",toastID:n,noDissapear:!0,id:s}));try{await t(),e?.success&&(r?u(n,s,{message:e.success,type:"success",noDissapear:!1}):l({...e,message:e.success,type:"success",toastID:n,id:s}))}catch(a){throw e?.error&&(r?u(n,r,{message:e.error,type:"error",noDissapear:!1}):l({...e,message:e.error,type:"error",toastID:n,id:s})),a}},I=(t,e)=>{const n=i.get();if(t&&e){const r=n[t].map(a=>a.id===e?{...a,state:!1}:a);i.setKey(t,r),d.removeDelay(t,e,300);return}if(t){const r=n[t].map(a=>({...a,state:!1}));i.setKey(t,r),r.forEach(a=>d.removeDelay(t,a.id,350));return}const s=Object.keys(n).reduce((r,a)=>(r[a]=n[a].map(x=>({...x,state:!1})),r),{});i.set(s),Object.keys(n).forEach(r=>{n[r].forEach(a=>d.removeDelay(r,a.id,350))})},p=(t,e)=>{const n=i.get()[t];if(n){const s=n.filter(r=>r.id!==e);i.setKey(t,s),v.set(s[0]||{id:0})}},S=(t,e,n)=>{setTimeout(()=>{p(t,e)},n||0)},u=(t,e,n)=>{const s=i.get();if(!s[t])return;const r=s[t].map(a=>a.id===e?{...a,...n}:a);i.setKey(t,r)},d={removeDelay:S,updateToast:u},U={show:(t,e)=>c(t,e),success:(t,e)=>c(t,{...e,type:"success"}),error:(t,e)=>c(t,{...e,type:"error"}),warning:(t,e)=>c(t,{...e,type:"warning"}),info:(t,e)=>c(t,{...e,type:"info"}),delay:E,custom:b,dismiss:I,remove:p,promise:C},F=o.jsx("svg",{viewBox:"0 0 20 20",fill:"currentColor",height:"22",width:"22",children:o.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})}),L=o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",height:"22",width:"22",children:o.jsx("path",{fillRule:"evenodd",d:"M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",clipRule:"evenodd"})}),N=o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"22",width:"22",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"})}),O=o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"22",width:"22",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})}),H=o.jsx(T,{size:18}),X={success:F,warning:L,error:O,info:N,loading:H};export{i as $,f as F,d as L,X as T,v as a,D as d,U as t};