// APIs 
let randomWordApi = 'https://random-word-api.herokuapp.com/word'
let wordDefinitonApi = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
let merriamDictionaryApi ="https://dictionaryapi.com/api/v3/references/collegiate/json/"

// Page Elements by IDs
const generate = document.getElementById("generate");
const wordBox = document.getElementById("generted-word");
const definitionBox = document.getElementById("definitionBox");
const clearBtn = document.getElementById("clear");
const date = document.getElementById("date");
const partOfSpeech = document.getElementById("partOfSpeech");
const audio = document.getElementById("pronunciation")

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
    partOfSpeech.textContent = ''
    fetch(randomWordApi)
    .then(response => response.json())
    .then(data => {

        let word = data[0];

        // This passes in the word into the getWordDetails function 
        getWordDetails(word);
        getWordPronunciation(word)
    })
}

// This gets more information about the word, such as definition/part of speech 
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

            //store the parts of speech(noun,verb etc)
            let speechParts = response[0].meanings[0].partOfSpeech
            
            // Change the word on the page 
            wordBox.textContent = finalWord;

            // Change the definition on the page 
            definitionBox.textContent = definition;

            //Change the parts of speech on page
            partOfSpeech.textContent = speechParts;
        })
        .catch(function (err) {
            console.error("No definition found", err)
        });
}

//Function provides pronunciation for the word through an audio file
function getWordPronunciation(word) {
    
    fetch(merriamDictionaryApi + word + "?key=d6970864-1994-4574-8ab7-8d26fa55a301")
    .then(response => response.json())
    .then(response => {

        // This checks if the word has a stored pronunciation 
        if (response.title) {
            console.error("No Pronunciation found")
            generateWord();
            return;
        }

        //Stores first element of audio file
        let sound1=response[0].hwi.prs[0].mw.charAt(1);
        
        //stores second element of audio file
        let sound2 = response[0].hwi.prs[0].sound.audio;
        
        //Stores complete link to audio file 
        let pronunciation = "https://media.merriam-webster.com/audio/prons/en/us/mp3/" + sound1 + "/" + sound2 + ".mp3";

        //Places audio file on webpage
        audio.href=pronunciation;
    })
    .catch(function (err) {
        console.error("No Pronunciation found", err)
    });
}

// Clear function 
function clearAll() {
    wordBox.textContent = "Hello!";
    definitionBox.textContent = "Click below to learn a new word!";
    partOfSpeech.textContent = ""
};

// Event listeners

clearBtn.addEventListener("click", clearAll);

generate.addEventListener("click", generateWord);

//Future Development Idea
//Create visual representation of word through a photo or short video