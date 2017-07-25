const BaseElement = require('./../BaseElement.js');


class DropdownAutocomplete extends BaseElement {
    constructor(rootElement){
        super(rootElement);
        this.ui.input = this.inside.$('input');
        this.ui.items = () => this.inside.$$('ul[data-list]>li');
    }

    set(text) {
        this.ui.input.sendKeys(text);
        utils.wd.waitForFirst(this.ui.items);
        return this.ui.items().first().click();
    }
}



module.exports = DropdownAutocomplete;