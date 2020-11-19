let Start = document.querySelector('#start');
let StartBtn = document.querySelector('#startBtn');
let gameLevel = document.querySelector('#LevelControl');
let StartAgain = document.createElement('button');
let StartAgainText = document.createElement('h1');
let FinishedDiv = document.createElement('div');
let Cont = document.querySelector('#container');
let Score = 0;
let Width = parseInt(gameLevel.value[0]);
let Height = parseInt(gameLevel.value[2]);
let checkOpened = 0;
let scoreMax = 0;
let setTimer;
let Time;
let Times = { "2x2": 1, "3x4": 30, "4x4": 50 , "4x5": 80}; 

FinishedDiv.id = "finish";
StartAgainText.innerHTML = "You Won!!";
StartAgain.classList.add('btn');
StartAgain.classList.add('btn-primary');
StartAgain.classList.add('btn-lg');
StartAgain.id = 'startAgain';
StartAgain.innerHTML = 'Start Again';


StartBtn.addEventListener('click', ev => {
    Score = 0;
    Time = Times[gameLevel.value];
    startGame = new Game(gameLevel.value);
    startGame.createSpace();
    startGame.randomizeSymbols();
    startGame.createElements();
    startTime();
})


async function startTime() {
    console.log(Time)
    scoreMax = (parseInt(gameLevel.value[0]) * parseInt(gameLevel.value[2]))/2;
    let timer = document.querySelector('#timer');
    timer.style.width = '0%';

    setTimer = setInterval(progressBar, Time);

    let Elements = document.querySelectorAll('.elementDiv');
    Elements.forEach(item => {
        item.addEventListener('click', event => {
            item.firstChild.style.transform = 'rotateY(180deg)';
            item.setAttribute('display', true);
            var matches = document.querySelectorAll("div[display='true']");
            if (matches.length == 2) {
                setTimeout(function(){ 
                    rotateBack(matches); 
                }, 300);

            }
        })
    })

}


function rotateBack(elements){
    
    if(elements[0].firstChild.lastChild.innerHTML == elements[1].firstChild.lastChild.innerHTML){
        
        elements[0].classList.remove('elementDiv');
        elements[0].style.opacity = 0;
        elements[1].classList.remove('elementDiv');
        elements[1].style.opacity = 0;
        Score++;
        if(Score == scoreMax){
            console.log('win')
            let body = document.querySelector('#body');
            let removeAll = document.querySelector('#spaceDiv');
            removeAll.remove();
            let loseText = document.createElement('h1');
            let afterDiv = document.createElement('div');
            afterDiv.classList.add('afterDiv');
            afterDiv.id = 'afterDiv';
            loseText.innerHTML = 'You Won!';
            afterDiv.appendChild(loseText);
            afterDiv.appendChild(StartAgain);
            body.appendChild(afterDiv);
            clearInterval(setTimer);

        }
    };
    
    elements.forEach(element => {
        element.setAttribute('display',false);
        element.firstChild.style.transform = 'rotateY(360deg)';
    });
}



function progressBar() {
    let timer = document.querySelector('#timer');
    timer.style.width = parseFloat(timer.style.width.slice(0, timer.style.width.length - 1)) + 0.1 + '%';
    if (timer.style.width == '100%') {
        clearInterval(setTimer);
        let removeAll = document.querySelector('#spaceDiv');
        removeAll.remove();
        let body = document.querySelector('#body');
        let loseText = document.createElement('h1');
        let afterDiv = document.createElement('div');
        afterDiv.classList.add('afterDiv');
        afterDiv.id = 'afterDiv';
        loseText.innerHTML = 'You Lost';
        afterDiv.appendChild(loseText);
        afterDiv.appendChild(StartAgain);
        body.appendChild(afterDiv);
    }

}




window.addEventListener('resize', ev => {
    Width = parseInt(gameLevel.value[0]);
    Height = parseInt(gameLevel.value[2]);
    let Elements = document.querySelectorAll('.elementDiv');
    let SpaceDiv = document.querySelector('#spaceDiv');
    SpaceDiv.style.width = window.innerWidth + 'px';
    SpaceDiv.style.height = window.innerHeight + 'px';


    Elements.forEach(element => {
        element.style.width = window.innerWidth / Width + 'px';
        element.style.height = window.innerHeight / Height + 'px';
    });
});


StartAgain.addEventListener('click', ev => {
    let removeLoser = document.querySelector('#afterDiv');
    removeLoser.remove();
    let body = document.querySelector('#body');
    let cont = document.createElement('container');
    cont.classList.add('container');
    cont.id = 'container';
    cont.appendChild(Start);
    body.appendChild(cont)
})




function sleep(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}