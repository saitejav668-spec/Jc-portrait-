'use strict';
const chapters=[{"id":"mind"},{"id":"language"},{"id":"work"},{"id":"learning"},{"id":"aesthetics"},{"id":"making"},{"id":"living"},{"id":"values"}];
const portrait=document.querySelector('#portrait');
const links=[...document.querySelectorAll('[data-chapter]')];
function selectChapter(id,scroll=false){
if(!chapters.some(c=>c.id===id)) return;
document.querySelectorAll('.chapter').forEach(c=>c.hidden=c.id!==id);
links.forEach(a=>{if(a.dataset.chapter===id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
if(scroll){portrait.focus({preventScroll:true});portrait.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})}
}
links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();history.pushState(null,'',a.getAttribute('href'));selectChapter(a.dataset.chapter,matchMedia('(max-width:700px)').matches)}));
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{history.pushState(null,'','#'+b.dataset.next);selectChapter(b.dataset.next,true)}));
addEventListener('hashchange',()=>selectChapter(location.hash.slice(1),true));
addEventListener('popstate',()=>selectChapter(chapters.some(c=>c.id===location.hash.slice(1))?location.hash.slice(1):'mind'));
selectChapter(chapters.some(c=>c.id===location.hash.slice(1))?location.hash.slice(1):'mind');
