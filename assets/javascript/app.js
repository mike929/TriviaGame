//Declare Quiz Questions variables
var question0 = 
{
    question: "Mercedes-benz originates from what country?",
    answer: "Germany",
    choices: ["Canada", "Spain", "Turkey", "Germany"],
    correctAnswer: 3,
    correctGif: "assets/images/german_giphy.gif"
};

var question1 = 
{
    question: "What Japanese car manufacture made the first dedicated luxury brand?",
    answer: "Honda",
    choices: ["Toyota", "Honda", "Sabaru", "Nissan"],
    correctAnswer: 1,
    correctGif: "assets/images/honda_giphy.gif"
};

var question2 = 
{
    question: "What is the first dedicated Japanese luxury brand called?",
    answer: "Acura",
    choices: ["Infinity", "Lexus", "Acura", "Hyundai"],
    correctAnswer: 2,
    correctGif: "assets/images/acura_giphy.gif"
};

var question3 = 
{
    question: "In 1991 Japan produced how any vehicles to become the largest producer in the world?",
    answer: "9.7 million",
    choices: ["9.7 million", "2.5 million", "10 million", "1 million"],
    correctAnswer: 0,
    correctGif: "assets/images/japan_giphy.gif"
};

var question4 = 
{
    question: "What manufacture's brand is The Ultimate Driving Machines?",
    answer: "BMW",
    choices: ["BMW", "Audi", "Mercedes-Benz", "Toyota"],
    correctAnswer: 0,
    correctGif: "assets/images/bmw_giphy.gif"
};

var question5 = 
{
    question: "What does BMW stand for?",
    answer: "Bavarian Motor Works",
    choices: ["Bold Magnificent Works", "Bavarian Motor Works", "Beautiful Motor Works", "Basic Math Works"],
    correctAnswer: 1,
    correctGif: "assets/images/bmw_giphy.gif"
};


var question6 = 
    {
        question: "Which company is the 2nd largest family owned company in the world?",
        answer: "Ford",
        choices: ["BMW", "Honda", "Dodge", "Ford"],
        correctAnswer: 3,
        correctGif: "assets/images/ford_giphy.gif"
    };


//Array of questions
var QuestionsArray = [question0, question1, question2, question3, question4, question5, question6];

var indexQuestion = 0;


//Game scores
var gameScores = 
{
answeredCorrect: 0,
answeredWrong: 0,
missed: 0
};

function resetVariables() 
{
console.log("resetVariables function reached");
gameScores.answeredCorrect = 0;
gameScores.answeredWrong = 0;
gameScores.missed = 0;
indexQuestion = 0;

$("#score").html("");
$("#reset").hide();
}

//move to next question function

function nextQuestion()
{
indexQuestion++;

if (indexQuestion < QuestionsArray.length)
{
    displayQuestion();
    $('#quizMessage').hide();
    $('#timerDisplay').show();
    $('.btn').show();
    timer.stop();
    timer.reset();
    timer.start();
}

//Display score when game ends
else
{
    $('#quizMessage').hide();
    $('#question').hide();
    $("#score").html("<div>"+ "Game Over! <br> Your Score" +"</div>"+
    "<div>"+ "Correct Guesses: " + gameScores.answeredCorrect +"</div>" + 
    "<div>"+ "Wrong Guesses: " + gameScores.answeredWrong +"</div>" +
    "<div>"+ "Missed Questions: " + gameScores.missed +"</div>" 
    );

    audio = new Audio("assets/Kids Cheering.mp3");
        audio.play();

    timer.stop();
    $('#timerDisplay').html('00:00');

    $("#reset").show();

    $('.resetme').click(function()
    {
        $('#quizMessage').hide();
        resetVariables();
        displayQuestion();
        $('#question').show();
        $('.btn').show();
        $('#timerDisplay').show();
        timer.stop();
        timer.reset();
        timer.start();

    });
    
}


}
//Timer Countdown 

var timer = 
{
time:10,

reset: function()
{
    timer.time = 10;
    
    //change the "display" div to "00:05"
    $('#timerDisplay').html('Timer: ' + '00:10');

},

start: function()
{
    //Use setInterval to start the count here
    counter = setInterval(timer.count, 1000);
},

stop: function()
{
    //Use clearInterval to stop the count here
    clearInterval(counter);
},

 count: function()
{   //increment time by 1, remember we can't use "this" here
    timer.time--;
     //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable
    var converted = timer.timeConverter(timer.time);
     //Use the variable you just created to show the converted time in the "display" div
    $('#timerDisplay').html('Timer: ' + converted);

    if (timer.time == 0)
    {
        //Display correct answer if timer runs out and question is missed
        $('#quizMessage').show(); //show the correct gif div
        $('#timerDisplay').hide();
        $('.btn').hide();
        $('#quizMessage').html("<h2><p>Time's up! <br> The correct answer was: <br>" + QuestionsArray[indexQuestion].answer + "</p></h2>");
        gameScores.missed++;
        audio = new Audio("assets/Price-is-right-losing-horn.mp3");
        audio.play();

        setTimeout(nextQuestion, 3000);
    }

},

 timeConverter: function(t)
{ //This function takes the current time in seconds and converts it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t/60);
    var seconds = t - (minutes * 60);
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    if (minutes === 0){
        minutes = "00";
    } else if (minutes < 10){
        minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
}

};

//Display Question

function displayQuestion()
{
    $("#question").html("<h3>" + QuestionsArray[indexQuestion].question + "</h3>");
    $("#button0").text(QuestionsArray[indexQuestion].choices[0]);
    $("#button1").text(QuestionsArray[indexQuestion].choices[1]);
    $("#button2").text(QuestionsArray[indexQuestion].choices[2]);
    $("#button3").text(QuestionsArray[indexQuestion].choices[3]);


}
//Start game on button press


$(document).ready(function()


{	//hide all until start button is pressed
$('#timerDisplay').hide();
$('.btn').hide();
$("#reset").hide();

$('#startme').on("click", function() 

    {
        displayQuestion();
        timer.reset();
        timer.start();
        //show timer and buttons
        $('#timerDisplay').show();
        $('.btn').show();
        $("#reset").hide();
        $("#startme").hide();
    });



//User input check answer
$('.btn').click(function() 
{


if (indexQuestion < QuestionsArray.length)
{
    var userButtonValue = ($(this).attr("data-value"));
    console.log(userButtonValue);
    //Check for win
    if (userButtonValue == QuestionsArray[indexQuestion].correctAnswer)
    {
        
        $('#quizMessage').html("<h2><p>Correct!</p></h2><img src='" + QuestionsArray[indexQuestion].correctGif + "' height = 200 width = 350 alt='correct'>");
        gameScores.answeredCorrect ++;//increment score
        console.log("correct answer " + gameScores.answeredCorrect);
        audio = new Audio("assets/City Car Horn.mp3");
        audio.play();
        
        //reset timer
        timer.stop();
        timer.reset();						
    

    }
    //Else loss
    else
    {
    
        $('#quizMessage').html("<h2><p><b>Wrong! <br> The correct answer was: <br>" + QuestionsArray[indexQuestion].answer + "</b></p></h2>");
        gameScores.answeredWrong ++;
        console.log("wrong answer " + gameScores.answeredWrong);
        audio = new Audio("assets/Aww Sympathy.mp3");
        audio.play();

        //reset timer
        timer.stop();
        timer.reset();	


    }

    $('#quizMessage').show(); //show the correct gif div
    $('#timerDisplay').hide();
    $('.btn').hide();

    setTimeout(nextQuestion, 3000);
    
}
});




// end document.ready function
});