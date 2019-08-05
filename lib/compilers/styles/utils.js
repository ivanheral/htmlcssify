var postcss = require('postcss');
var path = require('path');

module.exports = (data, opts) => {

    // postcss
    var config;
    var fileConfig = path.resolve(process.cwd(), 'postcss.config.js')

    try {
        config = require(fileConfig);
    } catch (err) {}

    if (config !== void 0) {
        postcss(config.plugins).process(data, config).then(result => {
            data = result.css;
        })
    }

    if (opts.min) {
        var CleanCSS = require('clean-css');
        data = new CleanCSS({}).minify(data).styles;
    }

    if (opts.insert) {
        return `var insertCss = require('insert-css'); var styleElement = insertCss(${JSON.stringify(data)});`;;
    }
    return `module.exports = ${JSON.stringify(data)};`;
}