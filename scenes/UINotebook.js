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
        notebookSpriteManager.preload();
    }

    create()
    {
        notebookSpriteManager.create();
    }

    
}