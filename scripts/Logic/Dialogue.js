class Dialogue
{
    constructor(theID, Scene, GameState, Character, theType, theText, NextAction, Requirements)
    {
        this.ID = theID;
        this.SceneName = Scene;
        this.GameState = GameState;
        this.Character = Character;
        this.Type = theType;
        this.Text = theText;
        this.NextAction = NextAction.split('-');
        this.Requirements = Requirements;
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