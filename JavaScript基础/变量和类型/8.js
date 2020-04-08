/**
 * 至少可以说出三种判断JavaScript数据类型的方式，
 * 以及他们的优缺点，如何准确的判断数组类型
 * 
 * 1.typeof 优势在于判断基本数据类型，其中null为object
 * 2.instanceof 检测原型
 * 3.Object.prototype.toString.call() 最棒
 */
let a = 1,
    b = "1",
    c = undefined,
    d = null,
    e = true,
    f = [],
    g = {},
    h = Symbol(),
    fn = function() {}

console.log('----------typeof-----------');
console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
console.log(typeof d);
console.log(typeof e);
console.log(typeof f);
console.log(typeof g);
console.log(typeof h);
console.log(typeof fn);
console.log('----------typeof-----------');


console.log('----------instanceof-----------');
console.log(a instanceof Object);
console.log(b instanceof String);
console.log(c instanceof Object);
console.log(d instanceof Object);
console.log(e instanceof Boolean);
console.log(f instanceof Object);
console.log(g instanceof Object);
console.log(h instanceof Symbol);
console.log(fn instanceof Function);
console.log('----------instanceof-----------');

console.log('----------Object.prototype.toString.call-----------');
console.log(Object.prototype.toString.call(''));// [object String]
console.log(Object.prototype.toString.call(1))  // [object Number]
console.log(Object.prototype.toString.call(true)) // [object Boolean]
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) ; // [object Null]
console.log(Object.prototype.toString.call(new Function())) ; // [object Function]
console.log(Object.prototype.toString.call(new Date())) ; // [object Date]
console.log(Object.prototype.toString.call([])) ; // [object Array]
console.log(Object.prototype.toString.call(new RegExp())) ; // [object RegExp]
console.log(Object.prototype.toString.call(new Error())) ; // [object Error]
console.log('----------Object.prototype.toString.call-----------');