//this is where the game is played and contains all the user inputs

var inquirer = require('inquirer');
var words = require('./game.js');
var fs = require('fs');

var currentWord;

console.log(words.randomWords[1]);

// inquirer.prompt([{
// 	name: 'currentGuess',
// 	message: 'Guess a letter'
// }]).then(function(){
// 	console.log('Now you just have to make this game work!')
// });