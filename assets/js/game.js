var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple value values at once like this console.log(playerName, playerAttack, playerHealth);
var enemyNames = ["Roborto", "Amy Andriod", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
    //repeat and execute as long as the enemy robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if player choses to skip, then confirm skip and end loop
        if (promptFight=== "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you want to quit?");
            //if yes (true), leave fight 

            if (confirmSkip) {
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }            
            // remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

             // check enemy's health
            if (enemyHealth<=0) {
              window.alert(enemyName + " has died!");
              // award palyer money for winning
              playerMoney = playerMoney + 20;
              //leave while() loop since enemy is dead
              break;
        
            } else {
              window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
    
            //remove player's health by subtracting the amount set in the enemyAttack variable
            playerHealth =  playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
            // check player's health
            if (playerHealth<=0) {
               window.alert(playerName + " has died!");
               break;
            }  else {
               window.alert(playerName + " still has " + playerHealth + " health left.");
            }
    }
};        
        
//fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function(){
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;  
  for (var i = 0; i < enemyNames.length; i++) {
    //if player is still alive, keep fighting
    if (playerHealth > 0) {
        //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

        //pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];

        //reset renemyHealth before starting new fight
        enemyHealth = 50;

        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parament
        fight(pickedEnemyName);
    }
    //if player isn't alive, stop the game
    else {
        window.alert('You have lost your robot in battle! Game Over!');
        break;
    }
  } 
  //after loop ends, we are either out of playerHealth or enemies to fight, so run the end game function
  endGame(); 
};

//funtion to end entire game
var endGame = function() {
    //of player is still alove, player wins
    if (playerHealth > 0) {
        window.alert('Great job, you have survived the game! You now have a score of ' + playerMoney + '.');
    }
    else {
        window.alert('You have lost your robot in battle.');
    }
  //ask player if they want to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');
    
    if (playAgainConfirm) {
        startGame();
    } 
    else {
        window.alert('Thanks for playing Robot Gladiators! Come back soon!');
    }
};

//start first game when page loads
startGame();
