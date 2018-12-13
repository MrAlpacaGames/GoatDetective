class InteractionManagement
{
    constructor(theScene)
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Current Scene
        this.scene = theScene;

        // Player Script
        this.playerScript;

        // Player Sprite
        this.playerSprite;
    }

    assignPlayer(theScript, theSprite)
    {
        this.playerScript = theScript;
        this.playerSprite = theSprite;
    }

    setInteractionWithPlayer(theInteractive)
    {
        this.scene.physics.add.collider(this.playerSprite, theInteractive);
        this.scene.physics.add.overlap(this.playerSprite, theInteractive, () => this.checkIfClicked(theInteractive));
    }

    checkIfClicked(theInteractive)
    {
        //console.log("Tocaste a: "+theInteractive.toString());
    }

}