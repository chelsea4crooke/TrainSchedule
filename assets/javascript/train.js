const firebaseConfig = {
    apiKey: "AIzaSyBFQfMBWbB8OGr18CWF0l_QCE7iMDoRRtk",
    authDomain: "train-times-1711f.firebaseapp.com",
    databaseURL: "https://train-times-1711f.firebaseio.com",
    projectId: "train-times-1711f",
    storageBucket: "",
    messagingSenderId: "436673306852",
    appId: "1:436673306852:web:14c34decc8c94ced3accf1"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

 
 var database = firebase.database();

 var trainName;
 var destination;
 var frequency = 0;
 var minutesAway = 0;
 var firstTrain = 0;
 var nextArrival = 0;

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
  
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      nextArrival: nextArrival,
    });

    trainName = $("#train-name-input").val("");
    destination = $("destination-input").val("");
    firstTrain = $("#first-train-input").val("");
    frequency = $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var firstTrainConv = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(firstTrainConv), "minutes");
    var timeRemain = timeDifference % childSnapshot.val().frequency;
    var minutesAway = childSnapshot.val().frequency - timeRemain;
    var nextArrival = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextArrival).format("hh:mm");
    var firebaseName = childSnapshot.val().trainName;
    var firebaseDest = childSnapshot.val().destination;
    var firebaseFreq = childSnapshot.val().frequency;

    // user input janx
    $("#train-table > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDest + "</td><td>" + firebaseFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  
  }, function(errorObj){
    console.log("errors handled: " + errorObj.code);
  });