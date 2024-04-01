<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper_img">
    <div class="wrapper_input">
      <input type="text" class="wrapper_input_content" placeholder="请输入手机号" v-model="data.username">
    </div>
    <div class="wrapper_input">
      <input type="password" class="wrapper_input_content" placeholder="请输入密码" v-model="data.password">
    </div>
    <div class="wrapper_login-button" @click="login">登陆</div>
    <div class="wrapper_login-link">
      <span @click="register">立即注册</span>
      <span>|</span>
      <span>忘记密码</span>
    </div>
    <ToastVue v-if="toastDate.showToast" :message="toastDate.message"/>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import ToastVue, { useToastEffect } from '../../components/Toast.vue'
import { post } from '@/utils/request.js'

const useLoginEffect = () => {
  const router = useRouter()
  const { showToast } = useToastEffect()
  const data = reactive({
    username: '',
    password: ''
  })
  const login = async () => {
    try {
      const { username, password } = data

      if (username.trim() === '' || !password.trim() === '') return
      const result = await post('/login', data)
      // console.log(result)
      if (result.error === 0) {
        console.log(result)
        localStorage.setItem('isLogin', 'true')
        router.push({ name: '首页' })
      } else showToast('登陆失败')
    } catch (error) {
      showToast('请求失败')
      console.log(error)
    }
  }
  return {
    data,
    login
  }
}
export default {
  name: 'LoginView',
  components: {
    ToastVue
  },
  setup () {
    const router = useRouter()

    const { toastDate } = useToastEffect()
    const { data, login } = useLoginEffect()

    const register = () => {
      router.push('/register')
    }
    return {
      data,
      toastDate,
      login,
      register
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/style/vriables.scss';
@import '@/style/mixins.scss';
.wrapper{
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  padding: 0 4rem;
  &_img{
    width: 6.6rem;
    height: 6.6rem;
    display: block;
    margin: .4rem auto;
    margin-bottom: 4rem;
  }
  &_input{
    margin-bottom: 1.6rem;
    border: none;
    background: #F9F9F9;
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: 6px;
    padding: 0 4.8rem 0 1.6rem;
    &_content{
      padding: 0 1.6rem;
      display: block;
      width: 100%;
      height: 4.8rem;
      border: none;
      line-height: 4.8rem;
      outline: none;
      background: none;
      font-size: 16px;
      color: #777;
      &::placeholder{
        color: #777;
      }
    }
  }
  &_login-button{
    height: 4.8rem;
    background: #0091FF;
    box-shadow: 0 4px 8px 0 rgba(0,145,255,0.32);
    border-radius: 4px;
    line-height: 4.8rem;
    text-align: center;
    font-size: 1.6rem;
    color: #fff;
    margin-top: 3.2rem;
  }
  &_login-link{
    margin-top: 1.6rem;
    text-align: center;
    color: #777;
    font-size: 14px;
    span:nth-child(2){
      margin: 0 1.2rem;
    }
  }
}
</style>
