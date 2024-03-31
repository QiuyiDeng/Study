<template lang="">
  <div>
    <div class="position">
        <span class="iconfont left">&#xe61a;</span>
        <span class="position_title">北京理工大学国防科技园2号楼10层</span>
        <span class="iconfont right">&#xe60f;</span>
      </div>
      <div class="search">
        <span class="iconfont search_icon">&#xe600;</span>
        <span class="search_title">山姆会员商店优惠商品</span>
      </div>
      <div class="banner">
        <img class="banner_img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
      </div>
      <div class="nav">
        <ul class="nav_list">
          <li class="nav_list_item" v-for="(item,index) in navList" :key="index" >
            <img class="nav_list_item_img" :src="item.img" alt="">
            <span class="nav_list_item_title">{{item.title}}</span>
          </li>
        </ul>
      </div>
      <div class="gap"></div>
  </div>
</template>
<script>
export default {
  name: 'StaicPart',
  setup () {
    const navList = [
      { img: 'http://www.dell-lee.com/imgs/vue3/超市.png', title: '超市便利' },
      { img: 'http://www.dell-lee.com/imgs/vue3/菜市场.png', title: '菜市场' },
      { img: 'http://www.dell-lee.com/imgs/vue3/水果店.png', title: '水果店' },
      { img: 'http://www.dell-lee.com/imgs/vue3/鲜花.png', title: '鲜花绿植' },
      { img: 'http://www.dell-lee.com/imgs/vue3/医药健康.png', title: '医药健康' },
      { img: 'http://www.dell-lee.com/imgs/vue3/家居.png', title: '家居时尚' },
      { img: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png', title: '烘培蛋糕' },
      { img: 'http://www.dell-lee.com/imgs/vue3/签到.png', title: '签到' },
      { img: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png', title: '大牌免运' },
      { img: 'http://www.dell-lee.com/imgs/vue3/红包.png', title: '红包套餐' }]
    return {
      navList
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/vriables.scss';
@import '@/style/mixins.scss';
.position{
    padding: 1.6rem 0;
    line-height: 2.2rem;
    @include ellipse;
    &_title{
      font-size: 1.6rem;
      color: $content-font-color;
    }
    .left{
      margin-right: .85rem;
      font-size: 1.6rem;
    }
    .right{
      float: right;
      font-size: 1.9rem;
    }
  }
  .search{
    box-sizing: border-box;
    height: 3.2rem;
    width: 100%;
    background-color: #F5F5F5;
    border-radius: 1.6rem;
    line-height: 3.2rem;
    padding: 0 1.6rem;
    &_icon{
      color: #B7B7B7;
      margin-right: 1.2rem;
      font-size: 1.6rem;
    }
    &_title{
      font-size: 14px;
      color: #B7B7B7;
    }
  }
  .banner{
    margin-top: 2rem;
    width: 100%;
    height: 0;
    padding-bottom: 25.4%;
    &_img{
      width: 100%;
    }
  }
  .nav{
    margin-top: 16px;
    &_list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      &_item{
        width: 20%;
        margin-bottom: 1.6rem;
        justify-content: space-between;
        text-align: center;
        &_img{
          width: 4rem;
          display: block;
          margin: 0 auto;
          margin-bottom: .6rem;
        }
        &_title{
          color: $content-font-color;
          font-size: 12px;
        }
      }
    }
  }
  .gap{
    margin: 0 -1.8rem;
    height: 1rem;
    background: #F1F1F1;
  }
</style>
