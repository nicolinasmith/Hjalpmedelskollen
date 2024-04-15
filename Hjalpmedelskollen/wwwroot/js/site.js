document.addEventListener('DOMContentLoaded', function () {

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

    /*AIDS BY UNIT - SELECT UNIT*/
    var changeUnit = document.getElementById('change-unit');
    var changeUnitMobile = document.getElementById('mobile-change-unit');
    var unitPopup = document.getElementById('unit-popup');
    var cancelSelectUnit = document.getElementById('cancel-select-unit');

    changeUnit.addEventListener('click', function () {
        unitPopup.style.display = 'block';
    });

    changeUnitMobile.addEventListener('click', function () {
        unitPopup.style.display = 'block';
    });

    cancelSelectUnit.addEventListener('click', function () {
        unitPopup.style.display = 'none';
    });

    /*AIDS BY UNIT - FILTER*/
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

    /*AIDS BY UNIT - ADD AID*/
    var addAidPopup = document.getElementById('add-aid-popup');
    var addNewAid = document.getElementById('add-new-aid');
    var addNewAidMobile = document.getElementById('mobile-add-new-aid');
    var cancelAddAid = document.getElementById('cancel-add-aid');

    addNewAid.addEventListener('click', function () {
        addAidPopup.style.display = 'block';
    });

    addNewAidMobile.addEventListener('click', function () {
        addAidPopup.style.display = 'block';
    });

    cancelAddAid.addEventListener('click', function () {
        addAidPopup.style.display = 'none';
    });

    /*NEW CATEGORY*/
    var categoryList = document.getElementById('category-list');
    var newCategoryOption = document.getElementById('add-new-category');
    var newCategoryPopup = document.getElementById('new-category-popup');
    var addCategoryButton = document.getElementById('add-category-button');
    var cancelAddCategory = document.getElementById('cancel-add-category');

    categoryList.addEventListener('change', function () {
        if (categoryList.value === 'new-category') {
            newCategoryPopup.style.display = 'block';
        }
    });

    addCategoryButton.addEventListener('click', function () {
        var newCategoryInput = document.getElementById('new-category').value;
        if (newCategoryInput.trim() !== '') {
            var newCategory = document.createElement('option');
            newCategory.text = newCategoryInput;
            categoryList.add(newCategory);
            categoryList.value = newCategoryInput;
        }
        newCategoryPopup.style.display = 'none';
    });

    cancelAddCategory.addEventListener('click', function () {
        newCategoryPopup.style.display = 'none';
    });


    /*AIDS BY UNIT - SHOW AID*/
    var aidRows = document.querySelectorAll('.aid-row');
    var aidPopup = document.getElementById('show-aid-popup');
    var updateAidButton = document.getElementById('update-aid-button');
    var deleteAidButton = document.getElementById('delete-aid-button');
    var cancelUpdateAid = document.getElementById('cancel-update-aid');


    aidRows.forEach(function (row) {
        row.addEventListener('click', function () {

            var selectedUnitName = document.getElementById('select-aid-unit').value;
            var unitSelectElement = document.getElementById('update-aid-unit');

            for (var i = 0; i < unitSelectElement.options.length; i++) {
                var option = unitSelectElement.options[i];
                if (option.text === selectedUnitName) {
                    unitSelectElement.selectedIndex = i;
                    break;
                }
            }

            var aidId = row.dataset.id;
            var category = row.dataset.category;
            var productName = row.cells[2].textContent;
            var status = row.cells[3].textContent;
            var location = row.cells[4].textContent;
            var inspectionDate = row.cells[5].textContent;
            var comment = row.cells[6].textContent;

            document.getElementById('update-id').value = aidId;
            document.getElementById('update-product-name').value = productName;
            document.getElementById('update-location').value = location;
            document.getElementById('update-comment').value = comment;

            aidPopup.style.display = 'block';
        });
    });

    cancelUpdateAid.addEventListener('click', function () {
        aidPopup.style.display = 'none';
    });

});