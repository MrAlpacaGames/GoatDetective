class MusicManager
{
    constructor()
    {
        //----------------------------------
        // VARIABLES
        //----------------------------------
        this.sceneTheme;

        this.currentThemeIntro;
        this.currentThemeLoop;

        this.muteButtons = [];
    }    

    //-----------------------------------------
    // FUNCTIONS
    //-----------------------------------------
    preloadMusic()
    {
        if(currentScene.scene.key == "UINotebook")
        {
            // Pensativo
            currentScene.load.audio('NotebookLoop','assets/audio/music/Pensativo.mp3');
        }
        else if(currentScene.scene.key == "MainMenu")
        {
            // Main Theme
            currentScene.load.audio('MainIntro','assets/audio/music/MainIntro.mp3');
            currentScene.load.audio('MainLoop','assets/audio/music/MainLoop.mp3');

            // KStar Theme
            currentScene.load.audio('KStarIntro','assets/audio/music/KStarIntro.mp3');
            currentScene.load.audio('KStarLoop','assets/audio/music/KStarLoop.mp3');
        }
        else
        {
            // Exploring Theme
            currentScene.load.audio('ExploringLoop','assets/audio/music/Exploring.mp3');

            // KStar Theme
            currentScene.load.audio('KStarIntro','assets/audio/music/KStarIntro.mp3');
            currentScene.load.audio('KStarLoop','assets/audio/music/KStarLoop.mp3');

            // Confront Theme
            currentScene.load.audio('ConfrontIntro','assets/audio/music/ConfrontIntro.mp3');
            currentScene.load.audio('ConfrontLoop','assets/audio/music/ConfrontLoop.mp3');
        }

    }

    createTheme(themeSong)
    {
        let sceneName = currentScene.scene.key;
        let newSong;
        if(sceneName == "MainMenu")
        {
            newSong = theGame.sound.add(themeSong+'Intro');
            newSong = theGame.sound.add(themeSong+'Loop');
            newSong.loop = true;
        }
        else if(sceneName == "UINotebook")
        {
            newSong = theGame.sound.add(themeSong+'NotebookLoop');
            newSong.loop = true;
        }
        else
        {
            newSong = theGame.sound.add(themeSong+'ExploringLoop');
            newSong.loop = true;
            newSong = theGame.sound.add(themeSong+'KStarIntro');
            newSong = theGame.sound.add(themeSong+'KStarLoop');
            newSong.loop = true;
            newSong = theGame.sound.add(themeSong+'ConfrontIntro');
            newSong = theGame.sound.add(themeSong+'ConfrontLoop');
            newSong.loop = true;
        }
    }

    playTheme(isIntro)
    {   
        if(isIntro)
        {
            this.currentThemeLoop.volume = 0.8;
            this.currentThemeIntro.play();
            this.currentThemeIntro.once('ended', ()=> this.playTheme(false));
            this.doFade(this.currentThemeIntro, true, undefined);
        }
        else
        {
            this.currentThemeLoop.play();
        }
    }

    doFade(song ,isFadeIn, newSong)
    {
        let newVolume;
        (isFadeIn) ? newVolume = 0.8 : newVolume = 0;
        currentScene.tweens.killAll();
        currentScene.tweens.add({
            targets: song,
            volume: newVolume,

            ease: 'Linear',
            duration: 300,
            onComplete: function()
            {
                if(!isFadeIn)
                {
                    musicManager.currentThemeIntro.stop();
                    musicManager.currentThemeLoop.stop();
                    musicManager.changeTheme(newSong, true);
                }
            }
        });
    }

    changeTheme(themeName, fadeOver)
    {
        if(!fadeOver)
        {
            // We are changing song, so we fade out the current song
            let songToFadeOut;
            if(this.currentThemeIntro == undefined)
            {
                songToFadeOut = this.currentThemeLoop;
            }
            else
            {
                if(this.currentThemeIntro.isPlaying)
                {
                    songToFadeOut = this.currentThemeIntro;
                    songToFadeOut.removeAllListeners('ended'); 
                } 
                else
                {
                    songToFadeOut = this.currentThemeLoop;
                }
            }
            this.doFade(songToFadeOut, false);
        }
        else
        {
            let total;
            let introName = "NA";
            let loopName;
            if(themeName == 'Exploring' || themeName == 'Notebook')
            {
                total = 1;
                loopName = themeName+"Loop";
            }
            else
            {
                total = 2;
                introName = themeName + 'Intro';
                loopName = themeName + 'Loop';
            }
            
            for(let i = 0; i < theGame.sound.sounds.length && total > 0; i++)
            {
                let temp = theGame.sound.sounds[i];
                if(temp.key == introName)
                {
                    this.currentThemeIntro = temp;
                    this.currentThemeIntro.volume = 0;
                    total--;
                }
                else if(temp.key == loopName)
                {
                    this.currentThemeLoop = temp;
                    this.currentThemeLoop.volume = 0;
                    total--;
                }
            }
            if(this.currentThemeIntro.key != introName) this.currentThemeIntro = undefined;
            this.playTheme(true);
        }
    }

    muteMusic()
    {
        if(globalLockdown == false)
        {
            if(theGame.sound.volume == 0)
            {
                theGame.sound.volume = 1;
            }
            else if(theGame.sound.volume == 1)
            {
                theGame.sound.volume = 0;
            }
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