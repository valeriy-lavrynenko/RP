import {BaseElement} from "../BaseElement";
import {DropdownAutocomplete} from "../components/DropdownAutocomplete";
import {DatePicker} from "../components/DatePicker";
import {by} from "protractor";

class FindDealsDialog extends BaseElement {
    public destination: DropdownAutocomplete;
    public checkin: DatePicker;
    public checkout: DatePicker;

    constructor(rootElement) {
        super(rootElement);
        this.destination = new DropdownAutocomplete(this.inside.$('.sb-destination'));
        this.checkin = new DatePicker(this.inside.$('.--checkin-field'));
        this.checkout = new DatePicker(this.inside.$('.--checkout-field'));
        this.ui.addLocator('buttonSubmit', by.css('button[type="submit"]'));
    }


    async search() {
        await this.ui.findInside('buttonSubmit').click();
    }
}

export {FindDealsDialog};