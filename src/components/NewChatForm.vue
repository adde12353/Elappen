<template>
  <form>
    <textarea
    :placeholder="placeHolder"
    v-model="message"
    @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div class="error">{{error}}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composable/getUser'
import useCollection from '../composable/useCollection'
import { timestamp } from '../firebase/config'

export default {
setup() {
    const { user } = getUser()
    const {addDoc, error} = useCollection('messages')
    const message = ref("")
    const placeHolder = ref("Skriv in ett meddeland och tryck på skicka...")

    const handleSubmit = async () => {
        const chat = {
            user: user.value.displayName,
            message: message.value,
            createdAt : timestamp()
        }
        if (chat.message.length > 0) {
                  placeHolder.value ="Skriv in ett meddeland och tryck på skicka..."
        await addDoc(chat)
        } else {
          placeHolder.value="Du måste skriva in text för att skicka"
        }
        
        if (!error.value){
        message.value =""
        }
       
    }
return {message,handleSubmit, error, placeHolder}
}
}
</script>

<style scoped>
  form {
      margin: 10px;
  }
  textarea {
       width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }
</style>