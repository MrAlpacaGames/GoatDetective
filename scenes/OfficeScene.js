class OfficeScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'OfficeScene'
        });
        //-------------------------
        // Attributes
        //-------------------------
        // Goatman Peterson
        var playerSprite;

        // List of interactuables to be displayed
        var interactuables;

        // Click FX
        var clickFx;
    }

    preload()
    {
        currentScene = this;
        spriteManager.preloadCharacters();
        spriteManager.preloadEnvironment();
        HUDSpriteManager.preload();
        this.dialogue.preloadDialogue();

        if(hasStartedGame == false)
        {
            dialogueManager.preloadJson();
            sfxManager.preloadSFX();
        }
    }

    create()
    {
        spriteManager.createEnvironment('office', topBackgroundXOrigin+ 843, topBackgroundYOrigin - 2, 0.72);

        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.55, gameConfig.height);
        this.physics.world.setBounds(700, 0, gameConfig.width +500, gameConfig.height -25 );  

        // Environment
        let officeDoor = spriteManager.createEnvironment('offToHall', topBackgroundXOrigin+ 1791, topBackgroundYOrigin+97, 0.72);

        // Characters Creation
        let assattari = spriteManager.createStaticCharacter('Assattari', topBackgroundXOrigin+200, topBackgroundYOrigin+100, 0.43);
        assattari.setFlip(true);
        

        // Main Player
        this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin+1520,  topBackgroundYOrigin+110);
        thePlayer.reloadPlayer();
        thePlayer.assignOnEvents();
        this.playerSprite.setFlip(true);

        // Dialogue Window
        //this.dialogue.createDialogueWindow();

        // HUD
        HUDSpriteManager.createHUD();

        // Click FX
        this.clickFx = spriteManager.createClickFx();    
        this.input.on('pointerdown', () => spriteManager.clickEffect(this.clickFx, this.input.activePointer));

        
        if(hasStartedGame == false)
        {
            // If this is the first time we get to this scene we initialize the main game objects like the notebook
            hasStartedGame = true;
            
            dialogueManager.createDialogues();
            sfxManager.createSFX();
           // this.dialog.init();
            //console.log(this.dialog);
        }
    }

}