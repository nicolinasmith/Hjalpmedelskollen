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
    });

    /*CLOSE POP-UP*/
    $('.close-popup-button').click(function () {
        var popupId = $(this).data('popup-id');
        document.getElementById(popupId).style.display = 'none';
    });
});