var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userclicked = [];

var level=0;
var start=false;

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
        console.log("success");
    
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
        console.log("wrong");
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
    var audio = new Audio("sounds/" + name + ".mp3");
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


