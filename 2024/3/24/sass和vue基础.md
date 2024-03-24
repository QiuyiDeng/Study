## Sass

### 基本用法

```
// .scss
.header {
  font-size: 18px;
  .main {
    width: 200px;
  }
  &:active{
    color: red;
  }
}
// .sass
.header
  font-size: 18px
  .main
    width: 200px
  &:active
    color: red

```

- 变量，写在文件上面
- lighten(颜色,20%)// 变浅
- darken(颜色,20%) // 变深

```
$text-color: #444;
$small-font: 14px + 3px;
$default-font: 'microsoft yahei';
.header {
  font-size: $small-font;
  .main {
    width: 200px;
  }
  &:active{
    color: $text-color;
  }
}
```

- 引入样式，前面加\_默认私有

```
// _viriables.scss
$color: red;

// demo.scss
@import './viriables'
.box{
  background: $color;
}
```

- minix 混入

```
// _minix.scss
@mixin singleline-ellipis($width){
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width:$width;
}
// demo.scss

.text {
  @includes singleline-ellipis(1000px);
}
```

- @content

```
@mixin ipad {
  @media screen and (max-width: 768px){
    @content;
  }
}
.header {
  width: 1000px;
  @includes ipad {
    width: 500px;
  }
}

```

## Vue

### Vue 基本使用

- vue 里面 this 指向 vue 实例，data 中 return 的属性也可以通过 this 访问
- v-on:click 绑定事件 简写@click
- v-if 条件渲染，不要同时写循环和条件渲染，v-for 的优先级大于 v-if
- v-model="value" 双向绑定
- v-for="(item,index) of list" 循环语句
- v-bind:title="title" 属性单向绑定 简写:title

```
<div id="root"></div>
<script>
const app = Vue.createApp({
  data() {
    return {
      content: 'hello world',
      show: true,
      list:['hello','world','!'],
      inputValue:'',
      title:'hhh'
    }
  },
  methods: {
    revered(){
      this.content=this.content.split('').reverse().join('');
    },
    hidden(){
      this.show=!this.show;
    },
    addList(){
      if(this.inputValue.trim()!='')
      this.list.push(this.inputValue);
      this.inputValue = '';
    }
  },
  mounted(){

  },
  template:`<ul>
    <input type="text" v-model="inputValue">
    <button v-on:click="addList" v-bind:title="title">添加list</button>
    <li v-for="(item,index) of list">{{item}} {{index}}</li>
    </ul>`
}).mount('#root');
```

- 先创建组件再挂载
- 父模板使用组件时添加 v-bind 属性，组件可以通过 props 获取

```
template:`<ul>
  <input type="text" v-model="inputValue">
  <button v-on:click="addList">添加list</button>
  <todo-item v-for="(item) of list" v-bind:content="item"/>
</ul>`

app.component('todo-item',{
  props:['content'],
  template:`<li>{{content}}</li>`
}).mount('#root');
```

### Vue 基本语法

1. v-for，建议给循环的每一项添加:key={{item}}，item 最好是唯一的

- for in (value,key,index)
- for of (value,index)
- v-for="item in 10" 相当于[1,2,...,10]
- 在使用 v-for 不想多一层标签时，可以使用 template 占位符

2. Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

### Vue 事件相关

- 在函数需要添加参数又想获得 evevt 时，可以传入$event

```
 <button @:click="handleBtnClick(2,$event)">button</button>
```

- 想绑定多个事件,逗号间隔、加上引号

```
<button @:click="handleBtnClick(), handleBtnClick2()">button</button>
```

#### 事件修饰符

- 事件运营默认是冒泡模式

1. stop 停止冒泡

```
<button @click.stop="handleBtnClick">button</button>
```

2. self 只有点击自己才会执行事件，子标签触发不会执行

```
<div @click.self="func">...</div>
```

3. prevent 阻止默认行为
4. capture 模式变成捕获模式
5. once 事件绑定只执行一次
6. @scroll.passive 提升滚动性能

#### 按键修饰符

- @keydown.enter 当按下 enter 时执行事件
- @keydown.delete 当按下 delete 时执行事件
- @keydown.tab 当按下 tab 时执行事件
- @keydown.esc 当按下 esc 时执行事件
- @keydown.up
- @keydown.down
- @keydown.left
- @keydown.right

#### 鼠标修饰符

- @click.middle
- @click.left
- @click.right

#### 精确修饰符

- @click.ctrl 按住 ctrl 点击
- @click.ctrl.exact 只按住 ctrl 点击

#### v-model

1. input
2. textarea
3. input type="checkbox" v-model="message"，message 可以是布尔值，也可以是数组，这时可以数组存储的是 value 值

```
jack <input type="checkbox" v-model="message" value="jack" />
Bul <input type="checkbox" v-model="message" value="Bul" />
Aili <input type="checkbox" v-model="message" value="Aili" />
```

4. radio，这时 message 可以是字符串，存储的是选中的 value 值

```
jack <input type="radio" v-model="message" value="jack" />
Bul <input type="radio" v-model="message" value="Bul" />
Aili <input type="radio" v-model="message" value="Aili" />
```

5. select，message 为字符串，选择后 message 为 option 的 value 值

- multiple 多选时，message 可以为数组

```
<select v-model="message" >
  <option disabled value=''>未选中</option>
  <option value='A'>A</option>
  <option value='B'>B</option>
  <option value='C'>C</option>
</select>
{{message}}

```

6. checkbox 高级，message 为字符串，true-value 和 false-value 可以设置 true 和 false 时绑定的值

```
<div>
  <input type="checkbox" v-model="message" true-value="jack" false-value="Bob"/>
  {{message}}
</div>
```

#### 修饰符

1. lazy 修饰符，失去焦点时才发生变化

```
<input v-model.lazy="message"/>
```

2. number 修饰符，可以做类型转化成数值类型

```
<input v-model.number="message"/>
```

3. trim，将前后空格去除

### Vue 基础

- createApp 表示创建一个 Vue 应用，存储到 app 变量中
- 传入的参数表示这个应用最外层的组件应该如何展示
- vm 代表 vue 应用的根组件
- mvvm 设计模式，model 数据、view 视图、viewModel 视图数据连接层

```
const app = Vue.createApp({
  data() {
    return {
      message:'hello'
    }
  },
  template:`
    <div>{{message}}</div>
  `
});
const vm = app.mount('#root');
```

### Vue 生命周期函数

![alt text](https://cn.vuejs.org/assets/lifecycle_zh-CN.FtDDVyNA.png)

- 在某一时刻自动执行的函数

#### beforeCreate

- 数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到 data、computed、watch、methods 上的方法和数据。

#### created

- 实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 $el 属性。

#### beforeMount

- 在挂载开始之前被调用，相关的 render 函数首次被调用。实例已完成以下的配置：编译模板，把 data 里面的数据和模板生成 html。此时还没有挂载 html 到页面

#### mounted

- 在 el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的 html 内容替换 el 属性指向的 DOM 对象。完成模板中的 html 渲染到 html 页面中。此过程中进行 ajax 交互。

#### beforeUpdate

- 响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染。

#### updated

- 在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。

#### beforeUnmount

- 组件取消挂载前

#### unmount

- 组件取消挂载，vue 应用失效，dom 完全销毁

### Vue 模板

1. v-html：直接用{{message}}放在标签里会自动转义，不想转义时使用

```
<div v-html="message"></div>
```

2. v-bind：想让属性值使用变量

3. v-if：标签是否展示

4. v-on：事件绑定

### Vue 属性

- computed 和 method 都能实现的，建议使用 computed 因为有缓存
- computed 和 water 都能实现的，建议使用 computed，更简洁

### data

### method

- 方法，页面渲染就重新计算

### computed

- 计算属性，当计算属性依赖的内容发生变更时，才会重新计算
- 能使用计算属性和方法，优先使用计算属性

```
<div >{{total}}</div>

computed:{
  total(){
    return Date.now();
  }
},
```

### watch

- 需要先定义初始值，监听变量改变，函数执行
- current 新值，prev 旧值

```
watch:{
  price(current,prev){
    this.newTotal = current* this.price;
  }
},
```

### Vue 样式

```
// css
.red{
  color:red;
}
.green{
  color:green;
}
.brown{

}
// html
<div class="classObject"></div>

// js
data(){
  return {
    classObj :{
      red:false,
      green:true
    },
    classArr:['red','green',{brown:true}]
  }
}
```

- 子组件最外层不只一个标签，想用父组件的样式使用$attrs

```
const app = Vue.createApp({
  template:`<div class="green"></div>`
})
app.compontent('demo',{
  template:`
  <div :class="$attrs.class"></div>
  <div :class="$attrs.class"></div>
  `
})
app.mount('#root');
```

- vue 内联样式写法扩展

```
const app = Vue.createApp({
  data(){
    return{
      styleObj:{
        color:'red',
        background:'yellow'
      }
    }
  },
  template:`<div :class="styleObj"></div>`
})
```

### Vue 条件渲染

#### v-if

- 通过控制元素在 dom 上的存在与否

#### v-show

- 控制 style 的 display 是否为 none
- 频繁控制使用，性能好

#### v-else、v-else-if

- if 和 else-if、else 需要写在一起

```
<div v-if="num===1">111</div>
<div v-else-if="num===2">111</div>
<div v-else>222</div>
```
