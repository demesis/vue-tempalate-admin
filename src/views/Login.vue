<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <div class="logo-name">后台管理系统</div>
      </div>
      <div class="login-form">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          :show-message="false"
          @keyup.enter.native="handleSubmit"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="loginForm.userName"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button
        class="login-form__submit"
        type="primary"
        :loading="loading"
        @click="handleSubmit"
        >登录</el-button
      >
      <div class="login-info">
        <el-tag>账号：admin</el-tag>
        <el-tag>密码：123456</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from '../api/login'
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      loginForm: {
        userName: "admin",
        password: "123456",
      },
      rules: {
        userName: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login();
        } else {
          this.$message.error("用户名和密码不能为空");
        }
      });
    },
    login() {
        this.loading = true
        Login(this.loginForm).then(res => {
            if(res.code == 200) {
                sessionStorage.setItem('userName', this.loginForm.userName) 
                this.$store.state.user.profile.userName = this.loginForm.userName
                this.$router.replace('/')
                this.$message.success(res.message);
            } else{
                this.$message.error(res.message);
            }
            this.loading = false
        })
    },
  }
};
</script>

<style lang="less" scoped>
.login-page {
  background: url("../assets/img/login-bg.png") no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 440px;
  min-height: 480px;
  background-size: cover;
  background-position: center;
}

.login-box {
  box-sizing: border-box;
  position: relative;
  top: 50%;
  margin: 0 auto;
  padding: 40px 30px 0;
  width: 380px;
  height: 420px;
  background: #fff;
  box-shadow: 0 15px 27px 0 rgba(31, 19, 110, 0.06);
  border-radius: 4px;
  transform: translateY(-50%);
}

.login-logo {
  text-align: center;

  .logo-name {
    margin-top: 12px;
    margin-bottom: 30px;
    line-height: 25px;
    color: #121958;
    font-size: 18px;
    font-weight: 500;
  }
}

.login-form {
  margin-top: 12px;
  padding: 0 10px;

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-input__inner {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ced4e2;
    font-size: 14px;
    color: #121958;
  }

  .el-input__prefix {
    left: 0;
  }

  .el-input--prefix {
    .el-input__inner {
      padding-left: 28px;
    }
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #546f96;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #546f96;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #546f96;
  }

  .captcha__input {
    width: 110px;
  }

  .captcha__img {
    margin-left: 10px;
    width: 80px;
    vertical-align: middle;
  }

  .captcha__refresh {
    margin-left: 8px;
    cursor: pointer;
    font-size: 12px;
    color: #3682fb;
    vertical-align: middle;
    user-select: none;
  }
}

.login-form__submit {
  margin-top: 6px;
  width: 100%;
  height: 44px;
}
.login-info {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  padding: 0 50px;
}
</style>