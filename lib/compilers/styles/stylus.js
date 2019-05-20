var stylus = require('stylus');

function insert(data, opts) {
    if (opts.min) {
        data = data.replace(/\s+/g,'');
    }

    if (opts.insert) {
        return `var insertCss = require('insert-css'); var styleElement = insertCss(${JSON.stringify(data)});`;
    } else {
        return `module.exports = ${JSON.stringify(data)};`;
    }
}

function stylus2js(content, opts) {
    return new Promise(function (resolve, reject) {
        stylus.render(content, function (err, data) {
            if (err !== null) return reject(err);
            resolve(insert(data, opts));
        })
    });
}

module.exports = (content, opts) => {
    return Promise.resolve(stylus2js(content, opts))
}
