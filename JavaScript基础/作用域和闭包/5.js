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
function se(a) {
  return function() {
    a++
    console.log(a)
    if(a == 10) {
      clearInterval(t1)
    }
  }
}
var seW = se(0)
let t1 = setInterval(seW, 1000)

//代码模块化
