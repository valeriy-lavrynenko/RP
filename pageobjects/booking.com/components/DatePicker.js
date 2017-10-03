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
const protractor_1 = require("protractor");
const moment = require("moment");
class DatePicker extends BaseElement_1.BaseElement {
    constructor(rootElement) {
        super(rootElement);
        this.ui.addInside('input', this.inside.$('.sb-date-field__wrapper'));
        this.ui.addLocator('datepicker', protractor_1.by.css('.c2-calendar'));
        this.ui.addLocator('checkinMonths', protractor_1.by.css('.c2-month'));
        this.ui.addInside('earlierButton', this.inside.$('.c2-button-earlier'));
        this.ui.addInside('furtherButton', this.inside.$('.c2-button-further'));
    }
    openCalendar() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.ui.findInside('datepicker').isPresent())
                return;
            yield this.ui.get('input').click();
            yield protractor_1.browser.sleep(1000); //Animation
        });
    }
    get months() {
        let monthTables = this.ui.findAllVisibleInside('checkinMonths');
        return {
            left: new MonthTable(monthTables.get(0)).left(),
            right: new MonthTable(monthTables.get(1)).right()
        };
    }
    set(momentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!moment.isMoment(momentDate))
                throw `Argument [${momentDate}] should be instance of moment.js`;
            yield this.openCalendar();
            let months = this.months;
            let leftDate = yield months.left.getDate();
            let rightDate = yield months.right.getDate();
            if (momentDate.isBetween(leftDate, rightDate)) {
                Object.getOwnPropertyNames(months).forEach(monthSide => {
                    if (months[monthSide].date.isSame(momentDate, 'month')) {
                        return months[monthSide].setDate(momentDate.date());
                    }
                });
            }
            else if (momentDate.isBefore(leftDate)) {
                this.previous();
                return this.set(momentDate);
            }
            else if (momentDate.isAfter(rightDate)) {
                this.next();
                return this.set(momentDate);
            }
            else {
                throw `Date [${momentDate}] is not set`;
            }
        });
    }
    previous() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ui.get('earlierButton').click();
            yield protractor_1.browser.sleep(1000); //Animation
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ui.get('furtherButton').click();
            yield protractor_1.browser.sleep(1000); //Animation
        });
    }
}
class MonthTable extends BaseElement_1.BaseElement {
    constructor(rootElement) {
        super(rootElement);
        this.ui.addLocator('monthsTitle', protractor_1.by.css('.c2-month-header-monthname'));
        this.ui.addLocator('daysSelector', protractor_1.by.css('.c2-day-inner'));
    }
    left() {
        this.getDate().then(momentDate => momentDate.startOf('month'));
        return this;
    }
    right() {
        this.getDate().then(momentDate => momentDate.endOf('month'));
        return this;
    }
    getDate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.momentDate) {
                this.momentDate = moment(yield this.ui.findInside('monthsTitle').getText(), 'MMMM YYYY');
            }
            return this.momentDate;
        });
    }
    setDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ui.findAllInside('daysSelector').filter(day => day.getText().then(text => date == text)).first().click();
        });
    }
}
module.exports = DatePicker;
//# sourceMappingURL=DatePicker.js.map