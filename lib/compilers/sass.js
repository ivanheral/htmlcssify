var sass = require('node-sass');

function insert(data, opts) {
    if (opts.insert) {
        return `var insertCss = require('insert-css'); var styleElement = insertCss(${JSON.stringify(data)});`;
    } else {
        return `module.exports = ${JSON.stringify(data)};`;
    }
}

function sass2js(content, opts) {
    return new Promise(function (resolve, reject) {
        sass.render({
            data: content
        }, function (err, res) {
            if (err !== null) return reject(err);
            resolve(insert(res.css.toString(), opts));
        });
    });
}

module.exports = (content, opts) => {
    return Promise.resolve(sass2js(content, opts))
}