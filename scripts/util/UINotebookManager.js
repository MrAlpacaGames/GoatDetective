class UINotebookManager
{
    constructor()
    {
        //-------------------------
        // Attributes
        //-------------------------
        // Humans UI Elements
        this.humansWindow;
        this.BWHumans = [];
        this.ColorHumans = [];

        // Places UI Elements
        this.placesWindow;
        this.BWPlaces = [];
        this.ColorPlaces = [];

        // Weapons UI Elements
        this.weaponsWindow;  
        this.BWWeapons = [];
        this.ColorWeapons = [];

        // Items UI Elements
        this.itemsWindow;
        this.BWItems = [];
        this.ColorItems = [];
        
        // Text
        this.noteTitle;
        this.noteBookText;

        // Array of current clues
        this.currentClues;
    }

    preload()
    {
        loadingScreen.createLoadingScreen();
        // Humans UI Elements
        currentScene.load.image('Humans', 'assets/sprites/Agenda/Humans.png');
        currentScene.load.image('RuruNB', 'assets/sprites/Agenda/Humans/Ruru.png');
        currentScene.load.image('RuruBlackWhite', 'assets/sprites/Agenda/Humans/RuruBN.png');
        currentScene.load.image('AssattariNB', 'assets/sprites/Agenda/Humans/Assattari.png');
        currentScene.load.image('AssattariBlackWhite', 'assets/sprites/Agenda/Humans/AssattariBN.png');
        currentScene.load.image('ParkNB', 'assets/sprites/Agenda/Humans/Park.png');
        currentScene.load.image('ParkBlackWhite', 'assets/sprites/Agenda/Humans/ParkBN.png');
        currentScene.load.image('LeeNB', 'assets/sprites/Agenda/Humans/Lee.png');
        currentScene.load.image('LeeBlackWhite', 'assets/sprites/Agenda/Humans/LeeBN.png');
        currentScene.load.image('JungNB', 'assets/sprites/Agenda/Humans/Jung.png');
        currentScene.load.image('JungBlackWhite', 'assets/sprites/Agenda/Humans/JungBN.png');

        // Places UI Elements
        currentScene.load.image('Places', 'assets/sprites/Agenda/Places.png');
        currentScene.load.image('HallNB', 'assets/sprites/Agenda/Places/MiniHall.png');
        currentScene.load.image('HallBlackWhite', 'assets/sprites/Agenda/Places/MiniHallBN.png');
        currentScene.load.image('OfficeNB', 'assets/sprites/Agenda/Places/MiniOffice.png');
        currentScene.load.image('OfficeBlackWhite', 'assets/sprites/Agenda/Places/MiniOfficeBN.png');
        currentScene.load.image('StudioNB', 'assets/sprites/Agenda/Places/MiniStudio.png');
        currentScene.load.image('StudioBlackWhite', 'assets/sprites/Agenda/Places/MiniStudioBN.png');
        currentScene.load.image('DressroomNB', 'assets/sprites/Agenda/Places/MiniDressroom.png');
        currentScene.load.image('DressroomBlackWhite', 'assets/sprites/Agenda/Places/MiniDressroomBN.png');

        // Weapons UI Elements
        currentScene.load.image('Weapons', 'assets/sprites/Agenda/Weapons.png');
        currentScene.load.image('PuddleNB', 'assets/sprites/Agenda/Items/SweatyPuddle.png');
        currentScene.load.image('PuddleBlackWhite', 'assets/sprites/Agenda/Items/SweatyPuddleBN.png');
        currentScene.load.image('ChickenNB', 'assets/sprites/Agenda/Items/ChickenDiamando.png');
        currentScene.load.image('ChickenBlackWhite', 'assets/sprites/Agenda/Items/ChickenDiamandoBN.png');
        currentScene.load.image('StandardPinNB', 'assets/sprites/Agenda/Items/StandardPin.png');
        currentScene.load.image('StandardPinBlackWhite', 'assets/sprites/Agenda/Items/StandardPinBN.png');
        currentScene.load.image('PoisonedPinNB', 'assets/sprites/Agenda/Items/PoisonedPin.png');
        currentScene.load.image('PoisonedPinBlackWhite', 'assets/sprites/Agenda/Items/PoisonedPinBN.png');

        // Items UI Elements
        currentScene.load.image('Items', 'assets/sprites/Agenda/Items.png');
        currentScene.load.image('CellphoneNB', 'assets/sprites/Agenda/Items/ParkCellphone.png');
        currentScene.load.image('CellphoneBlackWhite', 'assets/sprites/Agenda/Items/ParkCellphoneBN.png');
        currentScene.load.image('LoveLetterNB', 'assets/sprites/Agenda/Items/RuruLoveLetter.png');
        currentScene.load.image('LoveLetterBlackWhite', 'assets/sprites/Agenda/Items/RuruLoveLetterBN.png');
        currentScene.load.image('StudioKeyNB', 'assets/sprites/Agenda/Items/StudioKey.png');
        currentScene.load.image('StudioKeyBlackWhite', 'assets/sprites/Agenda/Items/StudioKeyBN.png');
        currentScene.load.image('RecorderNB', 'assets/sprites/Agenda/Items/StudioRecorder.png');
        currentScene.load.image('RecorderBlackWhite', 'assets/sprites/Agenda/Items/StudioRecorderBN.png');

        // Buttons
        currentScene.load.image('Back', 'assets/sprites/Agenda/Back.png');
        // Music
        musicManager.preloadMusic();
    }

    create()
    {
        musicManager.createThemes();

        notebookOpened = true;
        //-------------------------
        // HUMANS
        //-------------------------
        // Humans UI Elements
        this.humansWindow = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Humans');

        // Black & White
        let BWChar;
        BWChar = currentScene.add.image(topBackgroundXOrigin-230, topBackgroundYOrigin+5, 'RuruBlackWhite');
        this.BWHumans.push(BWChar);
        BWChar = currentScene.add.image(topBackgroundXOrigin-100, topBackgroundYOrigin+5, 'AssattariBlackWhite');
        this.BWHumans.push(BWChar);
        BWChar = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'ParkBlackWhite');
        this.BWHumans.push(BWChar);
        BWChar = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'LeeBlackWhite');
        this.BWHumans.push(BWChar);
        BWChar = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'JungBlackWhite');
        this.BWHumans.push(BWChar);

        // Color
        let character;
        character = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'ParkNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('H', 0));
        character.visible = false;
        this.ColorHumans.push(character);

        character = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'JungNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('H', 1));
        character.visible = false;
        this.ColorHumans.push(character);

        character = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'LeeNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('H', 2));
        character.visible = false;
        this.ColorHumans.push(character);

        character = currentScene.add.image(topBackgroundXOrigin-100, topBackgroundYOrigin+5, 'AssattariNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('H', 3));
        character.visible = false;
        this.ColorHumans.push(character);

        character = currentScene.add.image(topBackgroundXOrigin-230, topBackgroundYOrigin+5, 'RuruNB');
        character.setInteractive();
        character.on('pointerdown', ()=> this.getClueInformation('H', 4));
        character.visible = false;
        this.ColorHumans.push(character);


        //-------------------------
        // PLACES
        //-------------------------
        // Places UI Elements
        this.placesWindow = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Places');
        this.placesWindow.visible = false;

        let BWPlace;
        BWPlace = currentScene.add.image(topBackgroundXOrigin-215, topBackgroundYOrigin+5, 'HallBlackWhite');
        BWPlace.setScale(0.5);
        this.BWPlaces.push(BWPlace);
        BWPlace = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'OfficeBlackWhite');
        BWPlace.setScale(0.5);
        this.BWPlaces.push(BWPlace);
        BWPlace = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'DressroomBlackWhite');
        BWPlace.setScale(0.5);
        this.BWPlaces.push(BWPlace);
        BWPlace = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'StudioBlackWhite');
        BWPlace.setScale(0.5);
        this.BWPlaces.push(BWPlace);

        let ColorPlace;
        ColorPlace = currentScene.add.image(topBackgroundXOrigin-215, topBackgroundYOrigin+5, 'HallNB');
        ColorPlace.setScale(0.5);
        ColorPlace.setInteractive();
        ColorPlace.on('pointerdown', ()=> this.getClueInformation('P', 0));
        ColorPlace.visible = false;
        this.ColorPlaces.push(ColorPlace);

        ColorPlace = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'OfficeNB');
        ColorPlace.setScale(0.5);
        ColorPlace.setInteractive();
        ColorPlace.on('pointerdown', ()=> this.getClueInformation('P', 1));
        ColorPlace.visible = false;
        this.ColorPlaces.push(ColorPlace);

        ColorPlace = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'DressroomNB');
        ColorPlace.setScale(0.5);
        ColorPlace.setInteractive();
        ColorPlace.on('pointerdown', ()=> this.getClueInformation('P', 2));
        ColorPlace.visible = false;
        this.ColorPlaces.push(ColorPlace);

        ColorPlace = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'StudioNB');
        ColorPlace.setScale(0.5);
        ColorPlace.setInteractive();
        ColorPlace.on('pointerdown', ()=> this.getClueInformation('P', 3));
        ColorPlace.visible = false;
        this.ColorPlaces.push(ColorPlace);

        //-------------------------
        // WEAPONS
        //-------------------------
        // Weapons UI Elements
        this.weaponsWindow = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Weapons');
        this.weaponsWindow.visible = false;

        let BWWeapon;
        BWWeapon = currentScene.add.image(topBackgroundXOrigin-215, topBackgroundYOrigin+5, 'PuddleBlackWhite');
        BWWeapon.setScale(0.5);
        this.BWWeapons.push(BWWeapon);
        BWWeapon = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'ChickenBlackWhite');
        BWWeapon.setScale(0.5);
        this.BWWeapons.push(BWWeapon);
        BWWeapon = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'StandardPinBlackWhite');
        BWWeapon.setScale(0.15);
        this.BWWeapons.push(BWWeapon);
        BWWeapon = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'PoisonedPinBlackWhite');
        BWWeapon.setScale(0.35);
        this.BWWeapons.push(BWWeapon);

        let ColorWeapon;
        ColorWeapon = currentScene.add.image(topBackgroundXOrigin-215, topBackgroundYOrigin+5, 'PuddleNB');
        ColorWeapon.setScale(0.5);
        ColorWeapon.setInteractive();
        ColorWeapon.on('pointerdown', ()=> this.getClueInformation('W', 0));
        ColorWeapon.visible = false;
        this.ColorWeapons.push(ColorWeapon);

        ColorWeapon = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'ChickenNB');
        ColorWeapon.setScale(0.5);
        ColorWeapon.setInteractive();
        ColorWeapon.on('pointerdown', ()=> this.getClueInformation('W', 1));
        ColorWeapon.visible = false;
        this.ColorWeapons.push(ColorWeapon);

        ColorWeapon = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'StandardPinNB');
        ColorWeapon.setScale(0.15);
        ColorWeapon.setInteractive();
        ColorWeapon.on('pointerdown', ()=> this.getClueInformation('W', 2));
        ColorWeapon.visible = false;
        this.ColorWeapons.push(ColorWeapon);

        ColorWeapon = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'PoisonedPinNB');
        ColorWeapon.setScale(0.35);
        ColorWeapon.setInteractive();
        ColorWeapon.on('pointerdown', ()=> this.getClueInformation('W', 3));
        ColorWeapon.visible = false;
        this.ColorWeapons.push(ColorWeapon);

        //-------------------------
        // ITEMS
        //-------------------------

        // Weapons UI Elements
        this.itemsWindow = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Items');
        this.itemsWindow.visible = false;

        let BWItem;
        BWItem = currentScene.add.image(topBackgroundXOrigin-215, topBackgroundYOrigin+5, 'StudioKeyBlackWhite');
        BWItem.setScale(0.12);
        this.BWItems.push(BWItem);
        BWItem = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'LoveLetterBlackWhite');
        BWItem.setScale(0.5);
        this.BWItems.push(BWItem);
        BWItem = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'RecorderBlackWhite');
        BWItem.setScale(0.8); 
        this.BWItems.push(BWItem);
        BWItem = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'CellphoneBlackWhite');
        BWItem.setScale(0.6); 
        this.BWItems.push(BWItem);

        let ColorItem;
        ColorItem = currentScene.add.image(topBackgroundXOrigin-215, topBackgroundYOrigin+5, 'StudioKeyNB');
        ColorItem.setScale(0.12);
        ColorItem.setInteractive();
        ColorItem.on('pointerdown', ()=> this.getClueInformation('I', 0));
        ColorItem.visible = false;
        this.ColorItems.push(ColorItem);

        ColorItem = currentScene.add.image(topBackgroundXOrigin+30, topBackgroundYOrigin+5, 'LoveLetterNB');
        ColorItem.setScale(0.5);
        ColorItem.setInteractive();
        ColorItem.on('pointerdown', ()=> this.getClueInformation('I', 1));
        ColorItem.visible = false;
        this.ColorItems.push(ColorItem);

        ColorItem = currentScene.add.image(topBackgroundXOrigin-170, topBackgroundYOrigin+135, 'RecorderNB');
        ColorItem.setScale(0.8); 
        ColorItem.setInteractive();
        ColorItem.on('pointerdown', ()=> this.getClueInformation('I', 2));
        ColorItem.visible = false;
        this.ColorItems.push(ColorItem);

        ColorItem = currentScene.add.image(topBackgroundXOrigin-30, topBackgroundYOrigin+135, 'CellphoneNB');
        ColorItem.setScale(0.6); 
        ColorItem.setInteractive();
        ColorItem.on('pointerdown', ()=> this.getClueInformation('I', 3));
        ColorItem.visible = false;
        this.ColorItems.push(ColorItem);


        //-------------------------
        // TEXTS
        //-------------------------
        // Text Title of the Note
        // Text Dialogue
        this.noteTitle = currentScene.add.text(topBackgroundXOrigin+130, topBackgroundYOrigin-140, "", 
        { fontFamily: 'Asap-Bold', fontSize: 25 , color: '#474747', align: 'left',
        wordWrap: {width: 280},
        wordWrapUseAdvanced: true
        });
        // Text of the Notes
        this.noteBookText = currentScene.add.text(topBackgroundXOrigin+130, topBackgroundYOrigin-100, "", 
        { fontFamily: 'Asap', fontSize: 21 , color: '#474747', align: 'left',
        wordWrap: {width: 346},
        wordWrapUseAdvanced: true
        });

        // Buttons
        let backBtn = currentScene.add.image(topBackgroundXOrigin-345, topBackgroundYOrigin+195, 'Back');
        backBtn.setInteractive();
        backBtn.on('pointerdown', ()=> openNotebook(false));
        
        currentScene.input.on('pointerdown', (function(pointer)
        {
            notebookSpriteManager.checkClickPosition(pointer);
        }));

        // Set initial state
        this.updateOnOpen();
    }
    
    
    checkClickPosition(pointer)
    {
        let x = pointer.downX;
        let y = pointer.downY;
        if((y > 4 && y < 83) && (x > 5 && x < 170))
        {
            this.setVisible("I", false);
            this.setVisible("W", false);
            this.setVisible("P", false);
            this.setVisible("H", true);
        }
        else if((y > 89 && y < 180) && (x > 5 && x < 170))
        {
            this.setVisible("I", false);
            this.setVisible("W", false);
            this.setVisible("H", false);
            this.setVisible("P", true);
        }
        else if((y > 188 && y < 285) && (x > 5 && x < 170))
        {
            this.setVisible("W", false);
            this.setVisible("P", false);
            this.setVisible("H", false);
            this.setVisible("I", true);
        }
        else if((y > 294 && y < 395) && (x > 5 && x < 170))
        {
            this.setVisible("I", false);
            this.setVisible("P", false);
            this.setVisible("H", false);
            this.setVisible("W", true);
        }
    }

    updateOnOpen()
    {
        musicManager.changeTheme('Notebook', false);
        // Set initial state
        this.setVisible("I", false);
        this.setVisible("W", false);
        this.setVisible("P", false);
        this.setVisible("H", true);
    }

    setVisible(Zone, NewValue)
    {
        if(NewValue == true) this.currentClues = playerNotebook.getInformation(Zone);
        let colorArray;
        let BWArray;
        switch(Zone)
        {
            case "H":
                // We set the value for the humans window
                this.humansWindow.visible = NewValue;
                colorArray = this.ColorHumans;
                BWArray = this.BWHumans;
                if(NewValue == true) this.setTitle("HUMANS");
                if(NewValue == true) this.setText("Here are the details of everyone involved in Park's death.");
            break; 
            case "P":
                // We set the value for the places window
                this.placesWindow.visible = NewValue;
                colorArray = this.ColorPlaces;
                BWArray = this.BWPlaces;
                if(NewValue == true) this.setTitle("PLACES");
                if(NewValue == true) this.setText("Here are the details of all the possible places where Park could have been killed.");
            break;  
            case "W":
                // We set the value for the weapons window
                this.weaponsWindow.visible = NewValue;
                colorArray = this.ColorWeapons;
                BWArray = this.BWWeapons;
                if(NewValue == true) this.setTitle("WEAPONS");
                if(NewValue == true) this.setText("Here are the details of all the possible weapons that could have been used to killed Park.");
            break;
            case "I":
                // We set the value for the items window
                this.itemsWindow.visible = NewValue;
                colorArray = this.ColorItems;
                BWArray = this.BWItems;
                if(NewValue == true) this.setTitle("ITEMS");
                if(NewValue == true) this.setText("Here are the details of all the possible items");
            break;
        }

        for(let i = 0; i < colorArray.length; i++)
        {
            let tempColor = colorArray[i];
            let tempBW = BWArray[i];
            let BWEnableValue;
            let ColorEnableValue = false;
            if(NewValue == true)
            {
                let clueTemp = this.currentClues[i];
                BWEnableValue = true;
                if(clueTemp.discovered == true)
                {
                    ColorEnableValue = true;
                }
            }
            else
            {
                BWEnableValue = false;
            }
            tempBW.visible = BWEnableValue;
            tempColor.visible = ColorEnableValue;
        }
    }

    getClueInformation(ClueType, ClueIndex)
    {
        let clue = playerNotebook.getClueByType(ClueType, ClueIndex);
        this.setTitle(clue.fullName.toUpperCase());
        this.setText(clue.noteBookNote);
    }

    setTitle(newTitle)
    {
        this.noteTitle.text = newTitle+":";
    }

    setText(newText)
    {
        this.noteBookText.text = newText;
    }

}