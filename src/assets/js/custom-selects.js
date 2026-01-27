export function initCustomSelects() {

    const selectContainers = document.querySelectorAll('.custom-select-container');

    if (selectContainers.length === 0) {
        return;
    }

    selectContainers.forEach(container => {
        const select = container.querySelector('.custom-select');
        const dropdown = container.querySelector('.dropdown');
        const arrow = container.querySelector('.select-arrow');
        const selectedText = container.querySelector('.selected-text');
        const placeholder = container.querySelector('.placeholder');
        const dropdownItems = container.querySelectorAll('.dropdown-item');


        const hasImages = container.classList.contains('custom-select-with-images');


        let selectedValue = null;
        let selectedTextContent = '';


        function toggleDropdown() {
            const isActive = dropdown.classList.contains('active');


            document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove('active');
                    openDropdown.parentElement.querySelector('.custom-select').classList.remove('active');
                }
            });


            dropdown.classList.toggle('active');
            select.classList.toggle('active');

            if (!isActive) {

                setTimeout(() => {
                    document.addEventListener('click', closeOnClickOutside);
                }, 0);
            } else {
                document.removeEventListener('click', closeOnClickOutside);
            }
        }


        function closeOnClickOutside(event) {
            if (!container.contains(event.target)) {
                dropdown.classList.remove('active');
                select.classList.remove('active');
                document.removeEventListener('click', closeOnClickOutside);
            }
        }


        function selectItem(item) {

            dropdownItems.forEach(dropdownItem => {
                dropdownItem.classList.remove('selected');
            });


            item.classList.add('selected');


            selectedValue = item.getAttribute('data-value');


            if (hasImages) {
                selectedTextContent = item.getAttribute('data-text');
            } else {
                selectedTextContent = item.getAttribute('data-dimensions');
            }


            if (placeholder) {
                placeholder.remove();
            }


            if (hasImages) {
                const imgSrc = item.querySelector('.select-img')?.src;
                if (imgSrc) {
                    selectedText.innerHTML = `
                        <div class="selected-with-image">
                            <img src="${imgSrc}" alt="${selectedTextContent}" class="selected-img">
                            <span class="selected-text-content">${selectedTextContent}</span>
                        </div>
                    `;
                } else {
                    selectedText.innerHTML = `
                        <span class="selected-text-content">${selectedTextContent}</span>
                    `;
                }
            } else {

                selectedText.innerHTML = `
                    <span class="selected-text-content">${selectedTextContent}</span>
                `;
            }


            dropdown.classList.remove('active');
            select.classList.remove('active');
            document.removeEventListener('click', closeOnClickOutside);
        }


        select.addEventListener('click', toggleDropdown);

        arrow.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown();
        });

        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                selectItem(item);
            });
        });


        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                select.classList.remove('active');
                document.removeEventListener('click', closeOnClickOutside);
            }
        });


        const defaultSelected = container.querySelector('.dropdown-item:first-child');
        if (defaultSelected) {
            selectItem(defaultSelected);
        }
    });


    function getAllSelectedValues() {
        const values = {};
        const selectContainers = document.querySelectorAll('.custom-select-container');

        selectContainers.forEach(container => {
            const selectId = container.getAttribute('data-select-id');
            const selectedText = container.querySelector('.selected-text-content')?.textContent;
            const selectedValue = container.querySelector('.dropdown-item.selected')?.getAttribute('data-value');

            if (selectedText && selectedText !== 'Выберите размер' && selectedText !== 'Выберите материал') {
                values[selectId] = {
                    text: selectedText,
                    value: selectedValue
                };
            }
        });
        return values;
    }


    window.getSelectedSizes = getAllSelectedValues;
}