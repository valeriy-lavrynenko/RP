import {browser, ElementArrayFinder, ElementFinder, protractor} from "protractor";
import {Locator} from "protractor/built/locators";

class BrowserUtils {
    static onlyVisible(elements: ElementArrayFinder) {
        return elements.filter(element => element.isDisplayed());
    }
}

export {BrowserUtils};