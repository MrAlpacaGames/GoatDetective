class DialoguePlugin extends Phaser.Plugins.BasePlugin
{
  constructor(pluginManager)
  {
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

    this.interactiveOptions;
  }

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
      newOption.on('pointerout' , function()
      {
        this.clearTint();
      });

      this.interactiveOptions.add(newOption);
    }

    this.createNextButton();
    this.toogleWindow(false);
    this.toogleNextBttn(false);
    this.toogleDialogTexts(true, false);
    this.toogleDialogTexts(false, false);
  }

  createNextButton()
  {
    let self = this;
    this.nextButton = currentScene.physics.add.staticSprite(785, 135, 'nextBtn');  
    this.nextButton.scrollFactorX = 0;
    this.nextButton.setScale(0.2);
    this.nextButton.setInteractive();

    this.nextButton.on('pointerdown', () => interacionManager.printJojo());
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
  }

  setDialogueText(text)
  {
    if(this.dialogueText.text != "") this.dialogueText.setText("");
    this.eventCounter = 0;
    if(this.timedEvent) this.timedEvent.remove();

    this.animatedText = text.split('');

    this.timedEvent = currentScene.time.addEvent(
      {
        delay: 150 - (this.dialogueSpeed * 30),
        callback: this.animateText,
        callbackScope: this,
        loop: true
      }
    );
    //this.dialogueText.setText(text);
  }

  animateText()
  {
    this.eventCounter++;
    this.dialogueText.text += this.animatedText[this.eventCounter -1];
    if(this.eventCounter === this.animatedText.length)
    {
      this.timedEvent.remove();
    }
  }

  toogleWindow(newValue)
  {
    if(this.dialogueBackground) this.dialogueBackground.visible = newValue;
  }

  toogleDialogTexts(isMultiple, newValue)
  {
    if(isMultiple == false)
    {
      this.dialogueText.visible = newValue;
    }
    else
    {
      this.interactiveOptions.visible = newValue;
    }
  }

  toogleNextBttn(newValue)
  {
    if(this.nextButton) this.nextButton.visible = newValue;
  }

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