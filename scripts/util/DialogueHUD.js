class DialogueHUD 
{
  constructor()
  {
    //------------------------------------------------------------------------------------------------
    //                                      SINGLE DIALOGUES
    //------------------------------------------------------------------------------------------------

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

    //-------------------------------------
    // Animated Dialogue Stuff
    //-------------------------------------

    this.eventCounter = 0;
    this.timedEvent;
    this.dialogueSpeed = 3;

    //------------------------------------------------------------------------------------------------
    //                                      MULTIPLE OPTIONS DIALOGUES
    //------------------------------------------------------------------------------------------------

    //---------------------------------------
    // 2 OPTIONS DIALOGUE
    //---------------------------------------
    // Dialogue Background used for Lee's Menu or when the player has only discovered 1 or 2 categories/items
    this.twoOptionsBack;
    
    // Text Options used for Lee's Menu or when the player has only discovered 1 or 2 categories/items
    this.twoTextOptions = [];

    //---------------------------------------
    // 3 OPTIONS DIALOGUE
    //---------------------------------------
    // Dialogue Background used for when the player has only discovered 3 categories/items
    this.threeOptionsBack;
        
    // Text Options used for when the player has only discovered 3 categories/items
    this.threeTextOptions

    //---------------------------------------
    // 4 OPTIONS DIALOGUE
    //---------------------------------------

    // Dialogue Background used for when the player has only discovered 4 items
    this.fourOptionsBack;
        
    // Text Options used for when the player has only discovered 4 items
    this.fourTextOptions

    //---------------------------------------
    // GLOBAL VARIABLES
    //--------------------------------------

    // State of the multiple options dialogue. It can only be 0 or 1
    this.multipleOptionsState = 0;

    // Current Type of Clue Selected
    this.currentClueTypeSelected;

    // Current Clue Selected
    this.currentClueTalkingTo;

    // Confront Button
    this.confrontBtn;

    // Defines if the Park's Menu has been opened
    this.parkOpened = false;

    //-------------------------------------
    // ACCUSATION OPTIONS DIALOGUE
    //-------------------------------------

    // Acusation Dialog Background
    this.acusationDialogueBack;

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

    // Array of Humans Images
    this.humansImgs = [];

    // Array of Weapons Images
    this.weaponsImgs = [];

    // Index for the human accused array
    this.accusedHumanIndex;

    // Index for the weapon accused array
    this.accusedWeaponIndex;

    // Array of indexes of the discovered humans
    this.discHIndexes;

    // Array of indexes of the discovered weapons
    this.discWIndexes;

    // Delay Flag used when the player changed of clue in the accusation dialogue
    this.canSwitchAccusedClue = true;
  }

  //----------------------------
  // METHODS
  //----------------------------

  /**
   * Method that preloads the dialogues in the plugin
   */
  preloadDialogue()
  {
    //                                      SINGLE DIALOGUES
    currentScene.load.image('SDialogBack', 'assets/sprites/HUD/Dialogue.png');
    //                                      2 OPTIONS DIALOGUES
    currentScene.load.image('2OptionsDialogue', 'assets/sprites/HUD/2Options.png');
    //                                      3 OPTIONS DIALOGUES
    currentScene.load.image('3OptionsDialogue', 'assets/sprites/HUD/3Options.png');
    //                                      4 OPTIONS DIALOGUES
    currentScene.load.image('4OptionsDialogue', 'assets/sprites/HUD/4Options.png');
    //                                      ACCUSE OPTION DIALOGUE
    currentScene.load.image('AccuseDialog', 'assets/sprites/HUD/Accuse/AccuseDialogue.png');
    currentScene.load.image('AssaAccuse', 'assets/sprites/HUD/Accuse/AssattariAccuse.png');
    currentScene.load.image('JungAccuse', 'assets/sprites/HUD/Accuse/JungAccuse.png');
    currentScene.load.image('LeeAccuse', 'assets/sprites/HUD/Accuse/LeeAccuse.png');
    currentScene.load.image('RuruAccuse', 'assets/sprites/HUD/Accuse/RuruAccuse.png');
    currentScene.load.image('ChickenAccuse', 'assets/sprites/Items/ChickenDiamondo.png');
    currentScene.load.image('PuddleAccuse', 'assets/sprites/Items/Puddle.png');
    currentScene.load.image('StandardAccuse', 'assets/sprites/Agenda/Items/StandardPin.png');
    currentScene.load.image('PoisonedAccuse', 'assets/sprites/Agenda/Items/PoisonedPin.png');

    
    currentScene.load.image('nextBtn', 'assets/sprites/HUD/Siguiente.png');
    currentScene.load.image('ConfrontBtn', 'assets/sprites/HUD/ConfrontButton.png');
  }
  
  /**
   * Method that creates the dialogue Window in the UI
   */
  createDialogueWindow()
  {
    //------------------------------------------------------------------------------------------------
    //                                      SINGLE DIALOGUES
    //------------------------------------------------------------------------------------------------

    // We create the static dialogue window
    this.singleDialogueBackground = currentScene.physics.add.staticSprite(500, 100, 'SDialogBack');
    this.singleDialogueBackground.scrollFactorX = 0;

    this.characterName = currentScene.add.text(140, 60, "", { fontFamily: 'Asap-Bold', fontSize: 20 , color: '#f9e26e', align: 'right',
    wordWrap: {width: 110},
    wordWrapUseAdvanced: true
    });
    this.characterName.scrollFactorX = 0;

    // We create the static text
    this.dialogueText = currentScene.add.text(300, 45, "", { fontFamily: 'Asap', fontSize: 25 , color: '#f9e26e', align: 'left',
    wordWrap: {width: 530},
    wordWrapUseAdvanced: true
    });
    this.dialogueText.scrollFactorX = 0; 

    //------------------------------------------------------------------------------------------------
    //                                      MULTIPLE OPTIONS DIALOGUES
    //------------------------------------------------------------------------------------------------

    //---------------------------------------
    // 2 OPTIONS DIALOGUE
    //---------------------------------------
    this.twoOptionsBack = currentScene.physics.add.staticSprite(500, 100, '2OptionsDialogue');    
    this.twoOptionsBack.scrollFactorX = 0;
    
    // Array of positions
    let twoPositions = [280, 650];
    this.twoTextOptions = currentScene.add.container();
    this.createMultipleOptionsButtons(2, twoPositions, this.twoTextOptions);

    //---------------------------------------
    // 3 OPTIONS DIALOGUE
    //---------------------------------------
    this.threeOptionsBack = currentScene.physics.add.staticSprite(502, 102, '3OptionsDialogue');    
    this.threeOptionsBack.scrollFactorX = 0;
    
    // Array of positions
    let threePositions = [220, 475, 720];
    this.threeTextOptions = currentScene.add.container();
    this.createMultipleOptionsButtons(3, threePositions, this.threeTextOptions);

    //---------------------------------------
    // 4 OPTIONS DIALOGUE
    //---------------------------------------
    this.fourOptionsBack = currentScene.physics.add.staticSprite(503, 100, '4OptionsDialogue');    
    this.fourOptionsBack.scrollFactorX = 0;
    
    // Array of positions
    let fourPositions = [175, 365, 555, 745];
    this.fourTextOptions = currentScene.add.container();
    this.createMultipleOptionsButtons(4, fourPositions, this.fourTextOptions);

    //------------------------------------------------------------------------------------------------
    //                                      ACCUSE DIALOG WINDOW
    //------------------------------------------------------------------------------------------------
    this.acusationDialogueBack = currentScene.physics.add.staticSprite(500, 100, 'AccuseDialog');
    this.acusationDialogueBack.scrollFactorX = 0;
    //this.acusationDialogueBack.visible = false;

    this.createTextOption(this.accusationButton, 720, 75, "ACCUSE!");
    
    this.charLeftArrow = currentScene.physics.add.staticSprite(180, 90, 'nextBtn'); 
    this.charLeftArrow.setFlip(true);
    this.createButtonBehaviour(this.charLeftArrow,'charLeftArrow');
    //this.charLeftArrow.visible = false;

    this.charRightArrow = currentScene.physics.add.staticSprite(330, 90, 'nextBtn');  
    this.createButtonBehaviour(this.charRightArrow,'charRightArrow');
    //this.charRightArrow.visible = false;

    this.weapLeftArrow = currentScene.physics.add.staticSprite(420, 90, 'nextBtn'); 
    this.weapLeftArrow.setFlip(true);
    this.createButtonBehaviour(this.weapLeftArrow,'weapLeftArrow');
    //this.weapLeftArrow.visible = false;

    this.weapRightArrow = currentScene.physics.add.staticSprite(570, 90, 'nextBtn');  
    this.createButtonBehaviour(this.weapRightArrow,'weapRightArrow');
    //this.weapRightArrow.visible = false;

    // Humans
    let AccuChar = currentScene.physics.add.staticSprite(255, 90, 'JungAccuse');
    AccuChar.scrollFactorX = 0;
    AccuChar.visible = false;
    this.humansImgs.push(AccuChar);
    AccuChar = currentScene.physics.add.staticSprite(255, 90, 'LeeAccuse');
    AccuChar.scrollFactorX = 0;
    AccuChar.visible = false;
    this.humansImgs.push(AccuChar);
    AccuChar = currentScene.physics.add.staticSprite(255, 90, 'AssaAccuse');
    AccuChar.scrollFactorX = 0;
    AccuChar.visible = false;
    this.humansImgs.push(AccuChar);
    AccuChar = currentScene.physics.add.staticSprite(255, 90, 'RuruAccuse');
    AccuChar.scrollFactorX = 0;
    AccuChar.visible = false;
    this.humansImgs.push(AccuChar);

    this.accusedCharacter = this.humansImgs[2];
    this.accusedCharacter.visible = false;

    // Weapons
    let AccuWeapons = currentScene.physics.add.staticSprite(495, 90, 'PuddleAccuse');
    AccuWeapons.scrollFactorX = 0;
    AccuWeapons.setScale(0.1);
    AccuWeapons.visible = false;
    this.weaponsImgs.push(AccuWeapons);  
    AccuWeapons = currentScene.physics.add.staticSprite(495, 90, 'ChickenAccuse');
    AccuWeapons.scrollFactorX = 0;
    AccuWeapons.setScale(0.15);
    AccuWeapons.visible = false;
    this.weaponsImgs.push(AccuWeapons);
    AccuWeapons = currentScene.physics.add.staticSprite(495, 90, 'StandardAccuse');
    AccuWeapons.scrollFactorX = 0;
    AccuWeapons.setScale(0.1);
    AccuWeapons.visible = false;
    this.weaponsImgs.push(AccuWeapons);
    AccuWeapons = currentScene.physics.add.staticSprite(495, 90, 'PoisonedAccuse');
    AccuWeapons.scrollFactorX = 0;
    AccuWeapons.setScale(0.2);
    AccuWeapons.visible = false;
    this.weaponsImgs.push(AccuWeapons);

    this.accusedWeapon = this.weaponsImgs[2];
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

    this.confrontBtn = currentScene.physics.add.staticSprite(835,505, 'ConfrontBtn');  
    this.createButtonBehaviour(this.confrontBtn, 'ConfrontBtn');
    this.confrontBtn.visible = false;

    //---------------------------------
    // INITIAL VALUES
    //---------------------------------
    this.enableSingleDialogue(false);
    this.enableMultipleOptions(2, false);
    this.enableMultipleOptions(3, false);
    this.enableMultipleOptions(4, false);

    this.enableAccuseDialogue(false);
  }

  //------------------------------------------------------------------------------------------------
  //                                      CREATION FUNCTIONS
  //------------------------------------------------------------------------------------------------
  /**
   * Method that creates Multiple Options Buttons
   * @param {*Number of buttons to be created} numberOfButtons 
   * @param {*Array of positions of the buttons in X} positionsArray 
   * @param {*Container of the text options} optionsArray 
   */
  createMultipleOptionsButtons(numberOfButtons, positionsArray, optionsArray)
  {
    let yPos;
    (numberOfButtons == 2) ? yPos = 70 : yPos = 75;
    for(let i = 0; i < numberOfButtons; i++)
    { 
      this.createTextOption(optionsArray, positionsArray[i], yPos, "OPTION "+i);
    }
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
    let xOption = currentScene.add.text(xPosition, yPosition, optionName, { fontFamily: 'Asap-Bold', fontSize: 20 , color: '#f9e26e', align: 'center',
    wordWrap: {width: 110},
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

    if(optionName == "ACCUSE!")
    {
      this.accusationButton = xOption;
    }
    else
    {
      array.add(xOption);
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
      case "backBtn":
        theButton.on('pointerdown', ()=> this.selectOption("Back"));
      break;
      case "closeBtn":
        // We close the dialogue
        theButton.on('pointerdown', ()=> this.enableDialogueUI(false));
      break;
      case "ConfrontBtn":
        // We accuse the character who we are talking to
        theButton.on('pointerdown', ()=> currentPlayerHUD.startConfrontation(this.currentClueTalkingTo));
      break;
      case "charLeftArrow":
        theButton.on('pointerdown', ()=> this.changeAccusedClue("Humans", -1));
      break;
      case "charRightArrow":
        theButton.on('pointerdown', ()=> this.changeAccusedClue("Humans", 1));
      break;
      case "weapLeftArrow":
        theButton.on('pointerdown', ()=> this.changeAccusedClue("Weapons", -1));
      break;
      case "weapRightArrow":
        theButton.on('pointerdown', ()=> this.changeAccusedClue("Weapons", 1));
      break;
    }
  }

  //------------------------------------------------------------------------------------------------
  //                                      SET FUNCTIONS
  //------------------------------------------------------------------------------------------------

  /**
   * Method that set the text for the different options
   */
  setOptionsTexts(optionsArray, texts, isClueOption)
  {
    //let optionsArray;
    //(this.multipleOptionsState == 0) ? optionsArray = this.categoriesOptions : optionsArray = this.interactiveOptions;
    for(let i = 0; i < optionsArray.length; i++)
    {
      let text = texts[i];
      let optionsTemp = optionsArray.getAt(i);
      if(text == undefined)
      {
        optionsTemp.visible = false;
      }
      else
      {
        (isClueOption == true) ? text = texts[i].name: text = texts[i];
        optionsTemp.visible = true;        
        (isClueOption == true) ? optionsTemp.text = texts[i].fullName : optionsTemp.text = text;
        if(isClueOption) optionsTemp.name = texts[i].name;
      }
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

  //------------------------------------------------------------------------------------------------
  //                                      ENABLE/DISABLE FUNCTIONS
  //------------------------------------------------------------------------------------------------

  /**
   * Function that Enables/Disables the single dialogue UI elements
   * @param {*Defines if we enable or disable this dialogue} newValue 
   */
  enableSingleDialogue(newValue)
  {
    this.singleDialogueBackground.visible = newValue;
    this.characterName.visible = newValue;
    this.dialogueText.visible = newValue;

    this.nextButton.visible = newValue;
  }

  /**
   * Enables/Disables one of the Multiple Options Dialogues
   * @param {*Number of the multiple options we will play with.} numberOfOptions 
   * @param {*Defines if we enable or disable this dialogue} newValue 
   */
  enableMultipleOptions(numberOfOptions, newValue)
  {
    switch(numberOfOptions)
    {
      case 2:
        this.twoOptionsBack.visible = newValue;
        this.twoTextOptions.visible = newValue;
      break;
      case 3:
        this.threeOptionsBack.visible = newValue;
        this.threeTextOptions.visible = newValue;
      break;
      case 4:
        this.fourOptionsBack.visible = newValue;
        this.fourTextOptions.visible = newValue;
      break;
    }
  }

  /**
   * We enable/disable the Accuse Dialogue
   * @param {*New Value for the accuse dialogue} newValue 
   */
  enableAccuseDialogue(newValue)
  {
    this.acusationDialogueBack.visible = newValue;
    this.accusationButton.visible = newValue;
    this.charLeftArrow.visible = newValue;
    this.charRightArrow.visible = newValue;
    this.weapLeftArrow.visible = newValue;
    this.weapRightArrow.visible = newValue;
    this.accusedCharacter.visible = newValue;
    this.accusedWeapon.visible = newValue;


    this.accusedCharacter.visible = newValue;
    this.accusedWeapon.visible = newValue;
  } 

  /**
   * Method that Enables or Disables the Window in the UI
   * @param {* Defines if the window is to be set on or off} newValue 
   */
  enableDialogueUI(newValue)
  {
    this.isEnabled = newValue;
    this.enableSingleDialogue(newValue);
    this.enableMultipleOptions(2, false);
    this.enableMultipleOptions(3, false);
    this.enableMultipleOptions(4, false);

    this.enableAccuseDialogue(false);   

    // We activate/deactivate the confront button
    this.confrontBtn.visible = false;

    if(newValue == false)
    {
      this.backButton.visible = false;
      this.parkOpened = false;
      let timedEvent = currentScene.time.delayedCall(100, function(){
          GameManager.canMove = true;
      } , currentScene);
    }
  }

  /**
   * Method that opens the park accusation options
   * @param {*Defines if it is an accusation} isAccusation 
   */
  openParkOptions(isAccusation)
  {
    this.isEnabled = true;
    this.parkOpened = true;
    if(isAccusation == false)
    {
      this.multipleOptionsState = 0;
      this.enableSingleDialogue(false);
      this.enableMultipleOptions(2, true);
      this.enableMultipleOptions(3, false);
      this.enableMultipleOptions(4, false);
      this.enableAccuseDialogue(false);
      let texts = ["CHECK BODY"];
      if(playerNotebook.discoveredCharacters && playerNotebook.discoveredWeapons && playerNotebook.parkDiscovered)
      {
        texts.push("ACCUSE OF MURDER");
      }
      this.setOptionsTexts(this.twoTextOptions, texts, false);

      this.backButton.visible = false;
    }
    else
    {
      this.multipleOptionsState = 1;
      this.enableMultipleOptions(2, false);
      this.enableAccuseDialogue(true);
      this.backButton.visible = true;
      this.accusedCharacter.visible = false;
      this.accusedWeapon.visible = false;
      // We set the first available items in the accusation buttons
      this.discHIndexes = playerNotebook.getDiscoveredClues("Humans");
      this.discWIndexes = playerNotebook.getDiscoveredClues("Weapons");

      this.accusedHumanIndex = this.discHIndexes[0];
      this.accusedWeaponIndex = this.discWIndexes[0];

      this.accusedCharacter = this.humansImgs[this.accusedHumanIndex];
      this.accusedCharacter.visible = true;
      this.accusedWeapon = this.weaponsImgs[this.accusedWeaponIndex];
      this.accusedWeapon.visible = true;
    }
  }

  /**
   * Method that enables the multiple options dialogue
   */
  enableMultiple()
  {
    this.enableSingleDialogue(false);
    this.enableMultipleOptions(2, false);
    this.enableMultipleOptions(3, false);
    this.enableMultipleOptions(4, false);

    this.enableAccuseDialogue(false);   
    let hasSuspects = playerNotebook.discoveredCharacters;
    let hasWeapons = playerNotebook.discoveredWeapons;
    let hasItems = playerNotebook.discoveredItems;
    if(hasSuspects || hasWeapons || hasItems) // If we have disovered any clue we show that group of clues
    {
      if(hasSuspects && this.currentClueTalkingTo.clueType == "Humans" && this.currentClueTalkingTo.hasBeenConfronted == false)
      {
        let meetsRequirements = playerNotebook.checkIfMeetRequirements(this.currentClueTalkingTo);
        if(meetsRequirements == true)
        {
          this.confrontBtn.visible = true;
        }
      }
      let optionsTexts = [];
      if(this.multipleOptionsState == 0) // This means we are in the categories menu
      {
        this.backButton.visible = false;
        if(hasSuspects) optionsTexts.push('HUMANS');
        if(hasWeapons) optionsTexts.push('WEAPONS');
        if(hasItems) optionsTexts.push('ITEMS');

      }
      else
      {
        let array;
        if(this.currentClueTypeSelected == "HUMANS") array = playerNotebook.humans;
        if(this.currentClueTypeSelected == "WEAPONS") array = playerNotebook.weapons;
        if(this.currentClueTypeSelected == "ITEMS") array = playerNotebook.items;

        array.forEach(element => 
        {
          if((this.currentClueTalkingTo.name != element.name) && element.discovered == true && element.name != "Key")
          {
            optionsTexts.push(element);
          }
        });
        // We enable Back Button
        this.backButton.visible = true;
      }
      let optionsNumber;  
      let textOptionsArray;     
      let isClueOption;
      (this.multipleOptionsState == 0) ? isClueOption = false : isClueOption = true;
      if(optionsTexts.length <= 2)
      {
        optionsNumber = 2;
        textOptionsArray = this.twoTextOptions;
      }
      else if(optionsTexts.length == 3)
      {
        optionsNumber = 3;
        textOptionsArray = this.threeTextOptions;
      }
      else
      {
        optionsNumber = 4;
        textOptionsArray = this.fourTextOptions;
      }
      this.enableMultipleOptions(optionsNumber, true);
      this.setOptionsTexts(textOptionsArray, optionsTexts, isClueOption);
    }
    else
    {
      this.enableDialogueUI(false);
    }
  }

  //------------------------------------------------------------------------------------------------
  //                                      INTERACTION FUNCTIONS
  //------------------------------------------------------------------------------------------------

  /**
   * Method that selects an option from the multiple options dialogue
   */
  selectOption(theOption)
  {
    if(this.multipleOptionsState == 0)
    {
      if(theOption.text == "CHECK BODY")
      {
        this.enableMultipleOptions(2, false);
        dialogueManager.startDialogue("SPark1xUN");
      }
      else if(theOption.text == "ACCUSE OF MURDER")
      {
        this.openParkOptions(true);
      }
      else
      {
        this.multipleOptionsState = 1;
        this.currentClueTypeSelected = theOption.text;
        this.enableMultiple();
      }
    }
    else
    {
      if(theOption == "Back")
      {
        this.multipleOptionsState = 0;
        this.currentClueTypeSelected = "";
        if(this.parkOpened == true)
        {
          this.openParkOptions(false);
        }
        else
        {
          this.enableMultiple();
        }
      }
      else if(theOption.text == "ACCUSE!")
      {
        let accusedHuman = playerNotebook.humans[this.accusedHumanIndex+1];
        let accusedWeapon = playerNotebook.weapons[this.accusedWeaponIndex];
        GameManager.solveGame(accusedHuman.name, accusedWeapon.name);
      }
      else
      {
        let dialogueID = playerNotebook.getCurrentDialogueID(this.currentClueTalkingTo, theOption.name);
        dialogueManager.startDialogue(dialogueID);
        this.backButton.visible = false;
      }
    }
  }

  /**
   * Function that changes the image of the accused human and weapons
   * @param {*If tells if the accused item to change is an human or a weapon} clueType 
   * @param {*Can be 1 to the right or -1 to the left} direction 
   */
  changeAccusedClue(clueType, direction)
  {
    if(this.canSwitchAccusedClue)
    {
      let array;
      let tempIndex;
      let accusedImg;
      if(clueType == "Humans")
      {
        if(direction == 1)
        {
          this.accusedHumanIndex++;
          if(this.accusedHumanIndex == this.humansImgs.length)
          {
            this.accusedHumanIndex = 0;
          }
        }
        else
        {
          this.accusedHumanIndex--;
          if(this.accusedHumanIndex < 0)
          {
            this.accusedHumanIndex = this.humansImgs.length-1;
          }
        }
        this.accusedCharacter.visible = false;
        this.accusedCharacter = this.humansImgs[this.accusedHumanIndex];
        this.accusedCharacter.visible = true; 
      }
      else
      {
        if(direction == 1)
        {
          this.accusedWeaponIndex++;
          if(this.accusedWeaponIndex == this.weaponsImgs.length)
          {
            this.accusedWeaponIndex = 0;
          }
        }
        else
        {
          this.accusedWeaponIndex--;
          if(this.accusedWeaponIndex < 0)
          {
            this.accusedWeaponIndex = this.weaponsImgs.length-1;
          }
        }
        this.accusedWeapon.visible = false;
        this.accusedWeapon = this.weaponsImgs[this.accusedWeaponIndex];
        this.accusedWeapon.visible = true; 
      }
      this.canSwitchAccusedClue = false;
      let timedEvent = currentScene.time.delayedCall(150, function(){
        currentDialogueHUD.canSwitchAccusedClue = true;
      }, currentScene);
    }
  }

}