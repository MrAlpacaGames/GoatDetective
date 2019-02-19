class DressroomScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'DressroomScene'
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

        this.studioKey;
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
        spriteManager.createEnvironment('dressroom', topBackgroundXOrigin+ 763, topBackgroundYOrigin+3, 0.72);
        
        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.59, gameConfig.height);
        this.physics.world.setBounds(280, 0, gameConfig.width * 1.8, gameConfig.height -22 );        
        
        // Environment
        let hallDoor = spriteManager.createEnvironment('dressToHall', 250, topBackgroundYOrigin+88, 0.72);

        // Items Creation
        this.studioKey = spriteManager.createItem('Key', topBackgroundXOrigin+600, topBackgroundYOrigin+55, 0.35);
        this.studioKey.visible = false;
        this.studioKey.angle = 90;
        if(playerNotebook.parkDiscovered && playerNotebook.hasTheKey == false)
        {
            this.studioKey.visible = true;
        }

        // Jung Drawer
        let drawer = spriteManager.createDrawer('JungDrawer', 'Drawer', topBackgroundXOrigin+373.5, topBackgroundYOrigin+102, 0.63);
        drawer.setScale(0.72, 0.64);

        // Park Drawer
        drawer = spriteManager.createDrawer('ParkDrawer', 'Drawer', topBackgroundXOrigin+784.5, topBackgroundYOrigin+102, 0.63);
        drawer.setScale(0.72, 0.64);

        // Lee Drawer
        drawer = spriteManager.createDrawer('LeeDrawer', 'Drawer', topBackgroundXOrigin+1189, topBackgroundYOrigin+102, 0.63);
        drawer.setScale(0.72, 0.64);

        // Characters

        let lee = spriteManager.createStaticCharacter('Lee', topBackgroundXOrigin+1600, topBackgroundYOrigin+100, 0.25);        
        
        // Main Player
        this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin-200,  topBackgroundYOrigin+90);

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

        onSceneEnterNotebook(this.scene.key);
        //-------------------------------------
        // ON LOAD
        //------------------------------------
        if(GameManager.stateOfGame > 1)
        {
            // On state +2 we have already discovered the key.
            this.studioKey.visible = false;
        }
    }

    makeKeyVisible()
    {
        if(this.studioKey != undefined && playerNotebook.hasTheKey == false && playerNotebook.parkDiscovered && GameManager.stateOfGame > 0) this.studioKey.visible = true;
    }

    update()
    {
        if(musicManager.mainWebSound != undefined)
        {
            musicManager.checkOnMusic();
        }
    }
}