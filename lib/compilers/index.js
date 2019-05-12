var extname = require('path').extname;
var html = require('./html.js');
var css = require('./css.js');
var less = require('./less.js');
var sass = require('./sass.js');
var stylus = require('./stylus.js');

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
