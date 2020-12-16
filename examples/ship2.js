var canvas,
context,
width,
height,
ship;


// Uses the particle class to demonstrate velocity.
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    ship = new Particle(width / 2, height / 2, 0, 0, 0);

    ship.thrust = new Vector(0, 0);
    ship.angle = 0;
    ship.turningLeft = false;
    ship.turningRight = false;
    ship.thrusting = false;
    ship.firing = false;

    ship.bullets = [];
    ship.bulletInterval = 10 ;
    ship.bulletMaxDistance = 0;
    ship.latestBulletToRemove = null;

    ship.friction = 0.99;

    update();

    document.body.addEventListener("keydown", function(event)
    {
        console.log(event.key); 
        switch(event.key)
        {
            case "ArrowUp": // Up
            case "w":
                ship.thrusting = true;
                break;

            case "ArrowLeft": // Left
            case "a":
                ship.turningLeft = true;
                break;

            case "ArrowRight": // Right
            case "d":
                ship.turningRight = true;
                break;
            case ' ':
            case 'Spacebar':
                ship.firing = true;
                break;
            default:
                break;
            
        }
    });

    document.body.addEventListener("keyup", function(event)
    {
        switch(event.key)
        {
            case "ArrowUp": // Up
            case "w":
                ship.thrusting = false;
                break;

            case "ArrowLeft": // Left
            case "a":
                ship.turningLeft = false;
                break;

            case "ArrowRight": // Right
            case "d":
                ship.turningRight = false;
                break;
            case ' ':
            case 'Spacebar':
                ship.firing = false;
                ship.bulletMaxDistance = 0;
                ship.bullets = [];
            default:
                break;
            
        }
    });

    function update()
    {

        context.clearRect(0, 0, width, height);

        if(ship.turningLeft)
        {
            ship.angle -= 0.05;
        }
        if(ship.turningRight)
        {
            ship.angle += 0.05;
        }

        if(ship.thrusting)
        {
            ship.thrust.setLength(0.02);
        }
        else
        {
            ship.thrust.setLength(0);
        }

        ship.thrust.setAngle(ship.angle);

        ship.accelerate(ship.thrust);
        ship.update();

        if(ship.firing && ship.bullets.length < 100) {
            var b = new Particle(ship.position.x, ship.position.y, 20, ship.angle);
            ship.bullets.push(b);
        }

        if(ship.latestBulletToRemove != null)
        {
            ship.bullets.splice(0, ship.latestBulletToRemove);
            ship.latestBulletToRemove = null;
        }

        // More information on this way of using the cavas to rotate a "sprite"
        // look at arctangent.js
        context.save();
        context.translate(ship.position.x, ship.position.y);
        context.rotate(ship.angle);

        drawShip();
       
        context.restore();

        drawBullets();

        wrapPosition(ship);

        for(var i = 0; i < ship.bullets.length; i++)
        {
            wrapPosition(ship.bullets[i]);
        }
        
        requestAnimationFrame(update);

        ship.bulletMaxDistance += 0.000000001;
    }

    function wrapPosition(sprite)
    {
        if(sprite.position.x > width)
        {
            sprite.position.x = (0);
        }
        if(sprite.position.x < 0)
        {
            sprite.position.x = (width);
        }
        if(sprite.position.y > height)
        {
            sprite.position.y = (0);
        }
        if(sprite.position.y < 0)
        {
            sprite.position.y = (height);
        }
    }

    function drawShip()
    {
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        if(ship.thrusting)
        {
            context.moveTo(-14, -6);
            context.lineTo(-20, -6);
            context.moveTo(-14, 0);
            context.lineTo(-20, 0);
            context.moveTo(-14, 6);
            context.lineTo(-20, 6);
        }
        context.stroke();
    }

    function drawBullets()
    {
        for(var i = 0; i < ship.bullets.length; i +=1)
        {
            var b = ship.bullets[i];

            b.update();

            var dist = b.distanceTo(ship);
            if(dist > ship.bulletMaxDistance)
            {
                ship.latestBulletToRemove = i;
            }

            context.beginPath();
            context.arc(b.position.x, b.position.y, 1, 0, Math.PI * 2);
            context.fill();
        }
        return ship.latestBulletToRemove;
    }
};