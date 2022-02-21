const CryptoJS = require('crypto-js');
const {request} = require('@mini-dev/request');
const Printer = require('./Printer');

const service = request.create()
    .addRequestInterceptor(req => {
        req.url = 'https://api.feieyun.cn/Api/Open/' + (req.url ? req.url : '');
        return req;
    });

class MiniPrinter extends Printer {
    getApiSignature(user, key, seconds) {
        return CryptoJS.SHA1(user + key + seconds).toString();
    }

    request(url, data) {
        const content = Object.entries(data).map(([key, value]) => {
            return key + '=' + value
        }).join('&');
        return service({
            method: 'post',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: content
        });
    }
}

module.exports = MiniPrinter;