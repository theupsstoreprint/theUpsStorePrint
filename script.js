// Shared navigation for every page
(() => {
  function setupNavigation() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    const button = header.querySelector(".nav-toggle");
    const navigation = header.querySelector(".site-nav");

    if (!button || !navigation) return;

    // Use the hamburger icon on every page.
    button.textContent = "☰";
    button.setAttribute("aria-label", "Open navigation menu");
    button.setAttribute("aria-expanded", "false");

    header.classList.add("nav-ready");

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    navigation.querySelectorAll("a").forEach(link => {
      const linkedPage =
        new URL(link.href).pathname.split("/").pop();

      if (linkedPage === currentPage) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    function setMenu(open) {
      navigation.classList.toggle("is-open", open);

      button.setAttribute("aria-expanded", String(open));

      button.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
      );

      button.textContent = open ? "×" : "☰";
    }

    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      setMenu(!open);
    });

    navigation.addEventListener("click", event => {
      if (event.target.closest("a")) setMenu(false);
    });

    header.addEventListener("keydown", event => {
      if (
        event.key === "Escape" &&
        button.getAttribute("aria-expanded") === "true"
      ) {
        setMenu(false);
        button.focus();
      }
    });

    document.addEventListener("click", event => {
      if (!header.contains(event.target)) setMenu(false);
    });

    const mobileLayout = window.matchMedia("(max-width: 1100px)");

    mobileLayout.addEventListener("change", () => {
      setMenu(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupNavigation);
  } else {
    setupNavigation();
  }
})();
