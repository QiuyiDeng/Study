## 数组

### 什么是数组

> 顾名思义，用来存储一组相关的值，方便求和、遍历等

### 定义数组

` var arr = ['A','B','C'];`

` var arr = new Array('A','B','C');`

` var arr = new Array(4);`

### 访问数组项

- 数组的下标从 0 开始
  ` console.log(arr[0])`

#### 下标越界：访问数组中不存在的项会返回 undefined，不会报错

### 数组长度 ` arr.length`

### 更改数组项

![alt text](image-14.png)

### 数组的遍历

```
var arr = ['A','B','C','D'];
for(var i = 0;i < arr.lenth; i++){
  console.log(arr[i]);
}
```

### 数组类型的检测

- 数组用 typedef 检测结果是 object
- Array.isArray()方法可以检测数组，返回布尔类型

### 数组的常用方法

#### 数组的头尾操作方法

![alt text](image-15.png)

```
var arr = [1,2,3,4,5]
arr.push(6)
console.log(arr);// [1, 2, 3, 4, 5, 6]
arr.pop()
console.log(arr);// [1, 2, 3, 4, 5]
arr.unshift(0)
console.log(arr);// [0, 1, 2, 3, 4, 5]
arr.shift()
console.log(arr);//[1, 2, 3, 4, 5]
```

#### 数组的 split()方法
