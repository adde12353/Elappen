<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="Användarnamn" v-model="displayName">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Lösenord" v-model="password">
    <div class="error">{{error}}</div>

    <button>Skapa användare</button>
  
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composable/useSignup'
export default {

    setup(props, context){
     const {error, signUp}  = useSignup()
     

    const displayName = ref("")
    const email = ref("")
    const password = ref("")

    const handleSubmit = async () => {
      await signUp(email.value, password.value, displayName.value)
  
      if(!error.value){ 
        context.emit('signup')
        }
    
    }

    return{displayName, email, password, error, handleSubmit}
}

}
</script>

<style>

</style>