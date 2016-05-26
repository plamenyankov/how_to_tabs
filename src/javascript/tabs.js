(function(){
    "use strict";
    var classList = require("../vendors/classList.js");
    classList.shim();
    exports.initialize = function initialize(options){
        var tabs = options.tabs;
        var content = options.content;
        var className = options.contentHideClass;
        var defaultElement = options.default;
        var activeTabClass = options.activeTabClass;

        if(tabs === undefined) throw new Error("Expected options.tabs");
        if(activeTabClass === undefined) throw new Error("Expected options.activeTabClass");
        if(content === undefined) throw new Error("Expected options.content");
        if(className === undefined) throw new Error("Expected options.contentHideClass");
        if(defaultElement === undefined) throw new Error("Expected options.default");

        content.forEach(function(element){
           element.classList.add(className);
        });
        defaultElement.classList.remove(className);
        tabs[0].classList.add(activeTabClass);
    };

}());
