<template>
  <!--ref 一般绑定给子组件-->
    <div class="wrapper" ref="wrapper">
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
        pullUpLoad: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          scroll: null
        }
      },
      mounted() {
        // 1.创建BScroll对象
        // this.scroll = new BScroll(document.querySelector('.wrapper'),{
        this.scroll = new BScroll(this.$refs.wrapper,{
          click: true,
          probeType: this.probeType,
          // probeType  pullUpLoad 均设置为动态属性
          // pullUpLoad: this.pullUpLoad
        })

        // console.log(this.scroll);
        // BScroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定的

        // 2. 监听滚动的位置  需要监听时才监听
        if (this.probeType ===2 || this.probeType === 3) {
          this.scroll.on('scroll',(position) => {
            // console.log(position);
            this.$emit('scroll',position)   // 通过自定义事件把position传出去
          })
        }

        // 3.监听scroll滚动到底部
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp',() => {
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
          })
        }
      },
      methods: {
        scrollTo(x, y, time=300) {
          this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
          this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
          // console.log('----');
          this.scroll && this.scroll.refresh()
        },
        getScrollY() {
          // 判断一下y的值
          return this.scroll ? this.scroll.y : 0
        }
      }
    }
</script>

<style scoped>

</style>
