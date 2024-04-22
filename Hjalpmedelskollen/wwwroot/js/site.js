document.addEventListener('DOMContentLoaded', function () {

    /*SCAN QR*/
    /*SOURCE https://www.geeksforgeeks.org/create-a-qr-code-scanner-or-reader-in-html-css-javascript/ */
    function domReady(fn) {
        if (
            document.readyState === "complete" ||
            document.readyState === "interactive"
        ) {
            setTimeout(fn, 1000);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    domReady(function () {
        var scanQrButton = document.getElementById('qr-button');
        var qrContainer = document.getElementById('qr-popup');
        var cancelQrButton = document.getElementById('cancel-qr-button');
        var qrAidMissingPopup = document.getElementById('qr-missing-popup');
        var qrAidMissingText = document.getElementById('qr-missing-text');
        var addQrAid = document.getElementById('add-qr-aid');
        var cancelQrAid = document.getElementById('cancel-qr-aid');

        scanQrButton.addEventListener('click', function () {
            qrContainer.style.display = 'block';

            function onScanSuccess(decodeText, decodeResult) {
                $.ajax({
                    url: '/Home/GetAid',
                    method: 'GET',
                    data: {
                        aidId: decodeText
                    },
                    success: function (response) {
                        displayQrAid(response);
                        console.log(response); 
                    },
                    error: function (xhr, status, error) {
                        if (xhr.status === 404) {
                            qrAidMissingPopup.style.display = 'block';
                            qrAidMissingText.textContent = `Det finns inget hjälpmedel med registreringsnummer '${decodeText}'. Vill du registrera det?`;
                            document.getElementById('add-aid-id').value = decodeText;
                            document.getElementById('qr').value = true;
                        } else {
                            console.error(xhr.responseText);
                        }
                    }
                });
            }

            let htmlScanner = new Html5QrcodeScanner(
                "my-qr-reader",
                { fps: 10, qrbos: 250 }
            );
            htmlScanner.render(onScanSuccess);
        });

        cancelQrAid.addEventListener('click', function () {
            qrAidMissingPopup.style.display = 'none';
        });


        addQrAid.addEventListener('click', function () {
            addAidPopup.style.display = 'block';
            qrAidMissingPopup.style.display = 'none';
        });

        cancelQrButton.addEventListener('click', function () {
            qrContainer.style.display = 'none';
        });
    });


    function displayQrAid(aid) {

        var aidPopup = document.getElementById('update-aid-popup');

        var unitId = aid.unitId;
        var unitSelectElement = document.getElementById('update-aid-unit');
        var unitOption = document.querySelector('#update-aid-unit option[value="' + unitId + '"]');
        if (unitOption) {
            unitSelectElement.value = unitId;
        }

        var category = aid.category;
        var selectElement = document.getElementById('update-category-list');
        var categoryOption = document.querySelector('#update-category-list option[value="' + category + '"]');
        if (categoryOption) {

            selectElement.value = category;
        }

        var status = aid.status;
        var statusElement = document.getElementById('update-status');
        var statusOption = document.querySelector('#update-status option[value="' + status + '"]');
        if (statusOption) {
            statusElement.value = status;
        }

        var qr = aid.qrCode;
        var qrElement = document.getElementById('update-qr');
        var qrOption = document.querySelector('#update-qr option[value="' + qr + '"]');
        if (qrOption) {
            qrElement.value = qr;
        }

        var registeredDate = new Date(aid.registered).toLocaleDateString("sv-SE", { year: 'numeric', month: '2-digit', day: '2-digit' });
        var inspectionDate = new Date(aid.inspection).toLocaleDateString("sv-SE", { year: 'numeric', month: '2-digit' });

        document.getElementById('update-registered').value = registeredDate;
        document.getElementById('update-id').value = aid.id;
        document.getElementById('category-list').value = category;
        document.getElementById('update-product-name').value = aid.productName;
        document.getElementById('update-location').value = aid.location;
        document.getElementById('update-inspection').value = inspectionDate;
        document.getElementById('update-comment').value = aid.comment;

        aidPopup.style.display = 'block';
    }

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
    document.getElementById('select-category').addEventListener('change', filterAids);
    document.getElementById('select-status').addEventListener('change', filterAids);

    function filterAids() {
        var selectedCategory = document.getElementById('select-category').value;
        var selectedStatus = document.getElementById('select-status').value;
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
    //var addAidFeedback = document.getElementById('add-aid-feedback');

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

    /*AIDS BY UNIT - UPDATE AID*/
    var aidRows = document.querySelectorAll('.aid-row');
    var aidPopup = document.getElementById('update-aid-popup');
    var cancelUpdateAid = document.getElementById('cancel-update-aid');

    aidRows.forEach(function (row) {
        row.addEventListener('click', function () {

            var unitId = this.getAttribute('data-unit-id');
            var unitSelectElement = document.getElementById('update-aid-unit');

            for (var i = 0; i < unitSelectElement.options.length; i++) {
                if (unitSelectElement.options[i].value === unitId) {
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
            status = status.toLowerCase();
            var statusElement = document.getElementById('update-status');
            var statusOption = document.querySelector('#update-status option[value="' + status + '"]');
            if (statusOption) {
                statusElement.value = status;
            }

            var qr = this.getAttribute('data-qr');
            qr = qr.toLowerCase();
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

            var inspectionContainer = this.querySelector('.s-column');
            var inspectionDate = inspectionContainer.textContent.trim();
            var iconClass = inspectionContainer.querySelector('i').className;
            inspectionDate = inspectionDate.replace(iconClass, '').trim();

            var comment = this.querySelector('.l-column').textContent;

            document.getElementById('update-id').value = id;
            document.getElementById('category-list').value = category;
            document.getElementById('update-product-name').value = productName;
            //document.getElementById('status').value = status;
            document.getElementById('update-location').value = location;
            document.getElementById('update-inspection').value = inspectionDate;
            document.getElementById('update-comment').value = comment;

            aidPopup.style.display = 'block';
        });
    });

    cancelUpdateAid.addEventListener('click', function () {
        aidPopup.style.display = 'none';
    });


    var confirmPopup = document.getElementById('confirm-popup');
    var confirmYes = document.getElementById('confirm-yes');
    var confirmNo = document.getElementById('confirm-no');
    var confirmText = document.getElementById('confirm-text');

    document.getElementById('update-aid-button').addEventListener('click', function (event) {
        event.preventDefault();
        confirmPopup.style.display = 'block';
        confirmYes.dataset.action = 'update';
        confirmText.textContent = 'Vill du spara ändringarna på detta hjälpmedel?';
    });

    document.getElementById('delete-aid-button').addEventListener('click', function (event) {
        event.preventDefault();
        confirmPopup.style.display = 'block';
        confirmYes.dataset.action = 'delete';
        confirmText.textContent = 'Vill du ta bort detta hjälpmedel?';
    });

    confirmNo.addEventListener('click', function (event) {
        event.preventDefault();
        confirmPopup.style.display = 'none';
    });

    confirmYes.addEventListener('click', function () {
        var action = this.dataset.action;
        var form = document.getElementById('update-aid-form');

        if (action === 'update') {
            form.formAction.value = 'update';
        } else if (action === 'delete') {
            form.formAction.value = 'delete';
        }

        form.submit();
    });

    /*AIDS BY UNIT - SORT TABLE*/
    /*SOURCE: https://www.w3schools.com/howto/howto_js_sort_table.asp*/
    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById('aid-table');
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    function addSortEventToHeader() {
        var headers = document.querySelectorAll('.table-header th');
        headers.forEach(function (header, index) {
            header.addEventListener('click', function () {
                sortTable(index);
            });
        });
    }

    addSortEventToHeader();

});