class HUDManager
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Notebook
        this.theNotebook;
        // Highlight of the mute button
        this.muteHigh;
        // Highlight of the Notebook button
        this.notePressed;        

        this.canShowMessage = true;

        //-----------------------------
        // GAME OVER SCREEN
        //----------------------------
        this.gameOverScreen;
        this.retryButton;
        this.titleScreen;

        //-----------------------------
        // WINNER SCREEN
        //----------------------------
        this.winnerScreen;
        this.winnerTitleScreen;

        this.showTween;

        this.FullScreen;
    }

    //-------------------------
    // Functions
    //-------------------------
    preload()
    {
        currentScene.load.image('MuteBtn', 'assets/sprites/HUD/MuteBtn.png');
        currentScene.load.image('MuteHigh', 'assets/sprites/HUD/MuteHigh.png');
        currentScene.load.image('GameOver', 'assets/sprites/HUD/WinLoseScreens/GameOver.png');
        currentScene.load.image('Winner', 'assets/sprites/HUD/WinLoseScreens/Victory.png');

        currentScene.load.spritesheet('Notebook', 'assets/sprites/HUD/Notebook.png',
        {frameWidth: 252.8, frameHeight: 184.5});
        currentScene.load.image('NotePressed', 'assets/sprites/HUD/NotePressed.png');
        fullScreenPower.preload();
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
         (currentScene.sound.volume > 0) ? this.muteHigh.visible = false: this.muteHigh.visible = true;

         this.theNotebook = this.createNotebook(topBackgroundXOrigin-355, topBackgroundYOrigin+195);
         this.assignBehaviour(this.theNotebook, 'Notebook');
           
         this.notePressed = currentScene.add.image(topBackgroundXOrigin-400, topBackgroundYOrigin+195, 'NotePressed');
         this.assignBehaviour(this.notePressed, 'NotePressed');
         this.notePressed.visible = false;
         
         //--------------------------------------------
         // GAME OVER SCREEN
         //--------------------------------------------
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

         //--------------------------------------------
         // WINNER SCREEN
         //--------------------------------------------
         this.winnerScreen = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Winner');
         this.assignBehaviour(this.winnerScreen, "Winner");

         fullScreenPower.create();
         this.openSpecialScreen(false, false);
         this.openSpecialScreen(true, false);
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
                theButton.on('pointerdown', ()=> this.enablePressedButton(this.muteHigh));
                theButton.on('pointerdown', ()=> musicManager.muteMusic());
                theButton.on('pointerdown', ()=> this.notifyHUDInteracted(true));
                theButton.on('pointerup', ()=> this.notifyHUDInteracted(false));
                theButton.on('pointerout', ()=> this.notifyHUDInteracted(false));
            break;
            case "Notebook":
                theButton.setInteractive();
                theButton.on('pointerdown', ()=> this.enableHighlight(this.notePressed, true));
                theButton.on('pointerup', ()=> this.enableHighlight(this.notePressed, false));
                theButton.on('pointerup', ()=> openNotebook(true));
                theButton.on('pointerout', ()=> this.enableHighlight(this.notePressed, false));
            break;
            case "Retry":
                theButton.setInteractive();
                theButton.on('pointerdown', function(){
                    this.setScale(1.2);
                    GameManager.HUDInteracted = true;
                });
                theButton.on('pointerup', function(){
                    this.setScale(1);
                    GameManager.loadLastCheckpoint();
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
                    GameManager.loseGame();
                });
            break;
        }
    }

    /**
     * Method that creates the Notebook and the anims for the animation states
     * @param {*} posX 
     * @param {*} posY 
     */
    createNotebook(posX, posY)
    {
        let notebook = currentScene.add.sprite(posX, posY, 'Notebook');
        //notebook.body.setSize(notebook.width - 20, notebook.height, notebook);
        
        //  Our player animations, turning, walking left and walking right.
        if(currentScene.anims.get('NoteIddle') == undefined && currentScene.anims.get('NoteHighlight') == undefined)
        {
            currentScene.anims.create({
                key: 'NoteHighlight',
                frames: currentScene.anims.generateFrameNumbers('Notebook', { frames: [0,1,2,3,4,5,6,7,8,9,9,9,9,9] }),
                frameRate: 12,
                yoyo: true,
            });
            currentScene.anims.create({
                key: 'NoteIddle',
                frames: [ { key: 'Notebook', frame: 0 } ],
                frameRate: 1
            });
            notebook.anims.play('NoteIddle');
        }
        return notebook;
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
            this.winnerScreen.visible = newValue;
        }
    }

    playNewNoteMessage()
    {
        this.theNotebook.anims.play('NoteHighlight');
    }

    enablePressedButton(highlighButton)
    {
        (highlighButton.visible == false) ? highlighButton.visible = true : highlighButton.visible = false;
    }

    /**
     * Enables/Disables the Highlight state of a button
     * @param {*The Highlight of the button} theHighlight 
     * @param {*The Value that determines if we enable/disable the highlight of the button} newValue 
     */
    enableHighlight(theHighlight, newValue)
    {
        theHighlight.visible = newValue;
        this.notifyHUDInteracted(newValue);
    }

    notifyHUDInteracted(newValue)
    {
        GameManager.HUDInteracted = newValue;
    }
}