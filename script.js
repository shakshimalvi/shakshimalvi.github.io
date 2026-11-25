// =========================
// CURRENT YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================
// HELPERS
// =========================

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const supportsObserver = "IntersectionObserver" in window;


// =========================
// ACTIVE NAV LINK (highlights current section on scroll)
// =========================

const navList = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");
const pageSections = document.querySelectorAll("section[id]");

function setActiveLink(id) {
    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === "#" + id;
        link.classList.toggle("active", isActive);

        // On phones the nav is a swipeable row: keep the active link in view
        if (isActive && navList && navList.scrollWidth > navList.clientWidth) {
            const target =
                link.offsetLeft - (navList.clientWidth - link.offsetWidth) / 2;
            navList.scrollTo({
                left: target,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        }
    });
}

if (supportsObserver) {
    const navObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        {
            rootMargin: "-40% 0px -55% 0px"
        }
    );

    pageSections.forEach(section => navObserver.observe(section));
}


// =========================
// SCROLL REVEAL
// =========================

const revealTargets = document.querySelectorAll(
    "section:not(.hero), .project-card, .skill-card, .cert-card, .stat-card"
);

if (supportsObserver && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    revealTargets.forEach(el => {
        el.classList.add("reveal");
        revealObserver.observe(el);
    });
}
// If the browser has no IntersectionObserver, or the visitor prefers reduced
// motion, the "reveal" class is never added, so all content shows immediately.
