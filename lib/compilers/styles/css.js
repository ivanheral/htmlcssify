var procCss = require('./utils.js');

module.exports = (content, opts) => {
    return Promise.resolve(procCss(content, opts))
}