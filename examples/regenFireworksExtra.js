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

    var particles = [];
-+
    update();

    function update()
    {
        context.clearRect(0, 0, width, height);

        //console.log(particles.length);
        
        // if we have less than 100 particles, create one and add it to the array
		// once we have 100, this will be skipped.
		if(particles.length < 100) {
			var p = particleCreator();
			particles.push(p);
        }
        
        for(var i = particles.length - 1; i >= 0; i -=1)
        {
            var p = particles[i];

            if(!isOffscreen(p))
            {
                p.update();
                context.beginPath();
                context.arc(p.position.x, p.position.y, p.hitBox.radius, 0, Math.PI * 2);
                context.fill();
            }
            else
            {
                p = particleCreator();
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

    function particleCreator()
    {
        return new Particle(width / 2, height, 5 + Math.random() * 8, -Math.PI / 2 + (Math.random() * .2 - .1), Math.random() * 10 + 2, 0.1);
    }
};