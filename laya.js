console.log('leggo bitches');

words = ['letters','aggregate'];

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

	console.log(jumbleMap);

	//randomly insert first and last letters
	firstLetterLocation = Math.floor(1 + Math.random()*(word.length-2));
	jumbleMap.splice(firstLetterLocation,0,0);

	console.log(jumbleMap);

	lastLetterLocation = Math.floor(Math.random()*(word.length-1));
	console.log(word.length-1);

	//This here aint working
	jumbleMap = jumbleMap.splice(lastLetterLocation,0,(word.length-1));
	console.log(jumbleMap);

	scrambled = remapWord(word,jumbleMap);

	return scrambled;

}

window.onload = function() {


}

//setInterval(updateDriving,100);