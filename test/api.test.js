const Config = require('@xesam/config');
const api = require('../index');

const {USER, UKEY} = new Config('feie').loadSync();
const {SN} = new Config('printers', './printers.json5').loadSync();

api.queryPrinterStatus({sn: SN}, {user: USER, key: UKEY}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});

const api2 = api.create(USER, UKEY);
api2.queryPrinterStatus({sn: SN}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});