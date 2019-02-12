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
        //console.log("Interacting with: "+interactionObject);
        if(GameManager.canMove == true)
        {
            if(interactionObject == "hallDoor" || interactionObject == "officeDoor" || interactionObject == "studioDoor" || interactionObject == "dressromDoor" 
            || interactionObject == "offToHall" || interactionObject == "studioToHall" || interactionObject == "dressToHall")
            {
                if(interactionObject == "studioDoor" && playerNotebook.hasTheKey == false) // If we try to enter the studio but we don't have the key
                {
                    dialogueManager.startDialogue("SGoatman0xErr");
                }
                else
                {
                    this.interactDoors(interactionObject);
                }
            }
            else if(interactionObject == "JungDrawer" || interactionObject == "ParkDrawer" || interactionObject == "LeeDrawer")
            {
                this.interactDrawer(interactionObject);
            }
            else
            {
                this.interactWithClue(interactionObject);               
            }
        }
    }

    /**
     * Searchs for the ID of the clue and starts a Dialogue
     * @param {*Name of the object that we are interacting with} interactionObject 
     */
    interactWithClue(interactionObject)
    {
        if(interactionObject == "PoisonedPark") interactionObject = "Park";
        let clue = playerNotebook.getClue(interactionObject);   

        // We open the clue
        let dialogueID;

        if(clue.clueType == "Humans" && clue.name != "Park")
        {
            let direction = thePlayer.player.x - currentClickedElement.x;
            let shouldFlip;
            (direction > 0) ? shouldFlip = true : shouldFlip = false; // If is > 0 it means we are at the right of the human
            currentClickedElement.setFlip(shouldFlip);
        }
        
        if(interactionObject == "Park" && clue.discovered == true)
        {
            currentDialogueHUD.currentClueTalkingTo = clue;
            currentDialogueHUD.openParkOptions(false);
            GameManager.canMove = false;
        }
        else
        {
            currentDialogueHUD.currentClueTalkingTo = clue;
            dialogueID = clue.getCurrentInitialDialogue();
            if(interactionObject == "Recorder" && playerNotebook.dialoguesTaken.get("RuruConfrontation2x1") == undefined)
            {
                dialogueID = "SGoatman0xErr3";
            }
            dialogueManager.startDialogue(dialogueID);
        }

        // We set the music for the conversation
        if(clue.name == "Jung" || clue.name == "Lee")
        {
            musicManager.changeTheme('KStar');
        }
        else if(clue.name == "Park" )
        {
            musicManager.changeTheme('Notebook');
        }
        else if(clue.name == "Assattari")
        {
            musicManager.changeTheme('Lioness');
        }
        else if(clue.name == "Ruru")
        {
            musicManager.changeTheme('BiggestFan');
        }
    }

    interactDrawer(interactionObject)
    {
        let ID;
        if(interactionObject == "ParkDrawer" && playerNotebook.dialoguesTaken.get("AssattariConfrontation2x1") == undefined) // If it's Park Drawer we check if we have already talked with Ruru
        {
            ID = "SGoatman0xErr2";
        }
        else
        {
            ID = "Goatman" + interactionObject + "1xUN";
        }
        dialogueManager.startDialogue(ID);
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
                persistenceManager.reloadGameState();
                if(persistenceManager.getSavedState() > 0) musicManager.changeTheme('Exploring');
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
        let theClue;
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
        sfxManager.playSFX(1);
        loadScene(newSceneName);
    }
}