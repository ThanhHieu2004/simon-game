var buttonColours = ["red", "blue", "green", "yellow"];
var playPatterns = []  // 0-green , 1-red, 2-yellow, 3-blue
var userPatterns = [];
var endOfGame = true;
var userChoice = 0;
var level = playPatterns.length;
var started = false;

function playAudio(audio){
    var audio = new Audio('sounds/' + audio + '.mp3');
    audio.play();
}

$('.btn').click(function(){
    var userChoice = $(this).attr('id');
    userPatterns.push(userChoice);
    buttonPressedEffect(userChoice);
    checkUserChoice(userPatterns.length - 1);
})

function nextSequence(){
    userPatterns.length = 0; // Reset user patterns
    $("#level-title").text('Level ' + level);
    level++;
    var color = buttonColours[Math.floor(Math.random()*4)];
    playPatterns.push(color);
    $('#' + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(color);
}

function startTheGame(){
    nextSequence();
}

$(document).keypress(function() {
    if (!started) {
        startTheGame();
        started = true;
    }
  });

function buttonPressedEffect(color){
    $('#' + color).addClass('pressed');
    playAudio(color);
    setTimeout(function(){
        $('#' + color).removeClass('pressed')
    }, 200);
}

function checkUserChoice(index){
    if (playPatterns[index] == userPatterns[index]){
        if (playPatterns.length == userPatterns.length){
            setTimeout(nextSequence(), 1000);
        }
    } else {
        console.log(playPatterns[index]);
        console.log(userPatterns[index]);
        playAudio('wrong');
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          
        playAgain();
    }
}

function playAgain(){
    started = false;
    userPatterns.length = 0;
    playPatterns.length = 0;
    level = 0;
}