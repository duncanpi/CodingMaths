var canvas,
context,
width,
height;

// Episode 4 - spaces out dots in a circle.
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    var centerY = height/ 2,
        centerX = width / 2,
        radius = 200,
        angle = 0,
        numObjects = 5,
        slice = 2 * Math.PI / numObjects,
        x, y;

    for(var i = 0; i < numObjects; i++)
    {
        angle = i * slice;
        x = centerX +  Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, false);
        context.fill();
    }
};