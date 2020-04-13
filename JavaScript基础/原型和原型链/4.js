/**
 * Node中应用原型继承的案例
 * 
 * node是原型继承，只会继承原型上的属性与方法,无法继承构造函数中的属性与方法
 */

let Util = require('util')

function Parent() {
  this.name = 'parent'
  this.say = function() {
    console.log('i am parent');
  }
}
Parent.prototype.age = 40
Parent.prototype.sing = function() {
  console.log('parent sing red');
}

function Child() {
  // this.name = 'child'
}
Child.prototype.jump = function() {
  console.log('child like jump');
}

Util.inherits(Child, Parent)

let child = new Child()

// console.log(child.name);  //TypeError: child.say is not a function
console.log(child.age);
// child.say();  //TypeError: child.say is not a function
child.jump();
