var canvas,
context,
width,
height;

window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    context.translate(0, height / 2);

    // for(var i = 0; i < 100; i++)
    // {
    //     //console.log("start line " + i)
    //     context.beginPath();
        
    //     var cor1x = Math.random() * width,
    //         cor1y = Math.random() * height,
    //         cor2x = Math.random() * width,
    //         cor2y = Math.random() * height;

    //     //console.log("line " + i + " cor1 x: " + cor1x + " cor1 y: " + cor1y);

    //     context.moveTo(cor1x, cor1y);

    //     //console.log("line " + i + " cor1 x: " + cor2x + " cor1 y: " + cor2y);

    //     context.lineTo(cor2x, cor2y);

    //     context.stroke();

    // }
};