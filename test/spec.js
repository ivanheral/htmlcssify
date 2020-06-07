var browserify = require('browserify');
var acorn = require('acorn');
var walk = require('acorn-walk');
var htmlcss = require('..');

describe('htmlcssify', function () {

  it('html', function (done) {
    var b = browserify('./fixture.html', {
      basedir: __dirname
    });

    b.transform(htmlcss);
    b.bundle(function (err, bundle) {
      done(err || testExport(bundle, [
        '<!doctype html>',
        '<html>',
        '  <body class="bada">',
        '    <h1 class=\'bing\'>dude! \\r \\n \\ \\\\ \\\\\\</h1>',
        '  </body>',
        '</html>',
        ''
      ].join('\n')));
    });
  });

  it('html-min', function (done) {
    var b = browserify('./fixture.html', {
      basedir: __dirname
    });

    b.transform(htmlcss, {
      min: true
    });
    b.bundle(function (err, bundle) {
      done(err || testExport(bundle, [
        '<!doctype html><html><body class="bada"><h1 class="bing">dude! \\r \\n \\ \\\\ \\\\\\</h1>',
        '</body>',
        '</html>'
      ].join('')));
    });
  });

  ['css', 'less', 'styl', 'scss', 'postcss'].map((elem) => {
    it(elem, function (done) {
      stylesExport(done, elem, false);
    });

    it(`${elem}-min`, function (done) {
      stylesExport(done, elem, true);
    });
  })

  function stylesExport(done, ext, val_min) {
    var path = `./${ext}/app.${ext}`
    if (ext == 'postcss')
      path = `./postcss/app.scss`;
    var b = browserify(path, {
      basedir: __dirname
    });

    var result = `p {\n    color: #f00;\n}`

    switch (ext) {
      case "less":
      case "styl":
        result = `p {\n  color: #f00;\n}\n`
        break;
      case "scss":
        result = `p {\n  color: #f00; }\n`
        break;
      case "postcss":
        result = 'a {\n  border-radius: 5px; }\n'
        break
    }

    b.transform(htmlcss, {
      insert: false,
      min: val_min
    });
    b.bundle(function (err, bundle) {
      var solution = val_min ? 'p{color:red}' :
        result;
      if (ext == "postcss" && val_min) {
        solution = 'a{border-radius:5px}'
      }
      done(err || testExport(bundle, solution));
    });
  }

  function testExport(bundle, expected) {
    var ast = acorn.parse(bundle);
    return !walk.findNodeAt(ast, null, null, function (type, node) {
      if (type !== 'AssignmentExpression' ||
        node.left.type !== 'MemberExpression' ||
        node.left.object.name !== 'module' ||
        node.left.property.name !== 'exports' ||
        node.right.type !== 'Literal' ||
        node.right.value !== expected
      ) {
        return;
      }
      return true;
    }) && new Error('Unable to find exported string: ' + expected);
  }
});