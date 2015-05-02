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
  it('can be sent payload data on instantiation', function (done) {
    var payload = {
      foo: 23
    };
    var worker = workr.spawn(workerFilePath, payload);
    worker.call('getPayload').response(function (result) {
      assert.deepEqual(payload, result);
      assert.deepEqual(worker.payload, result);
      done()
    });
  })
})
