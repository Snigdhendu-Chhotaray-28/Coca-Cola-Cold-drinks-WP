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

    // === 5. Scroll Fade-Up Animation for .scroll-fade-up elements: By Snigdhendu ===
    function setupScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-fade-up');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        elements.forEach(el => observer.observe(el));
    }

    // === 6. Scroll Left Reveal Animation: By Snigdhendu ===
    function setupScrollAnimationLeft() {
        const elements = document.querySelectorAll('.left');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('scroll-fade-left');
                    entry.target.classList.add('is-visible-left');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.01 });

        elements.forEach(el => observer.observe(el));
    }

    // === 7. Scroll Right Reveal Animation: By Snigdhendu ===
    function setupScrollAnimationRight() {
        const elements = document.querySelectorAll('.right');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('scroll-fade-right');
                    entry.target.classList.add('is-visible-right');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.01 });

        elements.forEach(el => observer.observe(el));
    }

    // === 8. Floating Animation for .about_img, .home_s3_img, and .home_s2_div img: By Snigdhendu ===
    function applyFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.about_img, .home_s3_img');
        floatingElements.forEach(el => {
            el.classList.add('float-animation');
        });

        const hs2_imgs = document.querySelectorAll('.home_s2_div img');
        hs2_imgs.forEach(img => {
            img.classList.add('float-animation');
        });
    }

    // === 9. Scroll-to-Top Button: By Snigdhendu ===
    function setupScrollToTopButton() {
        const btn = document.createElement('button');
        btn.innerHTML = '⬆';
        btn.id = 'scrollToTopBtn';
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.8) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
    }

    // === 10. Run All Initializers: By Snigdhendu ===
    initializeSwipers();
    initializeSwipersAutoPlay();
    setupProductScroller();
    setupHeadingAnimations();
    setupScrollAnimations();
    setupScrollAnimationLeft();
    setupScrollAnimationRight();
    applyFloatingAnimation();
    setupScrollToTopButton();
});

function menuBar(){
    if(window.innerWidth < 620){
        const three_bar = document.querySelector('.three_bar');
        three_bar.classList.add('three_bar_visible')
        setTimeout(()=>{
            const menu = document.querySelector('.menu');
        },1000);  
        three_bar.addEventListener('click',()=>{
            setTimeout(()=>{
                document.querySelectorAll('section').forEach((section)=>{
                    section.classList.add('screen_blur');
                });
                menu.style.right = '-40px';
            },1000);
        });

        document.addEventListener('click',(e)=>{
            if(!menu.contains(e.target) && e.target !== three_bar) {
                nav_bar_dissapior();
            }
        });
        document.querySelectorAll('.menu a').forEach((item)=>{
            item.addEventListener('click',()=>{
                nav_bar_dissapior();
            });
        });
    }
}
menuBar();

let nav_bar_dissapior = ()=>{
    const menu = document.querySelector('.menu');
    document.querySelectorAll('section').forEach((section)=>{
        section.classList.remove('screen_blur');
    });
    menu.style.right = '-240px';
};


