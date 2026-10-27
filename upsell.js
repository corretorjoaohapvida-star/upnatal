'use strict';
const cfg=window.UPSELL_CONFIG||{};
const price=document.getElementById('upsell-price');
if(cfg.priceLabel&&price)price.textContent=cfg.priceLabel;
const accept=document.getElementById('accept-upsell');if(accept&&cfg.acceptUrl&&/^https:\/\//.test(cfg.acceptUrl))accept.href=cfg.acceptUrl;
const decline=document.getElementById('decline-upsell');if(decline&&cfg.declineUrl)decline.href=cfg.declineUrl;
document.querySelectorAll('[data-gallery]').forEach(gallery=>{
 const track=gallery.querySelector('.gallery-track'),slides=[...gallery.querySelectorAll('.slide')],dots=[...gallery.querySelectorAll('.gallery-dot')];let current=0;
 const go=n=>{current=(n+slides.length)%slides.length;track.style.transform=`translateX(-${current*100}%)`;dots.forEach((dot,i)=>{dot.classList.toggle('active',i===current);dot.setAttribute('aria-pressed',String(i===current));});slides.forEach((slide,i)=>{slide.tabIndex=i===current?0:-1;slide.setAttribute('aria-hidden',String(i!==current));});gallery.querySelector('.gallery-caption').textContent=slides[current].dataset.caption;gallery.querySelector('.gallery-count').textContent=`${current+1} / ${slides.length}`;};
 gallery.querySelector('.prev').addEventListener('click',()=>go(current-1));gallery.querySelector('.next').addEventListener('click',()=>go(current+1));dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
 gallery.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();go(current+1);}if(event.key==='ArrowLeft'){event.preventDefault();go(current-1);}});
 let origin=null;const win=gallery.querySelector('.gallery-window');win.addEventListener('touchstart',event=>{origin={x:event.touches[0].clientX,y:event.touches[0].clientY};},{passive:true});win.addEventListener('touchend',event=>{if(!origin)return;const dx=event.changedTouches[0].clientX-origin.x,dy=event.changedTouches[0].clientY-origin.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))go(current+(dx<0?1:-1));origin=null;},{passive:true});
});
document.querySelectorAll('.sample').forEach(button=>button.addEventListener('click',()=>{const img=document.getElementById('modalImg');img.src=button.dataset.image;img.alt=button.dataset.caption;document.getElementById('image-caption').textContent=button.dataset.caption;document.getElementById('image-dialog').showModal();}));
document.querySelectorAll('dialog .close,.dialog-back').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
const galleries=[...document.querySelectorAll('[data-gallery]')];if(galleries.length)galleries[0].classList.add('mobile-active');
document.querySelectorAll('[data-gallery-target]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-gallery-target]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});galleries.forEach(g=>g.classList.toggle('mobile-active',g.dataset.gallery===button.dataset.galleryTarget));}));
