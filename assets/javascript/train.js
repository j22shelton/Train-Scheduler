$(document).ready(function(){

 //initialize firebase

    var config = {
        apiKey: "AIzaSyCk-q3qWnAwXeF5AxHv-B2TGvgOC6MTuKg",
        authDomain: "train-67c09.firebaseapp.com",
        databaseURL: "https://train-67c09.firebaseio.com",
        projectId: "train-67c09",
        storageBucket: "train-67c09.appspot.com",
        messagingSenderId: "365073443011"
      };
      
      firebase.initializeApp(config);

      //variable to reference database//

    var dataRef = firebase.database();

    //activate submit button//

    $("#submit-btn").on("click", function(event) {
        
        //prevents refresh//

        event.preventDefault();

        //stores information//

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();

        //clear items//

        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

        //uploads data//

        dataRef.ref().push({
            trainName: trainName,
            destination: destination,
            time: firstTrain,
            frequency: frequency
        });
    });

    //connects with firebase//

    dataRef.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        //new variables of info from firebase//

        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var time = childSnapshot.val().time;
        var key = childSnapshot.key;

        //time calculations//

        var firstConverted = moment(time, "hh:mm").subtract(1, "years");
        console.log(firstConverted);

        //compare time to current time//

        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));


        $("#currentTime").html("Current Time: " + moment(currentTime).format("hh:mm"));

        //take difference from train start time to current time//

        var timeDiff = moment().diff(moment(firstConverted), "minutes");
        console.log("Difference In Time: " + timeDiff);

        //divided by train frequency, then converted to whole number//

        var timeRem = timeDiff % frequency;
        console.log(timeRem);

        //caluculate minutes to next train//

        var nextTrainMin = frequency - timeRem;
        console.log("Minutes Till Train: " + nextTrainMin);


        var nextTrainAdd = moment().add(nextTrainMin, "minutes");
        var nextTrainArr = moment(nextTrainAdd).format("hh:mm");
        console.log("Arrival Time: " + nextTrainArr);

        //add info submitted by user//

        $("#schedule").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainArr + "</td><td>" + nextTrainMin + "</td></tr>");



        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // update text
        $("#trainName").html(snapshot.val().name);
        $("#destination").html(snapshot.val().destination);
        $("#frequency").html(snapshot.val().frequency);
        $("#time").html(snapshot.val().time);
    });
    //report error//
    }, function(err) {
        console.log(err);
    });
 

});
