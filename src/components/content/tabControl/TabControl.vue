<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles" :key="index"
           class="tab-control-item"
           :class="{active: index === currentIndex}"
           @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TabControl",
      props: {
        titles: {
          type: Array,
          default() {   // 当传入的是对象或是数组时，默认值是函数
            return []
          }
        }
      },
      data() {
        return {
          currentIndex: 0
        }
      },
      methods: {
        itemClick(index) {
          this.currentIndex = index;
          this.$emit('tabClick',index)    // 子组件向父组件传递数据
        }
      }
    }
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
  z-index: 8;
}

  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-tint);
    padding: 5px;
  }
</style>
