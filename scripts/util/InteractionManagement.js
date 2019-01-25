class InteractionManagement
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Current Scene
        
    }

    //------------------------------
    // FUNCTIONS
    //------------------------------
    /**
     * Method that interacts with a clue, item in the game
     * @param {*Object with who we are interacting with} interactionObject 
     */
    interact(interactionObject)
    {
        let theType;
        //console.log("You want to interact with: "+interactionObject);
        if(interactionObject == "hallDoor" || interactionObject == "offToHall" || interactionObject == "officeDoor" || interactionObject == "studDoor" || interactionObject == "dressDoor")
        {
            theType = "Doors";
        }
        else if(interactionObject == "Park" || interactionObject == "Jung" || interactionObject == "Assattari" || interactionObject == "Lee" || interactionObject == "Ruru")
        {
            theType = "Suspects";  
        }
        if(GameManager.canMove == true)
        {
            // We interact with a character
            this.interactWithClue(theType, interactionObject);
        }
    }

    /**
     * Searchs for the ID of the clue and starts a Dialogue
     * @param {*Type of the Clue that we are interacting.} type 
     * @param {*Name of the object that we are interacting with} interactionObject 
     */
    interactWithClue(type, interactionObject)
    {
        if(type == "Doors")
        {
            this.interactDoors(interactionObject);
        }
        else
        {
            let clue = playerNotebook.searchClue(type, interactionObject);
            let dialogueID;
            if(clue.name == "Park" && GameManager.stateOfGame == 0)
                GameManager.stateOfGame = 1;     
            dialogueID = clue.getCurrentInitialDialogue();
            if(clue.discovered == false && GameManager.stateOfGame == 1)
            {
                playerNotebook.discoverClue(clue.index, type);
            }
            dialogueManager.startDialogue(dialogueID);
            currentScene.dialogue.currentPersonTalkingTo = clue;
        }
    }

    /**
     * Method that will allow to execute the given action from the menu
     * @param {Option in the menu} option 
     */
    interactMenu(option)
    {
        switch(option)
        {
            case "Start":
                loadScene("HallScene");
            break;
            case "Credits":

            break;
            case "Mute":
                musicManager.muteMusic();
            break;
        }
    }

    interactDoors(interactionObject)
    {
        let newSceneName;
        if(interactionObject == "offToHall" || interactionObject == "hallDoor")
        {
            newSceneName = "HallScene";
        }
        else
        {
            switch(interactionObject)
            {
                case "officeDoor":
                    newSceneName = "OfficeScene";
                break;
            }
        }
        loadScene(newSceneName, true);
    }

    openNotebook(newValue)
    {
        if(newValue == true)
        {
            // We open the Notebook
            previousScene = currentScene;
            currentScene.scene.switch('UINotebook');
            currentScene = "UINotebook";
        }
        else
        {
            // We open the Notebook
            currentScene.scene.switch(previousScene);
            currentScene = previousScene;
            previousScene = "UINotebook";
        }
    }

    nextDialogue()
    {
        // We first check if we are already writing some text. If yes we skip. If not we pass to the next option
        if(currentScene.dialogue.isWriting == true) 
        {
            currentScene.dialogue.skipText();
        }
        else
        {
            dialogueManager.checkNextD();
        }
    }
}