class DialogueManager
{
    constructor()
    {
        this.data;
        this.loadJson(function(response){
            var actual_JSON = JSON.parse(response);
        });

        this.dialogues;

        this.currentDialogue;
    }

    loadJson(callback)
    {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/Dialogues.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);  
    }

    preloadJson()
    {
        currentScene.load.json('dialogues', 'data/Dialogues.json');
    }

    createDialogues()
    {
        this.data = currentScene.cache.json.get('dialogues').Dialogues;

        this.dialogues = new HashTable();
        
        this.data.forEach(temp => 
        {
            let newD = new Dialogue(temp.ID, temp.Scene, temp.GameState, temp.Character, temp.Type, temp.Text, temp.NextAction, temp.Requirements);
            this.dialogues.add(newD.ID, newD);
        });

        //let testo = this.dialogues.get("GS1D05");
        //console.log(testo.Text);           
    }

    setDialogue(DialogueID)
    {
        this.currentDialogue = this.dialogues.get(DialogueID);
        let isMultiple = false;
        switch(this.currentDialogue.Type)
        {
            case "Single":
                isMultiple = false;
            break;
            case "Multiple":
                isMultiple = true;
            break;
        }

        if(currentScene.dialogue.isEnabled === false)
        {
            GameManager.canMove = false;
            currentScene.dialogue.enableDialogueUI(isMultiple, true);
        }

        currentScene.dialogue.setDialogueText(isMultiple, this.currentDialogue);
    }

    /**
     * We check the next action to be done when someone presses the continue button.
     */
    checkNextD(index)
    {
        let nextAction = this.currentDialogue.NextAction[index];
        if(nextAction === "End" || nextAction === "NextState")
        {
            // We close the dialog window
            currentScene.dialogue.enableDialogueUI(false, false);
            GameManager.canMove = true;
            if(nextAction === "NextState")
            {
                GameManager.stateOfGame ++;
            }
        }
        else
        {
            this.currentDialogue = this.dialogues.get(nextAction);
            // We check the type of the next Dialogue. If it is single, we show it. If it is multiple, we show the multiple options
            if(this.currentDialogue.Type == "Single")
            {
                currentScene.dialogue.setDialogueText(false, this.currentDialogue);
            }
            else
            {
                currentScene.dialogue.enableDialogueUI(true, true);
                
                let options = nextAction.split('-');
                
                
                
            }
        }
    }
}