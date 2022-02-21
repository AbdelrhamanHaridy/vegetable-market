// Elements
const preloader = document.querySelector(".preloader");
const backTopBtn = document.querySelector(".back-to-top");
// home 4
const heroSlider = document.querySelector(".home4-swiper");
const heroSliderButtons = document.querySelectorAll(".home4-swiper-button");
const categoriesSlider = document.querySelector(".categories-slider");
// contact page
const mapContainer = document.querySelector(".leaflet-map");

// main class
class General {
    constructor() {
        // preloader
        document.addEventListener(
            "readystatechange",
            this.showPreloader.bind(this)
        );
        // scroll to top
        window.addEventListener("scroll", this.showBackTopBtn);
        document.addEventListener("click", this.scrollToTop.bind(this));
        // wow js plugin
        new WOW().init();
    }
    // general Methods
    // preloader
    showPreloader(e) {
        if (
            e.target.readyState === "interactive" ||
            e.target.readyState === "loading"
        ) {
            preloader.classList.remove("hide");
        } else if (e.target.readyState === "complete") {
            preloader.classList.add("hide");
        }
    }
    // show || hide back to top button
    showBackTopBtn() {
        if (window.scrollY >= 250) {
            backTopBtn.classList.remove("hide");
        } else {
            backTopBtn.classList.add("hide");
        }
    }
    scrollToTop(e) {
        if (
            e.target.classList.contains("back-to-top") ||
            e.target.parentElement.classList.contains("back-to-top")
        ) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }
}
// pages
class Pages {
    constructor() {
        // events
        this.createHeroSlider();
        // hero sloder controls
        if (heroSlider) {
            heroSlider.addEventListener(
                "mouseenter",
                this.showHeroSliderControls.bind(this)
            );
            heroSlider.addEventListener(
                "mouseleave",
                this.hideHeroSliderControls.bind(this)
            );
        }
        this.createCategoriesSlider();
        // page contact map
        this.showMap();
    }
    // home 4
    createHeroSlider() {
        if (!heroSlider) return;
        const swiperHero = new Swiper(".hero-swiper", {
            effect: "fade",
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            keyboard: {
                enabled: true,
            },
        });
    }
    // on mouseenter || mouseleave --> show || hide slider controls
    showHeroSliderControls() {
        heroSliderButtons.forEach((button) => {
            button.classList.remove("hide");
        });
    }
    hideHeroSliderControls() {
        heroSliderButtons.forEach((button) => {
            button.classList.add("hide");
        });
    }
    // categories slider
    createCategoriesSlider() {
        if (!categoriesSlider) return;
        const swiperCategories = new Swiper(".categories-slider", {
            slidesPerView: 7,
            spaceBetween: 20,
            freeMode: true,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                400: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                992: {
                    slidesPerView: 5,
                },
                1200: {
                    slidesPerView: 7,
                },
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            keyboard: {
                enabled: true,
            },
        });
    }
    // show map in (contact page)
    showMap() {
        if (!mapContainer) return;
        let map = L.map("map-panes").setView([51.505, -0.09], 1);
        L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    }
}
const general = new General();
const pagesContent = new Pages();
