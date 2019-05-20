var extname = require('path').extname;
var html = require('./compilers/html.js');
var css = require('./compilers/styles/css.js');
var less = require('./compilers/styles/less.js');
var sass = require('./compilers/styles/sass.js');
var stylus = require('./compilers/styles/stylus.js');

module.exports = (file, content, opts) => {
    var ext = extname(file);
    switch (ext) {
        case ".html":
            return html(content, opts);
            break;
        case ".css":
            return css(content, opts);
            break;
        case ".less":
            return less(content, opts);
            break;
        case ".styl":
            return stylus(content, opts);
            break;
        case ".scss":
            return sass(content, opts);
            break;
        default:
            break;
    }
}
