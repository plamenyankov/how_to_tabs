/* globals desc:false, task:false, fail:false, complete:false, jake:false  */
(function () {
    'use strict';
    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    //*** General purpose tasks
    desc("Default jake task");
    task("default", ["version","lint"], function () {
        console.log("\n\nBUILD OK");
    });
    desc("Run http server");
    task("run",function () {
        jake.exec("node node_modules/http-server/bin/http-server src",{interactive:true, async:true}, complete);
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
    task("lint", function () {
        process.stdout.write("Javascript linting ");
        jshint.checkFiles({
           files:["jakefile.js","./src/**/*.js"],
            options:{
                bitwise:true,
                eqeqeq:true,
                forin:true,
                freeze:true,
                futurehostile:true,
                latedef:"nofunc",
                noarg:true,
                nocomma:true,
                nonbsp:true,
                nonew:true,
                strict:true,
                undef:true,
                node:true,
                browser:true
            },
            globals:{
                //Mocha
                describe:false,
                it:false,
                before:false,
                after:false,
                beforeEach:false,
                afterEach:false
            }
        },complete,fail);
        //jake.exec("node node_modules/jshint/bin/jshint jakefile.js",{interactive:true},complete);
    },{async:true});

}());
