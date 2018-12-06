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

    changeScene()
    {
        this.scene.start('MainMenu');
    }

    create()
    {
        let alpacaLogo = this.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'gameLogo');
        alpacaLogo.setScale(gameScaleRatio);

        this.time.delayedCall(2000, this.changeScene, [], this);
    }


}

//export default BootScene;