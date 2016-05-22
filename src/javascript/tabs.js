(function(){
    "use strict";
    var classList = require("../vendors/classList.js");
    classList.shim();
    exports.initialize = function initialize(el,elClass){
        el.classList.add(elClass);
    };

}());
