# Feie printer

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