$(document).ready(function() {
    const $navEl = $('#nav-bar');
    const $rootEl = $('#root');
    const $timEl = $('#timer');
    const $valEl = $('#validation');
    const $headEl = $('<h1>');
    const $parEl = $('<p>');
    const $divEl = $('<div>');
    const $initials = $('<p>');
    const $input = $('<input>');
    const $subBtn = $('<button>');
    const $hsClear = $('<button>');
    const $goBack = $('<button>');
    let quesNum = 1;
    const valTime = 700;
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    homePage();

    const $titleEl = $('#title');
    const $descEl = $('#desc');
    const $btnEl = $('#start-button');

    const questions = {
        1: 'Commonly used data types DO NOT include:',
        2: 'The condition in an if/else statement is enclosed within ____.',
        3: 'Arrays in JavaScript can be used to store ____.',
        4: 'String value must be enclosed with ____ when being assigned to variables.',
        5: 'A very useful tool during development and debugging for printing content to the debugger is:'
    };

    const options = {
        1: ['strings', 'booleans', 'alerts', 'numbers'],
        2: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        3: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        4: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        5: ['javascript', 'terminal/bash', 'for loops', 'console.log']
    };

    const answers = {
        1: 3,
        2: 3,
        3: 4,
        4: 3,
        5: 4
    };

    function homePage() {
        $navEl.show();
        $timEl.text('Time: 0');
        $rootEl.children().remove();

        $headEl.text('Coding Quiz Challenge')
            .attr('id', 'title');

        $parEl.text('Try to answer the following coding questions within the time limit. Keep in mind that incorrect answers will penalize your score time by ten seconds!')
            .attr('id', 'desc');

        $subBtn.text('Start Quiz')
            .addClass('btn')
            .attr('id', 'start-button');

        $rootEl.append($headEl, $parEl, $subBtn)
            .css('text-align', 'center');
    }

    function viewHighScores() {
        $navEl.hide();

        $rootEl.children().remove();
        $divEl.children().remove();

        $headEl.text('High Scores')
            .attr('id', 'title');

        $divEl.css({
            'background-color': '#D7A1F9',
            'color': 'black'
        });

        for (var i = 0; i < highScores.length; i++) {
            $scoreList = $('<h4>');
            $scoreList.text((i + 1) + '. ' + highScores[i]['initials'] + ' - ' + highScores[i]['score'])
                .css('padding-left', '10px');
            $divEl.append($scoreList);
        }

        $goBack.text('Go Back')
            .addClass('btn')
            .attr('id', 'go-back')
            .css('margin-right', '5px');

        $hsClear.text('Clear High Scores')
            .addClass('btn')
            .attr('id', 'clear');

        $rootEl.append($headEl, $divEl, $goBack, $hsClear)
            .css('text-align', 'left');
    }

    function setTime(secondsLeft) {
        $timEl.text('Time: ' + secondsLeft);
        timeInterval = setInterval(function() {
            secondsLeft--;
            $timEl.text('Time: ' + secondsLeft);
            secs = secondsLeft;

            if (secondsLeft === 0) {
                clearInterval(timeInterval);
                $valEl.text('Times Up!');
                quizComplete();
            }
        }, 1000);
    }

    function quizComplete() {
        clearInterval(timeInterval);

        $valEl.show();
        setTimeout(function() {
            $valEl.fadeOut();
        }, valTime);

        const $formEl = $('<form>');

        $titleEl.text('All Done!');
        $divEl.remove();
        $('li').remove();

        $parEl.text('Your final score is ' + secs)
            .attr('id', 'score');

        $initials.text('Enter your initials:')
            .css('display', 'inline-block');

        $input.attr('id', 'ent-initials')
            .css({
                'margin': '0 5px',
                'border-color': 'inherit'
            });

        $subBtn.text('Submit')
            .addClass('btn')
            .attr('id', 'sub-button');

        $formEl.append($initials, $input, $subBtn)
            .css({
                'background-color': 'white',
                'color': 'black'
            })
            .attr('id', 'initial-submit');

        $rootEl.append($parEl, $formEl);
    };

    $(document).on('click', '#clear', function() {
        localStorage.removeItem('highScores');
        highScores = [];
        $divEl.children().remove();
    });

    $(document).on('click', '#go-back', function() {
        homePage();
    });

    $(document).on('click', '#high-score', function() {
        viewHighScores();
    });

    $(document).on('click', '#start-button',function() {
        quesNum = 1;
        $rootEl.css('text-align', 'left');

        $btnEl.remove();
        $descEl.remove();

        $titleEl.text(questions[quesNum]);
        for (var i = 0; i < options[quesNum].length; i++) {
            var $currentOpt = $('<li>');
            var $buttonOpt = $('<button>');

            $buttonOpt.text([i+1+'.', options[quesNum][i]].join(' '))
                .addClass('btn-child')
                .attr('id', i+1);


            $currentOpt.append($buttonOpt);
            $rootEl.append($currentOpt);
        }
        secs = 75;
        setTime(secs);
    });

    $(document).on('click', '.btn-child', function(){
        $valEl.hide();
        if (quesNum < Object.keys(questions).length) {
            if (parseInt(this.id) === answers[quesNum]) {
                $valEl.text('Correct!');
            } else {
                $valEl.text('Wrong!');
                clearInterval(timeInterval);
                setTime(secs-10);
            }

            $valEl.show();
            setTimeout(function() {
                $valEl.fadeOut();
            }, valTime);

            quesNum++;
            $liValues = $rootEl.children();

            $titleEl.text(questions[quesNum]);
            for (var i = 1; i < $liValues.length; i++) {
                var $liEl = $('#'+i);

                $liEl.text([i+'.', options[quesNum][i-1]].join(' '));
            }
        } else {
            if (parseInt(this.id) === answers[quesNum]) {
                $valEl.text('Correct!');
            } else {
                $valEl.text('Wrong!');
                secs -= 10;
                $timEl.text('Time: ' + secs);
            }

            quizComplete();
        }
    });

    $(document).on('submit', '#initial-submit',function(event) {
        event.preventDefault();

        if ($('#ent-initials').val().trim() === '') {
            $input.css('border-color', 'red');
            alert('Must enter initials!')
        } else {
            let userScore = {
                initials: $('#ent-initials').val(),
                score: secs
            };

            highScores.push(userScore);
            highScores.sort((a, b) => b.score - a.score);

            localStorage.setItem('highScores', JSON.stringify(highScores));

            viewHighScores();
        }
    });
});
