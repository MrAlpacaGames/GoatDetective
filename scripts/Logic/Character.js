class Character extends Clue
{
    constructor(theName, theDescription)
    {
        super(theName, theDescription);
        this.dialogues = [];
        this.availableOptions = [];
    }  

    addDialogue(newDialogue)
    {
        this.dialogues.push(newDialogue);
    }


}