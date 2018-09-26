var finalScores,diceNumber,activePlayer,isPlaying,prevDice,winScore,diceSum;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){

    if(isPlaying) {
		
        document.querySelector('.dice').style.display = 'block';
        diceNumber = Math.floor(Math.random()*6 + 1);

        if(diceNumber === 6 && prevDice === 6) {
            finalScores[activePlayer] = 0;
            changePlayer();

        } else if (diceNumber !== 1) {
            document.querySelector('.dice').src = 'dice-'+ diceNumber+'.png';
            document.getElementById('current-'+ activePlayer).textContent = diceNumber;
            diceSum += diceNumber; //diceSum : sum which added to the final score if diceNumber != 1

        } else { //===1
            changePlayer();
        }
        console.log('curDice: '+ diceNumber);
        console.log('prevDice: '+ prevDice);
        prevDice = diceNumber;
    }
});

document.querySelector('.btn-hold').addEventListener('click',function() {

    winScore = document.querySelector('.win-score').value; //value is string type
    var winValue;
    if(isPlaying) { 

        finalScores[activePlayer] += diceSum;
        
        document.getElementById('score-'+ activePlayer).textContent = finalScores[activePlayer];

        //Winner
        if(winScore) {  //type coresion (truthy : not 0,undefined,null,'')
            winValue = winScore;
        } else { //false
            winValue = 100;
        }
        
        if(finalScores[activePlayer] >= winValue) {
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.getElementById('name-'+ activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-'+ activePlayer+'-panel').classList.remove('active');
            isPlaying = false //stop playing
    
        } else {
            changePlayer();
        }
    } 
});

document.querySelector('.btn-new').addEventListener('click',init);

function changePlayer() {
    diceNumber = 0;
    diceSum = 0;
    document.getElementById('current-'+ activePlayer).textContent = '0';
    document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');


    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;

    document.querySelector('.player-'+ activePlayer+'-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}

function init() {
    finalScores = [0,0];
    diceNumber = 0;
    activePlayer = 0; //palyer1 by default
    isPlaying = true;
    prevDice = 0;
    winScore = 0;
    diceSum = 0;



    document.getElementById('score-0').textContent = finalScores[0];
    document.getElementById('score-1').textContent = finalScores[1];
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.win-score').value = '';
}