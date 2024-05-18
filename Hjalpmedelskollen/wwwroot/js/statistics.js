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


    var secondCanvas = document.getElementById('myPieChart-units');
    var aidsByUnitData = JSON.parse(secondCanvas.getAttribute('data-aidsbyunit-count'));
    var unitNames = aidsByUnitData.map(function (item) { return item.name; });
    var unitCounts = aidsByUnitData.map(function (item) { return item.count; });


    var ctx = document.getElementById('myPieChart-units').getContext('2d');
    var myPieChartTwo = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: unitNames,
            datasets: [{
                data: unitCounts,
                backgroundColor: [blue, orange, '#4caf50', '#ffeb3b', '#ff5722', '#9c27b0', '#00bcd4']
            }]
        },
        options: {

        }
    });
});