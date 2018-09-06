import { cookie } from 'vux'

export function getCookie(key) {
    let rs = cookie.get(key)
    return rs ? JSON.parse(rs) : ''
}
export function setCookie(key, val, options) {
    val = JSON.stringify(val)
    return cookie.set(key, val, options)
}
export function removeCookie(key) {
    return cookie.remove(key)
}