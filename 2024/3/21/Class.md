## Class

- class：是一群事务的统称，类可以看作对象的模板，可以创建不同的对象

### Class 基本用法

- 类名一般首字母大写
- 一般在构造函数定义属性，方法和构造函数同级定义

```
class Person{
  constructor(name,age,sex){// 构造方法
    this.name=name;
    this.age=age;
    this.sex=sex;
  }
  // 实例共享的方法
  speak(){

  }
}
const Bob = new Person('BOb',18,'male');
Bob.speak();
```

### Class 与构造函数

- 本质上是 Class 和构造函数相同

```
function Person(name,age){
  this.name=name;
  this.age=age;
}
Person.prototype.speak=()=>{};
```

### Class 两种定义方式

- 声明形式

```
class Person{
  constructor(){}
  speak(){}
}

```

- 表达式形式

```
const Person = class{
  constructor(){}
  speak(){}
};//匿名类

//立即执行类
(new class {
  constructor(){
    console.log('constructor');
  }
})();
```

### 实例属性、静态方法和静态属性

#### 实例属性

- constructor 中添加的属性就是实例属性
- 新写法，在 constructor 外面添加的实例属性，可以设置默认值

```
class Person{
  age = 18;
  constructor(){}
}
```

#### 实例方法

- 新写法

```
class Person{
  age = 18;
  getSex = () =>{}
  constructor(){}
}
```

#### 静态方法

- 静态方法：类的方法
- 静态方法只能类调用，里面的 this 指向类本身

```
class Person{
  age = 18;
  constructor(){}
  static.speak = () => {
    console.log('人类 speak');
    console.log(this);
  }
}

// 添加静态方法，不建议
Person.move = () => {};
```

#### 静态属性

- 静态属性：类的属性，只能类调用
- static 添加静态属性，很多浏览器不兼容，在类外面定义不满足封装原则，推荐使用方法的形式

```
class Person{
//  static age = 18;
  static getAge(){
    return 18;
  }
  constructor(){}
}
// Person.age = 17;
```

### 私有属性和方法

- 私有属性和方法，只能在类的内部使用，不能在外面调用（实例、类名调用）
- 共有的属性和方法可以被外界修改，造成意想不到的错误
- 模拟私有属性和方法，下划线开头的为私有（约定俗成，不具备约束力）

```
class Person{
  constructor(name){
    this._name = name;
  }
  getName(){
    return this._name;
  }
  setName(name){
    this._name=name;
  }
}
```

- 将私有的属性和方法移出类

```
(function(){
  let name = '';
  class Person{
    constructor(username){
      name = username;
    }
    getName(){
      return name;
    }
    setName(username){
      name=username;
    }
  }
  window.Person = Person; //暴露在外面
})()
```

### 继承

- 子类 extends 父类，继承了父类的实例属性和方法

```
class Person{
  constructor(name,sex){
    this.name = name;
    this.sex =sex;
    this.say = () => {}
  }
  speak(){
    console.log('speak')
  }
  static speak(){
    console.log('static speak')
  }
}
Person.version = '1.0';
class Programmer extends Person {
  constructor(name,sex){
    super(name,sex);
  }
}
const zs = new Programmer('zs','男');
console.log(zs); // {name: 'zs', sex: '男', say: ƒ}
zs.speak(); // speak
Programmer.speak(); // static speak
console.log(Programmer.version); // 1.0

// 改写继承的属性和方法
class Programmer2 extends Person {
  constructor(name,sex,age){
    super(name,sex);
    this.age = age; // this操作不能添加到super前面
  }
  // 同名覆盖
  speak(){
    console.log('Programmers speak');
  }
}
```

#### super

1. 函数调用

- 函数调用，代表父类的构造方法，只能用在子类的构造方法中，用在其他地方会报错
- super 虽然代表了父类的构造方法，但内部的 this 指向**子类的实例**

2. 作为对象使用

- 在构造方法中使用：super 代表父类的原型对象 Person.prototype
- 在构造方法中使用或一般方法中使用
- 所有定义在父类实例上的方法和属性，是无法通过 super 调用的
- 通过 super 调用父类的方法时，方法内部的 this 指向当前**子类的实例**

3. 在静态方法中使用

- super 指向父类 Person，就可以使用父类的静态方法
- 通过 super 调用父类方法，this 指向**子类**

```
  class Person{
    constructor(name,sex){
      this.name = name;
      this.sex =sex;
      this.say = () => {
        console.log('say '+this.name);
      }
    }
    speak(){
      console.log('speak')
    }
    static speak(){
      console.log('static speak')
    }
  }
  Person.version = '1.0';
  class Programmer extends Person {
    constructor(name,sex){
      super(name,sex);
      super.speak(); // speak
    }
    static speak(){
      super.speak()
    }
  }
  const zs = new Programmer('zs','男');
  Programmer.speak(); // static speak
```

4. 注意事项

- 直接打印 super 会报错

### class 注意事项
