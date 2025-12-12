// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let autoplayInterval;

    // Get number of slides per view based on screen width
    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(slides.length / slidesPerView);
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Update dots
    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / slidesPerView));
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        const maxIndex = slides.length - slidesPerView;
        currentIndex = Math.max(0, Math.min(index * slidesPerView, maxIndex));
        updateCarousel();
    }

    // Update carousel position
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        const gap = 32; // var(--spacing-md) = 2rem = 32px
        const offset = currentIndex * (slideWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }

    // Next slide
    function nextSlide() {
        const maxIndex = slides.length - slidesPerView;
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        const maxIndex = slides.length - slidesPerView;
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }

    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newSlidesPerView = getSlidesPerView();
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                currentIndex = 0;
                createDots();
                updateCarousel();
            }
        }, 250);
    });

    // Initialize
    createDots();
    updateCarousel();
    startAutoplay();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // Form submission feedback
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        });
    }
});
