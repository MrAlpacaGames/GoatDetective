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
       
        musicManager.preloadMusic('Main');
        sfxManager.preloadSFX();
    }

    create()
    {
        musicManager.createTheme('Main');
        sfxManager.createSFX();

        spriteManager.createMenu();
    }

    update()
    {
        //this.musicManager.checkIfIntroFinished();
    }
}