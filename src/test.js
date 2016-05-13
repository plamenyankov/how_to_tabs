
(function () {
    "use strict";
    var assert = require("chai").assert;
    assert.equal(add(1,2),3);
    function add(a, b) {
        return a + b;
    }

}());