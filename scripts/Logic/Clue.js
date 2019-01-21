class Clue
{
    constructor(theName, theDescription)
    {
        this.name = theName;
        this.description = theDescription;
        this.discovered = false;
        
        this.gameStateID = 0;
        this.lineID = 0;
    }

    checkIfRequirementsMet()
    {
        let requirementsID = "";
        if(GameManager.stateOfGame != this.gameStateID)
        {
            requirementsID = "S"+this.name + GameManager.stateOfGame +  "x" + this.lineID;
            
        }
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