class PersistenceManager
{
    constructor()
    {
        //-------------------------
        // Variables
        //-------------------------
        this.savedState = this.getSavedState();
    }

    //-------------------------
    // Functions
    //-------------------------
    /**
     * Gets the saved state of the game
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
        localStorage.setItem('GoatGameState', newState);
    }

    /**
     * Erase the game state saved by the player
     */
    clearGameState()
    {
        localStorage.clear();
    }

    /**
     * When the player hits retry or loads the game again. We load the last saved state
     */
    reloadGameState()
    {
        // I. We need to set the notebook in its new state

        // II. We need to set the scenes to the new state
    }
}