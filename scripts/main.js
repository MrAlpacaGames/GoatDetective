const gameConfig = 
{
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
    plugins:
    {
        global: [{
            key: 'DialoguePlugin', plugin: DialoguePlugin, start: false, mapping: 'dialogue'
        }]
    }
    ,
    scene: [/*BootScene, MainMenu,*/ HallScene, OfficeScene, UINotebook]
};


//---------------------------------------------
// Game Variables
//---------------------------------------------

// The Game
var theGame = new Phaser.Game(gameConfig); 

var GameManager = new GM();

var thePlayer = new FrontPlayer();

// Current clicked element by the user
var currentClickedElement;

// UI Notebook
var playerNotebook;

var hasStartedGame = false;

var currentScene;

//---------------------------------------------
// Global Scripts
//---------------------------------------------

// Script that manages all the sprites in the scenes
var spriteManager = new SpriteManagement();;

// Script that manages the interactions in the scenes
var interacionManager = new InteractionManagement();

// Script that manages the music of the game
var musicManager = new MusicManager();

// Script that manages the SFX of the game
var sfxManager = new SFXManager();

// Script that manages the dialogues
var dialogueManager = new DialogueManager();

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

function init()
{
    console.log("Herooo Mon");
}

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
    currentScene.input.stopPropagation();
    let destScene = theGame.scene.getScene(newScene);
    let theCluee = new Clue('CAS', "Hero Moon", "We have a deal");
    currentScene.scene.start(newScene, theCluee);
    
    currentScene = destScene;
    //spriteManager.assignScene(newScene);
}