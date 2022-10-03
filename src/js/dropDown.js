(function () {
    const container = document.querySelectorAll('.dropdown__select');

    container.forEach((item) => {
        const dropDownItems = item.querySelectorAll('.dropdown__item');
        const defaultSpan = item.querySelector('.dropdown__default');
        
        defaultSpan.textContent = dropDownItems[0].textContent;
        defaultSpan.addEventListener('click', function() {
            const dropDown = this.closest('div').querySelector('.dropdown__row');
            const dropDowns = this.closest('.dropdown').querySelectorAll('.dropdown__row');

            dropDowns.forEach(function(list) {
                list.classList.remove('dropdown__row--active');
            });
            dropDown.classList.add('dropdown__row--active');
        });

        dropDownItems.forEach(function (span) {
            span.addEventListener('click', function() {
                const value = this.textContent;
                const dropDown = this.closest('div');
    
                defaultSpan.textContent = value;
                dropDown.classList.remove('dropdown__row--active');
            });
        });
    });
}());
