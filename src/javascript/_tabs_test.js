(function () {
    "use strict";

    var assert = require("./assert.js");
    var tabs = require("./tabs.js");
    describe("Tabs", function () {
        it("has an API", function () {
            var element = addElement("div");
            tabs.initialize(element);
            var display = getDisplayProperty(element);
            assert.equal(display, "none");
            element.parentNode.removeChild(element);
        });
        function addElement(el) {
            var element = document.createElement(el);
            document.body.appendChild(element);
            return element;
        }

        function getDisplayProperty(element) {
            var styles = getComputedStyle(element);
            return styles.getPropertyValue("display");

        }
    });
}());