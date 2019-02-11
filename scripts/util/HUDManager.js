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

        this.noteIdle;

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

        //----------------------------
        // CONFRONTATION IMAGE
        //---------------------------
        // Image of the confrontation.
        // It initial Position in Y is: topBackgroundYOrigin - 540
        // It's final position in Y is: topBackgroundYOrigin
        this.confrontationImg;
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
        currentScene.load.image('Confrontation', 'assets/sprites/HUD/Confront.png');
        currentScene.load.image('ConfrontBack', 'assets/sprites/HUD/ConfrontBack.png');

        currentScene.load.image('NoteIdle', 'assets/sprites/HUD/Agenda.png');
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
         musicManager.muteButtons.push(this.muteHigh);

         this.theNotebook = this.createNotebook(topBackgroundXOrigin-355, topBackgroundYOrigin+195);
         this.assignBehaviour(this.theNotebook, 'NoteAnimated');
         this.assignBehaviour(this.noteIdle, 'Notebook');
           
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

         this.confrontBack = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'ConfrontBack');
         this.confrontBack.scrollFactorX = 0;
         this.confrontBack.name = "HUD";
         this.confrontBack.visible = false;
         this.confrontationImg = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin - 540, 'Confrontation');
         this.assignBehaviour(this.confrontationImg, "Confrontation");
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
                    GameManager.backToTitle();
                });
            break;
            case "Winner":
                // If the player touchs the victory screen it goes to the credits
                theButton.on('pointerdown', ()=> this.winScreenTouched());
            break;
        }
    }

    /**
     * Function that send us to the credits after we have won the game
     */
    winScreenTouched()
    {
        currentPlayerHUD.winnerScreen.visible = false;
        enableCredits(currentScene.gameCredits, true);
    }

    /**
     * Method that creates the Notebook and the anims for the animation states
     * @param {*} posX 
     * @param {*} posY 
     */
    createNotebook(posX, posY)
    {
        this.noteIdle = currentScene.add.sprite(posX-55, posY, 'NoteIdle');
        let notebook = currentScene.add.sprite(posX, posY, 'Notebook');
        
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
            // We activate the screen
            this.gameOverScreen.visible = newValue;
            this.retryButton.visible = newValue;
            this.titleScreen.visible = newValue;
        }
        else
        {
            this.winnerScreen.visible = newValue;
            if(newValue)
            {
                currentDialogueHUD.enableDialogueUI(false);
                currentScene.activateBlacEndingWindow(false);
                // We delay activate the interactiveness of the screen
                let activateScreen = currentScene.time.delayedCall(1500, function(){
                    currentPlayerHUD.winnerScreen.setInteractive();
                });
                // We play the victory song
                musicManager.changeTheme('Win');
            }
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
        if(!globalLockdown)
        {
            theHighlight.visible = newValue;
            this.notifyHUDInteracted(newValue);
        }
    }

    /**
     * Method that notifies that the HUD has been interacted and that it wasn't a player movement action
     * @param {*New Value for the notification.} newValue 
     */
    notifyHUDInteracted(newValue)
    {
        GameManager.HUDInteracted = newValue;
    }

    /**
     * Function that starts the confrontation against a character
     * It begins, by starting a global lockdown. Reproduces the animation and then removes the lockdown and starts the 
     * Confrontation
     */
    startConfrontation(humanConfronting)
    {
        if(globalLockdown == false)
        {
            console.log("Previous Game State prior to confrontation is: "+GameManager.stateOfGame);
            currentDialogueHUD.enableDialogueUI(false);
            let confrontBack = this.confrontBack;
            let confrontImg = this.confrontationImg;
            globalLockdown = true;
            // Once we start the confrontation we advance to the next game state and we set the has been confronted state to true
            playerNotebook.updateGameState(GameManager.stateOfGame+1);
            humanConfronting.hasBeenConfronted = true;

            let confrontTimeline = currentScene.tweens.createTimeline();

            confrontTimeline.add(
            {
                targets: confrontImg,
                y: topBackgroundYOrigin,
                duration: 600,
                hold: 500,
                onStart: function()
                {
                    confrontBack.visible = true;
                    sfxManager.playSFX(3);
                    thePlayer.player.anims.play('confront');
                },
                onComplete: function()
                {
                    musicManager.changeTheme('Confront');
                    sfxManager.playSFX(4);
                }
            });
            confrontTimeline.add(
            {
                targets: confrontImg,
                y: topBackgroundYOrigin+580,
                duration: 400,
                onComplete: function()
                {
                    confrontBack.visible = false;
                    confrontImg.y = topBackgroundYOrigin - 540;
                    let dialogueID = playerNotebook.getConfrontationID(humanConfronting); 
                    dialogueManager.startDialogue(dialogueID);
                }
            });

            confrontTimeline.play();
        }
    }

    checkMuteStatus()
    {
        musicManager.muteButtons.forEach(element => {
            (currentScene.sound.volume > 0) ? element.visible = false: element.visible = true;
        });
    }
}