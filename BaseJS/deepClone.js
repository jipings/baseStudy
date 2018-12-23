
function deepClone(origin, target) {
    var target = target || {};
    var toStr = Object.prototype.toString;
    var arrStr = '[object Array]';

    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if(toStr.call(origin[prop]) == arrStr || toStr.call(origin[prop]) == "[object Object]") {
                target[prop] = (toStr.call(origin[prop]) == arrStr) ? [] : {};
                deepClone(origin[prop], target[prop]);
            } else {
                try{
                    let string = origin[prop]+''
                    target[prop] = eval(string);
                } catch(err) {
                    target[prop] = origin[prop];
                }
               
            }
        }
    }
    return target;
}
const c = {};
c.a =c;
let b = () => {}
const s = deepClone({a: new Date(),d:'asd',1: c,2: undefined,s:b,cc:/^s$/, b: [1,{c:/^s/}]})
// 无法clone function Date regx  使用eval
console.log(s.s === b)