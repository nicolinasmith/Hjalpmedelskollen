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

    /*AIDS BY UNIT - HANDLE PATIENTS*/
    var displayPatients = document.getElementById('display-patients');
    var patientPopup = document.getElementById('patients-popup');
    var closePatientPopup = document.getElementById('close-patients-popup');
    var patientRow = document.querySelectorAll('.patient-row');
    var updatePatient = document.getElementById('update-patient-popup');
    var cancelUpdatePatient = document.getElementById('cancel-update-patient');
    var addPatientPopup = document.getElementById('add-patient-popup');
    var addPatientButton = document.getElementById('add-patient-button');

    addPatientButton.addEventListener('click', function () {
        addPatientPopup.style.display = 'block';
    });

    displayPatients.addEventListener('click', function () {
        patientPopup.style.display = 'block';
    });

    patientRow.forEach(function (row) {
        row.addEventListener('click', function () {
            var id = this.getAttribute('data-id');
            var name = this.getAttribute('data-name');
            
            document.getElementById('update-patient-id').value = id;
            document.getElementById('update-patient-name').value = name;

            updatePatient.style.display = 'block';
        });
    });

    cancelUpdatePatient.addEventListener('click', function () {
            updatePatient.style.display = 'none';
    });

    closePatientPopup.addEventListener('click', function () {
        patientPopup.style.display = 'none';
    });


    /*AIDS BY UNIT - FILTER*/
    document.getElementById('select-category').addEventListener('change', filterAids);
    document.getElementById('select-status').addEventListener('change', filterAids);
    document.getElementById('select-location').addEventListener('change', filterAids);

    function filterAids() {
        var selectedCategory = document.getElementById('select-category').value;
        var selectedStatus = document.getElementById('select-status').value;
        var selectedLocation = document.getElementById('select-location').value;
        var aidRows = document.querySelectorAll('.aid-row');

        aidRows.forEach(function (row) {
            var category = row.dataset.category;
            var status = row.dataset.status;
            var location = row.dataset.location;

            var statusBool = status === 'True' ? 'Ledigt' : 'Upptaget';

            if ((selectedCategory === 'Alla' || category === selectedCategory) &&
                (selectedStatus === 'Alla' || statusBool === selectedStatus) &&
                (selectedLocation === 'Alla' || location === selectedLocation)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
            });
        }

    /*AIDS BY UNIT - SORT TABLE*/
    /*SOURCE: https://www.w3schools.com/howto/howto_js_sort_table.asp*/
    function sortTable(n, selectedTable) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById(selectedTable);
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

    function addSortEventToHeader(tableId) {
    var headers = document.querySelectorAll('#' + tableId + ' .table-header th');
    headers.forEach(function (header, index) {
        header.addEventListener('click', function () {
            sortTable(index, tableId);
        });
    });
    }

    addSortEventToHeader('aid-table');
    addSortEventToHeader('patient-table');

    /*AIDS BY UNIT - ADD AID*/
    var addAidPopup = document.getElementById('add-aid-popup');
    var addAidUnit = document.getElementById('unit-list');
    var addNewAid = document.getElementById('add-new-aid');
    var addNewAidMobile = document.getElementById('mobile-add-new-aid');
    var cancelAddAid = document.getElementById('cancel-add-aid');
    //var addAidFeedback = document.getElementById('add-aid-feedback');

    function handleAddAidClick() {
        addAidPopup.style.display = 'block';

        var unitId = this.getAttribute('data-selected-unit');
        var selectElement = document.getElementById('unit-list');
        var unitOption = selectElement.querySelector('#unit-list option[value="' + unitId + '"]');

        if (unitOption) {
            selectElement.value = unitId;
        }
    }

    addNewAid.addEventListener('click', handleAddAidClick);
    addNewAidMobile.addEventListener('click', handleAddAidClick);

    cancelAddAid.addEventListener('click', function () {
        addAidPopup.style.display = 'none';
    });

    /*NEW CATEGORY*/
    var categoryList = document.getElementById('category-list');
    var updateCategoryList = document.getElementById('update-category-list');
    var newCategoryPopup = document.getElementById('new-category-popup');
    var addCategoryButton = document.getElementById('add-category-button');
    var cancelAddCategory = document.getElementById('cancel-add-category');


    function addNewCategoryToList(categoryName, list) {
        if (categoryName.trim() !== '') {
            var newCategory = document.createElement('option');
            newCategory.text = categoryName;
            list.add(newCategory);
            list.value = categoryName;
        }
    }

    categoryList.addEventListener('change', function () {
        if (categoryList.value === 'new-category') {
            newCategoryPopup.style.display = 'block';
        }
    });

    updateCategoryList.addEventListener('change', function () {
        if (updateCategoryList.value === 'new-category') {
            newCategoryPopup.style.display = 'block';
        }
    });

    addCategoryButton.addEventListener('click', function () {
        var newCategoryInput = document.getElementById('new-category').value;
        if (categoryList.value === 'new-category') {
            addNewCategoryToList(newCategoryInput, categoryList);
        }
        if (updateCategoryList.value === 'new-category') {
            addNewCategoryToList(newCategoryInput, updateCategoryList);
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

    document.getElementById('cancel-qr-button').addEventListener('click', function () {
        document.getElementById('qr-popup').style.display = 'none';
    });

    domReady(function () {
        var qrContainer = document.getElementById('qr-popup');
        var scanQrButton = document.getElementById('qr-button');
        var cancelQrButton = document.getElementById('cancel-qr-button');
        var htmlScanner = null;

        function onScanSuccess(decodeText, decodeResult) {
            console.log(decodeText);
            $.ajax({
                url: '/Home/GetAidFromDatabase',
                method: 'GET',
                data: {
                    aidId: decodeText
                },
                success: function (response) {
                    if (response) {
                        console.log(response);
                        displayQrAid(response);
                    } else {
                        showMissingAidPopup(decodeText);
                    }
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 404) {
                        console.log(xhr.responseText);
                    } else {
                        console.error(xhr.responseText);
                        qrAidMissingPopup.style.display = 'block';
                        qrAidMissingText.textContent = 'Något gick fel. Försök igen.';
                        document.getElementById('add-qr-aid').style.display = 'none';
                    }
                }
            });
        }

        htmlScanner = new Html5QrcodeScanner(
            "my-qr-reader",
            { fps: 10, qrbos: 250 },
            onScanSuccess 
        );

        scanQrButton.addEventListener('click', function () {
            qrContainer.style.display = 'block';
            htmlScanner.render(onScanSuccess);
        });

        cancelQrButton.addEventListener('click', function () {
            qrContainer.style.display = 'none';
            htmlScanner.stop();
        });
    });

    function showMissingAidPopup(decodeText) {
        var qrContainer = document.getElementById('qr-popup');
        var addQrAid = document.getElementById('add-qr-aid');
        var cancelQrAid = document.getElementById('cancel-qr-aid');

        var qrAidMissingPopup = document.getElementById('qr-missing-popup');
        var qrAidMissingText = document.getElementById('qr-missing-text');

        qrAidMissingPopup.style.display = 'block';
        qrAidMissingText.textContent = `Det finns inget hjälpmedel med registreringsnummer "${decodeText}". Vill du registrera det?`;
        document.getElementById('id').value = decodeText;
        document.getElementById('qr').value = true;

        cancelQrAid.addEventListener('click', function () {
            qrAidMissingPopup.style.display = 'none';
        });

        addQrAid.addEventListener('click', function () {
            addAidPopup.style.display = 'block';
            qrContainer.style.display = 'none';
            qrAidMissingPopup.style.display = 'none';

            var unitId = this.getAttribute('data-selected-unit');
            var selectElement = document.getElementById('unit-list');
            var unitOption = selectElement.querySelector('#unit-list option[value="' + unitId + '"]');

            if (unitOption) {
                selectElement.value = unitId;
            }
        });
    }


    function displayQrAid(aid) {
        console.log(aid);

        document.getElementById('qr-popup').style.display = 'none';
        document.getElementById('update-aid-popup').style.display = 'block';

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
    }

    /*AIDS BY UNIT - NOTE BOARD*/
    var displayAddNote = document.getElementById('display-new-note-button');
    var addNotePopup = document.getElementById('add-note-popup');
    var cancelAddNote = document.getElementById('cancel-add-note');
    var showAllNotesButton = document.getElementById('show-all-notes-button');
    var cancelShowNotes = document.getElementById('cancel-show-notes');
    var showAllNotes = document.getElementById('show-all-notes');
    var deleteNote = document.querySelector('delete-note');

    displayAddNote.addEventListener('click', function () {
        addNotePopup.style.display = 'block';
    });

    cancelAddNote.addEventListener('click', function () {
        addNotePopup.style.display = 'none';
    });

    showAllNotesButton.addEventListener('click', function () {
        showAllNotes.style.display = 'block';
    });

    cancelShowNotes.addEventListener('click', function () {
        showAllNotes.style.display = 'none';
    });
});