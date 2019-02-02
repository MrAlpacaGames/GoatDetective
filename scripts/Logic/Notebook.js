class Notebook
{
    constructor()
    {
        this.humans = [];
        let park = new Clue('Park', "Humans", 0);
        park.fullName = "PARK IN SOO";
        park.addInitialDialogues(["","SPark1xPR", "SPark1xUN"]);

        let jung = new Clue('Jung', "Humans", 1);
        jung.fullName = "JUNG DAE SEO";
        jung.addInitialDialogues(["SJung0xPrro", "SJung1xPR", "SJung1xUN"]);

        let lee = new Clue('Lee', "Humans", 2);
        lee.fullName = "LEE CHEE GO";
        lee.addInitialDialogues(["SLee0xPrro", "SLee1xPR", "SLee1xUN"]);

        let assattari = new Clue('Assattari', "Humans", 3);
        assattari.fullName = "ASSATTARI TARI";
        assattari.addInitialDialogues(["SAssattari0xPrro", "SAssattari1xPR", "SAssattari1xUN"]);

        let ruru = new Clue('Ruru', "Humans", 4);
        ruru.fullName = "RURU SPARK";
        ruru.addInitialDialogues(["","SRuru1xPR", "SRuru1xUN"]);

        this.humans.push(park, jung, lee, assattari, ruru);
        
        this.weapons = [];
        let puddle = new Clue('Puddle', "Weapons", 0);
        puddle.fullName = "SWEATY PUDDLE";
        puddle.noteBookID = "Sweaty Puddle";

        let diamondChicken = new Clue('Chicken', "Weapons", 1);
        diamondChicken.fullName = "CHICKEN DIAMONDO";
        diamondChicken.noteBookID = "Chicken Diamando";

        let standardPin = new Clue('Standard', "Weapons", 2);
        standardPin.fullName = "STANDARD PIN";
        standardPin.noteBookID = "Rare Pin";

        let poisonedPin = new Clue('Poisoned', "Weapons", 3);
        poisonedPin.fullName = "POISONED PIN";
        poisonedPin.noteBookID = "Mysterious Poisoned Pin";

        this.weapons.push(puddle, diamondChicken, standardPin, poisonedPin);

        this.items = [];
        let studioKey = new Clue('Key', "Items", 0);
        studioKey.fullName = "STUDIO KEY";
        studioKey.noteBookID = "Studio Key";

        let loveLetter = new Clue('Letter', "Items", 1);
        loveLetter.fullName = "RURU'S LOVE LETTER";
        loveLetter.noteBookID = "Rurus Love Letter";

        let recorder = new Clue('Recorder', "Items", 2);
        recorder.fullName = "STUDIO RECORDER";
        recorder.noteBookID = "Studio Recorder";

        let cellphone = new Clue('Cellphone', "Items", 3);
        cellphone.fullName = "PARK'S CELLPHONE";
        cellphone.noteBookID = "Parks Cellphone";
        this.items.push(studioKey, loveLetter, recorder, cellphone);

        this.places = [];
        let mainHall = new Clue('Hall', "Places", 0);
        mainHall.fullName = "HALL";
        mainHall.noteBookID = "Hall";

        let office = new Clue('Office', "Places", 1);
        office.fullName = "OFFICE";
        office.noteBookID = "Office";

        let dressroom = new Clue('Dressroom', "Places", 2);
        dressroom.fullName = "DRESSROOM";
        dressroom.noteBookID = "Dressroom";
        
        let recordingStudio = new Clue('Studio', "Places", 3);
        recordingStudio.fullName = "STUDIO";
        recordingStudio.noteBookID = "Studio";

        this.places.push(mainHall, office, dressroom, recordingStudio);

        this.dialoguesTaken = new HashTable();

        this.discoveredCharacters = false;
        this.discoveredWeapons = false;
        this.discoveredItems = false;
        this.discoveredPlaces = false;

        this.hasTheKey = false;
    }

    
    addDialogueTaken(Dialogue)
    {
        this.dialoguesTaken.add(Dialogue.ID, Dialogue);
    }

    /**
     * Method that returns a clue given a name. If it hasn't been discovered, we discover it.
     * @param {*Name of the clue to be searched} name 
     */
    getClue(name)
    {
        let theClue;
        let theArray;
        if(name == "Key")
        {
            this.hasTheKey = true;
        }
        else
        {
            theArray = this.getClueArray(name);
    
            for(let i = 0; i < theArray.length; i++)
            {
                if(theArray[i].name == name)
                {
                    theClue = theArray[i];
                    break;
                }
            }  
        }
        return theClue;
    }

    getClueByType(ClueType, ClueIndex)
    {
        let theArray;
        switch(ClueType)
        {
            case "H":
                theArray = this.humans;
            break;
            case "P":
                theArray = this.places;
            break;
            case "W":
                theArray = this.weapons;
            break;
            case "I":
                theArray = this.items;
            break;
        }
        return theArray[ClueIndex];
    }

    /**
     * Method that discovers a Clue and writes a note about it
     * @param {*Clue that will be discovered} clue 
     */
    discoverClue(clue)
    {
        clue.discovered = true;
        if(clue.name != "Hall")
            this.playDiscoverSFX();
        this.writeNote(clue);
    }

    getClueArray(name)
    {
        let theArray;
        if(name == "Park" || name == "Jung" || name == "Lee" || name == "Ruru"|| name == "Assattari")
        {
            theArray = this.humans;
            if(this.discoveredCharacters == false) this.discoveredCharacters = true;
        }
        else if(name == "Puddle" || name == "Chicken" || name == "Standard" || name == "Poisoned")
        {
            theArray = this.weapons;
            if(this.discoveredWeapons == false) this.discoveredWeapons = true;
        }
        else if(name == "Letter" || name == "Recorder" || name == "Cellphone")
        {
            theArray = this.items;
            if(this.discoveredItems == false) this.discoveredItems = true;
        }
        else if(name == "Hall" || name == "Office" || name == "Dressroom" || name == "Studio")
        {
            theArray = this.places;
            if(this.discoveredPlaces == false) this.discoveredPlaces = true;
        }
        return theArray;
    }

    /**
     * Method that writes a note in the notebbok
     * @param {*Clue from which we will write a note} clue 
     */
    writeNote(clue)
    {
        let notes;
        if(clue.clueType == "Humans")
        {
            let gameStateIndex = GameManager.stateOfGame-1;
            if(clue.noteBookIndex == gameStateIndex)
            {
                notes = this.getNotes(clue, true);
                clue.noteBookNote += notes[gameStateIndex]+"\n";  
                clue.noteBookIndex++;              
            }
        }
        else
        {
            if(clue.noteBookIndex == 0)
            {
                notes = this.getNotes(clue, false);
                notes.forEach(temp => {
                    clue.noteBookNote += temp+"\n";
                });
                clue.noteBookIndex++;
            }
        }
    }

    /**
     * Method that gets the notes of a specific clue
     * @param {*} clue 
     * @param {*} isHuman 
     */
    getNotes(clue, isHuman)
    {
        let id;
        (isHuman) ? id = clue.name : id = clue.noteBookID;
        return dialogueManager.notesHashTable.get(id).Notes;
    }

    /**
     * Plays the sound effect of discovery
     */
    playDiscoverSFX()
    {
        // We show the message on the HUD Manager
        currentPlayerHUD.playNewNoteMessage();
        // We play the SFX
        sfxManager.playSFX(2);
    }

    /**
     * Method that enables the highlight image of the notebook when this is pressed
     */
    enableNote()
    {
        let newS = !currentPlayerHUD.noteHigh.visible;
        currentPlayerHUD.noteHigh.visible = newS;
    }

    /**
     * Method that returns the array of clues depending of the clue type
     * @param {*} ClueType 
     */
    getInformation(ClueType)
    {
        switch(ClueType)
        {
            case "H":
                return this.humans;
            case "P":
                return this.places;
            case "W":
                return this.weapons;
            case "I":
                return this.items;
        }
    }
    
    /**
     * Method that resets all the states of the clues
     */
    resetAllClueStates()
    {        
        for(let i = 0; i < this.humans.length; i++)
        {
            let character = this.humans[i];
            let place = (i < this.places.length) ? this.places[i] : null;
            let weapon = (i < this.weapons.length) ? this.weapons[i] : null;
            character.clueState = 0;
            if(place != null) place.clueState = 0;
            if(weapon != null) weapon.clueState = 0;
        }
    }

    /**
     * Method that returns the current dialogue ID for the conversation in place
     * @param {*Clue of the human we're talking to} suspectTalkingTo 
     * @param {*Name of the Clue} clueName 
     */
    getCurrentDialogueID(suspectTalkingTo, clueName)
    {
        let dialogueID = suspectTalkingTo.name + clueName +"1x"+ GameManager.stateOfGame;
        return dialogueID;
    }
}