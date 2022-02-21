const crypto = require('crypto');
const qs = require('querystring');
const requester = require('./request')();

function getDefaultTime() {
    return Math.floor(Date.now() / 1000);
}

function getSignature(apiUser, apiKey, seconds) {
    return crypto.createHash('sha1')
        .update(apiUser + apiKey + seconds)
        .digest('hex');//获取签名
}

function getPublic(apiname, auth) {
    const seconds = getDefaultTime();
    const sig = getSignature(auth.user, auth.key, seconds);
    return {
        user: auth.user,
        stime: seconds,
        sig: sig,
        apiname: apiname
    };
}

function removeEmpty(data) {
    return Object.entries(data)
        .reduce((curr, [key, val]) => {
            if (val) {
                curr[key] = val;
            }
            return curr;
        }, {});
}

function request(apiname, auth, params, transform = removeEmpty) {
    const publicParams = getPublic(apiname, auth);
    const postParams = transform({...publicParams, ...params});
    const content = qs.stringify(postParams);
    return requester.post('', content, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
}

const VENDOR_APIS = [
    {
        name: 'Open_printerAddlist',
        private_params: 'printerContent'
    },
    {
        name: 'Open_printerDelList',
        private_params: 'snlist'
    },
    {
        name: 'Open_printerEdit',
        private_params: 'sn, name, phonenum'
    },
    {
        name: 'Open_queryPrinterStatus',
        private_params: 'sn'
    },
    {
        name: 'Open_delPrinterSqs',
        private_params: 'sn'
    },
    {
        name: 'Open_queryOrderState',
        private_params: 'orderid'
    },
    {
        name: 'Open_queryOrderInfoByDate',
        private_params: 'sn, date' //查询日期，格式YY-MM-DD，如：2016-09-20
    },
    {
        name: 'Open_printLabelMsg',
        private_params: 'sn, content, times, img' // 图片二进制数据，需配合<IMG>标签使用，最佳效果为不大于224px的正方形(宽高都为8的倍数)黑白图，支持jpg、png、bmp，不能超过10K
    },
    {
        name: 'Open_printMsg',
        private_params: 'sn, content, times'
    }
];

function create(presetAuth, presetParams = {}) {
    return VENDOR_APIS.reduce((current, ele) => {
        const realName = ele.name;
        const name = realName.replace('Open_', '');
        current[name] = function (params, auth) {
            return request(realName, {...presetAuth, ...auth}, {...presetParams, ...params});
        };
        return current;
    }, {});
}

const api = create();

api.create = function (apiUser, apiKey) {
    return create({user: apiUser, key: apiKey});
}

module.exports = api;