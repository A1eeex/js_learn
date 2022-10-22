let arr = [1, '22', 32];
const cal = (x, y, z) => x.x + y[0] * z
console.log(cal({ x: 1 }, [2], 3))

String.porototype.join = function (sub){
    return this + sub
}