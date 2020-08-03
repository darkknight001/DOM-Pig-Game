/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variable Declaration
var scores, roundScore, activePlayer, gamePlaying;

init();


// Roll Die Button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        console.log('rolled the dice')
        // We need a random Number
        var dice = Math.floor(Math.random() * 6) + 1;

        // Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice +'.png';

        //Update Round score 
        if(dice !== 1){
            // Add score
            roundScore += dice;
            document.getElementById('current-'+activePlayer).textContent = roundScore;

        } else{
            // Next Player
            nextPlayer();
        }
    }
    
})

// Hold score button
document.querySelector('.btn-hold').addEventListener('click', function () {
    
    if (gamePlaying) {
        // Update Global Score
        scores[activePlayer] += roundScore;
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

        

        // Check if Winner 
        if (scores[activePlayer]>=100) {
            document.getElementById('name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying =false;
        } else { 
            // Change Player
            nextPlayer();
        }
    }
    
})

// Game Initialization Event
document.querySelector('.btn-new').addEventListener('click', init)

function init () {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    // Initialize Scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}


// Switch to next Player
function nextPlayer() {
    // Next Player
    roundScore = 0;
    document.getElementById('current-'+activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';
}





// console.log(dice);
// dice = Math.random()

// To manupulate text inside the DOM Object
// document.querySelector('#current-' + activePlayer).textContent = dice;

// To put HTML Tag inside DOM object
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'</em>';
