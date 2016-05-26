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

        it("hides all content elements except the default upon initialization", function () {
            var element1 = createTabContent();
            var defaultContent = createTabContent();
            var element3 = createTabContent();

            var defaultTab = createTab();
            tabs.initialize({
                tabs: [createTab(), defaultTab, createTab()],
                content: [element1, defaultContent, element3],
                default: defaultTab,
                activeTabClass: "activeTab",
                contentHideClass: "hideClass"
            });
            assert.equal(getClasses(element1), "hideClass", "element 1 should be hidden");
            assert.equal(getClasses(defaultContent), "", "default element should not be hidden");
            assert.equal(getClasses(element3), "hideClass", "element 3 should be hidden");

        });
        it("preserves existing classes when hiding a content element", function () {
            var hiddenContent = createTabContent();
            var defaultElement = createTabContent();
            hiddenContent.setAttribute("class", "existingClass");
            var defaultTab = createTab();
            tabs.initialize({
                tabs: [ createTab(),defaultTab],
                content: [hiddenContent, defaultElement],
                default: defaultTab,
                activeTabClass: "activeTab",
                contentHideClass: "someClass"
            });
            assert.equal(getClasses(hiddenContent), "existingClass someClass");

        });
        it("styles the default tab with a class", function () {
            var defaultTab = createTab();
            var tab1 = createTab();
            var tab3 = createTab();
            var defaultElement = createTabContent();
            tabs.initialize({
                tabs: [tab1,defaultTab,tab3],
                content: [ createTabContent(),defaultElement, createTabContent()],
                default: defaultTab,
                activeTabClass: "activeTab",
                contentHideClass: "ignored"
            });
            assert.equal(getClasses(tab1), null, "tab 1 should not be styled");
            assert.equal(getClasses(defaultTab), "activeTab", "default tab should be styled");
            assert.equal(getClasses(tab3), null, "tab 3 should not be styled");

        });
        function removeElement(el) {
            el.parentNode.removeChild(el);
        }

        function createTab() {
            var tab = addElement("div");
            tab.innerHTML = "tab";
            return tab;
        }

        function createTabContent() {
            var tab = addElement("div");
            tab.innerHTML = "content";
            return tab;
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