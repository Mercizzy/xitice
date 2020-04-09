[TOC]
## 变量和类型
### 1.JavaScript规定了几种语言类型
基本数据类型
```js
Number String Undefined Null Boolean Symbol
```
引用数据类型
```js
object
```
### 2.JavaScript对象的底层数据结构是什么

### 3.Symbol类型在实际开发中的应用、可手动实现一个简单的Symbol
**1.作为对象独一无二的属性名，防止属性被改写或覆盖**
```js
let a = Symbol()
let b = Symbol()
console.log(a === b); //false

let c = Symbol('foo')
let d = Symbol('foo')
console.log(c===d); //false
console.log(c.description); //foo
```
**2.定义常量**

**3.消除魔术字符串，当一个值与代码耦合度高，且仅仅用作标识（唯一性），值并不是关键时，可以使用symbol**

**4.遍历for...in,for...of,Object.keys(),Object.getOwnPropertyNames(),JSON.stringify()都没用, 有用的：Object.getOwnPropertySymbols(), Reflect.ownKeys()**

```js
let a = Symbol('foo')
let obj = {
  [a]: 'symbolkey'
}
console.log(Reflect.ownKeys(obj))
```
**5.Symbol.for(),Symbol.keyFor(),是全局登记的属性，即使是在单独作用域中生成，也会作用在全局以此可以在不同的iframe中取得同一个值**

### 4.JavaScript中的变量在内存中的具体存储形式
**基本数据类型**
  存储方式：基本数据类型存放在栈内存(Stack)中
  访问方式：基本数据类型的值是按值访问的
  栈中包含了变量的标识符和变量的值

**引用数据类型**
  访问：引用类型的值是按引用访问的
  存储：引用类型的值是保存在堆内存（Heap）中的对象（Object）

  栈中包含了变量的标识符和指向堆内存中该对象的指针
  堆中包含了对象的内容

### 5.基本类型对应的内置对象，以及他们之间的装箱拆箱操作
**每个基本类型都有内置的对象方法**
```js
number => Number()
string => String()
```
**装箱：将基本数据类型转化为对应的引用数据类型**
**拆箱：将引用数据类型转化为对应的基本数据类型**
```js
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
```
---
### 7.null和undefined的区别
**null表示没有对象，即该处不应该有值**
1. 作为函数的参数，表示该函数的参数不是对象
2. 作为对象原型链的终点
**undefined表示缺少值，即此处应该有值，但没有定义**
1. 定义了形参，没有传实参，显示undefined
2. 对象属性名不存在时，显示undefined
3. 函数没有写返回值，即没有写return，拿到的是undefined
4. 写了return，但没有赋值，拿到的是undefined
**null和undefined转换成number数据类型**
 *  null 默认转成 0
 *  undefined 默认转成 NaN
```js
console.log(null==undefined);    //true  因为两者都默认转换成了false
console.log(typeof undefined);    //"undefined"  
console.log(typeof null);       //"object"  
console.log(null===undefined);    //false   "==="表示绝对相等，null和undefined类型是不一样的，所以输出“false”

console.log(+null); //0
console.log(+undefined);  //NAN
```
---
### 8.至少可以说出三种判断JavaScript数据类型的方式，以及他们的优缺点，如何准确的判断数组类型
1. typeof 优势在于判断基本数据类型，其中null为object
2. instanceof 检测原型
3. Object.prototype.toString.call() 最棒
### 9.可能发生隐式类型转换的场景以及转换原则
**场景**
1. 算术运算
  * +：会将字符当做字符处理拼接。
  * -*/%:当成数值处理,如果非法，会输出非法数值型NaN;
  ```js
  2+'1' //'21'
  2-'1' //1
  ```
2. 关系运算
3. 条件判断 if()
**转换原则**
1. toString
原类型 | 转换
:----: | :----:
undefined	| "undefined"
null | "null"
boolean | "true" 或者 "false"
number | 数字作为字符串。比如，"1.765" 
string | 无需转换 
[] | ""
[5,2] | "5,2" 
{} | "[object Object]" 
Symbol() | "Symbol()"
2. toInt
原类型 | 转换 
:----: | :----: 
undefined | NaN 
null | +0 
boolean | true被转换为1,false转换为+0 
number | 无需转换 
string | 由字符串解析为数字。例如，"324"被转换为324 
[] | +0 
[5] | 5 
{} | NaN 
Symbol | 报错 
3. toBoolean
原类型 | 转换
:----: | :----:
undefined | false
null | false 
boolean | 无需转换 
number | +0,-0转换为false,其他为true 
string | ''为false,其他为true 
[] | true
{} | true
Symbol | true

### 10.出现小数精度丢失的原因,JavaScript可以存储的最大数字、最大安全数字,JavaScript处理大数字的方法、避免精度丢失的方法
1. 出现小数精度丢失的原因
    出现小数精度丢计算机的二进制实现和位数限制有些数无法有限表示。
    就像一些无理数不能有限表示，如 圆周率 3.1415926...，1.3333... 等。
    JS 遵循 IEEE 754 规范，采用双精度存储（double precision），占用 64 bit。

2. JavaScript可以存储的最大数字、最大安全数字
    Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER
    (-Math.pow(2, 53)+1,Math.pow(2, 53)-1)

3. JavaScript处理大数字的方法、避免精度丢失的方法

    1. 处理大数字的方法
       * 使用bignumber.js
       * 使用BigInt  99999n/BigInt(99999)

    2. 避免精度丢失的方法
       * 将数据的小数点替换成''，并记住是几位小数，最后再除以相应的倍数即可，单纯的先乘也可能导致精度丢失

  ```js
  let a = 9999999999999999999999999999999
  console.log(a); //1e+31
  let b = 9999999999999999999999999999999n
  console.log(b); //原样输出
  ```