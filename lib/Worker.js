
var Worker = (function () {
    function Worker() {
        // listen for method calls and trigger them on events with the __method/ prefix
        var _this = this;
        this._methods = {};
        process.on('message', function (data) {
            if (typeof data != 'string')
                return;
            var obj = JSON.parse(data);
            if (obj['///nwm///'] == true) {
                _this._execute(obj['method'], obj['callId'], obj['args']);
            }
        });
    }
    Worker.prototype._execute = function (name, callId, args) {
        if (typeof this._methods[name] !== 'function')
            throw "Method [" + name + "] does not exist on worker";
        var self = this;
        args.push(function () {
            var results = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                results[_i - 0] = arguments[_i];
            }
            self.emit('__methodResponse/' + callId, results);
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
    return Worker;
})();
module.exports = Worker;