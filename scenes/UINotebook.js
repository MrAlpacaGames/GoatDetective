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

        this.spritesManagement = theSpriteManager;
    }

    preload()
    {
        this.spritesManagement.preloadItems();
    }

    create()
    {
        this.spritesManagement.createNoteBook();
    }
}