<template>
  <div class="nav-bar">
      <!-- 需要对插槽布局 -->
     <div class="left"><slot name="left"></slot></div>
     <div class="center"><slot name="center"></slot></div>
     <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name:'NavBar'
}
</script>

<style>
/* 使用flex布局 */
.nav-bar{
    display: flex;
    /* 一般导航栏是44  状态栏是20 */
    line-height:44px; 
    height:44px;
    width: 100%;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
}

.left, .right{
    width: 60px;
    /* background: red; */
}

.center{
    /* 只剩一个就占据所有位置 */
    flex: 1;
    /* background: green; */
    
}
</style>