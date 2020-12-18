const shape = 
{
    custom: 0,
    point : 1,
    circle: 2,
    rectangle: 4,
    triangle: 8
};

Object.freeze(shape);

class HitBox  
{
    constructor(shape)
    {
        this.shape = shape;
    }
}

class RectangleHB extends HitBox
{
    // x and y are from the top left corner.
    constructor(width, height)
    {
        super(shape.rectangle);
        this.width = width;
        this.height = height;
    }
}

class CircleHB extends HitBox
{
    constructor(radius)
    {
        super(shape.circle);
        this.radius = radius;
    }
}
export{shape, HitBox, RectangleHB, CircleHB};