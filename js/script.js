/* ===== SECTION: Smooth navigation — START ===== */
document.querySelectorAll("[data-scroll]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const sections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".main-nav a");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`,
        ),
      );
    });
  },
  { threshold: 0.45 },
);
sections.forEach((section) => sectionObserver.observe(section));
/* ===== SECTION: Smooth navigation — END ===== */

/* ===== SECTION: Cursor interaction — START ===== */
const cursor = document.querySelector(".cursor-dot");
window.addEventListener("pointermove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});
/* ===== SECTION: Cursor interaction — END ===== */

/* ===== SECTION: Orbiting AI-tool badges — START ===== */
// The orbit rotates as one system. Edit the badge names and positions in index.html.
const toolOrbit = document.querySelector(".tool-orbit");
let orbitAngle = 0;
function animateToolOrbit() {
  orbitAngle += 0.08;
  toolOrbit.style.transform = `rotate(${orbitAngle}deg)`;
  requestAnimationFrame(animateToolOrbit);
}
if (toolOrbit && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  animateToolOrbit();
/* ===== SECTION: Orbiting AI-tool badges — END ===== */

/* =========================================================
   SECTION: Projects / Reels JavaScript — START
   ========================================================= */


/* =========================================================
   YOUTUBE SHORTS → EMBED URL
   ========================================================= */

function getYouTubeVideoId(url) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    /*
     * Supports:
     *
     * https://youtube.com/shorts/VIDEO_ID
     * https://www.youtube.com/shorts/VIDEO_ID
     * https://youtube.com/watch?v=VIDEO_ID
     * https://youtu.be/VIDEO_ID
     */

    if (parsedUrl.pathname.includes("/shorts/")) {
      return parsedUrl.pathname
        .split("/shorts/")[1]
        .split("/")[0];
    }

    if (parsedUrl.pathname.includes("/watch")) {
      return parsedUrl.searchParams.get("v");
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname
        .replace("/", "")
        .split("/")[0];
    }

  } catch (error) {
    console.warn("Invalid YouTube URL:", url);
  }

  return null;
}

/* =========================================================
   VIEW MORE / VIEW LESS
   ========================================================= */

const projectGrid =
  document.getElementById("projectGrid");

const projectsMoreBtn =
  document.getElementById("projectsMoreBtn");


if (projectGrid && projectsMoreBtn) {

  const hiddenCards =
    projectGrid.querySelectorAll(".project-card.is-hidden");

  const buttonText =
    projectsMoreBtn.querySelector(".btn-text");


  let isExpanded = false;


  /* =======================================================
     BUTTON CLICK
     ======================================================= */

  projectsMoreBtn.addEventListener("click", () => {

    /* -----------------------------------------------
       EXPAND
       ----------------------------------------------- */

    if (!isExpanded) {

      projectsMoreBtn.classList.add("is-changing");


      /*
       * Small delay makes the button text transition
       * feel smoother.
       */

      setTimeout(() => {

        hiddenCards.forEach((card) => {

          card.classList.remove("is-hidden");

        });


        projectGrid.classList.add("is-expanded");

        projectsMoreBtn.setAttribute(
          "aria-expanded",
          "true"
        );


        buttonText.textContent = "View Less";


        projectsMoreBtn.classList.remove(
          "is-changing"
        );


        isExpanded = true;

      }, 180);


    }

    /* -----------------------------------------------
       COLLAPSE
       ----------------------------------------------- */

    else {

      projectsMoreBtn.classList.add("is-changing");


      setTimeout(() => {

        /*
         * Remove expanded animation class.
         */

        projectGrid.classList.remove("is-expanded");


        /*
         * Hide the additional four cards.
         */

        hiddenCards.forEach((card) => {

          card.classList.add("is-hidden");

        });


        projectsMoreBtn.setAttribute(
          "aria-expanded",
          "false"
        );


        buttonText.textContent = "View More";


        projectsMoreBtn.classList.remove(
          "is-changing"
        );


        isExpanded = false;


        /*
         * Move the viewport back toward the project
         * section when collapsing.
         */

        const sectionTop =
          document.querySelector("#work");

        if (sectionTop) {

          const rect =
            sectionTop.getBoundingClientRect();

          /*
           * Only scroll if the user is currently
           * below the project area.
           */

          if (rect.top < -150) {

            window.scrollTo({
              top:
                window.scrollY +
                rect.top +
                100,

              behavior: "smooth"
            });

          }

        }

      }, 180);

    }

  });

}
/* ====== SECTION: Projects / Reels JavaScript — END ===== */

/* ===== SECTION: Entrance motion — START ===== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.15 },
);
document
  .querySelectorAll(
    ".about-copy,.about-visual,.project-card,.contact-section h2",
  )
  .forEach((element) => {
    element.classList.add("reveal-item");
    revealObserver.observe(element);
  });

const starField = document.querySelector(".star-field");

if (starField) {
  /* Remove existing generated stars (prevents duplicates) */
  starField
    .querySelectorAll(".space-star,.shooting-star")
    .forEach((el) => el.remove());

  /* ---------- Static + Floating Stars ---------- */

  for (let i = 0; i < 180; i++) {
    const star = document.createElement("span");
    star.className = "space-star";

    const size = Math.random() * 2 + 1;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.opacity = (Math.random() * 0.8 + 0.15).toFixed(2);

    star.style.animationDuration = `${120 + Math.random() * 120}s, ${3 + Math.random() * 5}s`;

    star.style.animationDelay = `-${Math.random() * 120}s, ${Math.random() * 5}s`;

    starField.appendChild(star);
  }

  /* ---------- Shooting Star ---------- */

  function createShootingStar() {
    const comet = document.createElement("span");
    comet.className = "shooting-star";

    comet.style.top = `${Math.random() * 35}%`;
    comet.style.left = "-220px";

    comet.style.animation = "shootingStar 2.8s linear forwards";

    starField.appendChild(comet);

    comet.addEventListener("animationend", () => comet.remove());
  }

  /* ---------- Infinite Loop ---------- */

  (function shootingLoop() {
    setTimeout(
      () => {
        createShootingStar();

        shootingLoop();
      },
      8000 + Math.random() * 10000,
    );
  })();
}
