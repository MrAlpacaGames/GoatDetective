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

        this.caseSolution = ["Lee", "Poisoned"];
    }

    /**
     * Method that tries to solve the mystery. If the human and weapon are correct we open the winner window. If not
     * We open the Game Over Window
     * @param {*Person who killed Park} Human 
     * @param {*Weapon used to kill Park} Weapon 
     */
    solveGame(Human, Weapon)
    {
        let won;
        (Human == this.caseSolution[0] && Weapon == this.caseSolution[1]) ? won = true : won = false;
        this.showFinalDialogue(won);
    }

    showFinalDialogue(PlayerWon)
    {
        let dialogueID;
        globalLockdown = true;
        if(PlayerWon)
        {
            dialogueID = "GoatmanVictory";
            currentScene.activateBlacEndingWindow(true);
            endingPlaying = true;
        }
        else
        {
            dialogueID = "GoatmanDefeat";
        }
        dialogueManager.startDialogue(dialogueID);
    }

    backToTitle()
    {
        this.restartGame();        
        theGame.scene.start('MainMenu');
        //theGame.scene.destroy();
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
        musicManager.mainWebSound.stop();
        musicManager.mainWebSound = undefined;
    }


    loadLastCheckpoint()
    {

    }


    

    
}