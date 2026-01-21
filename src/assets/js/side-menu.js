export function InitSideMenu() {
    const sideMenu = document.querySelector('.side-menu');
    if (!sideMenu) return;


    function slideDown(element, duration = 300) {
        if (!element) return;

        element.style.display = 'block';
        const height = element.scrollHeight;
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.height = height + 'px';
        });

        setTimeout(() => {
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    }

    function slideUp(element, duration = 300) {
        if (!element) return;

        const height = element.scrollHeight;
        element.style.height = height + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.height = '0px';
        });

        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    }


    function closeAllNestedMenus(parentItem) {
        if (!parentItem) return;

        parentItem.querySelectorAll('.side-menu__sublink.active').forEach(activeSublink => {
            activeSublink.classList.remove('active');
            const activeParentSubitem = activeSublink.closest('.side-menu__subitem.dropdown');
            if (activeParentSubitem) activeParentSubitem.classList.remove('active');
            const activeAdditionalList = activeParentSubitem?.querySelector('.side-menu__additional-list');
            if (activeAdditionalList) {
                slideUp(activeAdditionalList, 300);
            }
        });
    }


    function initializeActiveMenus() {

        document.querySelectorAll('.side-menu__sublist, .side-menu__additional-list').forEach(element => {
            element.style.display = 'none';
        });


        document.querySelectorAll('.side-menu__link.active').forEach(link => {
            const parentItem = link.closest('.side-menu__item');
            const sublist = parentItem?.querySelector('.side-menu__sublist');
            if (sublist) {
                slideDown(sublist, 0);
            }
        });


        document.querySelectorAll('.side-menu__sublink.active').forEach(sublink => {
            const parentSubitem = sublink.closest('.side-menu__subitem.dropdown');
            const additionalList = parentSubitem?.querySelector('.side-menu__additional-list');
            if (additionalList) {
                slideDown(additionalList, 0);
                parentSubitem?.classList.add('active');
            }
        });
    }


    initializeActiveMenus();


    document.querySelectorAll('.side-menu__link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const parentItem = this.closest('.side-menu__item');
            const sublist = parentItem?.querySelector('.side-menu__sublist');

            if (!sublist) return;

            if (this.classList.contains('active')) {

                closeAllNestedMenus(parentItem);
                this.classList.remove('active');
                slideUp(sublist, 300);
            } else {

                document.querySelectorAll('.side-menu__link.active').forEach(activeLink => {
                    const activeParent = activeLink.closest('.side-menu__item');
                    closeAllNestedMenus(activeParent);
                    activeLink.classList.remove('active');
                    const activeSublist = activeParent?.querySelector('.side-menu__sublist');
                    if (activeSublist) slideUp(activeSublist, 300);
                });


                this.classList.add('active');
                slideDown(sublist, 300);
            }
        });
    });


    document.querySelectorAll('.side-menu__subitem.dropdown .side-menu__sublink').forEach(sublink => {
        sublink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const parentSubitem = this.closest('.side-menu__subitem.dropdown');
            const additionalList = parentSubitem?.querySelector('.side-menu__additional-list');

            if (!additionalList) return;

            if (this.classList.contains('active')) {

                this.classList.remove('active');
                parentSubitem.classList.remove('active');
                slideUp(additionalList, 300);
            } else {

                const siblings = parentSubitem.parentElement.querySelectorAll('.side-menu__subitem.dropdown');
                siblings.forEach(sibling => {
                    if (sibling !== parentSubitem) {
                        const siblingLink = sibling.querySelector('.side-menu__sublink');
                        const siblingList = sibling.querySelector('.side-menu__additional-list');
                        if (siblingLink) siblingLink.classList.remove('active');
                        sibling.classList.remove('active');
                        if (siblingList) slideUp(siblingList, 300);
                    }
                });


                this.classList.add('active');
                parentSubitem.classList.add('active');
                slideDown(additionalList, 300);
            }
        });
    });


    document.addEventListener('click', function(e) {
        if (!sideMenu.contains(e.target)) {
            // Закрываем все основные меню
            document.querySelectorAll('.side-menu__link.active').forEach(link => {
                const parentItem = link.closest('.side-menu__item');
                closeAllNestedMenus(parentItem);
                link.classList.remove('active');
                const sublist = parentItem?.querySelector('.side-menu__sublist');
                if (sublist) slideUp(sublist, 300);
            });


            document.querySelectorAll('.side-menu__sublink.active').forEach(sublink => {
                sublink.classList.remove('active');
                const parentSubitem = sublink.closest('.side-menu__subitem.dropdown');
                if (parentSubitem) parentSubitem.classList.remove('active');
                const additionalList = parentSubitem?.querySelector('.side-menu__additional-list');
                if (additionalList) slideUp(additionalList, 300);
            });
        }
    });
}