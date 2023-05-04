<template>
  <nav v-if="user">
    <div>
        <p>Hejsan {{user.displayName}}!</p>
        <p class="email">Inloggad med mailen: {{user.email}}</p>
        <div style="display:flex; gap: 25px"><router-link to="/chart"><span style="color:#5ae4ca; font-size:38px" class="material-icons">insert_chart
</span> </router-link>
        <router-link to="/Add"><span style="color:#5ae4ca; font-size:38px" class="material-icons">add_box
</span> </router-link>
        <router-link to="/"><span style="color:#5ae4ca; font-size:38px" class="material-icons">chat
</span></router-link>
</div>
    </div>
     <button @click="handleLogout">Logga ut</button>
  </nav>
</template>

<script>
import useLogout from '../composable/useLogout'
import getUser from '../composable/getUser'
import {RouterLink} from 'vue-router'
import 'material-icons/iconfont/material-icons.css';

export default {
setup() {
    const {logout, error } = useLogout()
    const { user } = getUser()

    const handleLogout = async () => {
        await logout()
        if (!error.value) {
            console.log("user logged out")
        }
    }
    console.log(user.value)
    return {handleLogout, error, user, RouterLink}
}

}
</script>

<style>
nav {
    padding:20px;
    border: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
}
nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
}
nav p.email {
    font-size: 14px; 
    color: #999;
}
</style>