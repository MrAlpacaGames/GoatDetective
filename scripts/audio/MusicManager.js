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
        
        this.singleHits = new HashTable();
        this.introThemes = new HashTable();
        this.loopThemes = new HashTable();    
        
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

    /**
     * Function that creates the themes and adds them to the Web Audio Sound Manager and to the hash tables
     */
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
     * @param {*Is an intro song} isIntro 
     * @param {*Name of the theme} themeName 
     */
    getTheme(isIntro, themeName)
    {
        let theme;
        let nameEnding;
        let songName;
        (isIntro) ? nameEnding = 'Intro' : nameEnding = 'Loop';
        songName = themeName + nameEnding;
        if(themeName == 'Win' || themeName == 'Lose' || themeName == 'Exploring'
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

    //--------------------------------------------------------------------------------
    //                                  PLAYING FUNCTIONS
    //--------------------------------------------------------------------------------
    /**
     * Function that plays a theme song
     * @param {*name of the theme song to be played } themeName 
     * @param {*Tells if it is an intro or not} isIntro 
     */
    playThemeSong(themeName, isIntro)
    {
        if(this.mainWebSound == undefined)
        {
            if(isIntro)
            {
                this.mainPossibleLoop = this.getTheme(false, themeName);
            }
            this.mainWebSound = this.getTheme(true, themeName);
            this.mainWebSound.play();
            this.executeFading(true, this.mainWebSound);
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
            duration: 100,
            onComplete: function()
            {
                if(!isFadingIn) // If we are fading out. Once we fade out the current song, we fade in the next one
                {
                    musicManager.mainWebSound.stop();
                    musicManager.mainWebSound = possibleNewSong;
                    musicManager.mainWebSound.volume = 0;
                    musicManager.mainWebSound.play();
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
     * @param {*Is the new song directly an intro} isIntro
     */
    changeTheme(newTheme, isIntro)
    {
        if(this.mainWebSound != undefined )
        {
            let newSong = this.getTheme(isIntro, newTheme);
            if(isIntro)
            {
                this.mainPossibleLoop = this.getTheme(false, newTheme);
            }
            if(newTheme == 'Notebook')
            {
                let reduction;
                (this.mainWebSound.loop) ? reduction = 4 : reduction = 5;
                let lastTheme = this.mainWebSound.key.substring(0, this.mainWebSound.key.length - reduction);
                this.themeBeforeNotebook = lastTheme;
            }
            // We fade out the current song
            this.executeFading(false, this.mainWebSound, newSong);
        }
    }

    /**
     * Function that mutes/desmutes the music and sfx in the whole game
     */
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

}