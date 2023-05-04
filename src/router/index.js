import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../view/Welcome.vue'
import Chatroom from '../view/Chatroom.vue'
import Chart from '../view/Chart.vue'
import AddDevice from '../view/AddDevice.vue'
import overView from '../view/overView.vue'
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
    },
    {
        path: "/chart",
        name: "Chart",
        component: Chart,
        beforeEnter: requireAuth
    },
    {
        path: "/add",
        name: "Add",
        component: AddDevice,
        beforeEnter: requireAuth
    }
    ,
    {
        path: "/overview",
        name: "overview",
        component: overView,
        beforeEnter: requireAuth
    }
]

const router= createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router