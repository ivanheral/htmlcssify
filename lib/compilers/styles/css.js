function css2js(data, opts) {
    if (opts.min) {
        data = data.replace(/\s+/g,'');
    }

    if (opts.insert) {
        return `var insertCss = require('insert-css'); var styleElement = insertCss(${JSON.stringify(data)});`;
    } else {
        return `module.exports = ${JSON.stringify(data)};`;
    }
}

module.exports = (content, opts) => {
    return Promise.resolve(css2js(content, opts))
}