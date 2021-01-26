import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // mutations 唯一的目的就是修改 state 中状态   [----------视频213 --------]
  // mutations中的每个方法尽可能完成的事情比较单一一点
  // 数组常用的方法: push/pop/unshift/shift/sort/reverse/fliter/reduce/join
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  }
}
