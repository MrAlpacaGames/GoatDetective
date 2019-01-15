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
        
        this.items = [];

        this.places = [];
        let mainHall = new Place('Main Hall', 'This is where Park died.');
        let office = new Place('Office', "Assattari's office. Maybe I could find something interesting here.");
        let dressroom = new Place('Dressroom', "This is where the band got their clothes");
        let recordingStudio = new Place('Recording Studio', 'This is where the supah songs are recorded');
        this.places.push(mainHall, office, dressroom, recordingStudio);
    }

    discoverClue(index, type)
    {
        switch(type)
        {
            case "Character":
                this.characters[index].discovered = true;
            break;
            case "Item":
                this.items[index].discovered = true;
            break;
            case "Place":
                this.places[index].discovered = true;
            break;
        }
    }

    checkRequirements(Requirements)
    {
        if(Requirements.Characters != "None")
        {
            let xChars = Requirements.Characters.split('-');
            xChars.forEach(temp => 
            {
                let exists = this.checkIfExists(temp, this.characters);
                if(exists == false)
                {
                    return false;
                }
            });
        }
        if(Requirements.Items != "None")
        {
            let xItems = Requirements.Items.split('-');
            xItems.forEach(temp => 
            {
                let exists = this.checkIfExists(temp, this.items);
                if(exists == false)
                {
                    return false;
                }
            });
        }
        if(Requirements.Places != "None")
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
}