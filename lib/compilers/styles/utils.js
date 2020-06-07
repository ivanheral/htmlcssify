var postcss = require('postcss');
var path = require('path');
var clean = require('clean-css');

const load_postcss = async (data) => {
    // postcss
    try {
        var config;
        var fileConfig = path.resolve(process.cwd(), './postcss.config.js')
        config = require(fileConfig);
        var result = await postcss(config.plugins).process(data, {
            from: undefined,
            to: undefined
        });
    } catch (error) {
        return data;
    }

    return result.css;
};

module.exports = async (data, opts) => {

    var new_data = await load_postcss(data);
    if (opts.min) {
        data = new clean({}).minify(new_data).styles;
    } else {
        data = new_data;
    }

    if (opts.extract) {
        return data;
    } else if (opts.insert) {
        return `var insertCss = require('insert-css'); var styleElement = insertCss(${JSON.stringify(data)});`;;
    } else
        return `module.exports = ${JSON.stringify(data)};`;
}