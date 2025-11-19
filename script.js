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


});



