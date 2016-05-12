(function () {
    'use strict';
    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
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
        process.stdout.write("Javascript linting ");
        jshint.checkFiles({
           files:"jakefile.js",
            options:{},
            globals:{}
        },complete,fail);
        //jake.exec("node node_modules/jshint/bin/jshint jakefile.js",{interactive:true},complete);
    },{async:true});

}());
