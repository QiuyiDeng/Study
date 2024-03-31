<template>
  <div>
    <div class="wrapper">
      <StaicPart/>
      <NearbyViewVue/>
    </div>
    <DockerViewVue/>
  </div>
</template>
<script>
import DockerViewVue from './DockerView.vue'
import NearbyViewVue from './NearbyView.vue'
import StaicPart from './StaicPart.vue'
export default {
  name: 'HomeView',
  components: {
    StaicPart,
    DockerViewVue,
    NearbyViewVue
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/vriables.scss';
@import '@/style/mixins.scss';
.wrapper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 5rem;
  overflow-y: auto;
  padding: 0 1.8rem .3rem 1.8rem;

}

</style>
