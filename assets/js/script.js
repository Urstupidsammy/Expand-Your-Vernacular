var randomWordApi = 'https://random-word-api.herokuapp.com/word'
var generate = document.getElementById("generate");

const wordBox = document.getElementById("generted-word");
const definitionBox = document.getElementById("definitionBox")

function generateWord() {
    fetch(randomWordApi)
    .then(response => response.json())
    .then(words => {
        console.log(words[0]);
        getWordDetails(words[0]);
    })
}

function getWordDetails(word) {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(response => response.json())
        .then(response => {
            if (response.title) {
                console.error("No definition found")
                generateWord();
                return;
            }

            // Make first letter in word Capitalized 
            const finalWord = word.charAt(0).toUpperCase() + word.slice(1)

            // Store the definition 
            let definition = response[0].meanings[0].definitions[0].definition

            // Change the word on the page 
            wordBox.textContent = finalWord;
            // Change the definition on the page 
            definitionBox.textContent = definition;



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