document.addEventListener('DOMContentLoaded', function () {

    $('.doc-folder-content').on('click', '.doc-file', function () {

        var filePath = $(this).data('file-path');
        var fileName = $(this).data('document-name');

        $('#document-viewer').attr('src', filePath);
        $('#document-content h3').text(fileName);
    });
});