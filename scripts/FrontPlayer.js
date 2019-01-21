class FrontPlayer
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------

        // Player
        this.player;

        // Player Speed
        this.playerSpeed = 800;        
    }

    //--------------------------------
    // Functions
    //--------------------------------

    assignScene(spritePlayer)
    {
        this.player = spritePlayer;
        currentScene.cameras.main.startFollow(this.player, true);
        currentScene.cameras.main.setLerp(0.2);
        currentScene.cameras.main.setDeadzone(150, 150);
    }

    assignOnEvents()
    {
        currentScene.input.on('pointerdown', () => this.clickAction(currentScene.input.activePointer));
        currentScene.input.on('gameobjectdown', function(pointer, gameObject)
        {
            //console.log("Down Clicked: "+gameObject.name);
            currentClickedElement = gameObject;
        });
    }

    /**
     * Function that moves the player in the direction established by the input
     * @param {*Direction in which the player will be moving} direction 
     */
    movePlayer(direction)
    {
        if(GameManager.canMove == true)
        {
            let isFlip = (direction == 1) ? false: true;
            this.player.setVelocityX(this.playerSpeed * direction);
            this.player.setFlip(isFlip);
        }
    }

    

    /**
     * Function that receives the pointer position and then moves the player towards that point
     * @param {*Pointer where the player has clicked} thePointer 
     */
    clickAction(thePointer)
    {
        if(GameManager.canMove == true && GameManager.HUDInteracted == false)
        {
            currentScene.tweens.killAll();
            let xAdditive = this.calculateDistanceToMove(); // This is 0 until the player selects an interactive element. Then it will change to a new distance
            let destination = thePointer.worldX + xAdditive;
    
            let theDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, destination, this.player.y);
            let theDuration = theDistance / this.playerSpeed*1000;
    
            let theDirection = this.player.x - destination;
            if(theDirection != 0)
            {
                this.player.anims.play('walking', true);
                let isFlip = (theDirection > 0) ? true: false;
                this.player.setFlip(isFlip);
    
                var tween = currentScene.tweens.add({
                    targets: this.player,
                    x: destination,
                    duration: theDuration,
                    onComplete: ()=> this.stopMoving()
                });
            }
        }
    }
    
    calculateDistanceToMove()
    {
        let answer = 0;
        if(currentClickedElement != null)
        {   
            console.log("U clicked on: "+currentClickedElement.name);
            answer = 150;
            // We first determine if the player is on the right or the left of the item.
            // If it is < 0 it is on the left of the item. If it is > 0 is on the right side of the element
            let direction = this.player.x - currentClickedElement.x;
            //console.log("Direccion es: "+direction);    
            if(direction < 0)
            {
                answer *= -1;
            }
        }
        return answer;
    }
    
    
    stopMoving()
    {
        currentScene.tweens.killAll();
        this.player.anims.play('quiet');
        //currentScene.dialogue.toogleWindow(true);
        
        // We face the item/ character because it means we're interacting with him
        if(currentClickedElement != null)
        {
            if(currentClickedElement.name != "" && currentClickedElement.name != "HUD")
            {
                let theDirection = this.player.x - currentClickedElement.x;
                let isFlip = (theDirection > 0) ? true: false;
                this.player.setFlip(isFlip);
    
                // Before we erase the currentClickedElement we open the chat window with him
                interacionManager.interact(currentClickedElement.name);
            }
        }
        currentClickedElement = null;
    }
}