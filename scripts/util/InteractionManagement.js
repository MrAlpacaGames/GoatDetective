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
        console.log("Interacting with: "+interactionObject);
        if(GameManager.canMove == true)
        {
            if(interactionObject == "hallDoor" || interactionObject == "officeDoor" || interactionObject == "studioDoor" || interactionObject == "dressromDoor" 
            || interactionObject == "offToHall" || interactionObject == "studioToHall" || interactionObject == "dressToHall")
            {
                if(interactionObject == "studioDoor" && playerNotebook.hasTheKey == false) // If we try to enter the studio but we don't have the key
                {
                    //dialogueManager.startDialogue("SPet0xErr");
                    currentPlayerHUD.showNewNoteMessage();
                }
                else
                {
                    this.interactDoors(interactionObject);
                }
            }
            else
            {

            }
            /**  
            else if(interactionObject == "Park" || interactionObject == "Jung" || interactionObject == "Assattari" || interactionObject == "Lee" 
            || interactionObject == "Ruru")
            {

            }
            else if(interactionObject == "Chicken Diamondo")
            {

            }
            */
        }
    }

    /**
     * Searchs for the ID of the clue and starts a Dialogue
     * @param {*Type of the Clue that we are interacting.} type 
     * @param {*Name of the object that we are interacting with} interactionObject 
     */
    interactWithClue(type, interactionObject)
    {
        let clue = playerNotebook.searchClue(type, interactionObject);
        let dialogueID;
        if(clue.name == "Park" && GameManager.stateOfGame == 0)
            GameManager.stateOfGame = 1;     
        dialogueID = clue.getCurrentInitialDialogue();
        
        if(interactionObject == "Park" && clue.discovered == true)
        {
            currentDialogueHUD.openParkOptions(false);
            GameManager.canMove = false;
        }
        else
        {
            dialogueManager.startDialogue(dialogueID);
            currentDialogueHUD.currentPersonTalkingTo = clue;
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

    /**
     * Method that creates the Scene Name and then loads the scene
     * @param {*Name of the new Scene to switch to} interactionObject 
     */
    interactDoors(interactionObject)
    {
        let newSceneName;
        let clueName;
        if(interactionObject == "offToHall" || interactionObject == "studioToHall" || interactionObject == "dressToHall")
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
                case "studioDoor":
                    newSceneName = "StudioScene";
                break;
                case "dressromDoor":
                    newSceneName = "DressroomScene";
                break;
            }
        }
        clueName = newSceneName.slice(0, newSceneName.length-5);
        playerNotebook.discoverClue(clueName);

        loadScene(newSceneName);
    }

    /**
     * Method that opens the notebook
     * @param {*True if we want to open it. False if we want to close it} newValue 
     */
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
}