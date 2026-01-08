import Swiper from 'swiper';
import { Fancybox } from "@fancyapps/ui";

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


    const designProjectSliders = document.querySelectorAll('.design-project__slider');

    if (designProjectSliders.length > 0) {
        designProjectSliders.forEach((slider) => {

            const pagination = slider.querySelector('.design-project__pagination');

            new Swiper(slider, {

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
                    el: pagination,
                    clickable: true,
                    type: 'bullets',
                },

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }
            });
        });
    }



    const recommendationsSlider = document.querySelector('.recommendations__slider');

    if (recommendationsSlider) {
        const swiperInstance = new Swiper(recommendationsSlider, {
            slidesPerView: 4,
            spaceBetween: 12,
            loop: false,
            speed: 500,
            autoplay: false,

            navigation: false,
            pagination: false,

            breakpoints: {
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                },
                450: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                },
                550: {
                    slidesPerView: 1.8,
                    spaceBetween: 15,
                },
                650: {
                    slidesPerView: 2.5,
                    spaceBetween: 15,
                },
                750: {
                    slidesPerView: 2.8,
                    spaceBetween: 15,
                },
                950: {
                    slidesPerView: 3.2,
                    spaceBetween: 20,
                },
                1320: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            }
        });


        const sliderLinks = recommendationsSlider.querySelectorAll('[data-fancybox]');

        if (sliderLinks.length > 0) {
            Fancybox.bind(sliderLinks, {
                Thumbs: false,
                Toolbar: false,
                Images: {
                    zoom: true,
                },
                on: {
                    init: (fancybox) => {

                        fancybox.on('Carousel.ready', (carousel, slide) => {
                            const currentSlideIndex = slide.index;
                            if (swiperInstance && !swiperInstance.destroyed) {
                                swiperInstance.slideTo(currentSlideIndex);
                            }
                        });
                    }
                }
            });
        }
    }
}