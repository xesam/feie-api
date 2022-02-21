const crypto = require('crypto');
const axios = require('axios');
const qs = require('querystring');
const Printer = require('./Printer');
axios.defaults.baseURL = 'https://api.feieyun.cn/Api/Open/ ';

class NodePrinter extends Printer {
    getApiSignature(user, key, seconds) {
        return crypto.createHash('sha1')
            .update(user + key + seconds)
            .digest('hex');//获取签名
    }

    request(url, data) {
        const content = qs.stringify(data);
        return axios.post(url, content, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    }
}

module.exports = NodePrinter;