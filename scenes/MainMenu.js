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
        this.load.image('startGame', 'assets/sprites/Menus/startbtn.png');
        this.add.text(0, 0, '', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});
        this.musicManager = new MusicManager(this);
        this.musicManager.preloadMusic('Main');

        this.input.once('pointerdown', function(){
            this.scene.sound.context.resume();
        });
    }

    create()
    {
        //window.alert("Before");
        this.musicManager.createTheme('Main');
        //window.alert('Exists: '+this.musicManager.currentThemeIntro.duration);
        this.musicManager.playTheme(true);
        //window.alert("Feel the love");

        this.add.text(180, 136, 'GOAT DETECTIVE \n SUPAH STAR', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});

        //this.add.text(350, 350, 'Start', 
        //{ fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'center'});

        this.createButton(1, 'Start Game' ,'startGame', topBackgroundXOrigin, topBackgroundYOrigin + 120);
    }
    
    createButton(id, name, imageID, posX, posY)
    {
        let btn = this.add.image(posX, posY, imageID);
        btn.setScale(0.6);

        // We set the button information
        btn.setData('id', id);
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
            //loadScene('HallScene');
            this.scene.start('HallScene');
        }
    }

    update()
    {
        //this.musicManager.checkIfIntroFinished();
    }
}