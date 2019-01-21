class Notebook
{
    constructor()
    {
        this.characters = [];
        let park = new Character('Park', 'This is the body of the Park, the leader of the famous K-Pop Band Alpaca Supah Star');
        let jung = new Character('Jung', 'This is the bad boy');
        let lee = new Character('Lee', 'The cute one');
        let assattari = new Character('Assattari', 'The producer stah');
        let ruru = new Character('Ruru', 'Numbah 1 Fan');

        this.characters.push(park, jung, lee, assattari, ruru);
        
        this.weapons = [];

        this.places = [];
        let mainHall = new Place('Main Hall', 'This is where Park died.');
        let office = new Place('Office', "Assattari's office. Maybe I could find something interesting here.");
        let dressroom = new Place('Dressroom', "This is where the band got their clothes");
        let recordingStudio = new Place('Recording Studio', 'This is where the supah songs are recorded');
        this.places.push(mainHall, office, dressroom, recordingStudio);

        this.dialoguesTaken = new HashTable();
    }

    addDialogueTaken(Dialogue)
    {
        this.dialoguesTaken.add(Dialogue.ID, Dialogue);
    }















    discoverClue(index, type)
    {
        switch(type)
        {
            case "Character":
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

    getClue(type, index)
    {
        switch(type)
        {
            case "Suspect":
                return this.characters[index];
            case "Place":
                return this.places[index];
            case "Weapon":
                return this.weapons[index];
        }
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