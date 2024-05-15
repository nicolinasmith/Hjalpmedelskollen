document.addEventListener('DOMContentLoaded', function () {

    var selectedFile = null;
    var selectedPath = null;

    $('.doc-folder-content').on('click', '.doc-file', function () {

        var filePath = $(this).data('file-path');
        var fileName = $(this).data('document-name');
        var fileCreated = $(this).data('document-created');
        selectedFile = $(this).data('document-id');
        selectedPath = filePath;

        $('#document-viewer').attr('src', filePath);
        $('#document-content h3').text(fileName);
        $('#document-name').text(`Namn: ${fileName}`);
        $('#document-created').text(`Skapad: ${fileCreated}`);
        $('#document-info').show();
    });


    $('#upload-button').click(function () {

        $('#upload-popup').show();
    });

    $('#cancel-upload').click(function () {

        $('#upload-popup').hide();
    });

    $('#delete-document').click(function () {

        $.ajax({
            url: '/Document/DeleteDocumentFromDatabase',
            type: 'POST',
            data: {
                documentId: selectedFile,
                documentPath: selectedPath
            },
            success: function () {
                alert('Dokumentet har tagits bort.');
                $('#upload-popup').hide();
                $('.doc-file[data-document-id="' + selectedFile + '"]').remove();
            },
            error: function (xhr, status, error) {
                alert('Ett fel uppstod: ' + error);
            }
        });

    });

});