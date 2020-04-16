/**
 * this的原理以及几种不同使用场景的取值
 */

//直接调用foo
function foo() {
  console.log(this);
}
foo()

//对象中的方法，谁调用，this就是谁
let obj = {
  name: 'aaa',
  getName() {
    console.log(this.name);
  }
}
obj.getName()

//构造函数,this代表当前类的实例
function Point(x, y) {
  this.x = x
  this.y = y
  console.log(`x: ${x}, y: ${y}`)
}
let p = new Point('1', '2')

//使用call,apply,bind改变this指向，this指向第一个参数
let arr = [1,2,3]
let arr2 = [].sort.call(arr, (a, b)=> b-a)
console.log(arr2)

//箭头函数，没有自己的this，this是其外层的this