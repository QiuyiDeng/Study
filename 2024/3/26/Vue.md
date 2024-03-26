## Vue

### mixin 混入

- 使一个组件可以继承另一个组件的组件选项。
- mixin 创建类似组件，组件 data 优先级>mixin 的 data
- 生命周期函数都会执行，先执行 mixin 里面的再执行组件里面的

```
const myMixin = {
  data(){
    return {
      number:2
    }
  }
}
const app = Vue.createApp({
  data() {
    return {
      number:1,
      show:false
    }
  },
  mixins: [myMixin],
  methods:{
  },
  template:`
      <div >{{number}}</div>
  `
})
```

#### mixin 基础语法

- 谁引入谁使用，子组件不能用父组件添加的 mixins

1. 全局 mixin，默认注入所有组件

```
app.mixin({
  {
      data(){
        return {
          number:2
        }
      }
    }
})
```

- 自定义属性`this.$options.number`
- 定义 mixin 混入优先级大于组件的优先级

```
app.config.optionMergeStrategies.number=(mixinVlaue,appValue)=>{
  return mixinValue || appValue;
}

```

### 自定义指令

- directive 创建自定义指令，v-focus 使用指令
- app.directive 全局自定义指令

```
app.directive('focus',{
  mounted(el){
    el.focus();
  }
})
const dircetives = {
  focus: {
    mounted(el){
      el.focus();
    }
  }
}
app.component('child',{
  directives:drectives,
  template:'<div>child</div>'
})
```

- binding.arg 可以获取指令:后面的元素

```
const app = Vue.createApp({
  template:`
    <div v-pos:tip="300" class="header">
      <input/>
    </div>
      `
})
app.directive('pos',{
  mounted(el,binding){
    console.log(binding);
    el.style[binding.arg]=binding.value+'px';
  },
  updated(el, binding){
    el.style[binding.arg]=binding.value+'px';
  }
})
```

### Teleport 传送门

- `<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

```
//
.area{
  position: absolute;
  width: 200px;
  height: 200px;
  background: green;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.mask{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: .5;
}
//
const app = Vue.createApp({
  data() {
    return {
      show:false
    }
  },
  template:`
    <div class="area">
      <button @click="show=!show">按钮</button>
      <Teleport to="body">
        <div class="mask" v-show="show"></div>
      </Teleport>
    </div>
      `
})
```

### render 函数

- 用于编程式地创建组件虚拟 DOM 树的函数。
- template -> render -> h -> 虚拟 dom （JS 对象）->真实 dom ->展示到页面上
- 第三个参数是可以是数组

```
 const app = Vue.createApp({
      template:`
        <div >
          <my-title :level="1">
            hello
          </my-title>
        </div>
          `
    })
    app.component('my-title',{
      props:['level'],
      render() {
        const {h} = Vue;
        // 虚拟dom {}指属性
        return h('h'+this.level,{},this.$slots.default())
      }
      // ,
      // template:`
      //     <h1 v-if="level===1"><slot/></h1>
      //     <h2 v-if="level===2"><slot/></h2>
      //     <h3 v-if="level===3"><slot/></h3>
      //     `
    })
```

### 插件的创建和使用

- 插件 (Plugins) 是把通用性功能封装起来。
- 一个插件可以是一个拥有 install() 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的应用实例和传递给 app.use() 的额外选项作为参数

```
// 使用插件
app.use(myPlugin, {
  /* 可选的选项 */
})
// 创建插件
const myPlugin = {
  install(app, options) {
    // 配置此应用
    app.provide('name','xiao ming');
    app.directive('focus',{
      mounted(el){
        el.focus();
      }
    });
    app.mixin({
      data(){
        number:1
      }
    });
    app.config.globalProperties.$sayHello = 'hello world'; //添加全局属性，$表示底层/自己创建的，用this.$sayHello()调用
  }
}
```

- 校验器

```
const app = Vue.createApp({
  data() {
    return {
      name:'Bob',
      age:18
    }
  },
  rules:{
    age:{
      validata:(age)=>age>25,
      message:'to young, to simple'
    },
    name:{
      validata:(name)=>name.length>=4,
      message:'name error'
    }
  },
  template:`
    <div >
      name:{{name}}-age:{{age}}
    </div>
      `
})

const valuaPluign = {
  install(app,options){
    app.mixin({
      created(){
        for(let key in this.$options.rules){
          const item = this.$options.rules[key];
          this.$watch(key,(value)=>{
            const result = item.validata(value);
            if(!result)console.log(item.message);
          })

        }
      }
    })
  }
}
app.use(valuaPluign);
```

### Vue Composition Api

- setup 在 created 实例完全初始化之前

```
    const app = Vue.createApp({
      setup(props, context) {
        // 没有this
        return{
          name: 'dell',
          age:17
        }
      },
      template:`
        <div >
          name:{{name}}-age:{{age}}
        </div>
          `
    })
```

#### ref 和 refs

- ref 和 refs 是响应式引用，ref 处理基础数据，reactive 处理非基础数据
- setup 导出的变量非响应式变量
- 原理：通过 proxy 对数据进行封装，当数据变化时，触发模板等内容的更新

```
const app = Vue.createApp({
setup(props, context) {
  const {ref,reactive} = Vue;
  // 'Bob' -> proxy({value:'Bob'})
  let name = ref('Bob');
  // {age:18} -> proxy({age:19})
  let person = reactive({age:19});
  setTimeout(()=>{
    name.value = 'jack';
    person.age = 20;
  },2000);
  return{
    name,
    person
  }
},
template:`
  <div >
    name:{{name}},age:{{person.age}}
  </div>
    `
})
```

#### readyonly

- readonly 返回的响应式数据不可修改

```
 const app = Vue.createApp({
  setup(props, context) {
    const {readonly,reactive} = Vue;
    let person = reactive({age:19});
    let person2 = readonly(person);
    setTimeout(()=>{
      person2.age = 30;
      person.age = 20;
    },2000);
    return{
      person2,
      person
    }
  },
  template:`
    <div >
      name:{{person2.age}},age:{{person.age}}
    </div>
      `
})
// Set operation on key "age" failed: target is readonly.

```

#### toRefs

- reactive 变量的属性值不具备响应式，但想要解构的值也具备响应式时使用
- toRefs proxy({age:17}) -> {age:proxy({value:17})}
- toRefs 结构不存在的属性没有默认值，undefined，也不具备响应式

```
const {toRefs,reactive} = Vue;
  let person = {age:19};
  let {age} = toRefs(person);
  setTimeout(()=>{
    person.age = 30; // age:30
  },2000);
```

#### toRef

- 可以将值、refs 或 getters 规范化为 refs

```
const data = reactive({name:'BOb'});
const age = toRef(data,'age'); //从data中取出属性，不存在则为空，具备响应式
```

#### contents

- attrs 父组件传过来的 None-Props 属性
- slots 表示插槽，slots.default()获取父组件插入的内容
- emit 在子组件调用父组件方法时使用

```
const app = Vue.createApp({
  setup(props, context) {
    const {attrs,slots,emit} = context;
    console.log(attrs,slots,emit);
    return{
    }
  },
  template:`
    <div >
      hello
    </div>
      `
})

```

- setup 返回的时一个虚拟 dom 时，会直接将虚拟 dom 展示到页面

```
app.component('child',{
  setup(){
    const {h} = Vue;
    return ()=>h('div',{},[123]);
  }
})

```

#### computed

- 计算属性是 ref 属性

```
//95 100
 const app = Vue.createApp({
  setup(props, context) {
    const { computed,ref  } = Vue;
    let count = ref(0);
    const handleClick=()=>{
      count.value++;
    }
    let countAddFive = computed({
      get:()=>count.value+5,
      set:(param)=>{count.value = param-5}
    })
    setTimeout(()=>{
      countAddFive.value = 100;
    },3000);
    return{
      count,
      handleClick,
      countAddFive
    }
  },
  template:`
    <div >
      <div @click="handleClick">{{count}}</div>
      <div @click="countAddFive">{{countAddFive}}</div>
    </div>
      `
  })
```

#### watch 和 watchEffect

- watch 具备 lazy，首次页面展示不执行，参数可以拿到原始和当前值
- watch 可以监听多个属性变化，参数使用数组
- watch 监听 reactive 变量的属性，第一个参数用回调函数的形式

```
const app = Vue.createApp({
  setup(props, context) {
    const { reactive, watch } = Vue;
    let person = reactive({name:'',age:18});
    watch([()=>person.name,()=>person.age],([currentNameValue,currentageValue],[prevNameValue,prevageValue])=>{
      console.log(currentNameValue,prevNameValue,currentageValue,prevageValue);
    })
    return{
      person
    }
  },
  template:`
    <div >
      Name：<input v-model="person.name"/>
      Age<input v-model="person.age"/>
      <div>{{person.name}} is {{person.age}}</div>
    </div>
      `
})
```
