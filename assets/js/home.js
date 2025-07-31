/**===========================
 * Initializate all systems.
 ============================*/
function initHome() {
  initHeroCarousel();
  initHeroSearchlight();
  initServices();
  initBenefitsCards();
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

/**=================================
 * Benefits Cards Scroll Animation
 ==================================*/
function initBenefitsCards() {
  const section = document.querySelector(".benefits");
  const container = document.querySelector(".benefits__cards-container");
  const card1 = document.querySelector(".benefits__card--1");
  const sideCards = [
    document.querySelector(".benefits__card--2"),
    document.querySelector(".benefits__card--3"),
    document.querySelector(".benefits__card--4"),
    document.querySelector(".benefits__card--5"),
  ];

  if (!section || !container || !card1 || sideCards.some((card) => !card))
    return;

  let isActive = false;
  let sectionTop = 0;
  let sectionHeight = 0;
  let triggerOffset = 0;

  function shouldAnimate() {
    return window.innerWidth > 768;
  }

  function updateSection() {
    if (shouldAnimate()) {
      const viewportHeight = window.innerHeight;
      sectionHeight = viewportHeight * 5;
      triggerOffset = viewportHeight * 0.3;
      section.style.height = `${sectionHeight}px`;
    } else {
      section.style.height = "";
    }
  }

  function calculateProgress() {
    const rect = section.getBoundingClientRect();
    sectionTop = window.scrollY + rect.top;
    const scrollInSection = window.scrollY - sectionTop - triggerOffset;
    const animationHeight = sectionHeight - triggerOffset;
    return Math.max(0, Math.min(1, scrollInSection / animationHeight));
  }

  function shouldStartAnimation() {
    const rect = section.getBoundingClientRect();
    sectionTop = window.scrollY + rect.top;
    const scrollInSection = window.scrollY - sectionTop;
    return scrollInSection >= triggerOffset;
  }

  function shouldEndAnimation() {
    const rect = section.getBoundingClientRect();
    sectionTop = window.scrollY + rect.top;
    const scrollInSection = window.scrollY - sectionTop;
    return scrollInSection >= sectionHeight;
  }

  function animateCard1(progress) {
    if (progress <= 0.6) {
      const phase1Progress = progress / 0.6;
      card1.style.gridColumn = "1 / -1";
      card1.style.gridRow = "1 / -1";
      const scale = 1 - phase1Progress * 0.3;
      card1.style.transform = `scale(${scale})`;
    } else {
      card1.style.gridColumn = "2";
      card1.style.gridRow = "1 / -1";
      card1.style.transform = "scale(0.7)";
    }
  }

  function animateSideCards(progress) {
    if (progress <= 0.5) {
      sideCards.forEach((card, index) => {
        card.style.opacity = "0";
        if (index < 2) {
          card.style.transform = "translateX(-100%)";
        } else {
          card.style.transform = "translateX(100%)";
        }
      });
    } else {
      const phase2Progress = (progress - 0.5) / 0.3;
      sideCards.forEach((card, index) => {
        card.style.opacity = "1";
        if (index < 2) {
          const translateX = -100 + phase2Progress * 100;
          card.style.transform = `translateX(${translateX}%)`;
        } else {
          const translateX = 100 - phase2Progress * 100;
          card.style.transform = `translateX(${translateX}%)`;
        }
      });
    }
  }

  function handleScroll() {
    if (!shouldAnimate()) return;

    if (shouldStartAnimation() && !shouldEndAnimation()) {
      if (!isActive) {
        activateSection();
      }
      const progress = calculateProgress();
      animateCard1(progress);
      animateSideCards(progress);
    } else if ((shouldEndAnimation() || !shouldStartAnimation()) && isActive) {
      deactivateSection();
    }
  }

  function resetLayout() {
    card1.style.gridColumn = "1 / -1";
    card1.style.gridRow = "1 / -1";
    card1.style.transform = "";

    sideCards.forEach((card, index) => {
      card.style.opacity = "0";
      if (index < 2) {
        card.style.transform = "translateX(-100%)";
      } else {
        card.style.transform = "translateX(100%)";
      }
    });
  }

  function activateSection() {
    isActive = true;
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.right = "0";
    container.style.bottom = "0";
  }

  function deactivateSection() {
    isActive = false;
    container.style.position = "";
    container.style.top = "";
    container.style.left = "";
    container.style.right = "";
    container.style.bottom = "";
    container.style.zIndex = "";
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  window.addEventListener("resize", () => {
    updateSection();
    if (!shouldAnimate() && isActive) {
      deactivateSection();
      resetLayout();
    }
  });

  updateSection();
  resetLayout();
}

document.addEventListener("DOMContentLoaded", initHome);
