class HallScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'HallScene'
        });
        var startPoint;
        var player;
        var interactuables;

        var clickFx;

        var playerScript;
    }

    preload()
    {
        this.load.image('hall', 'assets/sprites/hall.png');
        this.load.spritesheet('Peterson', 'assets/sprites/Goatman.png',
        {frameWidth: 587.43, frameHeight: 1268});

        this.load.image('Park', 'assets/sprites/Park.png');

        this.load.spritesheet('Jung', 'assets/sprites/Jung.png',
        {frameWidth: 416, frameHeight: 1264});

        this.load.spritesheet('ClickFire', 'assets/sprites/Particles/Click.png',
        {frameWidth: 64, frameHeight: 64});
    }

    create()
    {        
        //let hallBack = this.add.image(topBackgroundXOrigin+820, topBackgroundYOrigin-5, 'hall');
        //hallBack.setScale(/*gameScaleRatio+0.03*/ 0.36);

        let hallBack = this.add.image(topBackgroundXOrigin+815, topBackgroundYOrigin-2, 'hall');
        hallBack.setScale(/*gameScaleRatio+0.03*/ 0.72);

        this.interactuables = this.physics.add.staticGroup();
        this.createCharacter("Park");
        this.createCharacter("Jung");

        this.createCharacter("Peterson");

        this.cameras.main.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height);
        this.physics.world.setBounds(0, 0, gameConfig.width * 2.7, gameConfig.height -40 );

        this.anims.create({
            key: 'ShowClick',
            frames: this.anims.generateFrameNumbers('ClickFire',{start:0, end: 15}),
            frameRate: 30,
        })
        
        this.clickFx = this.add.sprite(0, 0);
        this.clickFx.setScale(1.5);

        /**
        var theText = this.add.text(1000, 136, 'Mouse Position is X: 0 & Y: 0', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});

        this.input.on('pointermove', function (pointer){
            //this.updateText(pointer);
            theText.setText('Mouse Position is \n at X: '+ pointer.worldX + ' \n & Y:' + pointer.worldY + ')');

        })
        
        */
       
       this.playerScript = new Player(this, this.player, 200);
       this.input.on('pointerdown', () => this.playerScript.clickAction(this.input.activePointer));
       this.input.on('pointerdown', () => this.clickEffect(this.input.activePointer));
    }

    clickEffect(thePointer)
    {
        this.clickFx.setPosition(thePointer.worldX, thePointer.worldY);
        this.clickFx.play('ShowClick', false);
    }

    createCharacter(character)
    {
        switch(character)
        {
            case "Peterson":
                this.player = this.physics.add.sprite(topBackgroundXOrigin+550, topBackgroundYOrigin+90, 'Peterson');
                //player = this.Phaser.Physics.add.sprite(100,100,'Peterson');
                this.player.setScale(/*gameScaleRatio*/ 0.25);
                this.player.setCollideWorldBounds(true);
                
                //  Our player animations, turning, walking left and walking right.
                this.anims.create({
                    key: 'walking',
                    frames: this.anims.generateFrameNumbers('Peterson', { start: 1, end: 6 }),
                    frameRate: 5,
                    repeat: -1
                });
                
                this.anims.create({
                    key: 'quiet',
                    frames: [ { key: 'Peterson', frame: 0 } ],
                    frameRate: 1
                });
                this.player.anims.play('quiet');
            break;
            case "Park":
                this.interactuables.create(topBackgroundXOrigin+800, topBackgroundYOrigin+200, 'Park').setScale(0.25).refreshBody();
            break;
            case "Jung":
                this.interactuables.create(topBackgroundXOrigin+1000, topBackgroundYOrigin+50, 'Jung').setScale(0.25).refreshBody();
            break;
        }
    }

    update()
    {

    }

}