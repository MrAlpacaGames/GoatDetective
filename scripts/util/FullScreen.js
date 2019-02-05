class FullScreen
{
    constructor()
    {
        this.isFullScreen = false;
    }

    preload()
    {
        currentScene.load.image('FullScreen','assets/sprites/HUD/FullscreenBtn.png');
    }

    create()
    {
        let fullBtn = currentScene.add.image(topBackgroundXOrigin+435, topBackgroundYOrigin-200, 'FullScreen');
        fullBtn.alpha = 0.7;
        fullBtn.scrollFactorX = 0;
        fullBtn.name = "HUD";
        fullBtn.setInteractive();


        fullBtn.on('pointerdown', ()=> openFullScreen());
        fullBtn.on('pointerdown', function(){
            GameManager.HUDInteracted = true;
            fullBtn.setScale(1.1);
            let timedEvent = currentScene.time.delayedCall(100, function(){
                GameManager.HUDInteracted = false;
                fullBtn.setScale(1);
            } , currentScene);
        });
    }
}