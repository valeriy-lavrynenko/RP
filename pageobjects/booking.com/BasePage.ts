import {$, browser} from "protractor";
import {BaseElement} from "./BaseElement";

class BasePage extends BaseElement{
    constructor () {
        super($('body'))
    }
}

export {BasePage};