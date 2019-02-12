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
        currentScene = this;
        currentScene.load.image('gameLogo', 'assets/sprites/Menus/MrAlpacaLogo.png');
        currentScene.load.image('Fondo', 'assets/sprites/Menus/Fondo.png');
        currentScene.load.image('Loading', 'assets/sprites/Menus/Loading.png');
    }

    create()
    {
        this.add.text(0, 0, '', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});

        var progressBar = currentScene.add.graphics();
        progressBar.fillStyle(0xFC1F4E, 1);
        progressBar.fillRect(0, 0, windowWidth, windowHeight);

        let alpacaLogo = this.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'gameLogo');
        alpacaLogo.setScale(0.4);

        this.time.delayedCall(500, this.changeScene, [], this);
    }

    changeScene()
    {
        this.scene.start('MainMenu');
    }
}