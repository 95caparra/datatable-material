"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ts = require("typescript");
function replaceResources(shouldTransform, getTypeChecker) {
    return (context) => {
        const typeChecker = getTypeChecker();
        const visitNode = (node) => {
            if (ts.isClassDeclaration(node)) {
                node.decorators = ts.visitNodes(node.decorators, (node) => visitDecorator(node, typeChecker));
            }
            return ts.visitEachChild(node, visitNode, context);
        };
        return (sourceFile) => (shouldTransform(sourceFile.fileName)
            ? ts.visitNode(sourceFile, visitNode)
            : sourceFile);
    };
}
exports.replaceResources = replaceResources;
function visitDecorator(node, typeChecker) {
    if (!isComponentDecorator(node, typeChecker)) {
        return node;
    }
    if (!ts.isCallExpression(node.expression)) {
        return node;
    }
    const decoratorFactory = node.expression;
    const args = decoratorFactory.arguments;
    if (args.length !== 1 || !ts.isObjectLiteralExpression(args[0])) {
        // Unsupported component metadata
        return node;
    }
    const objectExpression = args[0];
    const styleReplacements = [];
    // visit all properties
    let properties = ts.visitNodes(objectExpression.properties, (node) => visitComponentMetadata(node, styleReplacements));
    // replace properties with updated properties
    if (styleReplacements.length > 0) {
        const styleProperty = ts.createPropertyAssignment(ts.createIdentifier('styles'), ts.createArrayLiteral(styleReplacements));
        properties = ts.createNodeArray([...properties, styleProperty]);
    }
    return ts.updateDecorator(node, ts.updateCall(decoratorFactory, decoratorFactory.expression, decoratorFactory.typeArguments, [ts.updateObjectLiteral(objectExpression, properties)]));
}
function visitComponentMetadata(node, styleReplacements) {
    if (!ts.isPropertyAssignment(node) || ts.isComputedPropertyName(node.name)) {
        return node;
    }
    const name = node.name.text;
    switch (name) {
        case 'moduleId':
            return undefined;
        case 'templateUrl':
            return ts.updatePropertyAssignment(node, ts.createIdentifier('template'), createRequireExpression(node.initializer));
        case 'styles':
        case 'styleUrls':
            if (!ts.isArrayLiteralExpression(node.initializer)) {
                return node;
            }
            const isInlineStyles = name === 'styles';
            const styles = ts.visitNodes(node.initializer.elements, (node) => {
                if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) {
                    return node;
                }
                return isInlineStyles ? ts.createLiteral(node.text) : createRequireExpression(node);
            });
            // Styles should be placed first
            if (isInlineStyles) {
                styleReplacements.unshift(...styles);
            }
            else {
                styleReplacements.push(...styles);
            }
            return undefined;
        default:
            return node;
    }
}
function getResourceUrl(node) {
    // only analyze strings
    if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) {
        return null;
    }
    return `${/^\.?\.\//.test(node.text) ? '' : './'}${node.text}`;
}
exports.getResourceUrl = getResourceUrl;
function isComponentDecorator(node, typeChecker) {
    if (!ts.isDecorator(node)) {
        return false;
    }
    const origin = getDecoratorOrigin(node, typeChecker);
    if (origin && origin.module === '@angular/core' && origin.name === 'Component') {
        return true;
    }
    return false;
}
function createRequireExpression(node) {
    const url = getResourceUrl(node);
    if (!url) {
        return node;
    }
    return ts.createCall(ts.createIdentifier('require'), undefined, [ts.createLiteral(url)]);
}
function getDecoratorOrigin(decorator, typeChecker) {
    if (!ts.isCallExpression(decorator.expression)) {
        return null;
    }
    let identifier;
    let name = '';
    if (ts.isPropertyAccessExpression(decorator.expression.expression)) {
        identifier = decorator.expression.expression.expression;
        name = decorator.expression.expression.name.text;
    }
    else if (ts.isIdentifier(decorator.expression.expression)) {
        identifier = decorator.expression.expression;
    }
    else {
        return null;
    }
    // NOTE: resolver.getReferencedImportDeclaration would work as well but is internal
    const symbol = typeChecker.getSymbolAtLocation(identifier);
    if (symbol && symbol.declarations && symbol.declarations.length > 0) {
        const declaration = symbol.declarations[0];
        let module;
        if (ts.isImportSpecifier(declaration)) {
            name = (declaration.propertyName || declaration.name).text;
            module = declaration.parent.parent.parent.moduleSpecifier.text;
        }
        else if (ts.isNamespaceImport(declaration)) {
            // Use the name from the decorator namespace property access
            module = declaration.parent.parent.moduleSpecifier.text;
        }
        else if (ts.isImportClause(declaration)) {
            name = declaration.name.text;
            module = declaration.parent.moduleSpecifier.text;
        }
        else {
            return null;
        }
        return { name, module };
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZV9yZXNvdXJjZXMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL25ndG9vbHMvd2VicGFjay9zcmMvdHJhbnNmb3JtZXJzL3JlcGxhY2VfcmVzb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUNBQWlDO0FBRWpDLFNBQWdCLGdCQUFnQixDQUM5QixlQUE4QyxFQUM5QyxjQUFvQztJQUdwQyxPQUFPLENBQUMsT0FBaUMsRUFBRSxFQUFFO1FBQzNDLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBRXJDLE1BQU0sU0FBUyxHQUFlLENBQUMsSUFBa0IsRUFBRSxFQUFFO1lBQ25ELElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQzdCLElBQUksQ0FBQyxVQUFVLEVBQ2YsQ0FBQyxJQUFrQixFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUMxRCxDQUFDO2FBQ0g7WUFFRCxPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUM7UUFFRixPQUFPLENBQUMsVUFBeUIsRUFBRSxFQUFFLENBQUMsQ0FDcEMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztZQUNyQyxDQUFDLENBQUMsVUFBVSxDQUNmLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBekJELDRDQXlCQztBQUVELFNBQVMsY0FBYyxDQUFDLElBQWtCLEVBQUUsV0FBMkI7SUFDckUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsRUFBRTtR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QUFHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNuRSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksTUFBYyxDQUFDO1FBRW5CLElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3JDLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMzRCxNQUFNLEdBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWlDLENBQUMsSUFBSSxDQUFDO1NBQ25GO2FBQU0sSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDNUMsNERBQTREO1lBQzVELE1BQU0sR0FBSSxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFpQyxDQUFDLElBQUksQ0FBQztTQUM1RTthQUFNLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN6QyxJQUFJLEdBQUksV0FBVyxDQUFDLElBQXNCLENBQUMsSUFBSSxDQUFDO1lBQ2hELE1BQU0sR0FBSSxXQUFXLENBQUMsTUFBTSxDQUFDLGVBQWlDLENBQUMsSUFBSSxDQUFDO1NBQ3JFO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztLQUN6QjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVJlc291cmNlcyhcbiAgc2hvdWxkVHJhbnNmb3JtOiAoZmlsZU5hbWU6IHN0cmluZykgPT4gYm9vbGVhbixcbiAgZ2V0VHlwZUNoZWNrZXI6ICgpID0+IHRzLlR5cGVDaGVja2VyLFxuKTogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+IHtcblxuICByZXR1cm4gKGNvbnRleHQ6IHRzLlRyYW5zZm9ybWF0aW9uQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHR5cGVDaGVja2VyID0gZ2V0VHlwZUNoZWNrZXIoKTtcblxuICAgIGNvbnN0IHZpc2l0Tm9kZTogdHMuVmlzaXRvciA9IChub2RlOiB0cy5EZWNvcmF0b3IpID0+IHtcbiAgICAgIGlmICh0cy5pc0NsYXNzRGVjbGFyYXRpb24obm9kZSkpIHtcbiAgICAgICAgbm9kZS5kZWNvcmF0b3JzID0gdHMudmlzaXROb2RlcyhcbiAgICAgICAgICBub2RlLmRlY29yYXRvcnMsXG4gICAgICAgICAgKG5vZGU6IHRzLkRlY29yYXRvcikgPT4gdmlzaXREZWNvcmF0b3Iobm9kZSwgdHlwZUNoZWNrZXIpLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHMudmlzaXRFYWNoQ2hpbGQobm9kZSwgdmlzaXROb2RlLCBjb250ZXh0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKSA9PiAoXG4gICAgICBzaG91bGRUcmFuc2Zvcm0oc291cmNlRmlsZS5maWxlTmFtZSlcbiAgICAgICAgPyB0cy52aXNpdE5vZGUoc291cmNlRmlsZSwgdmlzaXROb2RlKVxuICAgICAgICA6IHNvdXJjZUZpbGVcbiAgICApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB2aXNpdERlY29yYXRvcihub2RlOiB0cy5EZWNvcmF0b3IsIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcik6IHRzLkRlY29yYXRvciB7XG4gIGlmICghaXNDb21wb25lbnREZWNvcmF0b3Iobm9kZSwgdHlwZUNoZWNrZXIpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBpZiAoIXRzLmlzQ2FsbEV4cHJlc3Npb24obm9kZS5leHByZXNzaW9uKSkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY29uc3QgZGVjb3JhdG9yRmFjdG9yeSA9IG5vZGUuZXhwcmVzc2lvbjtcbiAgY29uc3QgYXJncyA9IGRlY29yYXRvckZhY3RvcnkuYXJndW1lbnRzO1xuICBpZiAoYXJncy5sZW5ndGggIT09IDEgfHwgIXRzLmlzT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24oYXJnc1swXSkpIHtcbiAgICAvLyBVbnN1cHBvcnRlZCBjb21wb25lbnQgbWV0YWRhdGFcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNvbnN0IG9iamVjdEV4cHJlc3Npb24gPSBhcmdzWzBdIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uO1xuICBjb25zdCBzdHlsZVJlcGxhY2VtZW50czogdHMuRXhwcmVzc2lvbltdID0gW107XG5cbiAgLy8gdmlzaXQgYWxsIHByb3BlcnRpZXNcbiAgbGV0IHByb3BlcnRpZXMgPSB0cy52aXNpdE5vZGVzKFxuICAgIG9iamVjdEV4cHJlc3Npb24ucHJvcGVydGllcyxcbiAgICAobm9kZTogdHMuT2JqZWN0TGl0ZXJhbEVsZW1lbnRMaWtlKSA9PiB2aXNpdENvbXBvbmVudE1ldGFkYXRhKG5vZGUsIHN0eWxlUmVwbGFjZW1lbnRzKSxcbiAgKTtcblxuICAvLyByZXBsYWNlIHByb3BlcnRpZXMgd2l0aCB1cGRhdGVkIHByb3BlcnRpZXNcbiAgaWYgKHN0eWxlUmVwbGFjZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBzdHlsZVByb3BlcnR5ID0gdHMuY3JlYXRlUHJvcGVydHlBc3NpZ25tZW50KFxuICAgICAgdHMuY3JlYXRlSWRlbnRpZmllcignc3R5bGVzJyksXG4gICAgICB0cy5jcmVhdGVBcnJheUxpdGVyYWwoc3R5bGVSZXBsYWNlbWVudHMpLFxuICAgICk7XG5cbiAgICBwcm9wZXJ0aWVzID0gdHMuY3JlYXRlTm9kZUFycmF5KFsuLi5wcm9wZXJ0aWVzLCBzdHlsZVByb3BlcnR5XSk7XG4gIH1cblxuICByZXR1cm4gdHMudXBkYXRlRGVjb3JhdG9yKFxuICAgIG5vZGUsXG4gICAgdHMudXBkYXRlQ2FsbChcbiAgICAgIGRlY29yYXRvckZhY3RvcnksXG4gICAgICBkZWNvcmF0b3JGYWN0b3J5LmV4cHJlc3Npb24sXG4gICAgICBkZWNvcmF0b3JGYWN0b3J5LnR5cGVBcmd1bWVudHMsXG4gICAgICBbdHMudXBkYXRlT2JqZWN0TGl0ZXJhbChvYmplY3RFeHByZXNzaW9uLCBwcm9wZXJ0aWVzKV0sXG4gICAgKSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gdmlzaXRDb21wb25lbnRNZXRhZGF0YShcbiAgbm9kZTogdHMuT2JqZWN0TGl0ZXJhbEVsZW1lbnRMaWtlLFxuICBzdHlsZVJlcGxhY2VtZW50czogdHMuRXhwcmVzc2lvbltdLFxuKTogdHMuT2JqZWN0TGl0ZXJhbEVsZW1lbnRMaWtlIHwgdW5kZWZpbmVkIHtcbiAgaWYgKCF0cy5pc1Byb3BlcnR5QXNzaWdubWVudChub2RlKSB8fCB0cy5pc0NvbXB1dGVkUHJvcGVydHlOYW1lKG5vZGUubmFtZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBub2RlLm5hbWUudGV4dDtcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSAnbW9kdWxlSWQnOlxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgY2FzZSAndGVtcGxhdGVVcmwnOlxuICAgICAgcmV0dXJuIHRzLnVwZGF0ZVByb3BlcnR5QXNzaWdubWVudChcbiAgICAgICAgbm9kZSxcbiAgICAgICAgdHMuY3JlYXRlSWRlbnRpZmllcigndGVtcGxhdGUnKSxcbiAgICAgICAgY3JlYXRlUmVxdWlyZUV4cHJlc3Npb24obm9kZS5pbml0aWFsaXplciksXG4gICAgICApO1xuXG4gICAgY2FzZSAnc3R5bGVzJzpcbiAgICBjYXNlICdzdHlsZVVybHMnOlxuICAgICAgaWYgKCF0cy5pc0FycmF5TGl0ZXJhbEV4cHJlc3Npb24obm9kZS5pbml0aWFsaXplcikpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzSW5saW5lU3R5bGVzID0gbmFtZSA9PT0gJ3N0eWxlcyc7XG4gICAgICBjb25zdCBzdHlsZXMgPSB0cy52aXNpdE5vZGVzKFxuICAgICAgICBub2RlLmluaXRpYWxpemVyLmVsZW1lbnRzLFxuICAgICAgICAobm9kZTogdHMuRXhwcmVzc2lvbikgPT4ge1xuICAgICAgICAgIGlmICghdHMuaXNTdHJpbmdMaXRlcmFsKG5vZGUpICYmICF0cy5pc05vU3Vic3RpdHV0aW9uVGVtcGxhdGVMaXRlcmFsKG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gaXNJbmxpbmVTdHlsZXMgPyB0cy5jcmVhdGVMaXRlcmFsKG5vZGUudGV4dCkgOiBjcmVhdGVSZXF1aXJlRXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIC8vIFN0eWxlcyBzaG91bGQgYmUgcGxhY2VkIGZpcnN0XG4gICAgICBpZiAoaXNJbmxpbmVTdHlsZXMpIHtcbiAgICAgICAgc3R5bGVSZXBsYWNlbWVudHMudW5zaGlmdCguLi5zdHlsZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVSZXBsYWNlbWVudHMucHVzaCguLi5zdHlsZXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBub2RlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvdXJjZVVybChub2RlOiB0cy5FeHByZXNzaW9uKTogc3RyaW5nIHwgbnVsbCB7XG4gIC8vIG9ubHkgYW5hbHl6ZSBzdHJpbmdzXG4gIGlmICghdHMuaXNTdHJpbmdMaXRlcmFsKG5vZGUpICYmICF0cy5pc05vU3Vic3RpdHV0aW9uVGVtcGxhdGVMaXRlcmFsKG5vZGUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gYCR7L15cXC4/XFwuXFwvLy50ZXN0KG5vZGUudGV4dCkgPyAnJyA6ICcuLyd9JHtub2RlLnRleHR9YDtcbn1cblxuZnVuY3Rpb24gaXNDb21wb25lbnREZWNvcmF0b3Iobm9kZTogdHMuTm9kZSwgdHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyKTogbm9kZSBpcyB0cy5EZWNvcmF0b3Ige1xuICBpZiAoIXRzLmlzRGVjb3JhdG9yKG5vZGUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgb3JpZ2luID0gZ2V0RGVjb3JhdG9yT3JpZ2luKG5vZGUsIHR5cGVDaGVja2VyKTtcbiAgaWYgKG9yaWdpbiAmJiBvcmlnaW4ubW9kdWxlID09PSAnQGFuZ3VsYXIvY29yZScgJiYgb3JpZ2luLm5hbWUgPT09ICdDb21wb25lbnQnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVpcmVFeHByZXNzaW9uKG5vZGU6IHRzLkV4cHJlc3Npb24pOiB0cy5FeHByZXNzaW9uIHtcbiAgY29uc3QgdXJsID0gZ2V0UmVzb3VyY2VVcmwobm9kZSk7XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICByZXR1cm4gdHMuY3JlYXRlQ2FsbChcbiAgICB0cy5jcmVhdGVJZGVudGlmaWVyKCdyZXF1aXJlJyksXG4gICAgdW5kZWZpbmVkLFxuICAgIFt0cy5jcmVhdGVMaXRlcmFsKHVybCldLFxuICApO1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9yT3JpZ2luIHtcbiAgbmFtZTogc3RyaW5nO1xuICBtb2R1bGU6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gZ2V0RGVjb3JhdG9yT3JpZ2luKFxuICBkZWNvcmF0b3I6IHRzLkRlY29yYXRvcixcbiAgdHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyLFxuKTogRGVjb3JhdG9yT3JpZ2luIHwgbnVsbCB7XG4gIGlmICghdHMuaXNDYWxsRXhwcmVzc2lvbihkZWNvcmF0b3IuZXhwcmVzc2lvbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxldCBpZGVudGlmaWVyOiB0cy5Ob2RlO1xuICBsZXQgbmFtZSA9ICcnO1xuXG4gIGlmICh0cy5pc1Byb3BlcnR5QWNjZXNzRXhwcmVzc2lvbihkZWNvcmF0b3IuZXhwcmVzc2lvbi5leHByZXNzaW9uKSkge1xuICAgIGlkZW50aWZpZXIgPSBkZWNvcmF0b3IuZXhwcmVzc2lvbi5leHByZXNzaW9uLmV4cHJlc3Npb247XG4gICAgbmFtZSA9IGRlY29yYXRvci5leHByZXNzaW9uLmV4cHJlc3Npb24ubmFtZS50ZXh0O1xuICB9IGVsc2UgaWYgKHRzLmlzSWRlbnRpZmllcihkZWNvcmF0b3IuZXhwcmVzc2lvbi5leHByZXNzaW9uKSkge1xuICAgIGlkZW50aWZpZXIgPSBkZWNvcmF0b3IuZXhwcmVzc2lvbi5leHByZXNzaW9uO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gTk9URTogcmVzb2x2ZXIuZ2V0UmVmZXJlbmNlZEltcG9ydERlY2xhcmF0aW9uIHdvdWxkIHdvcmsgYXMgd2VsbCBidXQgaXMgaW50ZXJuYWxcbiAgY29uc3Qgc3ltYm9sID0gdHlwZUNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihpZGVudGlmaWVyKTtcbiAgaWYgKHN5bWJvbCAmJiBzeW1ib2wuZGVjbGFyYXRpb25zICYmIHN5bWJvbC5kZWNsYXJhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGRlY2xhcmF0aW9uID0gc3ltYm9sLmRlY2xhcmF0aW9uc1swXTtcbiAgICBsZXQgbW9kdWxlOiBzdHJpbmc7XG5cbiAgICBpZiAodHMuaXNJbXBvcnRTcGVjaWZpZXIoZGVjbGFyYXRpb24pKSB7XG4gICAgICBuYW1lID0gKGRlY2xhcmF0aW9uLnByb3BlcnR5TmFtZSB8fCBkZWNsYXJhdGlvbi5uYW1lKS50ZXh0O1xuICAgICAgbW9kdWxlID0gKGRlY2xhcmF0aW9uLnBhcmVudC5wYXJlbnQucGFyZW50Lm1vZHVsZVNwZWNpZmllciBhcyB0cy5JZGVudGlmaWVyKS50ZXh0O1xuICAgIH0gZWxzZSBpZiAodHMuaXNOYW1lc3BhY2VJbXBvcnQoZGVjbGFyYXRpb24pKSB7XG4gICAgICAvLyBVc2UgdGhlIG5hbWUgZnJvbSB0aGUgZGVjb3JhdG9yIG5hbWVzcGFjZSBwcm9wZXJ0eSBhY2Nlc3NcbiAgICAgIG1vZHVsZSA9IChkZWNsYXJhdGlvbi5wYXJlbnQucGFyZW50Lm1vZHVsZVNwZWNpZmllciBhcyB0cy5JZGVudGlmaWVyKS50ZXh0O1xuICAgIH0gZWxzZSBpZiAodHMuaXNJbXBvcnRDbGF1c2UoZGVjbGFyYXRpb24pKSB7XG4gICAgICBuYW1lID0gKGRlY2xhcmF0aW9uLm5hbWUgYXMgdHMuSWRlbnRpZmllcikudGV4dDtcbiAgICAgIG1vZHVsZSA9IChkZWNsYXJhdGlvbi5wYXJlbnQubW9kdWxlU3BlY2lmaWVyIGFzIHRzLklkZW50aWZpZXIpLnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7IG5hbWUsIG1vZHVsZSB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=