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

        // List of interactuables to be displayed
        var interactuables;

        // Click FX
        var clickFx;
    }

    //-------------------------
    // Functions
    //-------------------------

    preload()
    {
        currentScene = this;
        spriteManager.preloadCharacters();
        spriteManager.preloadEnvironment();
        //this.load.scenePlugin('DialogModalPlugin', 'scripts/ui/dialogue_plugin.js', 'dialogPlugin', 'dialog');
        this.dialogue.assignScene(this);
    }

    create()
    {      

        spriteManager.createEnvironment('hall', topBackgroundXOrigin+ 815, topBackgroundYOrigin - 2, 0.72);
        
        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height);
        this.physics.world.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height -40 );        
        
        // Characters
        this.interactuables = this.add.container();
        
        // Environment
        let studioDoor = spriteManager.createEnvironment('studioDoor', 244.1, topBackgroundYOrigin+33, 0.72);
        this.interactuables.add(studioDoor);

        let stairs = spriteManager.createEnvironment('officeDoor', topBackgroundXOrigin+813, topBackgroundYOrigin+78, 0.72);
        this.interactuables.add(stairs);

        let dressroom = spriteManager.createEnvironment('dressromDoor', topBackgroundXOrigin+1790.5, topBackgroundYOrigin+32.5, 0.72);
        this.interactuables.add(dressroom);
        
        // Characters Creation
        let park = spriteManager.createStaticCharacter('Park', topBackgroundXOrigin+800, topBackgroundYOrigin+200, 0.25);
        this.interactuables.add(park);

        let jung = spriteManager.createStaticCharacter('Jung', topBackgroundXOrigin+1000, topBackgroundYOrigin+80, 0.42);
        this.interactuables.add(jung);

        // Main Player
        this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin+250,  topBackgroundYOrigin+90);
        thePlayer.assignScene(this.playerSprite);
        thePlayer.assignOnEvents();

        this.dialogue.createDialogueWindow();
  
        // Click FX
        this.clickFx = spriteManager.createClickFx();    
        this.input.on('pointerdown', () => spriteManager.clickEffect(this.clickFx, this.input.activePointer));

        if(hasStartedGame == false)
        {
            // If this is the first time we get to this scene we initialize the main game objects like the notebook
            hasStartedGame = true;
            
            this.dialogue.hero();
           // this.dialog.init();
            //console.log(this.dialog);
        }
    }
}