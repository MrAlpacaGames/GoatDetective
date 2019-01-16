class DialogueManager
{
    constructor()
    {
        this.loadJson(function(response){
            var actual_JSON = JSON.parse(response);
        });

        this.sDialogues;
        this.mOptions;

        this.currentDialogue;
    }

    loadJson(callback)
    {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/SingleDialogues.json', true); // Replace 'my_data' with the path to your file
        xobj.open('GET', 'data/MultipleDialogues.json', true); // Replace 'my_data' with the path to your file

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
        currentScene.load.json('singleD', 'data/SingleDialogues.json');
        currentScene.load.json('multipleD', 'data/MultipleDialogues.json');

    }

    createDialogues()
    {
        let sData = currentScene.cache.json.get('singleD').SingleDialogues;
        let mData = currentScene.cache.json.get('multipleD').MultipleDialogues;


        this.sDialogues = new HashTable();
        
        sData.forEach(temp => 
        {
            let newD = new Dialogue(temp.ID, temp.Character, temp.GameState, temp.Color, temp.Texts, temp.Next);
            this.sDialogues.add(newD.ID, newD);
        });


        //let testo = this.dialogues.get("GS1D05");
        //console.log(testo.Text);           
    }


    setDialogue(DialogueID)
    {
        this.currentDialogue = this.sDialogues.get(DialogueID);
        let text = this.currentDialogue.getNextDialogue();
        

        if(currentScene.dialogue.isEnabled === false)
        {
            GameManager.canMove = false;
            currentScene.dialogue.enableDialogueUI(true);
        }

        currentScene.dialogue.setDialogueText(this.currentDialogue);
    }

    checkNextAction()
    {
        let nexAction = this.currentDialogue.getNextDialogue
    }    

    /**
     * We check the next action to be done when someone presses the continue button.
     */
    checkNextD()
    {
        let nextAction = this.currentDialogue.getNextDialogue();
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

            this.currentDialogue = this.sDialogues.get(nextAction);
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