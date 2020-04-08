/**
 * 基本类型对应的内置对象
 * 
 * 每个基本类型都有内置的对象方法
 * number => Number()
 * string => String()
 * 
 * 装箱：将基本数据类型转化为对应的引用数据类型
 * 拆箱：将引用数据类型转化为对应的基本数据类型
 */

let a = 'abc'
let b = new String('abc')

console.log(`a: ${typeof a}`);  //string
console.log(`b: ${typeof b}`);  //object

// 当基本数据类型调用内置对象的方法时，就发生了装箱
let c = 'aaa'
c.split('')   //c是个基本数据类型，不是对象，也就没有方法，但是却能够调用String的方法，其中就是js内部做了操作

/**
 * let c = new String('aaa')
 * c.split('')
 */


//拆箱操作的主要两个方法valueOf(),toString()
console.log([]+[]);//""
console.log({}+{});//"[object Object][object Object]"
console.log([]+{});//"[object Object]"
console.log({}+[]);//0

([][[]]+[])[+!![]]+([]+{})[!+[]+!![]]	//"nb"
