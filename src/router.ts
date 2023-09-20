import { createRouter, createWebHistory } from 'vue-router'
import Main from './components/Main.vue'
import Settings from './components/Settings.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Main, name: 'main'},
        { path: '/settings', component: Settings, name: 'settings' },
    ]
})