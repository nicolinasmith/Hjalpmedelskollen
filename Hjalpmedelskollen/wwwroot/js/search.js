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
            console.log(data);
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
        tr.classList.add("aid-row");
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
}