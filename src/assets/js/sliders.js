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

    const newDesignSliders = document.querySelectorAll('.new-design-slider');

    if (newDesignSliders.length > 0) {
        newDesignSliders.forEach((slider) => {
            new Swiper(slider, {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: true,
                speed: 500,
                autoplay: false,
                watchOverflow: true,
                watchSlidesProgress: true,
                centeredSlides: false,
                autoHeight: false,

                observer: true,
                observeParents: true,
                observeSlideChildren: true,

                pagination: false,
                navigation: false,
                scrollbar: false,

                breakpoints: {
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 12,
                        centeredSlides: false,
                    },
                    480: {
                        slidesPerView: 1.5,
                        spaceBetween: 12,
                    },
                    640: {
                        slidesPerView: 1.8,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 2.2,
                        spaceBetween: 12,
                    },
                    1600: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    }
                }
            });
        });
    }


    const watchProjectButtons = document.querySelectorAll('.watch-project-btn');

    if (watchProjectButtons.length > 0) {
        watchProjectButtons.forEach((button) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                const card = this.closest('.design-project__card');
                const slider = card?.querySelector('.design-project__slider');
                const wrapper = slider?.querySelector('.swiper-wrapper');

                if (!wrapper) return;


                const slides = Array.from(wrapper.children);


                const schemeSlide = slides.find(slide => slide.classList.contains('scheme'));


                const images = [];


                if (schemeSlide) {
                    const schemeImg = schemeSlide.querySelector('img');
                    if (schemeImg && (schemeImg.src || schemeImg.dataset.src)) {
                        images.push({
                            src: schemeImg.src || schemeImg.dataset.src,
                            type: 'image',
                            alt: schemeImg.alt || 'Схема проекта'
                        });
                    }


                    slides.forEach(slide => {
                        if (slide !== schemeSlide) {
                            const img = slide.querySelector('img');
                            if (img && (img.src || img.dataset.src)) {
                                images.push({
                                    src: img.src || img.dataset.src,
                                    type: 'image',
                                    alt: img.alt || ''
                                });
                            }
                        }
                    });
                } else {

                    slides.forEach(slide => {
                        const img = slide.querySelector('img');
                        if (img && (img.src || img.dataset.src)) {
                            images.push({
                                src: img.src || img.dataset.src,
                                type: 'image',
                                alt: img.alt || ''
                            });
                        }
                    });
                }

                if (images.length === 0) return;


                Fancybox.show(images, {
                    Carousel: {
                        infinite: false,
                        initialPage: 0
                    },
                    Thumbs: false,
                    Toolbar: false,
                    Images: {
                        zoom: true,
                    },
                    on: {
                        reveal: (fancybox, slide) => {
                            const internalSwiper = slider.swiper;
                            if (internalSwiper && !internalSwiper.destroyed) {

                                const originalIndex = slides.findIndex(s => {
                                    const img = s.querySelector('img');
                                    return img && (img.src === slide.src || img.dataset.src === slide.src);
                                });
                                if (originalIndex >= 0) {
                                    internalSwiper.slideTo(originalIndex);
                                }
                            }
                        }
                    }
                });
            });
        });
    }

    const recommendationsSlider = document.querySelector('.recommendations__slider');

    if (recommendationsSlider) {
        const swiperInstance = new Swiper(recommendationsSlider, {
            slidesPerView: 5,
            spaceBetween: 12,
            loop: true,
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
                },
                1801: {
                    slidesPerView: 5,
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

    const catalogSliders = document.querySelectorAll('.catalog-slider');

    if (catalogSliders.length > 0) {
        catalogSliders.forEach((catalogSlider) => {
            const mainSliderEl = catalogSlider.querySelector('.catalog-slider__main');
            const thumbsSliderEl = catalogSlider.querySelector('.catalog-slider__thumbs');

            if (mainSliderEl && thumbsSliderEl) {
                const nextBtn = catalogSlider.querySelector('.catalog-slider__nav--next');
                const prevBtn = catalogSlider.querySelector('.catalog-slider__nav--prev');

                // Убрали grid настройки и изменили поведение на стандартный скролл
                const thumbsSlider = new Swiper(thumbsSliderEl, {
                    slidesPerView: 'auto',
                    spaceBetween: 4,
                    freeMode: true,
                    watchSlidesProgress: true,
                    allowTouchMove: true,
                    simulateTouch: true,
                    breakpoints: {
                        0: {
                            slidesPerView: 4,
                            spaceBetween: 4,
                            freeMode: true
                        },
                        701: {
                            slidesPerView: 6,
                            spaceBetween: 4,
                            freeMode: true
                        },
                        1200: {
                            slidesPerView: 9,
                            spaceBetween: 4,
                            freeMode: true
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
                    navigation: {
                        nextEl: nextBtn,
                        prevEl: prevBtn,
                    },
                    thumbs: {
                        swiper: thumbsSlider
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        }
                    }
                });

                // Убираем ручное управление кликами по thumbnails, так как теперь Swiper сам это делает
                // Оставляем только добавление класса active
                const thumbSlides = thumbsSliderEl.querySelectorAll('.swiper-slide');

                mainSlider.on('slideChange', () => {
                    const activeIndex = mainSlider.activeIndex;
                    thumbSlides.forEach((slide, index) => {
                        if (index === activeIndex) {
                            slide.classList.add('active');
                            // Прокручиваем thumbs слайдер к активному слайду
                            thumbsSlider.slideTo(index);
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
                        link.setAttribute('data-fancybox', `catalog-gallery-${Math.random().toString(36).substr(2, 9)}`);
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
        });
    }
    const comparisonSlider = document.querySelector('.comparison__slider');

    if (comparisonSlider) {
        new Swiper(comparisonSlider, {
            slidesPerView: 3,
            spaceBetween: 12,
            loop: false,
            speed: 500,
            autoplay: false,
            watchOverflow: true,
            watchSlidesProgress: true,
            centeredSlides: false,
            pagination: false,
            navigation: false,
            breakpoints: {
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 12,
                },
                430: {
                    slidesPerView: 1.5,
                    spaceBetween: 12,
                },
                500: {
                    slidesPerView: 1.5,
                    spaceBetween: 12,
                },
                1050: {
                    slidesPerView: 1.5,
                    spaceBetween: 12,
                },
                1299: {
                    slidesPerView: 2.3,
                    spaceBetween: 20,
                },
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                }
            },
        });
    }
}