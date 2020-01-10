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

 var tName;
 var dest;
 var freq = 0;
 var mAway = 0;
 var trainOne = 0;
 var nextTrain = 0;

  $("#addBtn").on("click", function(event) {
    event.preventDefault();
  
    tName = $("#inputTrain").val().trim();
    dest = $("#destTrain").val().trim();
    trainOne = $("#oneInput").val().trim();
    freq = $("#frequency").val().trim();
  
    database.ref().push({
      tName: tName,
      dest: dest,
      trainOne: trainOne,
      freq: freq,
      nextTrain: nextTrain,
    });

    tName = $("#inputTrain").val("");
    dest = $("destTrain").val("");
    trainOne = $("#oneInput").val("");
    freq = $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var firstTrainConv = moment(childSnapshot.val().trainOne, "hh:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(firstTrainConv), "minutes");
    var timeRemain = timeDifference % childSnapshot.val().freq;
    var mAway = childSnapshot.val().freq - timeRemain;
    var nextTrain = moment().add(mAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    var firebaseName = childSnapshot.val().tName;
    var firebaseDest = childSnapshot.val().dest;
    var firebaseFreq = childSnapshot.val().freq;

    // user input janx
    $("#tTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDest + "</td><td>" + firebaseFreq + "</td><td>" + nextTrain + "</td><td>" + mAway + "</td></tr>");
  
  }, function(errorObj){
    console.log("errors handled: " + errorObj.code);
  });