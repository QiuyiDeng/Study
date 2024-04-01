<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper_img">
    <div class="wrapper_input">
      <input type="text" class="wrapper_input_content" placeholder="请输入手机号" v-model="data.username">
    </div>
    <div class="wrapper_input">
      <input type="text" class="wrapper_input_content" placeholder="请输入密码" v-model="data.password">
    </div>
    <div class="wrapper_input">
      <input type="text" class="wrapper_input_content" placeholder="确认密码" v-model="data.passwordNew">
    </div>
    <div class="wrapper_register-button" @click="register">注册</div>
    <div class="wrapper_register-link">
      <span @click="toLogin">已有账号去登陆</span>
    </div>
    <ToastVue v-if="toastDate.showToast" :message="toastDate.message"/>
  </div>

</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import ToastVue, { useToastEffect } from '@/components/Toast.vue'
import { post } from '@/utils/request.js'

const useRegsiterEffect = () => {
  const { showToast } = useToastEffect()
  const data = reactive({
    username: '',
    password: '',
    passwordNew: ''
  })
  const register = async () => {
    try {
      const result = await post('/register', data)
      console.log(result)
      if (result.error === 0) {
        showToast('注册成功！')
      } else showToast('注册失败')
    } catch (error) {
      showToast('请求失败')
      console.log(error)
    }
  }
  return {
    data,
    register
  }
}

export default {
  name: 'RegisterView',
  components: {
    ToastVue
  },
  setup () {
    const router = useRouter()

    const { toastDate } = useToastEffect()
    const { data, register } = useRegsiterEffect()

    const toLogin = () => {
      router.push('/login')
    }
    return {
      data,
      toastDate,
      register,
      toLogin
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
  &_register-button{
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
  &_register-link{
    margin-top: 1.6rem;
    text-align: center;
    color: #777;
    font-size: 14px;
  }
}
</style>
