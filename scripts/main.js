const gameConfig = 
{
    id: "TheGame",
    title: 'Goat Detective Supah Star',
    type: Phaser.AUTO,
    //width: window.innerWidth * window.devicePixelRatio,
    //height: window.innerHeight * window.devicePixelRatio,
    width: 960,
    height: 540,
    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            gravity:
            {
                y: 300,
                debug: true
            }
        }
    },
    scene: [/*BootScene, MainMenu,*/ HallScene, OfficeScene,DressroomScene, StudioScene, UINotebook]
};

//---------------------------------------------
// Game Variables
//---------------------------------------------

// The Game
var theGame = new Phaser.Game(gameConfig); 

// The Game Manager 
var GameManager = new GM();

// The Player
var thePlayer = new FrontPlayer();

// Current clicked element by the user
var currentClickedElement;

// Notebook
var playerNotebook = new Notebook();

// Bool that defines if the game has already started
var hasStartedGame = false;

// CurrentScene of the Game
var currentScene;

// Previous Scene of the Game
var previousScene;

// Flag to delay scene switching after we change scene
var canSceneSwitch = true;

//---------------------------------------------
// Global Scripts
//---------------------------------------------

// Script that manages all the sprites in the scenes
var spriteManager = new SpriteManagement();

// Script that manages the menus sprites
var menuSpriteManager = new UIMenuManager();

// Script that manages the Notebook sprites
var notebookSpriteManager = new UINotebookManager();

// Script that manages the interactions in the scenes
var interacionManager = new InteractionManagement();

// Script that manages the music of the game
var musicManager = new MusicManager();

// Script that manages the SFX of the game
var sfxManager = new SFXManager();

// Script that manages the dialogues
var dialogueManager = new DialogueManager();

// Current Dialogue HUD. It changes between scenes
var currentDialogueHUD;

// Current HUD of the Player. It changes between scenes
var currentPlayerHUD;

//---------------------------------------------
// Screen Settings
//---------------------------------------------

// Size of the window
var windowWidth = gameConfig.width;

var windowHeight = gameConfig.height;

var gameScaleRatio = window.devicePixelRatio / 3;

// Find the center of the top space
var topBackgroundXOrigin = windowWidth / 2;
var topBackgroundYOrigin = windowHeight /2;

var soundContextResumed = false;


//-----------------------------------
// Functions
//-----------------------------------

function createButton(scene, name, imageID, posX, posY, scaleX, scaleY, textX, textY)
{
    let btn = scene.add.image(posX, posY, imageID);
    btn.setScale(scaleX, scaleY);

    // We set the button information
    btn.name = name;
    btn.setData('active', false);

    btn.setInteractive();

    // Toggle Options
    let toggleBtn = scene.add.image(posX, posY, imageID);
    toggleBtn.setScale(scaleX, scaleY);     
    toggleBtn.setAlpha(0.4);
    toggleBtn.setTint(0xff0000);
    toggleBtn.visible = false;

    if(name != 'Mute')
    {
        // Button Text
        scene.add.text(posX-textX, posY-textY, name, 
            { fontFamily: 'Ailerons', fontSize: 36 , color: '#000000', align: 'center'});
    }
    
    assignButtonBehaviour(scene, btn, toggleBtn, name);        
}

function assignButtonBehaviour(scene, button, highButton, name)
{
    button.on('pointerdown', function()
    {
        highButton.visible = true;
    });
    button.on('pointerup', function()
    {
        highButton.visible = false;
    });
    button.on('pointerout', function()
    {
        highButton.visible = false;
    });
    switch(name)
    {
        case "Start Game":
           button.on('pointerup', () => loadScene(scene, 'HallScene'));
        break;
        case "Mute":
            button.on('pointerup', () => muteTheWorld(scene));
        break;
    }
}

function startWorld()
{
    
}

function muteTheWorld(scene)
{
    if(soundContextResumed == false)
    {
        soundContextResumed = true;
        scene.sound.context.resume();
    }
    if(scene.sound.mute == false)
    {
        scene.sound.mute = true;
    }
    else
    {
        scene.sound.mute = false;
    }
}

/**
 * Method that loads a scene. If it is switch it sleeps the current scene
 * @param {*} newScene 
 */
function loadScene(newScene)
{
    if(canSceneSwitch == true)
    {
        //currentScene.input.stopPropagation();
        let destScene = this.getScene(newScene);
        previousScene = currentScene;
        currentScene.scene.switch(destScene);
        canSceneSwitch = false;
        currentScene = destScene;
        currentDialogueHUD = currentScene.dialogueHUD;
        currentPlayerHUD = currentScene.playerHUD;
        currentClickedElement = null;

        thePlayer.reloadPlayer();
        thePlayer.assignOnEvents();

        if(previousScene.scene.key == "StudioScene")
            thePlayer.player.setFlip(false);
        else if(previousScene.scene.key == "DressroomScene")
            thePlayer.player.setFlip(true);

        let timedEvent = currentScene.time.delayedCall(150, function(){
            canSceneSwitch = true;
            } , currentScene);
    }
}

function openNotebook(newValue)
{
    if(canSceneSwitch == true)
    {
        let destScene = (newValue == true) ?  this.getScene("UINotebook") : this.getScene(previousScene.scene.key);
    
        previousScene = currentScene;
        currentScene.scene.switch(destScene);
        canSceneSwitch = false;
        currentScene = destScene;    

        let timedEvent = currentScene.time.delayedCall(150, function(){
            canSceneSwitch = true;
            if(destScene.scene.key == "UINotebook") notebookSpriteManager.updateOnOpen();
            } , currentScene);
    }
}

function getScene(sceneName)
{
    return theGame.scene.getScene(sceneName);
}