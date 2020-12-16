var canvas,
context,
width,
height;


// Uses the particle class to demonstrate velocity and acceleration.
// In episodes 8 and 9.
// Was made more efficient in episode 12. Now when the particles are moved off screen we stop rendering them
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    var particles = [],
        inactive = 0,
        numParticles = 50;

    for(var i = 0; i < numParticles; i += 1)
    {
        var p = new Particle(width / 2, height, Math.random() * 8 + 5, -Math.PI / 2 +(Math.random() * 0.2 - 0.1), Math.random() * 10 + 2, 0.1);
        particles.push(p);
    }
-+
    update();

    function update()
    {
        context.clearRect(0, 0, width, height);

        //console.log(particles.length);

        for(var i = particles.length - 1; i >= 0; i -=1)
        {
            var p = particles[i];

            if(p.active && !isOffscreen(p))
            {
                p.update();
                context.beginPath();
                context.arc(p.position.x, p.position.y, p.hitBox.radius, 0, Math.PI * 2);
                context.fill();
            }
            else if(p.active && isOffscreen(p))
            {
                inactive ++;
                p = new Particle(0, 0, 0, 0, 0);
                p.active = false;
                particles[i] = p;
            }
        }

        if(inactive >= numParticles)
        {
            inactive = 0;
            for(var i = 0; i < numParticles; i++)
            {
                var p = particles[i];
                p = new Particle(width / 2, height, Math.random() * 8 + 5, -Math.PI / 2 +(Math.random() * 0.2 - 0.1), Math.random() * 10 + 2, 0.1);
                particles[i] = p;
            }
        }

        requestAnimationFrame(update);
    }

    function isOffscreen(sprite)
    {
        if((sprite.position.x - sprite.radius) > width ||
            (sprite.position.x + sprite.radius) < 0 ||
            (sprite.position.y - sprite.radius) > height ||
            (sprite.position.y + sprite.radius) < 0)
        {
            return true;
        }
        return false;
    }
};