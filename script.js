const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissor");

var userScore = 0;
var compScore = 0;

const optionsEnum = {
  "rock": "0",
  "paper": "1",
  "scissor": "2"
}

function getEnumValue(value) {
  return Object.keys(optionsEnum).find(key => optionsEnum[key] === value);
}

function getComputerChoice() {
  let enumValue = Math.floor(Math.random() * 3).toString();
  return enumValue;
}

function setChoiceColor(userChoice, className) {
  let clickedElement = document.getElementById(getEnumValue(userChoice));
  clickedElement.classList.add(className);
  
  setTimeout(() => { clickedElement.classList.remove(className); }, 500);
}

function win(userChoice, computerChoice) {
  userScore++;
  userScore_span.innerText = userScore;
 
  let winText = `${getEnumValue(userChoice).toUpperCase()} beats ${getEnumValue(computerChoice).toUpperCase()}. You win! 🔥`;
  result_p.innerText = winText;
  setChoiceColor(userChoice, "green-glow");
}

function lose(computerChoice, userChoice) {
  compScore++;
  compScore_span.innerText = compScore;
  
  let loseText = `${getEnumValue(computerChoice).toUpperCase()} beats ${getEnumValue(userChoice).toUpperCase()}. You lose! 😢`;
  result_p.innerText = loseText;
  setChoiceColor(userChoice, "red-glow");
}

function draw(choice) {
  let drawText = `You both got ${getEnumValue(choice).toUpperCase()}. It's a draw! 😐`;
  result_p.innerText = drawText;
  setChoiceColor(choice, "gray-glow");
}

function play(userChoice) {
  var computerChoice = getComputerChoice();
  
  if (computerChoice === userChoice) {
    draw(userChoice);
    return false;
  }
  
  switch (userChoice+computerChoice) {
    case optionsEnum.rock + optionsEnum.scissor:
    case optionsEnum.paper + optionsEnum.rock:
    case optionsEnum.scissor + optionsEnum.paper:
      win(userChoice, computerChoice);
      break;
    default:
      lose(computerChoice, userChoice);
  }
 
}

function main() {
  rock_div.addEventListener('click', function() {
    play(optionsEnum.rock)
  })

  paper_div.addEventListener('click', function() {
    play(optionsEnum.paper)
  })

  scissor_div.addEventListener('click', function() {
    play(optionsEnum.scissor)
  })
}

function resetGame() {
  userScore = 0;
  userScore_span.innerText = userScore;
  
  compScore = 0;
  compScore_span.innerText = compScore;
  
  result_p.innerText = "";
}

main();