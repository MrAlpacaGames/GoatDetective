class MainMenu extends Phaser.Scene
{
    constructor(x)
    {
        super({
            key: 'MainMenu'
        });
    }

        
    init()
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


    preload()
    {
        
    }

    create()
    {
        this.add.text(180, 136, 'GOAT DETECTIVE \n SUPAH STARR', 
        { fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'left'});

        //this.add.text(350, 350, 'Start', 
        //{ fontFamily: 'Ailerons', fontSize: 80 , color: '#f3e307', align: 'center'});

        this.createButton(1, 'startGame', 350, 350);
    }

    createButton(id, name, posX, posY)
    {
        let btn = this.add.image(x,y, )
    }


}