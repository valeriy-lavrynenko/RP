const path = require('path');

class CommonUtils {
    static simpleString(string) {
        if(string.then) return string.then(CommonUtils.simpleString);
        return string
            .trim()
            .replace(/[\n\r\t]/g, '')
            .replace(/\s{2,}/g, ' ')
    }
}

module.exports = CommonUtils;