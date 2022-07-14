// prendo l'elemento principale che rappresenta la griglia
const gridDom = document.getElementById('grid');

//genero una costante per salvare il numero di bombe totali che poi richiamo nella funzione createBombe
const bombeTotali = 16;

//genero una costante per il button genera
const genera = document.getElementById('genera');
//creo un evento che al click
//richiamo la funzione creaGriglia con valori diversi
//se l'elemento con id "difficoltà" è su easy darà 100 quadratini
//se invece l'elemento con id "difficoltà" è su medium darà 81 quadratini
//se invece l'elemento con id "difficoltà" è su hard darà 49 quadratini
genera.addEventListener('click', 
    function(){
        
        if(document.getElementById('difficoltà').value == 'easy'){
            creaGriglia(100, 'easy');
        }else if(document.getElementById('difficoltà').value == 'medium'){
            creaGriglia(81, 'medium');
        }else if (document.getElementById('difficoltà').value == 'hard'){
            creaGriglia(49, 'hard');
        }
        
        
    }
);

// creo un singolo quadrato con al suo interno i numeri da 1 a quadratini(in base alla scelta varia)
// richiamo la mia funzione createGridSquare
// aggiungo l'evento click e i suoi effetti
// aggiungo il tutto alla griglia
function creaGriglia(quadratini, livello){
    gridDom.innerHTML = '';
    gridDom.classList.remove('game-over');
    for(let i = 1; i <= quadratini; i++){

        const currentElement = createGridSquare(i, livello);
        currentElement.id = 'square-' + (i);

        currentElement.addEventListener('click', 
            function() {
                this.classList.toggle('clicked');
                console.log(currentElement.textContent);
            }
        );
            gridDom.append(currentElement);
    }
    const bombPosition = createBombe(quadratini);
    addClickToSquares(bombPosition);
    console.log(bombPosition);
}

//creo un elemento del dom di tipo div con classe square
function createGridSquare(number, livello){

    const currentElement = document.createElement('div');
    currentElement.classList.add('square');
    currentElement.classList.add(livello);
    currentElement.append(number);
    
    return currentElement;
        
}

//creo un evento che al click elimina il gioco per poter iniziare una nuova partita
const elimina = document.getElementById('elimina');
elimina.addEventListener('click', 
    function(){
        gridDom.innerHTML = '';
    }
);

//genero 16 numeri casuali, con una funzione e una mathrandom
//creo un array vuoto in cui mettere le posizioni delle 16 bombe
//prendo una poszione random e verifico che non sia già stata usata
//se la posizione è libera la inserisco nell'array bomba

// genero le posizioni delle bombe (max indica 100, 81 e 49)
function createBombe(max){
    // creo array vuoto in cui una volta generate le posizioni delle bombe, le richiamerò all'interno
    const arrayBombe = [];

    //devo ciclare finchè arrayBombe non comprenderà 16 numeri
    while(arrayBombe.length < bombeTotali){
        const singolaBomba = numeroRandomBombe(1, max);

        //se arrayBombe non include quel numero, allora aggiungilo pushandolo.
        //questo fa si che i numeri generati non siano duplicati
        if(arrayBombe.includes(singolaBomba) === false){
            arrayBombe.push(singolaBomba);
        }
    }
    //ritorno all'array e ripeto il ciclo fintanto che il mio array non comprenda 16 numeri casuali e non doppi
    return arrayBombe;
}

//genero numero casuale
function numeroRandomBombe(min, max){
    const range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

//la partita termina quando il giocatore clicca su una bomba o vince
//al termine il software deve annunciare il punteggio 
    //(cioè il numero di volte che l'utente a cliccato su una cella che non è una bomba)


//controllo se l'utente ha cliccato su una bomba
function clickCheck (square, index, bombPosition){
    const isBomba = bombPosition.includes(index + 1);

    if(isBomba){
        square.classList.add('bg-red');
    }else{
        square.classList.add('clicked');
    }
    console.log(isBomba);
    return isBomba;
}

function showBombe (bombeToShow){
    const selectSquares = document.querySelectorAll('.square');

    for(let i = 0; i < selectSquares.length; i++){
        if(bombeToShow.includes(i + 1)){
            const square = selectSquares[i];
            square.classList.add('bg-red');

        }
    }
}

function squareBlock (){
    gridDom.classList.add('game-over');
}



function addClickToSquares (posizioneBomba){
    let punti = 0;
    const selectSquares = document.querySelectorAll('.square');

    for(let i = 1; i < selectSquares.length; i++){
        const square = selectSquares[i];

        square.addEventListener('click', () =>{
            const gameOver = clickCheck(square, i, posizioneBomba);
            if(gameOver){
                squareBlock();
                showBombe(posizioneBomba);
                risultato(punti);
            }else{
                punti++;
                square.classList.add('game-over');
                const notBombe = selectSquares.length - bombeTotali;
                if(punti >= notBombe){
                    squareBlock();
                    risultato(punti);
                }
            }

        });

    }

}

function risultato(punti){
        const risultato = document.getElementById('risultato');
        risultato.innerHTML = 'Il tuo punteggio finale è: ' + punti + ' punti!';
}


































/////////////////////////////////////////////////////////
//Prima variante per l'evento del click
//e il cambio della griglia a seconda della difficoltà
//ma troppo ripetitiva e lunga


/*genera.addEventListener('click', 
    function(){
        if(document.getElementById('difficoltà').value == 'easy'){
            for(let i = 1; i <= 100; i++){

                // creo un singolo quadrato con al suo interno i numeri da 1 a 100
                const currentElement = createGridSquare(i);
                currentElement.classList.add('easy');
            
                // aggiungo l'evento click e i suoi effetti
                currentElement.addEventListener('click', 
                    function() {
                        this.classList.toggle('clicked');
                        console.log(currentElement.textContent);
                    }
                );
                    // aggiungo il tutto alla griglia
                    gridDom.append(currentElement);
            }
        } else if(document.getElementById('difficoltà').value == 'medium'){
            
            for(let i = 1; i <= 81; i++){

                // creo un singolo quadrato con al suo interno i numeri da 1 a 100
                const currentElement = createGridSquare(i);
                currentElement.classList.add('medium');
            
                // aggiungo l'evento click e i suoi effetti
                currentElement.addEventListener('click', 
                    function() {
                        this.classList.toggle('clicked');
                        console.log(currentElement.textContent);
                    }
                );
                    // aggiungo il tutto alla griglia
                    gridDom.append(currentElement);
            }
        }else if(document.getElementById('difficoltà').value == 'hard'){
            for(let i = 1; i <= 49; i++){

                // creo un singolo quadrato con al suo interno i numeri da 1 a 100
                const currentElement = createGridSquare(i);
                currentElement.classList.add('hard');
            
                // aggiungo l'evento click e i suoi effetti
                currentElement.addEventListener('click', 
                    function() {
                        this.classList.toggle('clicked');
                        console.log(currentElement.textContent);
                    }
                );
                    // aggiungo il tutto alla griglia
                    gridDom.append(currentElement);
            }
        }
        
    }
);*/