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
        numParticles = 50;

    for(var i = 0; i < numParticles; i += 1)
    {
        var p = new Particle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2, 10, 0.1);
        particles.push(p);
    }

    update();

    function update()
    {
        context.clearRect(0, 0, width, height);

        //console.log(particles.length);

        for(var i = particles.length - 1; i >= 0; i -=1)
        {
            var p = particles[i];

            if(!isOffscreen(p))
            {
                p.update();
                context.beginPath();
                context.arc(p.position.x, p.position.y, p.hitbox.radius, 0, Math.PI * 2);
                context.fill();
            }
            else
            {
                particles.splice(i, 1);
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