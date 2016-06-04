(function () {
    "use strict";
    var classList = require("../vendors/classList.js");
    classList.shim();
    exports.initialize = function initialize(options) {

        checkOption(options.tabs, "options.tab");
        checkOption(options.activeTabClass, "options.activeTabClass");
        checkOption(options.content, "options.content");
        checkOption(options.hiddenContentClass, "options.hiddenContentClass");
        checkOption(options.defaultTab, "options.defaultTab");

        showTab(options.defaultTab, options);
        handleClicks(options);

    };
    function handleClicks(options){
        options.tabs.forEach(function(tabElement){

            tabElement.addEventListener("click", function (event) {

                showTab(tabElement, options);
            });
        });
    }
    function checkOption(option, name) {
        if (option === undefined) throw new Error("Expected " + name);
    }

    function showTab(defaultTab, options) {

        var activeIndex = findIndex(options.tabs, defaultTab);
        var defaultContent = options.content[activeIndex];

        options.content.forEach(function (element) {
            element.classList.add(options.hiddenContentClass);
        });
        defaultContent.classList.remove(options.hiddenContentClass);

        options.tabs.forEach(function (element) {
            element.classList.remove(options.activeTabClass);
        });

        defaultTab.classList.add(options.activeTabClass);
    }

    function findIndex(contentTabs, defaultTab) {
        for (var i = 0; i < contentTabs.length; i++) {
            if (contentTabs[i] === defaultTab) return i;
        }
        throw new Error("Could not find tab to show: "+defaultTab.outerHTML);
    }

}());
