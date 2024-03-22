## Module 模块系统

- 什么是模块：一个一个的局部作用域的代码块
- 什么是模块系统，模块系统需要解决的问题

1. 模块化问题
2. 消除全局变量
3. 管理加载顺序

### Module 模块系统的基本使用

- 只要用到 import 或 export，在使用 script 标签加载时要加上 type="module"

```
// base.js
export default BaseSlider;
// slider.js
import BaseSlider from "./base.js";
export default Slider;
// index.js
import Slider from "./slider.js";
// silder.html
<script src="./index.js" type="module"></script>
```

### Module 的导入和导出

- 一个模块没有导出也可以导入，会将被导入的代码执行一遍，也只会执行一遍
- export 和 export default 可以一起使用

1. export default 导出和 import 导入

- 一个模块只有一个 export defaule，导入时可以自己命名

```
// module.js
const age = 18;
const fn = () => {}
//export defaule age;
export default fn;

```

2. export 导出和 import 导入

- export 不能随意命名，导入导出需要花括号
- as 换名

```
// module.js
//导出声明语句
//export const age = 18;
const age = 18;
const fn = () => {}
export {// 导出要加花括号
  age,
  fn as func      // 换名
}
// index.html
import {age,func} from './module.js'
// 整体导入
import * as obj from './module.js'
```

- 同时导入，export defaule 导出的需要优先导出

```
// module.js
//导出声明语句
const age = 18;
const fn = () => {}
export {
  fn
}
export default age;
// index.html
import age from './module.js'
import {fn} from './module.js'

import age,{fn} from './module.js'
```

### Module 的注意事项和应用

1. 模块顶层的 this 指向

- 模块中，顶层的 this 指向 undefined

2. import 关键字和 import()函数

- import 命令具有提升效果，会提升到整个模块的头部，率先执行
- import 执行的时候代码还没执行
- import 和 export 只能在模块顶层，不能在代码块中执行
- import('module.js')可按需导入，放在代码块中（有兼容性问题）

3. 导入导出的复合写法

- 复合写法导出的无法在当前模块中使用

```
export {age} from 'module.js'
//等价于
import {age} from 'module.js'
export {age}
```

#### Module 的注意事项

#### Module 的应用

## Bable

- Bable：Babel 本身可以便宜 ES6 的大部分语法，比如 let、const、箭头函数、类。但对于 ES6 新增的 API，比如 Set、Map、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign()）都不能编译，需要借助其他模块
- Babel 一般配合 Webpack 来编译模块语法

### Babel 的使用方式

#### Node 和 npm

- Node.js 是个平台或工具，对应浏览器
- npm：node 包管理工具
- node -v 和 npm -v 可以查看版本
- 删除 node_module 文件，但存在 package.json 使用 npm install 可以直接下载

```
// 初始化，生成package.json文件
npm init
// 安装Babel（最新版）
npm install --save-dev @babel/core @babel/cli
// 卸载
npm uninstall --save-dev @babel/core @babel/cli
// 安装特定版本
npm install --save-dev @babel/core@7.11.0 @babel/cli@7.10.5
// 开发依赖
"devDependencies": {
  "@babel/cli": "^7.10.5",
  "@babel/core": "^7.11.0"
}
```

#### 使用 Babel 编译 ES6 代码

- 查官网

```
// 添加，通过build命令，添加一个lib目录
"scripts": {
  "build": "babel src -d lib"
},
// 安装preset-env包，决定编译es版本
npm install @babel/preset-env@7.11.0 --save-dev
// .babelrc文件，配置Babel，它为 ES2015+ 启用转换
{
  "presets": ["@babel/preset-env"]
}
// 使用Babel编译，将src下的文件编译后放在lib下
npm run build

```

```
// 编译前
let name = 'Bob';
const age = 18;

const add = (x,y) => x+y;

new Promise((reslove,rejest)=>{
  resolve('成功');
}).then(value =>{
	console.log(value);
});

Array.from('hello')

class Person{
  constructoe(name,age){
    Object.assign(this,{name,age})
  }
}
import './index.js'
```

```
// 编译后
"use strict";

require("../index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var name = 'Bob';
var age = 18;
var add = function add(x, y) {
  return x + y;
};
new Promise(function (resolve, rejest) {
  resolve('成功');
}).then(function (value) {
  console.log(value);
});
Array.from('hello');
var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }
  return _createClass(Person, [{
    key: "constructoe",
    value: function constructoe(name, age) {
      Object.assign(this, {
        name: name,
        age: age
      });
    }
  }]);
}();
```

## WebPack

1. 认识 webpack

- webpack 是静态模块打包器，当 webpack 处理应用程序时，会将这所有模块打包成一个或多个文件
- webpack 可以出路 css/js/图片、图标字体等单位
- 开发过程中存在于本地的 js/css/图片/图标字体等文件是静态的，webpack 只能处理静态文件，不能处理动态的

### Webpack 初体验

```
// 初始化
npm init
// 安装webpack需要的包，--save-dev表示开发依赖，上线不需要
npm install --save-dev webpack-cli@3.3.12 webpack@4.44.1
// 配置webpack，webpack.config.js文件，require是node的导入方式，将.src/index.js文件打包到dist下命名为my-first-webpack.bundle.js，mode:'development'开发模式
const path = require('path');

module.exports = {
  mode:'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
// 编译，编译后的文件可以在ie其他版本使用
"scripts": {
"build": "babel src -d lib",
"test": "webpack --config webpack.config.js"
}
npm run test
```

### Webpack 的 4 个核心概念

### entry 和 output

- entry：指定入口文件，但入口和多入口
- output：\_\_dirname 当前文件所在目录

```
entry: {
  main:'./src/index.js', // 主入口文件
  search: './src/search.js' //search入口文件
}
output:{
  path:path.resolve(__dirname,'dist'), // 当前目录下的dist目录
  filename: '[name].js' //输出文件名，多入口文件
}
```

### loader

- loader：加载器，让 webpack 能够处理哪些非 JS 文件的模块

- babel-loader

```
npm install babel-loader@8.1.0
// 查找所有以.js结尾的文件，排除node_modules
module:{
  rules:[
    {
      test:/\.js$/,
      exclude:/node_modules/,
      loder:'babel-loder'
    }
  ]
}
```

### core-js

- 补充其他 ES6 语法编译

```
npm install --save-dev core-js@3.6.5
// 在需要编译的文件顶部添加 import "core-js/stable";
npm run test
```

### plugins

- plugins：插件
- 在 webpack 中使用插件
- template 选项用于指定用作 HTML 模板的文件路径。简单来说，它指定了一个 HTML 文件，webpack 将根据这个模板生成最终的 HTML 文件，并将打包后的 JavaScript 文件注入到该 HTML 文件中。

```
// html-webpack-plugin插件,在保存后自动打包
const hwp = require('html-webpack-plugin')
plugin:[
  new hwp({
    template:'./3.html'
  })
]
```

### webpack 处理 css 文件

```
// 下载处理css的loader
npm install --save-dev css-loader@4.1.1
npm install --save-dev style-loader@1.2.1
// style-loader放前面
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader','css-loader']
    },
  ],
},
```
