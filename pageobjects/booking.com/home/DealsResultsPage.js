class DealsResultsPage extends BasePage {
    constructor() {
        super();
        this.ui.items = () => this.inside.$$('.sr_item');
    }
    get searchResults() {
        utils.wd.waitForFirst(this.ui.items);
        //https://github.com/angular/protractor/issues/2227
        return this.ui.items().then(items => items.map(sr => new SearchResult(sr)));
    }
    get count() {
        return this.ui.items().count();
    }
    allDealsAreInCity(city) {
        return this.searchResults
            .then(searchResults => {
            let promisedValidation = searchResults.map(sr => sr.city.then(srCity => srCity.includes(city)));
            return protractor.promise.all(promisedValidation).then(validations => validations.every(includes => includes));
        });
    }
}
class SearchResult extends BaseElement {
    constructor(rootElement) {
        super(rootElement);
        this.ui.cityLabel = this.inside.$('.address .district_link');
    }
    get city() {
        return this.ui.cityLabel.getText();
    }
}
module.exports = DealsResultsPage;
//# sourceMappingURL=DealsResultsPage.js.map