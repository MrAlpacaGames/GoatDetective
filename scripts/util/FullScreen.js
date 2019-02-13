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

    /**
     * Creates the fullscreen button
     */
    create()
    {        
        let browser = theGame.device.browser;
        let os = theGame.device.os;
        //window.alert("Is Mac: "+os.macOS + " - Is iOS: "+os.iOS + " - Is iPhone: "+os.iPhone + " - Is desktop: "+os.desktop +" - Is Android: "+os.android);   
        
        if(!browser.firefox && !browser.mobileSafari)
        {
            let fullBtn = currentScene.add.image(topBackgroundXOrigin+440, topBackgroundYOrigin-230, 'FullScreen');
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
}