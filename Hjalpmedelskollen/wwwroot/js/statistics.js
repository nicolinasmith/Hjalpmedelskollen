var ctx = document.getElementById('myPieChart').getContext('2d');

var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Lediga', 'Upptagna'],
        datasets: [{
            data: [40, 60],
            backgroundColor: ['green', 'red']
        }]
    },
    options: {

    }
});