var canvas,
context,
width,
height,
colours = ["purple", "green" , "pink", "yellow", "red","blue", "orange", "brown", "black"];

// Episode 4 - animates different coloured dots moving in a lissajous curve. 
// ToDo: Lerp each of the dots colours.
window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    var centerY = height/ 2,
        centerX = width / 2;

    function MakeAnim(xRadius, yRadius, xSpeed, ySpeed)
    {
        var anim = {};
        anim.xRadius = xRadius;
        anim.yRadius = yRadius;
        anim.xSpeed = xSpeed;
        anim.ySpeed = ySpeed;
        anim.xAngle = 0;
        anim.yAngle = 0;
        anim.colour = colours.pop();

        anim.render = function()
        {
            if(anim.x)
                anim.clearPrevious();

            anim.x = centerX +  Math.cos(anim.xAngle) * anim.xRadius;
            anim.y = centerY + Math.sin(anim.yAngle) * anim.yRadius;
    
            context.beginPath();
            context.arc(anim.x, anim.y, 10, 0, Math.PI * 2, false);
            context.fillStyle = anim.colour;
            context.fill();     

            anim.xAngle += anim.xSpeed;
            anim.yAngle += anim.ySpeed;

            window.requestAnimationFrame(anim.render);
        }

        anim.clearPrevious = function()
        {
            context.beginPath();
            context.arc(anim.x, anim.y, 10, 0, Math.PI * 2, false);
            context.fillStyle = "#fff";
            context.fill();     
            context.fillStyle = anim.colour;
        }

        return anim;
    }
    
    
    for(var i = 0; i < 5; i++)
    {   
        var a = MakeAnim(Math.floor(randomNumber(200, 400)), Math.floor(randomNumber(200, 400)), randomNumber(0.01, 0.03), randomNumber(0.01, 0.03));
        a.render();
    }

    function randomNumber(min, max) {  
        return Math.random() * (max - min) + min; 
    }  
};