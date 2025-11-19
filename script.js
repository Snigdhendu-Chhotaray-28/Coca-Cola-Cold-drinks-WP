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


});



