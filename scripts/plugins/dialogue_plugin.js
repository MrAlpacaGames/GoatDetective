class DialoguePlugin extends Phaser.Plugins.BasePlugin
{
  constructor(pluginManager)
  {
    //----------------------------
    // VARIABLES
    //----------------------------
    super(pluginManager);
    this.scene;
    this.systems;


    // Single Dialog Background
    this.singleDialogueBackground;

    // Multiple Choice Dialog Background
    this.multipleDialogueBackground;

    this.eventCounter = 0;
    this.timedEvent;
    this.dialogueSpeed = 3;

    //------------------------------
    // TEXTS
    //-------------------------------

    // Name of the person speaking
    this.characterName;

    // This is the text of the dialogues
    this.dialogueText;
    this.animatedText;
    this.possibleText;    

    this.isWriting;
    this.isEnabled = false;

    // Buttons
    this.nextButton;

    // Accuse Button
    this.accuseBtn;

    // Close Button
    this.closeBtn;

    this.interactiveOptions;
  }

  //----------------------------
  // METHODS
  //----------------------------

  /**
   * Method that preloads the dialogues in the plugin
   */
  preloadDialogue()
  {
    this.systems = currentScene.sys;
    if(!currentScene.sys.settings.isBooted)
    {
      currentScene.events.once('boot', () => this.boot(), this);
    }

    currentScene.load.image('SDialogBack', 'assets/sprites/HUD/Dialogo.png');
    currentScene.load.image('MDialogBack', 'assets/sprites/HUD/SeleccionMultiple.png');

    currentScene.load.image('nextBtn', 'assets/sprites/HUD/Siguiente.png');
    currentScene.load.image('closeBtn', 'assets/sprites/HUD/x.png');
    currentScene.load.image('AccuseBtn', 'assets/sprites/HUD/BotonAcusar.png');
  }
  
  /**
   * Method that creates the dialogue Window in the UI
   */
  createDialogueWindow()
  {
    //-------------------------------
    // SINGLE DIALOG WINDOW
    //-------------------------------

    // We create the static dialogue window
    this.singleDialogueBackground = currentScene.physics.add.staticSprite(500, 100, 'SDialogBack');
    this.singleDialogueBackground.scrollFactorX = 0;

    this.characterName = currentScene.add.text(140, 60, "", { fontFamily: 'Asap', fontSize: 25 , color: '#f9e26e', align: 'left',
    wordWrap: {width: 200},
    wordWrapUseAdvanced: true
    });
    this.characterName.scrollFactorX = 0;

    // We create the static text
    this.dialogueText = currentScene.add.text(300, 45, "", { fontFamily: 'Asap', fontSize: 25 , color: '#f9e26e', align: 'left',
    wordWrap: {width: 530},
    wordWrapUseAdvanced: true
    });
    this.dialogueText.scrollFactorX = 0;

    //---------------------------------
    // MULTIPLE CHOICE DIALOG WINDOW
    //---------------------------------

    // We create the static dialogue window
    this.multipleDialogueBackground = currentScene.physics.add.staticSprite(500, 100, 'MDialogBack');
    this.multipleDialogueBackground.scrollFactorX = 0;
    this.multipleDialogueBackground.visible = false;


    // We create the dynamic interactive options elements
    let xPositions = [175, 365, 555, 745];

    this.interactiveOptions = currentScene.add.container();

    for(let i = 0; i < 4; i++)
    {
      let xOption = currentScene.add.text(xPositions[i], 70, "Option "+i, { fontFamily: 'Asap', fontSize: 25 , color: '#f9e26e', align: 'center',
      wordWrap: {width: 90},
      wordWrapUseAdvanced: true
      });
      xOption.name = i;
      xOption.scrollFactorX = 0;

      xOption.setInteractive();
      xOption.on('pointerdown', function(){
        this.setTint(0x0EE612);
      });
      xOption.on('pointerup', function(){
        this.clearTint();
        dialogueManager.selectOption(i);
      });
      xOption.on('pointerout', function(){
        this.clearTint();
      });

      this.interactiveOptions.add(xOption);
    }

    //---------------------------------
    // BUTTONS
    //---------------------------------

    this.nextButton = currentScene.physics.add.staticSprite(855, 130, 'nextBtn');  
    this.createButtonBehaviour(this.nextButton,'nextBtn');

    this.closeBtn = currentScene.physics.add.staticSprite(885, 30, 'closeBtn');  
    this.createButtonBehaviour(this.closeBtn, 'closeBtn');

    this.accuseBtn = currentScene.physics.add.staticSprite(835,505, 'AccuseBtn');  
    this.createButtonBehaviour(this.accuseBtn, 'AccuseBtn');
    this.accuseBtn.visible = false;

    this.switchWindows(false);
  }

  /**
   * Method that Enables or Disables the Window in the UI
   * @param {* Defines if the window is to be multiple option or not} isMultiple 
   * @param {* Defines if the window is to be set on or off} newValue 
   */
  enableDialogueUI(newValue)
  {
    this.isEnabled = newValue;
    dialogueManager.currentDialogueLvl = 0;
    // We first hide/show all the Single Dialog Elements
    this.singleDialogueBackground.visible = newValue;
    this.nextButton.visible = newValue;
    this.dialogueText.visible = newValue;
    this.characterName.visible = newValue;

    // We now activate/deactivate the multiple choice dialog elements
    this.multipleDialogueBackground.visible = false;
    this.interactiveOptions.visible = false;

    // We activate/deactivate
    this.closeBtn.visible = newValue;
    this.accuseBtn.visible = false;

    if(newValue == false)
    {
      let timedEvent = currentScene.time.delayedCall(100, function(){
        GameManager.canMove = true;
      } , currentScene);
    }
  }

  /**
   * Allow us to switch between the single and multiple option dialogues UI elements
   * @param {*New Value to define the show/hide behaviours} toMultiple 
   */
  switchWindows(toMultiple)
  {
    dialogueManager.currentDialogueLvl = (toMultiple == true)? 1 : 0;
    // We first hide/show all the Single Dialog Elements
    this.singleDialogueBackground.visible = !toMultiple;
    this.nextButton.visible = !toMultiple;
    this.dialogueText.visible = !toMultiple;
    this.characterName.visible = !toMultiple;

    // We now activate/deactivate the multiple choice dialog elements
    this.multipleDialogueBackground.visible = toMultiple;
    this.interactiveOptions.visible = toMultiple;
  }

  setOptionsNames(names)
  {
    for(let i = 0; i < names.length; i++)
    {
      this.interactiveOptions[i].text = names[i];
    }
  }
  
  /**
   * Method that creates behaviours for the Dialogues Buttons
   * @param {*The button to have a new behaviour} theButton 
   * @param {*The behaviour to be implemented to the button} behaviour 
   */
  createButtonBehaviour(theButton, behaviour)
  {
    theButton.scrollFactorX = 0;
    theButton.setInteractive();
    
    theButton.on('pointerdown', function()
    {
      this.setScale(1.1);
    });
    theButton.on('pointerout', function()
    {
      this.setScale(1);
    });
    theButton.on('pointerup', function()
    {
      this.setScale(1);
    });

    switch(behaviour)
    {
      case "nextBtn":
        theButton.on('pointerdown', ()=> dialogueManager.checkNextAction());
      break;
      case "closeBtn":
        // We close the dialogue
        theButton.on('pointerdown', ()=> this.enableDialogueUI(false));
      break;
      case "AccuseBtn":
        // We accuse the character who we are talking to
        
      break;
    }
  }

  /**
   * Method that sets the text for the new dialogue and animates it
   * @param {*New Dialogue to be used in the dialogue window} dialogue 
   */
  setDialogueText(dialogue)
  {
    if(this.dialogueText.text != "") this.dialogueText.setText("");
    this.eventCounter = 0;
    if(this.timedEvent) this.timedEvent.remove();

    this.possibleText = dialogue;
    this.animatedText = dialogue.split('');

    this.timedEvent = currentScene.time.addEvent(
      {
        delay: 140 - (this.dialogueSpeed * 30),
        callback: this.animateText,
        callbackScope: this,
        loop: true
      }
    );
  }

  /**
   * Method that animates the text
   */
  animateText()
  {
    this.isWriting = true;
    this.eventCounter++;
    this.dialogueText.text += this.animatedText[this.eventCounter -1];
    if(this.eventCounter === this.animatedText.length)
    {
      this.timedEvent.remove();
      this.isWriting = false;
    }
  }

  /**
   * Method used to skip the current animation of the text
   */
  skipText()
  {
    this.timedEvent.remove();
    this.isWriting = false;
    this.dialogueText.text = this.possibleText;
  }

 
  //----------------------------
  // PLUGIN METHODS
  //----------------------------
 
  boot()
  {
    var eventEmitter = this.systems.events;
    eventEmitter.on('destroy', () => this.destroy(), this);
  }

  shutdown()
  {
    //if(this.timedEvent) this.timedEvent.remove();
    if(this.dialogueBackground) this.dialogueBackground.destroy();
    if(this.dialogueText) this.dialogueText.destroy();
    if(this.nextButton) this.nextButton.destroy();
  }

  destroy()
  {
    this.shutdown();
  }

}