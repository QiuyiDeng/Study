<template lang="">
  <div>
    <div class="nearby">
        <h2 class="nearby_title">附近店铺</h2>
        <div class="nearby_item" v-for="(item,index) in nearbyList" :key="index">
          <img class="nearby_item_img" :src="item.imgUrl" alt="">
          <div class="nearby_item_content">
            <h2 class="nearby_item_content_title">{{item.contentTitle}}</h2>
            <div class="nearby_item_content_tags">
              <span class="tag" v-for="tag in item.tags" :key="tag">{{tag}}</span>
            </div>
            <p class="nearby_item_content_highlight">{{item.highlight}}</p>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'NearbyView',
  setup () {
    const nearbyList = [
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        contentTitle: '沃尔玛',
        highlight: 'VIP尊享满89元减4元运费券（每月3张）',
        tags: ['月售1万', '起送¥0', '基础运费¥5']
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        contentTitle: '沃尔玛',
        highlight: 'VIP尊享满89元减4元运费券（每月3张）',
        tags: ['月售1万', '起送¥0', '基础运费¥5']
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        contentTitle: '沃尔玛',
        highlight: 'VIP尊享满89元减4元运费券（每月3张）',
        tags: ['月售1万', '起送¥0', '基础运费¥5']
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        contentTitle: '沃尔玛',
        highlight: 'VIP尊享满89元减4元运费券（每月3张）',
        tags: ['月售1万', '起送¥0', '基础运费¥5']
      }
    ]
    return {
      nearbyList
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/vriables.scss';
@import '@/style/mixins.scss';
.nearby{
    &_title{
      margin: 1.6rem 0 1.4rem 0;
      font-size: 18px;
      color: $content-font-color;
      font-weight: normal;
    }
    &_item{
      display: flex;
      margin-bottom: 1.2rem;
      &_img{
        width: 5.6rem;
        height: 5.6rem;
      }
      &_content{
        margin-left: 1.6rem;
        border-bottom: .1rem solid #F1F1F1;
        padding-bottom: .8rem;
        &_title{
          font-size: 1.6rem;
          font-weight: normal;
          color: $content-font-color;
        }
        &_tags{
          font-size: 1.3rem;
          margin: .8rem 0;
          .tag:nth-child(2){
            margin: 0 1.6rem;
          }
        }
        &_highlight{
          font-size: 1.3rem;
          color: #E93B3B;

        }
      }
    }
  }
</style>
