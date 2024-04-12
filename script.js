let newGameContainer = document.querySelector('#newGameContainer');
let inputGuessContainer = document.querySelector('#inputGuessContainer');
let gameContainer = document.querySelector('#gameContainer')
let guessesVisualizer = document.querySelector('#chancesLeft');
let guessesLeft = 6;
let wordToGuess;
let wordArray = [];     
let spacesArray = [];
let imageVisualizer = document.querySelector('#imageVisualizer');
let imageArray = ['gameplay images/chance6.jpeg', 'gameplay images/chance5.jpg', 'gameplay images/chance4.jpg', 'gameplay images/chance3.jpg', 'gameplay images/chance2.gif', 'gameplay images/chance1.gif'];
let imageArrayIndex = 0;
let word = document.querySelector('#word');

function storeWordToGuess(){
  let word = document.querySelector('#word').value.toLowerCase();
  console.log(word)
  return word;
}

function refreshPage(){
  window.location.reload();
} 

function createArrays(){
  for (i=0; i < wordToGuess.length; i++) {   
    wordArray.push(wordToGuess.charAt(i));  
    spacesArray.push("_");
    let visualizer = document.querySelector('#visualizer');
    visualizer.innerHTML = `${spacesArray.join(" ").toString()}`;
  }
}

function runGame(){
  let guess = document.querySelector('#guess').value.toLowerCase();
  console.log(guess);
  let lettersGuessed = document.querySelector('#lettersGuessed');
  let visualizer = document.querySelector('#visualizer');
  lettersGuessed.innerHTML += `${guess} `; 
  if(guess === wordToGuess){
    imageVisualizer.src = "img-win.jpeg";
    alert(`YOU GUESSED THE WORD AND SAVED THE PRISONER!`);
    submitGuessButtonEl.disabled = true;
    visualizer.innerHTML = `${wordToGuess}`;
  }
  else {
    if(wordArray.includes(guess)){   
      for (i=0; i < wordArray.length; i++){   
         if(wordArray[i] === guess){         
            spacesArray[i] = guess;
            visualizer.innerHTML = `${spacesArray.join(" ").toString()}`;
          }
      }
      alert(`The letter is in the word!`)   
      if(spacesArray.toString() === wordArray.toString()){ 
        imageVisualizer.src = "img-win.jpeg";
        alert(`YOU GUESSED THE WORD AND SAVED THE PRISONER!`); 
        submitGuessButtonEl.disabled = true;
      }
    } else {             
      guessesLeft -= 1;
      if(imageArrayIndex <= 4){
        imageArrayIndex += 1;
      }
      guessesVisualizer.innerHTML = guessesLeft;
      alert(`The letter is NOT in the word!`)
      imageVisualizer.src = imageArray[imageArrayIndex];
    }
  }

  if(guessesLeft === 0){
    imageVisualizer.src = "img-lost.jpeg";
    alert('YOU GOT BUSTED!');
    let submitGuessButtonEl = document.querySelector('#submitGuessButton');
    submitGuessButtonEl.disabled = true;
    visualizer.innerHTML = wordToGuess;
  }

  let guessInput = document.querySelector('#guess');
  guessInput.value = "";
}

// Welcome page. Hides when button clicked and shows the input word page.
let newGameButtonEl = document.querySelector('#newGameButton');
newGameButtonEl.addEventListener('click', function(){
  newGameContainer.style.display = 'none';
  inputGuessContainer.style.display = 'block';
  gameContainer.style.display = 'none';

  submitWordButtonEl.disabled = true;
})

// Input word page. Button to submit word to be guessed.
let submitWordButtonEl = document.querySelector('#submitWordButton');
submitWordButton.addEventListener('click', function(){
  let alphaExp = /^[a-zA-Z]+$/;
    if(word.value.match(alphaExp))
    {
      newGameContainer.style.display = 'none';
      inputGuessContainer.style.display = 'none';
      gameContainer.style.display = 'block';
    
    
      wordToGuess = storeWordToGuess();
      createArrays();
      guessesVisualizer.innerHTML = guessesLeft;
    }
    else{
        alert("Please, enter only letters!");
    }
})

/* Key event to disable submit button if value of input is empty. 
   Default is disabled = true; originally from previous button clicked */

word.addEventListener('keyup', function(e){
  if (word.value === ''){
    submitWordButtonEl.disabled = true;
  } else {
    submitWordButtonEl.disabled = false;
  }
})


// Stop form from reloading the page
let gameplayFormEl = document.querySelector('#gameplayForm');
gameplayFormEl.addEventListener("submit", function(e) {
  e.preventDefault();
 })

 let inputFormEl = document.querySelector('#inputForm');
 inputFormEl.addEventListener("submit", function(e) {
  e.preventDefault();
 })

let submitGuessButtonEl = document.querySelector('#submitGuessButton');
submitGuessButtonEl.addEventListener('click', runGame);

let restartButton = document.querySelector('#restartButton');
restartButton.addEventListener('click', refreshPage);

let toggleInstructionsBtn = document.querySelector('#showInstructions');
let closeInstructionsBtn = document.querySelector('#close-modal');
let instructionsContainerEl = document.querySelector('#instructionsContainer');

function toggleInstructions(){
  instructionsContainerEl.classList.toggle('show');
}

toggleInstructionsBtn.addEventListener('click', toggleInstructions);
closeInstructionsBtn.addEventListener('click', toggleInstructions);