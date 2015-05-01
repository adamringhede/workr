workr = {
  Handle: require('./lib/Handle'),
  Worker: require('./lib/Worker'),
  spawn: function (file) {
    return new workr.Handle(file);
  }
}

module.exports = workr;
