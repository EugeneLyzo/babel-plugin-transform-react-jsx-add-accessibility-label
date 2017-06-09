
 /**
 * This adds accessibilityLabel with FILENAME_FUNCTIONNAME_TAGNAME_TAGLEVEL to React component
 * definitions and to jsx tag literals.
 *
 *
 * == JSX Literals ==
 *
 * <sometag />
 *
 * becomes:
 *
 * <sometag accessibilityLabel="FILENAME_FUNCTIONNAME_TAGNAME_TAGLEVEL" />
 */


const TRACE_ID = "accessibilityLabel";
const FILE_NAME_VAR = "_jsxFileName";

export default function ({ types: t }) {
  function makeTrace(fileNameIdentifier, functionNameIdentifier, tagNameIdentifier, tagLevelNumber) {
    const tagLevelLiteral = tagLevelNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();
    const fileNameProperty = t.objectProperty(t.identifier("fileName"), fileNameIdentifier);
    const functionNameProperty = t.objectProperty(t.identifier("functionName"), functionNameIdentifier);
    const tagNameProperty = t.objectProperty(t.identifier("tagName"), tagNameIdentifier);
    const tagLevelProperty = t.objectProperty(t.identifier("lineNumber"), tagLevelLiteral);
    return t.objectExpression([fileNameProperty, functionNameProperty, tagNameProperty, tagLevelProperty]);
  }

  const visitor = {
    JSXOpeningElement(path, state) {
      const id = t.jSXIdentifier(TRACE_ID);
      const location = path.container.openingElement.loc;
      if (!location) {
        // the element was generated and doesn't have location information
        return;
      }

      const attributes = path.container.openingElement.attributes;
      for (let i = 0; i < attributes.length; i++) {
        const name = attributes[i].name;
        if (name && name.name === TRACE_ID) {
          // The __source attibute already exists
          return;
        }
      }

      if (!state.fileNameIdentifier) {
        const fileName = state.file.opts.filename;

        const fileNameIdentifier = path.scope.generateUidIdentifier(FILE_NAME_VAR);
        path.hub.file.scope.push({ id: fileNameIdentifier, init: t.stringLiteral(fileName) });
        state.fileNameIdentifier = fileNameIdentifier;
      }

      const trace = makeTrace(state.fileNameIdentifier, 'FUNCTIONNAME', 'TAGNAME', 0);
      attributes.push(t.jSXAttribute(id, t.jSXExpressionContainer(trace)));
    },
  };

  return {
    visitor,
  };
}
