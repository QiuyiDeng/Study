## VUe

### 组件

- 组件有复用性
- 组件的数据是不共享的
- app.component() 定义的是全局组件，对性能一直有损耗
- 局部组件 Counter，首字母大写，和普通变量区分开，像 HelloWorld 在使用时可以用 hello-world 的方式

```
const Counter = {
  data() {
    return {
      count :1
    }
  },
  template:`<div>{{count}}</div>`
}
const app = Vue.createApp({
  components:{
    Counter:Counter
  },
  template:`<div><Counter/></div>`
})
```

#### 组件的传值

1. 父->子

```
const app = Vue.createApp({
  data() {
    return {
      num:123
    }
  },
  template:`<div><test :content="num"/></div>`
})
app.component('test',{
  props:['content'],
  data() {
    return {
      count :1
    }
  },
  template:`<div>{{content}}</div>`
})
```

- 子校验，错误提示警告
- required 必填，default 默认值
- validator 方法，满足要求

```
props:{
  content:Number
}
props:{
  content:{
    type: Number,
    required: true,
  }
}
props:{
  content:{
    type: Number,
    validator: function(value){
      return value<1000
    },
    default :0
  }
},
```

- 传递多个参数

```
 const app = Vue.createApp({
  data() {
    return {
      params:{
        a:1,
        b:2,
        c:3
      }
    }
  },
  template:`<div><test v-bind="params" /></div>`
  //template:`<div><test :a="params.a" :b="params.b" :c="params.c" /></div>`
})
app.component('test',{
  props:['a','b','c'],
  data() {
    return {
      count :1
    }
  },
  template:`<div>{{a}}-{{b}}-{{c}}</div>`
})
```

- 传递的变量不要用驼峰命名用-，接收可以用驼峰

```
//
  template:`<div><test :content-abc="content" /></div>`

//
  props:['contentAbc'],

```

- 单向数据流，父组件流向子组件的数据，只能用不能修改的

`Attempting to mutate prop "count". Props are readonly.`

```
const app = Vue.createApp({
  data() {
    return {
      count:1
    }
  },
  template:`<div>{{count}}<test :count="count" /></div>`
})
app.component('test',{
  props:['count'],
  template:`<div @click="count+=1">{{count}}</div>`
})
```

- Non-Props 属性
  父组件向子组件传值，但子组件不接收，vue 会放在子组件标签中
  `inheritAttrs:false`可以不放在子组件标签中

2. 父子组件通信

- 子组件通过$emit 调用父组件方法

```

const app = Vue.createApp({
  data() {
    return {
      count:1
    }
  },
  methods:{
    handleAddCount(){
      this.count++;
    }
  },
  template:`<div>{{count}}<test :count="count" @add-one="handleAddCount" /></div>`
})
app.component('test',{
  props:['count'],
  methods: {
    handleClick(){
      this.$emit('addOne');
    }
  },
  template:`<div @click="handleClick">{{count}}</div>`
})
```

- emits 显示向外触发哪些事件

```
emits:{
  add:(count)=>{
    if(conut>0)return true;
    return false;
  }
}
```

- 使用 v-model，双向传值

```
const app = Vue.createApp({
  data() {
    return {
      count:1
    }
  },
  template:`<div>{{count}}<test v-model="count" /></div>`
})
app.component('test',{
  props:['modelValue'],
  methods: {
    addCount(){
      this.$emit('update:modelValue',this.modelValue+1);
    }
  },
  template:`<div @click="addCount">{{modelValue}}</div>`
})
```

- modelModifiers 接收创建事件修饰符

```
const app = Vue.createApp({
  data() {
    return {
      count:'a'
    }
  },
  template:`<div>{{count}}<test v-model="count" /></div>`
})
app.component('test',{
  props:{
    'modelValue': String,
    'modelModifiers':{
      default:()=>({})
    }
  },
  mounted() {
    console.log(this.modelModifiers);
  },
  methods: {
    addCount(){
      let newValue = this.modelValue;
      if(this.modelModifiers.uppercase){
        newValue = newValue.toUpperCase();
      }
      this.$emit('update:modelValue',newValue+'b');
    }
  },
  template:`<div @click="addCount">{{modelValue}}</div>`
})
```

### 插槽

#### solt

- slot 不能直接绑定事件
- 父模板里调用的数据都是副模版的数据，子模版里调用的数据都是子模版的数据
- slot 标签中间可以添加默认值

```
const app = Vue.createApp({
  template:`<div>
    <myform><div>提交</div></myform>
    <myform><button>提交</button></myform>
      </div>`
})
app.component('myform',{
  data() {
    return {
      value:''
    }
  },
  methods: {
    handleClick(){
      console.log(this.value);
    }
  },
  template:`<div @click="handleClick"><input v-model="value"/><slot/></div>`
})
```

#### 具名插槽

- v-slot 具名插槽，使用多个插槽
- 插槽简写#header

```
const app = Vue.createApp({
  template:`
  <layout>
    <template v-slot:header><div>header</div></template>
    <template #footer><div>footer</div></template>
  </layout>
  `
})
app.component('layout',{
  template:`
    <div>
      <slot name="header"></slot>
      <div>content</div>
      <slot name="footer"></slot>
    </div>
  `
})
```

#### 作用域插槽

- 子传给父数据，父通过 v-slot 名调用，可以使用解构语法

```
const app = Vue.createApp({
//  template:`
//  <list v-slot="slotProps">
//    <div >{{slotProps.item}}</div>
//  </list>
//  `
template:`
  <list v-slot="{item}">
    <div >{{item}}</div>
  </list>
  `
})
app.component('list',{
  data() {
    return {
      list:[1,2,3]
    }
  },
  template:`
    <div>
      <slot v-for="item of list" :item="item"/>
    </div>
  `
})
```

### 动态组件和异步组件

#### 动态组件

- 根据数据变化，通过 component 标签动态展示组件

```
const app = Vue.createApp({
  data() {
    return {
      currentItem:'input-item'
    }
  },
  methods: {
    handleClick(){
      this.currentItem = this.currentItem==='input-item'?'common-item':'input-item';
    }
  },
  // template:`
  // <button @click="handleClick">切换</button>
  // <input-item v-show="currentItem==='input-item'"/>
  // <common-item v-show="currentItem==='common-item'"/>
  // `
  template:`
  <button @click="handleClick">切换</button>
  <component :is="currentItem"/>
  `
})
app.component('input-item',{
  template:`
    <div>
      <input/>
    </div>
  `
})
app.component('common-item',{
  template:`
    <div>hello world</div>
  `
})
```

- keep-alive 缓存

```
<keep-alive>
  <component :is="currentItem"/>
</keep-alive>
```

#### 异步组件

```
const app = Vue.createApp({
data() {
  return {
    currentItem:'input-item'
  }
},
methods: {
  handleClick(){
    this.currentItem = this.currentItem==='saync-item'?'common-item':'saync-item';
  }
},
template:`
<button @click="handleClick">切换</button>
<keep-alive>
  <component :is="currentItem"/>
</keep-alive>
`
})

app.component('saync-item',Vue.defineAsyncComponent(() => {
return new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve({
      template:'<div>this is async component</div>'
    })
  },4000)
})
}))
app.component('common-item',{
template:`
  <div>hello world</div>
`
})
```

### 基础知识补充

#### v-once

- v-once 标签只渲染一次，数据可以发送变化但不会即时渲染

#### ref

- 用于获取 dom 元素
- 标签添加`ref="element"`，在 mounted 可以获取 dom`this.$refs.element`，组件也可以添加 ref

#### provide/inject

- 多层组件传递时使用，只能获取第一次的值，父组件数据改变子组件数据不会变
- 父组件添加 provide{conunt:1}
- 孙子组件 inject:['count']

### Vue 动画

1. 通过控制 class 名编写 css 动画
2. 控制行内 style 样式

#### transition 标签

- Vue 提供了两个内置组件，可以帮助你制作基于状态变化的过渡和动画：

1. transition

- v-show 和 v-if
- `<Transition> `会在一个元素或组件进入和离开 DOM 时应用动画。
- `<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。
  ![alt text](https://cn.vuejs.org/assets/transition-classes.2BufuvZR.png)

```
//
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>

//
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

2. 过渡命名

```
//
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
//
<Transition name="fade">
  ...
</Transition>
```

3. 自定义过渡 class

```
<!-- 假设你已经在页面中引入了 Animate.css -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

4. 同时添加动画和过渡

- type="animation"，控制以什么为主
- :duration="1000" 动画和过渡都持续 1s
- :css="false" 不使用 css

```
<transition type="animation">
  ...
</transition>
```

- 使用 done()告诉 vue 动画结束，然后执行 handleEnterEnd

```
handleBeforeEnter(el,done){
  // 开始
  done();//动画结束
}
<transition
 @before-enter="handleBeforeEnter"
 @after-enter="handleEnterEnd">
  ...
</transition>
```

#### TransitionGroup

- `<TransitionGroup>` 是一个内置组件，用于对 v-for 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

#### 状态动画
