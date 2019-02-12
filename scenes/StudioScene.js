class StudioScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'StudioScene'
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

        // Arcade Sprite of Ruru
        this.ruru;
    }

    //-------------------------
    // Functions
    //-------------------------

    preload()
    {
        currentScene = this;
        loadingScreen.createLoadingScreen();
        spriteManager.preloadCharacters();
        spriteManager.preloadEnvironment();
        this.playerHUD.preload();
        this.dialogueHUD.preloadDialogue();
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
        spriteManager.createEnvironment('studio', topBackgroundXOrigin+ 763, topBackgroundYOrigin - 2, 0.72);
        
        this.cameras.main.setBounds(390, 0, gameConfig.width * 2.1, gameConfig.height);
        this.physics.world.setBounds(topBackgroundXOrigin+230, 0, gameConfig.width * 1.42, gameConfig.height -16 );        
        
        // Environment
        let hallDoor = spriteManager.createEnvironment('studioToHall', topBackgroundXOrigin+ 1735, topBackgroundYOrigin+97.1, 0.72);

        // Ruru
        this.ruru = spriteManager.createStaticCharacter('Ruru', topBackgroundXOrigin+900, topBackgroundYOrigin+114, 0.26);
        this.ruru.setFlip(true);

         // Items Creation
        let recorder = spriteManager.createItem('Recorder', topBackgroundXOrigin+74, topBackgroundYOrigin+175, 0.73);

        // Main Player
        this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin+1540,  topBackgroundYOrigin+90);
        this.playerSprite.setFlip(true);
       
        thePlayer.reloadPlayer();
        thePlayer.assignOnEvents();
        
        // Dialogue Window
        this.dialogueHUD.createDialogueWindow();
        currentDialogueHUD = this.dialogueHUD;

        // HUD
        this.playerHUD.createHUD();
        currentPlayerHUD= this.playerHUD;
         
        // Click FX
        this.clickFx = spriteManager.createClickFx();    
        this.input.on('pointerdown', () => spriteManager.clickEffect(this.clickFx, this.input.activePointer));

        onSceneEnterNotebook(this.scene.key);
    }

    update()
    {
        if(musicManager.mainWebSound != undefined)
        {
            musicManager.checkOnMusic();
        }
    }
}