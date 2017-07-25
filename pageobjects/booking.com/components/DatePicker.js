const BaseElement = require('./../BaseElement.js');
const moment = require('moment');


class DatePicker extends BaseElement {
    constructor(rootElement) {
        super(rootElement);
        this.ui.input = this.inside.$('.sb-date-field__wrapper');
        this.ui.datepickerLocator = '.c2-calendar';
        this.ui.datepicker = this.inside.$(this.ui.datepickerLocator);
        this.ui.checkinMonths = () => utils.wd.onlyVisible(this.inside.$$('.c2-month'));
        this.ui.earlierButton = this.inside.$('.c2-button-earlier');
        this.ui.furtherButton = this.inside.$('.c2-button-further');
    }

    openCalendar() {
        return consume(function*() {
            if (yield this.inside.$(this.ui.datepickerLocator).isPresent()) return;
            yield this.ui.input.click();
            yield browser.sleep(1000);//Animation
        }, this);
    }

    getMonths() {
        return consume(function*() {
            let monthTables = this.ui.checkinMonths();
            return {
                left: new MonthTable(monthTables.get(0)).left(),
                right: new MonthTable(monthTables.get(1)).right()
            };
        }, this);
    }

    set(momentDate) {
        return consume(function*() {
            if (!moment.isMoment(momentDate)) throw `Argument [${momentDate}] should be instance of moment.js`;
            yield this.openCalendar();

            let months = yield this.getMonths();
            if (momentDate.isBetween(months.left.date, months.right.date)) {
                Object.getOwnPropertyNames(months).forEach(monthSide => {
                    if (months[monthSide].date.isSame(momentDate, 'month')) {
                        return months[monthSide].setDate(momentDate.date())
                    }
                })
            } else if (momentDate.isBefore(months.left.date)) {
                this.previous();
                return this.set(momentDate);
            } else if (momentDate.isAfter(months.right.date)) {
                this.next();
                return this.set(momentDate);
            } else {
                throw `Date [${momentDate}] is not set`;
            }
        }, this);
    }

    previous (){
        this.ui.earlierButton.click();
        browser.sleep(1000);//Animation
    }

    next() {
        this.ui.furtherButton.click();
        browser.sleep(1000);//Animation
    }

}

class MonthTable extends BaseElement {
    constructor(rootElement) {
        super(rootElement);
        this.ui.monthsTitle = this.inside.$('.c2-month-header-monthname');
        this.ui.daysSelector = this.inside.$$('.c2-day-inner');

        this.momentDate = null;
    }

    left() {
        this.date.then(momentDate => momentDate.startOf('month'));
        return this;
    }

    right() {
        this.date.then(momentDate => momentDate.endOf('month'));
        return this;
    }

    get date() {
        return this.momentDate || consume(function*() {
            this.momentDate = moment(yield this.ui.monthsTitle.getText(), 'MMMM YYYY');
            return this.momentDate;
        },this);
    }

    setDate(date) {
        return this.ui.daysSelector.filter(day => day.getText().then(text => date == text)).first().click();
    }
}

module.exports = DatePicker;