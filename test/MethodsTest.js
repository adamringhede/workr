var assert = require('assert');
var workr = require("../");
var Handle = workr.Handle;
var Worker = workr.Worker;

var workerFilePath = __dirname + '/assets/test_worker.js';

describe('Methods', function () {
  var worker = new Handle(workerFilePath);
  it('can return a result based on input', function (done) {
    worker.call('square', 5).response(function (result) {
      assert.equal(25, result);
      done();
    });
  });
  it('can take multiple arguments', function (done) {
    worker.call('add', 42, 9).response(function (result) {
      assert.equal(51, result);
      done();
    });
  });
  it('can take arguments of various types', function (done) {
    worker.call('add', "Hello ", "world!").response(function (result) {
      assert.equal('Hello world!', result);
      done();
    });
  });
  it('can return multiple responses', function (done) {
    worker.call('returnMultipleResponses').response(function (result1, result2) {
      assert.equal('a', result1);
      assert.equal('b', result2)
      done();
    });
  });
  it('throws an error if method is not defined', function (done) {
    try {
      worker.call('asd');
    } catch (e) {
      done();
    }

  });
});
