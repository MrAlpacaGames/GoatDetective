class DialogueManager
{
    constructor()
    {
        //----------------------------
        // VARIABLES
        //----------------------------
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

    //-----------------------------------------
    // FUNCTIONS
    //-----------------------------------------

    /**
     * Method that loads the json files
     * @param {*} callback 
     */
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

    /**
     * Method that preloads the .json to be used
     */
    preloadJson()
    {
        currentScene.load.json('singleD', 'data/SingleDialogues.json');
        currentScene.load.json('requirements', 'data/Requirements.json');
    }

    /**
     * Method that creates the dialogues of the game and puts them in the hash tables
     */
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

    /**
     * Method that opens the dialog window, searchs for the dialogue in the hash table according to the parameter ID
     * @param {*ID of the dialogue} DialogueID 
     */
    startDialogue(DialogueID)
    {
        this.currentDialogue = this.sDialogues.get(DialogueID);
        if(currentScene.dialogue.isEnabled === false)
        {
            GameManager.canMove = false;
            currentScene.dialogue.enableDialogueUI(true);
            if(DialogueID == "SPark1xUN") // The Dialogue where we have already checked Park's body for the 1st time
            {
                
            }
        }
        else
        {
            currentScene.dialogue.switchWindows(false, false);
        }
        this.setDialogueText(0);
    }

    /**
     * Sets the new text in the dialogue window 
     * @param {*Index of the text inside the array of texts inside a dialogue} index 
     */
    setDialogueText(index)
    {
        if(index == 0) this.currentDialogue.currentIndex = 0;
        let text = this.currentDialogue.Texts[index].split("|||");
        currentScene.dialogue.characterName.text = text[0];
        currentScene.dialogue.setDialogueText(text[1]);
    }

    /**
     * Method that checks the next action to be executed
     */
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
                else if(nextAction == "Multiple") // We open a multiple dialogue options
                {
                    currentScene.dialogue.enableMultiple(false, "");
                }
                else if(nextAction == "LeeMenu")
                {
                    
                }
                else if(nextAction == "GameOver")
                {
                    HUDSpriteManager.openSpecialScreen(false, true);
                }
            }
            else // If is not last line, we continue to the next line
            {
                this.setDialogueText(this.currentDialogue.currentIndex);
            }
        }
    } 
}