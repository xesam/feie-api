# Feie printer

飞鹅外卖打印机 API 的 JS 封装。

## Usage

```shell script
npm install feie-api
```

```javascript
const USER = 'your dev username';
const UKEY = 'your dev key';
const SN = '123456789';

api.queryPrinterStatus({sn: SN}, {user: USER, key: UKEY}).then(console.log).catch(console.error);

const api2 = api.create(USER, UKEY);
api2.queryPrinterStatus({sn: SN}).then(console.log).catch(console.error);

```