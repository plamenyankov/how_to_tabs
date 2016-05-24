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

        it("hides all content elements except the default upon initialization",function(){
            var element1 = addElement("div");
            var defaultElement = addElement("div");
            var element3 = addElement("div");

            tabs.initialize({
                content:[element1,defaultElement, element3 ],
                default:defaultElement,
                contentHideClass:"hideClass"
        });
            assert.equal(getClasses(element1), "hideClass", "element 1 should be hidden");
            assert.equal(getClasses(defaultElement), "", "default element should not be hidden");
            assert.equal(getClasses(element3), "hideClass", "element 3 should be hidden");

        });
        it("preserves existing classes when hiding a content element", function () {
            var hiddenElement = addElement("div");
            var defaultElement = addElement("div");

            hiddenElement.setAttribute("class", "existingClass");
            tabs.initialize({
                content:[hiddenElement,defaultElement],
                default:defaultElement,
                contentHideClass:"someClass"
            });
            assert.equal(getClasses(hiddenElement), "existingClass someClass");

        });

        function removeElement(el){
            el.parentNode.removeChild(el);
        }
        function addElement(el) {
            var element = document.createElement(el);
            container.appendChild(element);
            return element;
        }

        function getClasses(el) {
            return el.getAttribute("class");
        }

        function getDisplayProperty(element) {
            var styles = getComputedStyle(element);
            return styles.getPropertyValue("display");

        }
    });
}());