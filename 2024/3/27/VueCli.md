## VueCli

### 创建项目

```
npm install -g @vue/cli
vue create demo
npm run serve
```

### vue-router

- 路由是指根据 url 的不同展示不同效果
- 只有访问页面才加载页面代码，异步加载路由

```
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
```

- 同步路由

```
import HomeView from '../views/HomeView.vue'
```

1. <router-link to="/">跳转页面

2. <router-view/> 负责展示当前路由对应组件内容

3. 路由守卫

### Vuex

- vuex 是数据管理框架，它创建了一个全局的唯一仓库，用来存放全局的数据
- action 的第一个参数是 store，mutation 第一个参数是 state

```
import { createStore } from 'vuex'

// 创建一个新的 store 实例
export default createStore({
  state:{
   name:'Bob'
  },
  getters:{

  },
  actions:{

  },
  mutations: {
  }
})
//获取数据
this.$store.state.name;
```

- state 的数据不能直接修改

#### 修改数据

1. 派发一个 action

```
methods:{
  handleClick(){
    this.$store.dispatch('change','jack');
  }
}
```

2. store 感知到你发出了一个 change 的 action，执行 change

```
actions:{
  change({commit},name){
    setTimeout(()=>{
      commit('change',name)
    },2000);
  }
}
```

3. 提交一个 commit 触发一个 mutation
4. 对应的 mutation 被执行
5. 在 mutation 里面修改数据

```
mutations: {
  change(state, name){
    console.log('mutation change');
    state.name = name;
  }
}
```

#### mucation 里面只允许写同步代码，不允许写异步代码，在 action 里写

### compotiomApi 里的 vuex

```
import { useStore } from 'vuex';
import { toRefs } from 'vue';
setup(){
    const store = useStore();
    const {name} = toRefs(store.state);
    const handleClick = ()=>{
      store.dispatch('change','jack');
    }
    return{
      name,
      handleClick
    }
  }
```

### axios

```
impost axios from 'axios';
setup()
{
  axios.get(url).then(response=>{
    console.log(response);
  }).cahth(err=>{
    console.log(err);
  })
}
```
