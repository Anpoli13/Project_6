var qwerty = document.getElementById('qwerty');
var phrase = document.getElementById('phrase');
var missed = 0;
var letterFound = null;
var startGame = document.querySelector('.btn__reset');
var overlay = document.querySelector('#overlay');
var overlayTitle = document.querySelector('#overlay h2');

var phrases = [
    'The best of both worlds',
    'Once in a blue moon',
    'A piece of cake',
    'Let the cat out of the bag',
    'Kill two birds with one stone',
];

startGame.addEventListener('click', ()=> {
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray (arr){
    var secretPhrase = Math.floor(Math.random() * arr.length);
    
    return arr[secretPhrase].split('');
}

const phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
    var lis = document.querySelector('#phrase ul');
    
    for(let i=0; i<arr.length; i+=1){
        var li = document.createElement('li');
        li.textContent = arr[i];
        
        if (arr[i]!==' '){
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        
        lis.appendChild(li);
    }
    
    return lis;
}

addPhraseToDisplay(phraseArray);

var phraseLetters = document.querySelectorAll('.letter');


function checkLetter(button){
    for(let i = 0; i<phraseLetters.length; i+=1){
        var phraseLetter = phraseLetters[i];
        
        if(phraseLetter.textContent.toLowerCase() === button){
            phraseLetter.classList.add('show');
            letterFound = true;
        }
    }
    
    return letterFound;
}


qwerty.addEventListener('click', (e)=>{
   var clickButton = e.target;
   
    if (clickButton.tagName === 'BUTTON'){
        clickButton.className = 'chosen';
        clickButton.setAttribute('disabled', true);
        
        checkLetter(clickButton.textContent);
        
        if (letterFound === null){
            var ol = document.querySelector('ol');
            var liveHeart = ol.firstElementChild;
            ol.removeChild(liveHeart);
            missed += 1;
        } 
        letterFound = null;
    }
    
    checkWin();
 });

function checkWin() {
    var shownPhraseLetters = document.querySelectorAll('.show');
    
    if (phraseLetters.length === shownPhraseLetters.length){
        overlay.style.display = '';
        overlay.className = 'win';
        overlayTitle.textContent = 'Congratulations! You win:)';
        startGame.textContent = 'Start again';
    } else if (missed >= 5){
        overlay.style.display = '';
        overlay.className = 'lose';
        overlayTitle.textContent = 'Sorry, but you lost:(';
        startGame.textContent = 'Start again'
        startGame.textContent = 'Try again';
    }

    startGame.addEventListener('click', ()=> {
        location.reload();
    });
}
