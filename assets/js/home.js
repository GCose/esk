/**===========================
 * Initializate all systems.
 ============================*/
function init() {
  initHeroCarousel();
  initHeroSearchlight();
  initServices();
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
