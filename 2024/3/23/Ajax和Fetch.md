## Ajax

- Ajax 是异步 JavaScript 和 XML 的简写
- Ajax 的异步：可以异步地向服务器发送请求，在等待响应的过程中，不会阻塞当前页面，浏览器可以做自己的事情。直到成功后才处理响应数据
- XML 是前后端数据通信时创建数据的一种格式，现在常用的是 JSON
- AJAX 其实是浏览器和服务器之间的一种异步通信方式，可以在不重新加载整个页面，更新数据

### 搭建 Ajax 环境

- Ajax 需要服务器环境

### 原生 Ajax

#### 基本用法

- Ajax 需要 XMLHttpRequest 它是一个构造函数

```
const xhr = new XMLHttpRequest();
// 准备发送请求,xhr.open('HTTP方法','地址',是否异步)
xhr.open('Get','https://www.baidu.com',true);
// 发送请求
xhr.send(null);
// 监听事件，触发xhr对象的readystatechange事件
// readystatechange有5个状态readyState判断状态变化
/**
  * 0:未初始化。尚未调用open()
  * 1:启动。已调用open()，但尚未使用send()
  * 2:发送。已调用open()，但尚未接收到响应
  * 3:接收。已接受到部分数据
  * 4:完成。已接受到全部数据，而且可以在浏览器中使用了
  *
  */
xhr.onreadystatechange = (e)=>{
  if(xhr.readyState != 4)return;
  if(xhr.status>=200 && xhr.status<300 || xhr.status === 304){
    console.log('正常响应数据');
    console.log(xhr.responseText); // 响应数据会填充到xhr属性中
  }else{
    console.log('处理错误');
  }
}
```

#### GET 请求

- 携带数据，携带非英文字符最好使用 encodeURIComponent

```
xhr.open('Get','https://www.baidu.com?words=js&username=Bob',true);
```

#### POST 请求

- 携带数据：发送数据直接写在 send 的参数位置，一般是字符串
- 数据编码：携带非英文字符最好使用 encodeURIComponent

```
xhr.open('POST','https://www.baidu.com?words=js&username=Bob',true);
xhr.send('hhh');
```

### JSON

- JSON 是 Ajax 发送和接收数据的一种数据格式
- 相较于 XML，过滤无效信息
- 可以轻松和 JS 中的数据类型相互转化

#### JSON 的 3 种形式

- json 文件.json 结尾
- 没有 undefined
- json 文件中不能注释
- 对象的属性名必须使用双引号，值是字符串也必须使用双引号

```
// 简单值，对应着js中的基本数据类型
"str"
null
18
// 对象形式
{
  "name":"张三",
  "age":18
}
// 数组形式
[1,2,3,"Ggg"]
```

#### JSON 的常用方法

```
// 将JSON的字符串解析成JS中对应值
JSON.parse();
// 将JS值转化成JSON值
JSON.stringify();
xhr.send(JSON.stringify({
  username:'BOb',
  age:18
}));
```

### 跨域

- 同域：协议、域名、端口号都相同的是同域
- https 端口默认 443，http 端口默认 80
- 跨域：请求的域和当前域不同就叫跨域
- 跨域请求为什么被阻止：阻止跨域请求，是浏览器的本身的一种安全策略--同源策略

#### CORS 跨域资源共享（优先

- CORS：后端设置，Access-Control-Allow-Origin:\*便是允许任何域名请求它，只允许指定域名跨域：Access-Control-Allow-Origin:http://127.0.0.1:5500
- 使用 CORS 跨域的过程

1. 浏览器发送跨域请求
2. 后端添加 Access-Control-Allow-Origin 头信息
3. 浏览器接收响应
4. 同域，浏览器不会做什么
5. 跨域请求浏览器会从响应头中询问是否允许跨域访问
6. 允许跨域，圆满完成
7. 不允许跨域，丢弃响应结果

- IE10 以上版本跨域使用 CORS

#### JSONP

- JSON 原理 script 标签跨域不会被浏览器阻止
- JSONP 主要利用 script 标签加载跨域文件
- 使用 JSONP 接口

1. 服务器准备 JSONP 接口
2. 手动加载 JSON 接口或动态加载 JSONP 接口

### XHR 对象

#### XHR 属性

1. responseType 和 response 属性

- response 根据 responseType 属性
- responseText 只能在没有设置 responseType 时使用，responseType 默认响应类型为''字符串类型

```
responseType = '';
responseType = 'text';
responseType = 'json'
```

2. timeout 属性：设置请求的超时事件，超时取消，单位毫秒

```
xhr.timeout = 1000;
```

3. withCredentials 属性：指定发送请求时是否携带 Cookie，Ajax 发送请求，同域默认发送 cookie，跨域时不会

#### XHR 方法

1. abort()：终止当前请求，一般配合 abort 事件一起使用
2. setRequestHeader()：设置请求头，告诉服务器浏览器发送的数据是什么格式的

```
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

xhr.send('username=Bob&age=18')

xhr.setRequestHeader('Content-Type','application/json');

xhr.send(JSON.strinfify({
  username:'Bob'
}))
```

#### XHR 事件

1. load 事件

```
// xhr.readyState为4
xhr.onload=()=>{
  if(xhr.status>=200 && xhr.status<300 || xhr.status === 304){
    console.log('正常响应数据');
    console.log(JSON.parse(xhr.responseText));
    console.log(typeof xhr.responseText);
  }else{
    console.log('处理错误');
  }
}
```

2. error 事件：请求发送错误时触发

```
xhr.onerror=()=>{
  console.log('error');
}
```

3. abort 事件

```
xhr.onabort=()=>{
  console.log('请求终止')
}
```

4. timeout 事件

```
xhr.ontimeout=()=>{
  console.log('请求超时')
}
```

### Ajax 进阶

#### FormDate

- FormDate 自动添加 xhr.setRequestHeader，方便我们组装数据

```
const url = 'https://www.imooc.com/api/http/search/suggest?words=js';
const form = document.querySelector('#login');
const btn = document.querySelector('#btn');
const {username,password} = form;
btn.onclick=(e)=>{
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('POST',url,true);
  // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  // const data = `username=${username.value}&password=${password.value}`
  const data = new FormData(form);
  data.append('age',18); // 可以自己手动添加属性
  console.log(data);
  xhr.send(data);
  xhr.onload=()=>{
    if(xhr.status>=200&&xhr.status<300||xhr.status==304){
      console.log(xhr.response);
    }else{

    }
  }
}
```

#### 封装 Ajax

```

```

#### 使用 Promise 改造封装好的 Ajax

```

```

### Ajax 应用

- 搜索提示 1.html
- 二级菜单
- 多个 Ajax 请求并发执行

### Ajax 扩展

#### axios

- axios 是一个基于 Promise 的 HTTP 库，可以在浏览器和 node.js 中使用
- 第三方 Ajax 库

```
// 引入js库
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

axios({
  url,
  method: 'post',
  // responseType:'json',
  headers:{
    'Content-Type':'application/x-www-form-urlencoded'
    // 'Content-Type':'application/json'
  },
  params:{
    username:'BOb'
  },
  // 通过请求体携带的数据
  data:{
    age:18,
    sex:'male'
  }
}).then(response=>{
  console.log(response.data);
}).catch(err=>{
  console.log(err);
})
```

#### Fetch

- 替代 ajax，基于 promise

```

```
