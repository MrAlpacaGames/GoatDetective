class Dialogue
{
    constructor(theID, Character, GameState, theTexts, NextAction)
    {
        this.ID = theID;
        this.Character = Character;
        this.GameState = GameState;
        this.Texts = theTexts;
        this.NextAction = NextAction;

        this.currentIndex = 0;
    }    

    getNextLine()
    {
        let answer = "";
        this.currentIndex++;
        if(this.currentIndex < this.Texts.length)
        {
            answer = this.Texts[this.currentIndex];
        }
        else
        {
            answer = "LastLine";
        }
        return answer;
    }

    getAvailableOptions()
    {
        let answer = [];
        this.NextAction.forEach(temp => 
        {
            let x = dialogueManager.dialogues.get(temp);
            let isAvailable = playerNotebook.checkRequirements(x.Requirements);
            if(isAvailable)
            {
                answer.push(x);
            }
        });
        return answer;
    }
}