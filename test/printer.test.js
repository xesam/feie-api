const Printer = require('../src/NodePrinter');
const Config = require('@xesam/config');

const {XiaoPingYuan_USER, XiaoPingYuan_UKEY} = new Config('feie').loadSync();

const p = new Printer(XiaoPingYuan_USER, XiaoPingYuan_UKEY);
const {SN} = new Config('printers', './printers.json5').loadSync();

p.queryPrinterStatus({sn: SN}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});