
document.addEventListener("DOMContentLoaded", () => {

    // PAGE NAVIGATION

    const pages = document.querySelectorAll(".page-section");
    const navButtons = document.querySelectorAll("[data-page]");
    const navigation = document.getElementById("navigation");
    const menuToggle = document.getElementById("menuToggle");

    function showPage(pageName) {

        const targetPage = document.getElementById(pageName);

        if (!targetPage) return;

        // Hide all pages
        pages.forEach(page => {
            page.classList.remove("active");
        });

        // Show selected page
        targetPage.classList.add("active");

        // Update navigation
        document.querySelectorAll(".nav-btn").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.page === pageName
            );
        });

        // Close mobile menu
        if (navigation) {
            navigation.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }

        // Reset scroll
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Update browser address
        history.replaceState(null, "", "#" + pageName);
    }

    // Click navigation buttons
    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const pageName = button.dataset.page;

            showPage(pageName);

        });

    });

    // Mobile navigation

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

    }

    // Browser back / forward

    window.addEventListener("hashchange", () => {

        const pageName = location.hash.replace("#", "");

        if (pageName) {
            showPage(pageName);
        } else {
            showPage("home");
        }

    });

    // Initial page

    const initialPage = location.hash.replace("#", "");

    if (initialPage && document.getElementById(initialPage)) {
        showPage(initialPage);
    } else {
        showPage("home");
    }

    // Current year

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Reveal animations

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    // Console

    console.log(
        "%c KAFE-BAR OKSANA ",
        "background:#e87542;color:white;font-size:18px;padding:10px;"
    );

    console.log("Website successfully initialized.");

});
