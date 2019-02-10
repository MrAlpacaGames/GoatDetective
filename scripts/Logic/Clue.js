class Clue
{
    constructor(theName, theClueType, clueIndex)
    {
        //---------------------------
        // Variables
        //---------------------------
        // Name of the Clue
        this.name = theName;
        // Full Name of the Clue
        this.fullName;
        // Index of the Clue
        this.index = clueIndex;
        // Type 
        this.clueType = theClueType;
        // Array of descriptions of the clue
        this.description;
        // Tells if this clue has been discovered or not
        this.discovered = false;

        //----------------------------------
        // Initial Dialogues
        //----------------------------------
        // Array of indexes of the initial dialogues
        this.initialDialogues = [];
        // Initial Dialogues Current Index
        this.inDialoguesIndex = 0;

        //--------------------------------------
        // Notebook Notes
        //--------------------------------------
        this.noteBookID;

        this.noteBookNote = "";

        this.noteBookIndex = 0;

        //--------------------------------------
        // Confrontation
        //--------------------------------------
        // Confront Requirements
        this.confrontationRequirements;

        // Bool that defines if the human has been confronted
        this.hasBeenConfronted = false;
    }

    //------------------------------
    // Functions
    //------------------------------

    /**
     * We add a new initial dialogue to the array. We can have up to 3 Dialogues. 
     * The First one is before talking to the body. The second one is after talking to the body
     * And the Third one is the one after talking to the body
     * @param {*The new initial dialogues to be added} dialogue 
     */
    addInitialDialogues(dialogues)
    {
        dialogues.forEach(element => {
            this.initialDialogues.push(element);
        });
    }

    /**
     * Returns the current initial dialogue
     */
    getCurrentInitialDialogue()
    {
        let answer;
        if(this.clueType == "Weapons" || this.clueType == "Items")
        {
            answer = this.initialDialogues[0];
        }
        else
        {
            if(GameManager.stateOfGame > 0 && this.inDialoguesIndex < 1) // We have already discovered the body but not talked the first time
            {
                this.inDialoguesIndex = 1;
            }
            else if(GameManager.stateOfGame == 0)
            {
                (this.name == 'Park') ? this.inDialoguesIndex = 1 : this.inDialoguesIndex = 0;
            }
            else if(GameManager.stateOfGame > 0 && this.inDialoguesIndex == 1)
            {
                this.inDialoguesIndex = 2;
            }
            answer = this.initialDialogues[this.inDialoguesIndex];
        }
        return answer;
    }

    getName()
    {
        return this.name;
    }

    getDescription()
    {
        return this.description;
    }
}