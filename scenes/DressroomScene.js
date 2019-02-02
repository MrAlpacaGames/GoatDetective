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
    }

    //-------------------------
    // Functions
    //-------------------------

    preload()
    {
        currentScene = this;
        spriteManager.preloadCharacters();
        spriteManager.preloadEnvironment();
        this.playerHUD.preload();
        this.dialogueHUD.preloadDialogue();

        if(hasStartedGame == false)
        {
            dialogueManager.preloadJson();
            sfxManager.preloadSFX();
        }
    }

    create()
    {      
        spriteManager.createEnvironment('dressroom', topBackgroundXOrigin+ 763, topBackgroundYOrigin - 2, 0.72);
        
        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.59, gameConfig.height);
        this.physics.world.setBounds(280, 0, gameConfig.width * 1.8, gameConfig.height -16 );        
        
        // Environment
        let hallDoor = spriteManager.createEnvironment('dressToHall', 245.5, topBackgroundYOrigin+93, 0.72);

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
    }
}