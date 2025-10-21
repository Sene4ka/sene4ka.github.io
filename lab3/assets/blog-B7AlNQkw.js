import"./menu-Ct8tZCCw.js";const o="https://ceramic-api.onrender.com";function n(t){return`
    <article class="blog__item">
      <img 
        src="${new URL(t.image,o)}" 
        alt="${t.title}" 
        loading="lazy"
        class="blog__item-img"
      >
      <h3 class="title-h3-bold blog__item-title ">${t.title}</h3>
      <button class="btn-default blog__item-button">READ</button>
      <p class="blog__item-text">${t.excerpt}</p>
    </article>`}async function i(){const t=await fetch(`${o}/api/posts`);if(!t.ok)throw new Error(`Failed to fetch: ${t.status}`);return t.json()}async function r(){const t=document.querySelector(".blog__grid");if(!t)return console.warn("No .blog__grid found");t.innerHTML='<div class="loading">Loading…</div>';try{const e=await i();t.innerHTML=e.map(n).join("")}catch(e){console.error(e),t.innerHTML='<div class="error">Failed to load</div>'}}document.addEventListener("DOMContentLoaded",()=>{r()});
