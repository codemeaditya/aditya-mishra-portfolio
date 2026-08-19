"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navPanel = document.getElementById("navPanel");

    const navItems =
        document.querySelectorAll(".nav-item");

    const sections =
        document.querySelectorAll("main section[id]");


    /* =========================================
       NAVBAR SCROLL
    ========================================= */

    const updateNavbar = () => {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =========================================
       MOBILE / UNIVERSAL MENU
    ========================================= */

    const openMenu = () => {

        if (!menuToggle || !navPanel) return;

        navPanel.classList.add("open");
        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

        navPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("menu-open");
    };


    const closeMenu = () => {

        if (!menuToggle || !navPanel) return;

        navPanel.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        navPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("menu-open");
    };


    const toggleMenu = () => {

        if (
            navPanel.classList.contains("open")
        ) {
            closeMenu();
        } else {
            openMenu();
        }

    };


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleMenu();

            }
        );

    }


    /* =========================================
       NAVIGATION LINKS
    ========================================= */

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            event => {

                const targetId =
                    item.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                closeMenu();

                const navHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navHeight -
                    20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =========================================
       OUTSIDE CLICK
    ========================================= */

    document.addEventListener(
        "click",
        event => {

            if (!navPanel.classList.contains("open")) {
                return;
            }

            const clickedInsidePanel =
                navPanel.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsidePanel &&
                !clickedToggle
            ) {
                closeMenu();
            }

        }
    );


    /* =========================================
       ESCAPE
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =========================================
       ACTIVE SECTION
    ========================================= */

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navItems.forEach(item => {

                        item.classList.toggle(
                            "active",
                            item.getAttribute("href") ===
                            `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =========================================
       HERO REVEAL
    ========================================= */

    const heroElements =
        document.querySelectorAll(
            ".hero-animate"
        );


    requestAnimationFrame(() => {

        setTimeout(() => {

            document.body.classList.add(
                "hero-loaded"
            );

        }, 100);

    });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".section-container > *, .project-card, .skill-card, .lab-card, .timeline-item, .contact-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-element"
                );

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


    /* =========================================
       CURRENT YEAR
    ========================================= */

    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =========================================
       REDUCED MOTION
    ========================================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const handleMotion = () => {

        document.documentElement.classList.toggle(
            "reduce-motion",
            reducedMotion.matches
        );

    };


    handleMotion();

    if (reducedMotion.addEventListener) {

        reducedMotion.addEventListener(
            "change",
            handleMotion
        );

    }

});