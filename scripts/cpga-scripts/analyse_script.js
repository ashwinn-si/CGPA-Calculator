let analyse_sems = [];
let analyse_cgpa = [];
let analyse_gpa = [];
let analyse_min_cgpa = 0;
let analyse_max_cgpa = 10;

let analyse_myChart;

function required_data_generator() {
    let count = 1;
    analyse_sems = [];
    analyse_cgpa = [];
    analyse_gpa = [];
    cpg_storages.forEach(element => {
        analyse_gpa.push(parseFloat(element.gpa));
        analyse_sems.push(`sem-${count}`);
        count++;
    });
    let total_gpa = 0;
    for (let i = 0; i < count - 1; i++) {
        total_gpa += analyse_gpa[i];
        analyse_cgpa.push(parseFloat(((total_gpa / ((i + 1) * 10)) * 10).toFixed(3)));
    }
    analyse_min_cgpa = Math.min(...analyse_cgpa, ...analyse_gpa) - 1;
    analyse_max_cgpa = Math.max(...analyse_cgpa, ...analyse_gpa) + 1;
    if(analyse_max_cgpa>10){
        analyse_max_cgpa=10;
    }
}

function analyse_graph_generator() {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Destroy the previous chart if it exists
    if (analyse_myChart) {
        analyse_myChart.destroy();
    }

    // Create a new chart
    analyse_myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: analyse_sems,
            datasets: [{
                label: 'GPA',
                data: analyse_gpa,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'CGPA',
                data: analyse_cgpa,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff'  // Bright white color for the x-axis labels
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'  // Bright white color for the y-axis labels
                    },
                    beginAtZero: false,
                    min: analyse_min_cgpa,
                    max: analyse_max_cgpa
                }
            }
        }
    });
}

document.getElementById("analyse_button").addEventListener('click', () => {
    document.getElementById("marksChart").style.visibility = 'visible';
    required_data_generator();
    analyse_graph_generator();
});

document.getElementById("chart_return_button").addEventListener('click', () => {
    document.getElementById("marksChart").style.visibility = 'hidden';
});
