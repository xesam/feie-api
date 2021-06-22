const Config = require('@xesam/config');
const api = require('../src/api');

const {USER, UKEY} = new Config('feie').loadSync();
const {SN} = new Config('test', './test.json5').loadSync();

api.queryPrinter({user: USER, key: UKEY, sn: SN}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});

api.queryOrderInfoByDate({user: USER, key: UKEY, sn: SN, date: '2021-06-22'}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});

api.printLabelMsg({
    user: USER,
    key: UKEY,
    sn: SN,
    content: '<TEXT x="10" y="100" font="12" w="2" h="2" r="0">文本内容</TEXT>'
}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});

api.clearOrderQueen({user: USER, key: UKEY, sn: SN}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});

api.queryOrderState({user: USER, key: UKEY, orderid: '960206287_20210622165429_1028570624'}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});

api.editPrinter({user: USER, key: UKEY, sn: SN, name: '武汉办公室'}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});