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
    
    var p = new Particle(width / 2, height / 2, 10, Math.random() * Math.PI * 2, 10);

    var friction = new Vector(0.15, 0);

    update();

    function update()
    {
        context.clearRect(0, 0, width, height);

        var pVelocityLength = p.velocity.getLength();

        if(pVelocityLength > friction.getLength())
        {
            friction.setAngle(p.velocity.getAngle());
            p.velocity.subtractFrom(friction);
        }
        else if(pVelocityLength != 0)
        {
            p.velocity.setLength(0);
        }

        p.update();
        
        context.beginPath();
        context.arc(p.position.x, p.position.y, p.hitBox.radius, 0, Math.PI * 2);
        context.fill();
 
        requestAnimationFrame(update);
    }

    function wrapPosition(particle)
    {
        if((particle.position.x - particle.radius) > width)
        {
            particle.position.x = (-particle.radius);
        }
        if((particle.position.x + particle.radius) < 0)
        {
            particle.position.x = (width + particle.radius);
        }
        if((particle.position.y - particle.radius) > height)
        {
            particle.position.y = (-particle.radius);
        }
        if((particle.position.y + particle.radius) < 0)
        {
            particle.position.y = (height + particle.radius);
        }
    }
};