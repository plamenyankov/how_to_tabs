(function(){
    "use strict";
    var classList = require("../vendors/classList.js");
    classList.shim();
    exports.initialize = function initialize(options){
        var content = options.content;
        var className = options.contentHideClass;
        var defaultElement = options.default;
        
        if(content === undefined) throw new Error("Expected options.content");
        if(className === undefined) throw new Error("Expected options.contentHideClass");
        if(defaultElement === undefined) throw new Error("Expected options.default");

        content.forEach(function(element){
           element.classList.add(className);
        });
        defaultElement.classList.remove(className);
    };

}());
