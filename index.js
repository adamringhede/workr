workr = {
  Handle: require('./lib/Handle'),
  Worker: require('./lib/Worker'),
  spawn: function (filePath, payload) {
    return new workr.Handle(filePath, payload);
  }
}

module.exports = workr;
