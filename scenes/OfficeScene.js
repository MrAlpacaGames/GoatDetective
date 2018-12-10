class OfficeScene extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'OfficeScene'
        });
        var theText;
    }

    preload()
    {
        this.add.text(0, 0, '', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});
    }

    create()
    {
        this.add.text(180, 136, 'Mouse Position is X: 0 & Y: 0', 
        { fontFamily: 'Ailerons', fontSize: 40 , color: '#f3e307', align: 'left'});

    }


}