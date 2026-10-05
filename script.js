// =========================
// CURRENT YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================
// ACTIVE NAV LINK (highlights current section on scroll)
// =========================

const navLinks = document.querySelectorAll(".nav-links a");
const pageSections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    },
    {
        rootMargin: "-40% 0px -55% 0px"
    }
);

pageSections.forEach(section => navObserver.observe(section));


// =========================
// SCROLL REVEAL
// =========================

const revealTargets = document.querySelectorAll(
    "section:not(.hero), .project-card, .skill-card, .cert-card, .stat-card"
);

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
