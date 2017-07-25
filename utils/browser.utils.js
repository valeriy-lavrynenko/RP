
class BrowserUtils {

    static waitForElement(locator) {
        return browser.wait(protractor.ExpectedConditions.presenceOf(locator), 5000, 'Item not present');
    }

    static waitForFirst(elementsCallback) {
        return browser.wait(() => elementsCallback().count().then(count => count > 0), 5000, 'Items not found');

    }

    static onlyVisible(elements) {
        return elements.filter(element => element.isDisplayed());
    }

    static consume(generator, context) {
        return protractor.promise.consume(generator.bind(context))
            .then(result => result, error => {
                throw error;
            });
        //This useless callbacks added because cucumber sometimes cannot handle generator exception
    };
}

module.exports = BrowserUtils;