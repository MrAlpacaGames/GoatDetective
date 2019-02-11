class Notebook
{
    constructor()
    {
        //-----------------------------------------
        //              HUMANS
        //-----------------------------------------
        this.humans = [];
        let park = new Clue('Park', "Humans", 0);
        park.fullName = "PARK IN SOO";
        park.addInitialDialogues(["","SPark1xPR", "SPark1xUN"]);
        park.confrontationRequirements = [""];

        let jung = new Clue('Jung', "Humans", 1);
        jung.fullName = "JUNG DAE SEO";
        jung.addInitialDialogues(["SJung0xPrro", "SJung1xPR", "SJung1xUN"]);
        jung.confrontationRequirements = ["LeeConfrontation2x1", "SPark4xPR", "LeeJung1x4", "AssattariJung1x4", "RuruJung1x4", "JungStandard1xUN", "JungPoisoned1xUN" ];
        //jung.confrontationRequirements = ['SPark1xPR'];

        let lee = new Clue('Lee', "Humans", 2);
        lee.fullName = "LEE CHEE GO";
        lee.addInitialDialogues(["SLee0xPrro", "SLee1xPR", "SLee1xUN"]);
        lee.confrontationRequirements = ["RuruConfrontation2x1", "JungLee1x3", "AssattariLee1x3", "RuruLee1x3", "LeeRecorder1xUN", "JungRecorder1xUN", "LeeCellphone1xUN"];
        //lee.confrontationRequirements = ["SPark1xPR"];

        let assattari = new Clue('Assattari', "Humans", 3);
        assattari.fullName = "ASSATTARI TARI";
        assattari.addInitialDialogues(["SAssattari0xPrro", "SAssattari1xPR", "SAssattari1xUN"]);
        assattari.confrontationRequirements = ["RuruAssattari1x1", "AssattariChicken1xUN", "AssattariPark1x1"];

        let ruru = new Clue('Ruru', "Humans", 4);
        ruru.fullName = "RURU SPARK";
        ruru.addInitialDialogues(["","SRuru1xPR", "SRuru1xUN"]);
        ruru.confrontationRequirements = ["AssattariConfrontation2x1", "AssattariRuru1x2", "LeePuddle1xUN", "AssattariPuddle1xUN", "LeeLetter1xUN", "RuruLetter1xUN"];

        this.humans.push(park, jung, lee, assattari, ruru);
        
        //-----------------------------------------
        //              WEAPONS
        //-----------------------------------------
        this.weapons = [];
        let puddle = new Clue('Puddle', "Weapons", 0);
        puddle.fullName = "SWEATY PUDDLE";
        puddle.noteBookID = "Sweaty Puddle";
        puddle.addInitialDialogues(["SGoatmanPuddle1xUN"]);

        let diamondChicken = new Clue('Chicken', "Weapons", 1);
        diamondChicken.fullName = "CHICKEN DIAMONDO";
        diamondChicken.noteBookID = "Chicken Diamando";
        diamondChicken.addInitialDialogues(["SGoatmanChicken1xUN"]);

        let standardPin = new Clue('Standard', "Weapons", 2);
        standardPin.fullName = "STANDARD PIN";
        standardPin.noteBookID = "Standard Pin";

        let poisonedPin = new Clue('Poisoned', "Weapons", 3);
        poisonedPin.fullName = "POISONED PIN";
        poisonedPin.noteBookID = "Poisoned Pin";
        poisonedPin.addInitialDialogues(["GoatmanPoisoned1xUN"]);

        this.weapons.push(puddle, diamondChicken, standardPin, poisonedPin);

        //-----------------------------------------
        //              ITEMS
        //-----------------------------------------
        this.items = [];
        let studioKey = new Clue('Key', "Items", 0);
        studioKey.fullName = "STUDIO KEY";
        studioKey.noteBookID = "Studio Key";
        studioKey.addInitialDialogues(["GoatmanKey1xUN"]);

        let loveLetter = new Clue('Letter', "Items", 1);
        loveLetter.fullName = "RURU'S LETTER";
        loveLetter.noteBookID = "Ruru Love Letter";
        loveLetter.addInitialDialogues(["GoatmanLetter1xUN"]);


        let recorder = new Clue('Recorder', "Items", 2);
        recorder.fullName = "STUDIO RECORDER";
        recorder.noteBookID = "Studio Recorder";
        recorder.addInitialDialogues(["GoatmanRecorder1xUN"]);

        let cellphone = new Clue('Cellphone', "Items", 3);
        cellphone.fullName = "PARK'S CELLPHONE";
        cellphone.noteBookID = "Park Cellphone";
        cellphone.addInitialDialogues(["GoatmanCellphone1xUN"]);

        this.items.push(studioKey, loveLetter, recorder, cellphone);

        //-----------------------------------------
        //              PLACES
        //-----------------------------------------
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
        
        //-----------------------------------------
        //              DRAWERS
        //-----------------------------------------
        this.drawers = [false, false, false];

        this.dialoguesTaken = new HashTable();

        //-----------------------------------------
        //              GENERAL VARIABLES
        //-----------------------------------------
        this.parkDiscovered = false;
        this.park2ndDiscovered = false;
        this.discoveredCharacters = false;
        this.discoveredWeapons = false;
        this.discoveredItems = false;
        this.discoveredPlaces = false;

        this.hasTheKey = false;
    }

    /**
     * We add the dialog we have just taken into our hash table
     * @param {*} Dialogue 
     */
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

        theArray = this.getClueArray(name);

        for(let i = 0; i < theArray.length; i++)
        {
            if(theArray[i].name == name)
            {
                theClue = theArray[i];
                break;
            }
        }  
        
        return theClue;
    }

    /**
     * We get a clue depending of its type
     * @param {*} ClueType 
     * @param {*} ClueIndex 
     */
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
        if(clue.name == "Park")
        {
            this.parkDiscovered = true;
            if(GameManager.stateOfGame == 0)
            {
                GameManager.stateOfGame = 1;  
                persistenceManager.updateSaveState(GameManager.stateOfGame);
            }
        } 
        clue.discovered = true;
        if(clue.name != "Hall")
            this.playDiscoverSFX();
        this.writeNote(clue);
    }

    /**
     * We get the array of clues depending of the name passed as parameter
     * @param {*} name 
     */
    getClueArray(name)
    {
        let theArray;
        if(name == "Park" || name == "Jung" || name == "Lee" || name == "Ruru"|| name == "Assattari")
        {
            theArray = this.humans;
            if(this.discoveredCharacters == false && name != "Park") this.discoveredCharacters = true;
        }
        else if(name == "Puddle" || name == "Chicken" || name == "Standard" || name == "Poisoned")
        {
            theArray = this.weapons;
            if(this.discoveredWeapons == false) this.discoveredWeapons = true;
        }
        else if(name == "Letter" || name == "Recorder" || name == "Cellphone" || name == "Key")
        {
            theArray = this.items;
            if(this.discoveredItems == false && name != "Key") this.discoveredItems = true;
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
            notes = this.getNotes(clue, true);
            if(clue.noteBookIndex == gameStateIndex)
            {
                clue.noteBookNote += notes[gameStateIndex]+"\n";  
                clue.noteBookIndex++;              
            }
            else
            {
                for(let i = clue.noteBookIndex; i <= gameStateIndex; i++)
                {
                    let temp = notes[i];
                    clue.noteBookNote += notes[i]+"\n";  
                    clue.noteBookIndex++; 
                }
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
        let stateOfGame;
        if(clueName == "Puddle" || clueName == "Chicken" || clueName == "Standard" || clueName == "Poisoned"
        || clueName == "Key" || clueName == "Letter" || clueName == "Recorder" || clueName == "Cellphone")
        {
            stateOfGame = "UN";
        }
        else
        {
            stateOfGame = GameManager.stateOfGame;
        }
        let dialogueID = suspectTalkingTo.name + clueName +"1x"+ stateOfGame;
        return dialogueID;
    }

    /**
     * Method that gets the Dialogue ID for a confrontation
     * @param {*The human we are about to confront} humanTalkingTo 
     */
    getConfrontationID(humanTalkingTo)
    {
        return humanTalkingTo.name + "Confrontation2x1";
    }

    /**
     * Function that checks if the human meeets the requirements for a confrontation
     * @param {*} theClue 
     */
    checkIfMeetRequirements(theClue)
    {
        let answer = false;
        if(!theClue.hasBeenConfronted)
        {
            let meets = true;
            for(let i = 0; i < theClue.confrontationRequirements.length; i++)
            {
                let temp = theClue.confrontationRequirements[i];
                let exists =  this.dialoguesTaken.get(temp);
                if(exists == undefined)
                {
                    meets = false;
                    break;
                }
            }
            answer = meets;
        }
        return answer;
    }

    /**
     * Function that obtains the discovered clues depending of a clue type passed as parameter
     * @param {*} clueType 
     */
    getDiscoveredClues(clueType)
    {
        let answer = [];
        let array;
        let substractor;
        (clueType == "Humans") ? array = this.humans: array = this.weapons;
        (clueType == "Humans") ? substractor = -1: substractor = 0;
        for(let i = 0; i < array.length; i++)
        {
            if(array[i].discovered && array[i].name != "Park")
            {
                answer.push(array[i].index + substractor);
            }
        }
        return answer;
    }

    /**
     * We check if the drawer has been opened before
     * @param {*} kStarName 
     * @param {*} openAction 
     */
    checkIFDrawerOpen(kStarName, openAction)
    {
        let answer;
        let pos;
        switch(kStarName)
        {
            case "JungDrawer":
                pos = 0;
            break;
            case "LeeDrawer":
                pos = 1;
            break;
            case "ParkDrawer":
                pos = 2;
            break;
        }
        answer = this.drawers[pos];
        if(openAction) this.drawers[pos] = true;
        return answer;
    }

    /**
     * Function called when the state of the game has been updated
     * @param {*} newGameState 
     */
    updateGameState(newGameState)
    {
        // We first set the new Game State to the current Game state
        if(newGameState <=5) 
        {
            GameManager.stateOfGame = newGameState;
            persistenceManager.updateSaveState(GameManager.stateOfGame);
        }
        console.log("Current Game State is: "+GameManager.stateOfGame);
        // We then update all the notebook notes for all character clues
        this.humans.forEach(temp => {
            this.writeNote(temp);
        });
        if(GameManager.stateOfGame == 4)
        {
            // If we reach the 4th stage, we change the sprite of Park to the poisoned one
            let hallScene = getScene('HallScene');
            if(!hallScene.poisonedPark.visible)
            {
                hallScene.park.visible = false;
                hallScene.poisonedPark.visible = true;
            }
        }
    }

    eraseAllNotes()
    {
        this.humans.forEach(element => {
            element.noteBookIndex = "";
            element.noteBookIndex = 0;
        });
    }

    loadNotebook(newGameState)
    {
        if(newGameState > 0)
        {
            if(this.dialoguesTaken != undefined && this.dialoguesTaken.table.length > 0)
            {
                this.dialoguesTaken = undefined;
                this.dialoguesTaken = new HashTable();
            }

            this.eraseAllNotes();
            let cluesToWriteNotes = [];            

            if(newGameState > 0)
            {
                // In the state 1+ we have already talked the first time with Park
                this.dialoguesTaken.add('SGoatman0x0', dialogueManager.dialoguesHashTable.get('SGoatman0x0'));
                this.dialoguesTaken.add('SPark1xPR', dialogueManager.dialoguesHashTable.get('SPark1xPR'));

                // We set Park to its new status
                this.humans[0].discovered = true;
                this.humans[0].inDialoguesIndex = 1;
                this.humans[0].inDialoguesIndex = 1;

                cluesToWriteNotes.push(this.humans[0]);

                this.parkDiscovered = true;

                if(newGameState > 1)
                {
                    // In the State 2+ we have already talked and discovered
                }
            }

            cluesToWriteNotes.forEach(element => {
                this.writeNote(element);
            });
        }
    }
}