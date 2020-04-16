/**
 * 理解JavaScript的作用域和作用域链
 * 
 */

//作用域分为全局作用域，局部作用域，块级作用域
/**
 * 全局作用域：
 *  1.最外层函数和最外层定义的变量
 *  2.未定义直接赋值的变量
 *  3.顶级变量，如window，document，Golbal
 */
/**
 * 局部作用域：
 *  最常见的在函数内部，所以也成为函数作用域
 */
/**
 * 块级作用域:
 *  1.let,const声明的变量，在指定的块级作用域外无法访问,一般作用于{}或者函数内部
 *  2.不存在变量提升
 */

/* var a = 10

function foo() {
  console.log(a)  //undefined
  var a = 2
  console.log(a)  //2
}

foo() */

/* var a = 10

function foo() {
  console.log(a)  //10
}

foo() */

/**
 * 作用域链
 *  为了保证函数能够对可访问变量的有序访问而产生的链表（由下往上查找）
 */

function a(){ 
  let num = 0; 
  return function(){ 
    console.log(++num)
  } 
} 
const b =a() 
b()
b()