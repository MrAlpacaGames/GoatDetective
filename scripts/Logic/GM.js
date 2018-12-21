class GM
{
    constructor()
    {
        //----------------------------
        // Attributes
        //---------------------------

        this.notebook = new Notebook();

        this.characters = [];
        
        this.items = [];

        this.places = [];

        this.dialogues = [];

        this.park = new Character('C01', 'Park', 'This is the body of the Park, the leader of the famous K-Pop Band: \n Alpaca Supah Star');
    }

    getCharacter()
    {
        return this.park;
    }
}