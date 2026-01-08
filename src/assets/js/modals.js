export function InitMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const burgerBtn = document.querySelector('.header__burger');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.mobile-menu__close');

    if (!burgerBtn || !mobileMenu || !overlay) {
        return;
    }

    let isMobileMenuOpen = false;

    function openMobileMenu() {
        document.body.style.overflow = 'hidden';
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        isMobileMenuOpen = true;
    }

    function closeMobileMenu() {
        document.body.style.overflow = '';
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        isMobileMenuOpen = false;
    }

    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMobileMenu();
    });

    closeBtn.addEventListener('click', closeMobileMenu);

    overlay.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', (e) => {
        if (isMobileMenuOpen && e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}