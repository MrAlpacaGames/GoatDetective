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
        var player;

        // List of interactuables to be displayed
        var interactuables;

        // List of highlighted interactuables to be displayed
        var highInteractuables;

        // Click FX
        var clickFx;

        // Script that handles the player 
        var playerScript;

        // Script that handles the sprites of the interactuables
        var spriteManager;

        // Script that handles the interaction between objects
        var interactManager;
    }

    //-------------------------
    // Functions
    //-------------------------

    preload()
    {
        this.spriteManager = new SpriteManagement(this);
        this.spriteManager.preloadCharacters();

        this.interactManager = new InteractionManagement(this);
    }

    create()
    {        
        let hallBack = this.add.image(topBackgroundXOrigin+815, topBackgroundYOrigin-2, 'hall');
        hallBack.setScale(0.72);
        
        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height);
        this.physics.world.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height -40 );
        
        // Characters Creation
        
        // Characters
        this.interactuables = this.add.container();

        let park = this.spriteManager.createStaticCharacter('Park', topBackgroundXOrigin+800, topBackgroundYOrigin+200, 0.25);
        this.interactuables.add(park);

        let assattari = this.spriteManager.createStaticCharacter('Assatari', topBackgroundXOrigin+1000, topBackgroundYOrigin+80, 0.42);
        this.interactuables.add(assattari);

        let lee = this.spriteManager.createStaticCharacter('Lee', topBackgroundXOrigin+520, topBackgroundYOrigin+80, 0.25);
        lee.setFlip(true);
        this.interactuables.add(lee);

        let ruru = this.spriteManager.createStaticCharacter('Ruru', topBackgroundXOrigin+950, topBackgroundYOrigin+110, 0.25);
        this.interactuables.add(ruru);

        // Main Player
        this.player = this.spriteManager.createPlayer(topBackgroundXOrigin+550,  topBackgroundYOrigin+90);
        this.playerScript = new Player(this, this.player, 200);
        this.input.on('pointerdown', () => this.playerScript.clickAction(this.input.activePointer));
        this.interactManager.assignPlayer(this.playerScript, this.player);

        // Click FX
        this.clickFx = this.spriteManager.createClickFx();    
        this.input.on('pointerdown', () => this.spriteManager.clickEffect(this.clickFx, this.input.activePointer));

        // Interactions
        this.interactManager.setInteractionWithPlayer(park); 
        this.interactManager.setInteractionWithPlayer(assattari);
    }

    interact(player, interactItem)
    {
        console.log("Heeerooooo Mon");
    }

    highlightInteractuable(index, newValue)
    {
        this.highInteractuables.getAt(index).setVisible(newValue);
    }


}