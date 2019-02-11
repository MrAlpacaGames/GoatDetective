class HallScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'HallScene'
        });
        //-------------------------
        // Attributes
        //-------------------------
        // Goatman Peterson
        var playerSprite;

        // Click FX
        var clickFx;

        // Dialouge HUD of this scene
        this.dialogueHUD = new DialogueHUD();

        // Player HUD of this scene
        this.playerHUD = new HUDManager();

        // Park
        this.park;
        
        // Poisoned Park
        this.poisonedPark;

        // Black Window for the end
        this.endingBlackWindow;

        // Credits Screen
        this.gameCredits;

        // Sweaty Puddle
        this.sweatyPuddle;
    }

    //-------------------------
    // Functions
    //------------------------

    preload()
    {
        currentScene = this;
        loadingScreen.createLoadingScreen();
        spriteManager.preloadCharacters();
        spriteManager.preloadEnvironment();
        this.dialogueHUD.preloadDialogue();
        this.playerHUD.preload();
        
        musicManager.preloadMusic();
        sfxManager.preloadSFX();
    }

    create()
    {      
        musicManager.createThemes();
        sfxManager.createSFX();

        /** This creates a hidden text that will enable the new Font*/
        this.add.text(0, 0, 'Hero Mon', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});

        spriteManager.createEnvironment('hall', topBackgroundXOrigin+ 815, topBackgroundYOrigin - 2, 0.72);
        
        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height);
        this.physics.world.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height -40 );        
        
        // Environment
        let studioDoor = spriteManager.createEnvironment('studioDoor', 244.1, topBackgroundYOrigin+33, 0.72);

        let stairs = spriteManager.createEnvironment('officeDoor', topBackgroundXOrigin+813, topBackgroundYOrigin+78, 0.72);

        let dressroom = spriteManager.createEnvironment('dressromDoor', topBackgroundXOrigin+1790.5, topBackgroundYOrigin+32.5, 0.72);

        // Items Creation
        this.sweatyPuddle = spriteManager.createItem('Puddle', topBackgroundXOrigin+400, topBackgroundYOrigin+210, 0.35);

        // Characters Creation
        this.park = spriteManager.createStaticCharacter('Park', topBackgroundXOrigin+200, topBackgroundYOrigin+200, 0.25);
        this.poisonedPark = spriteManager.createStaticCharacter('PoisonedPark', topBackgroundXOrigin+202, topBackgroundYOrigin+194, 0.42);
        this.poisonedPark.visible = false;

        let jung = spriteManager.createStaticCharacter('Jung', topBackgroundXOrigin+1000, topBackgroundYOrigin+80, 0.42);
        
        // Main Player
        this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin,  topBackgroundYOrigin+90);

        thePlayer.reloadPlayer();
        thePlayer.assignOnEvents();
                
        // HUD
        this.playerHUD.createHUD();
        currentPlayerHUD = this.playerHUD;

        // Ending Black Window
        this.endingBlackWindow = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Fondo');
        this.endingBlackWindow.scrollFactorX = 0;
        this.endingBlackWindow.visible = false;

        // Dialogue Window
        this.dialogueHUD.createDialogueWindow();
        currentDialogueHUD = this.dialogueHUD;

        // Credits Scene
        this.gameCredits = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'GameCredits');
        this.gameCredits.scrollFactorX = 0;
        this.gameCredits.setInteractive();
        this.gameCredits.on('pointerdown', ()=> GameManager.backToTitle());
        this.gameCredits.visible = false;
         
        // Click FX
        this.clickFx = spriteManager.createClickFx();    
        this.input.on('pointerdown', () => spriteManager.clickEffect(this.clickFx, this.input.activePointer));

        if(hasStartedGame == false)
        {
            // If this is the first time we get to this scene we initialize the main game objects like the notebook
            hasStartedGame = true;
        }

        onSceneEnterNotebook(this.scene.key);

        //this.beginScene();
        globalLockdown = false;
        endingPlaying = false;
    }

    activateBlacEndingWindow(newValue)
    {
        let newGlobalLockdownVal;
        (newValue) ? newGlobalLockdownVal = true : newGlobalLockdownVal = false;
        globalLockdown = newGlobalLockdownVal;
        this.endingBlackWindow.visible = newValue;
    }


    beginScene()
    {
        let timedEvent = currentScene.time.delayedCall(120, function()
        {
            if(GameManager.stateOfGame == 0)
            {
                dialogueManager.startDialogue("SGoatman0x0");
                globalLockdown = true;
            }  
        } , currentScene);
    }

    update()
    {
        if(musicManager.mainWebSound != undefined)
        {
            musicManager.checkOnMusic();
        }
    }
}