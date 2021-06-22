// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let askQuestion = input.question("Let's play some scrabble! Enter a word:");
   return askQuestion; 
};

let simpleScore = function(word){
  let score = word.length;
  return score;
}


let vowelBonusScore =  function(word) {
  let score = 0;
  for (let i = 0; i<word.length; i++){
    if (["a",'e', 'i','o','u'].includes(word[i])){ 
      score +=3;
      }
      else {score++}
}
  return score;
}
    


let scrabbleScore = (word) => {
  let score = 0;
  word.split('').forEach((letter) => {
   score += newPointStructure[letter.toUpperCase()]
  })
  return score;
};


function transform(obj){
  const newObj = {};
  for (const key in obj) {
    obj[key].forEach(function(item){
      newObj[item] = Number(key);
    })
  }
  return newObj; 

}


let newPointStructure = transform(
  oldPointStructure 
)


const simpleScoreObj = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction:simpleScore,  
  }


const bonusVowelsObj = {
  name: 'Bonus Vowels',
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction:vowelBonusScore, 
  }


const scrabbleObj = {
  name:"Scrabble",
  description:"The traditional scoring algorithm.",
  scoringFunction:scrabbleScore,
}

const scoringAlgorithms = [simpleScoreObj, bonusVowelsObj, scrabbleObj];



function scorerPrompt(word) {
  console.log("0 - Simple: One point per character")
  console.log("1 - Vowel Bonus: Vowels are worth 3 points")
  console.log("2 - Scrabble: Uses scrabble point system")
  let askQuestion = input.question("Enter 0, 1, or 2: ");
  return scoringAlgorithms[askQuestion]
  
}

function runProgram() {
   const word = initialPrompt();
   const scoreoption = scorerPrompt();

   console.log(`Score for '${word}': ` + scoreoption.scoringFunction(word))
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

