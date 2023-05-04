<template>
<div class="container">
    <Navbar />
<p>Device id:</p>
<input type="number"
v-model="deviceId">
<button
@click="addDevice"
>Lägg till enhet</button>
<p>Try demo device 12</p>
<p>{{infoFromAPi}}</p>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Navbar from '../components/Navbar.vue'
import getUser from '../composable/getUser'

export default {

components: {Navbar},
setup() {
    const deviceId = ref(null)
    const { user } = getUser()
    const infoFromAPi = ref()

    console.log(user.value.email)

    const addDevice = () => {

        fetch('http://localhost:4000/add', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        user: user.value.email,
        deviceId: deviceId.value})
        })
        .then(response => {return response.json()})
        .then((data) => {
            if(data.error){
            return infoFromAPi.value = data.error
            } infoFromAPi.value = data
        
        

        })
        .catch((error) => {
        console.error('Error:', error);
        });
    
    }
return {deviceId, addDevice, infoFromAPi
}

}}
</script>

<style>
#notActiveButton {
pointer-events: none; 
background-color: grey; 
color: rgb(193, 193, 193);
}

</style>