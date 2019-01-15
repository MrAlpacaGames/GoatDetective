class HUDManager
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
    }

    preload()
    {
        currentScene.load.image('MuteBtn', 'assets/sprites/Menus/Mute.png');
        currentScene.load.image('MuteHigh', 'assets/sprites/Menus/Mute2.png');
        currentScene.load.image('NB', 'assets/sprites/HUD/NB.png');
    }

    createHUD()
    {
         // The first button that will enable audio
         let muteBtn = currentScene.add.image(topBackgroundXOrigin+430, topBackgroundYOrigin-230, 'MuteBtn');
         muteBtn.name = "HUD";
         muteBtn.scrollFactorX = 0;
         muteBtn.setScale(2);
         muteBtn.setInteractive();
 
         let muteHigh = currentScene.add.image(topBackgroundXOrigin+430, topBackgroundYOrigin-230, 'MuteHigh');
         muteHigh.scrollFactorX = 0;
         muteHigh.setScale(2);
         muteHigh.visible = false;

         muteBtn.on('pointerdown', function(){
             muteHigh.visible = true;
             GameManager.HUDInteracted = true;
         });

         muteBtn.on('pointerdown', function(){
            musicManager.muteMusic();
        });

         muteBtn.on('pointerup', function(){
            muteHigh.visible = false;
            GameManager.HUDInteracted = false;
        });

        muteBtn.on('pointerout', function(){
            muteHigh.visible = false;
        });

         let notebook = currentScene.add.image(topBackgroundXOrigin-410, topBackgroundYOrigin+200, 'NB');
         notebook.name = "HUD";
         notebook.scrollFactorX = 0;
         notebook.setScale(0.15);
         notebook.setInteractive();

         notebook.on('pointerdown', ()=> spriteManager.onElementClicked(notebook, true));
         notebook.on('pointerup', ()=> spriteManager.onElementClicked(notebook, false));
         notebook.on('pointerup', ()=> interacionManager.openNotebook(true));
         notebook.on('pointerout', ()=> spriteManager.onElementClicked(notebook, false));
    }
}