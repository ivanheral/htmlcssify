var htmlmin = require('html-minifier');

function html2js(content, opts) {
    return `module.exports = ${ JSON.stringify(opts.min ? htmlmin.minify(content, {minify: true, collapseWhitespace: true}) : content)};`;
}

module.exports = (content, opts) => {
    return Promise.resolve(html2js(content, opts))
}