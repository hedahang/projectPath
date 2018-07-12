import Vue from 'vue'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
/*import { Promise } from 'es6-promise';*/

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

const Message = {};
Message.install = () => {
    const msg = {
        $toast: config => {
            let def = {
                type: 'text',
                text: ''
            }
            if (typeof config === 'string' || typeof config === 'number') {
                Vue.$vux.toast.show({ type: 'text', text: config })
            } else {
                Vue.$vux.toast.show(Object.assign(def, config))
            }

        },
        $alert: config => {
            let def = {
                title: '提示',
                content: '系统异常，请重新登录后再试！',
                buttonText: '确定'
            }
            if (typeof config === 'string' || typeof config === 'number') {
                Vue.$vux.alert.show(Object.assign(def, { content: config }));
            } else {
                Vue.$vux.alert.show(Object.assign(def, config));
            }
        },
        $confirm: config => {
            let isConfirm = false;
            let def = {
                title: '提示',
                content: '系统异常，请重新登录后再试！',
                confirmText: '确定',
                cancelText: '取消',
                onConfirm: () => {
                    isConfirm = true;
                }
            }
            if (typeof config === 'string' || typeof config === 'number') {
                Vue.$vux.confirm.show(Object.assign(def, { content: config }));
            } else {
                Vue.$vux.confirm.show(Object.assign(def, config));
            }
            /*return new Promise((resolve,reject) => {
                if(isConfirm){
                    resolve();
                }
            })*/
        },
        $showLoading: config => {
            let def = {
                text: '加载中...'
            }
            if (typeof config === 'string' || typeof config === 'number') {
                Vue.$vux.loading.show(Object.assign(def, { text: config }));
            } else {
                Vue.$vux.loading.show(Object.assign(def, config));
            }
        }

    }
    Object.entries(msg).forEach(([method, fn]) => {
        Vue.prototype[method] = fn;
    })
}
export { Message };