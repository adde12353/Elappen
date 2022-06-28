<template>
  <nav v-if="user">
    <div>
        <p>Hejsan {{user.displayName}}!</p>
        <p class="email">Inloggad med mailen: {{user.email}}</p>
       
    </div>
     <button @click="handleLogout">Logg out</button>
  </nav>
</template>

<script>
import useLogout from '../composable/useLogout'
import getUser from '../composable/getUser'
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
    return {handleLogout, error, user}
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