import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
//导入toast 组件
import toast from 'components/common/toast'
// 安装toast
Vue.use(toast);
// 会去执行导出对象的install函数

//解决移动端300ms延迟
FastClick.attach(document.body);


//添加事件总线对象
Vue.prototype.$bus = new Vue();

// 使用图片懒加载
Vue.use(VueLazyLoad,{
  loading:require("./assets/img/common/placeholder.png")  
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
