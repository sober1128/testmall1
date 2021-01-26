<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!--商品的列表-->
    <cart-list/>

    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import { mapGetters } from 'vuex'

    export default {
      name: "Cart",
      components: {
        NavBar,
        CartList,
        CartBottomBar
      },
      computed: {
        // carLength() {
        //   return this.$store.state.cartList.length
        // }
        // ...mapGetters(['cartLength', 'cartList'])
        ...mapGetters(
          { length: 'cartLength',
            // list: 'cartList'
          })
      }
    }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
    top:0;
    left:0;
    right: 0;
  }
 .nav-bar {
   background-color: var(--color-tint);
   color: #fff;
 }
  /*.cart-list {*/
    /*overflow: hidden;*/

    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 49px;*/
    /*left: 0;*/
    /*right: 0;*/
  /*}*/
</style>
