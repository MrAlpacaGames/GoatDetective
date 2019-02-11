class PersistenceManager
{
    constructor()
    {
        //-------------------------
        // Variables
        //-------------------------
        this.savedState = this.getSavedState();

        // There are the thing we must have in mind to update when we want to load the new state of the game again

        //-----------------------------
        // State of Park
        //-----------------------------
        this.perXWhitePark;
        this.perXPoisonedPark;

        //-----------------------------
        // Weapons
        //-----------------------------
        this.perXPuddle;
        this.perXChicken;
        this.perXKey;

        //--------------------------------------------------
        // Flags to determine if we have completed loading
        //-------------------------------------------------- 
        this.parkHasChanged = false;

        this.weaponsChanged = [false, false, false];

        this.noteBookChanged = false;

        //---------------------------------------------------------
        // Change to false. Only when we win the game or we lose it
        //---------------------------------------------------------
        this.hasCompletedLoading = false;
        this.clearGameState();
    }

    //-------------------------
    // Functions
    //-------------------------
    /**
     * Gets the saved state of the game.
     */
    getSavedState()
    {
        let answer = localStorage.getItem('GoatGameState');
        if(answer == undefined) answer = 0;
        return answer;
    }

    /**
     * Sets a newsaved state of the game
     */
    updateSaveState(newState)
    {
        this.savedState = newState;
        localStorage.setItem('GoatGameState', newState);
        console.log("Game State Changed. New State is: "+this.savedState);
    }

    /**
     * Erase the game state saved by the player
     */
    clearGameState()
    {
        localStorage.clear();
    }
    
    /**
     * Checks if we have completed our loading of the world
     */
    areAllFlagsComplete()
    {
        let answer = false;
        answer = this.parkHasChanged;
        this.weaponsChanged.forEach(element => {
            answer = element;
        });
        answer = this.noteBookChanged;
        if(answer) this.hasCompletedLoading = true;
        return answer;
    }

    /**
     * When the player hits retry or loads the game again. We load the last saved state
     */
    reloadGameState()
    {
        //this.savedState = this.getSavedState();
        this.updateSaveState(2);

        // First we update the Game State
        GameManager.stateOfGame = this.savedState;

        // I. We need to set the notebook in its new state
        playerNotebook.loadNotebook(this.savedState);
        // II. We need to set the scenes to the new state
        //this.reloadScenariosItems();

        // III. We restart all the theme songs available
        musicManager.restartAllMusic();
    }

    reloadScenariosItems()
    {       
        if(GameManager.stateOfGame > 1)
        {
            // We are +2 state of game and we have already taken the key and the chicken. 
            // We also have interacted with the recorder
            let hall = getScene('HallScene');
            hall.sweatyPuddle.disableInteractive();

            let office = getScene('OfficeScene');
            office.chickenDiamando.visible = false;
        }
    }

    retry()
    {
        currentScene.scene.start('HallScene');
        musicManager.playThemeSong('Main');
    }
}