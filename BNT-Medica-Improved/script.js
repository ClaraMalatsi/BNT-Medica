
document.addEventListener("DOMContentLoaded", () => {
  const body=document.body;
  const menu=document.querySelector(".menu-btn");
  const nav=document.querySelector(".main-nav");
  if(menu) menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open);});

  const theme=document.querySelector("[data-theme-toggle]");
  const saved=localStorage.getItem("bnt-theme");
  if(saved) body.dataset.theme=saved;
  if(theme) theme.addEventListener("click",()=>{
    const next=body.dataset.theme==="dark"?"light":"dark";
    body.dataset.theme=next; localStorage.setItem("bnt-theme",next);
    theme.textContent=next==="dark"?"☀":"☾";
    theme.setAttribute("aria-label",next==="dark"?"Switch to light mode":"Switch to dark mode");
  });

  document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener("click",e=>e.preventDefault()));

  const toast=document.querySelector(".toast");
  const showToast=(msg)=>{
    if(!toast)return; toast.textContent=msg; toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),2500);
  };

  let cart=Number(localStorage.getItem("bnt-cart")||0);
  const cartCount=document.querySelector(".cart-count");
  const updateCart=()=>{if(cartCount)cartCount.textContent=cart};
  updateCart();
  document.querySelectorAll("[data-add-cart]").forEach(btn=>btn.addEventListener("click",()=>{
    cart++; localStorage.setItem("bnt-cart",cart); updateCart(); showToast("Product added to your cart.");
  }));

  const search=document.querySelector("[data-library-search]");
  const filters=[...document.querySelectorAll(".filter-btn")];
  const articles=[...document.querySelectorAll("[data-category]")];
  let active="all";
  const filterArticles=()=>{
    const q=(search?.value||"").toLowerCase().trim();
    articles.forEach(card=>{
      const text=card.textContent.toLowerCase(), cat=card.dataset.category;
      card.hidden=!(text.includes(q)&&(active==="all"||cat===active));
    });
  };
  search?.addEventListener("input",filterArticles);
  filters.forEach(btn=>btn.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    active=btn.dataset.filter;filterArticles();
  }));

  document.querySelectorAll("[data-demo-form]").forEach(form=>form.addEventListener("submit",e=>{
    e.preventDefault(); showToast("Thank you. Your message has been received.");
    form.reset();
  }));

  const homeSearch=document.querySelector("[data-home-search]");
  homeSearch?.addEventListener("submit",e=>{
    e.preventDefault();
    const q=e.target.querySelector("input").value.trim();
    if(q) window.location.href=`health-library.html?search=${encodeURIComponent(q)}`;
  });
  const params=new URLSearchParams(location.search);
  if(search&&params.get("search")){search.value=params.get("search");search.dispatchEvent(new Event("input"));}
});
