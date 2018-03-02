console.log('leggo bitches');

words = ['letters','aggregate'];

alphabet = 'abcdefghijklmnopqrstuvwxyz';

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
function displayWord(w){
	di = document.getElementById('display');

	scrambledContainer = document.createElement('div');
	scrambledContainer.classList.add('scrambled-container');

	scrambled = jumble(w);

	for(i = 0; i< w.length; i++){
		nd = document.createElement('div');
		nd.id = 'scrambled_' + i;
		nd.classList.add('scrambled-letter');
		nd.innerHTML = scrambled[i];
		scrambledContainer.appendChild(nd);
	}

	di.appendChild(scrambledContainer);

	//di.innerHTML = scrambled;
}

function keyDown(e){

	if(alphabet.indexOf(e.key) != -1){
		console.log(e.key);
	}
}

window.onload = function() {
	document.addEventListener ("keydown", keyDown);
	displayWord('aggregate');
}

//setInterval(updateDriving,100);