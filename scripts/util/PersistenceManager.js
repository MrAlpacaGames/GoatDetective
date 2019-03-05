class PersistenceManager
{
    constructor()
    {
        //-------------------------
        // Variables
        //-------------------------
        this.savedState;

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
        //this.clearGameState();
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
        console.log("Game State Changed. New State is: "+localStorage.getItem('GoatGameState'));
    }

    /**
     * Erase the game state saved by the player
     */
    clearGameState()
    {
        this.savedState = 0;
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
        //this.updateSaveState(4);
        this.savedState = this.getSavedState();

        // First we update the Game State
        GameManager.stateOfGame = parseInt(this.savedState);

        // I. We need to set the notebook in its new state
        playerNotebook.loadNotebook(this.savedState);
    }
}