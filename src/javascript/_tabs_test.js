(function () {
    "use strict";

    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    describe("Tabs", function () {

        var ACTIVE_TAB = "activeClass";
        var HIDDEN_CONTENT = "hideClass";
        var IRRELEVANT = "irrelevant";
        var container;
        beforeEach(function () {
            container = document.createElement("div");
            document.body.appendChild(container);
        });
        afterEach(function () {
            removeElement(container);
        });

        it("use a class to hide all content elements except the default upon initialization", function () {
            var element1 = createTabContent();
            var defaultContent = createTabContent();
            var element3 = createTabContent();

            var defaultTab = createTab();
            tabs.initialize({
                tabs: [createTab(), defaultTab, createTab()],
                content: [element1, defaultContent, element3],
                defaultTab: defaultTab,
                activeTabClass: IRRELEVANT,
                hiddenContentClass: HIDDEN_CONTENT
            });
            assertContentHidden(element1, "element 1");
            assertContentVisible(defaultContent, "default element");
            assertContentHidden(element3, "element 3");

        });

        it("styles the default tab with a class upon initialization", function () {
            var defaultTab = createTab();
            var tab1 = createTab();
            var tab3 = createTab();
            var defaultElement = createTabContent();
            tabs.initialize({
                tabs: [tab1, defaultTab, tab3],
                content: [createTabContent(), defaultElement, createTabContent()],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: IRRELEVANT
            });
            assertTabInactive(tab1, "tab 1");
            assertTabActive(defaultTab, "default tab");
            assertTabInactive(tab3, "tab 3");
        });

        it("switch content when tab is clicked", function () {
            var tab1 = createTab();
            var tab2 = createTab();
            var tab3 = createTab();

            var content1 = createTabContent();
            var content2 = createTabContent();
            var content3 = createTabContent();

            tabs.initialize({
                tabs: [tab1, tab2, tab3],
                content: [content1, content2, content3],
                defaultTab: tab1,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: HIDDEN_CONTENT
            });
            tab2.click();
            assertContentVisible(content2, "content 2");
            assertContentHidden(content1, "content 1");
            assertTabActive(tab2, "tab 2");
            assertTabInactive(tab1, "tab 1");
            tab3.click();
            assertContentVisible(content3, "content 3");
            assertContentHidden(content2, "content 2");

        });
        it("handles clicks on sub-elements within tabs", function () {
            var defaultTab = createTab();
            var complexTab = addElement("div");
            complexTab.innerHTML = "<a id='link'>Link</a>";
            var link = document.getElementById("link");

            tabs.initialize({
                tabs: [defaultTab, complexTab],
                content: [createTabContent(), createTabContent()],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: HIDDEN_CONTENT
            });
            link.click();
            assertTabActive(complexTab);
        });
        it("preserves existing classes when adding new classes", function () {
            var hiddenContent = createTabContent();
            var defaultElement = createTabContent();
            var defaultTab = createTab();
            hiddenContent.setAttribute("class", "existingContentClass");
            defaultTab.setAttribute("class", "existingTabClass");
            tabs.initialize({
                tabs: [createTab(), defaultTab],
                content: [hiddenContent, defaultElement],
                defaultTab: defaultTab,
                activeTabClass: "activeTab",
                hiddenContentClass: "hiddenClass"
            });
            assert.equal(getClasses(defaultTab), "existingTabClass activeTab", "tab should preserve existing classes");
            assert.equal(getClasses(hiddenContent), "existingContentClass hiddenClass", "content should preserve existing classes");

        });
        function assertTabActive(element, elementName) {
            assert.equal(getClasses(element), ACTIVE_TAB, elementName + " should be styled");
        }

        function assertTabInactive(element, elementName) {
            assert.equal(getClasses(element), '', elementName + " should not be styled");
        }

        function assertContentHidden(element, elementName) {
            assert.equal(getClasses(element), HIDDEN_CONTENT, elementName + " should be hidden");
        }

        function assertContentVisible(element, elementName) {

            assert.equal(getClasses(element), "", elementName + " should not be hidden");
        }

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
            var elClasses = el.getAttribute("class");
            return elClasses === null ? "" : elClasses;
        }

        function getDisplayProperty(element) {
            var styles = getComputedStyle(element);
            return styles.getPropertyValue("display");

        }
    });
}());