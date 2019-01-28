class BootScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'BootScene'
        });
    }

    preload()
    {
        this.load.image('gameLogo', 'assets/sprites/Menus/MrAlpacaLogo.png');
    }

    create()
    {
        let alpacaLogo = this.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'gameLogo');
        alpacaLogo.setScale(gameScaleRatio);

        this.time.delayedCall(1000, this.changeScene, [], this);
    }

    changeScene()
    {
        this.scene.start('MainMenu');
    }
}

//export default BootScene;