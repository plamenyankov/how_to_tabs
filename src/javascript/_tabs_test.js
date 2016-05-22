(function () {
    "use strict";

    var assert = require("./assert.js");
    var tabs = require("./tabs.js");
    describe("Tabs", function () {
        var container;
        beforeEach(function () {
            container = document.createElement("div");
            document.body.appendChild(container);
        });
        afterEach(function () {
            removeElement(container);
        });
        it("has an API", function () {
            var element = addElement("div");
            tabs.initialize(element, "someClass");
            //var display = getDisplayProperty(element);
            assert.equal(getClass(element), "someClass");

        });
        it("Set a class to el w/o deleting the existing class", function () {
            var element = addElement("div");
            element.setAttribute("class", "existingClass");
            tabs.initialize(element, "someClass");
            //var display = getDisplayProperty(element);
            assert.equal(getClass(element), "existingClass someClass");

        });
        function removeElement(el){
            el.parentNode.removeChild(el);
        }
        function addElement(el) {
            var element = document.createElement(el);
            container.appendChild(element);
            return element;
        }

        function getClass(el) {
            return el.getAttribute("class");
        }

        function getDisplayProperty(element) {
            var styles = getComputedStyle(element);
            return styles.getPropertyValue("display");

        }
    });
}());