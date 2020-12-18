// Simple vector class first defined in episode 7 - vectors part 2
class Vector
{
    constructor(x, y)
    {
        this._x = x;
        this._y = y;
    }

    set x(value)
    {
        this._x = value;
    }

    get x()
    {
        return this._x;
    }

    set y(value)
    {
        this._y = value;
    }

    get y() 
    {
        return this._y;
    }

    setAngle(angle)
    {
        var length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    }

    getAngle()
    {
        return Math.atan2(this._y, this._x);
    }

    setLength(length)
    {
        var angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    }

    getLength()
    {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    add(v2)
    {
        if(v2.constructor.name != Vector.name)
        {
            throw "Argument for vector.add() needs to derive from vector."
        }
        return new Vector(this._x + v2.x, this._y + v2.y);
    }

    subtract (v2)
    {
        if(v2.constructor.name != Vector.name)
        {
            throw "Argument for vector.subtract() needs to derive from vector."
        }
        return new Vector(this._x - v2.x, this._y - v2.y);
    }

    multiply(scalar)
    {
        return new Vector(this._x * scalar, this._y * scalar)
    }

    
    divide(scalar)
    {
        return new Vector(this._x / scalar, this._y / scalar)
    }

    addTo(v2)
    {
        if(v2.constructor.name != Vector.name)
        {
            throw "Argument for vector.addTo() needs to derive from vector."
        }
        this._x += v2.x;
        this._y += v2.y;
    }

    subtractFrom(v2)
    {
        if(v2.constructor.name != Vector.name)
        {
            throw "Argument for vector.subtractFrom() needs to derive from vector."
        }
        this._x -= v2.x;
        this._y -= v2.y;
    }

    multiplyBy(scalar)
    {
        this._x *= scalar;
        this._y *= scalar;
    }

    divideBy(scalar)
    {
        this._x /= scalar;
        this._y /= scalar;
    }
}

export {Vector};