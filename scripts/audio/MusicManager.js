class MusicManager
{
    constructor()
    {
        //----------------------------------
        // VARIABLES
        //----------------------------------
        this.sceneTheme;

        this.mainAudio

        this.muteButtons = [];

        this.singleHits = new HashTable();
        this.introThemes = new HashTable();
        this.loopThemes = new HashTable();

        this.isPlayingAnIntro = false;
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

            // Lose Theme
            currentScene.load.audio('LoseLoop','assets/audio/music/LoseTheme.mp3');
            // Win Theme
            //currentScene.load.audio('KStarLoop','assets/audio/music/KStarLoop.mp3');
        }
        else if(currentScene.scene.key == 'HallScene')
        {
            // Exploring Theme
            currentScene.load.audio('ExploringLoop','assets/audio/music/Exploring.mp3');
            
            // KStar Theme
            currentScene.load.audio('KStarIntro','assets/audio/music/KStarIntro.mp3');
            currentScene.load.audio('KStarLoop','assets/audio/music/KStarLoop.mp3');

            // Confront Theme
            currentScene.load.audio('ConfrontIntro','assets/audio/music/ConfrontIntro.mp3');
            currentScene.load.audio('ConfrontLoop','assets/audio/music/ConfrontLoop.mp3');

            // Accusation Theme
            currentScene.load.audio('AccusationIntro','assets/audio/music/AccusationIntro.mp3');
            currentScene.load.audio('AccusationLoop','assets/audio/music/AccusationLoop.mp3');
        }
        else if(currentScene.scene.key == 'OfficeScene')
        {
            // Assattari Theme
            currentScene.load.audio('LionessIntro','assets/audio/music/LionessEyesIntro.mp3');
            currentScene.load.audio('LionessLoop','assets/audio/music/LionessEyesLoop.mp3');
        }
        else if(currentScene.scene.key == 'StudioScene')
        {
            // Assattari Theme
            currentScene.load.audio('BiggestFanIntro','assets/audio/music/BiggestFanIntro.mp3');
            currentScene.load.audio('BiggestFanLoop','assets/audio/music/BiggestFanLoop.mp3');
        }
    }

    createThemes()
    {
        let sceneName = currentScene.scene.key;
        let newSong;
        switch(sceneName)
        {
            case 'UINotebook':
                newSong = this.createTheme('NotebookLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.singleHits.add(newSong.key, newSong);
            break;
            case "MainMenu":
                newSong = this.createTheme('MainIntro');
                newSong.volume = 0;
                this.introThemes.add(newSong.key, newSong);
                newSong = this.createTheme('MainLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.loopThemes.add(newSong.key, newSong);
                newSong = this.createTheme('LoseLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.singleHits.add(newSong.key, newSong);
            break;
            case "HallScene":
                newSong = this.createTheme('ExploringLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.singleHits.add(newSong.key, newSong);
                newSong = this.createTheme('KStarIntro');
                newSong.volume = 0;
                this.introThemes.add(newSong.key, newSong);
                newSong = this.createTheme('KStarLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.loopThemes.add(newSong.key, newSong);
                newSong = this.createTheme('ConfrontIntro');
                newSong.volume = 0;
                this.introThemes.add(newSong.key, newSong);
                newSong = this.createTheme('ConfrontLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.loopThemes.add(newSong.key, newSong);
                newSong = this.createTheme('AccusationIntro');
                newSong.volume = 0;
                this.introThemes.add(newSong.key, newSong);
                newSong = this.createTheme('AccusationLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.loopThemes.add(newSong.key, newSong);
            break;
            case "OfficeScene":
                newSong = this.createTheme('LionessIntro');
                newSong.volume = 0;
                this.introThemes.add(newSong.key, newSong);
                newSong = this.createTheme('LionessLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.loopThemes.add(newSong.key, newSong);
            break;
            case "StudioScene":
                newSong = this.createTheme('BiggestFanIntro');
                newSong.volume = 0;
                this.introThemes.add(newSong.key, newSong);
                newSong = this.createTheme('BiggestFanLoop');
                newSong.volume = 0.8;
                newSong.loop = true;
                this.loopThemes.add(newSong.key, newSong);
            break;
        }
    }

    createTheme(themeName)
    {
        return theGame.sound.add(themeName);
    }

    playThemeSong(themeName, isIntro)
    {
        /** 
        if(this.currentThemeIntro == undefined && this.currentThemeLoop == undefined)
        {
            // If nothing is playing. We play the song that the user wants
            this.currentThemeIntro = this.getTheme(true, themeName);
            this.currentThemeLoop = this.getTheme(false, themeName);
            this.playWithFade(this.currentThemeIntro, true);
            this.currentThemeIntro.once('ended', ()=> this.playNoFade(this.currentThemeLoop));
        }
        else
        {
            this.currentThemeLoop.play();
            // If we have already something playing. We check what is playing.
            // We fade it out, switch to the new song and play it with a fade in

            console.log("Should play the loop");
        }
        */
    }

    playNoFade(songToPlay)
    {
        songToPlay.volume = 0.8;
        songToPlay.play();
    }

    playWithFade(songToPlay, isFadeIn)
    {
        songToPlay.play();
        let newVolume;
        (isFadeIn) ? newVolume = 0.8 : newVolume = 0;
        currentScene.tweens.killAll();
        currentScene.tweens.add({
            targets: songToPlay,
            volume: newVolume,

            ease: 'Linear',
            duration: 500,
            onComplete: function()
            {
                
            }
        });
    }

    getTheme(isIntro, themeName)
    {
        let theme;
        let nameEnding;
        let songName;
        (isIntro) ? nameEnding = 'Intro' : nameEnding = 'Loop';
        songName = themeName + nameEnding;
        if(themeName == 'WinTheme' || themeName == 'LoseTheme' || themeName == 'ExploringTheme'
        || themeName == 'Notebook')
        {
            theme = this.singleHits.get(songName);
        }
        else
        {
            (isIntro) ? theme = this.introThemes.get(songName) : theme = this.loopThemes.get(songName);
        }
        return theme;
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