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
        loadingScreen.createLoadingScreen();

        // We preload the images required for the menu
        menuSpriteManager.preloadMenu();  
        
        this.add.text(0, 0, '', 
        { fontFamily: 'Asap', fontSize: 80 , color: '#f3e307', align: 'left'});
        this.add.text(0, 0, '', 
        { fontFamily: 'Asap-Bold', fontSize: 80 , color: '#f3e307', align: 'left'});
       
        musicManager.preloadMusic();
        sfxManager.preloadSFX();
        fullScreenPower.preload();
        dialogueManager.preloadJson();
    }

    create()
    {
        this.time.delayedCall(150, function(){
            globalLockdown = false;
        }, [], this);
        musicManager.createThemes();
        sfxManager.createSFX();

        menuSpriteManager.createMenu();
        fullScreenPower.create();

        dialogueManager.createDialogues();
        // We set the volumes for all the game
    }

    update()
    {   
        if(musicManager.mainWebSound != undefined)
        {
            musicManager.checkOnMusic();
        }
    }
}