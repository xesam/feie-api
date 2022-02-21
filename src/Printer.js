const VENDOR_APIS = require('./VENDOR_APIS');

const interceptor = res => {
    const data = res.data;
    if (data.ret === 0 && data.msg === 'ok') {
        return data.data;
    } else {
        return Promise.reject(data);
    }
}

function getApiTime() {
    return Math.floor(Date.now() / 1000);
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

class Printer {
    constructor(user, key) {
        this.user = user;
        this.key = key;
    }

    getAuth() {
        return {
            user: this.user,
            key: this.key
        };
    }

    sendRequest(apiName, auth, params) {
        const publicParams = this.getPublic(apiName, auth);
        const requestParams = removeEmpty({...publicParams, ...params});
        return this.request('', requestParams).then(interceptor);
    }

    getPublic(apiName, auth) {
        const seconds = getApiTime();
        const signature = this.getApiSignature(auth.user, auth.key, seconds);
        return {
            user: auth.user,
            stime: seconds,
            sig: signature,
            apiname: apiName
        };
    }

    getApiSignature(user, key, seconds) {
        throw Error();
    }

    request(url, data) {
        throw Error();
    }

}

VENDOR_APIS.forEach(api => {
    const apiName = api.name;
    const name = apiName.replace('Open_', '');
    Printer.prototype[name] = function (params, auth) {
        return this.sendRequest(apiName, {...this.getAuth(), ...auth}, params);
    };
});

module.exports = Printer;