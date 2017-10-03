
import {BasePage} from "../BasePage";
import {$} from "protractor";
import {FindDealsDialog} from "./FindDealsDialog";

class HomePage extends BasePage {
    constructor() {
        super();
        this.ui.addInside('findDealsDialogElement', $('#frm.-has-emk-subscribe-bar-below'));
    }

    get findDealsDialog():FindDealsDialog {
        return new FindDealsDialog(this.ui.get('findDealsDialogElement'));
    }
}

export {HomePage};