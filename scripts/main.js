//import BootScene from './scenes/BootScene';

const gameConfig = 
{
    title: 'Goat Detective Supah Star',
    type: Phaser.WEBGL,
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
                debug: false
            }
        }
    },
    scene: [/*BootScene, MainMenu, HallScene, */ OfficeScene]
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

function preload()
{
    
}
/*
function init()
{
    //  Inject our CSS with the fonts to be used in the game
    var element = document.createElement('style');

    document.head.appendChild(element);

    var sheet = element.sheet;

    var styles = '@font-face { font-family: "ailerons"; src: url("assets/fonts/Ailerons-Regular.otf") format("opentype"); }\n';

    sheet.insertRule(styles, 0);

    styles = '@font-face { font-family: "anurati"; src: url("assets/fonts/Anurati-Regular.otf") format("opentype"); }';

    sheet.insertRule(styles, 0);

    styles = '@font-face { font-family: "geometrich"; src: url("assets/fonts/geometricHurricane.ttf") format("opentype"); }';

    sheet.insertRule(styles, 0);
}
*/

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

/** 
// The Player
var player;

// The Floor
var floors;

function preload()
{
    this.load.image('Background', 'assets/sprites/Background.jpg');
    //this.load.image('Characters', 'assets/sprites/Personajes.png');   

    this.load.spritesheet('Peterson', 'assets/sprites/GoatmanPeterson.png',
    {frameWidth: 471, frameHeight: 1264});
    resize();
}

function create()
{
    //We define the size of the window
    windowWidth = gameConfig.width;
    windowHeight = gameConfig.height;

    scaleRatio = window.devicePixelRatio / 3;

    // Find the center of the top space
    topBackgroundXOrigin = windowWidth / 2;
    topBackgroundYOrigin = 300;
    topBackgroundHeight = (windowHeight / 5) * 3;
    
    // Base width and height of the images
    imageBaseWidth = windowWidth;
    imageBaseHeight = windowHeight;
    heightRatio = topBackgroundHeight / imageBaseHeight;

    // Add the sky image at the right location and resize it to take all the space, no scaling needed
    skyImage = this.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Background');
    skyImage.setScale(0.6);

    createCharacter("Peterson");
    //skyImage.setDisplaySize(windowWidth, windowHeight);
    //skyImage.setDisplaySize(windowWidth, windowHeight);

    //characters = this.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Characters');
    //characters.setScale(0.4);
}


function createCharacter(character)
{
    switch(character)
    {
        case "Peterson":
            player = game.scene.scenes[0].physics.add.sprite(100, 100, 'Peterson');
            //player = this.Phaser.Physics.add.sprite(100,100,'Peterson');
            player.setScale(scaleRatio);
            player.setCollideWorldBounds(true);
            
            //  Our player animations, turning, walking left and walking right.
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('Peterson', { start: 0, end: 0 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [ { key: 'Peterson', frame: 0 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('Peterson', { start: 0, end: 0 }),
                frameRate: 10,
                repeat: -1
            });
        break;
    }
}

function update()
{

}
*/