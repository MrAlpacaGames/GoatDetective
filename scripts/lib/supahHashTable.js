class HashTable
{
    constructor()
    {
        this.table = [];
        this.tableLimit = 1000;
    }

    add(key, value)
    {
        let index = this.hashFunction(key);
        if(this.table[index] === undefined)
        {
            this.table[index] = [[key, value]];
        }
        else
        {
            let inserted = false;
            for(let i = 0; i < this.table[index].length; i++)
            {
                if(this.table[index][i][0] === key)
                {
                    this.table[index][i][1] = value;
                    inserted = true;
                }
            }
            if(inserted === false)
            {
                this.table[index].push([key, value]);
            }
        }
    }

    remove(key)
    {
        let index = this.hashFunction(key);
        if(this.table[index].length === 1 && this.table[index][0][0] === key)
        {
            delete this.table[index];
        }
        else
        {
            for(let i = 0; i < this.table[index].length; i++)
            {
                if(this.table[index][i][0] === key)
                {
                    delete this.table[index][i];
                }
            }
        }
    }

    get(key)
    {
        let index = this.hashFunction(key);
        if(this.table[index] === undefined)
        {
            return undefined;
        }
        else
        {
            for(let i = 0; i < this.table[index].length; i++)
            {
                if(this.table[index][i][0] === key)
                {
                    return this.table[index][i][1];
                }
            }
        }
    }

    hashFunction(key)
    {
        let hash = 0;
        if(key.length == 0) return hash;
        for(let i = 0; i < key.length; i++)
        {
            hash += key.charCodeAt(i);
            /** 
            hash = (hash<<5) - hash;
            hash = hash + key.charCodeAt(i);
            hash = hash & hash;
            */
        }
        return hash % this.tableLimit;
    }
}