class LoadingScreen
{
    constructor()
    {

    }

    createLoadingScreen()
    {
        globalLockdown = true;

        let loadBack = currentScene.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'Fondo');        
        var progressBar = currentScene.add.graphics();
        let progressBox = currentScene.add.image(topBackgroundXOrigin+330, topBackgroundYOrigin+180, 'Loading');

        currentScene.load.on('progress', function(value){
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xD74C4C, 1);
            progressBar.fillRect(topBackgroundXOrigin+245, topBackgroundYOrigin+182, 165 * value, 24);
        });
         
        currentScene.load.on('complete', function () {
            //console.log('complete');
            loadBack.destroy();
            progressBar.destroy();
            progressBox.destroy();  
            globalLockdown = false;
        });
    }
}