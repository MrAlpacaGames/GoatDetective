class MusicManager
{
    constructor()
    {
        //----------------------------------
        // VARIABLES
        //----------------------------------
        // Main Song Playing
        this.mainWebSound;
        // Possible Main Song Loop
        this.mainPossibleLoop;

        this.themeBeforeNotebook;
        
        this.themes = new HashTable();
        
        this.muteButtons = [];
    }    

    //-----------------------------------------
    // FUNCTIONS
    //-----------------------------------------

    //--------------------------------------------------------------------------------
    //                                  CREATION FUNCTIONS
    //--------------------------------------------------------------------------------
    preloadMusic()
    {
        if(currentScene.scene.key == "MainMenu")
        {
            // Main Theme
            currentScene.load.audio('MainIntro','assets/audio/music/MainIntro.mp3');
            currentScene.load.audio('MainLoop','assets/audio/music/MainLoop.mp3');

            // Lose Theme
            currentScene.load.audio('LoseLoop','assets/audio/music/LoseTheme.mp3');

            // Exploring Theme
            currentScene.load.audio('ExploringLoop','assets/audio/music/Exploring.mp3');
        }
        else if(currentScene.scene.key == 'HallScene')
        {            
            // Pensativo Theme
            currentScene.load.audio('NotebookLoop','assets/audio/music/Pensativo.mp3');
            // KStar Theme
            currentScene.load.audio('KStarIntro','assets/audio/music/KStarIntro.mp3');
            currentScene.load.audio('KStarLoop','assets/audio/music/KStarLoop.mp3');            

            // Accusation Theme
            currentScene.load.audio('AccusationIntro','assets/audio/music/AccusationIntro.mp3');
            currentScene.load.audio('AccusationLoop','assets/audio/music/AccusationLoop.mp3');

            // Epilogue Theme
            currentScene.load.audio('EpilogueLoop','assets/audio/music/Epilogue.mp3');
        }
        else if(currentScene.scene.key == 'OfficeScene')
        {
            // Confront Theme
            currentScene.load.audio('ConfrontIntro','assets/audio/music/ConfrontIntro.mp3');
            currentScene.load.audio('ConfrontLoop','assets/audio/music/ConfrontLoop.mp3');

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
        else if(currentScene.scene.key == 'DressroomScene')
        {
            // Win Theme
            currentScene.load.audio('WinIntro','assets/audio/music/WinIntro.mp3');
            currentScene.load.audio('WinLoop','assets/audio/music/WinLoop.mp3');
        }
    }

    /**
     * Function that creates the themes and adds them to the Web Audio Sound Manager and to the hash tables
     */
    createThemes()
    {
        let sceneName = currentScene.scene.key;
        let newIntro;
        let newLoop;
        switch(sceneName)
        {
            case "MainMenu":
                newIntro = this.createTheme('MainIntro');
                newIntro.volume = 0;
                newLoop = this.createTheme('MainLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Main', [newIntro, newLoop]);

                newLoop = this.createTheme('LoseLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Lose', [undefined, newLoop]);
                
                newLoop = this.createTheme('ExploringLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Exploring', [undefined, newLoop]);
            break;
            case "HallScene":
                newLoop = this.createTheme('NotebookLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Notebook', [undefined, newLoop]);
                newIntro = this.createTheme('KStarIntro');
                newIntro.volume = 0;
                newLoop = this.createTheme('KStarLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('KStar', [newIntro, newLoop]);

                newIntro = this.createTheme('AccusationIntro');
                newIntro.volume = 0;
                newLoop = this.createTheme('AccusationLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Accusation', [newIntro, newLoop]);

                newLoop = this.createTheme('EpilogueLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Epilogue', [undefined, newLoop]);
            break;
            case "OfficeScene":
                newIntro = this.createTheme('ConfrontIntro');
                newIntro.volume = 0;
                newLoop = this.createTheme('ConfrontLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Confront', [newIntro, newLoop]);

                newIntro = this.createTheme('LionessIntro');
                newIntro.volume = 0;
                newLoop = this.createTheme('LionessLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Lioness', [newIntro, newLoop]);
            break;
            case "StudioScene":
                newIntro = this.createTheme('BiggestFanIntro');
                newIntro.volume = 0;
                newLoop = this.createTheme('BiggestFanLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('BiggestFan', [newIntro, newLoop]);
            break;
            case "DressroomScene":
                newIntro = this.createTheme('WinIntro');
                newIntro.volume = 0.8;
                newLoop = this.createTheme('WinLoop');
                newLoop.volume = 0.8;
                newLoop.loop = true;
                this.themes.add('Win', [newIntro, newLoop]);
            break;
        }
    }

    /**
     * Function that adds the song to the WebAudioSoundManager
     * @param {*} themeName 
     */
    createTheme(themeName)
    {
        return theGame.sound.add(themeName);
    }

    //--------------------------------------------------------------------------------
    //                                  GETTER FUNCTIONS
    //--------------------------------------------------------------------------------

    /**
     * Function that gets the theme song from the hash tables
     * @param {*Name of the theme} themeName 
     */
    getTheme( themeName)
    {
        let theme = this.themes.get(themeName);
        return theme;
    }

    //--------------------------------------------------------------------------------
    //                                  PLAYING FUNCTIONS
    //--------------------------------------------------------------------------------
    /**
     * Function that plays a theme song
     * @param {*name of the theme song to be played } themeName 
     */
    playThemeSong(themeName)
    {
        if(this.mainWebSound == undefined)
        {
            let themeToPlay = this.getTheme(themeName);
            if(themeToPlay[0] != undefined) // This means it has an intro
            {
                this.mainWebSound = themeToPlay[0];
                this.mainPossibleLoop = themeToPlay[1];
            }
            else
            {
                this.mainWebSound = themeToPlay[1];
            }
            this.mainWebSound.play();
            this.executeFading(true, this.mainWebSound);
        }
        else
        {
            if(themeName == "Exploring")
            {
                this.mainWebSound.pause();
                this.mainWebSound = this.getTheme(themeName)[1];
                this.mainWebSound.volume = 0.8;
                (this.mainWebSound.isPaused) ? this.mainWebSound.resume() : this.mainWebSound.play();
            }
            else if(themeName == 'Main')
            {
                this.mainWebSound.stop();
                let mainT = this.getTheme(themeName);
                this.mainWebSound = mainT[0];
                this.mainPossibleLoop = mainT[1];
                this.mainWebSound.play();
            }
        }
    }

    /**
     * Function that plays a song without fading
     * @param {*Song to be played} songToPlay 
     */
    playNoFade(songToPlay)
    {
        songToPlay.volume = 0.8;
        songToPlay.play();
    }

    /**
     * Function that executes the fading in or out of a song
     * @param {*Tells if we are fading in the song or fading it out} isFadingIn 
     * @param {*The song to be faded} songToFade 
     * @param {*Possible new song. Just used when we are fading out a song} possibleNewSong 
     */
    executeFading(isFadingIn, songToFade, possibleNewSong)
    {
        let newVolume;
        (isFadingIn) ? newVolume = 0.8 : newVolume = 0;
        //currentScene.tweens.killAll();
        currentScene.tweens.add({
            targets: songToFade,
            volume: newVolume,

            ease: 'Linear',
            duration: 300,
            onComplete: function()
            {
                if(!isFadingIn) // If we are fading out. Once we fade out the current song, we fade in the next one
                {
                    musicManager.mainWebSound.pause();
                    musicManager.mainWebSound = possibleNewSong;
                    if(possibleNewSong.isPaused)
                    {
                        // Sí está pausado el nuevo. Lo resumo y pauso el viejo
                        musicManager.mainWebSound.resume();
                    }
                    else
                    {
                        musicManager.mainWebSound.play();
                    }
                    musicManager.mainWebSound.volume = 0;
                    musicManager.executeFading(true, musicManager.mainWebSound);
                }
            }
        });
    }

    //--------------------------------------------------------------------------------
    //                                  SETTERS FUNCTIONS
    //--------------------------------------------------------------------------------

    /**
     * Function that changes the theme to a new One
     * @param {*Name of the new Theme Name} newTheme
     */
    changeTheme(newTheme)
    {
        if(this.mainWebSound != undefined )
        {
            let songToPlayIn;
            let themeToPlay = this.getTheme(newTheme);
            if(themeToPlay[0] != undefined) // Has an intro
            {
                (themeToPlay[1].isPaused) ? songToPlayIn = themeToPlay[1] : songToPlayIn = themeToPlay[0];
                this.mainPossibleLoop = themeToPlay[1];
            }
            else
            {
                // Is a loop
                songToPlayIn = themeToPlay[1];
            }

            if(newTheme == 'Notebook')
            {
                let reduction;
                (this.mainWebSound.loop) ? reduction = 4 : reduction = 5;
                let lastTheme = this.mainWebSound.key.substring(0, this.mainWebSound.key.length - reduction);
                this.themeBeforeNotebook = lastTheme;
            }
            if(newTheme == "Confront") 
            {
                this.mainWebSound = themeToPlay[0];
                this.mainWebSound.stop();
            }
            // We fade out the current song
            this.executeFading(false, this.mainWebSound, songToPlayIn);
        }
    }

    /**
     * Function that mutes/desmutes the music and sfx in the whole game
     */
    muteMusic()
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
    
    /**
     * Function called in every frame of the game to check if the music has stopped playing and if it is an intro song
     * change to its loop
     */
    checkOnMusic()
    {        
        if(!this.mainWebSound.isPlaying && !this.mainWebSound.loop)
        {
            this.mainWebSound = this.mainPossibleLoop;
            this.playNoFade(this.mainWebSound);
        }
    }

    /**
     * We stop all the songs so they can be played from the beginning
     */
    restartAllMusic()
    {
        let mainArray = theGame.sound.sounds;
        mainArray.forEach(element => {
            if(element.key != "MainIntro" && element.key != "MainLoop") element.stop();
        });
    }

}