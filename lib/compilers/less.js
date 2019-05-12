var less = require('less');

function insert(data, opts) {
    if (opts.insert) {
        return `var insertCss = require('insert-css'); var styleElement = insertCss(${JSON.stringify(data)});`;
    } else {
        return `module.exports = ${JSON.stringify(data)};`;
    }
}

function less2js(content, opts) {
    return new Promise(function (resolve, reject) {
        less.render(content, function (err, data) {
            if (err !== null) return reject(err);
            resolve(insert(data.css, opts));
        })
    });
}

module.exports = (content, opts) => {
    return Promise.resolve(less2js(content, opts))
}
