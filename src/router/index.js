import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../view/welcome.vue'
import Chatroom from '../view/Chatroom.vue'
import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (!user) {
        next({name: 'Welcome'})
    } else {
        next()
    }
}

const areLoggedIn = (to, from, next) => {
    let user = projectAuth.currentUser
    if (user) {
        next({name: "Chatroom"})
    } else {
        next()
    }
}



const routes = [
    {
        path:"/",
        name: "Welcome",
        component: Welcome,
        beforeEnter: areLoggedIn
    },
    {
        path: "/chatroom",
        name: "Chatroom",
        component: Chatroom,
        beforeEnter: requireAuth
    }
]

const router= createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router