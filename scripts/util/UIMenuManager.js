class UIMenuManager
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
        this.gameCredits;
    }

    /**
     * We preload the menu sprites
     */
    preloadMenu()
    {
        currentScene.load.image('Fondo', 'assets/sprites/Menus/Fondo.png');
        currentScene.load.image('Loading', 'assets/sprites/Menus/Loading.png');
        currentScene.load.image('GoatMenu', 'assets/sprites/Menus/GoatMenu.png');
        currentScene.load.image('Fondo2', 'assets/sprites/Menus/Fondo2.png');
        currentScene.load.image('Logo', 'assets/sprites/Menus/GoatLogo.png');
        currentScene.load.image('GameCredits', 'assets/sprites/Menus/GamuCreditso.png');

        currentScene.load.image('FirstStart', 'assets/sprites/Menus/Play.png');

        currentScene.load.image('StartBtn', 'assets/sprites/Menus/Start.png');
        currentScene.load.image('StartHigh', 'assets/sprites/Menus/Start2.png');
        currentScene.load.image('ContinueBtn', 'assets/sprites/Menus/Continue.png');
        currentScene.load.image('ContinueHigh', 'assets/sprites/Menus/Continue2.png');
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
        let firstBtn = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'FirstStart');

        firstBtn.setInteractive();
        firstBtn.on('pointerdown',function()
        {
            this.setScale(1.05);
        });
        firstBtn.on('pointerup',function()
        {
            firstBtn.disableInteractive();
            // We play the Button pressed SFX 
            sfxManager.playSupahStar();
            firstBtn.destroy();
        });
        firstBtn.on('pointerup', () => this.startMainMenu());
    }

    /**
     * Starts the Main Menu Animation
     */
    startMainMenu()
    {
        let gameCredits;
        let goat = currentScene.add.image(-100, topBackgroundYOrigin+35, 'GoatMenu');
        let fondo2 = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Fondo2');
        fondo2.visible = false;
        let logo = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Logo');
        //logo.visible = false;
        
        // Start Btn
        let startBtn = currentScene.add.image(topBackgroundXOrigin-40, topBackgroundYOrigin+125, 'StartBtn');
        let startHigh = currentScene.add.image(topBackgroundXOrigin-40, topBackgroundYOrigin+125, 'StartHigh');
        startBtn.setInteractive();
        startBtn.on('pointerover', ()=> this.onMenuBtnInteracted(startHigh, true));
        startBtn.on('pointerdown', ()=> this.onMenuBtnInteracted(startHigh, true));
        startBtn.on('pointerup', ()=> this.onMenuBtnInteracted(startHigh, false));
        startBtn.on('pointerout', ()=> this.onMenuBtnInteracted(startHigh, false));
        startBtn.on('pointerup', ()=> interacionManager.interactMenu("Start"));

        startBtn.visible = false;
        startHigh.visible = false;

        // Continue Btn
        let continueBtn = currentScene.add.image(topBackgroundXOrigin-186, topBackgroundYOrigin+128, 'ContinueBtn');
        let continueHigh = currentScene.add.image(topBackgroundXOrigin-186, topBackgroundYOrigin+128, 'ContinueHigh');
        continueBtn.setInteractive();
        continueBtn.on('pointerover', ()=> this.onMenuBtnInteracted(continueHigh, true));
        continueBtn.on('pointerdown', ()=> this.onMenuBtnInteracted(continueHigh, true));
        continueBtn.on('pointerup', ()=> this.onMenuBtnInteracted(continueHigh, false));
        continueBtn.on('pointerout', ()=> this.onMenuBtnInteracted(continueHigh, false));
        continueBtn.on('pointerup', ()=> interacionManager.interactMenu("Continue"));

        continueBtn.visible = false;
        continueHigh.visible = false;

        // Credits Btn
        let creditsBtn = currentScene.add.image(topBackgroundXOrigin-308, topBackgroundYOrigin+128, 'CreditsBtn');
        let creditsHigh = currentScene.add.image(topBackgroundXOrigin-308, topBackgroundYOrigin+128, 'CreditsHigh');
        creditsBtn.setInteractive();
        creditsBtn.on('pointerover', ()=> this.onMenuBtnInteracted(creditsHigh, true));
        creditsBtn.on('pointerdown', ()=> this.onMenuBtnInteracted(creditsHigh, true));
        creditsBtn.on('pointerup', ()=> this.onMenuBtnInteracted(creditsHigh, false));
        creditsBtn.on('pointerout', ()=> this.onMenuBtnInteracted(creditsHigh, false));
        creditsBtn.on('pointerup', ()=> enableCredits(this.gameCredits, true));

        creditsBtn.visible = false;
        creditsHigh.visible = false;

        // Mute Btn
        let muteBtn = currentScene.add.image(topBackgroundXOrigin-395, topBackgroundYOrigin+128, 'MenuMuteBtn');
        let muteHigh = currentScene.add.image(topBackgroundXOrigin-395.9, topBackgroundYOrigin+128, 'MenuMuteHigh');
        muteBtn.setInteractive();
        muteBtn.on('pointerover', ()=> this.onMenuBtnInteracted(muteHigh, true));
        muteBtn.on('pointerdown', ()=> this.onMenuBtnInteracted(muteHigh, true));
        muteBtn.on('pointerup', ()=> this.onMenuBtnInteracted(muteHigh, false));
        muteBtn.on('pointerout', ()=> this.onMenuBtnInteracted(muteHigh, false));
        muteBtn.on('pointerup', ()=> interacionManager.interactMenu("Mute"));

        muteBtn.visible = false;
        muteHigh.visible = false;

        let timeline = currentScene.tweens.createTimeline();

        timeline.add(
            {
                targets: goat,
                x: topBackgroundXOrigin + 175,
                duration: 900
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
                        musicManager.playThemeSong('Main');
                        startBtn.visible = true;
                        continueBtn.visible = true;
                        creditsBtn.visible = true;
                        muteBtn.visible = true;

                    } , currentScene);
                } 
            }          
        );
        timeline.play();        
        this.gameCredits = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'GameCredits');
        this.gameCredits.setInteractive();
        this.gameCredits.on('pointerdown', ()=> enableCredits(this.gameCredits, false));
        this.gameCredits.visible = false;
    }  


    onMenuBtnInteracted(highlighBtn, newValue)
    {
        highlighBtn.visible = newValue;
    }
}