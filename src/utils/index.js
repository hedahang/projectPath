import { cookie } from 'vux'
import request from './request'
import msg from './msg'

let util = {
    // 时间格式化
    timeFormat: (dateString) => {
        let date = new Date(dateString);
        if (date !== "Invalid Date") {
            let time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            return time;
        }
    },

};


export {
    cookie,
    request,
    util
}