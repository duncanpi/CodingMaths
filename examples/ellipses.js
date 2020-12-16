var canvas,
context,
width,
height;

// Episode 4 - animates dot moving in an ellipses path.
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    var centerY = height/ 2,
        centerX = width / 2,
        xRadius = 200,
        yRadius = 400,
        angle = 0
        speed = 0.01;


    render(); 
    function render()
    {
        context.clearRect(0, 0, width, height);

        var x = centerX +  Math.cos(angle) * xRadius;
        var y = centerY + Math.sin(angle) * yRadius;

        //var alpha = baseAlpha + Math.sin(angle) * alphaOffset
        //ontext.fillStyle = "rgba(0, 0, 0, " + alpha +")";

        
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, false);
        context.fill();

        angle += speed;
        requestAnimationFrame(render);
    }
};