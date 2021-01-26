import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  // components : {},
  // methods: {},
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce((this.$refs.scroll && this.$refs.scroll.refresh),500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
      // this.$refs.scroll 获取scroll组件  .scrollTo 调用方法
    },
  }
}
