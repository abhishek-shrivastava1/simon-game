var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level;
var started = false;

function newSequence() {
    userClickedPattern = [];
    var randomChoosenColor = buttonColors[Math.floor(Math.random() * 4)];
    // var randomChoosenColor = newSequence();
    gamePattern.push(randomChoosenColor);

    animateButton(randomChoosenColor);
    playSound(randomChoosenColor);
    level++;
    $("h1").html("Level " + level);
}

function animateButton(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
}

function animatePress(color, animateClass) {
    $("#" + color).addClass(animateClass);
    setTimeout(function() {
        $("#" + color).removeClass(animateClass);
    }, 100)
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                newSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        animatePress("body", "game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        playSound("wrong");
        $("h1").html("Game Over, Press Any Key to Restart");
        started = false;
        startOver();
    }
}

$(".btn").click(function() {
    var userChoosenColor = $(this).attr('id');
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor, "pressed");
    checkAnswer(userClickedPattern.length - 1);

})

$(document).keydown(function(event) {
    if (!started) {
        $("h1").html("Press A Key to Start");
        level = 0;
        newSequence();
        // level = 1;
        started = true;
    }
})

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}