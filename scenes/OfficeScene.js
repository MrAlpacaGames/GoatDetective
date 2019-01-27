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

        // Click FX
        var clickFx;

        this.dialogueHUD = new DialogueHUD();
    }

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
        this.dialogueHUD.createDialogueWindow();
        currentDialogueHUD = this.dialogueHUD;

        // HUD
        HUDSpriteManager.createHUD();

        // Click FX
        this.clickFx = spriteManager.createClickFx();    
        this.input.on('pointerdown', () => spriteManager.clickEffect(this.clickFx, this.input.activePointer));

    }

}