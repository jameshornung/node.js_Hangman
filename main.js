//this is where the game is played and contains all the user inputs

var inquirer = require('inquirer');
var words = require('./game.js');
var display = require('./letter.js');
var check = require('./word.js');

var currentWord;
var remainingGuesses = 10;


function selectRandomWord(){
	var x = Math.floor(Math.random() * 10)
	currentWord = words.possibleWords[x];
}

//START THE GAME------------------------------------------------------------
//select a random word from the state capital array 
selectRandomWord();
var showPlayer = new Display(currentWord);
var checkLetter = new Check(currentWord);

// This is for TROUBLESHOOTING - it provides the correct answer
console.log('the word is: ' + currentWord);


//Original display and instrictions
console.log('');
console.log('');
console.log('=========================================================');
console.log('HANGMAN');
console.log('=========================================================');
console.log('Welcome to the hangman man game - state capital edition.');
console.log('Let\'s get to guessing!');
console.log('');
console.log('Guess This Word:'); 
showPlayer.originalDisplay();
console.log('');
console.log('Guesses Remaining: ' + remainingGuesses);
console.log('');
//end of original display----------------------------

//Prompt the user to guess a letter
var guessLetters = function(){
	if(remainingGuesses > 0){
	inquirer.prompt([{
		name: 'currentGuess',
		message: 'Guess a letter'
	}]).then(function(answer){
		var letter = answer.currentGuess.toLowerCase();
		var letters = /^[a-z]+$/;
		//if letter is valid
		if(letter.match(letters)){
			if(checkLetter.lettersGuessed.includes(letter)){
				console.log('You have already guessed that letter');
				console.log('Letters Guessed: ' + checkLetter.lettersGuessed);
				console.log('Guesses Remaining: ' + remainingGuesses);
				console.log('-------------------------------------------------------');
				console.log('');
				guessLetters();
			}
			else{
				checkLetter.lettersGuessed.push(letter);
				if(checkLetter.currentWordArray.includes(letter)){
					console.log('that was a correct answer');
					showPlayer.updatedDisplay(letter);
					console.log('Updated Word = ' + showPlayer.updated);
					console.log('Current Word = ' + currentWord);
					if(showPlayer.updated == currentWord){
						console.log('You Win!');
					}
					else{
						console.log('Letters Guessed: ' + checkLetter.lettersGuessed);
						console.log('Guesses Remaining: ' + remainingGuesses);
						console.log('-------------------------------------------------------');
						console.log('');
						guessLetters();	
					}
				}
				else{
					console.log('that was a wrong answer');
					showPlayer.updatedDisplay(letter);
					console.log('Letters Guessed: ' + checkLetter.lettersGuessed);
					remainingGuesses--;
					console.log('Guesses Remaining: ' + remainingGuesses);
					console.log('-------------------------------------------------------');
					console.log('');
					guessLetters();
				}
			}
		}
		//if letter is not valid
		else{
			console.log('Please select an alphabetic character');
			console.log('');
			guessLetters();
		}
	});
	}
	else{
		console.log('You Lose!');
		console.log('The capital we were looking for was: ' + currentWord);
		console.log('');
	}
}
//Call the function
guessLetters();