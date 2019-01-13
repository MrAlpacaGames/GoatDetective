class DialogueManager
{
    constructor()
    {
        this.data;
        this.loadJson(function(response){
            var actual_JSON = JSON.parse(response);
        });
    }

    loadJson(callback)
    {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/Dialogues.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);  
    }

    preloadJson()
    {
        currentScene.load.json('dialogues', 'data/Dialogues.json');
    }

    createDialogues()
    {
        this.data = currentScene.cache.json.get('dialogues');

        
    }




}