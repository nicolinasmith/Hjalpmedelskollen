document.addEventListener('DOMContentLoaded', function () {
    /*SEARCH*/
    $('#search-result').hide();

    document.getElementById('search-button').addEventListener('click', function () {
        searchAid();
    });

    function searchAid() {
        var searchInput = document.getElementById("search-input").value;
        var searchType = document.querySelector('input[name="searchType"]:checked').value;
        var unitId = document.querySelector('input[name="unit"]:checked').value;
        var status = document.querySelector('input[name="status"]:checked').value;

        $.ajax({
            url: '/Search/SearchAidInDatabase',
            type: 'GET',
            data: {
                searchInput: searchInput,
                searchType: searchType,
                unitId: unitId,
                status: status
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
            var circleColor = aid.patient ? '<i class="fa-solid fa-circle red-circle"></i>' : '<i class="fa-solid fa-circle green-circle"></i>';

            tr.innerHTML = `
            <td>${aid.id}</td>
            <td>${aid.productName}</td>
            <td>${aid.category}</td>
            <td>${aid.section.unit.name}</td>
            <td>${circleColor} ${aid.section.name} ${patientName}</td>
        `;
            tableBody.appendChild(tr);
        });

        /*UPDATE AID*/
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

            if (confirm('Är du säker på att du vill uppdatera detta hjälpmedel?')) {
                var id = document.getElementById('update-id').value;
                var unitId = document.getElementById('update-aid-unit').value;
                var sectionId = document.getElementById('update-aid-section').value;
                var category = document.getElementById('update-category-list').value;
                var productName = document.getElementById('update-product-name').value;
                var registered = document.getElementById('update-registered').value;
                var inspection = document.getElementById('update-inspection').value;
                var patient = document.getElementById('update-patient').value;
                var comment = document.getElementById('update-comment').value;

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
                            searchAid();
                            alert('Hjälpmedlet har uppdaterats.');
                        } else {
                            alert('Det gick inte att uppdatera hjälpmedlet.');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                    }
                });
            }
        });

        document.getElementById('delete-aid-button').addEventListener('click', function () {

            if (confirm('Är du säker på att du vill ta bort detta hjälpmedel?')) {
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
                            searchAid();
                            alert('Hjälpmedlet har tagits bort.');
                        } else {
                            alert('Det gick inte att ta bort hjälpmedlet.');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                    }
                });
            }
        });
    }
});