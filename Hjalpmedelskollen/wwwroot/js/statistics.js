var ctx = document.getElementById('myPieChart').getContext('2d');

// Skapa cirkeldiagrammet med Chart.js
var myPieChart = new Chart(ctx, {
    type: 'pie', // Typ av diagram är cirkeldiagram
    data: {
        labels: ['Red', 'Blue', 'Yellow'], // Etiketter för varje del av cirkeldiagrammet
        datasets: [{
            data: [10, 20, 30], // Datavärden för varje del av cirkeldiagrammet
            backgroundColor: ['red', 'blue', 'yellow'] // Färger för varje del av cirkeldiagrammet
        }]
    },
    options: {
        // Ytterligare alternativ och anpassningar kan läggas till här
    }
});