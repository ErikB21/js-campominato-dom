// prendo l'elemento principale che rappresenta la griglia
const gridDom = document.getElementById('grid');

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
    for(let i = 1; i <= quadratini; i++){

        const currentElement = createGridSquare(i, livello);

        currentElement.addEventListener('click', 
            function() {
                this.classList.toggle('clicked');
                console.log(currentElement.textContent);
            }
        );
            gridDom.append(currentElement);
    }
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