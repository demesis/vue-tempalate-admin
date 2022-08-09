<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <h2>你没有权限去该页面</h2>
      </el-col>
      <el-col :span="12">
        <img :src="gifSrc" width="313" height="428">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import gifSrc from '../../assets/img/401.gif'
export default {
  name: 'Page401',
  data() {
    return {
        // 每次进入都是新的gif
        gifSrc: gifSrc + '?' + new Date()
    }
  },
  methods: {
    back () {
        this.$router.go(-1)
    }
  },
}
</script>

<style lang="less" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    
  }
</style>
