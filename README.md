# workr

The purpose of this module is to make manager to worker process communication easy and to avoid pitfalls. It uses remote procedure style calls and event propagation.

### Methods
The main pitfall to avoid is that of the worker managing the manager. The worker should not call methods in the manager process, which would create a hard to manage dependency.
Instead, this module lets you define methods on the worker that the manager can call using a worker handle which can return a response to the manager.

### Events
Things may occur on the worker that the manager should be able to be notified by. Here is where events come in.
The worker can emit an event, which the manager can listen for on the worker handle. The worker handle inherits from
EventEmitter2 so that you can use namespaces and wildcards when registering your event handlers.

### Usage
See tests for additional examples of how to implement the managing process and the file ./test/assets/test_worker.js for methods definitions and event propagation.

#### Worker
The method done is used to return a response to the managing process when finished.
```JS
var Worker = require("../../lib/Worker");
var w = new Worker();

w.emit('test', 'Hello world!');

w.define('square', function (x, done) {
  done(x * x);
});

w.define('add', function (a, b, done) {
  done(a + b);
});
```

### Worker handle
A worker handle is returned when creating a new worker in the managing process.

```JS
var worker = new Handle(workerFilePath);

worker.call('square', 5).response(function (result) {
  assert.equal(25, result);
});

worker.call('add', "Hello ", "world!").response(function (result) {
  assert.equal("Hello world!", result);
});
```
