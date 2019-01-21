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
    }

    create(newClue)
    {
        let theClue = newClue;
        //console.log(theClue.getName());
        spriteManager.createEnvironment('office', topBackgroundXOrigin+ 815, topBackgroundYOrigin - 2, 0.72);

         // Environment
         let studioDoor = spriteManager.createEnvironment('hallDoor', topBackgroundXOrigin+1790.5, topBackgroundYOrigin+32.5, 0.72);
         //this.interactuables.add(studioDoor);

         // Characters Creation
        let assattari = spriteManager.createStaticCharacter('Assattari', topBackgroundXOrigin+220, topBackgroundYOrigin+78, 0.45);
        assattari.setFlip(true);

        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height);
        this.physics.world.setBounds(560, 0, gameConfig.width * 2.7, gameConfig.height -40 );   

        // Main Player
        this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin+1500,  topBackgroundYOrigin+100);
        this.playerSprite.setFlip(true);
        thePlayer.assignScene(this.playerSprite);
        thePlayer.assignOnEvents();


        // Click FX
        this.clickFx = spriteManager.createClickFx();    
        this.input.on('pointerdown', () => spriteManager.clickEffect(this.clickFx, this.input.activePointer));
        if(hasStartedGame == false)
        {
            // If this is the first time we get to this scene we initialize the main game objects like the notebook
            hasStartedGame = true;
        }
    }

}