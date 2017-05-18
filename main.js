var startButton = document.getElementsByClassName('start-quiz__button')[0];
var footer = document.getElementsByClassName('footer')[0];
var questions = document.getElementsByClassName('questions')[0];
var areYouReady = document.getElementsByClassName('start-quiz__header')[0];
var textBubble = document.getElementsByClassName('main-header__text-bubble')[0];
var finishButton = document.getElementsByClassName('finish-quiz__button')[0];


startButton.addEventListener('click', function() {
  startButton.classList.toggle('start-quiz__button--disappear');
  footer.classList.toggle('footer--active');
  questions.classList.toggle('questions--active');
  areYouReady.classList.toggle('start-quiz__header--active');
  textBubble.classList.toggle('main-header__text-bubble--active');
  finishButton.classList.toggle('finish-quiz__button--active');
});

fetch('https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json')
  .then(data => data.json())
  .then(function(data){
    // console.log(data)
    var letters = "ABCD";
    var isChosen = [];

    for (let i=0; i < data.questions.length; i++) {
      // console.log(data.questions[i]);
      var questionAnswer = document.getElementsByClassName('questions__answers')[0];
      var quiz = document.createElement('div');
      questionAnswer.appendChild(quiz);
      quiz.className += 'questions__question';
      quiz.innerHTML += data.questions[i].question;


      for (let j=0; j < data.questions[i].answers.length; j++) {
        // console.log(data.questions[i].answers[j]);

        var buttonAnswer = document.createElement('div');
        quiz.appendChild(buttonAnswer);
        buttonAnswer.className += "questions__button-answer";

        var button = document.createElement('button');
        buttonAnswer.appendChild(button);
        button.className += 'sg-button-secondary sg-button-secondary--small sg-button-secondary--dark-inverse questions__button';
        button.innerHTML += letters[j];
        button.addEventListener('click', function(event){
          if (isChosen[i]) {
            return;
          } else {
          event.target.classList.toggle('questions__button--check');
          isChosen[i] = j;
        }
        });

        var answer = document.createElement('div');
        buttonAnswer.appendChild(answer);
        answer.className += 'questions__answer';
        answer.innerHTML += data.questions[i].answers[j].answer;
      }
    }
    finishButton.addEventListener('click', function(event){
      var goodAnswers = 0;
      var badAnswers = 0;
      for (let i = 0; i < data.questions.length; i++) {

        if (typeof(data.questions[i].answers[isChosen[i]]) !== 'undefined'  &&  data.questions[i].answers[isChosen[i]].correct) {
          goodAnswers++;
        } else {
          badAnswers++;
          if (typeof(data.questions[i].answers[isChosen[i]]) !== 'undefined'){

            var wrongAnswer = document.querySelector('.questions__question:nth-of-type(' + (i+1) + ')' + ' .questions__button-answer:nth-of-type(' + (isChosen[i] +1) + ')' + ' .questions__button') ;
            console.log(wrongAnswer);
            console.log(i);
            console.log(isChosen[i]);
            wrongAnswer.className += ' questions__button--wrong';
          }
        }
      }
      finishButton.classList.toggle('finish-quiz__button--disappear');
      var finishQuiz = document.getElementsByClassName('finish-quiz')[0];
      var result = document.createElement('div');
      finishQuiz.appendChild(result);
      result.className += 'result'
      var goodResult =  document.createElement('div');
      var badResult =  document.createElement('div');
      result.appendChild(goodResult);
      result.appendChild(badResult);
      goodResult.className += 'result__good';
      badResult.className += 'result__bad';
      goodResult.innerHTML += 'Prawidłowe odpowiedzi:' + ' ' + goodAnswers;
      badResult.innerHTML += 'Nieprawidłowe odpowiedzi:' + ' ' + badAnswers;

    })

  })
