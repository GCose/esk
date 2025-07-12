/**========================
 * Initialize all systems.
 =========================*/
function init() {
  initLoadingScreen();
  initCustomCursor();
  initNavbarScroll();
  initHamburgerMenu();
  initHeroCarousel();
  initHeroSearchlight();
  initServices();
}

/**======================
 * Loading screen timer.
 =======================*/
function initLoadingScreen() {
  const loadingScreen = document.querySelector(".loading__screen");

  setTimeout(() => {
    loadingScreen.classList.add("slide-up");
  }, 2000);
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

/**=========================
 * Hero carousel system.
 ==========================*/
function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero__slide");
  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  setInterval(nextSlide, 4000);
}

/**===========================
 * Hero searchlight effect.
 ============================*/
function initHeroSearchlight() {
  const heroOverlay = document.querySelector(".hero__overlay");

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    heroOverlay.style.setProperty("--x", x + "%");
    heroOverlay.style.setProperty("--y", y + "%");
  });
}

/**==================================
 * Services interactive image system
 ===================================*/
function initServices() {
  const servicesList = document.getElementById("servicesList");
  const servicesImageAvif = document.getElementById("servicesImageAvif");
  const servicesImageWebp = document.getElementById("servicesImageWebp");
  const servicesImageJpg = document.getElementById("servicesImageJpg");

  const defaultImagePath =
    "/assets/images/home-page/services-section/kitchen/kitchen";

  if (!servicesList || !servicesImageJpg) return;

  servicesList.addEventListener(
    "mouseenter",
    (e) => {
      const serviceItem = e.target.closest(".services__item");
      if (!serviceItem) return;

      document.querySelectorAll(".services__item").forEach((item) => {
        item.classList.remove("active");
      });

      serviceItem.classList.add("active");

      const newImagePath = serviceItem.dataset.image;
      if (newImagePath) {
        servicesImageAvif.srcset = newImagePath + ".avif";
        servicesImageWebp.srcset = newImagePath + ".webp";
        servicesImageJpg.src = newImagePath + ".jpg";
        servicesImageJpg.alt =
          serviceItem.querySelector(".services__name").textContent;
      }
    },
    true
  );

  servicesList.addEventListener("mouseleave", () => {
    document.querySelectorAll(".services__item").forEach((item) => {
      item.classList.remove("active");
    });

    const firstItem = servicesList.querySelector(".services__item");
    if (firstItem) {
      firstItem.classList.add("active");
    }

    servicesImageAvif.srcset = defaultImagePath + ".avif";
    servicesImageWebp.srcset = defaultImagePath + ".webp";
    servicesImageJpg.src = defaultImagePath + ".jpg";
    servicesImageJpg.alt = "Custom Built-in Kitchen";
  });
}

document.addEventListener("DOMContentLoaded", init);
