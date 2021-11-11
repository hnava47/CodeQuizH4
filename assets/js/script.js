var rootEl = $('#root');
var titleEl = $('#title');
var descEl = $('#desc');
var btnEl = $('#start-button');
var timEl = $('#timer');
var valEl = $('#validation');
var quesNum = 1;
var secondsLeft = 75;

valEl.hide();

const questions = {
    1: 'Commonly used data types DO NOT include:',
    2: 'The condition in an if/else statement is enclosed within ____.',
    3: 'Arrays in JavaScript can be used to store ____.',
    4: 'String value must be enclosed with ____ when being assigned to variables.'
};

const options = {
    1: ['strings', 'booleans', 'alerts', 'numbers'],
    2: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    3: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    4: ['commas', 'curly brackets', 'quotes', 'parentheses']
};

const answers = {1: 3, 2: 3, 3: 4};

function setTime() {
    timEl.text('Time: ' + secondsLeft);
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timEl.text('Time: ' + secondsLeft);

        if (secondsLeft === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}

btnEl.on('click', function() {
    rootEl.css({
        'text-align': 'left'
    });

    btnEl.remove();
    descEl.remove();

    titleEl.text(questions[quesNum]);
    for (var i = 0; i < options[quesNum].length; i++) {
        var currentOpt = $('<li>');
        var buttonOpt = $('<button>');

        buttonOpt.text([i+1+'.', options[quesNum][i]].join(' '))
            .addClass('btn-child')
            .attr('id', i+1);


        currentOpt.append(buttonOpt);
        rootEl.append(currentOpt);
    }
    setTime();
});

$(document).on('click', '.btn-child', function(){
    if (this.id === answers[quesNum]) {
        valEl.text('Correct!');
    } else {
        valEl.text('Wrong!');
    }

    quesNum++;
    liValues = rootEl.children();

    titleEl.text(questions[quesNum]);
    for (var i = 1; i < liValues.length; i++) {
        var liEl = $('#'+i);

        liEl.text([i+'.', options[quesNum][i-1]].join(' '));
    }
    valEl.show();
    setTimeout(function() {
        valEl.fadeOut();
    }, 1000);
});
