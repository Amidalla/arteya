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
    const authBtns = document.querySelectorAll('.header__user, .header__user-link');

    if (!burgerBtn || !mobileMenu || !overlay) {
        return;
    }

    let isMobileMenuOpen = false;
    let isCallModalOpen = false;
    let isDesignModalOpen = false;
    let isAuthModalOpen = false;
    let scrollPosition = 0;

    function disableBodyScroll() {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.left = '0';
        document.body.style.width = '100%';

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.querySelectorAll('.header, .header-fixed, [data-fixed]').forEach(el => {
                const currentPadding = window.getComputedStyle(el).paddingRight;
                const currentPaddingValue = parseFloat(currentPadding) || 0;
                el.style.paddingRight = `${currentPaddingValue + scrollbarWidth}px`;
            });
        }
    }

    function enableBodyScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';

        window.scrollTo(0, scrollPosition);

        document.querySelectorAll('.header, .header-fixed, [data-fixed]').forEach(el => {
            el.style.paddingRight = '';
        });
    }

    function openMobileMenu() {
        if (isCallModalOpen) closeCallModal();
        if (isDesignModalOpen) closeDesignModal();
        if (isAuthModalOpen) closeAuthModal();

        if (!isCallModalOpen && !isDesignModalOpen && !isAuthModalOpen) {
            disableBodyScroll();
        }

        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        isMobileMenuOpen = true;
    }

    function closeMobileMenu() {
        if (!isCallModalOpen && !isDesignModalOpen && !isAuthModalOpen) {
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

        disableBodyScroll();

        callModal.classList.add('active');
        overlay.classList.add('active');
        isCallModalOpen = true;
    }

    function closeCallModal() {
        if (!isMobileMenuOpen && !isDesignModalOpen && !isAuthModalOpen) {
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

        disableBodyScroll();

        designModal.classList.add('active');
        overlay.classList.add('active');
        isDesignModalOpen = true;
    }

    function closeDesignModal() {
        if (!isMobileMenuOpen && !isCallModalOpen && !isAuthModalOpen) {
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

        disableBodyScroll();

        authModal.classList.add('active');
        overlay.classList.add('active');
        isAuthModalOpen = true;
    }

    function closeAuthModal() {
        if (!isMobileMenuOpen && !isCallModalOpen && !isDesignModalOpen) {
            enableBodyScroll();
        }

        authModal.classList.remove('active');
        overlay.classList.remove('active');
        isAuthModalOpen = false;
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
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (isDesignModalOpen) {
                closeDesignModal();
            } else if (isCallModalOpen) {
                closeCallModal();
            } else if (isAuthModalOpen) {
                closeAuthModal();
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

    window.addEventListener('resize', () => {
        if (isMobileMenuOpen || isCallModalOpen || isDesignModalOpen || isAuthModalOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        }
    });
}