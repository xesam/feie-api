# Feie printer

废弃：若有需要，可以使用新的聚合打印 API： https://github.com/xesam/cloud-printer

飞鹅外卖打印机 API 的 JS 封装。

## Usage

```shell script
npm install feie-api
```

```javascript
const {getPrinter} = require('feie');
const USER = 'your dev username';
const UKEY = 'your dev key';
const Printer = getPrinter();
const p = new Printer(USER, UKEY);
const SN = '123456789';

p.queryPrinterStatus({sn: SN}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});
```