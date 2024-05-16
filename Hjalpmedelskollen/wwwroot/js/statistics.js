document.addEventListener('DOMContentLoaded', function () {

    var canvas = document.getElementById('myPieChart');
    var totalAidsCount = parseInt(canvas.getAttribute('data-aids-count'));
    var aidsWithPatientCount = parseInt(canvas.getAttribute('data-aids-patient-count'));
    var aidsWithoutPatientCount = totalAidsCount - aidsWithPatientCount;

    var blue = '#81a7e6';
    var orange = '#fcb56f';

    var ctx = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Lediga', 'Upptagna'],
            datasets: [{
                data: [aidsWithoutPatientCount, aidsWithPatientCount],
                backgroundColor: [orange, blue]
            }]
        },
        options: {
        }
    });
});