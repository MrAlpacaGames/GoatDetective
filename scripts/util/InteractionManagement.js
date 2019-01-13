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
        console.log("You want to interact with: "+interactionObject);
        let parkTemp = GameManager.getCharacter();
        if(interactionObject == "hallDoor" || interactionObject == "officeDoor" || interactionObject == "studioDoor" || interactionObject == "dressromDoor")
        {
            if(GameManager.canMove == true)
            {
                // If we are interacting with a door we load the new scene
               this.interactDoors(interactionObject);
            }
        }
        //
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

    interactPeople(interactionObject)
    {
        
    }

    printJojo()
    {
        console.log("-Jojo! \n-Dio!");
    }
}