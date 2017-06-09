var actual = transform(
  'var x = <sometag />',
  Object.assign({}, opts, { filename: '/fake/path/mock.js' })
).code;

var expected = multiline([
  'var _jsxFileName = "/fake/path/mock.js";',
  'var x = <sometag accessibilityLabel="FILENAME_FUNCTION_TAGNAME_TAGLEVEL" />;',
]);

assert.equal(actual, expected);
