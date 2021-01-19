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

class Quadtree 
{
    constructor(x, y, width, height, capacity)
    {

        this.boundary = new GameObject(x, y, new RectangleHB(width, height));
        this.capacity = capacity;
        this.objectIds = [];
        this.divided = false;
        this.children = [];
    }

    subdivide() 
    {
        let x = this.boundary.position.x;
        let y = this.boundary.position.y;
        let w = this.boundary.hitBox.w / 2;
        let h = this.boundary.hitBox.h / 2;
    
        let ne = new GameObject(x, y, new RectangleHB(w, h));
        this.children.push(new QuadTree(ne, this.capacity));

        let nw = new GameObject(x + w, y, new RectangleHB(w, h));
        this.children.push(new QuadTree(nw, this.capacity));

        let se = new GameObject(x, y + h, new RectangleHB(w, h));
        this.children.push(new QuadTree(se, this.capacity));

        let sw = new GameObject(x + w, y + h, new RectangleHB(w, h));
        this.children.push(new QuadTree(sw, this.capacity));
    
        this.divided = true;

        // Reallocate my objects to children.
        for(var i = 0; i <= this.objectIds.length; i++)
        {
            this.children[0].insert(this.objectIds[i]);
            this.children[1].insert(this.objectIds[i]);
            this.children[2].insert(this.objectIds[i]);
            this.children[3].insert(this.objectIds[i]);
        }

        this.objectIds = [];
    }

    insert(object)
    {
        if(!this.hasCollided(object))
        {
            return false;
        }        

        if(this.objectIds.length == this.capacity)
        {
            this.subdivide();
            return true;
        }

        this.objectIds.push(object.id);

        return true;
    }

    insertMany(objects)
    {
        for (let i = 0; i < objects.length; i++)
        {
            this.insert(objects[i]);
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
                return queryId(queryData.id, query);
            case queryType.area:
                return this.queryArea(queryData.area, query);
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

            for(let i = 0; i <= this.objectIds.length; i++)
            {
                if(query.qData.id != this.objectIds)
                {
                    query.objectIds.push(this.objectIds[i]);
                }
            }
            return query;
        }

        for(let i = 0; i <= 3; i++)
        {
            query = queryChild(this.children[i], query);
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
            query = queryChild(this.children[i], query);
        }
        return query;
    }


    queryChild(child, query)
    {
        let q = child.query(query.qData);
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
}