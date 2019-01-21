class DialogueManager
{
    constructor()
    {
        this.loadJson(function(response){
            var actual_JSON = JSON.parse(response);
        });

        this.sDialogues;

        // Current Active Dialogue
        this.currentDialogue;

        // This is the lvl of the conversation.
        // Level 0 = Single Dialog, showing text and next option
        // Level 1 = Multiple Dialog - Level 1. We show Dialogue options:
        //  a) Repeat last dialogue, b) Ask about a person, c) Ask about a place or d) Ask about a weapon
        // Level 2 = Multiple Dialog - Level 2. We show the names of the characters, places or weapons. 
        this.currentDialogueLvl = 0;

        // Clues List of Requirements and Order of Dialogues
        this.parkIDs;
        this.jungIDs;
        this.leeIDs;
        this.ruruIDs;
        this.assattariIDs;

        
    }

    loadJson(callback)
    {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/SingleDialogues.json', true); // Replace 'my_data' with the path to your file
        xobj.open('GET', 'data/Requirements.json', true); // Replace 'my_data' with the path to your file

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
        currentScene.load.json('requirements', 'data/Requirements.json');

    }

    createDialogues()
    {
        let sData = currentScene.cache.json.get('singleD').SingleDialogues;
        let requirData = currentScene.cache.json.get('requirements');
        this.parkIDs = requirData.Park;
        this.jungIDs = requirData.Jung;

        this.sDialogues = new HashTable();
        
        sData.forEach(temp => 
        {
            let newD = new Dialogue(temp.ID, temp.Character, temp.GameState, temp.Texts, temp.Next);
            this.sDialogues.add(newD.ID, newD);
        });
    }

    selectOption(optionSelected)
    {
        this.currentDialogueLvl = (this.currentDialogueLvl == 1) ? 2: 1;
        switch(optionSelected)
        {
            case 0:
                
            break;
        }

        console.log("Option selected is: "+optionSelected);
    }

    startDialogue(DialogueID)
    {
        this.currentDialogue = this.sDialogues.get(DialogueID);
        if(currentScene.dialogue.isEnabled === false)
        {
            GameManager.canMove = false;
            currentScene.dialogue.enableDialogueUI(true);
        }
        this.setDialogueText(0);
    }

    setDialogueText(index)
    {
        if(index == 0) this.currentDialogue.currentIndex = 0;
        let text = this.currentDialogue.Texts[index].split("|||");
        currentScene.dialogue.characterName.text = text[0];
        currentScene.dialogue.setDialogueText(text[1]);
    }

    checkNextAction()
    {
        if(currentScene.dialogue.isWriting == true)
        {
            currentScene.dialogue.skipText();
        }
        else
        {
            let nextLine = this.currentDialogue.getNextLine();
            if(nextLine == "LastLine")
            {
                let nextAction = this.currentDialogue.NextAction;
                if(nextAction == "End")  // We check if the next action is End. If it is we close the dialog.
                {
                    currentScene.dialogue.enableDialogueUI(false);
                }
                else // If not, we proceed to open the multiple options dialogue
                {
    
                }
            }
            else // If is not last line, we continue to the next line
            {
                this.setDialogueText(this.currentDialogue.currentIndex);
            }
        }
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