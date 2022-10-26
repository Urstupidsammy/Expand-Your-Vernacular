
// APIs 
let randomWordApi = 'https://random-word-api.herokuapp.com/word'
let wordDefinitonApi = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

// Page Elements 
const generate = document.getElementById("generate");
const wordBox = document.getElementById("generted-word");
const definitionBox = document.getElementById("definitionBox");
const clearBtn = document.getElementById("clear")

// Function to call the API to get a random word 
function generateWord() {
    fetch(randomWordApi)
    .then(response => response.json())
    .then(words => {
        console.log(words[0]);
        // This passes in the word into the getWordDetails function 
        getWordDetails(words[0]);
    })
}

// This gets more information about the word 
function getWordDetails(word) {
    fetch(wordDefinitonApi + word)
        .then(response => response.json())
        .then(response => {
            // This checks if the word has a definition 
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

// Clear function 
function clearAll() {
    wordBox.textContent = "Hello!";
    definitionBox.textContent = "Click below to learn a new word!";
};

clearBtn.addEventListener("click", clearAll);

generate.addEventListener("click", generateWord);

//Create elememt audio
{/* <audio controls>
  <source src="http://audio.linguarobot.io/en/example-us.mp3" type="audio/mpeg">
</audio> */}