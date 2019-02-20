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
        let sceneName = currentScene.scene.key;
        switch(sceneName)
        {
            case 'HallScene':
                currentScene.load.image('Park', 'assets/sprites/Characters/Park.png');
                currentScene.load.image('PoisonedPark', 'assets/sprites/Characters/PoisonedPark.png');
                currentScene.load.spritesheet('Jung', 'assets/sprites/Characters/Jung.png',
                {frameWidth: 326.125, frameHeight: 691});
            break;
            case 'OfficeScene':
                currentScene.load.spritesheet('Assattari', 'assets/sprites/Characters/Productora.png',
                {frameWidth: 266.75, frameHeight: 636});
            break;
            case 'StudioScene':
                currentScene.load.spritesheet('Ruru', 'assets/sprites/Characters/Ruru.png',
                {frameWidth: 422.75, frameHeight: 1002});
            break;  
            case 'DressroomScene':
                currentScene.load.spritesheet('Lee', 'assets/sprites/Characters/Lee2.png',
                {frameWidth: 395.5, frameHeight: 1133});
            break;  
        }
        currentScene.load.spritesheet('ClickFire', 'assets/sprites/Particles/NeoClick.png',
        {frameWidth: 64, frameHeight: 64});

        currentScene.load.spritesheet('Goatman', 'assets/sprites/Characters/Cabra.png',
        {frameWidth: 370.57, frameHeight: 758});

        currentScene.load.spritesheet('ConfrontGoat', 'assets/sprites/Characters/ConfrontGoat.png',
        {frameWidth: 416, frameHeight: 758});        
    }

    preloadEnvironment()
    {
        let sceneName = currentScene.scene.key;
        switch(sceneName)
        {
            case 'HallScene':
                currentScene.load.image('hall', 'assets/sprites/Scenarios/Hall/theHalldo.png');
                currentScene.load.image('studioDoor', 'assets/sprites/Scenarios/Hall/Hall_studioDoor.png');
                currentScene.load.image('dressromDoor', 'assets/sprites/Scenarios/Hall/Hall_dressroomDoor.png');
                currentScene.load.image('officeDoor', 'assets/sprites/Scenarios/Hall/HallStairs.png');
                currentScene.load.image('Puddle', 'assets/sprites/Items/Puddle.png');
            break;
            case 'OfficeScene':
                currentScene.load.image('office', 'assets/sprites/Scenarios/Office/Office.png');
                currentScene.load.image('offToHall', 'assets/sprites/Scenarios/Office/officeinDoor.png');
                currentScene.load.image('Chicken', 'assets/sprites/Items/ChickenDiamondo.png');
            break;
            case 'StudioScene':
                currentScene.load.image('studio', 'assets/sprites/Scenarios/Studio/Record.png');
                currentScene.load.image('studioToHall', 'assets/sprites/Scenarios/Studio/record_inDoor.png');
                currentScene.load.image('Recorder', 'assets/sprites/Scenarios/Studio/soundDesk.png');
                break;  
                case 'DressroomScene':
                currentScene.load.image('dressroom', 'assets/sprites/Scenarios/Dressroom/theDressroom.png');
                currentScene.load.image('dressToHall', 'assets/sprites/Scenarios/Dressroom/indoorDressroom.png');
                currentScene.load.image('Key', 'assets/sprites/Items/MagicKey.png');
                currentScene.load.image('Drawer', 'assets/sprites/Scenarios/Dressroom/dressroomDrawer.png');
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
        let player = currentScene.physics.add.sprite(posX, posY, 'Goatman');
        player.setName('Goatman');
        player.setScale(0.42);
        player.setCollideWorldBounds(true);
        
        //  Our player animations, turning, walking left and walking right.
        if(currentScene.anims.get('walking') == undefined && currentScene.anims.get('quiet') == undefined && currentScene.anims.get('confront') == undefined)
        {
            currentScene.anims.create({
                key: 'walking',
                frames: currentScene.anims.generateFrameNumbers('Goatman', { start: 1, end: 6 }),
                frameRate: 8,
                repeat: -1
            });
            currentScene.anims.create({
                key: 'quiet',
                frames: [ { key: 'Goatman', frame: 0 } ],
                frameRate: 1
            });
            currentScene.anims.create({
                key: 'confront',
                frames: [ { key: 'ConfrontGoat', frame: 0 } ],
                frameRate: 1
            });
            player.anims.play('quiet');
        }
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
        if(character != 'Park' && character != 'PoisonedPark')
        {
            if(currentScene.anims.get(character+'Idle') == undefined)
            {
                currentScene.anims.create({
                    key: character + 'Idle',
                    frames: currentScene.anims.generateFrameNumbers(character,{start: 0, end: 7}),
                    frameRate: 6,
                    repeat: -1
                });
            }
            newCharacter.anims.play(character+'Idle');
        }
        
        newCharacter.setInteractive();
        newCharacter.on('pointerdown', () => this.onElementClicked(newCharacter, true));
        return newCharacter;
    }

    /**
     * Method that creates an item in the environment
     * @param {*} item 
     * @param {*} posX 
     * @param {*} posY 
     * @param {*} scale 
     */
    createItem(item, posX, posY, scale)
    {
        let newItem;
        newItem = currentScene.physics.add.sprite(posX, posY, item).setScale(scale);
        newItem.body.allowGravity = false;
        //newItem.body.setOffset(200,0);

        newItem.setName(item);
        //newItem.refreshBody();
        newItem.setInteractive();
        newItem.on('pointerdown', () => this.onElementClicked(newItem, true));
        return newItem;
    }

    /**
     * Creates a Drawer in the dressroom
     * @param {*} DrawerName 
     * @param {*} item 
     * @param {*} posX 
     * @param {*} posY 
     * @param {*} scale 
     */
    createDrawer(DrawerName, item, posX, posY, scale)
    {
        let drawer = this.createItem(item, posX, posY, scale);
        drawer.setName(DrawerName);
        return drawer;
    }

    createEnvironment(element, posX, posY, scale)
    {
        let environment = currentScene.physics.add.staticSprite(posX, posY, element);
        environment.setName(element);
        environment.setScale(scale);
        environment.refreshBody();

        if(element != 'hall' && element != 'office' && element != "dressroom" && element != "studio")
        {
            environment.setInteractive();
            environment.on('pointerdown', () => this.onElementClicked(environment, true));
        }
        return environment;
    }

    /**
     * Method that creates the Click FX
     */
    createClickFx()
    {
        let clickFx;
        if(currentScene.anims.get('ShowClick') == undefined)
        {
            currentScene.anims.create({
                key: 'ShowClick',
                frames: currentScene.anims.generateFrameNumbers('ClickFire',{start:0, end: 12}),
                frameRate: 30,
            })
        }
        clickFx = currentScene.add.sprite(0, 0);
        clickFx.setScale(1);

        return clickFx;
    }

    onElementClicked(character)
    {
        /** 
        if(character.name == "HUD")
        {
            GameManager.HUDInteracted = newValue;
        }*/
        if(GameManager.canMove == true)
        {
            character.setTint(0xff00ff, 0xff0000, 0x00ff00, 0x0000ff);
            let timedEvent = currentScene.time.delayedCall(200, function(){
                character.clearTint();
                } , currentScene);
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