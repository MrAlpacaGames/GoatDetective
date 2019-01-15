class Clue
{
    constructor(theName, theDescription)
    {
        this.name = theName;
        this.description = theDescription;
        this.dialogues;
        this.discovered = false;
    }

    getName()
    {
        return this.name;
    }

    getDescription()
    {
        return this.description;
    }


}