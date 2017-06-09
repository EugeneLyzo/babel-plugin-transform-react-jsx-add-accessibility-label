# babel-plugin-transform-react-jsx-accessibility-label

> Adds accessibilityLabel to JSX elements for test on Appium.

## Example

**In**

```
<sometag />
```

**Out**

```
<sometag accessibilityLabel='FILENAME_FUNCTIONNAME_TAGNAME_TAGLEVEL' />
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-jsx-accessibility-label
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-jsx-accessibility-label"]
}
```

### Via CLI

```sh
babel --plugins transform-react-jsx-accessibility-label script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx-accessibility-label"]
});
```
