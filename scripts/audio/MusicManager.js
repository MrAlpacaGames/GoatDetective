class MusicManager
{
    constructor()
    {
        this.sceneTheme;

        this.currentThemeIntro;
        this.currentThemeLoop;
    }    

    preloadMusic(sceneName)
    {
        currentScene.load.audio('MainIntro','assets/audio/music/MainIntroX.m4a');
        currentScene.load.audio('MainLoop','assets/audio/music/MainLoopX.m4a');
    }

    createTheme(themeSong)
    {
        this.currentThemeIntro = currentScene.sound.add(themeSong+'Intro');
        this.currentThemeLoop = currentScene.sound.add(themeSong+'Loop');
        this.currentThemeLoop.loop = true;
    }

    playTheme(isIntro)
    {
        if(isIntro == true)
        {
            this.currentThemeIntro.play();
            this.currentThemeIntro.stop();
            this.currentThemeIntro.play();   
            this.currentThemeIntro.once('ended', () => this.playTheme(false));
        }
        else
        {
            this.currentThemeLoop.play();
        }
    }

    muteMusic()
    {
        if(currentScene.sound.volume == 0)
        {
            currentScene.sound.volume = 1;
        }
        else if(currentScene.sound.volume == 1)
        {
            currentScene.sound.volume = 0;
        }
    }

    checkIfIntroFinished(themeSong)
    {
        if(!this.currentThemeIntro.isPlaying)
        {
            this.currentThemeIntro.stop();
            this.currentThemeLoop.play();
        }
    } 


}