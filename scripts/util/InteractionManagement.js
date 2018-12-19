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
            // If we are interacting with a door we load the new scene
           this.interactDoors(interactionObject);
        }
        //
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
}