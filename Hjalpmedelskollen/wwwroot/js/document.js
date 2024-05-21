document.addEventListener('DOMContentLoaded', function () {

    const folders = document.querySelectorAll('.doc-folder');

    folders.forEach(folder => {
        folder.addEventListener('click', function () {
            // Hämta det associerade doc-folder-content elementet
            const content = folder.nextElementSibling;

            if (content && content.classList.contains('doc-folder-content')) {
                // Toggla 'active' klass på den klickade mappen
                folder.classList.toggle('active');

                // Toggla visningen av innehållet
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            }
        });
    });


    var selectedFile = null;
    var selectedPath = null;

    $('.doc-folder-content').on('click', '.doc-file', function () {

        var filePath = $(this).data('file-path');
        var fileName = $(this).data('document-name');
        selectedFile = $(this).data('document-id');
        selectedPath = filePath;
        var fileCreatedTimestamp = $(this).data('document-created');
        var fileCreatedDate = new Date(fileCreatedTimestamp);

        $('#document-viewer').attr('src', filePath);
        $('#document-content h3').text(fileName);
        $('#document-name').text(`Namn: ${fileName}`);
        $('#document-created').text(`Skapad: ${getCorrectDate(fileCreatedDate)}`);
        $('#document-info').show();
    });

    function getCorrectDate(date) {
        var day = date.getDate();
        var month = date.getMonth()
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }


    $('#upload-button').click(function () {

        $('#upload-popup').show();
    });

    $('#cancel-upload').click(function () {

        $('#upload-popup').hide();
    });

    $('#delete-document').click(function () {

        if (confirm('Är du säker på att du vill ta bort dokumentet?')) {

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
                    $('#document-viewer').attr('src', '');
                    $('#document-content h3').text('Välj ett dokument för att visa innehållet.');
                    $('#document-info').hide();

                },
                error: function (xhr, status, error) {
                    alert('Ett fel uppstod: ' + error);
                }
            });
        }
    });
});