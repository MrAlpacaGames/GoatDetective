class DialogueHUD 
{
  constructor()
  {
    //----------------------------
    // VARIABLES
    //----------------------------
    //------------------------
    // SINGLE DIALOGUES
    //------------------------

    // Single Dialog Background
    this.singleDialogueBackground;

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
    this.backButton;

    // Accuse Button
    this.confrontBtn;

    // Close Button
    //this.closeBtn;

    //---------------------------------------
    // MULTIPLE OPTIONS DIALOGUES
    //--------------------------------------

    // Multiple Choice Dialog Background
    this.multipleDialogueBackground;

    // State of the multiple options dialogue. It can only be 0 or 1
    this.multipleOptionsState = 0;

    // Current Type of Clue Selected
    this.currentClueTypeSelected;

    // Current Clue Selected
    this.currentPersonTalkingTo;

    //-------------------------------------
    // PARK OPTIONS DIALOGUE
    //-------------------------------------
    
    // Park Dialog Background
    this.parkDialogueBackground;

    // Park Selected Options
    this.parkOptions;

    //-------------------------------------
    // ACCUSATION OPTIONS DIALOGUE
    //-------------------------------------

    // Acusation Dialog Background
    this.acusationDialogueBackground;

    // Accuse Button
    this.accusationButton;

    // Character Left Arrow
    this.charLeftArrow;

    // Character Right Arrow
    this.charRightArrow;

    // Weapon Left Arrow
    this.weapLeftArrow;

    // Weapon Right Arrow
    this.weapRightArrow;

    // Arcade Sprite of the Character
    this.accusedCharacter;

    // Arcade Sprite of the Weapon
    this.accusedWeapon;

    // Array of Suspects Images
    this.suspectsImgs;

    // Array of Weapons Images
    this.weaponsImgs;

    //-------------------------------------
    // Animated Dialogue Stuff
    //-------------------------------------

    this.eventCounter = 0;
    this.timedEvent;
    this.dialogueSpeed = 3;
  }

  //----------------------------
  // METHODS
  //----------------------------

  /**
   * Method that preloads the dialogues in the plugin
   */
  preloadDialogue()
  {
    currentScene.load.image('SDialogBack', 'assets/sprites/HUD/Dialogo.png');
    currentScene.load.image('MDialogBack', 'assets/sprites/HUD/SeleccionMultiple.png');
    currentScene.load.image('LeeDialogBack', 'assets/sprites/HUD/SeleccionLee.png');
    currentScene.load.image('ADialogBack', 'assets/sprites/HUD/AccuseDialogo.png');

    currentScene.load.image('nextBtn', 'assets/sprites/HUD/Siguiente.png');
    currentScene.load.image('closeBtn', 'assets/sprites/HUD/x.png');
    currentScene.load.image('ConfrontBtn', 'assets/sprites/HUD/BotonAcusar.png');

    currentScene.load.image('AssaAccuse', 'assets/sprites/HUD/Accuse/AssattariAccuse.png');
    currentScene.load.image('JungAccuse', 'assets/sprites/HUD/Accuse/JungAccuse.png');
    currentScene.load.image('LeeAccuse', 'assets/sprites/HUD/Accuse/LeeAccuse.png');
    currentScene.load.image('RuruAccuse', 'assets/sprites/HUD/Accuse/RuruAccuse.png');
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
    let xPositions = [170, 360, 550, 740];
    this.interactiveOptions = currentScene.add.container();

    for(let i = 0; i < 4; i++)
    {
      this.createTextOption(this.interactiveOptions, xPositions[i], 70, "Option "+i);
    }

    //---------------------------------
    // PARK DIALOG WINDOW
    //---------------------------------
    this.parkDialogueBackground = currentScene.physics.add.staticSprite(500, 100, 'LeeDialogBack');
    this.parkDialogueBackground.scrollFactorX = 0;
    this.parkDialogueBackground.visible = false;

    let xAc = [280, 650];
    this.parkOptions = currentScene.add.container();

    for(let i = 0; i < 2; i++)
    {
      let text;
      let yP;
      if(i==0)
      {
        text = "Check Body";
        yP = 60;
      }
      else
      {
        text = "Accuse of Murder";
        yP = 50;
      }
      this.createTextOption(this.parkOptions, xAc[i], yP, text);
    }    

    //---------------------------------
    // ACCUSE DIALOG WINDOW
    //---------------------------------
    this.acusationDialogueBackground = currentScene.physics.add.staticSprite(500, 100, 'ADialogBack');
    this.acusationDialogueBackground.scrollFactorX = 0;
    this.acusationDialogueBackground.visible = false;

    this.createTextOption(this.accusationButton, 720, 75, "ACCUSE!");
    
    this.charLeftArrow = currentScene.physics.add.staticSprite(180, 90, 'nextBtn'); 
    this.charLeftArrow.setFlip(true);
    this.createButtonBehaviour(this.charLeftArrow,'charLeftArrow');
    this.charLeftArrow.visible = false;

    this.charRightArrow = currentScene.physics.add.staticSprite(330, 90, 'nextBtn');  
    this.createButtonBehaviour(this.charRightArrow,'charRightArrow');
    this.charRightArrow.visible = false;

    this.weapLeftArrow = currentScene.physics.add.staticSprite(420, 90, 'nextBtn'); 
    this.weapLeftArrow.setFlip(true);
    this.createButtonBehaviour(this.weapLeftArrow,'weapLeftArrow');
    this.weapLeftArrow.visible = false;

    this.weapRightArrow = currentScene.physics.add.staticSprite(570, 90, 'nextBtn');  
    this.createButtonBehaviour(this.weapRightArrow,'weapRightArrow');
    this.weapRightArrow.visible = false;

    this.accusedCharacter = currentScene.physics.add.staticSprite(255, 90, 'AssaAccuse');
    this.accusedCharacter.scrollFactorX = 0;
    this.accusedCharacter.visible = false;
    this.accusedWeapon = currentScene.physics.add.staticSprite(495, 90, 'RuruAccuse');
    this.accusedWeapon.scrollFactorX = 0;
    this.accusedWeapon.visible = false;
    
    //---------------------------------
    // BUTTONS
    //---------------------------------

    this.nextButton = currentScene.physics.add.staticSprite(855, 130, 'nextBtn');
    this.nextButton.setScale(1.1);  
    this.createButtonBehaviour(this.nextButton,'nextBtn');

    this.backButton = currentScene.physics.add.staticSprite(145, 130, 'nextBtn'); 
    this.backButton.setFlip(true);
    this.backButton.setScale(1.1);  
    this.createButtonBehaviour(this.backButton,'backBtn');
    this.backButton.visible = false;

    //this.closeBtn = currentScene.physics.add.staticSprite(885, 30, 'closeBtn');  
    //this.createButtonBehaviour(this.closeBtn, 'closeBtn');

    this.confrontBtn = currentScene.physics.add.staticSprite(835,505, 'ConfrontBtn');  
    this.createButtonBehaviour(this.confrontBtn, 'ConfrontBtn');
    this.confrontBtn.visible = false;

    this.switchWindows(false);
    this.enableDialogueUI(false);
    
    //this.openParkOptions(false);
  }

  /**
   * Method that creates a text option in the dialogue
   * @param {*Array where we will add the current text Option} array 
   * @param {*X Position where the Text Option will be positioned} xPosition 
   * @param {*Y Position where the Text Option will be positioned} yPosition 
   * @param {*Name of the Text Option} optionName 
   */
  createTextOption(array, xPosition, yPosition, optionName)
  {
    let xOption = currentScene.add.text(xPosition, yPosition, optionName, { fontFamily: 'Asap', fontSize: 25 , color: '#f9e26e', align: 'center',
    wordWrap: {width: 90},
    wordWrapUseAdvanced: true
    });
    xOption.name = optionName;
    xOption.scrollFactorX = 0;
    
    xOption.setInteractive();
    xOption.on('pointerdown', function(){
      this.setScale(1.05);
    });
    xOption.on('pointerup', function(){
      this.setScale(1);
    });
    xOption.on('pointerup', () => this.selectOption(xOption));
    xOption.on('pointerout', function(){
      this.setScale(1);
    });

    if(array == undefined) 
    {
      this.accusationButton = xOption;
      this.accusationButton.visible = false;
    }
    else
    {
      array.add(xOption);
      array.visible = false;
    }
  }

  /**
   * Method that Enables or Disables the Window in the UI
   * @param {* Defines if the window is to be set on or off} newValue 
   */
  enableDialogueUI(newValue)
  {
    this.multipleOptionsState = 0;
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

    // We deactivate all the park and accusations options
    this.parkDialogueBackground.visible = false;
    this.parkOptions.visible = false;

    this.acusationDialogueBackground.visible = false;
    this.accusationButton.visible = false;
    this.charLeftArrow.visible = false;
    this.charRightArrow.visible = false;
    this.weapLeftArrow.visible = false;
    this.weapRightArrow.visible = false;
    this.accusedCharacter.visible = false;
    this.accusedWeapon.visible = false;

    // We activate/deactivate
    //this.closeBtn.visible = newValue;
    this.confrontBtn.visible = false;

    if(newValue == false)
    {
      this.backButton.visible = false;
      let timedEvent = currentScene.time.delayedCall(100, function(){
          GameManager.canMove = true;
      } , currentScene);
    }
  }

  /**
   * Method that enables the multiple options dialogue
   */
  enableMultiple()
  {
    let hasSuspects = playerNotebook.discoveredCharacters;
    let hasWeapons = playerNotebook.discoveredWeapons1;
    let hasWeapons2 = playerNotebook.discoveredWeapons2;
    if(hasSuspects || hasWeapons || hasWeapons2) // If we have disovered any clue we show that group of clues
    {
      let names = [];
      this.switchWindows(true);
      if(this.multipleOptionsState == 0)
      {
        this.backButton.visible = false;
        if(hasSuspects) names.push('Suspects');
        if(hasWeapons) names.push('Weapons I');
        if(hasWeapons2) names.push('Weapons II');
      }
      else
      {
        let array;
        if(this.currentClueTypeSelected == "Suspects") array = playerNotebook.characters;
        if(this.currentClueTypeSelected == "Weapons1") array = playerNotebook.weapons1;
        if(this.currentClueTypeSelected == "Weapons2") array = playerNotebook.weapons2;

        array.forEach(element => 
        {
          if((this.currentPersonTalkingTo.name != element.name) && element.discovered == true)
          {
            names.push(element.name);
          }
        });
        // We enable Back Button
        this.backButton.visible = true;
      }
      this.setOptionsTexts(names);
    }
    else
    {
      this.enableDialogueUI(false);
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

    // We deactivate all the park and accusations options
    this.parkDialogueBackground.visible = false;
    this.parkOptions.visible = false;

    this.acusationDialogueBackground.visible = false;
    this.accusationButton.visible = false;
    this.charLeftArrow.visible = false;
    this.charRightArrow.visible = false;
    this.weapLeftArrow.visible = false;
    this.weapRightArrow.visible = false;
    this.accusedCharacter.visible = false;
    this.accusedWeapon.visible = false;
  }

  /**
   * Method that opens the park accusation options
   * @param {*Defines if it is an accusation} isAccusation 
   */
  openParkOptions(isAccusation)
  {
    this.isEnabled = true;
    this.switchWindows(true);
    // We now activate/deactivate the multiple choice dialog elements
    this.multipleDialogueBackground.visible = false;
    this.interactiveOptions.visible = false;

    // We activate/deactivate the park and accusations options
    this.parkDialogueBackground.visible = !isAccusation;
    this.parkOptions.visible = !isAccusation;

    this.acusationDialogueBackground.visible = isAccusation;
    this.accusationButton.visible = isAccusation;
    this.charLeftArrow.visible = isAccusation;
    this.charRightArrow.visible = isAccusation;
    this.weapLeftArrow.visible = isAccusation;
    this.weapRightArrow.visible = isAccusation;
    this.accusedCharacter.visible = isAccusation;
    this.accusedWeapon.visible = isAccusation;

    if(isAccusation == true)
    {
      
    }
  }

  /**
   * Method that set the text for the different options
   */
  setOptionsTexts(texts)
  {
    for(let i = 0; i < 4; i++)
    {
      let text = texts[i];
      if(text == undefined)
      {
        this.interactiveOptions.getAt(i).visible = false;
      }
      else
      {
        this.interactiveOptions.getAt(i).visible = true;
        this.interactiveOptions.getAt(i).text = texts[i];
      }
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
      this.setScale(this.scaleX + 0.1, this.scaleY + 0.1);
    });
    theButton.on('pointerout', function()
    {
      this.setScale(this.scaleX - 0.1, this.scaleY - 0.1);
    });
    theButton.on('pointerup', function()
    {
      this.setScale(this.scaleX - 0.1, this.scaleY - 0.1);
    });

    switch(behaviour)
    {
      case "nextBtn":
        theButton.on('pointerdown', ()=> dialogueManager.checkNextAction());
      break;
      case "backBtn":
        theButton.on('pointerdown', ()=> this.selectOption("Back"));
      break;
      case "closeBtn":
        // We close the dialogue
        theButton.on('pointerdown', ()=> this.enableDialogueUI(false));
      break;
      case "ConfrontBtn":
        // We accuse the character who we are talking to
        
      break;
      case "charLeftArrow":

      break;
      case "charRightArrow":
          
      break;
      case "weapLeftArrow":

      break;
      case "weapRightArrow":

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

  /**
   * Method that selects an option from the multiple options dialogue
   */
  selectOption(theOption)
  {
    if(this.multipleOptionsState == 0)
    {
      if(theOption.text == "Check Body")
      {
        dialogueManager.startDialogue("SPark1xUN");
      }
      else if(theOption.text == "Accuse of Murder")
      {
        this.openParkOptions(true);
      }
      else
      {
        this.multipleOptionsState = 1;
        this.currentClueTypeSelected = theOption.text;
        this.enableMultiple(false);
      }
    }
    else
    {
      if(theOption == "Back")
      {
        this.multipleOptionsState = 0;
        this.currentClueTypeSelected = "";
        this.enableMultiple(false);
      }
      else
      {
        let dialogueID = playerNotebook.getCurrentDialogueID(this.currentPersonTalkingTo, theOption.text);
        dialogueManager.startDialogue(dialogueID);
        this.backButton.visible = false;
      }
    }
  }
}