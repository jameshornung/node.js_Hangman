//constructor files
//will control whether a letter appears as "-" or as its self on screen


//takes in a random word as an argument and displays it as a string of dashes
Display = function(word){
	this.wordArray = word.split(''),
	this.arrayOfDashes = [],
	this.originalDisplay = function(){
		for(i=0;i<this.wordArray.length;i++){
			if(this.wordArray[i] === ' '){
				x = ' ';
				this.arrayOfDashes.push(x);
			}
			else{
				x = '-';
				this.arrayOfDashes.push(x);
			}
		}
		console.log(this.arrayOfDashes.join(''));
	}
}
