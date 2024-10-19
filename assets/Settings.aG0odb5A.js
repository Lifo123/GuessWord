import{j as e}from"./jsx-runtime.CdUEbdov.js";import{r as a}from"./index.YZ_XhM9s.js";import{a as m,u as r,W as u,T as d}from"./GameStore.D6a2SI_B.js";/* empty css                       */function h(){const t=()=>{const o=localStorage.getItem("DMstate");return o?o==="true":DarkModeStore.get()};return{Toggle:()=>{let o=t();return localStorage.setItem("DMstate",!o),!o},setDark:()=>(localStorage.setItem("DMstate",!0),!0),setLight:()=>(localStorage.setItem("DMstate",!1),!1),setSystem:()=>{console.log("Function for system")},getInitialState:t}}function j({funct:t,initial:s}){const[l,c]=a.useState(s||!1),n=()=>{t()};return a.useEffect(()=>{c(s)},[s]),e.jsx("span",{className:`btn-togle br-max d-flex f-center pointer relative ${l?"active":""}`,onClick:n,children:e.jsx("span",{className:`btn-circle d-flex br-50 no-select absolute ${l?"active":""}`})})}const p=typeof window<"u",C=m(p&&localStorage.getItem("DMstate")==="true"||!1);function L(){const t=r(C),s=h(),l=()=>{const c=s.Toggle();C.set(c)};return a.useEffect(()=>{t?document.body.classList.add("DarkMode"):document.body.classList.remove("DarkMode")},[t]),e.jsx(j,{funct:l,initial:t})}function f({min:t=3,max:s=10,initialValue:l=5,funct:c=()=>{console.log("Sin funcion")}}){const[n,o]=a.useState(l),g=x=>{const i=x.target.value;o(i),c(i)};return e.jsx("input",{type:"range",min:t,max:s,value:n,onInput:g})}function w(){const t=r(u),s=r(d),[l,c]=a.useState(!1);return e.jsxs("div",{children:[e.jsx("span",{className:"setting-icon pointer",onClick:()=>c(n=>!n),children:l?e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",height:32,children:[e.jsx("path",{d:"M10.0303 8.96967C9.73741 8.67678 9.26253 8.67678 8.96964 8.96967C8.67675 9.26256 8.67675 9.73744 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2626 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9697L13.0606 12L15.0303 10.0303C15.3232 9.73746 15.3232 9.26258 15.0303 8.96969C14.7374 8.6768 14.2625 8.6768 13.9696 8.96969L12 10.9394L10.0303 8.96967Z",fill:"#1C274C"}),e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z"})]}):e.jsx("svg",{className:"no-select",viewBox:"0 0 36 36",height:32,children:e.jsxs("g",{children:[e.jsx("path",{d:"M18.1,11c-3.9,0-7,3.1-7,7s3.1,7,7,7c3.9,0,7-3.1,7-7S22,11,18.1,11z M18.1,23c-2.8,0-5-2.2-5-5s2.2-5,5-5c2.8,0,5,2.2,5,5S20.9,23,18.1,23z"}),e.jsx("path",{d:"M32.8,14.7L30,13.8l-0.6-1.5l1.4-2.6c0.3-0.6,0.2-1.4-0.3-1.9l-2.4-2.4c-0.5-0.5-1.3-0.6-1.9-0.3l-2.6,1.4l-1.5-0.6l-0.9-2.8C21,2.5,20.4,2,19.7,2h-3.4c-0.7,0-1.3,0.5-1.4,1.2L14,6c-0.6,0.1-1.1,0.3-1.6,0.6L9.8,5.2C9.2,4.9,8.4,5,7.9,5.5L5.5,7.9C5,8.4,4.9,9.2,5.2,9.8l1.3,2.5c-0.2,0.5-0.4,1.1-0.6,1.6l-2.8,0.9C2.5,15,2,15.6,2,16.3v3.4c0,0.7,0.5,1.3,1.2,1.5L6,22.1l0.6,1.5l-1.4,2.6c-0.3,0.6-0.2,1.4,0.3,1.9l2.4,2.4c0.5,0.5,1.3,0.6,1.9,0.3l2.6-1.4l1.5,0.6l0.9,2.9c0.2,0.6,0.8,1.1,1.5,1.1h3.4c0.7,0,1.3-0.5,1.5-1.1l0.9-2.9l1.5-0.6l2.6,1.4c0.6,0.3,1.4,0.2,1.9-0.3l2.4-2.4c0.5-0.5,0.6-1.3,0.3-1.9l-1.4-2.6l0.6-1.5l2.9-0.9c0.6-0.2,1.1-0.8,1.1-1.5v-3.4C34,15.6,33.5,14.9,32.8,14.7z M32,19.4l-3.6,1.1L28.3,21c-0.3,0.7-0.6,1.4-0.9,2.1l-0.3,0.5l1.8,3.3l-2,2l-3.3-1.8l-0.5,0.3c-0.7,0.4-1.4,0.7-2.1,0.9l-0.5,0.1L19.4,32h-2.8l-1.1-3.6L15,28.3c-0.7-0.3-1.4-0.6-2.1-0.9l-0.5-0.3l-3.3,1.8l-2-2l1.8-3.3l-0.3-0.5c-0.4-0.7-0.7-1.4-0.9-2.1l-0.1-0.5L4,19.4v-2.8l3.4-1l0.2-0.5c0.2-0.8,0.5-1.5,0.9-2.2l0.3-0.5L7.1,9.1l2-2l3.2,1.8l0.5-0.3c0.7-0.4,1.4-0.7,2.2-0.9l0.5-0.2L16.6,4h2.8l1.1,3.5L21,7.7c0.7,0.2,1.4,0.5,2.1,0.9l0.5,0.3l3.3-1.8l2,2l-1.8,3.3l0.3,0.5c0.4,0.7,0.7,1.4,0.9,2.1l0.1,0.5l3.6,1.1V19.4z"}),e.jsx("rect",{x:"0",y:"0",width:"36",height:"36",fillOpacity:"0"})]})})}),l?e.jsx("section",{className:"setting-cont f-col fixed w-100 d-flex",children:e.jsxs("div",{className:"f-col w-40 mx-auto mt-5 g-4",children:[e.jsxs("div",{className:"f-row g-4 f-justify-between f-align-center",children:[e.jsx("p",{children:"Modo Oscuro"}),e.jsx(L,{})]}),e.jsxs("div",{className:"f-row g-4 f-justify-between f-align-center",children:[e.jsx("p",{children:"Cantidad de letras"}),e.jsx(f,{min:3,max:7,initialValue:t,funct:n=>{u.set(Number(n))}})]}),e.jsxs("div",{className:"f-row g-4 f-justify-between f-align-center",children:[e.jsx("p",{children:"Numero de intentos"}),e.jsx(f,{min:3,max:8,initialValue:s,funct:n=>{d.set(Number(n))}})]})]})}):null]})}export{w as default};
