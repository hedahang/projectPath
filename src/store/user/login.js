import Vue from "vue";
import {
    setCookie,
    removeCookie
} from '@/utils/auth'
import { util, request as $, cookie } from "@/utils/index";

const state = {
    uname: '',
}
const mutations = {

    SET_LEFTMENU: (state, datas) => {
        state.leftMenu = datas
    },

    SET_ROLES: (state, datas) => {
        state.roles = datas
    }
}
const actions = {

    // 登录
    loginAsync({
        commit
    }, userInfo) {

        const manageMobile = userInfo.manageMobile.trim();
        const password = userInfo.password;
        return new Promise((resolve, reject) => {

            $.post("login/login", {
                manageMobile,
                password
            }).then(({
                result: rs
            }) => {
                console.log(rs)
                    // 将用户基本信息存入 cookie
                setCookie('userInfo', rs)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 登出
    logOutAsync({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            $.get('login/logout').then(() => {
                removeCookie('userInfo')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取用户信息
    getUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            $.get('/api/user').then((rs) => {
                if (rs.status) {
                    let { avatar, mobile, name, id } = rs.data;
                    cookie.set('windice_userAvatar', avatar);
                    cookie.set('windice_userMobile', mobile);
                    cookie.set('windice_username', name);
                    cookie.set('windice_userId', id);
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}
const getters = {
    uname: state => state.uname,
}

export default {
    state,
    mutations,
    actions,
    getters
}