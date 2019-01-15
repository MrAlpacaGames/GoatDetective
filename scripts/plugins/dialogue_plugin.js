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
    this.dialogueText;
    this.dialogueBackground;
    this.nextButton;
    this.eventCounter = 0;
    this.timedEvent;
    this.dialogueSpeed = 3;
    this.animatedText;
    this.possibleText;

    this.isWriting;
    this.isEnabled = false;

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

    currentScene.load.image('dialBack', 'assets/sprites/UI/DialogueBox.png');
    currentScene.load.image('nextBtn', 'assets/sprites/UI/NextBtn.png');
  }
  
  /**
   * Method that creates the dialogue Window in the UI
   */
  createDialogueWindow()
  {
    // We create the static dialogue window
    this.dialogueBackground = currentScene.physics.add.staticSprite(500, 100, 'dialBack');
    this.dialogueBackground.scrollFactorX = 0;
    this.dialogueBackground.setScale(1.6, 1.3);

    // We create the static text
    this.dialogueText = currentScene.add.text(200, 45, "", { fontFamily: 'Ailerons', fontSize: 35 , color: '#e20333', align: 'left',
    wordWrap: {width: 570},
    wordWrapUseAdvanced: true
    });
    this.dialogueText.scrollFactorX = 0;

    // We create the dynamic interactive options elements
    let xPositions = [205, 205, 505, 505];
    let YPositions = [55, 100, 55, 100];

    this.interactiveOptions = currentScene.add.container();

    for(let i = 0; i < 4; i++)
    {
      let newOption = currentScene.add.text(xPositions[i], YPositions[i], "Pista "+i, { fontFamily: 'Ailerons', fontSize: 35 , color: '#e20333', align: 'left',
      wordWrap: {width: 570},
      wordWrapUseAdvanced: true
      });
      newOption.scrollFactorX = 0;
      
      newOption.setInteractive();
      newOption.on('pointerdown' , function()
      {
        this.setTint(0x0EE612);
      });
      newOption.on('pointerup' , function()
      {
        this.clearTint();
      });
      newOption.on('pointerup' , ()=> dialogueManager.checkNextD(i));
      newOption.on('pointerout' , function()
      {
        this.clearTint();
      });

      this.interactiveOptions.add(newOption);
    }

    this.createNextButton();
    this.enableDialogueUI(false, false);
  }

  /**
   * Method that Enables or Disables the Window in the UI
   * @param {* Defines if the window is to be multiple option or not} isMultiple 
   * @param {* Defines if the window is to be set on or off} newValue 
   */
  enableDialogueUI(isMultiple, newValue)
  {
    this.isEnabled = newValue;
    this.toogleWindow(newValue);
    this.toogleNextBttn(newValue);
    this.toogleDialogTexts(isMultiple, newValue);
  }
  
  /**
   * Method that creates the next button in the Window
   */
  createNextButton()
  {
    let self = this;
    this.nextButton = currentScene.physics.add.staticSprite(785, 135, 'nextBtn');  
    this.nextButton.scrollFactorX = 0;
    this.nextButton.setScale(0.2);
    this.nextButton.setInteractive();

    this.nextButton.on('pointerdown', function()
    {
      this.setTint(0xff0000);
    });
    this.nextButton.on('pointerout', function()
    {
      this.clearTint();
    });
    this.nextButton.on('pointerup', function()
    {
      this.clearTint();
    });
    this.nextButton.on('pointerup', () => interacionManager.nextDialogue());
  }


  setDialogueText(isMultiple, dialogue)
  {
    if(this.dialogueText.text != "") this.dialogueText.setText("");
    this.eventCounter = 0;
    if(this.timedEvent) this.timedEvent.remove();

    if(isMultiple == false)
    {
      this.possibleText = dialogue.Text;
      this.animatedText = dialogue.Text.split('');
  
      this.timedEvent = currentScene.time.addEvent(
        {
          delay: 140 - (this.dialogueSpeed * 30),
          callback: this.animateText,
          callbackScope: this,
          loop: true
        }
      );
    }
    else
    {
      this.dialogueText.text += dialogue.Text+"\n";
      let availableOptions = dialogue.getAvailableOptions();

      for(let i = 0; i < this.interactiveOptions.length; i++)
      {
        let x = availableOptions[i];
        if(x == null)
        {
          this.interactiveOptions.getAt(i).visible = false;
        }
        else
        {
          this.interactiveOptions.getAt(i).visible = true;
          this.interactiveOptions.getAt(i).text = x.Text;
        }
      }
    }
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

  skipText()
  {
    this.timedEvent.remove();
    this.isWriting = false;
    this.dialogueText.text = this.possibleText;
  }

  /**
   * We show or disable the dialogue window
   * @param {* New Value to define if we hide or show the window} newValue 
   */
  toogleWindow(newValue)
  {
    if(this.dialogueBackground) this.dialogueBackground.visible = newValue;
  }

  /**
   * Method that toogles on/off the texts
   * @param {*If is true is multiple option} isMultiple 
   * @param {*The new value of the window state. True = Show. False = Hide} newValue 
   */
  toogleDialogTexts(isMultiple, newValue)
  {
    if(isMultiple == false)
    {
      this.interactiveOptions.visible = false;
      this.dialogueText.visible = newValue;
    }
    else
    {
      this.dialogueText.visible = false;
      this.nextButton.visible = false;
      this.interactiveOptions.visible = newValue;
    }
  }

  /**
   *  Method that shows or hides the next button
   * @param {* New Next Button Value} newValue 
   */
  toogleNextBttn(newValue)
  {
    if(this.nextButton) this.nextButton.visible = newValue;
  }
  
  //----------------------------
  // PLUGIN METHODS
  //----------------------------
  hero()
  {
    console.log("Bwonswandiiii We gat a Deeeaaal");
  }

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