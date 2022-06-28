<script>
import SignupForm from '../components/SignupForm.vue'
import Loginform from '../components/Loginform.vue'
import { ref } from 'vue'
import {useRouter} from 'vue-router'

export default {
  components: { SignupForm, Loginform },
  setup() {
    const showLogin = ref(true)

    const router = useRouter()

    function handleLoginSignup () {
      showLogin.value = !showLogin.value
    }  

    const enterChat = () => {
      router.push({name: 'Chatroom'})
    }
  
    return { showLogin, handleLoginSignup, enterChat }
  }
}


</script>

<template>
<div class="welcome container">

  <div v-if="showLogin">
    <h2>Login</h2>
  <Loginform @login="enterChat"/>
  <p @click="handleLoginSignup">Inget konto? <span class="Click">Klicka här</span> för att skapa en användare</p>
  </div>
  

  <div v-else>
  <h2>Skapa användare</h2>
  <SignupForm @signup="enterChat"/>
    <p @click="handleLoginSignup">Har du redan ett konto? <span class="Click">Klicka här</span> för att logga in</p>

  </div>
  
</div>


</template>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}

.welcome form{
  width: 300px;
  margin: 20px auto;
}

.welcome label{
display: block;  
margin: 20px 0 10px;
}

.welcome input{
width: 100%;
box-sizing: border-box;
padding: 10px;
border-radius: 20px;
border: 1px solid #eee;
outline: none;
color: #999;
margin: 10px auto
}

.Click{
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
  font-weight: bold;
}

</style>
