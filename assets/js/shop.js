class Shop {
    constructor() {}
    // temporary swipers
    // product images swiper
    swiperProductImg = new Swiper(".product-image-swiper", {
        effect: "flip",
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    // thumbnails swiper
    swiperThumbnails = new Swiper(".swiper-thumbnails", {
        slidesPerView: 5,
        spaceBetween: 20,
        freeMode: true,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
const shop = new Shop();
