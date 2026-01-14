export function InitMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const burgerBtn = document.querySelector('.header__burger');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.mobile-menu__close');

    const callModal = document.querySelector('.call-modal');
    const callBtns = document.querySelectorAll('.call-btn');

    const designModal = document.querySelector('.design-modal');
    const orderBtns = document.querySelectorAll('.order-button');

    const authModal = document.querySelector('.authorization-modal');
    const authBtns = document.querySelectorAll('.header__user, .header__user-link, .mobile-menu__user');

    const registrationModal = document.querySelector('.registration-modal');
    const registrationLinks = document.querySelectorAll('.registration-link');
    const registrationModalAuthLinks = document.querySelectorAll('.registration-modal__link');

    if (!burgerBtn || !mobileMenu || !overlay) {
        return;
    }

    let isMobileMenuOpen = false;
    let isCallModalOpen = false;
    let isDesignModalOpen = false;
    let isAuthModalOpen = false;
    let isRegistrationModalOpen = false;
    let scrollPosition = 0;
    let scrollbarWidth = 0;

    function calculateScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function disableBodyScroll() {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        scrollbarWidth = calculateScrollbarWidth();

        // Проверяем, есть ли у хедера абсолютное позиционирование
        const header = document.querySelector('.header');
        const isAbsoluteHeader = header && window.getComputedStyle(header).position === 'absolute';

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.left = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        if (scrollbarWidth > 0) {

            document.body.style.paddingRight = `${scrollbarWidth}px`;


            document.querySelectorAll('.header, .header-fixed, [data-fixed]').forEach(el => {
                const elPosition = window.getComputedStyle(el).position;
                const isInsidePage = el.classList.contains('inside-page-header');

                if (elPosition === 'absolute' || elPosition === 'fixed') {
                    // Для абсолютных и фиксированных элементов
                    const currentPadding = window.getComputedStyle(el).paddingRight;
                    const currentPaddingValue = parseFloat(currentPadding) || 0;
                    el.style.paddingRight = `${currentPaddingValue + scrollbarWidth}px`;
                    el.style.boxSizing = 'border-box';
                } else if (elPosition === 'relative' || isInsidePage) {
                    // Для относительных элементов (внутренние страницы)
                    const currentMargin = window.getComputedStyle(el).marginRight;
                    const currentMarginValue = parseFloat(currentMargin) || 0;
                    el.style.marginRight = `${currentMarginValue + scrollbarWidth}px`;
                }
            });
        }
    }

    function enableBodyScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        window.scrollTo(0, scrollPosition);

        // Восстанавливаем стили для всех элементов
        document.querySelectorAll('.header, .header-fixed, [data-fixed]').forEach(el => {
            el.style.paddingRight = '';
            el.style.marginRight = '';
            el.style.boxSizing = '';
        });
    }

    function openMobileMenu() {
        if (isCallModalOpen) closeCallModal();
        if (isDesignModalOpen) closeDesignModal();
        if (isAuthModalOpen) closeAuthModal();
        if (isRegistrationModalOpen) closeRegistrationModal();

        if (!isCallModalOpen && !isDesignModalOpen && !isAuthModalOpen && !isRegistrationModalOpen) {
            disableBodyScroll();
        }

        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        isMobileMenuOpen = true;
    }

    function closeMobileMenu() {
        if (!isCallModalOpen && !isDesignModalOpen && !isAuthModalOpen && !isRegistrationModalOpen) {
            enableBodyScroll();
        }

        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        isMobileMenuOpen = false;
    }

    function openCallModal() {
        if (isMobileMenuOpen) closeMobileMenu();
        if (isDesignModalOpen) closeDesignModal();
        if (isAuthModalOpen) closeAuthModal();
        if (isRegistrationModalOpen) closeRegistrationModal();

        disableBodyScroll();

        callModal.classList.add('active');
        overlay.classList.add('active');
        isCallModalOpen = true;
    }

    function closeCallModal() {
        if (!isMobileMenuOpen && !isDesignModalOpen && !isAuthModalOpen && !isRegistrationModalOpen) {
            enableBodyScroll();
        }

        callModal.classList.remove('active');
        overlay.classList.remove('active');
        isCallModalOpen = false;
    }

    function openDesignModal() {
        if (isMobileMenuOpen) closeMobileMenu();
        if (isCallModalOpen) closeCallModal();
        if (isAuthModalOpen) closeAuthModal();
        if (isRegistrationModalOpen) closeRegistrationModal();

        disableBodyScroll();

        designModal.classList.add('active');
        overlay.classList.add('active');
        isDesignModalOpen = true;
    }

    function closeDesignModal() {
        if (!isMobileMenuOpen && !isCallModalOpen && !isAuthModalOpen && !isRegistrationModalOpen) {
            enableBodyScroll();
        }

        designModal.classList.remove('active');
        overlay.classList.remove('active');
        isDesignModalOpen = false;
    }

    function openAuthModal() {
        if (isMobileMenuOpen) closeMobileMenu();
        if (isCallModalOpen) closeCallModal();
        if (isDesignModalOpen) closeDesignModal();
        if (isRegistrationModalOpen) closeRegistrationModal();

        disableBodyScroll();

        authModal.classList.add('active');
        overlay.classList.add('active');
        isAuthModalOpen = true;
    }

    function closeAuthModal() {
        if (!isMobileMenuOpen && !isCallModalOpen && !isDesignModalOpen && !isRegistrationModalOpen) {
            enableBodyScroll();
        }

        authModal.classList.remove('active');
        overlay.classList.remove('active');
        isAuthModalOpen = false;
    }

    function openRegistrationModal() {
        if (isMobileMenuOpen) closeMobileMenu();
        if (isCallModalOpen) closeCallModal();
        if (isDesignModalOpen) closeDesignModal();
        if (isAuthModalOpen) closeAuthModal();

        disableBodyScroll();

        registrationModal.classList.add('active');
        overlay.classList.add('active');
        isRegistrationModalOpen = true;
    }

    function closeRegistrationModal() {
        if (!isMobileMenuOpen && !isCallModalOpen && !isDesignModalOpen && !isAuthModalOpen) {
            enableBodyScroll();
        }

        registrationModal.classList.remove('active');
        overlay.classList.remove('active');
        isRegistrationModalOpen = false;
    }

    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMobileMenu();
    });

    closeBtn.addEventListener('click', closeMobileMenu);

    overlay.addEventListener('click', (e) => {
        if (isMobileMenuOpen) closeMobileMenu();
        if (isCallModalOpen) closeCallModal();
        if (isDesignModalOpen) closeDesignModal();
        if (isAuthModalOpen) closeAuthModal();
        if (isRegistrationModalOpen) closeRegistrationModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (isDesignModalOpen) {
                closeDesignModal();
            } else if (isCallModalOpen) {
                closeCallModal();
            } else if (isAuthModalOpen) {
                closeAuthModal();
            } else if (isRegistrationModalOpen) {
                closeRegistrationModal();
            } else if (isMobileMenuOpen) {
                closeMobileMenu();
            }
        }
    });

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    if (callModal && callBtns.length > 0) {
        callBtns.forEach(callBtn => {
            callBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openCallModal();
            });
        });

        const callModalClose = callModal.querySelector('.call-modal__close');
        if (callModalClose) {
            callModalClose.addEventListener('click', closeCallModal);
        }

        callModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (designModal && orderBtns.length > 0) {
        orderBtns.forEach(orderBtn => {
            orderBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openDesignModal();
            });
        });

        const designModalClose = designModal.querySelector('.design-modal__close');
        if (designModalClose) {
            designModalClose.addEventListener('click', closeDesignModal);
        }

        designModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (authModal && authBtns.length > 0) {
        authBtns.forEach(authBtn => {
            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openAuthModal();
            });
        });

        const authModalClose = authModal.querySelector('.authorization-modal__close');
        if (authModalClose) {
            authModalClose.addEventListener('click', closeAuthModal);
        }

        authModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (registrationModal && registrationLinks.length > 0) {
        registrationLinks.forEach(registrationLink => {
            registrationLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openRegistrationModal();
            });
        });

        const registrationModalClose = registrationModal.querySelector('.registration-modal__close');
        if (registrationModalClose) {
            registrationModalClose.addEventListener('click', closeRegistrationModal);
        }

        registrationModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (registrationModalAuthLinks.length > 0) {
        registrationModalAuthLinks.forEach(authLink => {
            authLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openAuthModal();
            });
        });
    }

    window.addEventListener('resize', () => {

        const newScrollbarWidth = calculateScrollbarWidth();

        if (isMobileMenuOpen || isCallModalOpen || isDesignModalOpen ||
            isAuthModalOpen || isRegistrationModalOpen) {

            if (newScrollbarWidth !== scrollbarWidth) {
                scrollbarWidth = newScrollbarWidth;


                if (scrollbarWidth > 0) {
                    document.body.style.paddingRight = `${scrollbarWidth}px`;

                    document.querySelectorAll('.header, .header-fixed, [data-fixed]').forEach(el => {
                        const elPosition = window.getComputedStyle(el).position;
                        const isInsidePage = el.classList.contains('inside-page-header');

                        if (elPosition === 'absolute' || elPosition === 'fixed') {
                            const currentPadding = window.getComputedStyle(el).paddingRight;
                            const currentPaddingValue = parseFloat(currentPadding) || 0;

                            el.style.paddingRight = `${currentPaddingValue - scrollbarWidth + newScrollbarWidth}px`;
                        } else if (elPosition === 'relative' || isInsidePage) {
                            const currentMargin = window.getComputedStyle(el).marginRight;
                            const currentMarginValue = parseFloat(currentMargin) || 0;
                            el.style.marginRight = `${currentMarginValue - scrollbarWidth + newScrollbarWidth}px`;
                        }
                    });
                }
            }
        }
    });
}