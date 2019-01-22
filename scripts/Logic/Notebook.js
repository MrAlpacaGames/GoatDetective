class Notebook
{
    constructor()
    {
        this.characters = [];
        let park = new Character('Park', 0);
        park.addInitialDialogues(["","SPark1xPR", "SPark1xUN"]);
        let jung = new Character('Jung', 1);
        jung.addInitialDialogues(["SJung0xPrro", "SJung1xPR", "SJung1xUN"]);
        let lee = new Character('Lee', 2);
        lee.addInitialDialogues(["SLee0xPrro", "SLee1xPR", "SLee1xUN"]);
        let assattari = new Character('Assattari', 3);
        lee.addInitialDialogues(["SAssattari0xPrro", "SAssattari1xPR", "SAssattari1xUN"]);
        let ruru = new Character('Ruru', 4);
        ruru.addInitialDialogues(["","SRuru1xPR", "SRuru1xUN"]);

        this.characters.push(park, jung, lee, assattari, ruru);
        
        this.weapons = [];

        this.places = [];
        let mainHall = new Place('Main Hall');
        let office = new Place('Office');
        let dressroom = new Place('Dressroom');
        let recordingStudio = new Place('Recording Studio');
        this.places.push(mainHall, office, dressroom, recordingStudio);

        this.dialoguesTaken = new HashTable();
    }

    
    addDialogueTaken(Dialogue)
    {
        this.dialoguesTaken.add(Dialogue.ID, Dialogue);
    }

    /**
     * Method that retrieves a clue based on its type and its name
     * @param {*Type of clue that we are getting} Type 
     * @param {*Name of the clue} Name 
     */
    searchClue(Type, Name)
    {
        let theClue;
        let tArray;
        switch(Type)
        {
            case "Suspects":
                tArray = this.characters;
            break;
            case "Weapons":
                tArray = this.weapons;
            break;
            case "Places":
                tArray = this.places;
            break;
        }

        for(let i = 0; i < tArray.length && theClue == null; i++)
        {
            if(tArray[i].name == Name)
                theClue = tArray[i];
        }
        return theClue;
    }












    discoverClue(index, type)
    {
        switch(type)
        {
            case "Suspects":
                this.characters[index].discovered = true;
            break;
            case "Weapon":
                this.weapons[index].discovered = true;
            break;
            case "Place":
                this.places[index].discovered = true;
            break;
        }
        sfxManager.playSFX(2);
        let timedEvent = currentScene.time.addEvent({
            delay: 250, callback: this.enableNote, callbackScope: currentScene, repeat: 4 
        });
    }

    enableNote()
    {
        let newS = !HUDSpriteManager.noteHigh.visible;
        HUDSpriteManager.noteHigh.visible = newS;
    }

    checkRequirements(Requirements)
    {
        if(Requirements.Suspects.length > 0)
        {
            let xChars = Requirements.Suspects.split('-');
            xChars.forEach(temp => 
            {
                let exists = this.checkIfExists(temp, this.characters);
                if(exists == false)
                {
                    return false;
                }
            });
        }
        if(Requirements.Weapons.length > 0)
        {
            let xItems = Requirements.Weapons.split('-');
            xItems.forEach(temp => 
            {
                let exists = this.checkIfExists(temp, this.weapons);
                if(exists == false)
                {
                    return false;
                }
            });
        }
        if(Requirements.Places.length > 0)
        {
            let xPlaces = Requirements.Places.split('-');
            xPlaces.forEach(temp => 
            {
                let exists = this.checkIfExists(temp, this.places); 
                if(exists == false)
                {
                    return false;
                }
            });
        }
        return true;
    }

    checkIfExists(element, array)
    {
        let exists = false;
        array.forEach(temp => 
        {
            if(temp.name == element && temp.discovered == true)
            {
                exists = true;
            }
        });
        return exists;
    }

    getInformation(ClueType)
    {
        switch(ClueType)
        {
            case "S":
                return this.characters;
            case "P":
                return this.places;
            case "W":
                return this.weapons;
        }
    }

    resetAllClueStates()
    {        
        for(let i = 0; i < this.characters.length; i++)
        {
            let character = this.characters[i];
            let place = (i < this.places.length) ? this.places[i] : null;
            let weapon = (i < this.weapons.length) ? this.weapons[i] : null;
            character.clueState = 0;
            if(place != null) place.clueState = 0;
            if(weapon != null) weapon.clueState = 0;
        }
    }
}