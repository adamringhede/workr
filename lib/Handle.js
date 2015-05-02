var Emitter = require("eventemitter2").EventEmitter2;
var fork = require("child_process").fork;
var Puid = require('puid');
var puid = new Puid();

function Handle(workerFilePath) {
  Emitter.call(this);
  var self = this;
  this.id = puid.generate();
  this.worker = fork(workerFilePath, [this.id]);
  this.worker.on('message', function (data) {
    var obj = JSON.parse(data.toString());
    if (typeof obj.event == 'string') {
      self.emit(obj.event, obj.data);
    }
  });
}

Handle.prototype = new Emitter();
Handle.prototype.constructor = Handle;

Handle.prototype.send = function (data) {
  var json = JSON.stringify(data);
  this.worker.send(json);
};
Handle.prototype.call = function (method) {
  var self = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }
  var callId = puid.generate();
  this.send({
    '__': true,
    method: method,
    args: args,
    callId: callId
  });
  return {
    response: function (callback) {
      self.once('__' + callId, function (result) {
        callback.apply(self, result);
      });
    }
  };
};

module.exports = Handle;
