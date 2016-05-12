(function () {
    'use strict';
    var semver = require('semver');
    desc("Default jake task");
    task("default", ["version","lint"], function () {
        console.log("\n\nBUILD OK");
    });
    desc("Checking Node version");
    task("version", function () {
        console.log("Cheking Node version");
        var expectedVersion = require('./package.json').engines.node;

        var actualVersion = process.version;
        if (semver.neq(actualVersion, expectedVersion)) {
            fail("Incorrect Node version: expected " + expectedVersion + " but was " + actualVersion);
        }
    });
    task("lint", function () {
        jake.exec("node node_modules/jshint/bin/jshint jakefile.js",{interactive:true});
    },{async:true});

}());
