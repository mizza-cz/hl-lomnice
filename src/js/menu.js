const menuLinks = document.querySelectorAll('.menu-link');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
const burgerMenu = document.querySelector('.burger-menu');
const menuContainer = document.querySelector('.menu-container');

let menuOpened = true;

burgerMenu.addEventListener('click', () => {
    menuOpened = !menuOpened;

    burgerMenu.setAttribute('aria-expanded', !menuOpened);
    menuContainer.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');

    if (!menuContainer.classList.contains('open')) {
        dropdownMenus.forEach((menu) => {
            if (menu.classList.contains('open')) {
                menu.parentElement.classList.remove('active');
                menu.classList.remove('open');
            }
        });
    }
});

for (const link of menuLinks) {
    link.addEventListener('click', () => {
        // remove open className
        dropdownMenus.forEach((menu) => {
            if (link.parentElement !== menu.parentElement) {
                menu.parentElement.classList.remove('active');
                menu.classList.remove('open');
            }
        });

        // add open className to current dropdown
        const dropdownMenu = link.nextElementSibling;

        if (dropdownMenu) {
            dropdownMenu.parentElement.classList.toggle('active');
            dropdownMenu.classList.toggle('open');
        }
    });
}
