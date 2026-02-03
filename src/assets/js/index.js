import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/home.scss";
import "../styles/catalog.scss";
import "../styles/portfolio.scss";
import "../styles/product-card.scss";
import "../styles/comparison.scss";
import "../styles/basket.scss";
import "../styles/about.scss";
import "../styles/contacts.scss";
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
import { InitMobileMenu } from './modals.js';
import { InitSideMenu } from './side-menu.js';
import { initCustomSelects } from './custom-selects.js';

Swiper.use([Pagination, Navigation, Autoplay, Thumbs, EffectFade]);

function initProjectDescription() {
    const descriptionBlocks = document.querySelectorAll('.specification');

    descriptionBlocks.forEach(block => {
        const paragraph = block.querySelector('p');
        const toggleLink = block.querySelector('.portfolio__link');

        if (paragraph && toggleLink) {

            const newToggleLink = toggleLink.cloneNode(true);
            toggleLink.parentNode.replaceChild(newToggleLink, toggleLink);


            const checkHeight = () => {
                if (paragraph.scrollHeight > 168) {

                    paragraph.classList.add('collapsed');
                    paragraph.style.maxHeight = '168px';
                    paragraph.style.overflow = 'hidden';


                    newToggleLink.style.display = 'inline-block';
                    newToggleLink.textContent = 'Развернуть';

                    return true;
                } else {

                    newToggleLink.style.display = 'none';
                    paragraph.classList.remove('collapsed');
                    paragraph.style.maxHeight = '';
                    return false;
                }
            };


            const needsCollapse = checkHeight();

            if (needsCollapse) {

                newToggleLink.addEventListener('click', function(e) {
                    e.preventDefault();

                    if (paragraph.classList.contains('collapsed')) {

                        paragraph.classList.remove('collapsed');
                        paragraph.style.maxHeight = paragraph.scrollHeight + 'px';
                        newToggleLink.textContent = 'Свернуть';
                    } else {

                        paragraph.classList.add('collapsed');
                        paragraph.style.maxHeight = '168px';
                        newToggleLink.textContent = 'Развернуть';
                    }
                });
            }
        }
    });
}
function initRedStarsInPlaceholders() {
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');

    requiredInputs.forEach(input => {
        const currentPlaceholder = input.getAttribute('placeholder') || '';

        if (currentPlaceholder && !currentPlaceholder.includes('*')) {

            const container = document.createElement('div');
            container.className = 'placeholder-with-star-container';
            container.style.position = 'relative';
            container.style.width = '100%';


            input.parentNode.insertBefore(container, input);
            container.appendChild(input);


            const pseudoPlaceholder = document.createElement('div');
            pseudoPlaceholder.className = 'pseudo-placeholder';
            pseudoPlaceholder.innerHTML = currentPlaceholder + ' <span class="red-star">*</span>';
            pseudoPlaceholder.style.cssText = `
                position: absolute;
                left: ${getComputedStyle(input).paddingLeft || '10px'};
                top: 50%;
                transform: translateY(-50%);
                color: #999;
                pointer-events: none;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: calc(100% - 20px);
                z-index: 5;
                font-family: ${getComputedStyle(input).fontFamily};
                font-size: ${getComputedStyle(input).fontSize};
                line-height: ${getComputedStyle(input).lineHeight};
                transition: opacity 0.2s ease;
                opacity: 1;
            `;

            container.appendChild(pseudoPlaceholder);


            input.setAttribute('placeholder', '');


            input.addEventListener('focus', () => {
                pseudoPlaceholder.style.opacity = '0';
            });

            input.addEventListener('blur', () => {

                let isEmpty = true;

                if (input.type === 'tel' || input.name === 'tel' || input.hasAttribute('data-phone-input')) {

                    const digits = input.value.replace(/\D/g, '');
                    isEmpty = digits.length <= 1 || digits === '7';
                } else {
                    isEmpty = !input.value.trim();
                }

                pseudoPlaceholder.style.opacity = isEmpty ? '1' : '0';
            });


            setTimeout(() => {
                if (input.type === 'tel' || input.name === 'tel' || input.hasAttribute('data-phone-input')) {
                    const digits = input.value.replace(/\D/g, '');
                    pseudoPlaceholder.style.opacity =
                        (digits.length > 1 && digits !== '7') ? '0' : '1';
                } else {
                    pseudoPlaceholder.style.opacity = input.value.trim() ? '0' : '1';
                }
            }, 0);


            if (input.tagName === 'TEXTAREA') {
                pseudoPlaceholder.style.top = '15px';
                pseudoPlaceholder.style.transform = 'none';
            }
        }
    });
}

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

    const isMobile = window.innerWidth <= 1299;

    AOS.init({
        disable: isMobile ? true : false,
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
    if (window.innerWidth <= 1299) {
        return;
    }

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

function handleResize() {
    if (window.innerWidth <= 1299) {
        if (AOS) {
            AOS.refreshHard();
        }
    } else {
        if (AOS) {
            AOS.refresh();
        }
        initStaggeredAnimations();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initAnimations();

    const lazyLoadInstance = new LazyLoad();
    SlidersInit();

    if (window.innerWidth > 1299) {
        initStaggeredAnimations();
    }


    initProjectDescription();

    initRedStarsInPlaceholders();

    initPhoneMasks();

    initCustomSelects();

    Fancybox.bind("[data-fancybox]", {
        Thumbs: false,
        Toolbar: false,
        Images: {
            zoom: true,
        },
    });

    InitMobileMenu();
    InitSideMenu();

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);


        initProjectDescription();
    });

    document.addEventListener('contentLoaded', function() {
        if (window.innerWidth > 1299) {
            AOS.refresh();
        }


        initProjectDescription();
    });
});

export { initAnimations, initStaggeredAnimations };