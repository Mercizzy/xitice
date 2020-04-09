/**
 * Symbol类型在实际开发中的应用、可手动实现一个简单的Symbol
 *  1.作为对象独一无二的属性名，防止属性被改写或覆盖
 *  2.定义常量
 *  3.消除魔术字符串，当一个值与代码耦合度高，且仅仅用作标识（唯一性），值并不是关键时，可以使用symbol
 *  4.遍历for...in,for...of,Object.keys(),Object.getOwnPropertyNames(),JSON.stringify()都没用
 *    有用的：Object.getOwnPropertySymbols(), Reflect.ownKeys()
 *  5.Symbol.for(),Symbol.keyFor(),是全局登记的属性，即使是在单独作用域中生成，也会作用在全局
 *    以此可以在不同的iframe中取得同一个值
 * 
 */

let a = Symbol()
let b = Symbol()
console.log(a === b); //false

let c = Symbol('foo')
let d = Symbol('foo')
console.log(c===d); //false
console.log(c.description);

let obj = {
  [b]: '你好'
}
obj[a] = 'hello'
Object.defineProperty(obj, c, {value: 'merci'})

console.log(obj[a], obj[b], obj[c]);


const COLOR_RED    = Symbol('colorRed');
const COLOR_GREEN  = Symbol('colorGreen');

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
  }
}
console.log(getComplement(COLOR_RED));

let e = Symbol.for('same')
let f = Symbol.for('same')
console.log(e ==f); //true
let g = Symbol.keyFor(e)
console.log(g); //'same'
console.log(Symbol.keyFor(a)) //undefined


