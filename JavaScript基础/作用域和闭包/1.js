/**
 * 理解词法作用域和动态作用域
 *  词法作用域是在定义时确定的，而动态作用域是在运行时确定的
 *  js没有动态作用域
 *  词法作用域，与函数声明的地方有关，与函数调用的地方无关
 */

// function foo(a) {
//   let b = a* 2
//   function bar(c) {
//     console.log(a, b, c)
//   }
//   bar(b * 2)
// }

// foo(2)


var a = 2;
function foo() {
  console.log( a );
}
function bar() {
  var a = 3;
  foo();
}
bar();  //2