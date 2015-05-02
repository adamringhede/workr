var assert = require('assert');
var workr = require("../");
var Handle = workr.Handle;
var Worker = workr.Worker;

var workerFilePath = __dirname + '/assets/test_worker.js';

describe('Events', function () {
  it('are received by the Handle', function (done) {
    var worker = new Handle(workerFilePath);
    worker.on('test', function (data) {
      assert.equal(data, 'Hello world!');
      done();
    });
  });
});
