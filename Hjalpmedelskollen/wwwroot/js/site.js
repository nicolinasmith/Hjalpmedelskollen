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

/*AIDS BY UNIT*/
var unitButton = document.getElementById('unit-button');
var selectUnitButton = document.getElementById('select-unit-button');
var cancelSelectUnit = document.getElementById('cancel-select-unit');
var unitPopup = document.getElementById('unit-popup');
var addAidPopup = document.getElementById('aid-popup');
var addAidButton = document.getElementById('add-aid-button');
var cancelAddAid = document.getElementById('cancel-add-aid');

addAidButton.addEventListener('click', function () {
    addAidPopup.style.display = 'block';
});

unitButton.addEventListener('click', function () {
    unitPopup.style.display = 'block';
});

cancelSelectUnit.addEventListener('click', function () {
    unitPopup.style.display = 'none';
});

cancelAddAid.addEventListener('click', function () {
    addAidPopup.style.display = 'none';
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
