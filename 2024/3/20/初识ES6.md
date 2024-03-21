## ES6 简介

### ECMAcript

- ECMScript 是标准化组织制定的语言标准（语法和 API）

- 历史版本 ES1~3、ES5~6，ES4 被废弃了

- ES6+、ES2015+

### ES 与 JavaScript 的关系

- javaSript = ECMAScript+DOM+BOM

### ES3

- do while、swith、正则表达式

### ES5

- forEach、map、filter、Object.creat、Object.defineProery

### ES6

#### ES6 的兼容性

- 主流浏览器的最新版本几乎全部支持 ES6
- IE 老版本等不支持的浏览器，可以使用**Babel** 转码

#### let 和 const

- let 和 const：用来声明变量或声明常量
- var 声明变量，let 代替 var 声明变量，const 声明常量

#### 变量和常量

- 变量初始化后可以重新赋值
- 常量初始化后不可以重新赋值

#### const

- 为什么需要 const：为了哪些一旦初始化就不希望重新赋值的情况设计
- 注意事项：一旦声明就必须初始化
- const 声明的常量，允许在不重新赋值的情况下修改它的值 1.基本数据类型不可能 2.引用数据类型可以单独改变它的属性值

#### let、const 与 var 的区别

1. 重复声明
   > var 允许重复声明，let、const 不允许
2. 变量提升
   > var 会提升变量的声明到当前作用与的顶部，let 和 const 不存在变量提升
3. 暂时性死区
   > 只要作用域内存在 let、const，它们所声明的变量或常量就自动绑定这个区域，不再搜到外部作用域的影响

```
// 报错，存在let a，所以a不会向上寻找，但是b可以
let a = 2;
let b = 3;
function func(){
  console.log(a,b);
  let a =1;
}
func();
```

4. window 对象属性和方法
   > 全局作用域中，var 声明的变量，通过 function 声明的函数，会自动变成 window 对象的属性和方法
5. 块级作用域

- 什么是块级作用域：{}
- var 没有块级作用域

```
for(var i=0;i<5;i++)console.log(i); // i在全局作用域
console.log(i);// 5

for(let i=0;i<5;i++)console.log(i); //块级作用域
console.log(i); //报错，i没有定义
```

- 作用域链：内层作用域->外层作用域->……->全局作用域

```
function func(){
  for(var i = 0;i < 3; i++)console.log(i);
  console.log(i); // 3
}
func();
console.log(i); // i is not defined

function func(){
  for(let i = 0;i < 3; i++)console.log(i);
  console.log(i); // i is not defined
}
func();
```

- 有哪些块级作用域：花括号{}、for、while、do while、switch、if（function 是函数作用域，对项的{}不算）

#### let 和 const 的应用

#### 模板字符串

- ``反引号，空格和缩进会被保留
- \\` 输出反引号,\\\\输出反斜杠

```
const person ={
   name:'Bob',
   age:12,
   sex:'male'
}
const str = `name:${name},age:${age},sex:${sex}`;
```

#### 箭头函数

- 箭头函数：`const add=(a,b)=>{return a+b};`
- 箭头函数的结构：const/let 函数名 = 参数 => 函数体
- 箭头函数注意事项

1. 单个参数:单个参数可以省略圆括号
   `const add = a =>{return a+1}`
2. 单个函数体：只有 return 语句可以省略花括号和 return
   `(x,y) => x+y`

### this 指向

#### 全局作用域中的 this 指向 window

#### 一般函数（非箭头函数）中的 this 指向

- this 指向只和谁调用有关

```
'use strict'; //开启严格模式
function add(){
   console.log(this);
}
add();// undefined->window，在非严格模式下自动转换
```

#### 箭头函数中的 this 指向

- 箭头函数没有自己的 this，需要作用域链往上找
- 箭头函数返回带花括号的对象，会被识别为函数体的花括号，需要外面加一层圆括号

```
const cala = {
   add:()=>{
      console.log(this);
   }
};
calc.add();// window

const cale = {
   add:function(){
      const adder = () =>{
         console.log(this);
      };
      adder();
   }
}
cale.add();// cale
```

#### 不适用箭头函数的场景

1. 作为构造函数

2. 需要 this 指向调用对象时：使用 dom 事件时

3. 使用 arguments 时

#### 箭头函数的应用

```
const btn = documrnt.getElementById('btn');
const result = documrnt.getElementById('result');
// const timer ={
//    time:0,
//    start:function(){
//       btn.addEventLisenter('click',function(){
//          setInterval(function(){
//             this.timer++; // this指向window
//             result.innerText = this.timer;
//          },1000)
//       },false)
//    }
// }
// const timer ={
//    time:0,
//    start:function(){
//       btn.addEventLisenter('click',function(){
//          setInterval(()=>{
//             this.timer++; // this指向btn
//             result.innerText = this.timer;
//          },1000)
//       },false)
//    }
// }
const timer ={
   time:0,
   start:function(){
      btn.addEventLisenter('click',()=>{
         setInterval(()=>{
            this.timer++; // this指向timer
            result.innerText = this.timer;
         },1000)
      },false)
   }
}
timer.start();
```

### 数组的解构赋值

- 解构赋值[1,2,3] -> 1,2,3，解析某一数据结构，将我们想要的东西提取出来，赋值给变量或常量
- 结构赋值的原理

1. 模式（结构）匹配
   `[] = [1,2,3]`
2. 索引值相同完成匹配
   `const [a,b,c] = [1,2,3]`

- 不取的可以默认跳过

```
const arr = [1,2,3];
const [a,[b,c]] = [1,[2,3]];
console.log(a,b,c); // 1,2,3
```

#### 默认值的基本用法

- 默认值生效条件：只有当一个数组成员严格等于（===）undefined 时，对应的默认值才会生效
- 默认值表达式：如果默认值是表达式时，默认表达式是惰性的

```
const [a,b] = []; // a:undefined,b:undefined
const [a=0,b=1] = []; // a:0,b:1
function func(){
   console.long('执行');
   return 2;
}
const [x=func()] = [1];
console.log(x);// 2
```

#### 常见类数组的解构赋值

1. arguments

```
function func(){
   console.log(arguments);
   return [a,b] = arguments; // 1,2
}
func(1,2); // [1,2]
```

2. NodeList

```
console.log(document.querySelectorAll('p'));
const [p1,p2,p3] = document.querySelectorAll('p');
```

3. 函数参数的解构赋值

```
const arr = [1,2];
const add = ([a=0,b=0]) => a+b;
console.log(add(arr)); // 3
```

4. 交换变量的值

```
[a,b] = [b,a];
```

### 对象的结构赋值

1. 模式匹配：`{} = {}`

2. 属性名相同匹配

```
const {'username':username,'age':age} = {username:'Bob',age:18}; // 顺序无所谓
{username,age} = {username:'Bob',age:18}; // 顺序无所谓

const {usernema:uname,age:age} = {usernema:'Bob',age:12}; // 取别名，前面的username赋值给后面的uname
console.log(age,uname); // 12 'Bob'
```

#### 对象结构赋值注意事项

- 对象结构值的默认值

```
const {username = "Zhangsan"} = {username:"Bob"};
```

- 经一个已经声明的变量用于结构赋值

```
let x = {};
{x} = {x:1};
```

- 可以取到继承的属性

```
const {toString} = {};
console.log(toString);
```

#### 函数参数的结构赋值

```
const fun = ({username,age}) => conlose.log(username,age);
fun({username:'hhh',age:18});
```

### 其他类型的结构赋值

#### 字符串的结构赋值

- 既可以用数组的结构赋值，也可以用字符串的结构赋值

```
const [a,b] = 'hello'; // 'h','e'

const {0:a} = 'hello'; // 'h'
```

#### 数值和布尔值的结构赋值

- 先将等号右边的值转成对象
- undefined 和 null 无法转化位对象，所以结构赋值会报错

```
// 123 -> new Number(123)
const {a} = 123; //undefined

// true -> new Boolean(true)
const {a} = true; //undefined

```

### 字面量

- 对象字面量：

```
// 实例化构造函数生成对象
const person = new Object();
// 对象字面量
const person ={}
```

#### 属性的简洁表示法

- 键名和变量或常量名相同时，可以只写一个

```

const person ={
   age:age
}
const person ={age}
```

#### 方法的简洁表示法

- 方法可以省略冒号和 function

```
const person ={
   speak(){

   }
}
```

#### 方括号语法

- 方括号语法可以写在字面量中

```
const proto = 'age';
const person ={

}
person.proro = 18; {proto:18};
person[proto] = 18; {age:18}

const person ={
   [proto]:18
}
```

### 函数参数的默认值

- 函数参数的默认值：调用函数的时候传参了，就用传递的默认值；如果没传参，就用默认值 undefined

```
const multiply = (x=0,y=0)=>{
   return x+y
}

```

#### 函数参数默认值注意事项

- 生效条件：不传参数，或者明确的传递 undefined 作为参数，只有这两种情况，默认值才会生效

- 默认值表达式：如果默认值时表达式，默认表达式是惰性求值的

- 设置默认值技巧：函数参数的默认值，最好从参数列表右边开始设置
