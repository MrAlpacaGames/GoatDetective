class Player
{
    constructor(theScene, thePlayer, speed)
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Current Scene
        this.scene = theScene; 

        // Player
        this.player = thePlayer;

        // Player Speed
        this.playerSpeed = speed;

        this.scene.cameras.main.startFollow(this.player, true);
        this.scene.cameras.main.setDeadzone(100, 150);
    }

    //--------------------------------
    // Functions
    //--------------------------------

    /**
     * Function that moves the player in the direction established by the input
     * @param {*Direction in which the player will be moving} direction 
     */
    movePlayer(direction)
    {
        let isFlip = (direction == 1) ? false: true;
        this.player.setVelocityX(this.playerSpeed * direction);
        this.player.setFlip(isFlip);
    }

    /**
     * Function that receives the pointer position and then moves the player towards that point
     * @param {*Pointer where the player has clicked} thePointer 
     */
    clickAction(thePointer)
    {
        let theDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, thePointer.worldX, this.player.y);
        let theDuration = theDistance / this.playerSpeed*1000;

        let theDirection = this.player.x - thePointer.worldX;
        if(theDirection != 0)
        {
            this.player.anims.play('walking', true);
            let isFlip = (theDirection > 0) ? true: false;
            this.player.setFlip(isFlip);

            var tween = this.scene.tweens.add({
                targets: this.player,
                x: thePointer.worldX,
                duration: theDuration,
                onComplete: ()=> this.stopMoving()
            });
        }
    }

    stopMoving()
    {
        this.player.anims.play('quiet');
    }




}