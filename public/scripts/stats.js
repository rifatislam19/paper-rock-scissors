
var player = JSON.parse(localStorage.getItem("player"));

function updateMessage(text_element, message){
  document.getElementById(text_element).textContent = message;
}

if(player["games"]>0){
  var new_player = JSON.parse(localStorage.getItem("player"));
  var new_browser = JSON.parse(localStorage.getItem("browser"));
  updateMessage("games_played", "Games played: " + new_player["games"]);
  updateMessage("total_wins", "Total wins: " + new_player["wins"]);
  if(parseInt(player["wins"])>0||parseInt(player["losses"])>0){
    updateMessage("win_loss_ratio", "Win/Loss ratio: " + parseInt(new_player["wins"]) + " - " + parseInt(new_player["losses"]));
  }
  updateMessage("player_stats", "Player throws: rock - " + ((parseInt(new_player["rock"])/parseInt(new_player["games"]))*100).toFixed(0) +"%, scissors - " + ((parseInt(new_player["scissors"])/parseInt(new_player["games"]))*100).toFixed(0) + "%, paper - " + ((parseInt(new_player["paper"])/parseInt(new_player["games"]))*100).toFixed(0) + "%");
  updateMessage("browser_stats", "B(r)owser throws:  rock - " + ((parseInt(new_browser["rock"])/parseInt(new_browser["games"]))*100).toFixed(0) +"%, scissors - " + ((parseInt(new_player["scissors"])/parseInt(new_player["games"]))*100).toFixed(0) + "%, paper - " + ((parseInt(new_player["paper"])/parseInt(new_player["games"]))*100).toFixed(0) + "%");
}
