var assert = require('assert');
var workr = require("../");
var Handle = workr.Handle;
var Worker = workr.Worker;

var workerFilePath = __dirname + '/assets/test_worker.js';

describe('Worker', function () {
  it('has an id', function (done) {
    var worker = new Handle(workerFilePath);
    assert.ok(typeof worker.id === 'string');
    assert.ok(worker.id.length > 5);
    worker.call('getId').response(function (id) {
      assert.equal(worker.id, id);
      done()
    });
  });
  it('can be created using the function spawn', function (done) {
    var workerHandle = workr.spawn(workerFilePath);
    assert.ok(workerHandle instanceof Handle);
    done()
  });
})

describe('Events', function () {
    it('are received by the Handle', function (done) {
        var worker = new Handle(workerFilePath);
        worker.on('test', function (data) {
            assert.equal(data, 'Hello world!');
            done();
        });
    });
});

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
            assert.equal(result, 'Hello world!');
            done();
        });
    });
});
