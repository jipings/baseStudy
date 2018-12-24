let result = null;
// bindAll
const bindAll = (obj,...fns) => fns.forEach(
    fn => (
        (f = obj[fn]),
        (obj[fn] = function(){return f.apply(obj)})
        )
    );
const view = {
    label: 'docs',
    click: function() {
        console.log(`clicked ${this.label}`);
    }
};
bindAll(view, 'click');

// deepClone
const deepClone = obj => {
    let clone = Object.assign({}, obj);
    
    Object.keys(clone).forEach(
        key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
    );

    return Array.isArray(obj)? (clone.length = obj.length) && Array.from(clone) : clone;
}
const a = { foo: 'bar', obj: { a: 1, b: 2 }, s: () => {} };
const b = deepClone(a); // a !== b, a.obj !== b.obj
console.log(b);

// deepFreeze
const deepFreeze = obj => Object.keys(obj).forEach(
    prop => !(obj[prop] instanceof Object) || Object.isFrozen(obj[prop]) ? null : deepFreeze(obj[prop]) 
) || Object.freeze(obj);
const o = deepFreeze([1, [2, 3]]);

'use strict';
o[0] = 3; // not allowed
o[1][0] = 4; // not allowed as well
console.log(o);