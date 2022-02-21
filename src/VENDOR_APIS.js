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

module.exports = VENDOR_APIS;