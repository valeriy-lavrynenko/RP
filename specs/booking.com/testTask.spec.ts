
import {browser} from "protractor";
import * as moment from "moment";
import {HomePage} from "../../pageobjects/booking.com/home/HomePage";
import {DealsResultsPage} from "../../pageobjects/booking.com/home/DealsResultsPage";
import {async} from "q";

describe('Test Task', () => {
    beforeAll(async () => {
        await browser.driver.manage().window().maximize();
        await browser.get('/');
    });

    it('Fill form', async() => {
        let checkin:moment.Moment = moment();
        let checkout:moment.Moment = moment().add(7, 'days');
        let homePage: HomePage = new HomePage();
        let dealsResultsPage: DealsResultsPage = new DealsResultsPage();

        const findDealsDialog = homePage.findDealsDialog;
        await findDealsDialog.destination.setText('New York');
        await findDealsDialog.checkin.set(checkin);
        await findDealsDialog.checkout.set(checkout);
        await findDealsDialog.search();

        expect(await dealsResultsPage.count).toBeGreaterThan(0);
        expect(await dealsResultsPage.allDealsAreInCity('New York')).toBeTruthy();
    });

});