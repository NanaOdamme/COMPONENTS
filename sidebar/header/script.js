document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const header = document.getElementById('header');
    const main = document.querySelector('main');
    const headerDropdownBtn = document.getElementById('headerDropdownBtn');
    const headerDropdown = document.getElementById('headerDropdown');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        header.classList.toggle('collapsed');
        main.classList.toggle('collapsed');
    });

    headerDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        headerDropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        headerDropdown.classList.remove('open');
    });
});
