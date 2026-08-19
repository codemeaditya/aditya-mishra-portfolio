/* =========================================================
   ADITYA PRAKASH MISHRA
   PERSONAL BRAND PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const navbar = document.getElementById("navbar");
    const navMenu = document.getElementById("navMenu");
    const menuToggle = document.getElementById("menuToggle");
    const themeToggle = document.getElementById("themeToggle");

    const navLinks = document.querySelectorAll(".nav-link");
    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-up"
    );

    const projectButtons = document.querySelectorAll(
        ".project-link"
    );

    const projectModal =
        document.getElementById("projectModal");

    const projectModalClose =
        document.getElementById("projectModalClose");

    const modalOverlay =
        document.querySelector(".project-modal-overlay");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalTech =
        document.getElementById("modalTech");


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const openMenu = () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.add("open");
        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

        document.body.classList.add("menu-open");

    };


    const closeMenu = () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        document.body.classList.remove("menu-open");

    };


    const toggleMenu = () => {

        if (!navMenu) return;

        if (navMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }

    };


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }


    /* -----------------------------------------------------
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
       ----------------------------------------------------- */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* -----------------------------------------------------
       CLOSE MENU WHEN CLICKING OUTSIDE
       ----------------------------------------------------- */

    document.addEventListener("click", event => {

        if (!navMenu || !menuToggle) return;

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            navMenu.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

            closeProjectModal();

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const currentId =
                        entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        const target =
                            link.getAttribute("href");

                        if (
                            target === `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                root: null,
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight -
                    16;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       THEME SYSTEM
       ===================================================== */

    const savedTheme =
        localStorage.getItem("aditya-theme");


    const applyTheme = theme => {

        if (theme === "light") {

            document.documentElement
                .setAttribute(
                    "data-theme",
                    "light"
                );

            if (themeToggle) {

                themeToggle.textContent = "☾";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark theme"
                );

            }

        } else {

            document.documentElement
                .setAttribute(
                    "data-theme",
                    "dark"
                );

            if (themeToggle) {

                themeToggle.textContent = "☀";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light theme"
                );

            }

        }

    };


    applyTheme(
        savedTheme || "dark"
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const currentTheme =
                    document.documentElement
                        .getAttribute("data-theme");

                const nextTheme =
                    currentTheme === "light"
                        ? "dark"
                        : "light";

                applyTheme(nextTheme);

                localStorage.setItem(
                    "aditya-theme",
                    nextTheme
                );

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATIONS
       ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       PROJECT DATA
       ===================================================== */

    const projects = {

        floatvolume: {

            title: "FloatVolume X",

            category:
                "ANDROID · ACCESSIBILITY",

            description:
                "An accessibility-focused Android utility designed around a floating control experience for device functions. The project explores how software can provide practical alternatives when physical controls are inconvenient or unavailable.",

            technologies: [
                "Android",
                "Kotlin",
                "UI/UX",
                "Accessibility"
            ]

        },


        syp: {

            title: "SYP India",

            category:
                "YOUTH · LEADERSHIP · COMMUNITY",

            description:
                "A youth-focused initiative centered around leadership, public speaking, democracy and meaningful youth participation. The digital experience focuses on creating a strong and professional identity for the initiative.",

            technologies: [
                "Web",
                "UI/UX",
                "Branding",
                "Community"
            ]

        },


        skillflow: {

            title: "SkillFlow",

            category:
                "EDTECH · PRODUCT · LEARNING",

            description:
                "A mission-based learning concept designed to make learning more interactive and action-oriented through practical tasks, experimentation and progress-driven experiences.",

            technologies: [
                "Web",
                "Product Design",
                "UI/UX",
                "AI"
            ]

        }

    };


    /* =====================================================
       PROJECT MODAL
       ===================================================== */

    const openProjectModal = projectId => {

        const project =
            projects[projectId];

        if (!project || !projectModal) {
            return;
        }


        if (modalTitle) {

            modalTitle.textContent =
                project.title;

        }


        if (modalCategory) {

            modalCategory.textContent =
                project.category;

        }


        if (modalDescription) {

            modalDescription.textContent =
                project.description;

        }


        if (modalTech) {

            modalTech.innerHTML = "";

            project.technologies.forEach(
                technology => {

                    const tag =
                        document.createElement(
                            "span"
                        );

                    tag.textContent =
                        technology;

                    modalTech.appendChild(
                        tag
                    );

                }
            );

        }


        projectModal.classList.add("open");

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    };


    function closeProjectModal() {

        if (!projectModal) return;

        projectModal.classList.remove(
            "open"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    projectButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const projectId =
                    button.dataset.project;

                openProjectModal(
                    projectId
                );

            }
        );

    });


    if (projectModalClose) {

        projectModalClose.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProjectModal
        );

    }


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const handleReducedMotion = () => {

        if (
            reducedMotion.matches
        ) {

            document.documentElement
                .classList
                .add("reduce-motion");

        } else {

            document.documentElement
                .classList
                .remove("reduce-motion");

        }

    };


    handleReducedMotion();


    if (
        reducedMotion.addEventListener
    ) {

        reducedMotion.addEventListener(
            "change",
            handleReducedMotion
        );

    }


    /* =====================================================
       IMAGE FALLBACK
       ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                image.style.opacity = "0";

            }
        );

    });


    /* =====================================================
       BUTTON RIPPLE
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-button, .secondary-button, .nav-contact"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.className =
                    "button-ripple";

                const rect =
                    button.getBoundingClientRect();

                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;

                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 650);

            }
        );

    });


    /* =====================================================
       MAGNETIC HOVER — DESKTOP ONLY
       ===================================================== */

    const canHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (canHover) {

        const magneticElements =
            document.querySelectorAll(
                ".primary-button, .nav-contact"
            );


        magneticElements.forEach(element => {

            element.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    element.style.transform =
                        `translate(${x * 0.08}px, ${y * 0.08}px)`;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date()
                    .getFullYear();

        }
    );


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    document.body.classList.add(
        "js-ready"
    );


    console.log(
        "%cAditya Mishra Portfolio",
        "font-size:20px;font-weight:700;"
    );

    console.log(
        "%cBuilt with curiosity.",
        "font-size:13px;"
    );

});