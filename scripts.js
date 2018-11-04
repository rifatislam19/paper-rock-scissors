var rules_button=document.getElementById("show_rules_button");
var rules_div = document.getElementById("rules");
makeToggable(rules_button, rules_div);

var stats_button=document.getElementById("show_stats_button");
var stats_div = document.getElementById("stats");
makeToggable(stats_button, stats_div);

var submit_name_button=document.getElementById("submit_name");
var submit_name_div = document.getElementById("name");

var throw_choice_button=document.getElementById("throw_choice_button");
var replay_button=document.getElementById("replay_button");

var paperCount = 0;
var rockCount = 0;
var scissorsCount = 0;
var paperCountAi = 0;
var rockCountAi = 0;
var scissorsCountAi = 0;
var gameCount = 0;
var winCount = 0;
var loseCount = 0;

replay_button.addEventListener("click", function(){
  var select_option = document.getElementById("select_button");
  document.getElementById("game_results").classList.remove("visible");
  document.getElementById("game_results").classList.add("hidden");
  select_option.selectedIndex = "blank";
});

throw_choice_button.addEventListener("click", function(){
var select_option = document.getElementById("select_button");
var selected = select_option.options[select_option.selectedIndex].value;
var ai_throw = Math.floor(Math.random()*3)+1;

if(selected=="blank"){
  document.getElementById("give_feedback").style.color = "red";
  updateMessage("give_feedback", "You must choose either paper, rock, or scissors.");
}
if(selected!="blank"){
  document.getElementById("give_feedback").style.color = "green";
  updateMessage("give_feedback", "Choice successfully thrown!");
  gameCount = gameCount + 1;
  document.getElementById("game_results").classList.remove("hidden");
  document.getElementById("game_results").classList.add("visible");
}

if(selected=="paper"){
  paperCount = paperCount+1;
  document.getElementById("player_pic").src = "./images/paper_player.png";
  if(ai_throw==1){
    updateMessage("display_results", player_name + " threw paper. B(r)owser threw paper. It's a tie!");
    paperCountAi = paperCountAi + 1;
    document.getElementById("browser_pic").src = "./images/paper.png";
  }
  if(ai_throw==2){
    updateMessage("display_results", player_name + " threw paper. B(r)owser threw rock. You win!");
    rockCountAi = rockCountAi + 1;
    winCount = winCount + 1;
    document.getElementById("browser_pic").src = "./images/rock.png";
  }
  if(ai_throw==3){
    updateMessage("display_results", player_name + " threw paper. B(r)owser threw scissors. You lose!");
    scissorsCountAi = scissorsCountAi + 1;
    loseCount = loseCount + 1;
    document.getElementById("browser_pic").src = "./images/scissors.png";
  }
}

if(selected=="rock"){
  rockCount = rockCount+1;
  document.getElementById("player_pic").src = "./images/rock_player.png";
  if(ai_throw==1){
    updateMessage("display_results", player_name + " threw rock. B(r)owser threw paper. You lose!");
    paperCountAi = paperCountAi + 1;
    loseCount = loseCount + 1;
    document.getElementById("browser_pic").src = "./images/paper.png";
  }
  if(ai_throw==2){
    updateMessage("display_results", player_name + " threw rock. B(r)owser threw rock. It's a tie!");
    rockCountAi = rockCountAi + 1;
    document.getElementById("browser_pic").src = "./images/rock.png";
  }
  if(ai_throw==3){
    updateMessage("display_results", player_name + " threw rock. B(r)owser threw scissors. You win!");
    scissorsCountAi = scissorsCountAi + 1;
    winCount = winCount + 1;
    document.getElementById("browser_pic").src = "./images/scissors.png";
  }
}

if(selected=="scissors"){
  scissorsCount = scissorsCount+1;
  document.getElementById("player_pic").src = "./images/scissors_player.png";
  if(ai_throw==1){
    updateMessage("display_results", player_name + " threw scissors. B(r)owser threw paper. You win!");
    paperCountAi = paperCountAi + 1;
    winCount = winCount + 1;
    document.getElementById("browser_pic").src = "./images/paper.png";
  }
  if(ai_throw==2){
    updateMessage("display_results", player_name + " threw scissors. B(r)owser threw rock. You lose!");
    rockCountAi = rockCountAi + 1;
    loseCount = loseCount + 1;
    document.getElementById("browser_pic").src = "./images/rock.png";
  }
  if(ai_throw==3){
    updateMessage("display_results", player_name + " threw scissors. B(r)owser threw scissors. It's a tie!");
    scissorsCountAi = scissorsCountAi + 1;
    document.getElementById("browser_pic").src = "./images/scissors.png";
  }
}

if(gameCount>0){
  updateMessage("games_played", "Games played: " + gameCount);
  updateMessage("total_wins", "Total wins: " + winCount);
  if(winCount>0||loseCount>0){
    updateMessage("win_loss_ratio", "Win/Loss ratio: " + ((winCount)/(winCount+loseCount)*100).toFixed(0) + "% - " + ((loseCount)/(winCount+loseCount)*100).toFixed(0) +"%");
  }
  updateMessage("player_stats", "Player throws: rock - " + ((rockCount)/(gameCount)*100).toFixed(0) +"%, scissors - " + ((scissorsCount)/(gameCount)*100).toFixed(0) + "%, paper - " + ((paperCount)/(gameCount)*100).toFixed(0) + "%");
  updateMessage("browser_stats", "B(r)owser throws:  rock - " + ((rockCountAi)/(gameCount)*100).toFixed(0) +"%, scissors - " + ((scissorsCountAi)/(gameCount)*100).toFixed(0) + "%, paper - " + ((paperCountAi)/(gameCount)*100).toFixed(0) + "%");
}

});

var player_name = localStorage.getItem('player_name');
updateMessage("display_name", "Play the game,  " + player_name + "!");

submit_name_button.addEventListener("click", function(){
  var input = document.getElementById("name").value;
  player_name = localStorage.setItem("player_name", input);
  document.getElementById("enter_name").classList.remove("visible");
  document.getElementById("enter_name").classList.add("hidden");
  document.getElementById("throw_choice").classList.remove("hidden");
  document.getElementById("throw_choice").classList.add("visible");

  player_name = localStorage.getItem('player_name');
  updateMessage("display_name", "Play the Game,  " + player_name + "!");

  document.getElementById("give_feedback").style.color = "green";
  updateMessage("give_feedback", "Name successfully saved!");
});

if(!player_name){
  document.getElementById("enter_name").classList.remove("hidden");
  document.getElementById("enter_name").classList.add("visible");
  document.getElementById("give_feedback").style.color = "red";
  updateMessage("give_feedback", "Please enter your name.");
}

else{
  document.getElementById("give_feedback").style.color = "green";
  updateMessage("give_feedback", "Name successfully saved!");
  document.getElementById("enter_name").classList.remove("visible");
  document.getElementById("enter_name").classList.add("hidden");
  document.getElementById("throw_choice").classList.remove("hidden");
  document.getElementById("throw_choice").classList.add("visible");
}

function updateMessage(text_element, message){
  document.getElementById(text_element).textContent = message;
}

function makeToggable(button_element, div_element){
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }
    else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
    }
  });
}
