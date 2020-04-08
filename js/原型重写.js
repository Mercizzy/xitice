/**
 * 2020/04/08
 * 原型被重写
 */

function A() {
  this.do = function() {
    return 'foo'
  }
}

A.prototype.do = function() {
  return 'bar'
}
console.log(A.prototype.do());

var x = new A().do()

console.log(x);


