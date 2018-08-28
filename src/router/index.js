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
import Order from '@/views/order/index'
import OrderDetail from '@/views/order/detail'
import Carts from '@/views/carts/index'
import My from '@/views/my/index'
import Setting from '@/views/setting/index'
import UpdateName from '@/views/setting/updateName'
import SetMobile from '@/views/setting/setMobile'
import Coupon from '@/views/coupon/index'
import Address from '@/views/address/index'
import AddAddress from '@/views/address/add'
import Opinion from '@/views/opinion/index'
import OpinionDetail from '@/views/opinion/detail'
import OpinionFeedback from '@/views/opinion/feedback'

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
        },
        {
            path: '/order',
            component: Order,
            name: 'order',
        },
        {
            path: '/orderDetail',
            component: OrderDetail,
            name: 'orderDetail',
        },
        {
            path: '/carts',
            component: Carts,
            name: 'carts',
        },
        {
            path: '/my',
            component: My,
            name: 'my',
        },
        {
            path: '/setting',
            component: Setting,
            name: 'setting',
        },
        {
            path: '/updateName',
            component: UpdateName,
            name: 'updateName',
        },
        {
            path: '/setMobile',
            component: SetMobile,
            name: 'setMobile',
        },
        {
            path: '/coupon',
            component: Coupon,
            name: 'coupon',
        },
        {
            path: '/address',
            component: Address,
            name: 'address',
        },
        {
            path: '/address/add',
            component: AddAddress,
            name: 'addAddress',
        },
        {
            path: '/opinion',
            component: Opinion,
            name: 'opinion',
        },
        {
            path: '/opinion/detail',
            component: OpinionDetail,
            name: 'opinionDetail',
        },
        {
            path: '/opinion/feedback',
            component: OpinionFeedback,
            name: 'opinionFeedback',
        },
    ]
})