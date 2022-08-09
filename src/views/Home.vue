<template>
  <div class="home">
    <h1>home</h1>
    <el-input v-model="data"></el-input>
    <!-- <el-button @click="click">复制</el-button> -->
  </div>
</template>

<script>
// import { copy } from '../utils/copy.js'
export default {
  name: 'Home',
  data() {
    return {
      data: 'www.ttxbb.cn:8086'
    }
  },
  // methods: {
  //   click () {
  //     copy(this.data)
  //   }
  // }
}
</script>
