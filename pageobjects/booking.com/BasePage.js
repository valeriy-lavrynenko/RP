const BaseElement = require('./BaseElement.js');

class BasePage extends BaseElement{
    constructor () {
        super(browser)
    }
}

module.exports = BasePage;