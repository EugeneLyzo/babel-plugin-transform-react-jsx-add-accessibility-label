var actual = transform(
  'var x = <sometag accessibilityLabel="custom" />;',
  Object.assign({}, opts, { filename: '/fake/path/mock.js' })
).code;

var expected = 'var x = <sometag accessibilityLabel="custom" />;';

assert.equal(actual, expected);
