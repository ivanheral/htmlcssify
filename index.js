var through = require('through2');
var procHtmlCss = require('./lib/compilers');

function isHtmlCss(file) {
  return /(\.html|\.css|\.less|\.scss|\.styl|\.sass)$/.test(file);
}

module.exports = function (file, opts) {

  if (!isHtmlCss(file)) return through();
  opts = {
    insert: true
  };

  var chunks = []

  return through(
    function (chunk, enc, next) {
      chunks.push(chunk)
      next()
    },
    function (done) {
      var buffer = Buffer.concat(chunks)
      var source = buffer.toString('utf-8')
      procHtmlCss(file, source, opts).then(function (src) {
          this.push(src)
          done()
        }.bind(this))
        .catch(done)
    }
  )
};