const demoPages = [...document.querySelectorAll(".demo-page")];
const demoControls = [...document.querySelectorAll("[data-demo-select]")];
const demoViewport = document.querySelector("#demo-viewport");
const demoCount = document.querySelector("#demo-count");
const demoProgress = document.querySelector(".demo-progress");
const showcase = document.querySelector(".showcase");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentDemo = 0;
let isVisible = false;
let isHovered = false;
let hasFocus = false;
let scrollTimer;
let nextTimer;
let manualTimer;

function clearDemoTimers() {
  window.clearTimeout(scrollTimer);
  window.clearTimeout(nextTimer);
  window.clearTimeout(manualTimer);
  demoProgress.classList.remove("is-running");
}

function scrollActiveDemo() {
  if (!reducedMotion.matches) {
    demoPages[currentDemo].classList.add("is-scrolling");
  }
}

function updateTravel() {
  const page = demoPages[currentDemo];
  const travel = Math.max(0, page.scrollHeight - demoViewport.clientHeight);
  page.style.setProperty("--travel", "-" + travel + "px");
}

function scheduleDemo() {
  window.clearTimeout(scrollTimer);
  window.clearTimeout(nextTimer);
  if (
    !isVisible ||
    isHovered ||
    hasFocus ||
    document.hidden ||
    reducedMotion.matches
  ) {
    return;
  }
  demoProgress.classList.remove("is-running");
  void demoProgress.offsetWidth;
  demoProgress.classList.add("is-running");
  scrollTimer = window.setTimeout(scrollActiveDemo, 1100);
  nextTimer = window.setTimeout(
    () => showDemo((currentDemo + 1) % demoPages.length),
    7600,
  );
}

function showDemo(index, manual = false) {
  clearDemoTimers();
  currentDemo = index;
  demoPages.forEach((page, position) => {
    page.hidden = position !== index;
    page.classList.remove("is-scrolling");
  });
  demoControls.forEach((control, position) => {
    control.classList.toggle("is-active", position === index);
    control.setAttribute("aria-pressed", String(position === index));
  });
  demoCount.textContent = String(index + 1).padStart(2, "0") + " / 03";

  updateTravel();

  if (manual) {
    manualTimer = window.setTimeout(scrollActiveDemo, 650);
  } else {
    scheduleDemo();
  }
}

demoControls.forEach((control) =>
  control.addEventListener("click", () => {
    showDemo(Number(control.dataset.demoSelect), true);
  }),
);
showcase.addEventListener("mouseenter", () => {
  isHovered = true;
  window.clearTimeout(scrollTimer);
  window.clearTimeout(nextTimer);
  demoProgress.classList.remove("is-running");
});
showcase.addEventListener("mouseleave", () => {
  isHovered = false;
  scheduleDemo();
});
showcase.addEventListener("focusin", () => {
  hasFocus = true;
  window.clearTimeout(scrollTimer);
  window.clearTimeout(nextTimer);
  demoProgress.classList.remove("is-running");
});
showcase.addEventListener("focusout", (event) => {
  if (!showcase.contains(event.relatedTarget)) {
    hasFocus = false;
    scheduleDemo();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearDemoTimers();
  } else {
    scheduleDemo();
  }
});
reducedMotion.addEventListener("change", () => {
  clearDemoTimers();
  if (reducedMotion.matches) {
    demoPages[currentDemo].classList.remove("is-scrolling");
  } else {
    scheduleDemo();
  }
});

const demoObserver = new IntersectionObserver(
  ([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible) {
      scheduleDemo();
    } else {
      clearDemoTimers();
    }
  },
  { threshold: 0.45 },
);
demoObserver.observe(showcase);
showDemo(0);
window.addEventListener("resize", updateTravel);
document.fonts.ready.then(updateTravel);

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
mainNav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.focus();
  }
});
