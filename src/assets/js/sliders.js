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


    const catalogSlider = document.querySelector('.catalog-slider');

    if (catalogSlider) {

        const mainSliderEl = catalogSlider.querySelector('.catalog-slider__main');
        const thumbsSliderEl = catalogSlider.querySelector('.catalog-slider__thumbs');

        if (mainSliderEl && thumbsSliderEl) {

            const thumbsSlider = new Swiper(thumbsSliderEl, {
                slidesPerView: 'auto',
                spaceBetween: 4,
                freeMode: false,
                watchSlidesProgress: true,
                grid: {
                    rows: 2,
                    fill: 'row'
                },
                allowTouchMove: false,
                simulateTouch: false,
                breakpoints: {
                    0: {
                        slidesPerView: 4,
                        spaceBetween: 4,
                        grid: {
                            rows: 2
                        },
                        allowTouchMove: false,
                        simulateTouch: false
                    },
                    768: {
                        slidesPerView: 6,
                        spaceBetween: 4,
                        grid: {
                            rows: 2
                        },
                        allowTouchMove: false,
                        simulateTouch: false
                    },
                    1200: {
                        slidesPerView: 9,
                        spaceBetween: 4,
                        grid: {
                            rows: 2
                        },
                        allowTouchMove: false,
                        simulateTouch: false
                    }
                }
            });


            const mainSlider = new Swiper(mainSliderEl, {
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                speed: 500,
                autoplay: false,
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }
            });


            const thumbSlides = thumbsSliderEl.querySelectorAll('.swiper-slide');
            thumbSlides.forEach((thumbSlide, index) => {
                thumbSlide.style.cursor = 'pointer';
                thumbSlide.addEventListener('click', () => {

                    if (mainSlider && !mainSlider.destroyed) {
                        mainSlider.slideTo(index);
                    }

                    thumbSlides.forEach(slide => {
                        slide.classList.remove('active');
                    });
                    thumbSlide.classList.add('active');
                });
            });


            mainSlider.on('slideChange', () => {
                const activeIndex = mainSlider.activeIndex;
                thumbSlides.forEach((slide, index) => {
                    if (index === activeIndex) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                });
            });


            if (thumbSlides.length > 0) {
                thumbSlides[0].classList.add('active');
            }

            const mainImages = mainSliderEl.querySelectorAll('.swiper-slide img');

            if (mainImages.length > 0) {

                const fancyboxElements = [];

                mainImages.forEach((img, index) => {
                    const slide = img.closest('.swiper-slide');


                    const link = document.createElement('a');
                    link.href = img.src;
                    link.setAttribute('data-fancybox', 'catalog-gallery');
                    link.setAttribute('data-caption', img.alt || '');


                    img.style.cursor = 'zoom-in';


                    img.addEventListener('click', (e) => {
                        e.preventDefault();


                        Fancybox.show(
                            Array.from(mainImages).map(image => ({
                                src: image.src,
                                type: 'image'
                            })),
                            {
                                Carousel: {
                                    infinite: false,
                                    initialPage: index
                                },
                                Thumbs: false,
                                Toolbar: false,
                                Images: {
                                    zoom: true,
                                },
                                on: {
                                    init: (fancybox) => {

                                        console.log('Fancybox initialized');
                                    },
                                    reveal: (fancybox, slide) => {

                                        if (mainSlider && !mainSlider.destroyed) {
                                            mainSlider.slideTo(slide.index);
                                        }
                                    },
                                    change: (fancybox, carousel, slide) => {

                                        if (mainSlider && !mainSlider.destroyed) {
                                            mainSlider.slideTo(slide.index);
                                        }
                                    },
                                    destroy: (fancybox) => {

                                        console.log('Fancybox destroyed');
                                    }
                                }
                            }
                        );
                    });

                    fancyboxElements.push(link);
                });


                Fancybox.bind(fancyboxElements, {
                    Thumbs: false,
                    Toolbar: false,
                    Images: {
                        zoom: true,
                    },
                    on: {
                        reveal: (fancybox, slide) => {

                            if (mainSlider && !mainSlider.destroyed) {
                                mainSlider.slideTo(slide.index);
                            }
                        },
                        change: (fancybox, carousel, slide) => {

                            if (mainSlider && !mainSlider.destroyed) {
                                mainSlider.slideTo(slide.index);
                            }
                        }
                    }
                });
            }
        }
    }
}