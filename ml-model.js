//<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>

// Create the TensorFlow.js model
const model = tf.sequential();

// Add layers to the model
model.add(tf.layers.dense({inputShape: [inputFeatures], units: 128, activation: 'relu'}));
model.add(tf.layers.dense({units: 64, activation: 'relu'}));
model.add(tf.layers.dense({units: 32, activation: 'relu'}));

// Output layer: Predict for the remaining semesters
model.add(tf.layers.dense({units: remainingSemesters}));

// Compile the model
model.compile({
  optimizer: 'adam',
  loss: 'meanSquaredError',
  metrics: ['mae']
});

// Function to preprocess data (GPA, subject grades, and credits)
function preprocessData(data) {
  const inputData = [];
  data.semesters.forEach(semester => {
    // Add GPA first
    let semesterData = [semester.gpa];
    
    // If subject details (grades and credits) are available, include them
    if (semester.subjects) {
      semester.subjects.forEach(subject => {
        semesterData.push(subject.grade);
        semesterData.push(subject.credit);
      });
    } else {
      // If no subjects, add placeholder values (e.g., 0 for grade and credit)
      semesterData.push(0, 0);  // Or omit these if you want only GPA
    }

    inputData.push(semesterData);
  });

  return tf.tensor2d(inputData);  // Convert the array into a tensor
}

// Function to train the model
async function trainModel(trainData, trainLabels) {
  const processedTrainData = preprocessData(trainData);
  const processedTrainLabels = tf.tensor2d(trainLabels);

  // Train the model
  await model.fit(processedTrainData, processedTrainLabels, {
    epochs: 100,  // Adjust number of epochs as needed
    batchSize: 16,
    validationSplit: 0.2
  });
}

// Function to predict future GPA based on provided data
function predictFutureGPA(semesters) {
  const processedInput = preprocessData({ semesters });

  // Make predictions
  const predictions = model.predict(processedInput);
  return predictions.dataSync();  // Return the predicted GPAs for the remaining semesters
}

// Example: Input with GPA and subject data for 3 semesters
const inputSemesters = [
  {
    "semester": 1,
    "gpa": 3.5,
    "subjects": [
      {"subject": "Math", "credit": 4, "grade": 9},
      {"subject": "Physics", "credit": 3, "grade": 8}
      // Remaining subjects can be added or omitted
    ]
  },
  {
    "semester": 2,
    "gpa": 3.8,
    "subjects": null  // No subject details available for Semester 2
  },
  {
    "semester": 3,
    "gpa": 4.0,
    "subjects": [
      {"subject": "Math", "credit": 4, "grade": 10},
      {"subject": "Physics", "credit": 3, "grade": 9},
      {"subject": "Chemistry", "credit": 4, "grade": 9}
    ]
  }
];

// Example labels: Future GPA (for semesters 4 to 8)
const futureGPAs = [
  [3.9, 4.0, 3.8, 3.7, 3.9]  // Example of future semester GPAs
];

// Train the model
trainModel(inputSemesters, futureGPAs).then(() => {
  // After training, make predictions
  const predictions = predictFutureGPA(inputSemesters);
  console.log("Predicted future GPAs:", predictions);
});
