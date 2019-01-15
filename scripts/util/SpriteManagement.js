class SpriteManagement
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
        
    }

    //--------------------------------
    // Functions
    //--------------------------------

    preloadCharacters()
    {
        currentScene.load.spritesheet('ClickFire', 'assets/sprites/Particles/Click.png',
        {frameWidth: 64, frameHeight: 64});

        currentScene.load.spritesheet('Peterson', 'assets/sprites/Characters/Cabra.png',
        {frameWidth: 370.57, frameHeight: 758});

        currentScene.load.spritesheet('Assatari', 'assets/sprites/Characters/Productora.png',
        {frameWidth: 266.75, frameHeight: 636});

        currentScene.load.image('Park', 'assets/sprites/Characters/Park.png');

        currentScene.load.spritesheet('Lee', 'assets/sprites/Characters/Lee2.png',
        {frameWidth: 395.5, frameHeight: 1133});

        currentScene.load.spritesheet('Jung', 'assets/sprites/Characters/Jung.png',
        {frameWidth: 326.125, frameHeight: 691});

        currentScene.load.spritesheet('Ruru', 'assets/sprites/Characters/Ruru.png',
        {frameWidth: 422.75, frameHeight: 1002});
    }

    preloadEnvironment()
    {
        let sceneName = currentScene.scene.key;
        switch(sceneName)
        {
            case 'HallScene':
                currentScene.load.image('hall', 'assets/sprites/Scenarios/Hall/theHall.png');
                currentScene.load.image('studioDoor', 'assets/sprites/Scenarios/Hall/studio_doors.png');
                currentScene.load.image('dressromDoor', 'assets/sprites/Scenarios/Hall/dressroom_doors.png');
                currentScene.load.image('officeDoor', 'assets/sprites/Scenarios/Hall/stairs.png');
            break;
            case 'OfficeScene':
                currentScene.load.image('office', 'assets/sprites/Scenarios/Office/Office.png');
                currentScene.load.image('hallDoor', 'assets/sprites/Scenarios/Office/hallDoor.png');
            break;
        }
    }

    preloadItems()
    {
        switch(currentScene)
        {
            case currentScene.name = 'UINotebook':
                currentScene.load.image('hall', 'assets/sprites/Items/Notebook.png');
            break;
        }
    }

    /**
     * Creates Goatman Peterson in the scene and puts in in a certain position
     * @param {*X Position where Goatman will be} posX 
     * @param {*Y Position where Goatman will be} posY 
     */
    createPlayer(posX, posY)
    {
        let player = currentScene.physics.add.sprite(posX, posY, 'Peterson');
        player.setName('Peterson');
        player.setScale(0.42);
        player.setCollideWorldBounds(true);
        
        if(hasStartedGame == false)
        {
            //  Our player animations, turning, walking left and walking right.
            currentScene.anims.create({
                key: 'walking',
                frames: currentScene.anims.generateFrameNumbers('Peterson', { start: 1, end: 6 }),
                frameRate: 6,
                repeat: -1
            });        
            currentScene.anims.create({
                key: 'quiet',
                frames: [ { key: 'Peterson', frame: 0 } ],
                frameRate: 1
            });
        }
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
        newCharacter = currentScene.physics.add.staticSprite(posX, posY, character).setScale(scale);
        newCharacter.setName(character);
        newCharacter.refreshBody();
        if(character != 'Park')
        {
            if(hasStartedGame == false)
            {
                currentScene.anims.create({
                    key: character + 'Idle',
                    frames: currentScene.anims.generateFrameNumbers(character,{start: 0, end: 7}),
                    frameRate: 6,
                    repeat: -1
                })
            }
            newCharacter.anims.play(character+'Idle');
        }
        
        newCharacter.setInteractive();
        newCharacter.on('pointerdown', () => this.onElementClicked(newCharacter, true));
        newCharacter.on('pointerup', () => this.onElementClicked(newCharacter, false));
        newCharacter.on('pointerout', () => this.onElementClicked(newCharacter, false));
        return newCharacter;
    }

    createEnvironment(element, posX, posY, scale)
    {
        let environment = currentScene.physics.add.staticSprite(posX, posY, element);
        environment.setName(element);
        environment.setScale(scale);
        environment.refreshBody();

        if(element != 'hall' && element != 'office')
        {
            environment.setInteractive();
            environment.on('pointerdown', () => this.onElementClicked(environment, true));
            environment.on('pointerup', () => this.onElementClicked(environment, false));
            environment.on('pointerout', () => this.onElementClicked(environment, false));
        }
        return environment;
    }

    /**
     * Method that creates the Click FX
     */
    createClickFx()
    {
        let clickFx;
        if(hasStartedGame == false)
        {
            currentScene.anims.create({
                key: 'ShowClick',
                frames: currentScene.anims.generateFrameNumbers('ClickFire',{start:0, end: 15}),
                frameRate: 30,
            })
        }
        clickFx = currentScene.add.sprite(0, 0);
        clickFx.setScale(1.5);

        return clickFx;
    }

    onElementClicked(character, newValue)
    {
        if(character.name == "HUD")
        {
            GameManager.HUDInteracted = newValue;
        }
        if(GameManager.canMove == true)
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