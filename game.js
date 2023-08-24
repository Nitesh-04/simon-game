var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userclicked = [];

var level=0;
var start=false;

setTimeout(function()
{
    var a = $.Event("keypress");
    a.which = 91;
    $(document).trigger(a);
},1000);

$(document).keypress(function() {
    if (!start) 
    {
      $("#level-title").text("Level " + level);
      nextSequence();
      start = true;
    }
    
});


$(".btn").click(function()
{
    var userChose = $(this).attr("id");
    userclicked.push(userChose);
    playSound(userChose);
    animatePress(userChose);
    var len = userclicked.length;
    checkAnswer(userclicked.length-1);
});

function checkAnswer (currlevel)
{
    if (gamePattern[currlevel] === userclicked[currlevel])
    {
        if (userclicked.length === gamePattern.length)
        {
            setTimeout(function () 
            {
                nextSequence();
            }, 1000);

        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Refresh Page");
        startOver();
    }
}
 

function nextSequence()
{
    userclicked=[];
    level++;

    $("#level-title").text("Level "+level);
    
    var rnum = Math.floor(Math.random() * 4);
    var rcolor = buttonColours[rnum];
    gamePattern.push(rcolor);
    $("#" + rcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(rcolor);
    
}

function playSound(name)
{
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function animatePress(currcolor)
{
    $("#" + currcolor).addClass("pressed");

    setTimeout(function()
    {
        $("#"+currcolor).removeClass("pressed");
    },100);
}

function startOver()
{
    level=0;
    gamePattern=[];
    start = false;
}

