// Wait until the full page content is loaded before running JavaScript
let i = 0;
document.addEventListener('DOMContentLoaded', () => {

    // === 1. Initialize Main Hero Swiper (Top Slider): By Snigdhendu ===
    function initializeSwipers() {
        const heroSwiper = new Swiper(".mySwiper", {
            loop: true,
            // autoplay: {
            //     delay: 1000,
            //     disableOnInteraction: false,
            //     pauseOnMouseEnter: true,
            // },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            observer: true,
            observeParents: true,
            speed: 2000,
            spaceBetween: 100,
        });
    }

    // === 2. Initialize Limited Edition Swiper with Autoplay Control: By Snigdhendu ===
    function initializeSwipersAutoPlay() {
        const leSwiper = new Swiper(".le_divs", {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            mousewheel: false,
            freeMode: true,
            speed: 2000,
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                550: {
                    slidesPerView: 2
                },
                800: {
                    slidesPerView: 3
                }
            }
        });

        const leContainer = document.querySelector('.le_divs');
        let width = leContainer.offsetWidth;

        if(width < 703){
            leSwiper.slidesPerView = 2;
        }

        if (leContainer) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        leSwiper.autoplay.start();
                    } else {
                        leSwiper.autoplay.stop();
                    }
                });
            }, {
                threshold: 0.01
            });

            observer.observe(leContainer);
        }
    }

    // === 3. Horizontal Product Scroll (Left and Right Buttons): By Snigdhendu ===
    function setupProductScroller() {
        const scrollableDiv = document.querySelector(".products");
        const backBtn = document.querySelector(".back_div");
        const nextBtn = document.querySelector(".next_div");
        let scrollAmount = 220;
        if(window.innerWidth < 560){
            scrollAmount = document.querySelector('.product1').offsetWidth + 100;
        }

        if (scrollableDiv && backBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
                scrollableDiv.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
            backBtn.addEventListener('click', () => {
                scrollableDiv.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
    }

    // === 4. Animate Headings (Letter by Letter with Delay): By Snigdhendu ===
    function setupHeadingAnimations() {
        const headingsToAnimate = document.querySelectorAll('.cssanimation.leMagnify.sequence');
        if (headingsToAnimate.length === 0) return;

        const animateHeading = (element) => {
            const text = element.textContent.trim();
            let newHtml = '';
            let delay = 100;

            for (const char of text) {
                if (char !== ' ') {
                    newHtml += `<span style="animation-delay:${delay}ms">${char}</span>`;
                    delay += 150;
                } else {
                    newHtml += ' ';
                }
            }
            element.innerHTML = newHtml;
            element.classList.add('animated');
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateHeading(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.01
        });

        headingsToAnimate.forEach(heading => observer.observe(heading));
    }


});
