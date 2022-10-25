var randomWordApi = 'https://random-word-api.herokuapp.com/word'
var generate = document.getElementById("generate");

function generateWord() {
    fetch(randomWordApi).then(response => response.json()).then(function (words) {
        console.log(words[0]);
        getWordDetails(words[0]);
    })
}

function getWordDetails(word) {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.title) {
                console.error("No definition found")
                generateWord();
            }
        })
        .catch(function (err) {
            console.error("No definition found", err)
        });
}

document.getElementById('randomWord')

console.log('test')

generate.addEventListener("click", generateWord);
//Create elememt audio
{/* <audio controls>
  <source src="http://audio.linguarobot.io/en/example-us.mp3" type="audio/mpeg">
</audio> */}