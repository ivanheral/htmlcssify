var stylus = require('stylus');
var procCss = require('./utils.js');

function stylus2js(file, content, opts) {
    return new Promise(function (resolve, reject) {
        stylus.render(content, {
            filename: file
        }, function (err, data) {
            if (err !== null) return reject(err);
            resolve(procCss(data, opts));
        })
    });
}

module.exports = (file, content, opts) => {
    return Promise.resolve(stylus2js(file, content, opts))
}