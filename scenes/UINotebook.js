class UINotebook extends Phaser.Scene
{
    constructor(theSpriteManager)
    {
        super({
            key: 'UINotebook'
        });
        this.characters;
        this.items;
        this.places;
    }

    preload()
    {
        currentScene = this;
        loadingScreen.createLoadingScreen();
        notebookSpriteManager.preload();
    }

    create()
    {
        currentScene = this;
        notebookSpriteManager.create();
    }    

    update()
    {
        if(musicManager.mainWebSound != undefined)
        {
            musicManager.checkOnMusic();
        }
    }
}