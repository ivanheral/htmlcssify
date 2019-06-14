var sass = require('node-sass');
var procCss = require('./utils.js');

function sass2js(file, content, opts) {
    return new Promise(function (resolve, reject) {
        sass.render({
            file: file
        }, function (err, res) {
            if (err !== null) return reject(err);
            resolve(procCss(res.css.toString(), opts));
        });
    });
}

module.exports = (file, content, opts) => {
    return Promise.resolve(sass2js(file, content, opts))
}