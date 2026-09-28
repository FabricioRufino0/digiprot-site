const pages = [...document.querySelectorAll(".demo-page")];
const controls = [...document.querySelectorAll("[data-demo-select]")];
const viewport = document.querySelector("#demo-viewport");
const count = document.querySelector("#demo-count");
const pagination = document.querySelector(".demo-pagination");
const previousDemo = document.querySelector("[data-demo-prev]");
const nextDemo = document.querySelector("[data-demo-next]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const compactViewport = window.matchMedia("(max-width: 950px)");
const heroFlow = document.querySelector(".hero-flow");
let heroVisible = false;
function syncHeroFlow() {
  const active = !reducedMotion.matches && !compactViewport.matches && heroVisible && !document.hidden;
  if (active) heroFlow.unpauseAnimations();
  else heroFlow.pauseAnimations();
}
if (heroFlow?.pauseAnimations && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    syncHeroFlow();
  }).observe(document.querySelector(".hero"));
  reducedMotion.addEventListener("change", syncHeroFlow);
  compactViewport.addEventListener("change", syncHeroFlow);
  document.addEventListener("visibilitychange", syncHeroFlow);
  syncHeroFlow();
}
let activeDemo = 0;
const dots = pages.map((_, index) => {
  const dot = document.createElement("span");
  pagination.append(dot);
  return dot;
});

function showDemo(index) {
  activeDemo = (index + pages.length) % pages.length;
  pages.forEach((page, position) => {
    const offset = (position - activeDemo + pages.length) % pages.length;
    page.dataset.position = offset === 0 ? "current" : offset === 1 ? "next" : offset === pages.length - 1 ? "previous" : "far";
    page.setAttribute("aria-hidden", String(position !== activeDemo));
  });
  controls.forEach((button, position) => {
    button.classList.toggle("is-active", position === activeDemo);
    button.setAttribute("aria-pressed", String(position === activeDemo));
  });
  dots.forEach((dot, position) => dot.classList.toggle("is-active", position === activeDemo));
  count.textContent = `${String(activeDemo + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
}

controls.forEach((button) => button.addEventListener("click", () => showDemo(Number(button.dataset.demoSelect))));
previousDemo.addEventListener("click", () => showDemo(activeDemo - 1));
nextDemo.addEventListener("click", () => showDemo(activeDemo + 1));
viewport.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showDemo(activeDemo - 1);
  if (event.key === "ArrowRight") showDemo(activeDemo + 1);
});
let touchStartX = 0;
viewport.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
viewport.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 45) showDemo(activeDemo + (delta < 0 ? 1 : -1));
}, { passive: true });
pages.forEach((page, index) => page.addEventListener("click", () => {
  if (index !== activeDemo) showDemo(index);
}));
showDemo(0);

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
function closeMenu() {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    closeMenu();
    menuToggle.focus();
  }
});
