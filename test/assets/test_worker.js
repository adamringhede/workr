var Worker = require("../../lib/Worker");
var w = new Worker();

w.emit('test', 'Hello world!');

w.define('square', function (x, done) {
  done(x * x);
});

w.define('add', function (a, b, done) {
  done(a + b);
});

w.define('getId', function (done) {
  done(this.id);
});

w.define('returnMultipleResponses', function (done) {
  done('a','b')
})

w.define('getPayload', function (done) {
  done(this.payload);
})
