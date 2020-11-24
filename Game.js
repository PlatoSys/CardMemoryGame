// class Game {
//     #randomSymbols = [];
//     #randomNumbers = [];
//     #displayedSymbols = [];
//     #innerWidth = window.innerWidth;
//     #innerHeight = window.innerHeight - 40;

//     constructor(dimension){
//         this.width = parseInt(dimension[0]);
//         this.height = parseInt(dimension[2]);
//     }
    
//     randomizeSymbols(){
//         const symbols = ['<i class="fab fa-steam-symbol fa-10x">',
//                         '<i class="fas fa-radiation-alt fa-10x"></i>',
//                         '<i class="fab fa-apple fa-10x"></i>',
//                         '<i class="fas fa-bell fa-10x"></i>',
//                         '<i class="fas fa-archive fa-10x"></i>',
//                         '<i class="fas fa-cut fa-10x"></i>',
//                         '<i class="fas fa-photo-video fa-8x"></i>',
//                         '<i class="fas fa-comment fa-10x"></i>',
//                         '<i class="fas fa-skull-crossbones fa-10x"></i>',
//                         '<i class="fas fa-star fa-10x"></i>']
//         const needed = (this.width * this.height) / 2;
//         let RandomSymbols = symbols.filter(symbol => symbols.indexOf(symbol) < needed);
//         let RandomNumbers = new Set();
//         for (let i = 0; i < 10000; i++) {   
//             RandomNumbers.add(((Math.floor(Math.random() * 10))+(Math.floor(Math.random() * 10))+(Math.floor(Math.random() * 10)))%(needed*2));
//             if(RandomNumbers.size == needed *2){
//                 break;
//             }
//         }
//         RandomNumbers = Array.from(RandomNumbers);
//         RandomSymbols.forEach(element => {
//             this.#randomSymbols.push(element);
//         });

//         let Index = 0;
//         for (let i = 0; i < needed * 2; i+=2) {
//             this.#displayedSymbols[RandomNumbers[i]] = this.#randomSymbols[Index];
//             this.#displayedSymbols[RandomNumbers[i+1]] = this.#randomSymbols[Index];
//             Index++;

//         }


//     }
    
    
//     createSpace(){
//         let spaceDiv = document.createElement('div');
//         spaceDiv.classList.add('spaceDiv');
//         spaceDiv.id = 'spaceDiv';
//         spaceDiv.style.width = this.#innerWidth + 'px';
//         spaceDiv.style.height = this.#innerHeight + 40 + 'px';
//         spaceDiv.style.backgroundColor = '#89ABE3FF';
//         spaceDiv.style.display = 'flex';
//         spaceDiv.style.justifyContent = 'center';
//         spaceDiv.style.flexWrap = 'wrap';
//         let removeStart = document.querySelector('#start');
//         let Container = document.querySelector('#container');
//         let Body = document.querySelector('#body');
//         removeStart.remove();
//         container.remove();
//         Body.appendChild(spaceDiv);
//     }


//     createElements(){
//         let spaceAppender = document.querySelector('#spaceDiv')
//         for (let i = 0; i < this.width * this.height; i++) {
//             // ElementDiv.innerHTML = this.#displayedSymbols[i];
//             let element = document.createElement('div');
//             let inner = document.createElement('div');
//             let front = document.createElement('div');
//             let back = document.createElement('div');
//             element.classList.add('elementDiv');
//             element.classList.add('flip-card');
//             element.style.width = innerWidth/this.width+'px';
//             element.style.height = innerHeight/this.height + 'px';
//             element.style.borderStyle = 'solid';
//             element.style.borderColor = '#89ABE3FF';
//             element.style.borderWidth = '3px';
//             element.setAttribute('display', false);
//             inner.classList.add('flip-card-inner');
//             front.classList.add('flip-card-front');
//             back.classList.add('flip-card-back');

            
//             back.innerHTML = this.#displayedSymbols[i];

//             inner.appendChild(front);
//             inner.appendChild(back);
//             element.appendChild(inner);
//             spaceAppender.appendChild(element);
//         }
//     }


// }

