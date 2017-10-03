import {browser} from "protractor";
import {SpecReporter} from "jasmine-spec-reporter";

export const precondition = () => {
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(
        new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        })
    )
};