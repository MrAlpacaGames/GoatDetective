class UIMenuManager
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
    }

    /**
     * We preload the menu sprites
     */
    preloadMenu()
    {
        currentScene.load.image('Fondo', 'assets/sprites/Menus/Fondo.png');
        currentScene.load.image('GoatMenu', 'assets/sprites/Menus/GoatMenu.png');
        currentScene.load.image('Fondo2', 'assets/sprites/Menus/Fondo2.png');
        currentScene.load.image('Logo', 'assets/sprites/Menus/Logo.png');

        currentScene.load.image('StartBtn', 'assets/sprites/Menus/Start.png');
        currentScene.load.image('StartHigh', 'assets/sprites/Menus/Start2.png');
        currentScene.load.image('MenuMuteBtn', 'assets/sprites/Menus/Mute.png');
        currentScene.load.image('MenuMuteHigh', 'assets/sprites/Menus/Mute2.png');
        currentScene.load.image('CreditsBtn', 'assets/sprites/Menus/Credits.png');
        currentScene.load.image('CreditsHigh', 'assets/sprites/Menus/Credits2.png');
    }

    /**
     * We create the menu
     */
    createMenu()
    {
        currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Fondo');

        // The first button that will enable audio
        let firstBtn = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'MenuMuteBtn');
        firstBtn.setScale(4);

        let firstHigh = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'MenuMuteHigh');
        firstHigh.setScale(4);
        firstHigh.visible = false;

        firstBtn.setInteractive();
        firstBtn.on('pointerdown',function()
        {
            firstHigh.visible = true;
        });
        firstBtn.on('pointerdown', ()=> this.toFullScreen());
        firstBtn.on('pointerup',function()
        {
            firstHigh.visible = false;
            firstBtn.disableInteractive();
            // We play the Button pressed SFX 
            sfxManager.playSupahStar();
            firstBtn.destroy();
            firstHigh.destroy();
        });
        firstBtn.on('pointerup', () => this.startMainMenu());
    }

    toFullScreen()
    {
        //openFullScreen();
        //theGame.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        /** 
        let canvas = currentScene.sys.game.canvas;
        let fullscreen = currentScene.sys.game.device.fullscreen;
        if(!fullscreen.available)
        {
            return;
        }
        canvas[fullscreen.request]();
        */
    }

    startMainMenu()
    {
        let goat = currentScene.add.image(-100, topBackgroundYOrigin+35, 'GoatMenu');
        let fondo2 = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Fondo2');
        fondo2.visible = false;
        let logo = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Logo');
        //logo.visible = false;
        
        let startBtn = currentScene.add.image(topBackgroundXOrigin-40, topBackgroundYOrigin+125, 'StartBtn');
        let startHigh = currentScene.add.image(topBackgroundXOrigin-40, topBackgroundYOrigin+125, 'StartHigh');
        startBtn.setInteractive();
        startBtn.on('pointerover', ()=> this.onMenuBtnInteracted(startHigh, true));
        startBtn.on('pointerdown', ()=> this.onMenuBtnInteracted(startHigh, true));
        startBtn.on('pointerout', ()=> this.onMenuBtnInteracted(startHigh, false));
        startBtn.on('pointerup', ()=> this.onMenuBtnInteracted(startHigh, false));
        startBtn.on('pointerup', ()=> interacionManager.interactMenu("Start"));

        startBtn.visible = false;
        startHigh.visible = false;

        let creditsBtn = currentScene.add.image(topBackgroundXOrigin-190, topBackgroundYOrigin+128, 'CreditsBtn');
        let creditsHigh = currentScene.add.image(topBackgroundXOrigin-190, topBackgroundYOrigin+128, 'CreditsHigh');
        creditsBtn.setInteractive();
        creditsBtn.on('pointerover', ()=> this.onMenuBtnInteracted(creditsHigh, true));
        creditsBtn.on('pointerdown', ()=> this.onMenuBtnInteracted(creditsHigh, true));
        creditsBtn.on('pointerout', ()=> this.onMenuBtnInteracted(creditsHigh, false));
        creditsBtn.on('pointerup', ()=> this.onMenuBtnInteracted(creditsHigh, false));
        creditsBtn.on('pointerup', ()=> interacionManager.interactMenu("Credits"));

        creditsBtn.visible = false;
        creditsHigh.visible = false;

        let muteBtn = currentScene.add.image(topBackgroundXOrigin-280, topBackgroundYOrigin+128, 'MenuMuteBtn');
        let muteHigh = currentScene.add.image(topBackgroundXOrigin-280, topBackgroundYOrigin+128, 'MenuMuteHigh');
        muteBtn.setInteractive();
        muteBtn.on('pointerover', ()=> this.onMenuBtnInteracted(muteHigh, true));
        muteBtn.on('pointerdown', ()=> this.onMenuBtnInteracted(muteHigh, true));
        muteBtn.on('pointerout', ()=> this.onMenuBtnInteracted(muteHigh, false));
        muteBtn.on('pointerup', ()=> this.onMenuBtnInteracted(muteHigh, false));
        muteBtn.on('pointerup', ()=> interacionManager.interactMenu("Mute"));

        muteBtn.visible = false;
        muteHigh.visible = false;

        let timeline = currentScene.tweens.createTimeline();

        timeline.add(
            {
                targets: goat,
                x: topBackgroundXOrigin + 175,
                duration: 1000
            }
        );

        timeline.add(            
            {
                targets: fondo2,
                onStart: function()
                {
                    fondo2.visible = true;
                    let timedEvent = currentScene.time.delayedCall(1300, function()
                    {
                        musicManager.playTheme();
                        startBtn.visible = true;
                        creditsBtn.visible = true;
                        muteBtn.visible = true;

                    } , currentScene);
                } 
            }          
        );
        timeline.play();        
    }

    onMenuBtnInteracted(highlighBtn, newValue)
    {
        highlighBtn.visible = newValue;
    }
}