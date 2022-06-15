var test = [];
const queryType = 
{
    id: 0,
    area : 1
};

class Query 
{
    constructor(queryData)
    {
        this.objectIds = [];
        this.foundId = false;
        this.qData = queryData;
    }
}

class QuadTree 
{
    constructor(x, y, width, height, capacity, colour)
    {

        this.boundary = new GameObject(x, y, new RectangleHB(width, height));
        this.capacity = capacity;
        this.objectIds = [];
        this.divided = false;
        this.children = [];
        this.colour = colour ?? "#000";
    }

    subdivide() 
    {
        if(this.divided)
            return;

        let x = this.boundary.position.x;
        let y = this.boundary.position.y;
        let w = this.boundary.hitBox.width / 2;
        let h = this.boundary.hitBox.height / 2;
    
        //nw
        this.children.push(new QuadTree(x, y, w, h, this.capacity, this.colour));
        //ne
        this.children.push(new QuadTree(x + w, y, w, h, this.capacity, this.colour));
        //sw
        this.children.push(new QuadTree(x , y + h, w, h, this.capacity, this.colour));
        //se
        this.children.push(new QuadTree(x + w, y + h, w, h, this.capacity, this.colour));
    
        this.divided = true;

        // Reallocate my objects to children.
        for(var i = 0; i <= this.objectIds.length; i++)
        {
            var actor = ActorObjects.get(this.objectIds[i]);
            this.children[0].insert(actor);
            this.children[1].insert(actor);
            this.children[2].insert(actor);
            this.children[3].insert(actor);
        }

        this.objectIds = [];
    }

    insert(object)
    {
        if(object == null)
        {
            return false;
        }
        else if(!this.boundary.hasCollided(object))
        {
            return false;
        }        
        else if(this.divided)
        {
            // Insert into my children.
            for(let i = 0; i <= 3; i++)
            {
                this.children[i].insert(object);
            }      
            return true;
        }
        else if(this.objectIds.length >= this.capacity)
        {
            this.objectIds.push(object.id);

            this.subdivide();
            return true;
        }
        else
        {
            this.objectIds.push(object.id);
            return true;
        }
    }

    insertMany(objects, debugPoint)
    {
        for (let i = 0; i < objects.length; i++)
        {
            this.insert(objects[i], debugPoint);
        }
    }

    query(query, queryData)
    {
        if(query == null)
        {
            query = new Query(queryData);
        }
        switch(queryData.type)
        {
            case queryType.id:
                return this.queryId(query);
            case queryType.area:
                return this.queryArea(query);
            default:
                throw "No query method for queryData.Type " + queryData.type;
        }
    }

    queryId(query)
    {
        if(query.qData.actor == undefined)
        {        
            query.qData.actor = ActorObjects.get(query.qData.id);
        }
        if(!query.qData.actor.hasCollided(this.boundary))
        {
            return query;
        }
        if(!this.divided)
        {
            query.foundId = true;

            for(let i = 0; i < this.objectIds.length; i++)
            {
                if(query.qData.id != this.objectIds[i])
                {
                    query.objectIds.push(this.objectIds[i]);
                }
            }
            return query;
        }

        for(let i = 0; i <= 3; i++)
        {
            query = this.queryChild(this.children[i], query);
        }
        return query;
    }

    queryArea(query)
    {
        if(!this.boundary.hasCollided(query.qData.area))
        {
            return query;
        }
        if(!this.divided)
        {
            query = query.objectIds.concat(this.objectIds);
            return query;
        }
        for(let i = 0; i <= 3; i++)
        {
            query = this.queryChild(this.children[i], query);
        }
        return query;
    }


    queryChild(child, query)
    {
        let q = child.query(query, query.qData);
        if(q.collided)
        {
            query.objectIds = query.objectIds.concat(q.objectIds);
        }
        return query;
    }


    clear()
    {
        if(this.divided)
        {
            for(let i = 0; i <= 3; i++)
            {
                this.children[i].clear();
            }            
            this.children = [];
        }
    }

    render(context)
    {     
        context.beginPath();
        context.strokeStyle  = this.colour;
        context.strokeRect(this.boundary.position.x, this.boundary.position.y, this.boundary.hitBox.width, this.boundary.hitBox.height);
        context.fill();
        
        if(this.divided)
        {
            for(let i = 0; i <= 3; i++)
            {
                this.children[i].render(context);
            }            
        }
    }
}
