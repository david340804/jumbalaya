

/*Read the file, split by word*/
var fs = require('fs');
var file = 'words.txt';

fs.readFile(file, 'utf8', function (err, data) {
  if (err) throw err;

 var words = splitTextByWord(data);
 console.log(words);

});

function splitTextByWord (text) {

  var words = text.split(/\s+/);
  return words;
}

