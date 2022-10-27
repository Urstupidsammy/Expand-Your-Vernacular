// APIs 
let randomWordApi = 'https://random-word-api.herokuapp.com/word'
let wordDefinitonApi = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

// Page Elements 
const generate = document.getElementById("generate");
const wordBox = document.getElementById("generted-word");
const definitionBox = document.getElementById("definitionBox");
const clearBtn = document.getElementById("clear");
const date = document.getElementById("date");

// Today's date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

date.textContent = today

// Function to call the API to get a random word 
function generateWord() {
    definitionBox.textContent = "Loading...";
    fetch(randomWordApi)
    .then(response => response.json())
    .then(data => {

        let word = data[0];

        // This passes in the word into the getWordDetails function 
        getWordDetails(word);
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

            console.log(response)

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

// Event listeners

clearBtn.addEventListener("click", clearAll);

generate.addEventListener("click", generateWord);


//Future Development Idea

//Create elememt audio
{/* <audio controls>
  <source src="http://audio.linguarobot.io/en/example-us.mp3" type="audio/mpeg">
</audio> */}
