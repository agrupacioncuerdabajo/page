window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 40) {
        header.classList.add('bg-gray-900');
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('bg-gray-900');
        header.classList.remove('header-scrolled');
    }
});
const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden');
});
