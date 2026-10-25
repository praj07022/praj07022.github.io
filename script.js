
/* =========================
   PROJECTS SLIDER
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("projectsSlider");
    const track = document.getElementById("projectsTrack");
    const prevButton = document.getElementById("projectPrev");
    const nextButton = document.getElementById("projectNext");
    const dotsContainer = document.getElementById("projectDots");

    // Stop if the Projects section is not present
    if (!slider || !track || !dotsContainer) {
        return;
    }

    const slides = Array.from(
        track.querySelectorAll(".project-slide")
    );

    if (slides.length === 0) {
        return;
    }

    let currentIndex = 0;
    let visibleSlides = 3;
    let maxIndex = 0;

    // Touch swipe variables
    let touchStartX = 0;
    let touchEndX = 0;

    // Detect how many cards fit in the viewport
    function getVisibleSlides() {
        if (window.innerWidth <= 760) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }

    // Calculate the maximum slider position
    function calculateMaxIndex() {
        visibleSlides = getVisibleSlides();

        maxIndex = Math.max(
            0,
            slides.length - visibleSlides
        );

        currentIndex = Math.min(currentIndex, maxIndex);
    }

    // Create navigation dots dynamically
    function createDots() {
        dotsContainer.innerHTML = "";

        const totalPositions = maxIndex + 1;

        for (let i = 0; i < totalPositions; i++) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.setAttribute(
                "aria-label",
                `Show project position ${i + 1}`
            );

            dot.addEventListener("click", () => {
                currentIndex = i;
                updateSlider();
            });

            dotsContainer.appendChild(dot);
        }
    }

    // Move the slider to the current position
    function updateSlider() {
        calculateMaxIndex();

        const firstSlide = slides[0];
        const slideWidth = firstSlide.getBoundingClientRect().width;

        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.columnGap) || 0;

        const offset = currentIndex * (slideWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        // Update active dot
        const dots = dotsContainer.querySelectorAll("button");

        dots.forEach((dot, index) => {
            const isActive = index === currentIndex;

            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });

        // Update arrow states
        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }

        if (nextButton) {
            nextButton.disabled = currentIndex === maxIndex;
        }

        // Hide dots when there is only one possible position
        dotsContainer.style.display =
            maxIndex === 0 ? "none" : "flex";
    }

    // Previous project position
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    // Next project position
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    // Touch swipe support for mobile
    slider.addEventListener(
        "touchstart",
        (event) => {
            touchStartX = event.changedTouches[0].screenX;
        },
        { passive: true }
    );

    slider.addEventListener(
        "touchend",
        (event) => {
            touchEndX = event.changedTouches[0].screenX;

            const difference = touchStartX - touchEndX;
            const minimumSwipeDistance = 50;

            if (Math.abs(difference) < minimumSwipeDistance) {
                return;
            }

            if (difference > 0 && currentIndex < maxIndex) {
                // Swipe left: next position
                currentIndex++;
            } else if (difference < 0 && currentIndex > 0) {
                // Swipe right: previous position
                currentIndex--;
            }

            updateSlider();
        },
        { passive: true }
    );

    // Recalculate when the viewport changes
    let resizeTimer;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            calculateMaxIndex();
            createDots();
            updateSlider();
        }, 100);
    });

    // Initialize slider
    calculateMaxIndex();
    createDots();
    updateSlider();
});



document.addEventListener("DOMContentLoaded", () => {
    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    const text = "I build scalable and efficient web applications using Java, Spring Boot and modern web technologies. Eager to learn, solve real-world problems and create impactful solutions.";

    // Show the full text for users who prefer reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingElement.textContent = text;
        return;
    }

    let index = 0;
    const typingSpeed = 30;

    function typeNextCharacter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeNextCharacter, typingSpeed);
        }
    }

    typeNextCharacter();
});
