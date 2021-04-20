

// diceElement = document.getElementById("Dice1");
// diceElement.innerHTML = 1;

var rollCount = 3;
var dice = [1, 1, 1, 1 ,1];
var diceSelected = [false,false,false,false,false];
var p1Turn = true;
var turnCount = 1;
var p1score = [,,,,,,0,0,,,,,,,0];
var p2score = [,,,,,,0,0,,,,,,,0];
var tempScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const diceElement = [];
const rollButton = document.getElementById("rollButton");
const turnElement = document.getElementById("turn");
rollButton.addEventListener('click', rollDice);

for (let i = 0; i < 5; i++) {
  diceElement[i] = document.getElementById("Dice"+i);
  diceElement[i].addEventListener('click', function() {selectDice(i);});
  diceElement[i].innerHTML = dice[i];
}
const p1Element = [];
const p2Element = [];
for (let i = 0; i < 15; i++) {
  p1Element[i] = document.getElementById(i+"-1");
  p2Element[i] = document.getElementById(i+"-2");
}
// console.log(dice);

setListener();

function rollDice() {
  if (rollCount > 0) {
    for (let i = 0; i < 5; i++) {
      if (!diceSelected[i]) {
        dice[i] = getRandomInt(1, 7);
      }
      diceElement[i].innerHTML = dice[i];
    }
    rollCount--;
    rollButton.innerHTML = "주사위 굴리기 (" + rollCount + "/3)"
    showTempScore();
  }
}

function setListener(){
  if (p1Turn == true) {
    for(let i = 0; i < 15; i++) {
      if (p1score[i] == undefined) {
        p1Element[i].addEventListener('click', setScore);
      }
      p2Element[i].removeEventListener('click', setScore);
    }
  }
  else {
    for(let i = 0; i < 15; i++) {
      if (p2score[i] == undefined) {
        p2Element[i].addEventListener('click', setScore);
      }
      p1Element[i].removeEventListener('click', setScore);
    }
  }
}

function overTurn() {
  p1Turn = !p1Turn;
  tempScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    if (diceSelected[i])
    {
      selectDice(i);
    }
  }
  rollCount = 3;
  rollButton.innerHTML = "주사위 굴리기 (" + rollCount + "/3)"
  setListener();
  if (p1Turn){
    turnElement.innerHTML = "P1's Turn";
  }
  else {
    turnElement.innerHTML = "P2's Turn";
  }
  setListener();
}

//주사위의 선택 여부에 따라 변수의 값과 class를 바꾸는 함수
function selectDice(dice_id){
  if(rollCount < 3){
    diceSelected[dice_id] = !diceSelected[dice_id];
    if (diceSelected[dice_id]) {
      diceElement[dice_id].className="SelectedDice";
    }
    else
    {
      diceElement[dice_id].className="Dice";
    }  
  }
}

function setScore(event) {
  var score_id = event.target.id.split('-');
  score_id = score_id[0];
  console.log(p1Turn, score_id);
  if (p1Turn == true)
  {
    p1score[score_id] = tempScore[score_id];
    p1Element[score_id].removeEventListener("click", setScore);
    updateScore(score_id);
  }
  else
  {
    p2score[score_id] = tempScore[score_id];
    p2Element[score_id].removeEventListener("click", setScore);
    updateScore(score_id);
  }
}

function updateScore(score_id){
  if(p1Turn == true){
    p1score[6] = 0;
    p1score[7] = 0;
    for (let i = 0; i < 6; i++) {
      if (p1score[i] != undefined) {
        p1score[6] += p1score[i];
      }
    }
    if(p1score[6] >= 63)
    {
      p1score[7] = 35;
    }
    p1score[14] = 0
    for (let i = 6; i < 14; i++) {
      if (p1score[i] != undefined) {
        p1score[14] += p1score[i];
      }
    }
    for (let i = 0; i < 15; i++) {
      if(p1score[i] == undefined){
        p1Element[i].innerHTML = "";
      }
    }
    p1Element[score_id].innerHTML = p1score[score_id];
    p1Element[score_id].className += " scoreSet";
    p1Element[6].innerHTML = p1score[6]+"/63";
    p1Element[7].innerHTML = p1score[7];
    p1Element[14].innerHTML = p1score[14];
  }
  else
  {
    p2score[6] = 0;
    p2score[7] = 0;
    for (let i = 0; i < 6; i++) {
      if (p2score[i] != undefined) {
        p2score[6] += p2score[i];
      }
    }
    if(p2score[6] >= 63)
    {
      p2score[7] = 35;
    }
    p2score[14] = 0
    for (let i = 6; i < 14; i++) {
      if (p2score[i] != undefined) {
        p2score[14] += p2score[i];
      }
    }
    for (let i = 0; i < 15; i++) {
      if(p2score[i] == undefined){
        p2Element[i].innerHTML = "";
      }
    }
    p2Element[score_id].innerHTML = p2score[score_id];
    p2Element[score_id].className += " scoreSet";
    p2Element[6].innerHTML = p2score[6]+"/63";
    p2Element[7].innerHTML = p2score[7];
    p2Element[14].innerHTML = p2score[14];
  }
  overTurn();
}
//임시로 계산된 점수를 보여주는 함수
function showTempScore() {
  calcScore()
  if (p1Turn == true) {
    for (let i = 0; i < 6; i++) {
      if(p1score[i] == undefined){
        p1Element[i].innerHTML = tempScore[i];
      }
    }
    for (let i = 8; i < 15; i++) {
      if(p1score[i] == undefined){
        p1Element[i].innerHTML = tempScore[i];
      }
    }
  }
  else{
    for (let i = 0; i < 6; i++) {
      if(p2score[i] == undefined){
        p2Element[i].innerHTML = tempScore[i];
      }
    }
    for (let i = 8; i < 15; i++) {
      if(p2score[i] == undefined){
        p2Element[i].innerHTML = tempScore[i];
      }
    }
  }
  
}
//점수 계산하는 함수 tempScore에 그 값을 저장함.
function calcScore() {
  var diceCount = [0, 0, 0, 0, 0, 0];
  var diceSum = 0;

  for (var i = 0; i < 5; i++) {
    diceCount[dice[i]-1] = diceCount[dice[i] - 1] + 1;
    diceSum += dice[i];
  }

  for (var i = 0; i < 6; i++) {
    tempScore[i] = 0;
    tempScore[i] = (i+1) * diceCount[i];
  }

  //tempScore[6] Subtotal
  //tempScore[7] Bonus

  // Choice
  tempScore[8] = 0;
  tempScore[8] = diceSum;

  // 4 of a kind
  tempScore[9] = 0;
  for (var i = 0; i < 6; i++) {
    if (diceCount[i] >= 4) {
      tempScore[9] = diceSum;
      break;
    }
  }

  // Full House
  tempScore[10] = 0;
  var fullHouseCheck = [0, 0];
  for (var i = 0; i < 6; i++) {
    if (diceCount[i] == 2) {
      fullHouseCheck[0] = 1;
    }
    if (diceCount[i] == 3) {
      fullHouseCheck[1] = 1;
    }
  }
  if (fullHouseCheck[0] == 1 && fullHouseCheck[1] == 1) {
    tempScore[10] = diceSum;
  }

  // S. Straight
  tempScore[11] = 0;
  if ((diceCount[0] > 0 && diceCount[1] > 0 && diceCount[2] > 0 && diceCount[3] > 0) ||
    (diceCount[1] > 0 && diceCount[2] > 0 && diceCount[3] > 0 && diceCount[4] > 0) ||
    (diceCount[2] > 0 && diceCount[3] > 0 && diceCount[4] > 0 && diceCount[5] > 0))
    tempScore[11] = 15;

  // L. Straight
  tempScore[12] = 0;
  if ((diceCount[0] > 0 && diceCount[1] > 0 && diceCount[2] > 0 && diceCount[3] > 0 && diceCount[4] > 0) ||
    (diceCount[1] > 0 && diceCount[2] > 0 && diceCount[3] > 0 && diceCount[4] > 0 && diceCount[5] > 0))
    tempScore[12] = 30;

  // Yachoo
  tempScore[13] = 0;
  if (dice[0] == dice[1] && dice[1] == dice[2] && dice[2] == dice[3] && dice[3] == dice[4])
    tempScore[13] = 50;
}
//min 이상 max 미만을 반환하는 함수
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}