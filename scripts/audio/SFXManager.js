class SFXManager
{
    constructor()
    {
        this.menusSFX = [];
    }

    preloadSFX()
    {
        currentScene.load.audio('ZafSupah','assets/audio/sfx/ZafSupahIntro.mp3');
        currentScene.load.audio('OpenDoor','assets/audio/sfx/OpenDoor.wav');
        currentScene.load.audio('WriteNote','assets/audio/sfx/WritingOpc3.wav');
    }
    
    
    createSFX()
    {
        let supah = currentScene.sound.add('ZafSupah');
        this.menusSFX.push(supah);
        supah = currentScene.sound.add('OpenDoor');
        this.menusSFX.push(supah);
        supah = currentScene.sound.add('WriteNote');
        this.menusSFX.push(supah);
    }

    playSupahStar()
    {
        let supahSFX = this.menusSFX[0];
        supahSFX.play();
    }

    playSFX(index)
    {
        this.menusSFX[index].play();
    }



}