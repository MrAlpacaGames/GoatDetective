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
        menuSpriteManager.preloadMenu();  
        
        this.add.text(0, 0, '', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});
       
        musicManager.preloadMusic();
        sfxManager.preloadSFX();
        fullScreenPower.preload();
    }

    create()
    {
        musicManager.createThemes();
        sfxManager.createSFX();

        menuSpriteManager.createMenu();
        fullScreenPower.create();

        // We set the volumes for all the game
    }

    update()
    {
        
    }
}