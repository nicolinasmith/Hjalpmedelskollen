/*SEARCH*/
$('#search-result').hide();

document.getElementById('search-button').addEventListener('click', function () {
    searchAid();
});

function searchAid() {
    var searchInput = document.getElementById("search-input").value;
    var searchType = document.querySelector('input[name="searchType"]:checked').value;
    var unitId = document.querySelector('input[name="unit"]:checked').value;

    $.ajax({
        url: '/Search/SearchAidInDatabase',
        type: 'GET',
        data: {
            searchInput: searchInput,
            searchType: searchType,
            unitId: unitId
        },
        success: function (data) {
            updateSearchTable(data);
            $('#search-result').show();
            $('#result-text').text(data.length + ' träffar.');
        }
    });
}

function updateSearchTable(aids) {
    var tableBody = document.querySelector("#search-result tbody");
    tableBody.innerHTML = "";

    aids.forEach(function (aid) {
        var tr = document.createElement("tr");
        var registeredDate = new Date(aid.registered).toLocaleDateString();
        var inspectionDate = aid.inspection ? new Date(aid.inspection).toISOString().substring(0, 7) : '';
        var comment = aid.comment ? aid.comment : '';
        var patient = aid.patientId ? aid.patientId : '';
        tr.classList.add("aid-row");

        tr.setAttribute("data-id", aid.id);
        tr.setAttribute("data-category", aid.category);
        tr.setAttribute("data-registered", registeredDate);
        tr.setAttribute("data-product-name", aid.productName);
        tr.setAttribute("data-patient", patient);
        tr.setAttribute("data-unit-id", aid.section.unitId);
        tr.setAttribute("data-section", aid.sectionId);
        tr.setAttribute("data-comment", comment);
        tr.setAttribute("data-inspection", inspectionDate);
        var patientName = aid.patient ? aid.patient.name : '';

        tr.innerHTML = `
            <td>${aid.id}</td>
            <td>${aid.productName}</td>
            <td>${aid.category}</td>
            <td>${aid.section.unit.name}</td>
            <td>${aid.section.name} ${patientName}</td>
        `;
        tableBody.appendChild(tr);
    });

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

    addSortEventToHeader('search-table');


    var aidRows = document.querySelectorAll('.aid-row');
    var aidPopup = document.getElementById('update-aid-popup');
    var cancelUpdateAid = document.getElementById('cancel-update-aid');

    aidRows.forEach(function (row) {
        row.addEventListener('click', function () {

            var id = this.getAttribute('data-id');
            document.getElementById('update-id').value = id;

            var unitId = this.getAttribute('data-unit-id');
            var unitSelectElement = document.getElementById('update-aid-unit');

            for (var i = 0; i < unitSelectElement.options.length; i++) {
                if (unitSelectElement.options[i].value === unitId) {
                    unitSelectElement.selectedIndex = i;
                    break;
                }
            }

            var sectionId = this.getAttribute('data-section');
            var sectionSelectElement = document.getElementById('update-aid-section');

            for (var i = 0; i < sectionSelectElement.options.length; i++) {
                if (sectionSelectElement.options[i].value === sectionId) {
                    sectionSelectElement.selectedIndex = i;
                    break;
                }
            }

            var category = this.getAttribute('data-category');
            var selectElement = document.getElementById('update-category-list');
            var categoryOption = document.querySelector('#update-category-list option[value="' + category + '"]');
            if (categoryOption) {

                selectElement.value = category;
            }

            var registered = this.getAttribute('data-registered');
            var registeredDate = registered.split(' ')[0];
            document.getElementById('update-registered').value = registeredDate;

            var productName = this.getAttribute('data-product-name');
            document.getElementById('update-product-name').value = productName;

            var comment = this.getAttribute('data-comment');
            document.getElementById('update-comment').value = comment;

            var inspection = this.getAttribute('data-inspection');
            document.getElementById('update-inspection').value = inspection;

            var patient = this.getAttribute('data-patient');
            var patientElement = document.getElementById('update-patient');
            var patientOption = document.querySelector('#update-patient option[value="' + patient + '"]');
            if (patientOption) {
                patientElement.value = patient;
            }

            aidPopup.style.display = 'block';
        });
    });

    cancelUpdateAid.addEventListener('click', function () {
        aidPopup.style.display = 'none';
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
                    aidPopup.style.display = 'none';
                    location.reload(true);

                } else {
                    alert('Det gick inte att uppdatera hjälpmedlet.');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

}