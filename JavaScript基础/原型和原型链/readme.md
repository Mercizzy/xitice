##  原型和原型链

### 1.理解原型设计以及JavaScript中的原型规则

#### 原型设计模式

> 将一个类的原型指向另个一类（实例化对象）的原型，实现对类的原型的共享。实现原理是基于JavaScript的原型链（prototype）

#### 原型规则

```js
function Person() {
  this.name = 'Person'
}
Person.prototype.age = '18'
Person.prototype.habits = ['read']
Person.prototype.show = function() {
  return `姓名：${this.name},年龄：${this.age}`
}

let p1 = new Person()
let p2 = new Person()
```



1. 我们创建的所有函数（类）和部分原始数据类型（Number，String，Array，Function）都有一个人原型属性prototype

2. 原型属性实质上是一个指针，它指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法（通俗的说：就是这个特定类型的所有实例都可以共享原型对象包含的属性和方法）。

   ```js
   console.log(Person.prototype.constructor == Person)	//true
   ```

3. 实例可修改prototype上的属性。

   1. 如果修改的是值类型，只是当前实例发生更改。

      ```js
      p1.age = '20'
      console.log(p1.age)	//20
      console.log(p2.age)	//18
      ```

   2. 如果修改的是引用类型，又分两种情况：

      1. 如果直接修改引用类型，则只影响当前实例的值。

         ```js
         p1.habits = ['write']
         console.log(p1.habits)	//['write']
         console.log(p2.habits)	//['read']
         ```

      2. 如果修改引用类型的属性或项，则对父类发生更改，影响所有实例的值。

         ```js
         //且修改后，由于引用地址的变化，之后所有对该实例上该属性的更改都只作用于该实例。
         //所以本示例与上例无关
         p1.habits.push('swim')
         console.log(p1.habits)	//['read', 'swim']
         console.log(p2.habits)	//['read', 'swim']
         ```

4. 类可以直接设置静态属性，可直接通过 ”类名.属性名 = 值 “设置和访问，实例不可访问。

   ```js
   Person.staticAttribute = 'staticAttribute'
   console.log(p1.staticAttribute)	//undefined
   ```

5. 由于在原型中查找值的过程是一次搜索，因此在对原型对象做的任何修改都会立即从实例上反映出来，即使是先创建实例后修改原型也如此。

   ```js
   console.log(p1.age)	//18
   Person.prototype.age = '100'
   console.log(p1.age)	//100
   ```

### 2.`instanceof`的底层实现原理，手动实现一个`instanceof`

#### 底层实现原理

> 循环遍历子的`__proto__`属性，是否与父的prototype相等，直至子的`__proto__`为`null`

#### 手动实现

```js
/*__proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。*/

function myInstanceOf(child, father) {
  //第一步，验证是否为引用类型
  if((typeof child != "object" && typeof child != 'function') || child === null)  {
    return false
  }
  let leftValue = Object.getPrototypeOf(child)
  let rightValue = father.prototype
  while(true) {
    if(leftValue == null) return false
    if(leftValue === rightValue) return true
    
    leftValue = Object.getPrototypeOf(leftValue)
  }
}
```

### 3.实现继承的几种方式以及他们的优缺点

```js
function Animal(name) {
  this.name = name || 'Animal'
  this.sleep = function() {
    return `${this.name}正在睡觉`
  }
}
Animal.prototype.eat = function(food) {
  return `${thia.name}正在吃${food}`
}
Animal.prototype.testArr = []
```

#### 3.1 原型链继承

```js
function Cat() {}
Cat.prototype = new Animal()
let cat = new Cat()
//新实例不会继承父类实例的属性
console.log(cat.name)
//缺点：1.新实例无法向父类构造函数传参
//		 2.无法多继承
//		 3.所有新实例都会共享父类实例的属性
```

#### 3.2 构造函数继承

```js
function Cat() {
  Animal.call(this, 'cat')
}
let cat = new Cat()
console.log(cat.name)	//cat
console.log(cat.testArr)	//undefined
/**
*	优点：解决了原型链继承的三个缺点
* 缺点：1.只能继承构造函数的属性，原型链上的属性无法继承
*			 2.无法实现构造函数的复用（每次都要重新调用）
*			 3.每个新实例都有父类构造函数的副本，臃肿，影响性能
*			 4.实例只是子类的实例，不是父类的实例
*/
```

#### 3.3 组合继承

```js
function Cat() {
  Animal.call(this, 'cat')
}
Cat.prototype = new Animal()
Cat.prototype.constructor = Cat

/**
*	优点：结合了原型链继承和构造函数继承，传参和复用
* 缺点：调用了两次父类的构造函数（耗内存），子类的构造函数会代替原型上的父类的构造函数
*/
```

#### 3.4 拷贝继承

```js
function Cat() {
  let animal = new Animal()
  for(let p in animal) {
    Cat.prototype[p] = animal[p]
  }
}
/**
*	优点：支持多继承
*	缺点：效率低，无法获取父类无法枚举的属性
*/
```

#### 3.5 原型式继承

```js
function content(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
let cat = content(new Animal())

/**
* 重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。
* 优点: 类似于复制1个对象，用函数来包装。
* 缺点：1.继承原型上的属性。
　　　  2.实现复用。（新实例属性都是后面添加的）
*/
```

#### 3.6 寄生式继承

```js
function content(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
function subContent(obj) {
  let sub = content(obj)
  obj.name = 'cat'
}
let cat = subContent(new Animal())

/**
* 重点：就是给原型式继承外面套了个壳子。
* 优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
* 缺点：没用到原型，无法复用。
*/
```

3.7 寄生组合式继承

```js
function content(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
function Cat() {
  Animal.call(this, 'cat')
}
Cat.prototype = content(Animal.prototype)
Cat.prototype.constructor = Cat
```

### 4.至少说出一种开源项目（如Node）中应用原型继承的案例

```js
//Node是原型继承，不会继承实例上的属性
let Util = require('util')
function Cat() {}
Util.inherits(Cat, Animal)
let cat = new Cat()
console.log(cat.name)	//'Animal'
console.log(cat.age)	//undefined
```

### 5.描述new一个对象的详细过程，手动实现一个new操作符

#### 详细过程

1. 生成一个空对象
2. 链接到原型(将所创建对象的`__proto__`属性值设置为构造函数的prototype属性)
3. 绑定this（构造函数中的this指向新对象并且调用构造函数）
4. 返回新对象

#### 手动实现

```js
function myNew() {
  //生成一个空对象
  let obj = Object()
  //获取构造函数，就是参数列表的第一个
  let con = [].shift().call(arguments)
  //链接到原型
  Object.getPrototypeOf(obj) = con.prototype
  //绑定this
  let result = con.apply(obj, arguments)
  //确保new出来的是一个对象
  //首先，在这个demo中call的返回值确实是undefined，因为绑定函数确实没有任何返回，只有当绑定函数有return的时候，才会有返回值。其次，为什么要判断返回值的类型？这是因为new一个实例的时候，如果没有return，就会根据构造函数内部this绑定的值生成对象，如果有返回值，就会根据返回值生成对象，为了模拟这一效果，就需要判断apply后是否有返回值。
  return typeof result === 'object' ? result : obj
}
```

### 6.理解`es6 class`构造以及继承的底层实现原理

#### `class`的构造

```js
class Animal {
  constructor(name) {
    this.name = name
  }
  sleep() {
    return `${name}正在睡觉`
  }
  //静态方法
  static staticFn() {
    this.sleep()	
    return `我是静态方法`
  }
  static sleep() {
    return `我是静态方法睡觉`
  }
}
//constructor 构造函数，是类的默认方法，在new一个实例时，自动调用constructor方法。一个类必须有构造函数，如果没有显式定义，则会默认生成一个空的构造函数,默认返回this（实例对象）

//类所有的方法都定义在prototype上，且不可枚举
console.log(Object.keys(Animal.prototype))	//[]
console.log(Object.getOwnPrototypeNames(Animal.prototype))	//['constructor', 'sleep']

//如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
Aniaml.staticFn()	//我是静态方法
let animal = new Animal()
animal.staticFn()	//TypeError: foo.classMethod is not a function

//如果静态方法中包含this，this指向类，而不是实例，该方法不存在，因为sleep为实例上的方法，由此，静态方法可以与实例方法重名，静态方法可以被子类继承

//静态属性的两种写法
Animal.staticProp = 1
class A {
  static staticProp = 1
}

//私有方法
1.将私有方法移出模块
class A {
  privateFn(pa) {
    outerPrivateFn.call(this, pa)
  }
}
outProvateFn(pa) {
  ...
}

2.使用Symbol,使用Reflect.ownKeys()依然可以遍历到Symbol值
const privateFn = Symbol('privateFn')
class A {
  [privateFn]() {
    ...
  }
}
 
3. 加#
 class A {
  #privateFn() {
  	...
	}
}

//new.target,如果构造函数不是通过new调用或者Reflect.constructor(),会返回undefined，否则会返回当前class，可以用来确保构造函数只能通过new使用
function A() {
  if(new.target === undefined) {
    throw new Error('必须使用new命令生成实例')
  }
}
//new.target的另一个属性是，如果被继承，会返回子类的class，所以可以用来构造一个只用于继承的类
class A {
  constructor() {
    if(new.target === A) {
      throw new Error('本类不能被实例化')
    }
  }
}
```

#### class的继承

