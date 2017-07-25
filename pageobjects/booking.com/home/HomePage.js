const BasePage = require('./../BasePage.js'),
    FindDealsDialog = require('./FindDealsDialog.js');

class HomePage extends BasePage {
    constructor() {
        super();

        this.ui.findDealsDialogElement = $('#frm.-has-emk-subscribe-bar-below');
    }


    get findDealsDialog() {
        return new FindDealsDialog(this.ui.findDealsDialogElement);
    }
}

module.exports = HomePage;