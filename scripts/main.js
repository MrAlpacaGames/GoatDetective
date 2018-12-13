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
    scene: [/*BootScene,*/ MainMenu, HallScene /*, OfficeScene */]
};

//---------------------------------------------
// Main Global Variables
//---------------------------------------------

// The Game
var theGame = new Phaser.Game(gameConfig); 

// Size of the window
var windowWidth = gameConfig.width;

var windowHeight = gameConfig.height;

var gameScaleRatio = window.devicePixelRatio / 3;

// Find the center of the top space
var topBackgroundXOrigin = windowWidth / 2;
var topBackgroundYOrigin = windowHeight /2;

//-----------------------------------
// Functions
//-----------------------------------

/**
 * Method that loads a scene. If it is switch it sleeps the current scene
 * @param {*} newScene 
 * @param {*} isSwitch 
 */
function loadScene(newScene, isSwitch)
{
    switch(isSwitch)
    {
        case true:
            this.scene.switch(newScene);
        break;
        case false:
            this.scene.start(newScene);
        break;
    }
}