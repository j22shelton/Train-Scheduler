$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyCk-q3qWnAwXeF5AxHv-B2TGvgOC6MTuKg",
        authDomain: "train-67c09.firebaseapp.com",
        databaseURL: "https://train-67c09.firebaseio.com",
        projectId: "train-67c09",
        storageBucket: "train-67c09.appspot.com",
        messagingSenderId: "365073443011"
      };

      firebase.initializeApp(config);

      var database = firebase.database();

      $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var timeFirstTrain = $("#firstTrain-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();
      
        var newTrain = {
            name: trainName,
            destintion: trainDestination,
            firstTrain: timeFirstTrain,
            frequency: trainFrequency,
          };

          database.ref().push(newTrain);

          $("#name-input").val("");
          $("#destination-input").val("");
          $("#firstTrain-input").val("");
          $("#frequency-input").val("");
        });
            
        database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val());

            var trainName = childSnapshot.val().name;
            var trainDestination = childSnapshot.val().destination;
            var timeFirstTrain = childSnapshot.val().firstTrain;
            var trainFrequency = childSnapshot.val().frequency;
      });
}