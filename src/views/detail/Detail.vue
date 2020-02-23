<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailnav"></detail-nav-bar>
    <scroll class="detail" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info class="btn" :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCard">21321</detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailBottomBar from "./childComps/DetailButtonbar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import { mapActions } from 'vuex'
import { itemListenerMixin, backTopMixin } from "common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      data: "",
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isFixed: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  created() {
    //1.获取iid
    this.iid = this.$route.query.iid;

    //2.根据iid获取数据
    getDetail(this.iid).then(res => {
      //3.抽离详情页数据
      // console.log(res);
      const data = res.result;
      //1.获取顶部轮播数据
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages)

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.获取商家信息
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //7.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
    });
  },
  methods: {
    ...mapActions(['addCart']),
    /**
     * 返回顶部backtop函数
     */
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs)
    },
    //将当前商品添加到购物车，先获取信息，然后添加到购物车
    addCard(){
      // 1.获取购物车需要展示的信息
      const obj = {}
      obj.image = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.price = this.goods.realPrice;
      obj.iid = this.iid;
      obj.count = 0;
      // console.log(obj)
      
      //2.将商品加入购物车
      this.addCart(obj)
      .then(res => {
        // console.log(res);
        this.$toast.show(res,2000)
        
      })
    },
    contentScroll(position) {
      this.listenShowBack(position);
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.detailnav.currentIndex = this.currentIndex;
        }
      }
      // console.log(position)
    },
    
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.homeItemListener);
  }
};
</script>

<style>
#detail {
  height: 100vh;
  /* border: 2px solid red; */
}
.detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: calc(100% - 93px);
  /* border: 2px solid red; */
}

.btn {
  /* margin-top: 10px; */
  /* border: 2px solid red; */
  position: relative;
}
</style>