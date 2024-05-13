document.addEventListener('DOMContentLoaded', function () {

    /*HAMBURGER MENU*/
    var menuDisplayed = false;

    $('.hamburger-menu').click(function () {
        var navList = $('.nav-list');
        var hamburgerMenuContent = $('#hamburger-menu-content');

        if (menuDisplayed) {
            hamburgerMenuContent.html('');
            hamburgerMenuContent.removeClass('show');
            menuDisplayed = false;
        }
        else {
            hamburgerMenuContent.html(navList.html());
            hamburgerMenuContent.toggleClass('show');
            menuDisplayed = true;
        }
    });
});