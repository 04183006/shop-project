<template>
  <div class="back-top">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
    name:'BackTop',
}
</script>

<style>
.back-top{
    position: fixed;
    z-index: 20;
    right: 8px;
    bottom: 50px;
}

.back-top img{
    width: 50px;
    height: 50px;
}
</style>