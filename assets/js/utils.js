/**========================
 * Initialize all systems.
 =========================*/
function init() {
  initLoadingScreen();
  initCustomCursor();
  initNavbarScroll();
  initHamburgerMenu();
}

/**======================
 * Loading screen timer.
 =======================*/
function initLoadingScreen() {
  const loadingScreen = document.querySelector(".loading__screen");

  setTimeout(() => {
    loadingScreen.classList.add("slide-up");
  }, 3000);
}

/**======================
 * Custom cursor system
 =======================*/
function initCustomCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor__follower");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 50);
  });

  document.querySelectorAll("a, .image__container").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2)";
      cursor.style.borderColor = "#2a2a2a";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      cursor.style.borderColor = "#fff";
    });
  });
}

/**=================================
 * Navbar scroll background change.
 ==================================*/
function initNavbarScroll() {
  const navbar = document.querySelector(".nav");
  const scrollThreshold = 100;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > scrollThreshold) {
      navbar.classList.add("nav--scrolled");
    } else {
      navbar.classList.remove("nav--scrolled");
    }
  }
  window.addEventListener("scroll", handleScroll);
}

/**==========================
 * Immersive navigation menu
 ===========================*/
function initHamburgerMenu() {
  const hamburger = document.querySelector(".nav__hamburger");
  const navOverlay = document.querySelector(".nav__overlay");
  const closeButton = document.querySelector(".nav__close");

  function openMenu() {
    hamburger.classList.add("active");
    navOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    if (navOverlay.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener("click", closeMenu);

  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navOverlay.classList.contains("active")) {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
