var canvas,
context,
width,
height;

// Episode 3 - uses a sine wave to create animations.
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    var centerY = height * 0.25,
        centerX = width * 0.5,
        
        baseX = width *0.5;
        offset = width *0.4,

        baseAlpha = 0.5;
        alphaOffset = 0.5;

        speed = 0.01,
        angle = 0;

    render1();
    render2();

    function render1()
    {
        var x = baseX + Math.sin(angle) * offset;

        var alpha = baseAlpha + Math.sin(angle) * alphaOffset
        context.fillStyle = "rgba(0, 0, 0, " + alpha +")";

        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(x, centerY, 50, 0, Math.PI * 2, false);
        context.fill();

        angle += speed;
        requestAnimationFrame(render);
    }
};