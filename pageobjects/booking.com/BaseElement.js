"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const browser_utils_1 = require("../../utils/browser.utils");
class BaseElement {
    constructor(rootElement) {
        this.ui = new UiElementsCache();
        this.ui.addInside('rootElement', rootElement);
    }
    get inside() {
        return this.ui.get('rootElement');
    }
}
exports.BaseElement = BaseElement;
class UiElementsCache {
    constructor() {
        this.elementsCache = new Map();
        this.locatorsCache = new Map();
        this.elementArraysCache = new Map();
    }
    addInside(name, element) {
        if (element instanceof protractor_1.ElementFinder) {
            this.elementsCache.set(name, element);
        }
        else if (element instanceof protractor_1.ElementArrayFinder) {
            this.elementArraysCache.set(name, element);
        }
    }
    addLocator(name, locator) {
        this.locatorsCache.set(name, locator);
    }
    findInside(name) {
        let foundElement = this.get('rootElement').element(this.locatorsCache.get(name));
        this.addInside(name, foundElement);
        return foundElement;
    }
    findAllInside(name) {
        let foundElement = this.get('rootElement').all(this.locatorsCache.get(name));
        this.addInside(name, foundElement);
        return foundElement;
    }
    findAllVisibleInside(name) {
        let foundElements = browser_utils_1.BrowserUtils.onlyVisible(this.get('rootElement').all(this.locatorsCache.get(name)));
        this.addInside(name, foundElements);
        return foundElements;
    }
    get(name) {
        return this.elementsCache.get(name);
    }
    getArray(name) {
        return this.elementArraysCache.get(name);
    }
}
exports.UiElementsCache = UiElementsCache;
//# sourceMappingURL=BaseElement.js.map