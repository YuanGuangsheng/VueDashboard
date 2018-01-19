<template>
  <div class="login-container">
    <el-form autoComplete="on" :rules="rules" ref="ruleForm" label-position="left"
             label-width="0px"
             class="card-box login-form" :model="loginForm">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="email">
        <el-input name="email" type="text" autoComplete="on" placeholder="邮箱" v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password"
                  autoComplete="on"
                  placeholder="密码" v-model="loginForm.password" @keyup.enter.native="handleLogin"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>{{loginForm.loginMsg}}</div>
    </el-form>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        loginForm: {
          email: '',
          password: '',
          loginMsg: ''
        },
        rules: {
          email: [
            {required: true, trigger: 'blur', message: '请输入邮箱地址'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          password: [
            {required: true, trigger: 'blur', message: '请输入密码'}
          ]
        }
      }
    },
    methods: {
      handleLogin () {
        this.$router.push('/home')
      }
    }
  }
</script>

<style>
  .login-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #2d3a4b;
  }

  .login-container .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .login-container .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .login-container .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
</style>
