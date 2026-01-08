import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/home.scss";
import "../styles/modals.scss";
import LazyLoad from "vanilla-lazyload";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation, Autoplay, Thumbs, EffectFade } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IMask from 'imask';
import { SlidersInit } from './sliders.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

Swiper.use([Pagination, Navigation, Autoplay, Thumbs, EffectFade]);

function initPhoneMasks() {
    const phoneInputs = document.querySelectorAll(`
        input[type="tel"][name="tel"],
        input[type="tel"][data-phone-input]
    `);

    phoneInputs.forEach(input => {
        let mask = null;

        const initMask = () => {
            if (!mask) {
                input.classList.add('phone-mask-active');
                mask = IMask(input, {
                    mask: '+{7} (000) 000-00-00',
                    lazy: false
                });

                if (!input.value) {
                    input.value = '+7 (';
                }
            }
        };

        const destroyMask = () => {
            if (mask) {
                const phoneNumber = input.value.replace(/\D/g, '');
                if (phoneNumber.length < 11 || phoneNumber === '7') {
                    input.value = '';
                }
                input.classList.remove('phone-mask-active');
                mask.destroy();
                mask = null;
            }
        };

        input.addEventListener('focus', initMask);
        input.addEventListener('blur', destroyMask);

        input.addEventListener('input', (e) => {
            if (mask && input.value === '+7 (' && e.inputType === 'deleteContentBackward') {
                destroyMask();
            }
        });
    });
}


function initAnimations() {
    AOS.init({
        // Глобальные настройки
        disable: false,
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,


        offset: 500,
        delay: 0,
        duration: 500,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
    });


    const lazyLoadInstance = new LazyLoad({
        callback_loaded: (el) => {
            AOS.refresh();
        }
    });
}


function initStaggeredAnimations() {

    const staggerContainers = document.querySelectorAll('[data-aos-stagger]');

    staggerContainers.forEach((container, containerIndex) => {
        const items = container.querySelectorAll('[data-aos-item]');
        const delayStep = container.dataset.aosStaggerDelay || 100;
        const animationType = container.dataset.aosStaggerAnimation || 'fade-up';

        items.forEach((item, index) => {
            item.setAttribute('data-aos', animationType);
            item.setAttribute('data-aos-delay', index * delayStep);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {

    initAnimations();

    const lazyLoadInstance = new LazyLoad();
    SlidersInit();


    initStaggeredAnimations();

    initPhoneMasks();

    Fancybox.bind("[data-fancybox]", {
        Thumbs: false,
        Toolbar: false,
        Images: {
            zoom: true,
        },
    });


    document.addEventListener('contentLoaded', function() {
        AOS.refresh();
    });
});


export { initAnimations, initStaggeredAnimations };