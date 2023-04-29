var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

nextSequence(); // Call nextSequence() when the page is initially loaded


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}






// function for playing sound based on color selected by random number
// function playSound(name) {
//     switch (name) {
//         case 'green':
//             var green = new Audio('./sounds/green.mp3');
//             green.play();
//             break;
//         case 'blue':
//             var blue = new Audio('./sounds/blue.mp3');
//             blue.play();
//             break;
//         case 'red':
//             var red = new Audio('./sounds/red.mp3');
//             red.play();
//             break;
//         case 'yellow':
//             var yellow = new Audio('./sounds/yellow.mp3');
//             yellow.play();
//             break;
//         default:
//             var wrong = new Audio('./sounds/wrong.mp3');
//             wrong.play();
//             break;
//     }
// }

// var audio = new Audio('sounds/'+randomChosenColour+'.mp3');
// audio.play();

// $("#"+randomChosenColour).on("click", function() {
//     var audio = new Audio('sounds/'+randomChosenColour+'.mp3');
//     audio.play();
// })
