var less = require('less');
var procCss = require('./utils.js');

function less2js(file, content, opts) {
    return new Promise(function (resolve, reject) {
        less.render(content, {
            filename: file
        }, function (err, data) {
            if (err !== null) return reject(err);
            resolve(procCss(data.css, opts));
        })
    });
}

module.exports = (file, content, opts) => {
    return Promise.resolve(less2js(file, content, opts))
}