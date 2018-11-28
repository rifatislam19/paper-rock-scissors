class Player {
  cosntructor() {
    this["games"] = 0;
    this["wins"] = 0;
    this["losses"] = 0;
    this["paper"] = 0;
    this["rock"] = 0;
    this["scissors"] = 0;
  }
}

var submit_name_button=document.getElementById("submit_name");
var submit_name_div = document.getElementById("name");

var throw_choice_button=document.getElementById("throw_choice_button");
var replay_button=document.getElementById("replay_button");

var player = JSON.parse(localStorage.getItem("player"));
var browser = JSON.parse(localStorage.getItem("browser"));
if(!player){
  player = new Player();
}
if(!browser){
  browser = new Browser();
}

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
  document.getElementById("game_results").classList.remove("visible");
  document.getElementById("game_results").classList.add("hidden");
}
if(selected!="blank"){
  document.getElementById("give_feedback").style.color = "green";
  updateMessage("give_feedback", "Choice successfully thrown!");
  player["games"] += 1;
  browser["games"] += 1;
  document.getElementById("game_results").classList.remove("hidden");
  document.getElementById("game_results").classList.add("visible");
}

if(selected=="paper"){
  player["paper"] += 1;
  document.getElementById("player_pic").src = "./images/paper_player.png";
  if(ai_throw==1){
    updateMessage("display_results", player_name + " threw paper. B(r)owser threw paper. It's a tie!");
    browser["paper"] += 1;
    document.getElementById("browser_pic").src = "./images/paper.png";
  }
  if(ai_throw==2){
    updateMessage("display_results", player_name + " threw paper. B(r)owser threw rock. You win!");
    browser["rock"] += 1;
    player["wins"] += 1;
    browser["losses"] += 1;
    document.getElementById("browser_pic").src = "./images/rock.png";
  }
  if(ai_throw==3){
    updateMessage("display_results", player_name + " threw paper. B(r)owser threw scissors. You lose!");
    browser["scissors"] += 1;
    player["losses"] += 1;
    browser["losses"] += 1;
    document.getElementById("browser_pic").src = "./images/scissors.png";
  }
}

if(selected=="rock"){
  player["rock"] += 1;
  document.getElementById("player_pic").src = "./images/rock_player.png";
  if(ai_throw==1){
    updateMessage("display_results", player_name + " threw rock. B(r)owser threw paper. You lose!");
    browser["paper"] += 1;
    player["losses"] += 1;
    browser["wins"] += 1;
    document.getElementById("browser_pic").src = "./images/paper.png";
  }
  if(ai_throw==2){
    updateMessage("display_results", player_name + " threw rock. B(r)owser threw rock. It's a tie!");
    browser["rock"] += 1;
    document.getElementById("browser_pic").src = "./images/rock.png";
  }
  if(ai_throw==3){
    updateMessage("display_results", player_name + " threw rock. B(r)owser threw scissors. You win!");
    browser["scissors"] += 1;
    player["wins"] += 1;
    browser["losses"] +=1;
    document.getElementById("browser_pic").src = "./images/scissors.png";
  }
}

if(selected=="scissors"){
  player["scissors"] += 1;
  document.getElementById("player_pic").src = "./images/scissors_player.png";
  if(ai_throw==1){
    updateMessage("display_results", player_name + " threw scissors. B(r)owser threw paper. You win!");
    browser["paper"] += 1;
    player["wins"] += 1;
    document.getElementById("browser_pic").src = "./images/paper.png";
  }
  if(ai_throw==2){
    updateMessage("display_results", player_name + " threw scissors. B(r)owser threw rock. You lose!");
    browser["rock"] += 1;
    player["losses"] += 1;
    document.getElementById("browser_pic").src = "./images/rock.png";
  }
  if(ai_throw==3){
    updateMessage("display_results", player_name + " threw scissors. B(r)owser threw scissors. It's a tie!");
    browser["scissors"] += 1;
    document.getElementById("browser_pic").src = "./images/scissors.png";
  }
}

localStorage.setItem("player",JSON.stringify(player));
localStorage.setItem("browser",JSON.stringify(browser));

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

if( (!player_name) || (player_name=="") ){
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
