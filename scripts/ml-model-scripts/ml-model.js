let model_sems=[];
let model_cgpa=[];
let model_gpa=[];
let model_min_cgpa=0;
let model_max_cgpa=10;

function model_cpg_generator(predict_gpa, input_gpa) {
    document.querySelector(".loader-container").style.visibility = "hidden";
    let inputGPAArray = input_gpa.map(element => parseFloat(element).toFixed(3));
    let predictGPAArray = predict_gpa.map(element => parseFloat(element).toFixed(3));
    
    model_gpa = [...inputGPAArray.map(Number), ...predictGPAArray.map(Number)];

    model_sems = model_gpa.map((_, index) => `sem-${index + 1}`);
    
    let total_gpa = 0;
    model_cgpa = model_gpa.map((gpa, index) => {
        total_gpa += gpa;
        return parseFloat(((total_gpa / ((index + 1) * 10)) * 10).toFixed(3));
    });

    
    model_min_cgpa = Math.min(...model_cgpa, ...model_gpa) - 0.5;
    model_max_cgpa = Math.max(...model_cgpa, ...model_gpa) + 0.5;
    if(model_max_cgpa>10){
        model_max_cgpa=10;
    }
}



let myChart;  // Declare a global variable to store the chart instance

function graph_generator() {
    const ctx = document.getElementById('myChart_1').getContext('2d');
    
    // Destroy the previous chart instance if it exists
    if (myChart) {
        myChart.destroy();
    }

    // Create a new chart instance with updated data
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: model_sems,
            datasets: [
                {
                    label: 'GPA',
                    data: model_gpa,
                   backgroundColor: 'rgba(255, 206, 86, 0.2)', 
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'CGPA',
                    data: model_cgpa,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'
                    },
                    beginAtZero: false,
                    min: model_min_cgpa,
                    max: model_max_cgpa
                }
            }
        }
    });
}


function normalizeData(data) {
    return data.map(value => value / 10);
  }

  // Denormalize function to scale data back to [0, 10]
  function denormalizeData(data) {
    return data.map(value => value * 10);
  }

  // Build a simple neural network model with dynamic input size
  function createModel(inputShape, outputShape) {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [inputShape], units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
    model.add(tf.layers.dense({ units: outputShape, activation: 'sigmoid' }));  // Sigmoid for output

    model.compile({
      optimizer: tf.train.adam(),
      loss: 'meanSquaredError'
    });

    return model;
  }

  // Train the model
async function trainModel(model, inputTensor, outputTensor) {
    return await model.fit(inputTensor, outputTensor, {
      epochs: 100,
      shuffle: true,
      validationSplit: 0.2,
      
    });
  }

  // Event listener for the "Predict" button
document.getElementById("predict_button").addEventListener("click", async function() {
    document.querySelector(".loader-container").style.visibility = "visible";
    let inputGPA = [];
    cpg_storages.forEach(element => {
        inputGPA.push(parseFloat(element.gpa));
    });
    // Ensure the input GPA is for 1 to 7 semesters
    if (inputGPA.length > 0 && inputGPA.length <= 7) {
        let gpaData;

        // Choose the correct dataset based on the input length
        switch (inputGPA.length) {
            case 1:
                gpaData = data_set_sem_1;
                break;
            case 2:
                gpaData = data_set_sem_2;
                break;
            case 3:
                gpaData = data_set_sem_3;
                break;
            case 4:
                gpaData = data_set_sem_4;
                break;
            case 5:
                gpaData = data_set_sem_5;
                break;
            case 6:
                gpaData = data_set_sem_6;
                break;
            case 7:
                gpaData = data_set_sem_7;
                break;
            default:
                alert("Invalid number of semesters.");
                return;
        }

        // Normalize the input and output data
        const normalizedInputs = gpaData.map(d => normalizeData(d.input));
        const normalizedOutputs = gpaData.map(d => normalizeData(d.output));

        // Convert data to TensorFlow tensors
        const inputTensor = tf.tensor2d(normalizedInputs);
        const outputTensor = tf.tensor2d(normalizedOutputs);

        // Output shape is the number of semesters you're predicting (8 - n)
        const outputShape = 8 - inputGPA.length;

        // Build and train the model
        const model = createModel(inputGPA.length, outputShape);
        
        await trainModel(model, inputTensor, outputTensor);
       

        // Use the model to predict the GPA for remaining semesters based on the input
        const normalizedInputGPA = normalizeData(inputGPA);  // Normalize the input
        const testGPA = tf.tensor2d([normalizedInputGPA]);  // Convert to tensor

        const prediction = model.predict(testGPA).mul(10);  // Multiply the prediction by 10 to denormalize

        // Get the prediction as a regular array
        prediction.array().then(array => {
            
            // Call the model_cpg_generator function after prediction is ready
            model_cpg_generator(array[0], inputGPA);
            // Once prediction is done and model data is updated, generate the graph
            document.getElementById("marksChart_1").style.visibility = 'visible';
            graph_generator();
        });
    } else {
        alert("Please enter a valid number of semesters (between 1 and 7).");
    }
});

document.getElementById("chart_return_button_1").addEventListener('click', () => {
    // Check if there is an existing chart to destroy
    if (myChart) {
        myChart.destroy();
        myChart = null;  // Reset the chart variable after destroying it
    }
    document.getElementById("marksChart_1").style.visibility = 'hidden';
});