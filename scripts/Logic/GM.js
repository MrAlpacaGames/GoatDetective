class GM
{
    constructor()
    {
        //----------------------------
        // Attributes
        //---------------------------
        this.canMove = true;
        this.HUDInteracted = false;

        /**
         * This is the state of the Game.
         * 0 = The Game has just started. The only room available is the Main Hall.
         * 1 = The Player has Went to the Office for the first time
         * 2 = 
         */
        this.stateOfGame = 0;

        this.caseSolution = ["Lee", "VenomousPin"];
    }

    /**
     * Method that tries to solve the mystery. If the human and weapon are correct we open the winner window. If not
     * We open the Game Over Window
     * @param {*Person who killed Park} Human 
     * @param {*Weapon used to kill Park} Weapon 
     */
    solveGame(Human, Weapon)
    {
        if(Human == this.caseSolution[0] && Weapon == this.caseSolution[1])
        {
            // YOU WIN THE GAME
        }
        else
        {
            // YOU LOSE THE GAME
            this.showLoseScreen();
        }
    }

    winGame()
    {

    }

    showLoseScreen()
    {
        currentPlayerHUD.openSpecialScreen(false, true);
    }

    loseGame()
    {
        this.restartGame();
    }

    restartGame()
    {
        // GM Values
        this.canMove = true;
        this.HUDInteracted = false;
        this.stateOfGame = 0;
        // Notebook Restart
        playerNotebook = undefined;
        playerNotebook = new Notebook();

        // Player Restart
        thePlayer = undefined;
        thePlayer =  new FrontPlayer();

        // Music and SFX
        theGame.sound.stopAll();
        theGame.sound.setVolume(1);

        theGame.scene.scenes.forEach(temp => {
            theGame.scene.stop(temp.scene.key);
        });
        theGame.scene.start('MainMenu');
        //theGame.scene.destroy();
    }


    loadLastCheckpoint()
    {

    }


    

    
}