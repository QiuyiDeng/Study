<template lang="">
  <div>
    <div class="docker">
      <div v-for="(item,index) in dockerList" :key="index" :class="{'docker_item':true,'active':index===0}" >
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker_item_title">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DockerView',
  setup () {
    const dockerList = [
      { icon: '&#xe6d0;', text: '首页' },
      { icon: '&#xe68a;', text: '购物车' },
      { icon: '&#xe670;', text: '订单' },
      { icon: '&#xecd7;', text: '我的' }
    ]
    return {
      dockerList
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/vriables.scss';
@import '@/style/mixins.scss';
.docker {
  box-sizing: border-box;
  display: flex;
  position: absolute;
  padding: 0 1.8rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4.9rem;
  background-color: #fff;
  border-top: 1px solid #F1F1F1;
  &_item {
    flex: 1;
    text-align: center;
    color: $content-font-color;
    &_title{
      font-size: 2rem;
      transform: scale(.5,.5);
      transform-origin: center top;
    }
    .iconfont {
      margin-top: .7rem;
      margin-bottom: .2rem;
      font-size: 2rem;
    }
  }
  .active{
    color: #1FA4FC;
  }
}
</style>
