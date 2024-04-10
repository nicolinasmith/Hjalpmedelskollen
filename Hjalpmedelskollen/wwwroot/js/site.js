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


document.getElementById('category').addEventListener('change', filterAids);
document.getElementById('status').addEventListener('change', filterAids);

function filterAids() {
    var selectedCategory = document.getElementById('category').value;
    var selectedStatus = document.getElementById('status').value;
    var aidRows = document.querySelectorAll('.aid-row');

    aidRows.forEach(function (row) {
        var category = row.dataset.category;
        var status = row.dataset.status;

        if ((selectedCategory === 'Alla' || category === selectedCategory) &&
            (selectedStatus === 'Alla' || status === selectedStatus)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}