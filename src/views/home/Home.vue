<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" 
    v-show="isFixed"  class="tab-control" :class="{fiexd:isFixed}"></tab-control>
    <b-scroll class="content" ref="scroll"
     :probe-type='3' 
     @scroll="contentScroll"
     :pull-up-load='true'
     @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImage"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </b-scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import HomeSwiper from "./childComps/HomeSwiper";

import RecommendView from "./childComps/RecommendView";

import FeatureView from "./childComps/FeatureView";

import TabControl from "components/content/tabControl/TabControl";

import GoodsList from "components/content/goods/GoodsList";

import BScroll from "components/common/scroll/Scroll";

// import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from "network/home";

import {debounce} from 'common/utils'

import {itemListenerMixin,backTopMixin} from 'common/mixin'
export default {
  name: "Home",
  mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      scroll: null,
      // isShow:false,
      tabOffsetTop:0,
      isFixed:false,
      saveY:'',
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      homeItemListener:null
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
    // BackTop
  },
  activated(){
    // console.log(this.saveY);
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated(){
    //1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY)

    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.homeItemListener)
  },
  created() {
    //1.请求多个数据（主要是轮播图和下面的数据）
    this.getHomeMultidata();

    //2.请求下面的商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  }, 
   mounted() {
   
  },
  methods: {
    

    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      //这样实现给两个tabControl保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    swiperImage(){
         //2.获取tabControl的offesetTop
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        //处理数据
        this.banners = res.data.banner.list; //将请求的数据存储起来，避免被垃圾回收
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; //请求下一页
      getHomeGoods(type, page).then(res => {
        // console.log(res)  //pop 第一页的前30条数据
        // console.log(res.data.list)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //多了一组数据就要page+1
        // console.log(this.goods);
      });
    },
    /**
     * 返回顶部backtop函数
     */
    // backTop(){
    //   // console.log('backTop');
    //   this.$refs.scroll.scrollTo(0,0)
    // },
    
    contentScroll(position){
      // //1.判断backTop是否显示
      // //大于1000设置为true，小于1000设置为false
      this.isShow = (-position.y) > 1000;
      // this.listenShowBack(position);
      

      //2.判断tabControl是否吸顶效果{position:fiexd;}
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.isFixed = (-position.y) > this.$refs.tabControl2.$el.offsetTop;

    },

     /**
   * 上拉加载更多
   */
    loadMore(){
      // console.log('上拉加载更多')
      this.getHomeGoods(this.currentType);
      // console.log(this.goods.new.page);
      this.$refs.scroll.finishedPullUp();
    }
  },

 
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  z-index: 2;
}
.tab-control {
  position: relative;
  z-index: 3;
}

.content{
  position:absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fiexd{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>
