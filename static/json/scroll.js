document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.category-wrapper').forEach(wrapper => {
        const category = wrapper.querySelector('.category');
        category.scrollTop = 0;
        const upArrow = wrapper.querySelector('.up-arrow');
        const downArrow = wrapper.querySelector('.down-arrow');

        const updateArrows = () => {
            const scrollTop = category.scrollTop;
            const scrollHeight = category.scrollHeight;
            const clientHeight = category.clientHeight;

        upArrow.style.opacity = scrollTop > 0 ? 1 : 0;
        downArrow.style.opacity = scrollTop + clientHeight < scrollHeight - 1 ? 1 : 0;
    };

        // Run once at load
        updateArrows();

        // Update on scroll
        category.addEventListener('scroll', updateArrows);
    });
});