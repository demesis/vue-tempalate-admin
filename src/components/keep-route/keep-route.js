import { getFirstComponentChild } from './get-first-component-child'

export default {
  name: 'keep-route',


  props: {
    keepId: {
      type: [String, Number]
    }
  },

  created () {
    this.cache = Object.create(null)
  },

  destroyed () {
    // 清空cache
    for (const key in this.cache) {
      this.remove(key)
    }
  },

  methods: {
    // 删除缓存
    remove (key) {
      if (key) {
        const { cache } = this
        const item = cache[key]

        if (item) {
          item.vm && item.vm.$destroy()
          item.vm = null
          delete cache[key]
        }
      }
    }
  },

  render () {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    // 判断是否要保持状态
    if (componentOptions && this.keepId !== undefined) {

      const { cache } = this
      const key = this.keepId
      
      if (key) {
        // 添加或更新缓存
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance
        } else {
          cache[key] = vnode
        }
        //保持状态
        vnode.data.keepAlive = true
      }
    }

    return vnode || (slot && slot[0])
  }
}
