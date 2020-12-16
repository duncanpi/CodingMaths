let Utils = require("./utils.js");

class Collision
{
    pointPointCollision(point1, point2)
    {
        return point1.position.x == point2.position.x &&
            point1.position.y == point2.position.y;
    }

    pointCircleCollision(point, circle)
    {
        return point.distanceTo(circle) <= circle.radius;
    }

    pointRectangleCollision(point, rectangle)
    {
        let rectx1 = rectangle.position.x + rectangle.hitBox.width,
            recty1 = rectangle.position.y + rectangle.hitBox.height;
        
        return Utils.inRange(point.position.x, rectangle.position.x, rectx1) &&
            Utils.inRange(point.position.y, rectangle.position.y, recty1);
    }

    pointTriangleCollision(point, triangle)
    {
        throw "Not pointTriangleCollision implemented";
    }

    circleCircleCollision(circle1, circle2)
    {
        var distance = circle1.distanceTo(circle2);

        if (distance <= circle1.hitBox.radius + circle2.hitBox.radius) 
        {
            return true;
        }
        return false;
    }

    circleRectangleCollision(circle, rectangle)
    {
        let rectCentreX = rectangle.position.x + (rectangle.hitBox.width / 2);
        let rectCentreY = rectangle.position.y + (rectangle.hitBox.height / 2);

        let xDist = Math.abs(rectCentreX - circle.position.x);
        let yDist = Math.abs(rectCentreY - circle.position.y);
    
        // radius of the circle
        let r = circle.hitBox.r;
    
        let w = rectangle.hitBox.width;
        let h = rectangle.hitBox.height;
    
        let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
    
        // no intersection
        if (xDist > (r + w) || yDist > (r + h))
          return false;
    
        // intersection within the circle
        if (xDist <= w || yDist <= h)
          return true;
    
        // intersection on the edge of the circle
        return edges <= circle.hitBox.radius;
    }

    circleTriangleCollision(circle, triangle)
    {
        throw "Not circleTriangleCollision implemented";
    }

    rectangleRectangleCollision(rectangle1, rectangle2)
    {
        let r1x = rectangle1.position.x,
            r1y = rectangle1.position.y,
            r1w = rectangle1.hitBox.width,
            r1h = rectangle1.hitBox.height,
            r2x = rectangle2.position.x,
            r2y = rectangle2.position.y,
            r2w = rectangle2.hitBox.width,
            r2h = rectangle2.hitBox.height;

        if (r1x + r1w >= r2x &&    // r1 right edge past r2 left
            r1x <= r2x + r2w &&    // r1 left edge past r2 right
            r1y + r1h >= r2y &&    // r1 top edge past r2 bottom
            r1y <= r2y + r2h)      // r1 bottom edge past r2 top
        {    
                return true;
        }
        return false;
    }

    rectangleTriangleCollision(rectangle, triangle)
    {
        throw "Not rectangleTriangleCollision implemented";
    }
    // t x t
    triangleTriangleCollision(triangle1, triangle2)
    {
        throw "Not triangleTriangleCollision implemented";
    }
}

if (typeof module !== "undefined") {
    module.exports = { Collision };
}