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
        var spriteMngScript;
    }

    //-------------------------
    // Functions
    //-------------------------

    preload()
    {
        this.spriteMngScript = new SpriteManagement(this);
        this.spriteMngScript.preloadCharacters();
    }

    create()
    {        
        let hallBack = this.add.image(topBackgroundXOrigin+815, topBackgroundYOrigin-2, 'hall');
        hallBack.setScale(0.72);
        
        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height);
        this.physics.world.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height -40 );

        // Characters Creation

        this.interactuables = this.add.container();

        let newCharacter;

        newCharacter = this.spriteMngScript.createStaticCharacter('Assatari', topBackgroundXOrigin+1000, topBackgroundYOrigin+80, 0.42);
        this.interactuables.add(newCharacter);

        /** 
        this.highInteractuables = this.add.container();

        this.spriteMngScript.createStaticCharacter(this.interactuables, "Park", topBackgroundXOrigin+800,topBackgroundYOrigin+200);
        this.spriteMngScript.createStaticCharacter(this.highInteractuables, "ParkHigh", topBackgroundXOrigin+800,topBackgroundYOrigin+200);

        this.spriteMngScript.createStaticCharacter(this.interactuables, "Jung", topBackgroundXOrigin+1000,topBackgroundYOrigin+50);
        this.spriteMngScript.createStaticCharacter(this.highInteractuables, "JungHigh", topBackgroundXOrigin+1000,topBackgroundYOrigin+50);

        this.highInteractuables.getAt(0).setVisible(false);
        this.interactuables.getAt(0).setInteractive();
        this.interactuables.getAt(0).on('pointerdown',() =>this.highlightInteractuable(0, true));
        this.interactuables.getAt(0).on('pointerup',() =>this.highlightInteractuable(0, false));


        this.highInteractuables.getAt(1).setVisible(false);
        this.interactuables.getAt(1).setInteractive();
        this.interactuables.getAt(1).on('pointerdown',() =>this.highlightInteractuable(1, true));
        this.interactuables.getAt(1).on('pointerup',() =>this.highlightInteractuable(1, false));
        //this.physics.add.collider(this.player, this.interactuables.getAt(0));
        this.physics.add.overlap(this.player, this.interactuables.getAt(0), this.interact);
        */

        this.player = this.spriteMngScript.createPlayer(topBackgroundXOrigin+550,  topBackgroundYOrigin+90);

        this.clickFx = this.spriteMngScript.createClickFx();    
       
        this.playerScript = new Player(this, this.player, 200);
        this.input.on('pointerdown', () => this.playerScript.clickAction(this.input.activePointer));
        this.input.on('pointerdown', () => this.spriteMngScript.clickEffect(this.clickFx, this.input.activePointer));


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