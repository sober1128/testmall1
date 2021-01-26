<template>
    <div id="detail">
      <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
      <scroll class="content" ref="scroll"
              :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommends" :goods="recommends"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
      <detail-bottom-bar @addCart="addToCart"/>

      <!--<toast message="送你一朵小红花"/>-->
    </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import BackTop from 'components/content/backTop/BackTop'
  // import Toast from 'components/common/toast/Toast'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      // BackTop,

      Scroll,
      // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
          iid: null,
          topImages: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          commentInfo: {},
          recommends: [],
          // itemImgListener: null,
          themeTopY: [],
          getThemeTopY: {},
          currentIndex: 0,
          // isShowBackTop: false,
        }
      },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid

        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
          // 2.1 获取顶部轮播图片
          // console.log(res);
          const data = res.result
          this.topImages = data.itemInfo.topImages

          // 2.2 获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 2.3 创建店铺信息
          this.shop = new Shop(data.shopInfo)

          // 2.4保存商品详细信息
          this.detailInfo = data.detailInfo

          // 2.5 获取参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          // 2.6 取出评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }

          // 1.第一次获取值不对：this.$refs.param.$el压根还没有渲染
          // this.themeTopY = []
          //
          // this.themeTopY.push(0);
          // this.themeTopY.push(this.$refs.param.$el.offsetTop);
          // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
          //
          // console.log(this.themeTopY);
          //
          // this.$nextTick(() => {
          //   // 根据最新的数据，对应的DOM已经被渲染出来
          //   // 但是图片还没有加载完成（目前获得的是不包含图片的高度）
          //   // 1.第二次获取值不对：图片没有计算在内
          //   this.themeTopY = []
          //
          //   this.themeTopY.push(0);
          //   this.themeTopY.push(this.$refs.param.$el.offsetTop);
          //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
          //   this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
          //
          //   console.log(this.themeTopY);
          // })
        })

        // 3.请求推荐数据
        getRecommend().then(res => {
          // console.log(res);
          // console.log(Array.isArray(res.data.list));
          this.recommends = res.data.list
        })

        // 4. 给getThemeTopY 赋值（对给this.themeTopY赋值的操作进行防抖）
      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE);

        // console.log(this.themeTopY);
      },100)
      },
    mounted() {

      },
    updated() {
      // this.themeTopY = []
      //
      // this.themeTopY.push(0);
      // this.themeTopY.push(this.$refs.param.$el.offsetTop);
      // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
      //
      // console.log(this.themeTopY);
    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()

        // this.themeTopY = []
        // $el 是取组件里的元素
        // this.themeTopY.push(0);
        // this.themeTopY.push(this.$refs.param.$el.offsetTop);
        // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
        // console.log(this.themeTopY);
      },
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100)
      },
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y
        this.isShowBackTop = (-position.y) > 1000

        // positionY 在 0                  和 param.$el.offsetTop 之间，index=0
        // positionY 在 =param.$el.offsetTop 和 comment.$el.offsetTop 之间，index=1
        // positionY 在 =comment.$el.offsetTop 和 recommends.$el.offsetTop 之间，index=2

        // positionY 超过= recommends.$el.offsetTop ，index=3
        // positionY 多加一个MAX值  与前几个对比

        // 2. positionY 与主题中的值进行对比
        let length = this.themeTopY.length
        for (let i = 0; i < length - 1; i++ )  {
          if (this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }

          // if (this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) || (i === length - 1 && positionY >= this.themeTopY[i])))  {
          //   this.currentIndex = i;
          //   // console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
        }

      },
      // 3.是否显示回到顶部
      // backClick() {
      //   this.$refs.scroll.scrollTo(0,0)
      //   // this.$refs.scroll 获取scroll组件  .scrollTo 调用方法
      // },
      addToCart() {
        // 1.获取购物车需要展示的商品信息
        const product = { }
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid      //商品唯一标识iid

        // 2.将商品添加到购物车里
        // this.$store.commit('addCart', product)   //mutations
        // this.$store.dispatch('addCart', product)    //actions

        // ---1.Promise
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })

        // ---2.mapActions 映射关系
        this.addCart(product).then(res => {   //映射
          this.$toast.show(res, 1000)

          // console.log(this.$toast);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
