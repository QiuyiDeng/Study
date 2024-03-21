## ES6

### 剩余参数

- 剩余参数是个数组，即使没有值，也是空数组

```
const add = (x,y,z,...arr) =>{
  console.log(arguments);
}
add(1,2,3,4,5,6);
```

#### 剩余参数注意事项

1. 箭头函数的剩余参数
   > 虽然单个参数可以省略圆括号，但剩余参数不可以省略
2. 可以用剩余参数代替 arguments 获取参数
3. 剩余参数只能是最后一个参数

```
/**
    reduce() 方法是 JavaScript 数组对象的一个高阶函数，用于对数组中的每个元素执行一个指定的回调函数，并将结果累积起来。
    它接受一个回调函数作为参数，这个回调函数可以接受四个参数：accumulator（累加器）、currentValue（当前值）、currentIndex（当前索引）和array（原始数组）。
 */
const add = (...arr) => {
  return arr.reduce((sum,currentValue)=>{
    return sum + currentValue;
  },0);// 累加器初始值
}
console.log(add(1,2,3)); //6
```

4. 剩余参数结构赋值也可以使用，叫剩余元素

```
const [num,...arr] = [1,2,3,4];
console.log(num,arr);
const {x,t,...z} = {a:3,x:1,y:2,b:4};
console.log(x,y,z);// 1 2 {a:3,b:4}
```

### 数组的展开运算符

```
console.log(Math.min(...[1,2,3,4]));
```

#### 区分剩余参数和展开运算符

- 展开运算符：[3,1,2] => 3,1,2

- 剩余参数： 3,2,1 => [3,2,1]

#### 数组展开运算符的应用

- 复制数组

```
// 深拷贝
  const a = [1,2,{x:3}];
  const b = [...a]; // [1,2,3]
  a[2] = {x:4};
  console.log(a,b);
// 合并数组
  const a= [1,2];
  const b= [3,4];
  const c = [...a,...b]; // [1,2,3,4];
// 字符串转数组
   const str = 'hello';
   console.log([...str]); // ['h','e','l','l','o']
// 常见类数组转化成数组
  function func(){
    console.log([...arguments]);
  }
  conat p_list = document.querySelectorAll('p');
  console.log([...p_list]);
```

### 对象展开运算符

- 展开对象必须在{}中展开

```
 const person = {
  color: 'red',
  shape: '球形'
 };
 console.log({...person}); // 新对象，相当于复制
```

- 合并对象

```
 const apple = {
  color: 'red',
  shape: '球形'
 };
 const pen = {
  color: 'black',
  shape: '圆柱形'
 };
 console.log({...person,...pen}); //  相当于属性罗列，重复属性后面覆盖前面的
```

#### 对象展开符的注意事项

1. 空对象展开

```
console.log({...{},a:1}); // {a:1}
```

2. 非对象的展开

```
console.log({...1}); //{}
console.log({...undefined}); // {}
console.log({...'hhhh'}); // {0:'h',1:'h',2:'h'}
console.log({...[1,2,3]}); // {0:1,1:2,2:3}
```

3. 对象中的对象属性的展开，不会展开对象中的属性

```
const apple ={
  feature:{
    taste:'甜'
  },
  use:'写字'
};
console.log({...apple});// {feature:{taste:'甜'},use:'写字'}

```

#### 对象展开符的应用

1. 复制对象

```
const a = {x:1,y:2};
const b = {...a};
```

2. 用户参数和默认值

```
const person = {
  age:0,
  sex:'male'
};
const Bob = {name:'Bob',...person};

```
