document.addEventListener('DOMContentLoaded', function () {

    /*AIDS BY UNIT - SELECT UNIT*/
    document.getElementById('change-unit').addEventListener('click', function () {
        document.getElementById('unit-popup').style.display = 'block';
    });

    document.getElementById('mobile-change-unit').addEventListener('click', function () {
        document.getElementById('unit-popup').style.display = 'block';
    });

    document.getElementById('cancel-select-unit').addEventListener('click', function () {
        document.getElementById('unit-popup').style.display = 'none';
    });

    document.getElementById('select-unit-button').addEventListener('change', function () {

        var unitId = document.getElementById('select-unit-list').value;

        $.ajax({
            url: '/Home/DisplayAidsByUnit',
            method: 'POST',
            data: {
                unitId
            },
            success: function (response) {
                if (response.success) {

                } else {
                    alert('Det gick inte att byta enhet.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });

    });

    /*AIDS BY UNIT - DISPLAY SECTION*/
    document.getElementById('display-sections').addEventListener('click', function () {
        document.getElementById('sections-popup').style.display = 'block';
    });

    document.getElementById('close-sections-popup').addEventListener('click', function () {
        document.getElementById('sections-popup').style.display = 'block';
    });



    /*AIDS BY UNIT - HANDLE PATIENTS*/
    var patientPopup = document.getElementById('patients-popup');
    var closePatientPopup = document.getElementById('close-patients-popup');
    var updatePatient = document.getElementById('update-patient-popup');
    var cancelUpdatePatient = document.getElementById('cancel-update-patient');

    document.getElementById('display-patients').addEventListener('click', function () {
        document.getElementById('patients-popup').style.display = 'block';
    });

    document.getElementById('mobile-display-patients').addEventListener('click', function () {
        document.getElementById('patients-popup').style.display = 'block';
    });

    document.getElementById('add-patient-button').addEventListener('click', function () {
        document.getElementById('add-patient-popup').style.display = 'block';
    });

    document.getElementById('add-new-patient').addEventListener('click', function () {
        addPatient();
    });

    function addPatient() {

        var patientNumber = document.getElementById('add-patient-number').value;
        var patientName = document.getElementById('add-patient-name').value;
        var sectionId = document.getElementById('add-patient-section').value;
        var unitId = document.getElementById('add-patient-unit-id').value;

        $.ajax({
            url: '/Home/AddPatientToDatabase',
            method: 'POST',
            data: {
                PatientNumber: patientNumber,
                Name: patientName,
                SectionId: sectionId,
            },
            success: function (response) {
                if (response.success) {
                    document.getElementById('add-patient-popup').style.display = 'none';
                    $("#patient-table").load("/Home/Index?unitId=" + unitId + " #patient-table");
                } else {
                    alert('Det gick inte att lägga till patienten.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }

    document.getElementById('cancel-add-patient').addEventListener('click', function () {
        document.getElementById('add-patient-popup').style.display = 'none';
    });

    var patientRow = document.querySelectorAll('.patient-row');
    patientRow.forEach(function (row) {
        row.addEventListener('click', function () {
            var patientId = this.getAttribute('data-patient-id');
            var patientNumber = this.getAttribute('data-patient-number');
            var name = this.getAttribute('data-name');
            var section = this.getAttribute('data-section');
            var sectionOption = document.querySelector('#update-patient-section option[value="' + section + '"]');
            if (sectionOption) {
                document.getElementById('update-patient-section').value = section;
            }

            document.getElementById('update-patient-id').value = patientId;
            document.getElementById('update-patient-number').value = patientNumber;
            document.getElementById('update-patient-name').value = name;

            updatePatient.style.display = 'block';
        });
    });

    document.getElementById('update-patient-button').addEventListener('click', function () {

        var patientId = document.getElementById('update-patient-id').value;
        var patientNumber = document.getElementById('update-patient-number').value;
        var name = document.getElementById('update-patient-name').value;
        var section = document.getElementById('update-patient-section').value;

        $.ajax({
            url: '/Home/UpdatePatientToDatabase',
            method: 'POST',
            data: {
                PatientNumber: patientNumber,
                Name: name,
                SectionId: section,
                Id: patientId
            },
            success: function (response) {
                if (response.success) {
                    alert('Patienten har uppdaterats.');
                    updatePatient.style.display = 'none';
                    $("#patient-table").load("/Home/Index #patient-table");
                } else {
                    alert('Det gick inte att uppdatera patienten.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

    document.getElementById('delete-patient-button').addEventListener('click', function () {

        var patientId = document.getElementById('update-patient-id').value;

        $.ajax({
            url: '/Home/DeletePatientFromDatabase',
            method: 'POST',
            data: {
                PatientId: patientId
            },
            success: function (response) {
                if (response.success) {
                    alert('Patienten har tagits bort.');
                    updatePatient.style.display = 'none';
                    $("#patient-table").load("/Home/Index #patient-table");
                } else {
                    alert('Det gick inte att ta bort patienten.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });




    cancelUpdatePatient.addEventListener('click', function () {
        updatePatient.style.display = 'none';
    });

    closePatientPopup.addEventListener('click', function () {
        patientPopup.style.display = 'none';
    });

    /*AIDS BY UNIT - PATIENT BY SECTION*/
    document.getElementById('select-patient-section').addEventListener('change', filterPatients);

    function filterPatients() {
        var selectedSection = document.getElementById('select-patient-section').value;

        var patientRows = document.querySelectorAll('.patient-row');

        patientRows.forEach(function (row) {
            var section = row.dataset.section;

            if (selectedSection === 'all' || selectedSection === section) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    }


    /*AIDS BY UNIT - FILTER*/
    document.getElementById('select-category').addEventListener('change', filterAids);
    document.getElementById('select-section').addEventListener('change', filterAids);
    document.getElementById('select-patient').addEventListener('change', filterAids);

    function filterAids() {
        var selectedCategory = document.getElementById('select-category').value;
        var selectedSection = document.getElementById('select-section').value;
        var selectedPatient = document.getElementById('select-patient').value;

        var aidRows = document.querySelectorAll('.aid-row');

        aidRows.forEach(function (row) {
            var category = row.dataset.category;
            var section = row.dataset.section;
            var patient = row.dataset.patient;

            if ((selectedCategory === 'all' || selectedCategory === category) &&
                (selectedSection === 'all' || selectedSection === section) &&
                (selectedPatient === 'all' || selectedPatient === patient)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }

        });
    }

    ///*AIDS BY UNIT - SORT TABLE*/
    ///*SOURCE: https://www.w3schools.com/howto/howto_js_sort_table.asp*/
    //function sortTable(n, selectedTable) {
    //    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    //    table = document.getElementById(selectedTable);
    //    switching = true;
    //    dir = "asc";
    //    while (switching) {
    //        switching = false;
    //        rows = table.rows;
    //        for (i = 1; i < (rows.length - 1); i++) {
    //            shouldSwitch = false;
    //            x = rows[i].getElementsByTagName("TD")[n];
    //            y = rows[i + 1].getElementsByTagName("TD")[n];
    //            if (dir == "asc") {
    //                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
    //                    shouldSwitch = true;
    //                    break;
    //                }
    //            } else if (dir == "desc") {
    //                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
    //                    shouldSwitch = true;
    //                    break;
    //                }
    //            }
    //        }
    //        if (shouldSwitch) {
    //            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    //            switching = true;
    //            switchcount++;
    //        } else {
    //            if (switchcount == 0 && dir == "asc") {
    //                dir = "desc";
    //                switching = true;
    //            }
    //        }
    //    }
    //}

    //function addSortEventToHeader(tableId) {
    //    var headers = document.querySelectorAll('#' + tableId + ' .table-header th');
    //    headers.forEach(function (header, index) {
    //        header.addEventListener('click', function () {
    //            sortTable(index, tableId);
    //        });
    //    });
    //}

    //addSortEventToHeader('aid-table');
    //addSortEventToHeader('patient-table');

    /*AIDS BY UNIT - ADD AID*/
    function handleAddAidClick() {
        document.getElementById('add-aid-popup').style.display = 'block';
        document.getElementById('add-aid-registered').value = new Date().toLocaleDateString('sv-SE');
    }

    document.getElementById('add-new-aid').addEventListener('click', handleAddAidClick);
    document.getElementById('mobile-add-new-aid').addEventListener('click', handleAddAidClick);

    document.getElementById('cancel-add-aid').addEventListener('click', function () {
        document.getElementById('add-aid-popup').style.display = 'none';
    });

    document.getElementById('add-aid-button').addEventListener('click', function () {

        var aidId = document.getElementById('add-aid-id').value
        var sectionId = document.getElementById('add-section-list').value;
        var category = document.getElementById('add-category-list').value;
        var productName = document.getElementById('add-product-name').value;
        var registered = document.getElementById('add-aid-registered').value;
        var inspection = document.getElementById('add-inspection').value;
        var patient = document.getElementById('add-patient-list').value;
        var comment = document.getElementById('add-comment').value;

        $.ajax({
            url: '/Home/AddAidToDatabase',
            method: 'POST',
            data: {
                Id: aidId,
                SectionId: sectionId,
                Category: category,
                ProductName: productName,
                Registered: registered,
                Inspection: inspection,
                PatientId: patient,
                Comment: comment
            },
            success: function (response) {
                if (response.success) {
                    document.getElementById('add-aid-popup').style.display = 'none';
                    $('#aid-table').load("/Home/Index #aid-table", function () {
                        $('#aid-table tbody tr.aid-row:first').addClass('highlight-aid');
                    });
                } else {
                    alert('Det gick inte att lägga till hjälpmedlet.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });


    $('#add-section-list').change(function () {

        var sectionId = $(this).val();
        var patientList = $('#add-patient-list');

    });


    /*NEW CATEGORY*/
    var categoryList = document.getElementById('add-category-list');
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
    $('#aid-table').on('click', '.aid-row', function () {

        var id = $(this).data('id');
        var unitId = $(this).data('unit-id');
        var sectionId = $(this).data('section');
        var category = $(this).data('category');
        var productName = $(this).data('product-name');
        var registered = $(this).data('registered');
        var registeredDate = registered.split(' ')[0];
        var inspection = $(this).data('inspection');
        var patient = $(this).data('patient');
        var comment = $(this).data('comment');

        $('#update-id').val(id);
        $('#update-aid-unit').val(unitId);
        $('#update-aid-section').val(sectionId);
        $('#update-category-list').val(category);
        $('#update-product-name').val(productName);
        $('#update-registered').val(registeredDate);
        $('#update-inspection').val(inspection);
        $('#update-patient').val(patient);
        $('#update-comment').val(comment);

        $('#update-aid-popup').show();
    });

    $('#cancel-update-aid').click(function () {
        $('#update-aid-popup').hide();
    });


    document.getElementById('update-aid-button').addEventListener('click', function () {

        var id = document.getElementById('update-id').value;
        var unitId = document.getElementById('update-aid-unit').value;
        var sectionId = document.getElementById('update-aid-section').value;
        var category = document.getElementById('update-category-list').value;
        var productName = document.getElementById('update-product-name').value;
        var registered = document.getElementById('update-registered').value;
        var inspection = document.getElementById('update-inspection').value;
        var patient = document.getElementById('update-patient').value;
        var comment = document.getElementById('update-comment').value;

        console.log(productName);

        $.ajax({
            url: '/Home/UpdateAidToDatabase',
            method: 'POST',
            data: {
                Id: id,
                UnitId: unitId,
                SectionId: sectionId,
                Category: category,
                ProductName: productName,
                Registered: registered,
                Inspection: inspection,
                PatientId: patient,
                Comment: comment,
                FormAction: 'update'
            },
            success: function (response) {
                if (response.success) {
                    $('#update-aid-popup').hide();
                    $('#aid-table').load("/Home/Index #aid-table", function () {
                        $('.aid-row[data-id="' + id + '"]').addClass('highlight-aid');
                    });
                    alert('Hjälpmedlet har uppdaterats.');
                } else {
                    alert('Det gick inte att uppdatera hjälpmedlet.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

    document.getElementById('delete-aid-button').addEventListener('click', function () {
        var id = document.getElementById('update-id').value;

        $.ajax({
            url: '/Home/UpdateAidToDatabase',
            method: 'POST',
            data: {
                Id: id,
                FormAction: 'delete'
            },
            success: function (response) {
                if (response.success) {
                    $('#update-aid-popup').hide();
                    $('.aid-row[data-id="' + id + '"]').addClass('disabled-aid-row');
                    $('.aid-row[data-id="' + id + '"]').removeClass('aid-row');
                    alert('Hjälpmedlet har tagits bort.');
                } else {
                    alert('Det gick inte att ta bort hjälpmedlet.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
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
        //document.getElementById('id').value = decodeText;

        cancelQrAid.addEventListener('click', function () {
            qrAidMissingPopup.style.display = 'none';
        });

        addQrAid.addEventListener('click', function () {
            var addAidPopup = document.getElementById('add-aid-popup');
            addAidPopup.style.display = 'block';
            qrContainer.style.display = 'none';
            qrAidMissingPopup.style.display = 'none';

            document.getElementById('add-aid-id').value = decodeText;
            document.getElementById('add-aid-registered').value = new Date().toLocaleDateString('sv-SE');

            //var unitId = this.getAttribute('data-selected-unit');
            //var selectElement = document.getElementById('unit-list');
            //var unitOption = selectElement.querySelector('#unit-list option[value="' + unitId + '"]');

            //if (unitOption) {
            //    selectElement.value = unitId;
            //}
        });
    }

    function displayQrAid(aid) {

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
    document.getElementById('display-new-note-button').addEventListener('click', function () {
        document.getElementById('add-note-popup').style.display = 'block';
    });

    document.getElementById('cancel-add-note').addEventListener('click', function () {
        document.getElementById('add-note-popup').style.display = 'none';
    });

    document.getElementById('cancel-show-notes').addEventListener('click', function () {
        document.getElementById('show-all-notes').style.display = 'none';
    });

    document.getElementById('show-all-notes-button').addEventListener('click', function () {
        document.getElementById('show-all-notes').style.display = 'block';
    });

    document.getElementById('add-note-button').addEventListener('click', function () {

        var note = document.getElementById('Note').value;
        var unitId = document.getElementById('UnitId').value;

        $.ajax({
            url: '/Home/AddNoteToDatabase',
            method: 'POST',
            data: {
                Note: note,
                UnitId: unitId
            },
            success: function (response) {
                if (response.success) {
                    document.getElementById('add-note-popup').style.display = 'none';
                    $("#note-aside").load("/Home/Index #note-aside");
                    $("#all-notes-container").load("/Home/Index #all-notes-container");
                } else {
                    alert('Det gick inte att lägga till anteckningen.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

    $('#all-notes-container').on('click', '.delete-note', function () {
        var noteId = $(this).data('note-id');

        $.ajax({
            url: '/Home/DeleteNoteFromDatabase',
            method: 'POST',
            data: {
                noteId
            },
            success: function (response) {
                if (response.success) {
                    $(`[data-note-id=${noteId}]`).remove();
                    $("#note-aside").load("/Home/Index #note-aside");
                    $("#all-notes-container").load("/Home/Index #all-notes-container");
                } else {
                    alert("Det gick inte att ta bort anteckningen.");
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});