const gameConfig = 
{
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
    scene: 
    {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(gameConfig); 

function preload()
{
    this.load.image('Background', 'assets/sprites/Background.jpg');
    this.load.image('Characters', 'assets/sprites/Personajes.png');
    this.load.spritesheet('Peterson', 'assets/sprites/GoatmanPeterson.png',
    {frameWidth: 471, frameHeight: 1264});
    resize();
}

function create()
{
    /** 
     */
    //We define the size of the window
    windowWidth = gameConfig.width;
    windowHeight = gameConfig.height;

    //scaleRatio = window.devicePixelRatio / 3;

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
    //skyImage.setDisplaySize(windowWidth, windowHeight);
    //skyImage.setDisplaySize(windowWidth, windowHeight);

    //characters = this.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Characters');
    //characters.setScale(0.4);
}

function update()
{

}