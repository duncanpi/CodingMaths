var canvas,
context,
width,
height;

// Episode 4 - animates dot in a circular path.
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
        speed = 0.01,
        x, y;


    render(); 
    function render()
    {
        context.clearRect(0, 0, width, height);

        var x = centerX +  Math.cos(angle) * radius;
        var y = centerY + Math.sin(angle) * radius;

        //var alpha = baseAlpha + Math.sin(angle) * alphaOffset
        //ontext.fillStyle = "rgba(0, 0, 0, " + alpha +")";

        
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, false);
        context.fill();

        angle += speed;
        requestAnimationFrame(render);
    }
};