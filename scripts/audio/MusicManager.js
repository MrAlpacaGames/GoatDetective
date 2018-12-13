class MusicManager
{
    constructor(theScene)
    {
        this.scene = theScene;
        this.sceneTheme;

        this.currentThemeIntro;
        this.currentThemeLoop;
    }    

    preloadMusic(sceneName)
    {
        this.scene.load.audio('MainIntro','assets/audio/music/MainIntro.mp3');
        this.scene.load.audio('MainLoop','assets/audio/music/MainLoop.mp3');
    }

    createTheme(themeSong)
    {
        this.currentThemeIntro = this.scene.sound.add(themeSong+'Intro');
        this.currentThemeLoop = this.scene.sound.add(themeSong+'Loop');
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

    checkIfIntroFinished(themeSong)
    {
        if(!this.currentThemeIntro.isPlaying)
        {
            this.currentThemeIntro.stop();
            this.currentThemeLoop.play();
        }
    } 


}