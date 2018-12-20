class MainMenu extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'MainMenu'
        });

        //--------------------
        // Attributes
        //--------------------
        this.musicManager;
    }

    preload()
    {
        // We assign the current scene to the main menu
        currentScene = this;
        // We preload the images required for the menu
        spriteManager.preloadMenu();  
        
        this.add.text(0, 0, '', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});
        this.musicManager = new MusicManager(this);

        this.musicManager.preloadMusic('Main');
    }

    create()
    {
        spriteManager.createMenu();
        
        /** 
        this.musicManager.createTheme('Main');
        this.musicManager.playTheme(true);

        this.add.text(180, 136, 'GOAT DETECTIVE \n SUPAH STAR', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});

        createButton(this, 'Start Game', 'menuButton', topBackgroundXOrigin, topBackgroundYOrigin + 120, 0.6, 0.6, 105, 20);
        createButton(this, 'Mute', 'menuButton', topBackgroundXOrigin + 400, topBackgroundYOrigin + 200, 0.3, 0.6, 45, 20);
        */
    }
    
    createXXXButton(name, imageID, posX, posY)
    {
        let btn = this.add.image(posX, posY, imageID);
        btn.setScale(0.6);

        // We set the button information
        btn.setData('name', name);
        btn.setData('active', false);

        btn.setInteractive();

        // Toggle Options
        let toggleBtn = this.add.image(posX, posY, imageID);
        toggleBtn.setScale(0.6);     
        toggleBtn.setAlpha(0.4);
        toggleBtn.setTint(0xff0000);
        toggleBtn.visible = false;

        // Button Text
        this.add.text(posX-105, posY-20, name, 
            { fontFamily: 'Ailerons', fontSize: 36 , color: '#000000', align: 'center'});

        btn.on('pointerdown', () => this.makeItShine(toggleBtn, true));
        btn.on('pointerup', () => this.makeItShine(toggleBtn, false));
    }

    makeItShine(theBtn, newValue)
    {
        theBtn.visible = newValue;
        if(newValue == false)
        {
            this.scene.start('HallScene');
        }
    }

    update()
    {
        //this.musicManager.checkIfIntroFinished();
    }
}