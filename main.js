//this is where the game is played and contains all the user inputs

var inquirer = require('inquirer');
var words = require('./game.js');
var display = require('./letter.js');

var currentWord;

function selectRandomWord(){
	var x = Math.floor(Math.random() * 10)
	currentWord = words.possibleWords[x];
}

//select a random word from the game.js file
selectRandomWord();
var showPlayer = new Display(currentWord);
showPlayer.originalDisplay();

//prompt the user to guess a letter
// inquirer.prompt([{
// 	name: 'currentGuess',
// 	message: 'Guess a letter'
// }]).then(function(){
// 	console.log('Now you just have to make this game work!')
// });