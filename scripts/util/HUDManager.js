class HUDManager
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Highlight of the mute button
        this.muteHigh;
        // Highlight of the Notebook button
        this.noteHigh;        
    }

    //-------------------------
    // Functions
    //-------------------------
    preload()
    {
        currentScene.load.image('MuteBtn', 'assets/sprites/HUD/MuteBtn.png');
        currentScene.load.image('MuteHigh', 'assets/sprites/HUD/MuteHigh.png');
        currentScene.load.image('BotonAgenda', 'assets/sprites/HUD/BotonAgenda.png');
        currentScene.load.image('BotonAgendaHigh', 'assets/sprites/HUD/BotonAgendaIluminado.png');
    }

    /**
     * Method that creates the HUD in the UI for the player
     */
    createHUD()
    {
        // The first button that will enable audio
         let muteBtn = currentScene.add.image(topBackgroundXOrigin-425, topBackgroundYOrigin-210, 'MuteBtn');
         this.assignBehaviour(muteBtn, 'MuteBtn');
 
         this.muteHigh = currentScene.add.image(topBackgroundXOrigin-425, topBackgroundYOrigin-210.5, 'MuteHigh');
         this.assignBehaviour(this.muteHigh, 'MuteHigh');
         this.muteHigh.visible = false;

         let notebook = currentScene.add.image(topBackgroundXOrigin-400, topBackgroundYOrigin+190, 'BotonAgenda');
         this.assignBehaviour(notebook, "Notebook");

         this.noteHigh = currentScene.add.image(topBackgroundXOrigin-400, topBackgroundYOrigin+190, 'BotonAgendaHigh');
         this.assignBehaviour(this.noteHigh, "NoteHigh");
         this.noteHigh.visible = false;         
    }

    /**
     * Method that assigns the behaviour to a specific button
     * @param {*The button to which we'll add a behaviour} theButton 
     * @param {*The desired behaviour of the button} behaviour 
     */
    assignBehaviour(theButton, behaviour)
    {
        theButton.scrollFactorX = 0;
        theButton.name = "HUD";

        switch(behaviour)
        {
            case "MuteBtn":
                theButton.setInteractive();
                theButton.on('pointerdown', ()=> this.enableHighlight(this.muteHigh, true));
                theButton.on('pointerdown', ()=> musicManager.muteMusic());
                theButton.on('pointerup', ()=> this.enableHighlight(this.muteHigh, false));
                theButton.on('pointerout', ()=> this.enableHighlight(this.muteHigh, false));
            break;
            case "Notebook":
                theButton.setInteractive();
                theButton.on('pointerdown', ()=> this.enableHighlight(this.noteHigh, true));
                theButton.on('pointerup', ()=> this.enableHighlight(this.noteHigh, false));
                theButton.on('pointerup', ()=> openNotebook(true));
                theButton.on('pointerout', ()=> this.enableHighlight(this.noteHigh, false));
            break;
        }
    }

    /**
     * Enables/Disables the Highlight state of a button
     * @param {*The Highlight of the button} theHighlight 
     * @param {*The Value that determines if we enable/disable the highlight of the button} newValue 
     */
    enableHighlight(theHighlight, newValue)
    {
        theHighlight.visible = newValue;
        GameManager.HUDInteracted = newValue;
    }
}