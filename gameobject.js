// Started as the particle class first defined in episode 8
const _items = [];
const ActorObjects = 
{
    add: item => _items.push(item),
    get: id => _items.find(d => d.id === id),
    getWithIndex: i => _items[i], 
    remove: id =>
    {
        var itemIndex = false;

        for(var i = 0; i < _items.length; i ++)
        {
            if(_items[i].id == id)
            {
                itemIndex = id;
                break;
            }
        }
        if(!itemIndex)
            return true;

            _items.splice(itemIndex, 1);
        return true;
    },
    find: id => _items.find(i => i.id == id),
    getIndex: id =>         
    {
        let itemIndex = -1;

        for(var i = 0; i < _items.length; i ++)
        {
            if(_items[i].id == id)
            {
                itemIndex = i;
                break;
            }
        }

        return itemIndex;
    },
    updateItem: (index, item) =>
    {
        _items[index] = item;
    },
    foreach: argument => _items.foreach(argument),
    addOrUpdateItem: item =>
    {
        let itemIndex = false;

        for(let i = 0; i < _items.length; i ++)
        {
            if(_items[i].id == item.id)
            {
                itemIndex = i;
                break;
            }
        }

        if(itemIndex === false)
        {
            _items.push(item);
        }
        else
        {
            _items[itemIndex] = item;
        }
    }
};

Object.freeze(ActorObjects);

class GameObject
{
    constructor(x, y, hitBox)
    {
        this.position = new Vector(x, y);
        this.hitBox = hitBox;
        this.id = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
        // Is set after the quadtree is created each frame.

    }
    
    angleTo(p2)
    {
        var dx = p2.position.x - this.position.x;
        var dy = p2.position.y - this.position.y;
        return Math.atan2(dy, dx);
    }

    distanceTo(p2)
    {
        var dx = p2.position.x - this.position.x;
        var dy = p2.position.y - this.position.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }
        
    // Currently only circle circle, rectangle rectangle and circle rectangle collisions have been implemented.
    // If either of the shapes are custom then customCollision method is expected to have been overridden with the collision code.
    hasCollided(gameObject2)
    {
        // All the collision functions are formatted like shapeShapeCollision, so we're gonna use that to guess the function.
        // If the function cannot be found than collisions for these shapes have been forgotten to be implemented.
        var fnstring = this.hitBox.shapeName + gameObject2.hitBox.shapeName.charAt(0).toUpperCase() + gameObject2.hitBox.shapeName.slice(1)  + "Collision";
        var fnparams = [this, gameObject2];
        
        // find object
        var fn = collision[fnstring];
        
        // is object a function?
        if (typeof fn === "function") 
        {
           return fn.apply(null, fnparams);
        }

        // See if there's a function for if the shapes are switched in the function name.

        fnstring = gameObject2.hitBox.shapeName + this.hitBox.shapeName.charAt(0).toUpperCase() + this.hitBox.shapeName.slice(1)  + "Collision";
        fn = collision[fnstring];
        fnparams = [gameObject2, this];

        if (typeof fn === "function") 
        {
           return fn.apply(null, fnparams);
        }

        // Custom shape handling
        if(this.shape == shape.custom)
        {
            return this.customCollision(gameObject2);
        }

        if(gameObject2.shape == shape.custom)
        {
            return gameObject2.customCollision(this);
        }

        throw "No collision detection code for the shapes " + this.shapeName + ", " + gameObject2.shapeName + "."
    }

    customCollision(gameObject2)
    {
        throw "Must override customCollision method if you set the HitBox shape to custom.";
    }
}

class Actor extends GameObject
{    
    constructor(x, y, speed, direction, grav, hitbox, colour)
    {
        super(x, y, hitbox)
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);

        this.gravity = new Vector(0, grav || 0);
        this.mass = 1;
        this.active = true;
        this.bounce = -1;
        this.friction = 1;
        this.colour = colour;
        if(colour == null) this.colour = "#000";
    }

    accelerate(acceleration)
    {
        if(acceleration.constructor.name != name)
        {
            throw "Argument for particle.accelerate() needs to derive from vector."
        }
        this.velocity = this.velocity.add(acceleration);
    }

    update()
    {
        this.velocity.multiplyBy(this.friction);
        this.position = this.position.add(this.velocity);
        this.velocity = this.velocity.add(this.gravity);
    }

    gravitateTo(p2)
    {
        var grav = new Vector(0, 0),
            dist = this.distanceTo(p2);
        
        grav.setLength(p2.mass / (dist * dist));
        grav.setAngle(this.angleTo(p2));

        this.velocity.addTo(grav);
    }
}


class Point extends Actor  
{    
    constructor(x, y, speed, direction, grav, colour)
    {
        super(x, y, speed, direction, grav, new HitBox(shape.point), colour);
    }
}

class Particle extends Actor  
{    
    constructor(x, y, speed, direction, radius, grav, colour)
    {
        super(x, y, speed, direction, grav, new CircleHB(radius), colour);
    }
}