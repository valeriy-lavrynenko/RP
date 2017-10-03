import {by, ElementFinder, protractor} from "protractor";
import {BaseElement} from "../BaseElement";
import {BasePage} from "../BasePage";
import {promise} from "selenium-webdriver";

class DealsResultsPage extends BasePage {
    constructor() {
        super();
        this.ui.addLocator('items', by.css('.sr_item'));
    }

    async getSearchResults(): Promise<SearchResult[]> {
        this.ui.waitForFirst('items');
        //https://github.com/angular/protractor/issues/2227
        let searchResultElements: ElementFinder[] = await this.ui.getArray('items');
        return searchResultElements.map((sr: ElementFinder) => new SearchResult(sr));
    }

    get count(): promise.Promise<number> {
        return this.ui.findAllInside('items').count();
    }

    async allDealsAreInCity(city): Promise<boolean> {
        let searchResults: SearchResult[] = await this.getSearchResults();
        let promisedValidation: promise.Promise<boolean>[] =
            searchResults.map((sr: SearchResult) => sr.city.then(srCity => srCity.includes(city)));
        let allValidations: boolean[] = await protractor.promise.all(promisedValidation);
        return allValidations.every(includes => includes);
    }
}

class SearchResult extends BaseElement {
    constructor(rootElement) {
        super(rootElement);
        this.ui.addLocator('cityLabel', by.css('.address .district_link'));
    }

    get city(): promise.Promise<string> {
        return this.ui.findInside('cityLabel').getText();
    }
}

export {DealsResultsPage};