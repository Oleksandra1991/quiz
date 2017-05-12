var startButton = document.getElementById('startButton');
var footer = document.getElementsByClassName('footer')[0];
var questions = document.getElementsByClassName('questions')[0];
var areYouReady = document.getElementsByClassName('are-you-ready')[0];
var textBubble = document.getElementsByClassName('text-bubble')[0];
var finishButton = document.getElementById('finishButton');


startButton.addEventListener('click', function() {
  startButton.classList.toggle('start-button-disappear');
  footer.classList.toggle('footer--active');
  questions.classList.toggle('questions--active');
  areYouReady.classList.toggle('are-you-ready--active');
  textBubble.classList.toggle('text-bubble--active');
  finishButton.classList.toggle('button-finish--active');
});

fetch('https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json')
  .then(data => data.json())
  .then(function(data){
    console.log(data)
    var letters = "ABCD";

    for (i=0; i < data.questions.length; i++) {
      console.log(data.questions[i]);
      var questionAnswer = document.getElementById('question-answer');
      var quiz = document.createElement('div');
      questionAnswer.appendChild(quiz);
      quiz.className += 'question-answer__question';
      quiz.innerHTML += data.questions[i].question;
      for (j=0; j < data.questions[i].answers.length; j++) {
        console.log(data.questions[i].answers[j]);

        var buttonAnswer = document.createElement('div');
        quiz.appendChild(buttonAnswer);
        buttonAnswer.className += "button-answer";

        var button = document.createElement('button');
        buttonAnswer.appendChild(button);
        button.className += 'sg-button-secondary sg-button-secondary--small sg-button-secondary--dark-inverse question-answer__button';
        button.innerHTML += letters[j];

        var answer = document.createElement('div');
        buttonAnswer.appendChild(answer);
        answer.className += 'question-answer__answer';
        answer.innerHTML += data.questions[i].answers[j].answer;
      }
    }
  })
