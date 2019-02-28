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
        lee.confrontationRequirements = ["LeeJung1x3","RuruConfrontation2x1", "JungLee1x3", "AssattariLee1x3", "RuruLee1x3", "LeeRecorder1xUN", "JungRecorder1xUN", "LeeCellphone1xUN"];

        let assattari = new Clue('Assattari', "Humans", 3);
        assattari.fullName = "ASSATTARI TARI";
        assattari.addInitialDialogues(["SAssattari0xPrro", "SAssattari1xPR", "SAssattari1xUN"]);
        assattari.confrontationRequirements = ["JungAssattari1x1", "LeeAssattari1x1", "RuruAssattari1x1", "AssattariChicken1xUN", "AssattariPark1x1"];

        let ruru = new Clue('Ruru', "Humans", 4);
        ruru.fullName = "RURU SPARK";
        ruru.addInitialDialogues(["","SRuru1xPR", "SRuru1xUN"]);
        ruru.confrontationRequirements = ["LeeRuru1x2", "AssattariConfrontation2x1", "AssattariRuru1x2", "LeePuddle1xUN", "AssattariPuddle1xUN", "LeeLetter1xUN", "RuruLetter1xUN"];

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
        poisonedPin.fullName = "IDENTICAL PIN";
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
        recorder.fullName = "STUDIO RECORDING";
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
        if(this.discoveredCharacters == false && clue.name != "Park" && clue.clueType == "Humans") this.discoveredCharacters = true;
        if(this.discoveredWeapons == false  && clue.clueType == "Weapons") this.discoveredWeapons = true;
        if(this.discoveredItems == false && clue.name != "Key" && clue.clueType == "Items") this.discoveredItems = true;

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
        }
        else if(name == "Puddle" || name == "Chicken" || name == "Standard" || name == "Poisoned")
        {
            theArray = this.weapons;
        }
        else if(name == "Letter" || name == "Recorder" || name == "Cellphone" || name == "Key")
        {
            theArray = this.items;
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

    /**
     * Function that loads the Notebook with information depending of the current Game State
     * @param {*New Game State from which we'll start loading information into the notebook} newGameState 
     */
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
                this.setClueToDiscovered(this.humans[0], cluesToWriteNotes);
                this.discoveredCharacters = true

                this.parkDiscovered = true;

                if(newGameState > 1)
                {
                    /** 
                     * In the State 2+ we have already talked and discovered the Puddle.
                     * We have Confronted Assattari. We have already discovered the chicken. 
                     * We also have discovered all the places and humans
                     */                    
                    this.discoveredPlaces = true;
                    for(let i = 0; i < this.places.length ; i++)
                    {
                        //---------------------- HUMANS -----------------------------------
                        this.setClueToDiscovered(this.humans[i+1], cluesToWriteNotes);
                        //---------------------- PLACES -----------------------------------
                        this.setClueToDiscovered(this.places[i], cluesToWriteNotes);
                    }

                    //---------------------- WEAPONS AND ITEMS -----------------------------------
                    this.discoveredWeapons = true;
                    // Puddle Discovered
                    this.setClueToDiscovered(this.weapons[0], cluesToWriteNotes);
                    // Chicken Diamando Discovered
                    this.setClueToDiscovered(this.weapons[1], cluesToWriteNotes);
                    // Key Discovered
                    this.setClueToDiscovered(this.items[0], cluesToWriteNotes);
                    this.hasTheKey = true;
                    
                    //-------------------- DIALOGUES TAKEN -----------------------------
                    this.dialoguesTaken.add('SJung1xPR', dialogueManager.dialoguesHashTable.get('SJung1xPR'));
                    this.dialoguesTaken.add('SAssattari1xPR', dialogueManager.dialoguesHashTable.get('SAssattari1xPR'));
                    this.dialoguesTaken.add('SRuru1xPR', dialogueManager.dialoguesHashTable.get('SRuru1xPR'));
                    this.dialoguesTaken.add('SLee1xPR', dialogueManager.dialoguesHashTable.get('SRuru1xPR'));
                    this.dialoguesTaken.add('GoatmanKey1xUN', dialogueManager.dialoguesHashTable.get('GoatmanKey1xUN'));
                    this.dialoguesTaken.add('LeePuddle1xUN', dialogueManager.dialoguesHashTable.get('LeePuddle1xUN'));
                    this.dialoguesTaken.add('JungPuddle1xUN', dialogueManager.dialoguesHashTable.get('JungPuddle1xUN'));
                    this.dialoguesTaken.add('AssattariPuddle1xUN', dialogueManager.dialoguesHashTable.get('AssattariPuddle1xUN'));
                    this.dialoguesTaken.add('RuruPuddle1xUN', dialogueManager.dialoguesHashTable.get('RuruPuddle1xUN'));

                    // Confrontation with Assattari Done
                    this.dialoguesTaken.add('AssattariConfrontation2x1', dialogueManager.dialoguesHashTable.get('AssattariConfrontation2x1'));
                    
                    if(newGameState > 2) // We have accused Ruru
                    {
                        this.discoveredItems = true;
                        // We got Park's Cellphone
                        // In that moment we have already checked Ruru's Love Letter
                        // Love Letter Discovered
                        this.setClueToDiscovered(this.items[1], cluesToWriteNotes);
                        // Park's Cellphone Discovered
                        this.setClueToDiscovered(this.items[3], cluesToWriteNotes);

                        //-------------------- DIALOGUES TAKEN -----------------------------
                        this.dialoguesTaken.add('RuruConfrontation2x1', dialogueManager.dialoguesHashTable.get('RuruConfrontation2x1'));
                        this.dialoguesTaken.add('GoatmanLetter1xUN', dialogueManager.dialoguesHashTable.get('GoatmanLetter1xUN'));
                        this.dialoguesTaken.add('GoatmanParkDrawer1xUN', dialogueManager.dialoguesHashTable.get('GoatmanParkDrawer1xUN'));
                        
                        if(newGameState > 3) // We have accused Lee
                        {
                            // Studio Record Discovered
                            this.setClueToDiscovered(this.items[2], cluesToWriteNotes);

                            // Standard Pin Discovered
                            this.setClueToDiscovered(this.weapons[2], cluesToWriteNotes);

                                                    //-------------------- DIALOGUES TAKEN -----------------------------
                            this.dialoguesTaken.add('LeeConfrontation2x1', dialogueManager.dialoguesHashTable.get('LeeConfrontation2x1'));
                            if(newGameState > 4) // We have accused Jung
                            {
                                // Poisoned Pin Discovered
                                // Pin Discovered
                                this.setClueToDiscovered(this.weapons[3], cluesToWriteNotes);

                                // We have already discovered Park poisoned body
                                this.dialoguesTaken.add('SPark4xPR', dialogueManager.dialoguesHashTable.get('SPark4xPR'));
                                this.dialoguesTaken.add('JungConfrontation2x1', dialogueManager.dialoguesHashTable.get('JungConfrontation2x1'));
                            }
                        }   
                    }
                }
            }

            cluesToWriteNotes.forEach(element => {
                this.writeNote(element);
            });
        }
    }

    setClueToDiscovered(clue, arrayOfWritingNotes)
    {
        clue.discovered = true;
        (clue.clueType == "Humans") ? clue.inDialoguesIndex = 1 : clue.inDialoguesIndex = 0;
        //(clue.clueType == "Humans") ? clue.noteBookIndex = 1 : clue.noteBookIndex = 0;
        clue.noteBookIndex = 0;
        arrayOfWritingNotes.push(clue);
    }
}