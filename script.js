const holes = [...document.querySelectorAll('.hole')];
const mole = document.querySelector('.mole');
const countdownEl = document.querySelector('#countdown');
const scoreEl = document.querySelector('#score');
const gameOverEl = document.getElementById("gameOver");
const startBtn = document.querySelector('.startBtn')


let score = 0;
let miss = 0;
let maxMissLimit = 5;
let gameDuration = 15; //seconds
let countdownInterval = null;
let gameRunning = false;
let pokePosition;
let missTimer = null;

function startGame() {
    initializeGameTimer();
    gameRunning = true;
    startBtn.style.display = 'none';
    gameOverEl.style.display = 'none';
    showFroggyInterval = setInterval(showFroggy, getShowInterval()) 
}

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

function getShowInterval() {
    if(score >= 0 && score <= 5) {
        return 1000;
    } else if(score >= 6 && score <= 10) {
        return 700;
    } else {
        return 500;
    }
}


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

    }
}


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
 







   

