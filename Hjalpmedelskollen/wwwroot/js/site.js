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
    var addAidFeedback = document.getElementById('add-aid-feedback');

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
    var aidPopup = document.getElementById('update-aid-popup');
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

                var category = this.getAttribute('data-category');
                var selectElement = document.getElementById('update-category-list');
                var categoryOption = document.querySelector('#update-category-list option[value="' + category + '"]');
                if (categoryOption) {

                    selectElement.value = category;
                }

                var status = this.getAttribute('data-status');
                var statusElement = document.getElementById('update-status');
                var statusOption = document.querySelector('#update-status option[value="' + status + '"]');
                if (statusOption) {
                    statusElement.value = status;
                }

                var qr = this.getAttribute('data-qr');
                var qrElement = document.getElementById('update-qr');
                var qrOption = document.querySelector('#update-qr option[value="' + qr + '"]');
                if (qrOption) {
                    qrElement.value = qr;
                }

                var registered = this.getAttribute('data-registered');
                var registeredDate = registered.split(' ')[0];
                document.getElementById('update-registered').value = registeredDate;

                var id = this.getAttribute('data-id');
                var productName = this.querySelector('.m-column:nth-child(3)').textContent;
                var location = this.querySelector('.m-column:nth-child(5)').textContent;
                var inspection = this.querySelector('.s-column').textContent;
                var comment = this.querySelector('.l-column').textContent;

                document.getElementById('update-id').value = id;
                document.getElementById('category-list').value = category;
                document.getElementById('update-product-name').value = productName;
                document.getElementById('status').value = status;
                document.getElementById('update-location').value = location;
                document.getElementById('update-inspection').value = inspection;
                document.getElementById('update-comment').value = comment;

                aidPopup.style.display = 'block';
            });
        });

        cancelUpdateAid.addEventListener('click', function () {
            aidPopup.style.display = 'none';
        });

});