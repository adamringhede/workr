function Worker() {
  var self = this;
  var setupData = JSON.parse(process.argv[2]);
  this.id = setupData.id;
  this.payload = setupData.payload;
  this._methods = {};
  process.on('message', function (data) {
    if (typeof data != 'string')
      return;
    var obj = JSON.parse(data);
    if (obj['__'] == true) {
      self._execute(obj['method'], obj['callId'], obj['args']);
    }
  });
}
Worker.prototype._execute = function (name, callId, args) {
  if (typeof this._methods[name] !== 'function') {
    this.emit('error', {
      code: 1,
      reason: "The method " + name + " is not defined"
    })
    return;
  }
  var self = this;
  args.push(function () {
    var results = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      results[_i - 0] = arguments[_i];
    }
    self.emit('__' + callId, results);
  });
  var returnValue = this._methods[name].apply(this, args);
};
Worker.prototype.define = function (name, fn) {
  this._methods[name] = fn;
};
Worker.prototype.emit = function (event, data) {
  process.send(JSON.stringify({
    event: event, data: data
  }));
};

module.exports = Worker;
