var assert = require('assert');
//var Manager = require("../lib/Manager");
//var Worker = require("../lib/Worker");
var NodeWorkers = require("../");
var Manager = NodeWorkers.Manager;
var Worker = NodeWorkers.Worker;

describe('Events', function () {
    it('are received by the manager', function (done) {
        var m = new Manager(__dirname + '/assets/test.js');
        m.on('test', function (data) {
            assert.equal(data, 'Hello world!');
            done();
        });
    });
});

describe('Methods', function () {
    var m = new Manager(__dirname + '/assets/test.js');
    it('can return a result based on input', function (done) {
        m.call('square', 5).response(function (result) {
            assert.equal(25, result);
            done();
        });
    });
    it('can take multiple arguments', function (done) {
        m.call('add', 42, 9).response(function (result) {
            assert.equal(51, result);
            done();
        });
    });
    it('can take arguments of various types', function (done) {
        m.call('add', "Hello ", "world!").response(function (result) {
            assert.equal(result, 'Hello world!');
            done();
        });
    });
});
