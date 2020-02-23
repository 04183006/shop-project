<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      click: {
        type: Boolean,
        default: true
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    // computed: {
    // 	scrollY() {
    // 		return this.scroll.y
    //   }
    // },
    mounted() {
      setTimeout(this._initScroll, 20)
      
      // this.scroll = new BScroll(this.$refs.wrapper,{
      //   click:true,
      // })
    },
    methods: {
      _initScroll() {
        // 1.创建BetterScroll
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          pullUpLoad: this.pullUpLoad
        })

        // 2.监听事件滚动
        if (this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', position => {
            // console.log(position);
            this.$emit('scroll', position);
          })
        }

        // console.log(this.scroll);
        //图片加载完成以后掉一次refresh

        // 3.上拉加载
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
          })
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      //继续下拉加载更多
      finishedPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()

        //因为多组件复用调用了this.scroll  有时候会出现thisscroll为null的情况，这时候就需要进行判断，当组件挂载完毕再进行函数调用
      },
      scrollTo(x, y, time=1000) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      getScrollY(){
        return this.scroll ? this.scroll.y: 0;
      }
    },
    watch: {
      data() {
	      setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>