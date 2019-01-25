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

    

    
}