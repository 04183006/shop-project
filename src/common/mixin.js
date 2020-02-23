import {
    debounce
} from './utils'

import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            homeItemListener: null
        }
    },
    mounted() {
        //1.监听item图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh, 500)
        // 对监听事件保存
        this.homeItemListener = () => {
            refresh()
        }
        this.$bus.$on("itemImageLoad", this.homeItemListener);

    }
}

//backTop的混入封装
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        backTop() {
            // console.log('backTop');
            this.$refs.scroll.scrollTo(0, 0)
        },
        listenShowBack(position) {
            //1.判断backTop是否显示
            //大于1000设置为true，小于1000设置为false
            this.isShow = (-position.y) > 1000;
        },
    },
   
}