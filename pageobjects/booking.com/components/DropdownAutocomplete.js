"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseElement_1 = require("../BaseElement");
const browser_utils_1 = require("../../../utils/browser.utils");
const protractor_1 = require("protractor");
class DropdownAutocomplete extends BaseElement_1.BaseElement {
    constructor(rootElement) {
        super(rootElement);
        this.ui.addLocator('input', protractor_1.by.css('input'));
        this.ui.addLocator('items', protractor_1.by.css('ul[data-list]>li'));
    }
    set(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ui.findInside('input').sendKeys(text);
            yield browser_utils_1.BrowserUtils.waitForFirst(this.ui.findAllInside('items'));
            yield this.ui.getArray('items').first().click();
        });
    }
}
exports.DropdownAutocomplete = DropdownAutocomplete;
//# sourceMappingURL=DropdownAutocomplete.js.map