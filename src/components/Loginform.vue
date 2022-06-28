<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Lösenord" v-model="password">
    <span class="error">{{error}}</span>
    <button>Login</button>
  
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composable/useLogin'
export default {

    setup(props, context){

      const {error, login} = useLogin()
    const email = ref("") 
    const password = ref("")

    const handleSubmit = async () => {
       await login(email.value, password.value)
       if(!error.value) {
        context.emit('login')
       }
    }
    

    return{email, password, handleSubmit, error}
}

}
</script>

<style>
form{
  display: flex;
  flex-direction: column;
}
</style>