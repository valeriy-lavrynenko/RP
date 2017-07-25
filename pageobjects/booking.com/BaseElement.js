
class BaseElement {
    constructor (rootElement) {
        this.ui = {};
        this.ui.rootElement = rootElement;
    }

    get inside() {
        return this.ui.rootElement;
    }
}

module.exports = BaseElement;