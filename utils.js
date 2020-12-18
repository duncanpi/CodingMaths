class Utils
{
    inRange2(x, a, b) 
    {
        return  x*x - (a+b)*x + a*b  <= 0
    }

    inRange(value, min, max) 
    {
        return value >= min && value <= max;
    }
}

export { Utils };