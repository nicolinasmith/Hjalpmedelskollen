document.addEventListener('DOMContentLoaded', function () {

    /*HAMBURGER MENU*/
    var menuDisplayed = false;

    $('.hamburger-menu').click(function () {
        var navList = $('.nav-list');
        var hamburgerMenuContent = $('#hamburger-menu-content');

        if (menuDisplayed) {
            hamburgerMenuContent.html('');
            hamburgerMenuContent.removeClass('show');
            menuDisplayed = false;
        }
        else {
            hamburgerMenuContent.html(navList.html());
            hamburgerMenuContent.toggleClass('show');
            menuDisplayed = true;
        }
    });

    /*UPDATE SECTION AND PATIENT BASED ON SELECTED UNIT AND SECTION*/
    $('#update-aid-unit, #update-aid-section').change(function () {
        filterSelection();
    });

    function filterSelection() {
        var selectedUnit = $('#update-aid-unit').val();
        var selectedSection = $('#update-aid-section').val();

        $('#update-aid-section option').each(function () {
            var unitId = $(this).data('unit-id');
            if (unitId == selectedUnit || unitId == "") {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        $('#update-patient option').each(function () {
            var sectionId = $(this).data('section-id');
            var unitId = $('#update-aid-section option[value="' + sectionId + '"]').data('unit-id');
            if (sectionId == selectedSection && unitId == selectedUnit) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        $('#update-patient').prop('selectedIndex', 0);
    }

    filterSelection();


    /*CLOSE POP-UP*/
    $('.close-popup-button').click(function () {
        var popupId = $(this).data('popup-id');
        document.getElementById(popupId).style.display = 'none';
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

    addSortEventToHeader('aid-table');
    addSortEventToHeader('patient-table');
    addSortEventToHeader('search-table');
    addSortEventToHeader('statistics-table');
});