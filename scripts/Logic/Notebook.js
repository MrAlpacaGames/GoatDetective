class Notebook
{
    constructor()
    {
        this.humans = [];
        let park = new Clue('Park', 0);
        park.fullName = "PARK IN SOO";
        park.addInitialDialogues(["","SPark1xPR", "SPark1xUN"]);

        let jung = new Clue('Jung', 1);
        jung.fullName = "JUNG DAE SEO";
        jung.addInitialDialogues(["SJung0xPrro", "SJung1xPR", "SJung1xUN"]);

        let lee = new Clue('Lee', 2);
        lee.fullName = "LEE CHEE GO";
        lee.addInitialDialogues(["SLee0xPrro", "SLee1xPR", "SLee1xUN"]);

        let assattari = new Clue('Assattari', 3);
        assattari.fullName = "ASSATTARI TARI";
        assattari.addInitialDialogues(["SAssattari0xPrro", "SAssattari1xPR", "SAssattari1xUN"]);

        let ruru = new Clue('Ruru', 4);
        ruru.fullName = "RURU SPARK";
        ruru.addInitialDialogues(["","SRuru1xPR", "SRuru1xUN"]);

        this.humans.push(park, jung, lee, assattari, ruru);
        
        this.weapons = [];
        let puddle = new Clue('Puddle', 0);
        puddle.fullName = "SWEATY PUDDLE";
        let diamondChicken = new Clue('Chicken', 1);
        diamondChicken.fullName = "CHICKEN DIAMONDO";
        let standardPin = new Clue('Standard', 2);
        standardPin.fullName = "STANDARD PIN";
        let poisonedPin = new Clue('Poisoned', 3);
        poisonedPin.fullName = "POISONED PIN";
        this.weapons.push(puddle, diamondChicken, standardPin, poisonedPin);

        this.items = [];
        let studioKey = new Clue('Key', 0);
        studioKey.fullName = "STUDIO KEY";
        let loveLetter = new Clue('Letter', 1);
        loveLetter.fullName = "RURU'S LOVE LETTER";
        let recorder = new Clue('Recorder', 2);
        recorder.fullName = "STUDIO RECORDER";
        let cellphone = new Clue('Cellphone', 3);
        cellphone.fullName = "PARK'S CELLPHONE";
        this.items.push(studioKey, loveLetter, recorder, cellphone);

        this.places = [];
        let mainHall = new Clue('Hall', 0);
        let office = new Clue('Office', 1);
        let dressroom = new Clue('Dressroom', 2);
        let recordingStudio = new Clue('Studio', 3);
        this.places.push(mainHall, office, dressroom, recordingStudio);

        this.dialoguesTaken = new HashTable();

        this.discoveredCharacters = false;
        this.discoveredWeapons1 = false;
        this.discoveredWeapons2 = false;

        this.hasTheKey = false;
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

    /**
     * Method that discovers a note and adds it to the notebook
     * @param {*Name of the clue to be discovered} name 
     */
    discoverClue(name)
    {
        let theArray;
        if(name == key)
        {
            this.hasTheKey = true;
        }
        else
        {
            if(name == "Park" || name == "Jung" || name == "Lee" || name == "Ruru"|| name == "Assattari")
            {
                theArray = this.characters;
                if(this.discoveredCharacters == false) this.discoveredCharacters = true;
            }
            else if(name == "Puddle" || name == "Chicken" || name == "Standard" || name == "Poisoned")
            {
                theArray = this.weapons;
            }
            else if(name == "Letter" || name == "Recorder" || name == "Cellphone")
            {
                theArray = this.items;
            }
            else if(name == "Hall" || name == "Office" || name == "Dressroom" || name == "Studio")
            {
                theArray = this.places;
            }
    
            for(let i = 0; i < theArray.length; i++)
            {
                if(theArray[i].name == name && theArray[i].discovered == false)
                {
                    theArray[i].discovered = true;
                    this.playDiscoverSFX();
                    break;
                }
            }        
        }
    }

    playDiscoverSFX()
    {
        // We show the message on the HUD Manager

        // We play the SFX
        sfxManager.playSFX(2);
        let timedEvent = currentScene.time.addEvent({
            delay: 250, callback: this.enableNote, callbackScope: currentScene, repeat: 4 
        });
    }

    enableNote()
    {
        let newS = !currentPlayerHUD.noteHigh.visible;
        currentPlayerHUD.noteHigh.visible = newS;
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

    getCurrentDialogueID(suspectTalkingTo, clueName)
    {
        let dialogueID = suspectTalkingTo.name + clueName +"1x"+ GameManager.stateOfGame;
        return dialogueID;
    }
}