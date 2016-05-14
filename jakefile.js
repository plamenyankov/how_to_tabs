/* globals desc:false, task:false, fail:false, complete:false, jake:false  */
(function () {
    'use strict';
    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    var karma = require('simplebuild-karma');
    var KARMA_CONFIG = "karma.conf.js";
    //*** General purpose tasks
    desc("Start the karma server");
    task("karma", function () {
        karma.start({
        configFile:KARMA_CONFIG
        },complete,fail);
    },{async:true});
    desc("Default jake task");
    task("default", ["version", "lint","test"], function () {
        console.log("\n\nBUILD OK");
    });
    desc("Run http server");
    task("run", function () {
        jake.exec("node node_modules/http-server/bin/http-server src", {interactive: true, async: true}, complete);
    });


    //*** Supporting tasks
    desc("Checking Node version");
    task("version", function () {
        console.log("Checking Node version");
        var expectedVersion = require('./package.json').engines.node;

        var actualVersion = process.version;
        if (semver.neq(actualVersion, expectedVersion)) {
            fail("Incorrect Node version: expected " + expectedVersion + " but was " + actualVersion);
        }
    });
    desc("Linting");
    task("lint", function () {
        process.stdout.write("Javascript linting ");
        jshint.checkFiles({
            files: ["jakefile.js", "./src/**/*.js"],
            options: lintOpt(),
            globals: lintGlobals()
        }, complete, fail);
        //jake.exec("node node_modules/jshint/bin/jshint jakefile.js",{interactive:true},complete);
    }, {async: true});
    desc("Run test");
    console.log("Running tests:");
    task("test", function () {
        karma.run({
            configFile:KARMA_CONFIG,
            expectedBrowsers:expectedBrowsers(),
            strict:!process.env.loose
        },complete,fail);
    },{async:true});
    function lintOpt() {
        return {
            bitwise: true,
            eqeqeq: true,
            forin: true,
            freeze: true,
            futurehostile: true,
            latedef: "nofunc",
            noarg: true,
            nocomma: true,
            nonbsp: true,
            nonew: true,
            strict: true,
            undef: true,
            node: true,
            browser: true
        };
    }

    function lintGlobals() {
        return {
            //Mocha
            describe: false,
            it: false,
            before: false,
            after: false,
            beforeEach: false,
            afterEach: false
        };
    }
    function expectedBrowsers(){
        return [
            "Chrome 50.0.2661 (Windows 10 0.0.0)",
            "Firefox 46.0.0 (Windows 10 0.0.0)"
        ];
    }
}());
