class SFXManager
{
    constructor()
    {
        this.menusSFX = [];
    }

    preloadSFX()
    {
        if(currentScene.scene.key == "MainMenu")
        {
            currentScene.load.audio('ZafSupah','assets/audio/sfx/ZafSupahIntro.mp3');
        }
        else
        {
            currentScene.load.audio('OpenDoor','assets/audio/sfx/OpenDoor.m4a');
            currentScene.load.audio('WriteNote','assets/audio/sfx/WritingOpc3.wav');
            currentScene.load.audio('Explosion','assets/audio/sfx/Explosion.m4a');
            currentScene.load.audio('HammerHit','assets/audio/sfx/HammerHit.wav');
        }
    }
    
    
    createSFX()
    {
        let supah;
        if(currentScene.scene.key == "MainMenu")
        {
            supah = theGame.sound.add('ZafSupah'); 
            this.menusSFX.push(supah);

        }
        else
        {
            supah = theGame.sound.add('OpenDoor');
            this.menusSFX.push(supah);
            supah = theGame.sound.add('WriteNote');
            this.menusSFX.push(supah);
            supah = theGame.sound.add('Explosion');
            this.menusSFX.push(supah);
            supah = theGame.sound.add('HammerHit');
            this.menusSFX.push(supah);
        }
    }

    playSupahStar()
    {
        webAudioTouchUnlock(context);
        let supahSFX = this.menusSFX[0];
        supahSFX.play();
    }

    /**
     * Play an SFX
     * [0] = Zaf Supah Star
     * [1] = Open Door
     * [2] = Write Note
     * @param {*} index 
     */
    playSFX(index)
    {
        this.menusSFX[index].play();
    }



}