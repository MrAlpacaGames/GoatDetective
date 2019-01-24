class Notebook
{
    constructor()
    {
        this.characters = [];
        let park = new Clue('Park', 0);
        park.addInitialDialogues(["","SPark1xPR", "SPark1xUN"]);

        let jung = new Clue('Jung', 1);
        jung.addInitialDialogues(["SJung0xPrro", "SJung1xPR", "SJung1xUN"]);
        jung.suspect1Dialogues = ["JungLeex1x0"]; // Lee
        jung.suspect2Dialogues = ["JungAssattarix1x0"]; // Assattari
        jung.suspect3Dialogues = ["JungRurux1x0"]; // Ruru
        jung.suspect4Dialogues = ["JungParkx1x0"]; // Park
        jung.weaponsDialogue = ["Puddle", "DiamondChicken", "Standard", "Venomous"]; // Weapons



        let lee = new Clue('Lee', 2);
        lee.addInitialDialogues(["SLee0xPrro", "SLee1xPR", "SLee1xUN"]);
        lee.suspect1Dialogues = ["LeeJungx1x0"]; // Jung
        lee.suspect2Dialogues = ["LeeAssattarix1x0"]; // Assattari
        lee.suspect3Dialogues = ["LeeRurux1x0"]; // Ruru
        lee.suspect4Dialogues = ["LeeParkx1x0"]; // Park
        lee.weaponsDialogue = ["Puddle", "DiamondChicken", "Standard", "Venomous"]; // Weapons

        let assattari = new Clue('Assattari', 3);
        assattari.addInitialDialogues(["SAssattari0xPrro", "SAssattari1xPR", "SAssattari1xUN"]);
        assattari.suspect1Dialogues = ["AssattariLeex1x0"]; // Lee
        assattari.suspect2Dialogues = ["AssattariJungx1x0"]; // Jung
        assattari.suspect3Dialogues = ["AssattariRurux1x0"]; // Ruru
        assattari.suspect4Dialogues = ["AssattariParkx1x0"]; // Park
        assattari.weaponsDialogue = ["Puddle", "DiamondChicken", "Standard", "Venomous"]; // Weapons

        let ruru = new Clue('Ruru', 4);
        ruru.addInitialDialogues(["","SRuru1xPR", "SRuru1xUN"]);
        ruru.suspect1Dialogues = ["RuruLeex1x0"]; // Lee
        ruru.suspect2Dialogues = ["RuruJungx1x0"]; // Jung
        ruru.suspect3Dialogues = ["RuruAssattarix1x0"]; // Assattari
        ruru.suspect4Dialogues = ["RuruParkx1x0"]; // Park
        ruru.weaponsDialogue = ["Puddle", "DiamondChicken", "Standard", "Venomous"]; // Weapons

        this.characters.push(park, jung, lee, assattari, ruru);
        
        this.weapons1 = [];
        let puddle = new Clue('Puddle', 0);
        let diamondChicken = new Clue('Diamond Chicken', 1);
        let standardPin = new Clue('Standard Pin', 2);
        let venomousPin = new Clue('Venomous Pin', 3);
        this.weapons1.push(puddle, diamondChicken, standardPin, venomousPin);

        this.weapons2 = [];
        let loveLetter = new Clue('LoveLetter', 0);
        this.weapons2.push(loveLetter);

        this.places = [];
        let mainHall = new Clue('Main Hall', 0);
        let office = new Clue('Office', 1);
        let dressroom = new Clue('Dressroom', 2);
        let recordingStudio = new Clue('Recording Studio', 3);
        this.places.push(mainHall, office, dressroom, recordingStudio);

        this.dialoguesTaken = new HashTable();

        this.discoveredCharacters = false;
        this.discoveredWeapons1 = false;
        this.discoveredWeapons2 = false;
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
                if(this.discoveredCharacters == false) this.discoveredCharacters = true;
            break;
            case "Weapon1":
                this.weapons[index].discovered = true;
                if(this.discoveredWeapons1 == false) this.discoveredWeapons1 = true;
            break;
            case "Weapon2":
                this.places[index].discovered = true;
                if(this.discoveredWeapons2 == false) this.discoveredWeapons2 = true;
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