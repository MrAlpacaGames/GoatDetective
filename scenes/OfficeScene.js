class OfficeScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'OfficeScene'
        });
        //var theText;
    }

    preload()
    {
        this.add.text(0, 0, '', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});

        this.load.spritesheet('ClickFire', 'assets/sprites/Particles/Click.png',
        {frameWidth: 64, frameHeight: 64});
    }

    create()
    {
        var theText = this.add.text(180, 136, 'Mouse Position is X: 0 & Y: 0', 
        { fontFamily: 'Ailerons', fontSize: 40 , color: '#f3e307', align: 'left'});

        this.anims.create({
            key: 'ShowClick',
            frames: this.anims.generateFrameNumbers('ClickFire',{start:0, end: 15}),
            frameRate: 30,
        })

        let clickFx = this.add.sprite(0, 0);
        clickFx.setScale(1.5);

        this.input.on('pointermove', function (pointer){
            //this.updateText(pointer);
            theText.setText('Mouse Position is \n at X: '+ pointer.x + ' \n & Y:' + pointer.y + ')');

        })

        this.input.on('pointerdown', function(pointer)
        {
            clickFx.setPosition(pointer.x , pointer.y);
            clickFx.play('ShowClick');
        } );
    }

    updateText(mousePosition)
    {
        //this.theText.setText('Mouse Position is at X: '+ mousePosition.x + ' & Y:' + mousePosition.y + ')');
    }


}