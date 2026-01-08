export function InitMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const burgerBtn = document.querySelector('.header__burger');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.mobile-menu__close');


    const callModal = document.querySelector('.call-modal');
    const callBtns = document.querySelectorAll('.call-btn');

    if (!burgerBtn || !mobileMenu || !overlay) {
        return;
    }

    let isMobileMenuOpen = false;
    let isCallModalOpen = false;
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

        if (isCallModalOpen) {
            closeCallModal();
        }


        if (!isCallModalOpen) {
            disableBodyScroll();
        }

        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        isMobileMenuOpen = true;
    }

    function closeMobileMenu() {

        if (!isCallModalOpen) {
            enableBodyScroll();
        }

        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        isMobileMenuOpen = false;
    }

    function openCallModal() {

        if (isMobileMenuOpen) {
            closeMobileMenu();
        }


        disableBodyScroll();

        callModal.classList.add('active');
        overlay.classList.add('active');
        isCallModalOpen = true;
    }

    function closeCallModal() {

        if (!isMobileMenuOpen) {
            enableBodyScroll();
        }

        callModal.classList.remove('active');
        overlay.classList.remove('active');
        isCallModalOpen = false;
    }

    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMobileMenu();
    });

    closeBtn.addEventListener('click', closeMobileMenu);


    overlay.addEventListener('click', (e) => {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        }
        if (isCallModalOpen) {
            closeCallModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {

            if (isCallModalOpen) {
                closeCallModal();
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


    window.addEventListener('resize', () => {
        if (isMobileMenuOpen || isCallModalOpen) {

            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        }
    });
}