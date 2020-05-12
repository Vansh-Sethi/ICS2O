// Method for game:
// The user selects the blocks they want to use
// Check if user input is a valid english word
// If it is, update score by the length of the word

// Boolean that represents if game is on or off
game_on = false;

// When the user clicks "shake the cubes", start the game
function runGame() {

  // Take off shake cubes function so can't play 2 games at once.
  document.getElementById("gameButton").onclick = null;

  game_on = true;

  // Initalize each block in boggle grid with a random letter
  for (var i = 1; i <= 16; i++) {
    var randomLetterProduced = randomLetter();
    document.getElementById("grid" + String(i)).innerHTML = randomLetterProduced.toUpperCase();
  }

  // Initalizing the timer
  var endTime = new Date().getTime() + 120000;

  // Creating an interval function to update the timer every second
  var time = setInterval(function() {
    
    // Initalizing current time
    var now = new Date().getTime();

    // Time left
    var timeUntilEnd = endTime - now;
    var minutes = Math.floor((timeUntilEnd % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeUntilEnd % (1000 * 60)) / 1000);
    
    // If seconds is less than 10, display it differently (so it makes sense)
    if (seconds < 10) {
      document.getElementById("timerField1").value = "Time: " + minutes + ":" + "0" + seconds;
    }
    else {
      document.getElementById("timerField1").value = "Time: " + minutes + ":" + seconds;
    }

    // When the time is finished 
    if (timeUntilEnd < 0) {
      // End the game
      game_on = false;

      // Make each boggle grid empty
      for (var i = 1; i <= 16; i++) {
        document.getElementById("grid" + String(i)).innerHTML = ' ';
      }
      
      // Reset timer field
      document.getElementById("timerField1").value = "Time: 2:00";

      // To Do Create score card
      document.getElementById("scoreCard").style.display = "block";

      // Displaying the score
      totalScore = document.getElementById("timerField2").value.split(" ")[1];
      document.getElementById("scoreCard-headerText").innerHTML = "You got a total score of " + totalScore + ". Good job! Why don't you play another game ;)";
      document.getElementsByClassName("close2")[0].onclick = function() {
        document.getElementById("scoreCard").style.display = "none";
      }
      
      
      // Reset Everything Else
      document.getElementById("log").innerHTML = "Words Submitted:";
      document.getElementById("currentWord").style.borderColor = "black";
      document.getElementById("timerField2").value = "Score: 0";

      current_word = [];
      visited = [];
      can_visit = [];
      already_submitted = [];

      // Adding back play game function so can play again
      document.getElementById("gameButton").onclick = 'runGame()';

      // End this function and game
      clearInterval(time);
      
    }


  },1050 )
  // Added 50 extra milliseconds so the timer could update
  
}

// Function that returns a random letter (used in the initalizing process for blocks)
function randomLetter() {
  var letters = "abcdefghijklmnopqrstuvwxyz";
  var randNum = Math.floor(Math.random()*26);
  return letters[randNum];
}

// Initalizing all variables

// Current word tracks the letters inputted by the user
var current_word = [];
// Visited tracks if a certain grid has already been visited or not
var visited = [];
// Can visit tracks if a certain grid can be visited next depending on the current grid
var can_visit = [];
// Already submitted tracks all the words already inputted by the user
var already_submitted = [];

// Initalizing visted and can_visit variables
for (var i = 0; i < 17; i++) {
  visited.push(false);
  can_visit.push(true);
}

var current = false;
function activate(num) {
  current = true;
  mouseDown(num);
}

// When the user is done creating their word from the grid
function stop() {
  current = false;

  // Reinitalizing all blocks to be white and clickable
  for (var i = 1; i <= 16; i++) {
    document.getElementById("grid" + String(i)).style.backgroundColor = 'white';
    document.getElementById("grid" + String(i)).style.width = '7vw';
    document.getElementById("grid" + String(i)).style.height = '7vw';
  }

  // Visited and can_visit are reinitalized
  visited = []
  can_visit = []
  for (var i = 0; i < 17; i++) {
    visited.push(false);
    can_visit.push(true);
  }

  // Using the current_word array to construct the user's word
  word = '';
  for (var i = 0; i < current_word.length; i++) {
    word += current_word[i];
  }
  // word = word.toLowerCase();
  current_word = []
  
  // When the game is on
  if (game_on) {

    // If the word Was already submitted
    if (already_submitted.includes(word)) {
      document.getElementById("currentWord").style.borderColor = "yellow";

      // Adding Repeated Word to Log
      currentLog = document.getElementById("log").innerHTML;
      currentLog = currentLog.split('Words Submitted:');
      
      reconstruct = '';
      for (var i = 1; i < currentLog.length; i++) {
        reconstruct += currentLog[i];
      }

      document.getElementById("log").innerHTML = "Words Submitted:" + '<br> <span class="yellow">' + word.toUpperCase() + " (Already Submitted. +0)" + '</span>' + reconstruct;
    }

    // Word is valid and new
    else if (dictionary.includes(word) && word.length >= 3) {
      // Update the score
      var score = document.getElementById("timerField2").value;
      var score = score.split(" ");
      var score = Number(score[1]);
      score += word.length;
      document.getElementById("timerField2").value = 'Score: ' + score;

      // Border colour of current word field is green
      document.getElementById("currentWord").style.borderColor = "#04ff00";

      // Adding new word to already submitted, so can't repeat
      already_submitted.push(word);
      

      // Adding Successful Word to Log
      currentLog = document.getElementById("log").innerHTML;
      currentLog = currentLog.split('Words Submitted:');
      
      reconstruct = '';
      for (var i = 1; i < currentLog.length; i++) {
        reconstruct += currentLog[i];
      }

      document.getElementById("log").innerHTML = "Words Submitted:" + '<br> <span class="green">' + word.toUpperCase() + " (Accepted! +" + word.length + ')' + '</span>' + reconstruct;
    }

    // Two cases if word is not valid but don't want to add to log
    else if (word.length == 0) {
      var t;
    }
    
    else if (word.length < 3) {
      var t;
    }
    
    // Word is not Valid
    else if (!dictionary.includes(word)) {
      // Changing border colour of current_word field to red
      document.getElementById("currentWord").style.borderColor = "red";

      // Adding Unsuccessful Word to Log
      currentLog = document.getElementById("log").innerHTML;
      currentLog = currentLog.split('Words Submitted:');
      
      reconstruct = '';
      for (var i = 1; i < currentLog.length; i++) {
        reconstruct += currentLog[i];
      }

      document.getElementById("log").innerHTML = "Words Submitted:" + '<br> <span class="red">' + word.toUpperCase() + " (Not A Word. +0)" + '</span>' + reconstruct;
    }
  }

  // Resetting current word field
  document.getElementById("currentWord").value = 'Current Word: '
}

// When the user clicks on one of the blocks
function mouseDown(num) {

  // Resetting visited array and turning all blocks gray (will turn some white later in code)
  if (current == true && visited[num] == false && can_visit[num] == true) {
    for (var i = 1; i <= 16; i++) {
      if (visited[i] == false) {
        document.getElementById("grid" + String(i)).style.backgroundColor = "gray";
      }
    }
    
    // Resetting can visit array
    can_visit = []
    for (var i = 0; i < 17; i++) {
      can_visit.push(false);
    }


    // The choices afterwards a certain click on a block (The blocks a user can click afterwards)
    var x =[[1,2,3,4],
            [5,6,7,8],
            [9,10,11,12],
            [13,14,15,16]];
    if (num >= 1 && num <= 4) {
      var row = 0
      var column = x[0].indexOf(num);
    }
    if (num >= 5 && num <= 8) {
      var row = 1
      var column = x[1].indexOf(num);
    }
    if (num >= 9 && num <= 12) {
      var row = 2
      var column = x[2].indexOf(num);
    }
    if (num >= 13 && num <= 16) {
      var row = 3
      var column = x[3].indexOf(num);
    }
    
    z1 = row-1;
    z2 = column-1;
    if ((z1 >= 0 && z1 <= 3) && (z2 >= 0 && z2 <= 3)) {
      var top_left = x[z1][z2];
      if (!visited[top_left]) {
        can_visit[top_left] = true;
        document.getElementById("grid" + String(top_left)).style.backgroundColor = 'white';
      }
    }

    z1 = row-1;
    z2 = column;
    if ((z1 >= 0 && z1 <= 3) && (z2 >= 0 && z2 <= 3)) {
      var top = x[z1][z2];
      if (!visited[top]) {
        can_visit[top] = true;
        document.getElementById("grid" + String(top)).style.backgroundColor = 'white';
      }
    }

    z1 = row-1;
    z2 = column+1;
    if ((z1 >= 0 && z1 <= 3) && (z2 >= 0 && z2 <= 3)) {
      var top = x[z1][z2];
      if (!visited[top]) {
        can_visit[top] = true;
        document.getElementById("grid" + String(top)).style.backgroundColor = 'white';
      }
    }

    z1 = row;
    z2 = column-1;
    if ((z1 >= 0 && z1 <= 3) && (z2 >= 0 && z2 <= 3)) {
      var top = x[z1][z2];
      if (!visited[top]) {
        can_visit[top] = true;
        document.getElementById("grid" + String(top)).style.backgroundColor = 'white';
      }
    }

    z1 = row;
    z2 = column+1;
    if ((z1 >= 0 && z1 <= 3) && (z2 >= 0 && z2 <= 3)) {
      var top = x[z1][z2];
      if (!visited[top]) {
        can_visit[top] = true;
        document.getElementById("grid" + String(top)).style.backgroundColor = 'white';
      }
    }

    z1 = row+1;
    z2 = column-1;
    if ((z1 >= 0 && z1 <= 3) && (z2 >= 0 && z2 <= 3)) {
      var top = x[z1][z2];
      if (!visited[top]) {
        can_visit[top] = true;
        document.getElementById("grid" + String(top)).style.backgroundColor = 'white';
      }
    }

    z1 = row+1;
    z2 = column;
    if ((z1 >= 0 && z1 <= 3) && (z2 >= 0 && z2 <= 3)) {
      var top = x[z1][z2];
      if (!visited[top]) {
        can_visit[top] = true;
        document.getElementById("grid" + String(top)).style.backgroundColor = 'white';
      }
    }

    z1 = row+1;
    z2 = column+1;
    if ((z1 >= 0 && z1 <= 3) && (z2 >= 0 && z2 <= 3)) {
      var top = x[z1][z2];
      if (!visited[top]) {
        can_visit[top] = true;
        document.getElementById("grid" + String(top)).style.backgroundColor = 'white';
      }
    }

    var id_of_button = "grid" + String(num);
    // Adding styles the signify that the current button was already clicked
    document.getElementById(id_of_button).style.backgroundColor = 'rgba(255, 255, 255,0.35)';
    document.getElementById(id_of_button).style.width = '6.5vw';
    document.getElementById(id_of_button).style.height = '6.5vw';
    current_word.push(document.getElementById(id_of_button).innerHTML);

    // Adding the current letter to the current word field
    document.getElementById("currentWord").value += document.getElementById(id_of_button).innerHTML;

    // Making sure that it can't be visited again
    visited[num] = true;
  }
}

// Function to display the instructions div 
function showInstructions() {
  document.getElementById("instructions").style.display = 'block';
  
  // When the "x" is pressed, close the instructions
  document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById("instructions").style.display = "none";
  }
}




