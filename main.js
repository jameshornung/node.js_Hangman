//this is where the game is played and contains all the user inputs

var inquirer = require('inquirer');
var words = require('./game.js');
var display = require('./letter.js');
var check = require('./word.js');

var currentWord;
var remainingGuesses = 8;
var victory = false;

function selectRandomWord(){
	var x = Math.floor(Math.random() * 10)
	currentWord = words.possibleWords[x];
}

//START THE GAME------------------------------------------------------------
//select a random word from the state capital array 
selectRandomWord();
var showPlayer = new Display(currentWord);
var checkLetter = new Check(currentWord);
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
		if(checkLetter.lettersGuessed.includes(answer.currentGuess)){
			console.log('You have already guessed that letter');
			console.log('Letters Guessed: ' + checkLetter.lettersGuessed);
			console.log('Guesses Remaining: ' + remainingGuesses);
			guessLetters();
		}
		else{
			checkLetter.lettersGuessed.push(answer.currentGuess);
			if(checkLetter.currentWordArray.includes(answer.currentGuess)){
				console.log('that was a correct answer');
				showPlayer.updatedDisplay(answer.currentGuess);
				if(victory){
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
				showPlayer.updatedDisplay(answer.currentGuess);
				console.log('Letters Guessed: ' + checkLetter.lettersGuessed);
				remainingGuesses--;
				console.log('Guesses Remaining: ' + remainingGuesses);
				console.log('-------------------------------------------------------');
				console.log('');
				guessLetters();
			}
		}	
	});
	}
	else{
		console.log('You Lose!');
		console.log('The capital we were looking for was: ' + currentWord);
	}
}
//Call the function
guessLetters();