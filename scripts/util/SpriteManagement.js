class SpriteManagement
{
    constructor(theScene)
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Current Scene
        this.scene = theScene;
    }

    //--------------------------------
    // Functions
    //--------------------------------

    preloadCharacters()
    {
        this.scene.load.image('hall', 'assets/sprites/Scenarios/theHall.png');
        this.scene.load.spritesheet('ClickFire', 'assets/sprites/Particles/Click.png',
        {frameWidth: 64, frameHeight: 64});

        this.scene.load.spritesheet('Peterson', 'assets/sprites/Characters/Cabra.png',
        {frameWidth: 370.57, frameHeight: 758});

        this.scene.load.spritesheet('Assatari', 'assets/sprites/Characters/Productora.png',
        {frameWidth: 266.75, frameHeight: 636});

        this.scene.load.image('Park', 'assets/sprites/Characters/Park.png');

        this.scene.load.spritesheet('Lee', 'assets/sprites/Characters/Lee2.png',
        {frameWidth: 395.5, frameHeight: 1133});

        this.scene.load.spritesheet('Ruru', 'assets/sprites/Characters/Ruru.png',
        {frameWidth: 422.75, frameHeight: 1002});

    }

    /**
     * Creates Goatman Peterson in the scene and puts in in a certain position
     * @param {*X Position where Goatman will be} posX 
     * @param {*Y Position where Goatman will be} posY 
     */
    createPlayer(posX, posY)
    {
        let player = this.scene.physics.add.sprite(posX, posY, 'Peterson');
        player.setScale(0.42);
        player.setCollideWorldBounds(true);
        
        //  Our player animations, turning, walking left and walking right.
        this.scene.anims.create({
            key: 'walking',
            frames: this.scene.anims.generateFrameNumbers('Peterson', { start: 1, end: 6 }),
            frameRate: 6,
            repeat: -1
        });        
        this.scene.anims.create({
            key: 'quiet',
            frames: [ { key: 'Peterson', frame: 0 } ],
            frameRate: 1
        });
        player.anims.play('quiet');

        return player;
    }

    /**
     * Method that creates an static character 
     * @param {*name of the character to be added} character 
     * @param {*X position where the character will be} posX 
     * @param {*Y position where the character will be} posY 
     * @param {*Scale of the character} scale
     */
    createStaticCharacter(character, posX, posY, scale)
    {
        let newCharacter;
        newCharacter = this.scene.physics.add.staticSprite(posX, posY, character).setScale(scale);
        newCharacter.refreshBody();

        if(character != 'Park')
        {
            this.scene.anims.create({
                key: character + 'Idle',
                frames: this.scene.anims.generateFrameNumbers(character,{start: 0, end: 7}),
                frameRate: 6,
                repeat: -1
            })
            newCharacter.anims.play(character+'Idle');
        }

        newCharacter.setInteractive();
        newCharacter.on('pointerdown', () => this.onCharacterClicked(newCharacter, true));
        newCharacter.on('pointerup', () => this.onCharacterClicked(newCharacter, false));
        newCharacter.on('pointerout', () => this.onCharacterClicked(newCharacter, false));
        return newCharacter;
    }

    /**
     * Method that creates the Click FX
     */
    createClickFx()
    {
        let clickFx;
        this.scene.anims.create({
            key: 'ShowClick',
            frames: this.scene.anims.generateFrameNumbers('ClickFire',{start:0, end: 15}),
            frameRate: 30,
        })
        clickFx = this.scene.add.sprite(0, 0);
        clickFx.setScale(1.5);

        return clickFx;
    }

    onCharacterClicked(character, newValue)
    {
        if(newValue == true)
        {
            character.setTint(0xff00ff, 0xff0000, 0x00ff00, 0x0000ff);
        }
        else
        {
            character.clearTint();
        }
    }

    /**
     * Method called when the player has tapped / clicked the screen and we play the fx
     * @param {*fx to be played in the game} clickFx 
     * @param {*position where the player has tapped/clicked} thePointer 
     */
    clickEffect(clickFx, thePointer)
    {
        clickFx.setPosition(thePointer.worldX, thePointer.worldY);
        clickFx.play('ShowClick', false);
    }


}