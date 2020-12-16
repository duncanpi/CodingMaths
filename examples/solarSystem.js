var canvas,
context,
width,
height;

// Accelerates a particles that starts moving up from the bottom left of the screen
// down and to the right. Simulates a force pulling the particles down and to the right.
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    var sun = new Particle(width /2, height / 2, 0, 0),
        planet = new Particle(width / 2 + 200, height / 2, 10, - Math.PI / 2);

    sun.mass = 30000;
    update();

    function update()
    {
        context.clearRect(0, 0, width, height);

        planet.gravitateTo(sun);
        planet.update();

        context.beginPath();
        context.fillStyle = "#ffff00";
        context.arc(sun.position.x, sun.position.y, 20, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = "#0000ff";
        context.arc(planet.position.x, planet.position.y, 8, 0, Math.PI * 2);
        context.fill();

        requestAnimationFrame(update);
    }
};