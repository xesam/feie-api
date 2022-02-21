const axios = require('axios');
axios.interceptors.response.use(res => {
    const data = res.data;
    if (data.ret === 0 && data.msg === 'ok') {
        return data.data;
    } else {
        return Promise.reject(data);
    }
});

function getRequester(type = 'https') {
    if (type === 'https') {
        axios.defaults.baseURL = 'https://api.feieyun.cn/Api/Open/ ';
    } else {
        axios.defaults.baseURL = 'http://api.feieyun.cn/Api/Open/';
    }
    return axios;
}

module.exports = getRequester;