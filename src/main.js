// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import Vuex from 'vuex'
import router from './router'
import { Message } from './utils/msg'
import infiniteScroll from 'vue-infinite-scroll'

// Vue.use(global);
Vue.use(VueRouter)
Vue.use(Message)
Vue.use(Vuex)
Vue.use(infiniteScroll)

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (Vue.$vux.loading.isVisible()) {
        Vue.$vux.loading.hide();
    }
    next()
})

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')