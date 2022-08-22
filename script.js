(function(){
    "use strict";
    const gameArea = document.getElementById("game")
    const actionArea = document.getElementById("actions")
    const scoreArea = document.getElementById("score")
    const gamecontrolArea = document.getElementById("gamecontrol")
    const startGameButton = document.getElementById("startgame")

    const GameData ={
        images:['1die.jpg','2die.jpg','3die.jpg','4die.jpg','5die.jpg','6die.jpg'],
        players:["Kashir" , "Arham"],
        Scores:[0,0],
        index: 0,
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        gameEnd: 100
    }

    startGameButton.addEventListener("click" , function(){
        gamecontrolArea.innerHTML = ' <h2> The Game has started </h2> '
        gamecontrolArea.innerHTML += ' <button id="quit">Wanna Quit!!</button> '
        document.getElementById("quit").addEventListener("click" , function(){
            location.reload();
        })
        GameData.index = Math.round(Math.random())
        turnSetup()
    } )


    function turnSetup(){
        gameArea.innerHTML = ` <p> Roll the dice for ${GameData.players[GameData.index]}  </p> `
        actionArea.innerHTML = ' <button id="rollDise">Roll the dice</button> '
        document.getElementById("rollDise").addEventListener("click" , function(){
            rollingDice()
        } )
    }

    function rollingDice(){
        gameArea.innerHTML = ""
        gameArea.innerHTML = ` <p> Roll the dice for ${GameData.players[GameData.index]}  </p> `
        GameData.roll1 = Math.floor((Math.random() * 6))+1
        GameData.roll2 = Math.floor((Math.random() * 6))+1
        gameArea.innerHTML += ` <img src="${GameData.images[GameData.roll1-1]} "> ` 
        gameArea.innerHTML += ` <img src="${GameData.images[GameData.roll2-1]} "> ` 
        
        // GameData.roll1 = 1
        // GameData.roll2 = 1
        
        GameData.rollSum = GameData.roll1  + GameData.roll2

        if(GameData.rollSum === 2){
            gameArea.innerHTML += "<p> Ooooooh snap!!  Snake eyes</p>"
            GameData.Scores[GameData.index] = 0
            settingScore()
            GameData.index? (GameData.index = 0) : (GameData.index = 1);
            actionArea.innerHTML = ""
            setTimeout(turnSetup ,2000 )

        }

        else if(GameData.roll1 === 1 || GameData.roll2 === 1){
            GameData.index? (GameData.index = 0) : (GameData.index = 1); 
            gameArea.innerHTML += ` <br> Sorry one of your rolls was 1, So  switching to ${ GameData.players[GameData.index] } `
            actionArea.innerHTML = ""
            setTimeout(turnSetup ,2000 )  
        }
        else{
            actionArea.innerHTML = ""
            GameData.Scores[GameData.index] = GameData.Scores[GameData.index]  + GameData.rollSum;
            actionArea.innerHTML +=  ' <button id="rollAgain">Roll Again</button> '
            actionArea.innerHTML +=  ' <button id="pass">Pass</button> '

            document.getElementById("rollAgain").addEventListener("click" ,function(){
                rollingDice()
            } )

            document.getElementById("pass").addEventListener("click" ,function(){
                GameData.index? (GameData.index = 0) : (GameData.index = 1); 
                turnSetup()
            } )
            settingScore()
            checkingVictory()



        }


    }


    function settingScore(){
        scoreArea.innerHTML = ` The score is currently: <strong> ${GameData.players[0]} : ${GameData.Scores[0]}    ${GameData.players[1]} : ${GameData.Scores[1]}  </strong>`
    }

    function checkingVictory(){
        if(GameData.Scores[GameData.index] > GameData.gameEnd   ){
            actionArea.innerHTML = ""   
            scoreArea.innerHTML = ` <strong> ${GameData.players[GameData.index]} wins with ${GameData.Scores[GameData.index]} points </strong> `;
        }
    }

 
    


}())