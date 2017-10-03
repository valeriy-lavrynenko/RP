"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class BrowserUtils {
    static waitForElement(locator) {
        return protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(locator), 5000, 'Item not present');
    }
    static waitForFirst(elementsCallback) {
        return protractor_1.browser.wait(() => elementsCallback().count().then(count => count > 0), 5000, 'Items not found');
    }
    static onlyVisible(elements) {
        return elements.filter(element => element.isDisplayed());
    }
    static consume(generator, context) {
        return protractor_1.protractor.promise.consume(generator.bind(context))
            .then(result => result, error => {
            throw error;
        });
        //This useless callbacks added because cucumber sometimes cannot handle generator exception
    }
    ;
}
exports.BrowserUtils = BrowserUtils;
//# sourceMappingURL=browser.utils.js.map