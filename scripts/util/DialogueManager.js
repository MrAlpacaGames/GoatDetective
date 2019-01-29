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

        // Dialogues Hash Table
        this.dialoguesHashTable;

        // Notes Hash Table
        this.notesHashTable;

        // Current Active Dialogue
        this.currentDialogue;
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
        xobj.open('GET', 'data/Notes.json', true); // Replace 'my_data' with the path to your file

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
        currentScene.load.json('dialogues', 'data/SingleDialogues.json');
        currentScene.load.json('notes', 'data/Notes.json');
    }

    /**
     * Method that creates the dialogues of the game and puts them in the hash tables
     */
    createDialogues()
    {
        let sData = currentScene.cache.json.get('dialogues').SingleDialogues;
        let nData = currentScene.cache.json.get('notes');

        this.dialoguesHashTable = new HashTable();
        
        sData.forEach(temp => 
        {
            let newD = new Dialogue(temp.ID, temp.Character, temp.Name, temp.GameState, temp.Texts, temp.Next);
            this.dialoguesHashTable.add(newD.ID, newD);
        });
    }

    /**
     * Method that opens the dialog window, searchs for the dialogue in the hash table according to the parameter ID
     * @param {*ID of the dialogue} DialogueID 
     */
    startDialogue(DialogueID)
    {
        this.currentDialogue = this.dialoguesHashTable.get(DialogueID);
        if(currentDialogueHUD.isEnabled === false)
        {
            GameManager.canMove = false;
            currentDialogueHUD.enableDialogueUI(true);
        }
        else
        {
            currentDialogueHUD.switchWindows(false, false);
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
        currentDialogueHUD.characterName.text = text[0];
        currentDialogueHUD.setDialogueText(text[1]);
    }

    /**
     * Method that checks the next action to be executed
     */
    checkNextAction()
    {
        if(currentDialogueHUD.isWriting == true)
        {
            currentDialogueHUD.skipText();
        }
        else
        {
            let nextLine = this.currentDialogue.getNextLine();
            if(nextLine == "LastLine")
            {
                let nextAction = this.currentDialogue.NextAction;
                if(nextAction == "DiscoverEnd" || nextAction == "DiscoverMultiple")
                {
                    let name = this.currentDialogue.Character;
                    playerNotebook.discoverClue(name);
                    playerNotebook.dialoguesTaken.add(this.currentDialogue.ID);
                    (nextAction == "DiscoverEnd") ? currentDialogueHUD.enableDialogueUI(false): currentDialogueHUD.enableMultiple();
                }
                else if(nextAction == "End")  // We check if the next action is End. If it is we close the dialog.
                {
                    currentDialogueHUD.enableDialogueUI(false);
                }
                else if(nextAction == "Multiple") // We open a multiple dialogue options
                {
                    currentDialogueHUD.enableMultiple();
                }
                else if(nextAction == "LeeMenu")
                {
                    currentDialogueHUD.openParkOptions(false);
                    GameManager.canMove = false;
                }
                else if(nextAction == "GameOver")
                {
                    currentPlayerHUD.openSpecialScreen(false, true);
                }
            }
            else // If is not last line, we continue to the next line
            {
                this.setDialogueText(this.currentDialogue.currentIndex);
            }
        }
    } 
}