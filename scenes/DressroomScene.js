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