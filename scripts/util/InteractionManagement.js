class InteractionManagement
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Current Scene
        
    }

    interact(interactionObject)
    {
        //console.log("You want to interact with: "+interactionObject);
        if(interactionObject == "hallDoor" || interactionObject == "officeDoor" || interactionObject == "studioDoor" || interactionObject == "dressromDoor")
        {
            if(GameManager.canMove == true)
            {
                // If we are interacting with a door we load the new scene
               this.interactDoors(interactionObject);
            }
        }
        else if(interactionObject == "Park" || interactionObject == "Jung" || interactionObject == "Assattari" || interactionObject == "Lee" || interactionObject == "Ruru")
        {
            if(GameManager.canMove == true)
            {
                // We interact with a character
                this.interactPeople(interactionObject);
            }
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
        switch(interactionObject)
        {
            case "hallDoor":
                newSceneName = "HallScene";
            break;
            case "officeDoor":
                newSceneName = "OfficeScene";
            break;
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
            dialogueManager.checkNextD(0);
        }
    }

    /**
     * The longest method in the whole game D: Controls the dialogues to be shown according to each character
     * @param {*Character with whom we are interacting} interactionObject 
     */
    interactPeople(interactionObject)
    {
        switch(interactionObject)
        {
            case "Park":
                if(playerNotebook.characters[0].discovered == false)
                {
                    playerNotebook.discoverClue(0, "Character");
                }
                    switch(GameManager.stateOfGame)
                    {
                        case 0:
                            dialogueManager.setDialogue("GS0D04");
                            GameManager.stateOfGame = 1;
                        break;
                        case 1:
                            dialogueManager.setDialogue("GS1D00");
                        break;
                    }
            break;
            case "Jung":
                if(playerNotebook.characters[1].discovered == false)
                {
                    playerNotebook.discoverClue(1, "Character");
                }
                    switch(GameManager.stateOfGame)
                    {
                        case 0:
                            dialogueManager.setDialogue("GS0D08");
                        break;
                        case 1:
                            dialogueManager.setDialogue("GS1D05");
                        break;
                    }
            break;
        }
    }


}