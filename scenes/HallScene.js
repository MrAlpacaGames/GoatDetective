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

        if(GameManager.stateOfGame == 0)
        {
            let jung = spriteManager.createStaticCharacter('Jung', topBackgroundXOrigin+1000, topBackgroundYOrigin+80, 0.42);
            this.interactuables.add(jung);
            
            // Main Player
            this.playerSprite = spriteManager.createPlayer(topBackgroundXOrigin+600,  topBackgroundYOrigin+90);
        }        
        thePlayer.reloadPlayer();
        thePlayer.assignOnEvents();
        
        // Dialogue Window
        this.dialogue.createDialogueWindow();

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