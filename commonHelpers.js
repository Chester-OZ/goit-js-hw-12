import{a as v,i as y,S}from"./assets/vendor-ee72e1a4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();async function h(e,s=1){const a="https://pixabay.com/api/",c=new URLSearchParams({key:"44613226-2c9c9ee480393e9e269050800",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:21});try{const{data:t}=await v(`${a}?${c}`),r=t.totalHits;return r===0?(C(),{images:[],totalHits:0}):{images:t.hits,totalHits:r}}catch(t){throw console.error(t.message),t}}const g={icon:"",position:"topRight",messageColor:"white",close:!1,closeOnEscape:!0,closeOnClick:!0,displayMode:"replace"},C=()=>y.error({message:"Sorry, there are no images matching your search query. Please, try again!",backgroundColor:"#CB1E1E",...g}),E=()=>y.error({message:"Please! Type something.",backgroundColor:"#CB1E1E",...g}),L=()=>y.error({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"blue",...g});let i;const p=document.querySelector(".gallery");function q(e){p.innerHTML=e.map(s=>b(s)).join(""),i?i.refresh():i=new S(".gallery a",{captionDelay:250,captionsData:"alt"})}function $(e){p.insertAdjacentHTML("beforeend",e.map(s=>b(s)).join("")),i&&i.refresh()}function b(e){return`<li class="gallery-item">
          <div class="gallery-item-image">
          <a href="${e.largeImageURL}"><img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" /></a>
          </div>
          <ul class="image-details">
            <li class="image-details-item">
              <h2 class="image-details-title">Likes</h2>
              <p class="image-details-value">${e.likes}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Views</h2>
              <p class="image-details-value">${e.views}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Comments</h2>
              <p class="image-details-value">${e.comments}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Downloads</h2>
              <p class="image-details-value">${e.downloads}</p>
            </li>
          </ul>
        </li>`}function w(){const e=document.querySelector(".loader");e.style.display="block"}function u(){const e=document.querySelector(".loader");e.style.display="none"}function H(){p.innerHTML=""}const O=document.querySelector(".form"),f=document.querySelector(".input"),o=document.querySelector(".js-load-more"),P=document.querySelector(".gallery");o.style.display="none";let l=1,m=0,n="";O.addEventListener("submit",async e=>{if(e.preventDefault(),H(),l=1,n=f.value.trim(),n.length===0){E(),o.style.display="none";return}w(),f.value="";try{const{images:s,totalHits:a}=await h(n,l);m=Math.ceil(a/21),q(s),a===0?o.style.display="none":l>=m?(o.style.display="none",L()):o.style.display="block"}catch(s){console.log(s.message)}finally{u()}});o.addEventListener("click",async()=>{if(n){l+=1,w();try{const{images:e}=await h(n,l);if(!e||e.length===0||l>=m){u(),L(),o.style.display="none";return}$(e);const a=P.lastElementChild.getBoundingClientRect().height;window.scrollBy({left:0,top:a*2,behavior:"smooth"})}catch(e){console.error(e.message)}finally{u()}}});
//# sourceMappingURL=commonHelpers.js.map
