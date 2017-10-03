import {BaseElement} from "../BaseElement";
import {BrowserUtils} from "../../../utils/browser.utils";
import {by} from "protractor";

class DropdownAutocomplete extends BaseElement {
    constructor(rootElement){
        super(rootElement);
        this.ui.addLocator('input', by.css('input'));
        this.ui.addLocator('items', by.css('ul[data-list]>li'));
    }

    async setText(text):Promise<void> {
        await this.ui.findInside('input').sendKeys(text);
        await this.ui.waitForFirst('items');
        await this.ui.getArray('items').first().click();
    }
}



export {DropdownAutocomplete};