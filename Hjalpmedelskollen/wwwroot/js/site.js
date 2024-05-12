document.addEventListener('DOMContentLoaded', function () {

    /*HAMBURGER MENU*/
    var menuDisplayed = false;

    document.querySelector('.hamburger-menu').addEventListener('click', function () {
        var navList = document.querySelector('.nav-list');
        var hamburgerMenuContent = document.querySelector('#hamburger-menu-content');

        if (menuDisplayed) {
            hamburgerMenuContent.innerHTML = '';
            hamburgerMenuContent.classList.remove('show');
            menuDisplayed = false;
        }
        else {
            hamburgerMenuContent.innerHTML = navList.innerHTML;
            hamburgerMenuContent.classList.toggle('show');
            menuDisplayed = true;
        }
    });

});