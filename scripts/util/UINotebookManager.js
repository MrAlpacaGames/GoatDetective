class UINotebookManager
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Suspects UI Elements
        this.suspectsWindow;
        this.colorCharacters = [];

        // Places UI Elements
        this.placesWindow;

        // Items UI Elements
        this.weaponsWindow;  
        
        // Text
        this.noteBookText;

        // Array of current clues
        this.currentClues;
    }

    preload()
    {
        // Suspects UI Elements
        currentScene.load.image('Suspects', 'assets/sprites/Agenda/Suspects.png');
        currentScene.load.image('RuruNB', 'assets/sprites/Agenda/Ruru.png');
        currentScene.load.image('RuruBlackWhite', 'assets/sprites/Agenda/RuruBN.png');
        currentScene.load.image('AssattariNB', 'assets/sprites/Agenda/Assattari.png');
        currentScene.load.image('AssattariBlackWhite', 'assets/sprites/Agenda/AssattariBN.png');
        currentScene.load.image('ParkNB', 'assets/sprites/Agenda/Park.png');
        currentScene.load.image('ParkBlackWhite', 'assets/sprites/Agenda/ParkBN.png');
        currentScene.load.image('LeeNB', 'assets/sprites/Agenda/Lee.png');
        currentScene.load.image('LeeBlackWhite', 'assets/sprites/Agenda/LeeBN.png');
        currentScene.load.image('JungNB', 'assets/sprites/Agenda/Jung.png');
        currentScene.load.image('JungBlackWhite', 'assets/sprites/Agenda/JungBN.png');

        // Places UI Elements
        currentScene.load.image('Places', 'assets/sprites/Agenda/Places.png');

        // Items UI Elements
        currentScene.load.image('Weapons', 'assets/sprites/Agenda/Weapons.png');

        // Buttons
        currentScene.load.image('Back', 'assets/sprites/Agenda/Back.png');
        currentScene.load.image('Next', 'assets/sprites/Agenda/Next.png');
    }

    create()
    {
        // Suspects UI Elements
        this.suspectsWindow = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Suspects');

        // Black & White
        currentScene.add.image(topBackgroundXOrigin-230, topBackgroundYOrigin+5, 'RuruBlackWhite');
        currentScene.add.image(topBackgroundXOrigin-100, topBackgroundYOrigin+5, 'AssattariBlackWhite');
        currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'ParkBlackWhite');
        currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'LeeBlackWhite');
        currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'JungBlackWhite');

        // Color
        let character;
        character = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'ParkNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('Suspect', 0));
        character.visible = false;
        this.colorCharacters.push(character);

        character = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'JungNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('Suspect', 1));
        character.visible = false;
        this.colorCharacters.push(character);

        character = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'LeeNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('Suspect', 2));
        character.visible = false;
        this.colorCharacters.push(character);

        character = currentScene.add.image(topBackgroundXOrigin-100, topBackgroundYOrigin+5, 'AssattariNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('Suspect', 3));
        character.visible = false;
        this.colorCharacters.push(character);

        character = currentScene.add.image(topBackgroundXOrigin-230, topBackgroundYOrigin+5, 'RuruNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('Suspect', 4));
        character.visible = false;
        this.colorCharacters.push(character);


        // Places UI Elements
        this.placesWindow = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Places');
        this.placesWindow.visible = false;

        // Items UI Elements
        this.weaponsWindow = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Weapons');
        this.weaponsWindow.visible = false;

        // Text Dialogue
        this.noteBookText = currentScene.add.text(topBackgroundXOrigin+170, topBackgroundYOrigin-130, "", 
        { fontFamily: 'Asap', fontSize: 25 , color: '#474747', align: 'left',
        wordWrap: {width: 280},
        wordWrapUseAdvanced: true
        });

        // Buttons
        let backBtn = currentScene.add.image(topBackgroundXOrigin-345, topBackgroundYOrigin+195, 'Back');
        backBtn.setInteractive();
        backBtn.on('pointerdown', ()=> openNotebook(false));
        

        let nextBtn = currentScene.add.image(topBackgroundXOrigin+440, topBackgroundYOrigin+235, 'Next');

        currentScene.input.on('pointerdown', (function(pointer)
        {
            notebookSpriteManager.checkClickPosition(pointer);
        }));

        // Set initial state
        this.updateOnOpen();
    }
    
    
    checkClickPosition(pointer)
    {
        let xP = pointer.downX;
        let yP = pointer.downY;
        if((yP > 70 && yP < 140 ) && (xP > 5 && xP < 167))
        {
            this.setVisible("W", false);
            this.setVisible("P", false);
            this.setVisible("S", true);
        }
        else if((yP > 150 && yP < 260 ) && (xP > 5 && xP < 167))
        {
            this.setVisible("W", false);
            this.setVisible("S", false);
            this.setVisible("P", true);
        }
        else if((yP > 275 && yP < 360 ) && (xP > 5 && xP < 167))
        {
            this.setVisible("S", false);
            this.setVisible("P", false);
            this.setVisible("W", true);
        }
    }

    updateOnOpen()
    {
        // Set initial state
        this.setVisible("W", false);
        this.setVisible("P", false);
        this.setVisible("S", true);
    }

    setVisible(Zone, NewValue)
    {
        this.currentClues = playerNotebook.getInformation(Zone);

        switch(Zone)
        {
            case "S":
                // We set the value for the suspect window
                this.suspectsWindow.visible = NewValue;

                for(let i = 0; i < this.colorCharacters.length; i++)
                {
                    let charTemp = this.colorCharacters[i];
                    let clueTemp = this.currentClues[i];
                    if(clueTemp.discovered == true)
                    {
                        charTemp.visible = true;
                    }
                }

                this.setText("Here are the details of everyone involved in Park's death.");
            break; 
            case "P":
                // We set the value for the suspect window
                this.placesWindow.visible = NewValue;

                this.setText("Here are the details of all the possible places where Park could have been killed.");
            break;  
            case "W":
                // We set the value for the suspect window
                this.weaponsWindow.visible = NewValue;

                this.setText("Here are the details of all the possible weapons that could have been used to killed Park.");
        break;  
        }
    }

    getClueInformation(ClueType, ClueIndex)
    {
        let clue = playerNotebook.getClue(ClueType, ClueIndex);
        let newText = clue.name + ": \n"+clue.getDescription();
        this.setText(newText);
    }

    setText(newText)
    {
        this.noteBookText.text = newText;
    }

}