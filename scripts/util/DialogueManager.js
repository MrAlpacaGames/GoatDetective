class DialogueManager
{
    constructor()
    {
        this.data;
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