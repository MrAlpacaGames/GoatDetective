class CreditsScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'CreditsScene'
        });
        //-------------------------
        // Attributes
        //-------------------------   

    }

    preload()
    {
        currentScene = this;
        currentScene.load.image('GameCredits', 'assets/sprites/Menus/GameCredits.png');
    }

    create()
    {
        currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'GameCredits');
        this.input.on('pointerdown', () => openCredits(false));
    }
}