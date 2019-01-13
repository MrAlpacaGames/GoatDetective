class GM
{
    constructor()
    {
        //----------------------------
        // Attributes
        //---------------------------

        this.notebook = new Notebook();

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

        this.dialogues = [];

        this.canMove = true;

    }

    getCharacter()
    {
        return this.park;
    }
}