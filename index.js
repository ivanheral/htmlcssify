var through = require('through2');
var procHtmlCss = require('./lib');
var fs = require('fs');
var path = require('path');

function isHtmlCss(file) {
  return /(\.html|\.css|\.less|\.scss|\.styl|\.sass)$/.test(file);
}

module.exports = function (file, opts) {

  if (!isHtmlCss(file)) return through();
  opts = opts || {
    insert: false,
    min: false
  };

  var chunks = []
  var css = "";

  return through(
    function (chunk, enc, next) {
      chunks.push(chunk)
      next()
    },
    function (done) {
      var buffer = Buffer.concat(chunks)
      var source = buffer.toString('utf-8')
      procHtmlCss(file, source, opts).then(function (src) {

          if (opts.extract) {
            var file = path.resolve(process.cwd(), opts.extract);
            css += src;
            fs.writeFile(file, css, function (err) {});

          } else {
            this.push(src)
          }

          done()
        }.bind(this))
        .catch(done)
    }
  )
};