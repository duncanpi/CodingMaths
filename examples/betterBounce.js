var canvas,
context,
width,
height,
particles,
quadtree;




// Uses the particle class to demonstrate velocity and acceleration.
// In episodes 8 and 9.
// Was made more efficient in episode 12. Now when the particles are moved off screen we stop rendering them
window.onload = function()
{
    document.body.addEventListener("mousedown", (event) => 
    {
        for(let i = 0; i < 10; i ++)
        {
            particles.push(new Particle(event.x + utils.randomNumber(-5, 5), event.y + utils.randomNumber(-5, 5), 0, 0, 1, 0));
        }
    });

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    particles = [];
-+
    update();

    function update()
    {
        context.clearRect(0, 0, width, height);

        //console.log(particles.length);
        
        // if we have less than 100 particles, create one and add it to the array
		// once we have 100, this will be skipped.
		// if(particles.length < 1000) {
		// 	var p = new Particle(width / 2, height - 20, Math.random() * 8 + 5, -Math.PI / 2 + (Math.random() * .2 - .1), 10, .1);
        //     p.bounce = -0.9;
		// 	particles.push(p);
        // }

        let quadtree = new QuadTree(0, 0, width, height, 30);

        quadtree.insertMany(particles);
        quadtree.show(context);
        for(var i = particles.length - 1; i >= 0; i -=1)
        {
            var p = particles[i];

            // let query = quadtree.query(null, {id: p.id, type: queryType.id});
            // if(query.foundId)
            // {
            //     for(let x = 0; x < query.objectIds.length; x++)
            //     {
            //         let otherActor = ActorObjects.get(query.objectIds[x]);
            //         if(otherActor.hasCollided(p))
            //         {
            //             p.colour = "#444";
            //         }
            //     }
            // }

            handleOffscreen(p);

            p.update();
            context.beginPath();

            context.arc(p.position.x, p.position.y, p.hitBox.radius, 0, Math.PI * 2);
            context.fillStyle = p.colour;
            context.fill();
        }

        requestAnimationFrame(update);
    }

    function handleOffscreen(p)
    {
        if((p.position.x + p.radius) > width)
        {
            p.position.x = width - p.radius;
            p.velocity.x = p.velocity.x * p.bounce;
        }
        if((p.position.x - p.radius) < 0)
        {
            p.position.x = (p.radius);
            p.velocity.x = (p.velocity.x * p.bounce);
        }
        if((p.position.y + p.radius) > height)
        {
            p.position.y = (height - p.radius);
            p.velocity.y = (p.velocity.y * p.bounce);
        }
        if((p.position.y - p.radius) < 0)
        {
            p.position.y = (p.radius);
            p.velocity.y = (p.velocity.y * p.bounce);
        }
        return p;
    }
};