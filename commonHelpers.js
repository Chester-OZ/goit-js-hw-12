import{a as v,i as u,S as w}from"./assets/vendor-ee72e1a4.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();let c="";async function f(e,r=1){c=e;const o="https://pixabay.com/api/",l=new URLSearchParams({key:"44613226-2c9c9ee480393e9e269050800",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:21});try{const{data:t}=await v(`${o}?${l}`);if(t.totalHits===0)S();else return t.hits}catch(t){console.error(t.message)}}const m={icon:"",position:"topRight",messageColor:"white",close:!1,closeOnEscape:!0,closeOnClick:!0,displayMode:"replace"},S=()=>u.error({message:"Sorry, there are no images matching your search query. Please, try again!",backgroundColor:"#CB1E1E",...m}),C=e=>u.error({message:"Please! Type something.",backgroundColor:"#CB1E1E",...m}),E=()=>u.error({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"blue",...m});let a;const y=document.querySelector(".gallery"),i=document.querySelector(".js-load-more");function q(e){y.innerHTML=e.map(r=>h(r)).join(""),a?a.refresh():a=new w(".gallery a",{captionDelay:250,captionsData:"alt"}),e.length>0&&e.length<14?i.style.display="none":i.style.display="block"}function $(e){y.insertAdjacentHTML("beforeend",e.map(r=>h(r)).join("")),a&&a.refresh()}i.addEventListener("click",O);let g=1;async function O(){if(c){g+=1,L();try{const e=await f(c,g);if(!e||e.length===0){d(),E(),i.style.display="none";return}$(e);const o=y.lastElementChild.getBoundingClientRect().height;window.scrollBy({left:0,top:o*2,behavior:"smooth"})}catch(e){console.error(e.message)}finally{d()}}}function h(e){return`<li class="gallery-item">
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
        </li>`}function L(){const e=document.querySelector(".loader");e.style.display="block"}function d(){const e=document.querySelector(".loader");e.style.display="none"}function M(){const e=document.querySelector(".gallery");e.innerHTML=""}const H=document.querySelector(".form"),p=document.querySelector(".input"),b=document.querySelector(".js-load-more");b.style.display="none";H.addEventListener("submit",async e=>{e.preventDefault(),M();const r=p.value.trim();if(r.length===0){C(),b.style.display="none";return}L(),p.value="";try{const o=await f(r);q(o)}catch(o){console.log(o.message)}finally{d()}});
//# sourceMappingURL=commonHelpers.js.map
