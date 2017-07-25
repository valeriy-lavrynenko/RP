const BaseElement = require('./../BaseElement.js');
const DropdownAutocomplete = require('./../components/DropdownAutocomplete');
const DatePicker = require('./../components/DatePicker');

class FindDealsDialog extends BaseElement {
    constructor(rootElement){
        super(rootElement);
        this.destination = new DropdownAutocomplete(this.inside.$('.sb-destination'));
        this.checkin = new DatePicker(this.inside.$('.--checkin-field'));
        this.checkout = new DatePicker(this.inside.$('.--checkout-field'));
        this.ui.buttonSubmit = this.inside.$('button[type="submit"]');
    }

    search() {
        return this.ui.buttonSubmit.click();
    }
}

module.exports = FindDealsDialog;