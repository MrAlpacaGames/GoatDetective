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

        this.dialogueHUD = new DialogueHUD();
    }

    //-------------------------
    // Functions
    //-------------------------

    preload()
    {
        currentScene = this;
        spriteManager.preloadCharacters();
        spriteManager.preloadEnvironment();
        HUDSpriteManager.preload();
        this.dialogueHUD.preloadDialogue();

        if(hasStartedGame == false)
        {
            dialogueManager.preloadJson();
            sfxManager.preloadSFX();
        }
    }

    create()
    {      
        spriteManager.createEnvironment('studio', topBackgroundXOrigin+ 763, topBackgroundYOrigin - 2, 0.72);
        
        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.59, gameConfig.height);
        this.physics.world.setBounds(topBackgroundXOrigin+225, 0, gameConfig.width * 1.42, gameConfig.height -16 );        
        
        // Environment
        let hallDoor = spriteManager.createEnvironment('studioToHall', topBackgroundXOrigin+ 1735, topBackgroundYOrigin+97.1, 0.72);

        let ruru = spriteManager.createStaticCharacter('Ruru', topBackgroundXOrigin+900, topBackgroundYOrigin+114, 0.26);
        ruru.setFlip(true);
        // Main Player
        this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin+1550,  topBackgroundYOrigin+90);
        this.playerSprite.setFlip(true);
       
        thePlayer.reloadPlayer();
        thePlayer.assignOnEvents();
        
        // Dialogue Window
        this.dialogueHUD.createDialogueWindow();
        currentDialogueHUD = this.dialogueHUD;

        // HUD
        HUDSpriteManager.createHUD();
         
        // Click FX
        this.clickFx = spriteManager.createClickFx();    
        this.input.on('pointerdown', () => spriteManager.clickEffect(this.clickFx, this.input.activePointer));

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
}