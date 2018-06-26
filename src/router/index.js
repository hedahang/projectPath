import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/home/index'
import Search from '@/views/search/index'
import Login from '@/views/login/index'
import Register from '@/views/register/index'
import Classify from '@/views/classify/index'
import Goods from '@/views/goods/detail'
import SubmitOrder from '@/views/order/submit-order'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: Home,
            name: 'home',
        },
        {
            path: '/search',
            component: Search,
            name: 'search',
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
        },
        {
            path: '/classify',
            component: Classify,
            name: 'classify',
        },
        {
            path: '/register',
            component: Register,
            name: 'register'
        },
        {
            path: '/goods',
            component: Goods,
            name: 'goods',
        },
        {
            path: '/submitOrder',
            component: SubmitOrder,
            name: 'submit-order',
        }
    ]
})