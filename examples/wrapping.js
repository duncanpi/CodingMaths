var canvas,
context,
width,
height;


// Uses the particle class to demonstrate velocity.
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    var p = new Particle(width / 2, height / 2, 3, Math.random() * Math.PI * 2);
    p.radius = 50;

    update();

    function update()
    {
        context.clearRect(0, 0, width, height);

        p.update();

        
        context.beginPath();
        context.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2);
        context.fill();
 
        wrapPosition(p);

        requestAnimationFrame(update);
    }

    function wrapPosition(sprite)
    {
        if((sprite.position.x - sprite.radius) > width)
        {
            sprite.position.x = (-sprite.radius);
        }
        if((sprite.position.x + sprite.radius) < 0)
        {
            sprite.position.x = (width + sprite.radius);
        }
        if((sprite.position.y - sprite.radius) > height)
        {
            sprite.position.y = (-sprite.radius);
        }
        if((sprite.position.y + sprite.radius) < 0)
        {
            sprite.position.y = (height + sprite.radius);
        }
    }
};