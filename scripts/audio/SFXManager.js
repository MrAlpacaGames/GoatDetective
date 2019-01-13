class SFXManager
{
    constructor()
    {
        this.menusSFX = [];
    }

    preloadSFX()
    {
        currentScene.load.audio('ZafSupah','assets/audio/sfx/ZafSupahIntro.mp3');
    }
    
    createSFX()
    {
        let supah = currentScene.sound.add('ZafSupah');
        this.menusSFX.push(supah);
    }

    playSupahStar()
    {
        let supahSFX = this.menusSFX[0];
        supahSFX.play();
    }

}