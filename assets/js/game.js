
//funtion to generate random numeric values
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
    //repeat and execute as long as the enemy robot is alive
    while(playerInfo.health > 0 && enemy.Health > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if player choses to skip, then confirm skip and end loop
        if (promptFight=== "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you want to quit?");
            //if yes (true), leave fight 

            if (confirmSkip) {
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                //subtract money from playerMoney for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerMoney", playerInfo.money);
                break;
            }
        }            
            // remove enemy's health by subtracting the amount set in the playerAttack variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.Health = Math.max(0, enemy.Health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.Name + ". " + enemy.Name + " now has " + enemy.Health + " health remaining."
            );

             // check enemy's health
            if (enemy.Health<=0) {
              window.alert(enemy.Name + " has died!");
              // award palyer money for winning
              playerInfo.money = playerInfo.money + 20;
              //leave while() loop since enemy is dead
              break;
        
            } else {
              window.alert(enemy.Name + " still has " + enemy.Health + " health left.");
            }
    
            //remove player's health by subtracting the amount set in the enemyAttack variable
            var damage = randomNumber(enemy.Attack - 3, enemy.Attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.Name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
            // check player's health
            if (playerInfo.health<=0) {
               window.alert(playerInfo.name + " has died!");
               break;
            }  else {
               window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
    }
};        
        
//fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function(){
  playerInfo.health = 100;
  playerInfo.attack = 10;
  playerInfo.money = 10;  
  for (var i = 0; i < enemyInfo.length; i++) {
    //if player is still alive, keep fighting
    if (playerInfo.health > 0) {
        //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

        //pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyObj = enemyInfo[i];

        //reset renemyHealth before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);

        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parament
        fight(pickedEnemyObj);

        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            //ask if player wants to use the store before next round
            var storeConfirm = window.confirm('The fight is over, do you want visit the store before the next round?');

            //if yes, take them to the store() function
            if (storeConfirm) {
                shop();
            }          
        }
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
    if (playerInfo.health > 0) {
        window.alert('Great job, you have survived the game! You now have a score of ' + playerInfo.money + '.');
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
var shop = function() {
    var shopOptionPrompt = window.prompt('Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter "REFILL", "UPGRADE", or "LEAVE".');

    switch (shopOptionPrompt) {
        case 'REFILL': // new case
        case 'refill':
            if (playerInfo.money >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerInfo.health = playerInfo.health + 20;
                playerInfo.money = playerInfo.money - 7;
            } 
            else {
                window.alert("You don't have enough money!");        
            }
            break;
        
        case 'UPGRADE': // new case    
        case 'upgrade':
            if (playerInfo.money >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                 //increase attack and decrease money
                playerInfo.attack = playerInfo.attack + 6;
                playerInfo.money = playerInfo.money - 7;
            }
            else {
                window.alert("You don't have enought money!");
            }
            break;

        case 'LEAVE':     
        case 'leave':
            window.alert("Leaving the store.");
            
            //do nothing, so function will end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");
            
            //call shop () again to force player to pick a valid option

    }
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
    },
    refillHealth: function() {
      if (this.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
      } 
      else {
        window.alert("You don't have enough money!");
      }
    },
    upgradeAttack: function() {
      if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
      } 
      else {
        window.alert("You don't have enough money!");
      }
    }
  };
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyNames[0]['attack']);
/*END GAME*/

/*RUN GAME*/
startGame();
