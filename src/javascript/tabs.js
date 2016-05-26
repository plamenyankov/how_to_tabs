(function () {
    "use strict";
    var classList = require("../vendors/classList.js");
    classList.shim();
    exports.initialize = function initialize(options) {
        var tabs = options.tabs;
        var content = options.content;
        var className = options.contentHideClass;
        var defaultTab = options.default;
        var activeTabClass = options.activeTabClass;

        if (tabs === undefined) throw new Error("Expected options.tabs");
        if (activeTabClass === undefined) throw new Error("Expected options.activeTabClass");
        if (content === undefined) throw new Error("Expected options.content");
        if (className === undefined) throw new Error("Expected options.contentHideClass");
        if (defaultTab === undefined) throw new Error("Expected options.default");

        var activeIndex = findIndexOfDefaultElement(tabs, defaultTab);
        var defaultContent = content[activeIndex];

        content.forEach(function (element) {
            element.classList.add(className);
        });
        defaultContent.classList.remove(className);

        defaultTab.classList.add(activeTabClass);
    };
    function findIndexOfDefaultElement(contentTabs, defaultTab) {
        for (var i = 0; i < contentTabs.length; i++) {
            if (contentTabs[i] === defaultTab) return i;
        }
        throw new Error("Could not find default in list");
    }

}());
