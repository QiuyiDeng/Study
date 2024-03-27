<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div @click="handleClick">{{ name }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from 'vuex';
import { toRefs } from 'vue';
export default {
  name: 'HomeView',
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
}
</script>
