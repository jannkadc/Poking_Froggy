const holes = [...document.querySelectorAll('.hole')];
const mole = document.querySelector('.mole');
const countdownEl = document.querySelector('#countdown');
const scoreEl = document.querySelector('#score');
const gameOverEl = document.getElementById("gameOver");
const startBtn = document.querySelector('.startBtn')


let score = 0;
let miss = 0;
let maxMissLimit = 3;
let gameDuration = 15; //seconds
let missTimerInterval = null;
let countdownInterval = null;
let gameRunning = false;
let pokePosition;



//Starting the game
function startGame() {
    initializeGameTimer();
    gameRunning = true;
    startBtn.style.display = 'none';
    gameOverEl.style.display = 'none';
    showFroggyInterval = setInterval(showFroggy, getShowInterval())
    console.log(getShowInterval()) 
}

//Initializing game timer
function initializeGameTimer() {
    countdownInterval = setInterval( ()=>{
        scoreEl.style.display = 'block';
        countdownEl.style.display = 'block';
        countdownEl.innerHTML = `Time Left : ${gameDuration}`;
        gameDuration--;
        if(gameDuration == 0){
            endGame();
            return;
        }
    }, 1000)
}

//Showing Froggy at random holes
function showFroggy() {
    if(gameRunning) {

        if(miss === maxMissLimit){
            endGame();
            return;
        }

        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        randomHole.classList.add('mole');

        pokePosition = randomHole.id

        setTimeout( ()=>{
            randomHole.classList.remove('mole')
        }, 500);
        missTimerInterval = setTimeout( ()=>{
            miss++;
        }, 500)

    }
}

//Showing Froggy based on scores earned
function getShowInterval() {
    if(score >= 0 && score <= 5) {
        return 1000;
    } else if(score >= 6 && score <= 10) {
        return 700;
    } else {
        return 500;
    }
}

//Ending the game and clearing variables
function endGame() {
    clearInterval(countdownInterval);
    clearInterval(showFroggyInterval);
    countdownEl.style.display = 'none';
    scoreEl.style.display = 'none'
    gameOverEl.style.display = 'block';
    gameOverEl.innerHTML = `Game Over. Your Score is ${score}`;
    score = 0;
    miss = 0;
    gameDuration = 15;
    startBtn.style.display = 'block'
}

//Score is accumulated when hole with Froggy is poked
holes.forEach(hole =>{
    hole.addEventListener('click', ()=>{
        if(hole.id == pokePosition){
            console.log(hole.id);
            console.log(pokePosition)
            score++;
            scoreEl.innerHTML = `Score : ${score}`;
        } else {
            miss++;
        }
    })
})
 







   

