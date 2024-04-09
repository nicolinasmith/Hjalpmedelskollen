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


var unitButton = document.getElementById('unit-button');
var selectUnitButton = document.getElementById('select-unit-button');
var cancelButton = document.getElementById('cancel-button');
var unitPopup = document.getElementById('unit-popup');

unitButton.addEventListener('click', function () {
    unitPopup.style.display = 'block';

});

cancelButton.addEventListener('click', function () {
    unitPopup.style.display = 'none';
});
