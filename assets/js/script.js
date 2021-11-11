var rootEl = $('#root');
var titleEl = $('#title');
var descEl = $('#desc');
var btnEl = $('#start-button');

const questions = {
    1: 'Commonly used data types DO NOT include:',
    2: 'The condition in an if/else statement is enclosed within ____',
}

const options = {
    1: ['strings', 'booleans', 'alerts', 'numbers'],
    2: ['quotes', 'curly brackets', 'parentheses', 'square brackets']
}

const answers = [3]

btnEl.on('click', function() {
    quesNum = 1;

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
    quesNum++;
});

$(document).on('click', '.btn-child', function(){
    liValues = rootEl.children();

    for (var i = 1; i < liValues.length; i++) {
        var liEl = $('#'+i)

        liEl.text([i+'.', options[quesNum][i-1]].join(' '));
    }
});
