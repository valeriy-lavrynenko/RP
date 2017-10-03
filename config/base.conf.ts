

import {precondition} from "./pre.base.conf";

export const baseConfig = {
    params: {
        timeouts: {
            s: 1000,
            m: 5000,
            l: 15000
        }
    },

    directConnect: true,
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        defaultTimeoutInterval: 120000,
        realtimeFailture: true,
        stopSpecOnExpectationFailture: true
    },
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    onPrepare: precondition,
    SELENIUM_PROMISE_MANAGER: false
};