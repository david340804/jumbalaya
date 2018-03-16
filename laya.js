console.log('leggo bitches');

words = ['letters','aggregate','weather','maps','news','calculator','dictionary','movies','horoscope','solitaire','calendar','fishing'];

alphabet = 'abcdefghijklmnopqrstuvwxyz';

word = '';
entryWord = [];
entryLetterSelected = 0;

solves = 0;

//store game activity state
gameDone = false;

/**
	Get a random word from list
*/
function getRandomWord(){
	i = Math.floor(Math.random() * word.length);

	return words[i];
}

/**
	Remap a word using an array of indices

	>>remapWord('abc',[2,1,0])
	<<"cba"
*/
function remapWord(word,newLetters){
	if(word.length != newLetters.length){
		throw('word and array must be same length');
	}

	//TODO verify each index shows up exactly once

	n = '';

	newLetters.forEach((i) => {
		n = n + word[i];
	});

	return n
}

/**
	Reorder an array randomly
	https://bost.ocks.org/mike/shuffle/
*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
	Jumble up a word
*/
function jumble(word){
	if(word.length < 4){
		throw('Can\'t scramble words less than 4 chars long');
	}

	jumbleMap = [];
	for(i = 1; i<word.length-1; i++){
		jumbleMap.push(i);
	}

	//shuffle middle part
	jumbleMap = shuffle(jumbleMap);


	//randomly insert first and last letters
	firstLetterLocation = Math.floor(1 + Math.random()*(word.length-2));
	jumbleMap.splice(firstLetterLocation,0,0);

	lastLetterLocation = Math.floor(Math.random()*(word.length-1));

	//This here aint working
	jumbleMap.splice(lastLetterLocation,0,(word.length-1));

	scrambled = remapWord(word,jumbleMap);

	return scrambled;

}

/**
	Display a scrambled word and its entry boxes
*/
function addScrambledDisplay(w){
	di = document.getElementById('display');

	scrambledContainer = document.createElement('div');
	scrambledContainer.classList.add('scrambled-container');

	scrambled = jumble(w);

	for(i = 0; i< w.length; i++){
		entryWord.push(' ');
		nd = document.createElement('div');
		nd.id = 'scrambled_' + i;
		nd.classList.add('scrambled-letter');
		nd.innerHTML = scrambled[i];
		scrambledContainer.appendChild(nd);
	}

	di.appendChild(scrambledContainer);

}

/*
	Test if the player won
*/
function won(){
	return (word == entryWord.join(''));
}

/**
	Clear display
*/
function clearDisplay(){
	document.getElementById('display').innerHTML = '';
}

/**
	Display a scrambled word and its entry boxes
*/
function addTextEntry(w){
	di = document.getElementById('display');

	entryContainer = document.createElement('div');
	entryContainer.classList.add('entry-container');

	for(i = 0; i< w.length; i++){
		entryLetter = document.createElement('div');
		entryLetter.id = 'entry_' + i;
		entryLetter.classList.add('entry-letter');
		entryLetter.innerHTML = '-';
		entryContainer.appendChild(entryLetter);
	}
	di.appendChild(entryContainer);

}

/**
	Update text entry boxes
*/
function updateTextEntry(){


	for(i = 0; i< word.length; i++){
		letter = document.getElementById('entry_' + i);
		letter.classList.remove('entry-letter-selected');
		letter.classList.add('entry-letter');
		letter.innerHTML = entryWord[i];

	}

	s = document.getElementById('entry_' + entryLetterSelected);
	s.classList.remove('entry-letter');
	s.classList.add('entry-letter-selected');
	
}

/*
	Set the score box string
*/
function setScoreDisplay(_s){
	document.getElementById('score-box').innerHTML = _s;
}

/**
	Returns true if there are remaining occurences of _l in _enteredText to make _word
*/
function letterRemaining(_l, _word, _enteredText){
	//calculate times the letter shows up in the answer and entered text
	wordOccurances = (_word.split(_l).length - 1);
	enteredOccrances = (_enteredText.split(_l).length - 1);

	if(enteredOccrances < wordOccurances){
		return true;
	}
	return false;
}


/**
	Catch the keydown
*/
function keyDown(e){

	//if the key is a letter
	if(alphabet.indexOf(e.key) != -1 && letterRemaining(e.key,word,entryWord.join(''))){
		//console.log(e.key);

		if(entryLetterSelected < word.length){
			entryWord.splice(entryLetterSelected,1,e.key);
		}

		if(entryLetterSelected < word.length-1){
			entryLetterSelected += 1;
		}

		//check if new letter makes win condition
		if(won()){
			//alter game activity state to done
			gameDone = true;

			//increase score
			solves += 1;

			//update display
			setScoreDisplay('Solves: ' + solves);

			newPuzzle();

		}
	}

	if(e.key == 'Backspace'){
		//last letter filled case
		if(entryLetterSelected == word.length-1 && entryWord[word.length-1] != ' '){
			//clear last letter
			entryWord.splice(entryLetterSelected,1,' ');
		}else{
			//if this isn't the last letter
			if(entryLetterSelected < word.length){
				entryWord.splice(entryLetterSelected-1,1,' ');
			}
			
			//decrement letter
			if(entryLetterSelected > 0){
				entryLetterSelected -= 1;
			}
		}
		
	}

	updateTextEntry();
	console.log('EntryWord: ' + entryWord);
}

/**
	Generate a new puzzle
*/
function newPuzzle(){
	//set puzzle game params
	word = getRandomWord();
	entryWord = [];
	entryLetterSelected = 0;
	gameDone = false;

	clearDisplay();

	addScrambledDisplay(word);

	addTextEntry(word);

	updateTextEntry();
}


window.onload = function() {
	//add listener for keys
	document.addEventListener ("keydown", keyDown);

 	newPuzzle();

}

//setInterval(updateDriving,100);