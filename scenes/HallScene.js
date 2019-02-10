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


        if(hasStartedGame == false)
        {
            dialogueManager.preloadJson();
            sfxManager.preloadSFX();
        }
    }

    create()
    {      
        musicManager.createThemes();

        spriteManager.createEnvironment('hall', topBackgroundXOrigin+ 815, topBackgroundYOrigin - 2, 0.72);
        
        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height);
        this.physics.world.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height -40 );        
        
        // Environment
        let studioDoor = spriteManager.createEnvironment('studioDoor', 244.1, topBackgroundYOrigin+33, 0.72);

        let stairs = spriteManager.createEnvironment('officeDoor', topBackgroundXOrigin+813, topBackgroundYOrigin+78, 0.72);

        let dressroom = spriteManager.createEnvironment('dressromDoor', topBackgroundXOrigin+1790.5, topBackgroundYOrigin+32.5, 0.72);

        // Items Creation
        let sweatyPuddle = spriteManager.createItem('Puddle', topBackgroundXOrigin+400, topBackgroundYOrigin+210, 0.35);

        // Characters Creation
        let park = spriteManager.createStaticCharacter('Park', topBackgroundXOrigin+200, topBackgroundYOrigin+200, 0.25);

        if(GameManager.stateOfGame == 0)
        {
            let jung = spriteManager.createStaticCharacter('Jung', topBackgroundXOrigin+1000, topBackgroundYOrigin+80, 0.42);
            
            // Main Player
            this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin,  topBackgroundYOrigin+90);
        }        
        thePlayer.reloadPlayer();
        thePlayer.assignOnEvents();
        
        // Dialogue Window
        this.dialogueHUD.createDialogueWindow();
        currentDialogueHUD = this.dialogueHUD;

        // HUD
        this.playerHUD.createHUD();
        currentPlayerHUD = this.playerHUD;
         
        // Click FX
        this.clickFx = spriteManager.createClickFx();    
        this.input.on('pointerdown', () => spriteManager.clickEffect(this.clickFx, this.input.activePointer));

        if(hasStartedGame == false)
        {
            // If this is the first time we get to this scene we initialize the main game objects like the notebook
            hasStartedGame = true;
            
            dialogueManager.createDialogues();
            sfxManager.createSFX();

        }

        onSceneEnterNotebook(this.scene.key);

        musicManager.changeTheme('Exploring', false);
        this.beginScene();
    }


    beginScene()
    {
        let timedEvent = currentScene.time.delayedCall(120, function()
        {
            switch(GameManager.stateOfGame)
            {
                case 0:
                    //dialogueManager.startDialogue("SPet0x0");
                break;
                case 1:

                break;
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