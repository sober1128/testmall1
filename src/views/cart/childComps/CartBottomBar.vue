<template>
    <div class="bottom-bar">
     <div class="check-content">
       <check-button
         :is-checked="isSelectAll"
         class="check-button" @click.native="checkClick"/>
       <span>全选</span>
     </div>

      <div class="price">
        合计:{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
        去计算:{{checkLength}}
      </div>
    </div>
</template>

<script>
  import CheckButton from './CheckButton'

  // import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      // ...mapGetters(['cartList'])
      // this.$store.state.cartList 都可以换成this.cartList
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        // 1.使用filter
        // return !this.$store.state.cartList.filter(item => !item.checked).length

        // 2.使用find
        return !this.$store.state.cartList.find(item => !item.checked)

        // 3.使用every
        // return this.$store.state.cartList.every(item => item.checked)  // every 函数

        // 4.使用遍历
        // for (item of this.$store.state.cartList) {
        //   if (!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        // 如果原来全是选中，点击一次，全部不选中
        // 如果原来都是不选中or某些不选中，点击后全部选中
        if (this.isSelectAll) {   //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (!this.checkLength)  {
          this.$toast.show('请选择购买的商品',1500)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;
    /*bottom: 40px;*/
    background-color: #eee;
    font-size: 14px ;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 80px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
