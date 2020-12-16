var canvas,
context,
width,
height;

// Episode 5 - animating arrow to point at mouse using the arctangent to find the angle to rotate.
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    var arrowX = width / 2,
        arrowY = height / 2,
        dx, dy,
        angle = 0;

    render();

    // Moves and rotates the canvas to draw the arrow facing the mouse.
    // Using the canvas to do the rotation so you don't have to worry about translating the individual parts of the arrow.
    function render()
    {
        context.clearRect(0, 0, width, height);

        context.save();
        context.translate(arrowX, arrowY);
        context.rotate(angle);

        // Draw arrow.
        context.beginPath();
        context.moveTo(20, 0);
        context.lineTo(-20, 0);
        context.moveTo(20,0);
        context.lineTo(10, -10);
        context.moveTo(20, 0);
        context.lineTo(10, 10);
        context.stroke();

        context.restore();
        requestAnimationFrame(render);
    }

    document.body.addEventListener("mousemove", function(event) 
    {
        dx = event.clientX - arrowX;
        dy = event.clientY - arrowY;
        angle = Math.atan2(dy, dx);
    });
};