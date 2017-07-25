const moment = require('moment');
const homePage = new (require('../../pageobjects/booking.com/home/HomePage'));
const dealsResultsPage = new (require('../../pageobjects/booking.com/home/DealsResultsPage'));

describe('Test Task', () => {
    beforeAll(() => {
        browser.driver.manage().window().maximize();
        browser.get('/');
    });

    it('Fill form', () => {
        let checkin = moment().add(1, 'months').add(10, 'days');
        let checkout = moment().add(2, 'months');

        const findDealsDialog = homePage.findDealsDialog;
        findDealsDialog.destination.set('New York');
        findDealsDialog.checkin.set(checkin);
        findDealsDialog.checkout.set(checkout);
        findDealsDialog.search();

        expect(dealsResultsPage.count).toBeGreaterThan(0);
        expect(dealsResultsPage.allDealsAreInCity('New York')).toBeTruthy();
    });

});