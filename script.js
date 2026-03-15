/**
 * SerruAccess - Client-side JavaScript
 * Vanilla JS for form validation, smooth scrolling, accessibility, and UX
 *
 * Features:
 * - Contact form validation with real-time feedback
 * - AJAX form submission with loading states
 * - Smooth scrolling for anchor links
 * - Mobile navigation toggle
 * - Image lazy loading with intersection observer
 * - Keyboard navigation enhancements
 * - ARIA live regions for screen readers
 * - Focus management
 */

(function () {
    "use strict";

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    function init() {
        initMobileNav();
        initSmoothScroll();
        initLazyLoading();
        initContactForm();
        initAccessibility();
    }

    /* ========================================
       Mobile Navigation
       ======================================== */
    function initMobileNav() {
        const menuBtn = document.querySelector(".mobile-menu-btn");
        const nav = document.querySelector("nav ul");

        if (!menuBtn || !nav) {
            return;
        }

        menuBtn.addEventListener("click", function () {
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            this.setAttribute("aria-expanded", !isExpanded);
            nav.classList.toggle("is-open");

            // Announce to screen readers
            announceToScreenReader(isExpanded ? "Menu fermé" : "Menu ouvert");
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (e) {
            if (!menuBtn.contains(e.target) && !nav.contains(e.target)) {
                menuBtn.setAttribute("aria-expanded", "false");
                nav.classList.remove("is-open");
            }
        });

        // Close menu on escape key
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && nav.classList.contains("is-open")) {
                menuBtn.setAttribute("aria-expanded", "false");
                nav.classList.remove("is-open");
                menuBtn.focus();
            }
        });

        // Close menu when navigating to a link
        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menuBtn.setAttribute("aria-expanded", "false");
                nav.classList.remove("is-open");
            });
        });
    }

    /* ========================================
       Smooth Scrolling
       ======================================== */
    function initSmoothScroll() {
    // Smooth scroll for anchor links with offset for fixed header
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                const href = this.getAttribute("href");
                if (href === "#") {
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    const headerHeight =
            document.querySelector(".site-header")?.offsetHeight || 0;
                    const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });

                    // Set focus to target for accessibility
                    target.setAttribute("tabindex", "-1");
                    target.focus({ preventScroll: true });
                }
            });
        });
    }

    /* ========================================
       Lazy Loading Images
       ======================================== */
    function initLazyLoading() {
        if ("loading" in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
                if (!img.src) {
                    img.src = img.dataset.src;
                }
            });
            return;
        }

        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            observer.unobserve(img);
                        }
                    });
                },
                {
                    rootMargin: "50px 0px",
                    threshold: 0.01,
                },
            );

            lazyImages.forEach((img) => imageObserver.observe(img));
        } else {
            // Last resort: load all images after page load
            window.addEventListener("load", () => {
                lazyImages.forEach((img) => {
                    img.src = img.dataset.src || img.src;
                });
            });
        }
    }

    /* ========================================
       Contact Form Validation & Submission
       ======================================== */
    function initContactForm() {
        const form = document.getElementById("quote-form");
        if (!form) {
            return;
        }

        const fields = {
            name: {
                element: document.getElementById("name"),
                validate: (value) => value.trim().length >= 2,
                errorMsg: "Veuillez entrer votre nom (minimum 2 caractères)",
            },
            phone: {
                element: document.getElementById("phone"),
                validate: (value) =>
                    /^(0[1-9]\d{8})$|^(\+33[1-9]\d{8})$/.test(value.trim()),
                errorMsg:
          "Veuillez entrer un numéro de téléphone valide (ex: 0612345678 ou +33612345678)",
            },
            email: {
                element: document.getElementById("email"),
                validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
                errorMsg: "Veuillez entrer une adresse email valide",
            },
            service: {
                element: document.getElementById("service"),
                validate: (value) => value !== "",
                errorMsg: "Veuillez sélectionner un type d'intervention",
            },
            message: {
                element: document.getElementById("message"),
                validate: (value) => value.trim().length >= 10,
                errorMsg: "Veuillez décrire votre demande (minimum 10 caractères)",
            },
        };

        const submitBtn = document.getElementById("submit-btn");
        const btnText = document.getElementById("btn-text");
        const btnSpinner = document.getElementById("btn-spinner");
        const formStatus = document.getElementById("form-status");

        // Real-time validation
        Object.keys(fields).forEach((key) => {
            const field = fields[key];
            if (!field.element) {
                return;
            }

            // Validate on blur
            field.element.addEventListener("blur", function () {
                validateField(field);
            });

            // Clear error on input
            field.element.addEventListener("input", function () {
                clearFieldError(field);
            });
        });

        // Form submission
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            Object.keys(fields).forEach((key) => {
                if (!validateField(fields[key])) {
                    isValid = false;
                }
            });

            if (!isValid) {
                announceToScreenReader(
                    "Veuillez corriger les erreurs dans le formulaire",
                );
                return;
            }

            // Show loading state
            const formData = gatherFormData(fields);
            setFormLoading(true);
            hideFormStatus();

            try {
                const response = await fetch("/submit-quote", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    showFormStatus(
                        "success",
                        "Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.",
                    );
                    form.reset();
                    announceToScreenReader("Formulaire envoyé avec succès");
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    const errorMsg =
            errorData.message ||
            "Une erreur est survenue. Veuillez réessayer ultérieurement.";
                    showFormStatus("error", errorMsg);
                    announceToScreenReader("Erreur lors de l'envoi du formulaire");
                }
            } catch (error) {
                console.error("Form submission error:", error);
                showFormStatus(
                    "error",
                    "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.",
                );
                announceToScreenReader("Erreur de connexion");
            } finally {
                setFormLoading(false);
            }
        });

        function validateField(field) {
            const value = field.element.value;
            const errorEl = document.getElementById(`error-${field.element.id}`);

            if (!field.validate(value)) {
                field.element.classList.add("error");
                if (errorEl) {
                    errorEl.textContent = field.errorMsg;
                    errorEl.classList.add("is-visible");
                }
                return false;
            }

            clearFieldError(field);
            return true;
        }

        function clearFieldError(field) {
            field.element.classList.remove("error");
            const errorEl = document.getElementById(`error-${field.element.id}`);
            if (errorEl) {
                errorEl.classList.remove("is-visible");
            }
        }

        function gatherFormData(fields) {
            const data = {};
            Object.keys(fields).forEach((key) => {
                data[key] = fields[key].element.value.trim();
            });
            return data;
        }

        function setFormLoading(isLoading) {
            submitBtn.disabled = isLoading;
            btnText.style.display = isLoading ? "none" : "inline";
            btnSpinner.style.display = isLoading ? "block" : "none";
        }

        function showFormStatus(type, message) {
            formStatus.className = "form-status " + type;
            formStatus.textContent = message;
            formStatus.style.display = "block";
        }

        function hideFormStatus() {
            formStatus.style.display = "none";
        }
    }

    /* ========================================
       Accessibility Enhancements
       ======================================== */
    function initAccessibility() {
    // Trap focus within modal-like elements (if any)
    // Already handled by skip link, but we can add more

        // Announce dynamic content changes
        announceHandler();

        // Ensure pages with hash scroll to element
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    const headerHeight =
            document.querySelector(".site-header")?.offsetHeight || 0;
                    const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            20;
                    window.scrollTo(0, targetPosition);
                }
            }, 100);
        }
    }

    /* ========================================
       Screen Reader Announcements
       ======================================== */
    function announceToScreenReader(message) {
        let announcer = document.getElementById("sr-announcer");
        if (!announcer) {
            announcer = document.createElement("div");
            announcer.id = "sr-announcer";
            announcer.setAttribute("aria-live", "polite");
            announcer.setAttribute("aria-atomic", "true");
            announcer.className = "sr-text";
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;

        // Clear after a short delay
        setTimeout(() => {
            announcer.textContent = "";
        }, 1000);
    }

    // Global announcement handler for common events
    function announceHandler() {
    // Add announcement triggers for other components if needed
    }

    /* ========================================
       Performance Optimizations
       ======================================== */

    // Debounce utility
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle form validation on mobile properly
    const handleInput = debounce(function (e) {
        if (
            e.target.tagName === "INPUT" ||
      e.target.tagName === "TEXTAREA" ||
      e.target.tagName === "SELECT"
        ) {
            // Optional: auto-validate as user types (but not too aggressively)
        }
    }, 300);

    document.addEventListener("input", handleInput);

    // Preload critical resources hint
    if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
            // Non-critical initialization
            console.log("SerruAccess website loaded");
        });
    }
})();
