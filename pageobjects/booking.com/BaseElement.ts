import {browser, ElementArrayFinder, ElementFinder} from "protractor";
import {Locator} from "protractor/built/locators";
import {BrowserUtils} from "../../utils/browser.utils";

class BaseElement {
    protected ui: UiElementsCache = new UiElementsCache();

    constructor(rootElement: ElementFinder) {
        this.ui.addInside('rootElement', rootElement);
    }

    get inside(): ElementFinder {
        return this.ui.get('rootElement');
    }
}

class UiElementsCache {
    private elementsCache: Map<string, ElementFinder> = new Map();
    private locatorsCache: Map<string, Locator> = new Map();
    private elementArraysCache: Map<string, ElementArrayFinder> = new Map();

    addInside(name: string, elements: ElementArrayFinder): void;
    addInside(name: string, element: ElementFinder): void;

    addInside(name: string, element: Object): void {
        if(element instanceof ElementFinder){
            this.elementsCache.set(name, element);
        }else if (element instanceof ElementArrayFinder){
            this.elementArraysCache.set(name, element);
        }
    }

    addLocator(name: string, locator: Locator): void {
        this.locatorsCache.set(name, locator);
    }

    findInside(name: string): ElementFinder {
        let foundElement:ElementFinder = this.get('rootElement').element(this.locatorsCache.get(name));
        this.addInside(name, foundElement);
        return foundElement;
    }

    findAllInside(name: string): ElementArrayFinder {
        let foundElement:ElementArrayFinder = this.get('rootElement').all(this.locatorsCache.get(name));
        this.addInside(name, foundElement);
        return foundElement;
    }

    waitForFirst(name: string) {
        return browser.wait(() => this.findAllInside(name).count().then(count => count > 0), 5000, 'Items not found');
    }

    findAllVisibleInside(name: string): ElementArrayFinder {
        let foundElements:ElementArrayFinder = BrowserUtils.onlyVisible(this.get('rootElement').all(this.locatorsCache.get(name)));
        this.addInside(name, foundElements);
        return foundElements;
    }

    get(name: string): ElementFinder {
        return this.elementsCache.get(name);
    }

    getArray(name: string): ElementArrayFinder {
        return this.elementArraysCache.get(name);
    }
}

export {BaseElement, UiElementsCache};

