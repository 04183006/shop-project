<template>
    <div class="cart">
<!--        导航-->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>

<!--        商品的列表-->
        <cart-list/>

<!--        底部-->
        <cart-button-bar/>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import CartList from './childComps/CartList'
    import CartButtonBar from './childComps/CartButtonBar'
    import {mapGetters} from 'vuex'
    export default {
        name: "Cart",
        components: {
          NavBar,
          CartList,
          CartButtonBar,
        },
        computed: {
           ...mapGetters({
               length: 'cartLength',
               // list: 'cartList',
           })
        }
    }
</script>

<style scoped>
  .cart {
      height: 100vh;
  }
  .nav-bar {
      background-color: var(--color-tint);
      color: #fff;
      font-weight: 700;
  }
</style>