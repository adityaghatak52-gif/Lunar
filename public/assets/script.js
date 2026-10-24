const menuButton = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const backdrop = document.querySelector(".backdrop");
function closeMenu(){ if(!nav||!menuButton)return; nav.classList.remove("open"); backdrop?.classList.remove("show"); menuButton.setAttribute("aria-expanded","false"); nav.setAttribute("inert",""); }
if(menuButton&&nav){
  menuButton.addEventListener("click",()=>{
    const open=!nav.classList.contains("open");
    nav.classList.toggle("open",open); backdrop?.classList.toggle("show",open);
    menuButton.setAttribute("aria-expanded",String(open));
    if(open) nav.removeAttribute("inert"); else nav.setAttribute("inert","");
  });
  backdrop?.addEventListener("click",closeMenu);
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
  window.addEventListener("resize",()=>{if(window.innerWidth>820)closeMenu()});
}
document.querySelectorAll(".faq-question").forEach(button=>{
  button.addEventListener("click",()=>{
    const item=button.closest(".faq-item");
    item?.classList.toggle("open");
    button.setAttribute("aria-expanded",String(item?.classList.contains("open")));
  });
});
const year=document.getElementById("year"); if(year) year.textContent=new Date().getFullYear();
