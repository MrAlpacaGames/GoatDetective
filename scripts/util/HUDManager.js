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

        //-----------------------------
        // GAME OVER SCREEN
        //----------------------------
        this.gameOverScreen;
        this.retryButton;
        this.titleScreen;
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
        currentScene.load.image('GameOver', 'assets/sprites/HUD/WinLoseScreens/GameOver.png');
        currentScene.load.image('Winner', 'assets/sprites/HUD/WinLoseScreens/Victory.png');
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

         this.noteHigh = currentScene.add.image(topBackgroundXOrigin-390, topBackgroundYOrigin+190, 'BotonAgendaHigh');
         this.assignBehaviour(this.noteHigh, "NoteHigh");
         this.noteHigh.visible = false;     
         
         this.gameOverScreen = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'GameOver');
         this.assignBehaviour(this.gameOverScreen, "GameOver");

         this.retryButton = currentScene.add.text(topBackgroundXOrigin-80, topBackgroundYOrigin+77, "RETRY", 
         { fontFamily: 'Asap', fontSize: 23 , color: '#f9e26e', align: 'center',
         wordWrap: {width: 200},
         wordWrapUseAdvanced: true
         });
         this.assignBehaviour(this.retryButton, "Retry");

         this.titleScreen = currentScene.add.text(topBackgroundXOrigin+35, topBackgroundYOrigin+77, "TITLE SCREEN", 
         { fontFamily: 'Asap', fontSize: 23 , color: '#f9e26e', align: 'center',
         wordWrap: {width: 200},
         wordWrapUseAdvanced: true
         });
         this.assignBehaviour(this.titleScreen, "Title");

         this.openSpecialScreen(false, false);
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
            case "Retry":
                theButton.setInteractive();
                theButton.on('pointerdown', function(){
                    this.setScale(1.2);
                    GameManager.HUDInteracted = true;
                });
                theButton.on('pointerup', function(){
                    this.setScale(1);
                    currentPlayerHUD.losingAction(false);
                });
                theButton.on('pointerout', function(){
                    this.setScale(1);
                    currentPlayerHUD.losingAction(false);
                });
            break;
            case "Title":
                theButton.setInteractive();
                theButton.on('pointerdown', function(){
                    this.setScale(1.2);
                    GameManager.HUDInteracted = true;
                });
                theButton.on('pointerup', function(){
                    this.setScale(1);
                    currentPlayerHUD.losingAction(true);
                });
                theButton.on('pointerout', function(){
                    this.setScale(1);
                    currentPlayerHUD.losingAction(true);
                });
            break;
        }
    }

    openSpecialScreen(isVictory, newValue)
    {
       // GameManager.canMove = !newValue;
        if(isVictory == false)
        {
            this.gameOverScreen.visible = newValue;
            this.retryButton.visible = newValue;
            this.titleScreen.visible = newValue;
        }
        else
        {

        }
    }

    losingAction(isTitle)
    {
        GameManager.HUDInteracted = false;
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