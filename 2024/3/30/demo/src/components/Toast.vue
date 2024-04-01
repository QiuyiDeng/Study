<template lang="">
  <div class="toast"  >
    {{message}}
  </div>
</template>
<script>
import { reactive } from 'vue'
const useToastEffect = () => {
  const toastDate = reactive({
    showToast: false,
    message: ''
  })
  const showToast = message => {
    console.log('showToast message:', message)
    toastDate.message = message
    toastDate.showToast = true
    setTimeout(() => {
      toastDate.showToast = false
    }, 2000)
  }
  return {
    toastDate,
    showToast
  }
}
export default {
  props: ['message'],
  name: 'ToastComponent'
}
export {
  useToastEffect
}
</script>
<style lang="scss" scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 .2rem #777;
  background-color: rgba(0,0,0,.35);
  padding: 1rem;
  color: #fff;
}
</style>
