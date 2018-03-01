console.log('leggo bitches');

//fetch('http://143.215.110.228:8080/d/f/100');

/**
	Remap a word using an array of indices
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
	Jumble up a word
*/
function jumble(word){
	if(word.length < 4){
		throw('Can\'t scramble words less than 4 chars long');
	}

	firstLetter = word[0];
	lastLetter = word[word.length - 1];

	scrambled = '';
	remainingIndices = [];

	for(i = 0; i<word.length; i++){
		remainingIndices.push(i);
	}

	newFirst = Math.floor(Math.random()*(word.length-2)) + 1;

	newLast = Math.floor(Math.random()*(word.length-2)) + 1;

	return scrambled;

}

window.onload = function() {


}

//setInterval(updateDriving,100);