class HallScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'HallScene'
        });
        var startPoint;
        var player;
        var cursors;
        var playerSpeed;

        //var clickFx;
    }

    preload()
    {
        this.load.image('hall', 'assets/sprites/hall.png');
        this.load.spritesheet('Peterson', 'assets/sprites/GoatmanPeterson.png',
        {frameWidth: 471, frameHeight: 1264});

        this.load.spritesheet('ClickFire', 'assets/sprites/Particles/Click.png',
        {frameWidth: 64, frameHeight: 64});


        this.playerSpeed = 400;
    }

    create()
    {        
        //let hallBack = this.add.image(topBackgroundXOrigin+820, topBackgroundYOrigin-5, 'hall');
        //hallBack.setScale(/*gameScaleRatio+0.03*/ 0.36);

        let hallBack = this.add.image(topBackgroundXOrigin+815, topBackgroundYOrigin-2, 'hall');
        hallBack.setScale(/*gameScaleRatio+0.03*/ 0.72);

        this.createCharacter("Peterson");

        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height);
        this.physics.world.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height -40 );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setDeadzone(150, 150);

        this.anims.create({
            key: 'ShowClick',
            frames: this.anims.generateFrameNumbers('ClickFire',{start:0, end: 15}),
            frameRate: 30,
        })
        
        let clickFx = this.add.sprite(topBackgroundXOrigin+300, topBackgroundYOrigin);
        clickFx.setScale(1.5);

        this.input.on('pointerdown', function(pointer)
        {
            clickFx.setPosition(pointer.x , pointer.y);
            clickFx.play('ShowClick');
        } );
        //window.alert(this.startPoint);
    }

    pointClicked(thePointer)
    {
        clickFx.setPosition(thePointer.x, thePointer.y);
        clickFx.play('ShowClick', false);
    }

    createCharacter(character)
    {
        switch(character)
        {
            case "Peterson":
                this.player = this.physics.add.sprite(topBackgroundXOrigin+520, topBackgroundYOrigin, 'Peterson');
                //player = this.Phaser.Physics.add.sprite(100,100,'Peterson');
                this.player.setScale(/*gameScaleRatio*/ 0.25);
                this.player.setCollideWorldBounds(true);
                
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

    update()
    {
        this.player.setVelocityX(0);
        //this.player.setVelocityY(0);

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-this.playerSpeed);
            this.player.setFlip(true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(this.playerSpeed);
            this.player.setFlip(false);
        }
    }

}