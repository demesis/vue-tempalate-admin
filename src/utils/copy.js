import Vue from 'vue'
export const copy =  (text) => {
    navigator.clipboard.writeText(text) // text就是要复制的值
    Vue.prototype.$message.success('复制成功')
}