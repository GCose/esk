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
  const benefitsSection = document.querySelector(".benefits");
  const cardsContainer = document.querySelector(".benefits__cards-container");
  const cards = document.querySelectorAll(".benefits__card");

  if (!benefitsSection || !cardsContainer || cards.length !== 5) return;

  let isInSection = false;
  let sectionTop = 0;

  // Only run animation on screens larger than 768px
  function shouldRunAnimation() {
    return window.innerWidth > 768;
  }

  // Set initial height for the section to allow scrolling - only on large screens
  function updateSectionHeight() {
    if (shouldRunAnimation()) {
      const SCROLL_HEIGHT = window.innerHeight * 25;
      benefitsSection.style.height = `${SCROLL_HEIGHT}px`;
    } else {
      benefitsSection.style.height = ""; // Reset to CSS height for mobile
    }
  }

  function handleScroll() {
    // Exit early if screen is too small - let CSS handle mobile layout
    if (!shouldRunAnimation()) {
      // Reset any applied styles on small screens
      if (isInSection) {
        isInSection = false;
        cardsContainer.style.position = "";
        cardsContainer.style.top = "";
        cardsContainer.style.left = "";
        cardsContainer.style.right = "";
        cardsContainer.style.height = "";

        cards.forEach((card) => {
          card.style.transform = "";
          card.style.opacity = "";
        });
      }
      return;
    }

    const scrollY = window.scrollY;
    const rect = benefitsSection.getBoundingClientRect();
    sectionTop = scrollY + rect.top;

    const TRIGGER_OFFSET = window.innerHeight * 0.6;
    const SCROLL_HEIGHT = window.innerHeight * 25;

    // Check if we're in the section with offset
    const inSection =
      scrollY >= sectionTop + TRIGGER_OFFSET &&
      scrollY <= sectionTop + SCROLL_HEIGHT;

    if (inSection && !isInSection) {
      // Entering section - fix the container
      isInSection = true;
      cardsContainer.style.position = "fixed";
      cardsContainer.style.top = "12rem";
      cardsContainer.style.left = "6rem";
      cardsContainer.style.right = "0";
      cardsContainer.style.height = "calc(100vh - 16vh)";
    } else if (!inSection && isInSection) {
      // Leaving section - reset
      isInSection = false;
      cardsContainer.style.position = "";
      cardsContainer.style.top = "";
      cardsContainer.style.left = "";
      cardsContainer.style.right = "";
      cardsContainer.style.height = "";

      // Reset all transforms
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.opacity = "";
      });
      return;
    }

    if (!isInSection) return;

    // Calculate scroll progress within section
    const sectionProgress = (scrollY - sectionTop) / SCROLL_HEIGHT;
    const cardProgress = sectionProgress * 4;
    const currentCard = Math.floor(cardProgress);
    const transitionProgress = cardProgress - currentCard;

    // Update cards based on progress
    cards.forEach((card, index) => {
      card.style.opacity = "1";
      if (index === currentCard && currentCard < 4) {
        // Active card moving down
        const moveDown = transitionProgress * window.innerHeight;
        card.style.transform = `translate(-50%, calc(-50% + ${moveDown}px))`;
      } else if (index === currentCard + 1 && currentCard < 4) {
        // Next card coming into view
        const moveUp = (1 - transitionProgress) * -100;
        card.style.transform = `translate(-50%, calc(-50% + ${moveUp}px))`;
      } else if (index < currentCard) {
        // Cards that have moved past
        card.style.transform = `translate(-50%, calc(-50% + ${window.innerHeight}px))`;
      } else if (index === 4 && currentCard >= 4) {
        // Final card stays in view
        card.style.transform = `translate(-50%, -50%)`;
      } else {
        // Cards waiting in stack - keep original positioning
        card.style.transform = "";
      }
    });
  }

  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
      setTimeout(() => {
        ticking = false;
      }, 16);
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });

  window.addEventListener("resize", () => {
    updateSectionHeight();
    // Force a scroll check on resize to handle screen size changes
    if (!shouldRunAnimation() && isInSection) {
      handleScroll();
    }
  });

  updateSectionHeight();
}

document.addEventListener("DOMContentLoaded", initHome);
