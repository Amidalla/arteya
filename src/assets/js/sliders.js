import Swiper from 'swiper';

export function SlidersInit() {
    const heroSlider = document.querySelector('.hero__slider');

    if (heroSlider) {
        new Swiper(heroSlider, {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            speed: 500,
            autoplay: false,

            pagination: {
                el: '.hero__pagination',
                clickable: true,
            },


            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                }
            }
        });
    }
}