var extname = require('path').extname;
var html = require('./compilers/html');
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
            return less(file, content, opts);
            break;
        case ".styl":
            return stylus(file, content, opts);
            break;
        case ".scss":
        case ".sass":
            return sass(file, content, opts);
            break;
        default:
            break;
    }
}