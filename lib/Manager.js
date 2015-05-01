var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../typings/tsd.d.ts"/>
var eventemitter2_1 = require("eventemitter2");
var child_process_1 = require("child_process");
var Puid = require('puid');
var puid = new Puid();
var Manager = (function (_super) {
    __extends(Manager, _super);
    function Manager(workerFilePath) {
        var _this = this;
        _super.call(this);
        this.id = puid.generate();
        this.worker = child_process_1.fork(workerFilePath);
        this.worker.on('message', function (data) {
            var obj = JSON.parse(data.toString());
            if (typeof obj.event == 'string') {
                _this.emit(obj.event, obj.data);
            }
        });
    }
    Manager.prototype.send = function (data) {
        var json = JSON.stringify(data);
        this.worker.send(json);
    };
    Manager.prototype.call = function (method) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callId = puid.generate();
        this.send({
            '///nwm///': true,
            method: method,
            args: args,
            callId: callId
        });''
        return {
            callId: callId,
            response: function (callback) {
                _this.once('__methodResponse/' + callId, function (result) {
                    callback.apply(_this, result);
                });
            }
        };
    };
    return Manager;
})(eventemitter2_1.EventEmitter2);
module.exports = Manager;
