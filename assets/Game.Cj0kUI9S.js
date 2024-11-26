import{j as t}from"./jsx-runtime.CRkqtJS5.js";import{R as d}from"./index.B52nOzfP.js";import{M as l,a,_ as g,b as h,c as j}from"./GameLoader.Bkx_PAR8.js";import{_ as b}from"./Settings.Store.Ber4ZPNz.js";import{u}from"./index.DcIy302Z.js";import{A as y}from"./SocialIcon.C7nT6lAC.js";import{B as k}from"./ButtonPromise.BASp94UI.js";import{F as v}from"./ToastAssets.Bdm7Cuhy.js";import"./preload-helper.CLcXU_4U.js";import"./CircleLoading.DnCBQFdf.js";const L={send:t.jsx("svg",{height:30,viewBox:"0 -1 24 24",fill:"none",children:t.jsxs("g",{children:[" ",t.jsx("path",{d:"M7 12L9.89075 14.8907V14.8907C9.95114 14.951 10.049 14.9511 10.1094 14.8907V14.8907L17 8",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})," "]})}),backspace:t.jsx("svg",{height:26,viewBox:"0 -1 24 24",fill:"none",children:t.jsxs("g",{children:[t.jsx("path",{d:"M7.91987 5C7.33602 5 6.78132 5.25513 6.40136 5.69842L2.11564 10.6984C1.47366 11.4474 1.47366 12.5526 2.11564 13.3016L6.40136 18.3016C6.78132 18.7449 7.33602 19 7.91987 19L19 19C20.1046 19 21 18.1046 21 17L21 7C21 5.89543 20.1046 5 19 5L7.91987 5Z",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.8"}),t.jsx("path",{d:"M15 10.0001L11 14.0001",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5"}),t.jsx("path",{d:"M11 10.0001L15 14.0001",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5"})]})})};function x({id:s}){return L[`${s}`]}function A({path:s}){const i=u(a),[c,n]=d.useState(!1);return d.useEffect(()=>{n(!1),i.isWin!==void 0&&setTimeout(()=>{n(!0)},i.valid[0].length*(i.isWin?350:230))},[i.isWin]),d.useEffect(()=>{i.currentRow>0&&i.currentRow<=i.valid.length&&setTimeout(()=>{for(let e=0;e<i.currentRow;e++)i.valid[e].forEach(f=>{const o=document.querySelector(`[data-letter="${f.letter.toUpperCase()}"]`);o?.getAttribute("data-valid")!=="true"&&o?.setAttribute("data-valid",f.state)})},i.valid[0].length*240)},[i.currentRow]),t.jsxs("section",{className:"f-col w-100 relative mt-3",children:[t.jsxs("div",{className:"keyboard-container f-col",children:[t.jsx("div",{className:"f-row f-center",children:"QWERTYUIOP".split("").map((e,r)=>t.jsx(p,{content:e,onPointer:()=>l.typing(e)},r))}),t.jsxs("div",{className:"f-row f-center",children:["ASDFGHJKL".split("").map((e,r)=>t.jsx(p,{content:e,onPointer:()=>l.typing(e)},r)),t.jsx("span",{className:"key-box-icon d-flex f-center icon w-100 br-4 pointer",onPointerDown:()=>l.backspace(),children:t.jsx(x,{id:"backspace"})})]}),t.jsxs("div",{className:"f-row f-center",children:["ÑZXCVBNM".split("").map((e,r)=>t.jsx(p,{content:e,onPointer:()=>l.typing(e)},r)),t.jsx("span",{className:"key-box-icon d-flex f-center icon w-100 br-4 f-grow pointer",onPointerDown:()=>l.enter(s),children:t.jsx(x,{id:"send"})})]})]}),t.jsx("div",{className:`play-again absolute d-flex f-center h-100 w-100 ${c?"active":""}`,children:t.jsx(k,{className:"btn btn-primary br-6",text:"Play Again",onClick:async()=>{await new Promise(e=>setTimeout(e,500)),l.restart(s)}})})]})}const p=({content:s,onPointer:i,className:c})=>t.jsx("span",{className:`key-box br-4 d-flex f-center pointer fw-500 fs-2 ${c||""}`,onClick:i,"data-letter":s,children:s});function R({state:s}){return u(g),t.jsxs("div",{className:"game-popup p-2 br-8 f-col g-2",children:[t.jsx("h2",{children:s?"You win!":"You lose"}),t.jsx("p",{className:"fs-custom-13-5 fw-500",children:s?"Congratulations!":"Sorry, you lost"})]})}function E({data:s,index:i,currentLetter:c,currentRow:n}){const e=u(a),r=d.useRef(null);return d.useEffect(()=>{s.state!==void 0?(r?.current?.removeAttribute("data-valid"),r?.current?.removeAttribute("data-win"),r.current?.classList.remove("active"),setTimeout(()=>{r?.current?.classList.add("validate"),setTimeout(()=>{r.current?.setAttribute("data-valid",`${s.state}`),e.isWin&&e.currentRow===n&&setTimeout(()=>{r.current?.setAttribute("data-win","true")},(e?.valid[0].length+1)*120)},180)},i*150)):(r.current?.classList.remove("active"),r.current?.removeAttribute("data-valid"),r.current?.removeAttribute("data-win"))},[s.state]),t.jsx("span",{className:`game-box d-flex br-4 f-center ${c===i?"target":""} ${s.letter?"active":""}`,"data-valid":s.state,style:{pointerEvents:e.isWin!==void 0?"none":"visible",cursor:e.currentRow===n?"pointer":"default"},onClick:()=>{e.isWin===void 0&&e.currentRow===n&&a.setKey("currentLetter",i)},ref:r,children:s.letter})}function D({path:s,isDaily:i}){const c=u(g),n=u(a),e=u(b);let r=n.valid;const f=async o=>{const m=/^[a-zA-ZñÑ]$/;if(!(n.isWin||n.isWin===!1||n.currentRow===n.valid.length-1))if(m.test(o.key))l.typing(o.key);else if(o.key==="Backspace")l.backspace();else if(o.key==="Enter"){const w=await v.timeTracker(()=>l.enter(s));console.log(w)}else o.key==="ArrowLeft"?a.setKey("currentLetter",a.get().currentLetter-1):o.key==="ArrowRight"&&a.setKey("currentLetter",a.get().currentLetter+1)};return d.useEffect(()=>{if(n.isWin===void 0&&c.remainingGames>0&&(h.preloadData(e.lang,e.length),j.validatePrevData(s,e.lang,e.length),!v.isMobile()))return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)};i&&(a.setKey("isDaily",!0),console.log(a.get()))},[]),d.useEffect(()=>{n.isWin!==void 0&&y.custom(t.jsx(R,{state:n.isWin}),{id:"game-popup",bgClose:!0,animate:"custom",startAnim:{top:"1rem"},endAnim:{top:"-3.5rem"}})},[n.waiting]),d.useEffect(()=>{r=Array.from({length:e.tries},()=>Array.from({length:e.length},()=>({letter:"",state:void 0}))),a.setKey("valid",r)},[e.tries,e.length]),t.jsxs("div",{className:"game-board f-col f-align-between mx-auto mt-3",style:{pointerEvents:n.isWin!==void 0?"none":"visible"},children:[r?.map((o,m)=>t.jsx(N,{data:o,currentLetter:n.currentLetter,currentRow:n.currentRow,index:m},m)),t.jsx(A,{path:s})]})}const N=({data:s,currentLetter:i,currentRow:c,index:n})=>t.jsx("div",{className:"f-row f-center","data-row":n,children:s?.map((e,r)=>t.jsx(E,{data:e,index:r,currentLetter:c===n?i:null,currentRow:n},r))});export{D as default};
