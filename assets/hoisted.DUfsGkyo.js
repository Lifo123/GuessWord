const t=e=>{const a=window.matchMedia("(prefers-color-scheme: dark)").matches,o=localStorage.getItem("darkmode")||(a?"dark":"light"),c=r=>{e.documentElement.classList.toggle("dark",r==="dark"),e.documentElement.style.colorScheme=r};c(o==="system"?a?"dark":"light":o)};t(document);document.addEventListener("astro:before-swap",e=>t(e.newDocument));window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>t(document));
