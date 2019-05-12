function css2js(content, opts) {
    if (opts.insert) {
        return `var insertCss = require('insert-css'); var styleElement = insertCss(${JSON.stringify(content)});`;
    } else {
        return `module.exports = ${JSON.stringify(content)};`;
    }
}

module.exports = (content, opts) => {
    return Promise.resolve(css2js(content, opts))
}
