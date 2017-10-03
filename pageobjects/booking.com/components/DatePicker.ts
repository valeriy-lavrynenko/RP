import {BaseElement} from "../BaseElement";
import {browser, by, ElementArrayFinder} from "protractor";
import * as moment from "moment";

class DatePicker extends BaseElement {
    constructor(rootElement) {
        super(rootElement);
        this.ui.addInside('input', this.inside.$('.sb-date-field__wrapper'));
        this.ui.addLocator('datepicker', by.css('.c2-calendar'));
        this.ui.addLocator('checkinMonths', by.css('.c2-month'));
        this.ui.addInside('earlierButton', this.inside.$('.c2-button-earlier'));
        this.ui.addInside('furtherButton', this.inside.$('.c2-button-further'));
    }

    async openCalendar(): Promise<void> {
        if (await this.ui.findInside('datepicker').isPresent()) return;
        await this.ui.get('input').click();
        await browser.sleep(1000);//Animation
    }

    get months(): MounthTables {
        let monthTables: ElementArrayFinder = this.ui.findAllVisibleInside('checkinMonths');
        return {
            left: new MonthTable(monthTables.get(0)).left(),
            right: new MonthTable(monthTables.get(1)).right(),
            setDate: async function (date: moment.Moment): Promise<void> {
                await this.left.setDate(date);
                await this.right.setDate(date);
            }
        };
    }

    async set(momentDate: moment.Moment) {
        if (!moment.isMoment(momentDate)) throw `Argument [${momentDate}] should be instance of moment.js`;
        await this.openCalendar();

        let months: MounthTables = this.months;
        let leftDate: moment.Moment = await months.left.getDate();
        let rightDate: moment.Moment = await months.right.getDate();
        if (momentDate.isBetween(leftDate, rightDate)) {
            await months.setDate(momentDate);
        } else if (momentDate.isBefore(leftDate)) {
            this.previous();
            await this.set(momentDate);
        } else if (momentDate.isAfter(rightDate)) {
            this.next();
            await this.set(momentDate);
        } else {
            throw `Date [${momentDate}] is not set`;
        }
    }

    async previous(): Promise<void> {
        await this.ui.get('earlierButton').click();
        await browser.sleep(1000);//Animation
    }

    async next(): Promise<void> {
        await this.ui.get('furtherButton').click();
        await browser.sleep(1000);//Animation
    }

}

class MonthTable extends BaseElement {
    private momentDate: moment.Moment;

    constructor(rootElement) {
        super(rootElement);
        this.ui.addLocator('monthsTitle', by.css('.c2-month-header-monthname'));
        this.ui.addLocator('daysSelector', by.css('.c2-day-inner'));
    }

    left(): MonthTable {
        this.getDate().then(momentDate => momentDate.startOf('month'));
        return this;
    }

    right(): MonthTable {
        this.getDate().then(momentDate => momentDate.endOf('month'));
        return this;
    }

    async getDate(): Promise<moment.Moment> {
        if (!this.momentDate) {
            this.momentDate = moment(await this.ui.findInside('monthsTitle').getText(), 'MMMM YYYY');
        }
        return this.momentDate;
    }

    async setDate(date: moment.Moment): Promise<void> {
        const headerDate = await this.getDate();
        if (!headerDate.isSame(date, 'month')) return;
        let filteredElements = await this.ui.findAllInside('daysSelector').filter(day => day.getText().then(text => date.date() == text));
        if (filteredElements.length == 0) throw `Date ${date} not found inside ${headerDate} table`;
        await filteredElements[0].click();
    }
}

interface MounthTables {
    left: MonthTable;
    right: MonthTable;

    setDate(date: moment.Moment): Promise<void>;
}

export {DatePicker};