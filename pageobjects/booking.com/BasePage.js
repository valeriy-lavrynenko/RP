"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const BaseElement_1 = require("./BaseElement");
class BasePage extends BaseElement_1.BaseElement {
    constructor() {
        super(protractor_1.$('body'));
    }
}
module.exports = BasePage;
//# sourceMappingURL=BasePage.js.map