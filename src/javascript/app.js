
(function () {
    "use strict";
var addition = require('./addition');
var assert = require('./assert.js');
    describe("Addition",function(){
       it("add positive numbers",function(){
           assert.equal(addition.add(2,3),5);
       });
    });
}());