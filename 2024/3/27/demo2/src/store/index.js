import { createStore } from 'vuex'

// 创建一个新的 store 实例
export default createStore({
  state:{
   name:'Bob'
  },
  getters:{

  },
  actions:{
    change({commit},name){
      setTimeout(()=>{
        commit('change',name)
      },2000);
    }
  },
  mutations: {
    change(state, name){
      console.log('mutation change');
      state.name = name;
    }
  }
})
