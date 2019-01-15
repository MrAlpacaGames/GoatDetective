class UINotebookManager
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
    }

    preload()
    {
        currentScene.load.image('Suspects', 'assets/sprites/Agenda/Sospechosos.png');
    }

    create()
    {
        currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Suspects');
    }
    
}