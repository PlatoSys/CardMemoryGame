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
let Times = { "2x2": 4, "3x4": 25, "4x4": 30 , "4x5": 40}; 

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
            var audio = new Audio("CardFlip.mp3");
            audio.play();

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
        var audio = new Audio("Discard.mp3");
        audio.play();
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



class Game {
    #randomSymbols = [];
    #randomNumbers = [];
    #displayedSymbols = [];
    #innerWidth = window.innerWidth;
    #innerHeight = window.innerHeight - 40;

    constructor(dimension){
        this.width = parseInt(dimension[0]);
        this.height = parseInt(dimension[2]);
    }
    
    randomizeSymbols(){
        const symbols = ['<i class="fab fa-steam-symbol fa-10x">',
                        '<i class="fas fa-radiation-alt fa-10x"></i>',
                        '<i class="fab fa-apple fa-10x"></i>',
                        '<i class="fas fa-bell fa-10x"></i>',
                        '<i class="fas fa-archive fa-10x"></i>',
                        '<i class="fas fa-cut fa-10x"></i>',
                        '<i class="fas fa-photo-video fa-8x"></i>',
                        '<i class="fas fa-comment fa-10x"></i>',
                        '<i class="fas fa-skull-crossbones fa-10x"></i>',
                        '<i class="fas fa-star fa-10x"></i>']
        const needed = (this.width * this.height) / 2;
        let RandomSymbols = symbols.filter(symbol => symbols.indexOf(symbol) < needed);
        let RandomNumbers = new Set();
        for (let i = 0; i < 10000; i++) {   
            RandomNumbers.add(((Math.floor(Math.random() * 10))+(Math.floor(Math.random() * 10))+(Math.floor(Math.random() * 10)))%(needed*2));
            if(RandomNumbers.size == needed *2){
                break;
            }
        }
        RandomNumbers = Array.from(RandomNumbers);
        RandomSymbols.forEach(element => {
            this.#randomSymbols.push(element);
        });

        let Index = 0;
        for (let i = 0; i < needed * 2; i+=2) {
            this.#displayedSymbols[RandomNumbers[i]] = this.#randomSymbols[Index];
            this.#displayedSymbols[RandomNumbers[i+1]] = this.#randomSymbols[Index];
            Index++;

        }


    }
    
    
    createSpace(){
        let spaceDiv = document.createElement('div');
        spaceDiv.classList.add('spaceDiv');
        spaceDiv.id = 'spaceDiv';
        spaceDiv.style.width = this.#innerWidth + 'px';
        spaceDiv.style.height = this.#innerHeight + 40 + 'px';
        spaceDiv.style.backgroundColor = '#89ABE3FF';
        spaceDiv.style.display = 'flex';
        spaceDiv.style.justifyContent = 'center';
        spaceDiv.style.flexWrap = 'wrap';
        let removeStart = document.querySelector('#start');
        let Container = document.querySelector('#container');
        let Body = document.querySelector('#body');
        removeStart.remove();
        container.remove();
        Body.appendChild(spaceDiv);
    }


    createElements(){
        let spaceAppender = document.querySelector('#spaceDiv')
        for (let i = 0; i < this.width * this.height; i++) {
            // ElementDiv.innerHTML = this.#displayedSymbols[i];
            let element = document.createElement('div');
            let inner = document.createElement('div');
            let front = document.createElement('div');
            let back = document.createElement('div');
            element.classList.add('elementDiv');
            element.classList.add('flip-card');
            element.style.width = innerWidth/this.width+'px';
            element.style.height = innerHeight/this.height + 'px';
            element.style.borderStyle = 'solid';
            element.style.borderColor = '#89ABE3FF';
            element.style.borderWidth = '3px';
            element.setAttribute('display', false);
            inner.classList.add('flip-card-inner');
            front.classList.add('flip-card-front');
            back.classList.add('flip-card-back');

            
            back.innerHTML = this.#displayedSymbols[i];

            inner.appendChild(front);
            inner.appendChild(back);
            element.appendChild(inner);
            spaceAppender.appendChild(element);
        }
    }


}

