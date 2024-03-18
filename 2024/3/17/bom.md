## BOM 浏览器对象模型

### window 对象

- window 对象时 js 脚本运行所处的窗口，这个窗口包含 document 属性，window.document 就是 document 对象

- 内置函数普遍是 window 的方法，`window.hasOwnProperty()`查看 window 有哪些属性

#### 窗口属性相关属性

![alt text](image-25.png)

- resize 事件

![alt text](image-24.png)

![alt text](image-26.png)

- scroll 事件

![alt text](image-27.png)

### Navigator 对象

![alt text](image-28.png)

### History

![alt text](image-29.png)

### Location

- 跳转页面`window.location="",winduo.location.href=""`
- `window.location.reload(true)`重新加载当前页面，参数为 true 表示从服务器强制加载
- `window.location.search`属性即为当前浏览器的 GET 请求查询参数

![alt text](image-31.png)
