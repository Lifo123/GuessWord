import"./hoisted.DUfsGkyo.js";const o=localStorage.getItem("wordguess-user");if(!o)window.location.href="/acc/register";else{const i=JSON.parse(o);i.isLogin||(window.location.href="/acc/login"),!i.isPremium&&i.isLogin&&(window.location.href="/premium/")}