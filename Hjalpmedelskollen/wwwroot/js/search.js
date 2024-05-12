/*SEARCH*/
$('#search-result').hide();

document.getElementById('search-button').addEventListener('click', function () {
    searchAid();
});

function searchAid() {
    var searchInput = document.getElementById("search-input").value;
    var searchType = document.querySelector('input[name="searchType"]:checked').value;
    var selectedUnits = [];

    document.querySelectorAll('input[name="unit"]:checked').forEach(function (unit) {
        selectedUnits.push(unit.value);
    });

    var unitIds = selectedUnits.join(',');

    $.ajax({
        url: '/Search/SearchAidInDatabase',
        type: 'GET',
        data: {
            searchInput: searchInput,
            searchType: searchType,
            unitIds: unitIds,
        },
        success: function (data) {
            console.log(unitIds);
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
        tr.innerHTML = `
            <td>${aid.id}</td>
            <td>${aid.productName}</td>
            <td>${aid.category}</td>
        `;
        tableBody.appendChild(tr);
    });
}