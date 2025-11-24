
// let swiper = new Swiper(".treatmentsSwiper", {
//   slidesPerView: 1.10,
//   spaceBetween: 28,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   breakpoints: {
//     640: {
//       slidesPerView: 2.2,
//       spaceBetween: 28,
//     },
//     993: {
//       slidesPerView: 3.2,
//       spaceBetween: 28,
//     },
//     1200: {
//       slidesPerView: 3.6,
//       spaceBetween: 40,
//     },
//   },
// });

// tabs
(function () {
  const tabList = document.querySelectorAll(".tabs__tab");
  const panels = document.querySelectorAll(".tabs__panel");

  function activateTab(tab) {
    tabList.forEach((t) => {
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
    });
    panels.forEach((p) => p.setAttribute("hidden", ""));

    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    const panelId = tab.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    if (panel) panel.removeAttribute("hidden");
    tab.focus();
  }

  tabList.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      activateTab(e.currentTarget);
    });

    tab.addEventListener("keydown", (e) => {
      const key = e.key;
      const currentIndex = Array.prototype.indexOf.call(
        tabList,
        e.currentTarget
      );

      if (key === "ArrowRight" || key === "ArrowDown") {
        e.preventDefault();
        const next = tabList[(currentIndex + 1) % tabList.length];
        activateTab(next);
      } else if (key === "ArrowLeft" || key === "ArrowUp") {
        e.preventDefault();
        const prev =
          tabList[(currentIndex - 1 + tabList.length) % tabList.length];
        activateTab(prev);
      } else if (key === "Home") {
        e.preventDefault();
        activateTab(tabList[0]);
      } else if (key === "End") {
        e.preventDefault();
        activateTab(tabList[tabList.length - 1]);
      }
    });
  });

  function openFromHash() {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const targetTab = Array.from(tabList).find(
      (t) => t.getAttribute("aria-controls") === id
    );
    if (targetTab) activateTab(targetTab);
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
// tabs

// select
const langSelect = document.querySelector(".lang-select");
const langCurrent = document.querySelector(".lang-current span");
const langItems = document.querySelectorAll(".lang-dropdown li");

langSelect.addEventListener("click", (e) => {
  langSelect.classList.toggle("active");
});

langItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    langCurrent.textContent = item.dataset.lang;
    langSelect.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!langSelect.contains(e.target)) {
    langSelect.classList.remove("active");
  }
});
// select
