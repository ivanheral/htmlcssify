function html2js(content) {
    return `module.exports = ${JSON.stringify(content)};`;
}

module.exports = (content) => {
    return Promise.resolve(html2js(content))
}
