class Dialogue
{
    constructor(theID, Character, GameState, theColor, theTexts, NextAction)
    {
        this.ID = theID;
        this.Character = Character;
        this.GameState = GameState;
        this.Color = theColor;
        this.Texts = theTexts;
        this.NextAction = NextAction;

        this.currentIndex = -1;
    }

    getNextDialogue()
    {
        let answer = "";
        this.currentIndex++;
        if(this.currentIndex < this.Texts.length)
        {
            answer = this.Texts[this.currentIndex];
        }
        else
        {
            answer = "End";
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