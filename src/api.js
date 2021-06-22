const crypto = require('crypto');
const qs = require('querystring');
const axios = require('axios');

axios.defaults.baseURL = 'http://api.feieyun.cn/Api/Open/';
axios.interceptors.response.use(res => {
    const data = res.data;
    if (data.ret === 0 && data.msg === 'ok') {
        return data.data;
    } else {
        return Promise.reject(data);
    }
});

function signature(user, ukey, seconds) {
    return crypto.createHash('sha1').update(user + ukey + seconds).digest('hex');//获取签名
}

function getDefaultTime() {
    return Math.floor(Date.now() / 1000);
}

function dTransform(data) {
    return Object.entries(data).reduce((curr, [key, val]) => {
        if (val) {
            curr[key] = val;
        }
        return curr;
    }, {});
}

function request(data, apiname, transform = dTransform) {
    const {user, key} = data;
    const seconds = getDefaultTime();
    const sig = signature(user, key, seconds);
    const basicData = {
        ...data,
        stime: seconds,
        sig: sig,
        apiname: apiname
    };
    const postData = transform(basicData);
    const content = qs.stringify(postData);
    return axios.post('', content, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
}

function addPrinter({user, key, printerContent}, transform) {
    return request({user, key, printerContent}, "Open_printerAddlist", transform);
}

function delPrinter({user, key, snlist}, transform) {
    return request({user, key, snlist}, "Open_printerAddlist", transform);
}

function editPrinter({user, key, sn, name, phonenum}, transform) {
    return request({user, key, sn, name, phonenum}, "Open_printerEdit", transform);
}

function queryPrinter({user, key, sn}, transform) {
    return request({user, key, sn}, "Open_queryPrinterStatus", transform);
}

function clearOrderQueen({user, key, sn}, transform) {
    return request({user, key, sn}, "Open_delPrinterSqs", transform);
}

function queryOrderState({user, key, orderid}, transform) {
    return request({user, key, orderid}, "Open_queryOrderState", transform);
}

function queryOrderInfoByDate({user, key, sn, date}, transform) {
    return request({user, key, sn, date}, "Open_queryOrderInfoByDate", transform);
}

//img:图片二进制数据，需配合<IMG>标签使用，最佳效果为不大于224px的正方形(宽高都为8的倍数)黑白图，支持jpg、png、bmp，不能超过10K
function printLabelMsg({user, key, sn, content, times, img}, transform) {
    return request({user, key, sn, content, times, img}, "Open_printLabelMsg", transform);
}

function printMsg({user, key, sn, content, times}, transform) {
    return request({user, key, sn, content, times}, "Open_printMsg", transform);
}

module.exports = {
    addPrinter,
    delPrinter,
    editPrinter,
    queryPrinter,
    clearOrderQueen,
    queryOrderState,
    queryOrderInfoByDate,
    printLabelMsg,
    printMsg
}