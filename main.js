        var startButton = document.getElementsByClassName('start-quiz__button')[0];
        var footer = document.getElementsByClassName('footer')[0];
        var questions = document.getElementsByClassName('questions')[0];
        var areYouReady = document.getElementsByClassName('start-quiz__header')[0];
        var textBubble = document.getElementsByClassName('main-header__text-bubble')[0];
        var finishButton = document.getElementsByClassName('finish-quiz__button')[0];
        var countdownTime = document.getElementsByClassName('start-quiz__countdownTime')[0];
        var intervalId;
        var distance;
        var userAnswers = [];

        function bindStartButton() {
            startButton.addEventListener('click', function() {
                startButton.classList.toggle('hide');
                footer.classList.toggle('footer--active');
                questions.classList.toggle('visible');
                areYouReady.classList.toggle('hide');
                textBubble.classList.toggle('hide');
                finishButton.classList.toggle('visible');
                countdownTime.classList.toggle('start-quiz__countdownTime--active');

                initCountdown();
            });
        }
        bindStartButton();

        function initCountdown() {
            var addedTime = new Date(new Date().getTime() + 180000).getTime();
            var now = new Date().getTime();
            distance = addedTime - now;
            var minutes = Math.floor(distance / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementsByClassName('start-quiz__countdownTime--active')[0].innerHTML = minutes + 'm ' + seconds + 's ';

            intervalId = setInterval(function() {
                distance -= 1000;
                var minutes = Math.floor(distance / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementsByClassName('start-quiz__countdownTime--active')[0].innerHTML = minutes + 'm ' + seconds + 's ';

                if (distance < 0) {
                    clearInterval(intervalId);
                    document.getElementsByClassName('start-quiz__countdownTime--active')[0].innerHTML = 'Odliczanie czasu zakończone'
                    validateQuiz(data);
                }
            }, 1000);
        }

        function createDiv(name, innerHTMLString, parentDiv) {
            var childDiv = document.createElement('div');
            childDiv.className += name;
            childDiv.innerHTML += innerHTMLString;
            parentDiv.appendChild(childDiv);
            return childDiv;
        }

        function renderQuiz(data) {
            var letters = "ABCD";

            for (let i = 0; i < data.questions.length; i++) {

                var questionAnswer = document.getElementsByClassName('questions__answers')[0];
                var quiz = createDiv('questions__question', i + 1 + '. ' + data.questions[i].question, questionAnswer);

                for (let j = 0; j < data.questions[i].answers.length; j++) {

                    var buttonAnswer = createDiv('questions__button-answer', '', quiz);
                    var button = createDiv('sg-button-secondary sg-button-secondary--small sg-button-secondary--dark-inverse questions__button', letters[j], buttonAnswer);

                    button.addEventListener('click', function(event) {
                        if (typeof(userAnswers[i]) === 'number' || distance < 0) {
                            return;
                        } else {
                            event.target.classList.toggle('questions__button--check');
                            userAnswers[i] = j;
                        }
                    });
                    var answer = createDiv('questions__answer', data.questions[i].answers[j].answer, buttonAnswer);
                }
            }
        }

        function bindFinishButton(data) {
            finishButton.addEventListener('click', function(event) {
                validateQuiz(data);
            })
        }

        function validateQuiz(data) {
            var goodAnswers = 0;
            var badAnswers = 0;
            for (let i = 0; i < data.questions.length; i++) {

                if (typeof(data.questions[i].answers[userAnswers[i]]) !== 'undefined' && data.questions[i].answers[userAnswers[i]].correct) {
                    goodAnswers++;
                } else {
                    badAnswers++;
                    if (typeof(data.questions[i].answers[userAnswers[i]]) !== 'undefined') {

                        var wrongAnswer = document.querySelector('.questions__question:nth-of-type(' + (i + 1) + ')' + ' .questions__button-answer:nth-of-type(' + (userAnswers[i] + 1) + ')' + ' .questions__button');
                        wrongAnswer.className += ' questions__button--wrong';
                    }
                }
            }

            finishButton.classList.toggle('hide');
            var finishQuiz = document.getElementsByClassName('finish-quiz')[0];
            var result = createDiv('result', '', finishQuiz);
            var goodResult = createDiv('result__good', 'Prawidłowe odpowiedzi:' + ' ' + goodAnswers, result);
            var badResult = createDiv('result__bad', 'Nieprawidłowe odpowiedzi:' + ' ' + badAnswers, result);

            clearInterval(intervalId);
            document.getElementsByClassName('start-quiz__countdownTime--active')[0].innerHTML = 'Test został zakończony';
        }

        fetch('https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json')
            .then(data => data.json())
            .then(function(data) {
                renderQuiz(data);
                bindFinishButton(data);
            })
