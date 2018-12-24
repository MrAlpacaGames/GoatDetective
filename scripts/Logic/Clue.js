class Clue
{
    constructor(theName, theDescription)
    {
        this.name = theName;
        this.description = theDescription;
        this.discovered = false;
    }

    getID()
    {
        return this.id;
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