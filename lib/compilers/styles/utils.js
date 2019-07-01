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

    if (opts.min)
        data = data.replace(/\s+/g, '');

    if (opts.insert) {
        return `var elem = document.createElement('style') elem.setAttribute('type', 'text/css')
        if ('textContent' in elem) {elem.textContent = ${JSON.stringify(data)}} else {
        elem.styleSheet.cssText = ${JSON.stringify(data)}}
        document.getElementsByTagName('head')[0].appendChild(elem)`;
    }
    return `module.exports = ${JSON.stringify(data)};`;
}