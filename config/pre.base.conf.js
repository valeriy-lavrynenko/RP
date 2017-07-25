const JasmineSpecReporter = require('jasmine-spec-reporter').SpecReporter;
const GLOBALS = require('./GLOBALS');

module.exports = () => {
    browser.ignoreSynchronization = true;
    GLOBALS();
    jasmine.getEnv().addReporter(
        new JasmineSpecReporter({
            spec: {
                displayStacktrace: true
            }
        })
    )
}