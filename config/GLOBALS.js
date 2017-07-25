const BrowserUtils = require('./../utils/browser.utils');
const CommonUtils = require('./../utils/common.utils');

module.exports = function () {
    global.EC = protractor.ExpectedConditions;
    global.utils = CommonUtils;
    global.utils.wd = BrowserUtils;
    global.consume = BrowserUtils.consume;
};