var rootEl = $('#root');
var titleEl = $('#title');
var descEl = $('#desc');
var btnEl = $('#start-button');
var btnChildEl = $('.btn-child');

const questions = {
    1: 'Commonly used data types DO NOT include:',
    2: 'The condition in an if/else statement is enclosed within ____',
    3: '',
    4: '',
    5: ''
}

const options = {
    1: ['strings', 'booleans', 'alerts', 'numbers'],
    2: ['quotes', 'curly brackets', 'paranthesis', 'square brackets']
}

const answers = [3]

btnEl.on('click', function() {
    var quesNum = 1;

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

    console.log(this.id);

    quesNum++;
});

btnChildEl.on('click', function() {
    
});
