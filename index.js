const Printer = require('./src/Printer');

exports.Printer = Printer;

exports.getPrinter = function getPrinter(platform) {
    if (platform === 'mini') {
        return require('./src/MiniPrinter');
    } else {
        return require('./src/NodePrinter');
    }
}