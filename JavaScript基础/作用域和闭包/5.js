/**
 * 闭包的实现原理和作用，可以列举几个开发中闭包的实际应用
 * 
 * 当定义函数a的时候，js解释器会将函数a的作用域链(scope chain)设置为定义a时a所在的“环境”，如果a是一个全局函数，则scope chain中只有window对象。
 * 当执行函数a的时候，a会进入相应的执行环境(excution context)。
 * 在创建执行环境的过程中，首先会为a添加一个scope属性，即a的作用域，其值就为第1步中的scope chain。即a.scope=a的作用域链。
 * 然后执行环境会创建一个活动对象(call object)。活动对象也是一个拥有属性的对象，但它不具有原型而且不能通过JavaScript代码直接访问。创建完活动对象后，把活动对象添加到a的作用域链的最顶端。此时a的作用域链包含了两个对象：a的活动对象和window对象。
 * 下一步是在活动对象上添加一个arguments属性，它保存着调用函数a时所传递的参数。
 * 最后把所有函数a的形参和内部的函数b的引用也添加到a的活动对象上。在这一步中，完成了函数b的的定义，因此如同第3步，函数b的作用域链被设置为b所被定义的环境，即a的作用域。
 * 到此，整个函数a从定义到执行的步骤就完成了。此时a返回函数b的引用给c，又函数b的作用域链包含了对函数a的活动对象的引用，也就是说b可以访问到a中定义的所有变量和函数。函数b被c引用，函数b又依赖函数a，因此函数a在返回后不会被GC回收。
 */

/**
 * js 的闭包特性之所以成立，
 * 一是它允许函数嵌套，
 * 二是变量拥有多级作用域（以函数级别作用域为主），
 * 第三就是函数在 js 语言中是一等公民，可以当做值来使用。
 * 在 example2() 的例子中，那些持久化方式都是直接将 inner 函数作为值来使用，包括绑定到对象属性上、作为其他函数的参数等，而不是在 inner 函数后面用括号执行它。
 * https://zhuanlan.zhihu.com/p/26899840
 */

/**
 * Javascript的垃圾回收机制
 *  在Javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收。
 *  如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。
 *  因为函数a被b引用，b又被a外的c引用，这就是为什么函数a执行后不会被回收的原因。
 */

/* function a() {
  let count = 0

  function b() {
    count++
    console.log(count)
  }

  return b
}

let c = a()
c()
c() */

//为不能传递参数的方法传递参数，如延时，监听
/* function se(a) {
  return function() {
    a++
    console.log(a)
    if(a == 10) {
      clearInterval(t1)
    }
  }
}
var seW = se(0)
let t1 = setInterval(seW, 1000) */

//代码模块化
/* let testMoudle = (function() {
  let arr = ['张三', '李四', '王五']
  function get() {
    return arr
  }
  function set(index, value) {
    arr[index] = value
  }
  function add(value) {
    arr.push(value)
  }
  function remove(index) {
    arr.splice(index, 1)
  }

  return {
    get: get,
    set: set,
    add: add,
    remove: remove
  }
})()

console.log(testMoudle.get());
testMoudle.set(2, '王五五')
console.log(testMoudle.get());
testMoudle.add('Merci')
console.log(testMoudle.get());
testMoudle.remove(1)
console.log(testMoudle.get()); */

/* for(var i=0; i<5; i++) {
  console.log(i);
} */
/* for(var i=0; i<5; i++) {
  setTimeout(()=> {
    console.log(i);
  }, 1000)
} */
/* for(var i=0; i<5; i++) {
  let obj = {
    a: i
  }
  console.log(obj)
} */