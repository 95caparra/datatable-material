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
const ast_helpers_1 = require("./ast_helpers");
const interfaces_1 = require("./interfaces");
function insertStarImport(sourceFile, identifier, modulePath, target, before = false) {
    const ops = [];
    const allImports = ast_helpers_1.collectDeepNodes(sourceFile, ts.SyntaxKind.ImportDeclaration);
    // We don't need to verify if the symbol is already imported, star imports should be unique.
    // Create the new import node.
    const namespaceImport = ts.createNamespaceImport(identifier);
    const importClause = ts.createImportClause(undefined, namespaceImport);
    const newImport = ts.createImportDeclaration(undefined, undefined, importClause, ts.createLiteral(modulePath));
    if (target) {
        ops.push(new interfaces_1.AddNodeOperation(sourceFile, target, before ? newImport : undefined, before ? undefined : newImport));
    }
    else if (allImports.length > 0) {
        // Find the last import and insert after.
        ops.push(new interfaces_1.AddNodeOperation(sourceFile, allImports[allImports.length - 1], undefined, newImport));
    }
    else {
        const firstNode = ast_helpers_1.getFirstNode(sourceFile);
        if (firstNode) {
            // Insert before the first node.
            ops.push(new interfaces_1.AddNodeOperation(sourceFile, firstNode, newImport));
        }
    }
    return ops;
}
exports.insertStarImport = insertStarImport;
function insertImport(sourceFile, symbolName, modulePath) {
    const ops = [];
    // Find all imports.
    const allImports = ast_helpers_1.collectDeepNodes(sourceFile, ts.SyntaxKind.ImportDeclaration);
    const maybeImports = allImports
        .filter((node) => {
        // Filter all imports that do not match the modulePath.
        return node.moduleSpecifier.kind == ts.SyntaxKind.StringLiteral
            && node.moduleSpecifier.text == modulePath;
    })
        .filter((node) => {
        // Filter out import statements that are either `import 'XYZ'` or `import * as X from 'XYZ'`.
        const clause = node.importClause;
        if (!clause || clause.name || !clause.namedBindings) {
            return false;
        }
        return clause.namedBindings.kind == ts.SyntaxKind.NamedImports;
    })
        .map((node) => {
        // Return the `{ ... }` list of the named import.
        return node.importClause.namedBindings;
    });
    if (maybeImports.length) {
        // There's an `import {A, B, C} from 'modulePath'`.
        // Find if it's in either imports. If so, just return; nothing to do.
        const hasImportAlready = maybeImports.some((node) => {
            return node.elements.some((element) => {
                return element.name.text == symbolName;
            });
        });
        if (hasImportAlready) {
            return ops;
        }
        // Just pick the first one and insert at the end of its identifier list.
        ops.push(new interfaces_1.AddNodeOperation(sourceFile, maybeImports[0].elements[maybeImports[0].elements.length - 1], undefined, ts.createImportSpecifier(undefined, ts.createIdentifier(symbolName))));
    }
    else {
        // Create the new import node.
        const namedImports = ts.createNamedImports([ts.createImportSpecifier(undefined, ts.createIdentifier(symbolName))]);
        const importClause = ts.createImportClause(undefined, namedImports);
        const newImport = ts.createImportDeclaration(undefined, undefined, importClause, ts.createLiteral(modulePath));
        if (allImports.length > 0) {
            // Find the last import and insert after.
            ops.push(new interfaces_1.AddNodeOperation(sourceFile, allImports[allImports.length - 1], undefined, newImport));
        }
        else {
            const firstNode = ast_helpers_1.getFirstNode(sourceFile);
            if (firstNode) {
                // Insert before the first node.
                ops.push(new interfaces_1.AddNodeOperation(sourceFile, firstNode, newImport));
            }
        }
    }
    return ops;
}
exports.insertImport = insertImport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0X2ltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvbmd0b29scy93ZWJwYWNrL3NyYy90cmFuc2Zvcm1lcnMvaW5zZXJ0X2ltcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILGlDQUFpQztBQUNqQywrQ0FBK0Q7QUFDL0QsNkNBQW9FO0FBR3BFLFNBQWdCLGdCQUFnQixDQUM5QixVQUF5QixFQUN6QixVQUF5QixFQUN6QixVQUFrQixFQUNsQixNQUFnQixFQUNoQixNQUFNLEdBQUcsS0FBSztJQUVkLE1BQU0sR0FBRyxHQUF5QixFQUFFLENBQUM7SUFDckMsTUFBTSxVQUFVLEdBQUcsOEJBQWdCLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUVqRiw0RkFBNEY7SUFFNUYsOEJBQThCO0lBQzlCLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3RCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFDN0UsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRWhDLElBQUksTUFBTSxFQUFFO1FBQ1YsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFnQixDQUMzQixVQUFVLEVBQ1YsTUFBTSxFQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQy9CLENBQUMsQ0FBQztLQUNKO1NBQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxH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QyxFQUFFLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUM1RSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwRSxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQzdFLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUVoQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLHlDQUF5QztZQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWdCLENBQzNCLFVBQVUsRUFDVixVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDakMsU0FBUyxFQUNULFNBQVMsQ0FDVixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsTUFBTSxTQUFTLEdBQUcsMEJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUzQyxJQUFJLFNBQVMsRUFBRTtnQkFDYixnQ0FBZ0M7Z0JBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBZ0IsQ0FDM0IsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLENBQ1YsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBOUVELG9DQThFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgY29sbGVjdERlZXBOb2RlcywgZ2V0Rmlyc3ROb2RlIH0gZnJvbSAnLi9hc3RfaGVscGVycyc7XG5pbXBvcnQgeyBBZGROb2RlT3BlcmF0aW9uLCBUcmFuc2Zvcm1PcGVyYXRpb24gfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRTdGFySW1wb3J0KFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBpZGVudGlmaWVyOiB0cy5JZGVudGlmaWVyLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIHRhcmdldD86IHRzLk5vZGUsXG4gIGJlZm9yZSA9IGZhbHNlLFxuKTogVHJhbnNmb3JtT3BlcmF0aW9uW10ge1xuICBjb25zdCBvcHM6IFRyYW5zZm9ybU9wZXJhdGlvbltdID0gW107XG4gIGNvbnN0IGFsbEltcG9ydHMgPSBjb2xsZWN0RGVlcE5vZGVzKHNvdXJjZUZpbGUsIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb24pO1xuXG4gIC8vIFdlIGRvbid0IG5lZWQgdG8gdmVyaWZ5IGlmIHRoZSBzeW1ib2wgaXMgYWxyZWFkeSBpbXBvcnRlZCwgc3RhciBpbXBvcnRzIHNob3VsZCBiZSB1bmlxdWUuXG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgaW1wb3J0IG5vZGUuXG4gIGNvbnN0IG5hbWVzcGFjZUltcG9ydCA9IHRzLmNyZWF0ZU5hbWVzcGFjZUltcG9ydChpZGVudGlmaWVyKTtcbiAgY29uc3QgaW1wb3J0Q2xhdXNlID0gdHMuY3JlYXRlSW1wb3J0Q2xhdXNlKHVuZGVmaW5lZCwgbmFtZXNwYWNlSW1wb3J0KTtcbiAgY29uc3QgbmV3SW1wb3J0ID0gdHMuY3JlYXRlSW1wb3J0RGVjbGFyYXRpb24odW5kZWZpbmVkLCB1bmRlZmluZWQsIGltcG9ydENsYXVzZSxcbiAgICB0cy5jcmVhdGVMaXRlcmFsKG1vZHVsZVBhdGgpKTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgb3BzLnB1c2gobmV3IEFkZE5vZGVPcGVyYXRpb24oXG4gICAgICBzb3VyY2VGaWxlLFxuICAgICAgdGFyZ2V0LFxuICAgICAgYmVmb3JlID8gbmV3SW1wb3J0IDogdW5kZWZpbmVkLFxuICAgICAgYmVmb3JlID8gdW5kZWZpbmVkIDogbmV3SW1wb3J0LFxuICAgICkpO1xuICB9IGVsc2UgaWYgKGFsbEltcG9ydHMubGVuZ3RoID4gMCkge1xuICAgIC8vIEZpbmQgdGhlIGxhc3QgaW1wb3J0IGFuZCBpbnNlcnQgYWZ0ZXIuXG4gICAgb3BzLnB1c2gobmV3IEFkZE5vZGVPcGVyYXRpb24oXG4gICAgICBzb3VyY2VGaWxlLFxuICAgICAgYWxsSW1wb3J0c1thbGxJbXBvcnRzLmxlbmd0aCAtIDFdLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgbmV3SW1wb3J0LFxuICAgICkpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGdldEZpcnN0Tm9kZShzb3VyY2VGaWxlKTtcblxuICAgIGlmIChmaXJzdE5vZGUpIHtcbiAgICAgIC8vIEluc2VydCBiZWZvcmUgdGhlIGZpcnN0IG5vZGUuXG4gICAgICBvcHMucHVzaChuZXcgQWRkTm9kZU9wZXJhdGlvbihcbiAgICAgICAgc291cmNlRmlsZSxcbiAgICAgICAgZmlyc3ROb2RlLFxuICAgICAgICBuZXdJbXBvcnQsXG4gICAgICApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3BzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRJbXBvcnQoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIHN5bWJvbE5hbWU6IHN0cmluZyxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuKTogVHJhbnNmb3JtT3BlcmF0aW9uW10ge1xuICBjb25zdCBvcHM6IFRyYW5zZm9ybU9wZXJhdGlvbltdID0gW107XG4gIC8vIEZpbmQgYWxsIGltcG9ydHMuXG4gIGNvbnN0IGFsbEltcG9ydHMgPSBjb2xsZWN0RGVlcE5vZGVzKHNvdXJjZUZpbGUsIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb24pO1xuICBjb25zdCBtYXliZUltcG9ydHMgPSBhbGxJbXBvcnRzXG4gICAgLmZpbHRlcigobm9kZTogdHMuSW1wb3J0RGVjbGFyYXRpb24pID0+IHtcbiAgICAgIC8vIEZpbHRlciBhbGwgaW1wb3J0cyB0aGF0IGRvIG5vdCBtYXRjaCB0aGUgbW9kdWxlUGF0aC5cbiAgICAgIHJldHVybiBub2RlLm1vZHVsZVNwZWNpZmllci5raW5kID09IHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbFxuICAgICAgICAmJiAobm9kZS5tb2R1bGVTcGVjaWZpZXIgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dCA9PSBtb2R1bGVQYXRoO1xuICAgIH0pXG4gICAgLmZpbHRlcigobm9kZTogdHMuSW1wb3J0RGVjbGFyYXRpb24pID0+IHtcbiAgICAgIC8vIEZpbHRlciBvdXQgaW1wb3J0IHN0YXRlbWVudHMgdGhhdCBhcmUgZWl0aGVyIGBpbXBvcnQgJ1hZWidgIG9yIGBpbXBvcnQgKiBhcyBYIGZyb20gJ1hZWidgLlxuICAgICAgY29uc3QgY2xhdXNlID0gbm9kZS5pbXBvcnRDbGF1c2UgYXMgdHMuSW1wb3J0Q2xhdXNlO1xuICAgICAgaWYgKCFjbGF1c2UgfHwgY2xhdXNlLm5hbWUgfHwgIWNsYXVzZS5uYW1lZEJpbmRpbmdzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNsYXVzZS5uYW1lZEJpbmRpbmdzLmtpbmQgPT0gdHMuU3ludGF4S2luZC5OYW1lZEltcG9ydHM7XG4gICAgfSlcbiAgICAubWFwKChub2RlOiB0cy5JbXBvcnREZWNsYXJhdGlvbikgPT4ge1xuICAgICAgLy8gUmV0dXJuIHRoZSBgeyAuLi4gfWAgbGlzdCBvZiB0aGUgbmFtZWQgaW1wb3J0LlxuICAgICAgcmV0dXJuIChub2RlLmltcG9ydENsYXVzZSBhcyB0cy5JbXBvcnRDbGF1c2UpLm5hbWVkQmluZGluZ3MgYXMgdHMuTmFtZWRJbXBvcnRzO1xuICAgIH0pO1xuXG4gIGlmIChtYXliZUltcG9ydHMubGVuZ3RoKSB7XG4gICAgLy8gVGhlcmUncyBhbiBgaW1wb3J0IHtBLCBCLCBDfSBmcm9tICdtb2R1bGVQYXRoJ2AuXG4gICAgLy8gRmluZCBpZiBpdCdzIGluIGVpdGhlciBpbXBvcnRzLiBJZiBzbywganVzdCByZXR1cm47IG5vdGhpbmcgdG8gZG8uXG4gICAgY29uc3QgaGFzSW1wb3J0QWxyZWFkeSA9IG1heWJlSW1wb3J0cy5zb21lKChub2RlOiB0cy5OYW1lZEltcG9ydHMpID0+IHtcbiAgICAgIHJldHVybiBub2RlLmVsZW1lbnRzLnNvbWUoKGVsZW1lbnQ6IHRzLkltcG9ydFNwZWNpZmllcikgPT4ge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5uYW1lLnRleHQgPT0gc3ltYm9sTmFtZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChoYXNJbXBvcnRBbHJlYWR5KSB7XG4gICAgICByZXR1cm4gb3BzO1xuICAgIH1cblxuICAgIC8vIEp1c3QgcGljayB0aGUgZmlyc3Qgb25lIGFuZCBpbnNlcnQgYXQgdGhlIGVuZCBvZiBpdHMgaWRlbnRpZmllciBsaXN0LlxuICAgIG9wcy5wdXNoKG5ldyBBZGROb2RlT3BlcmF0aW9uKFxuICAgICAgc291cmNlRmlsZSxcbiAgICAgIG1heWJlSW1wb3J0c1swXS5lbGVtZW50c1ttYXliZUltcG9ydHNbMF0uZWxlbWVudHMubGVuZ3RoIC0gMV0sXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0cy5jcmVhdGVJbXBvcnRTcGVjaWZpZXIodW5kZWZpbmVkLCB0cy5jcmVhdGVJZGVudGlmaWVyKHN5bWJvbE5hbWUpKSxcbiAgICApKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBDcmVhdGUgdGhlIG5ldyBpbXBvcnQgbm9kZS5cbiAgICBjb25zdCBuYW1lZEltcG9ydHMgPSB0cy5jcmVhdGVOYW1lZEltcG9ydHMoW3RzLmNyZWF0ZUltcG9ydFNwZWNpZmllcih1bmRlZmluZWQsXG4gICAgICB0cy5jcmVhdGVJZGVudGlmaWVyKHN5bWJvbE5hbWUpKV0pO1xuICAgIGNvbnN0IGltcG9ydENsYXVzZSA9IHRzLmNyZWF0ZUltcG9ydENsYXVzZSh1bmRlZmluZWQsIG5hbWVkSW1wb3J0cyk7XG4gICAgY29uc3QgbmV3SW1wb3J0ID0gdHMuY3JlYXRlSW1wb3J0RGVjbGFyYXRpb24odW5kZWZpbmVkLCB1bmRlZmluZWQsIGltcG9ydENsYXVzZSxcbiAgICAgIHRzLmNyZWF0ZUxpdGVyYWwobW9kdWxlUGF0aCkpO1xuXG4gICAgaWYgKGFsbEltcG9ydHMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gRmluZCB0aGUgbGFzdCBpbXBvcnQgYW5kIGluc2VydCBhZnRlci5cbiAgICAgIG9wcy5wdXNoKG5ldyBBZGROb2RlT3BlcmF0aW9uKFxuICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICBhbGxJbXBvcnRzW2FsbEltcG9ydHMubGVuZ3RoIC0gMV0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgbmV3SW1wb3J0LFxuICAgICAgKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGdldEZpcnN0Tm9kZShzb3VyY2VGaWxlKTtcblxuICAgICAgaWYgKGZpcnN0Tm9kZSkge1xuICAgICAgICAvLyBJbnNlcnQgYmVmb3JlIHRoZSBmaXJzdCBub2RlLlxuICAgICAgICBvcHMucHVzaChuZXcgQWRkTm9kZU9wZXJhdGlvbihcbiAgICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICAgIGZpcnN0Tm9kZSxcbiAgICAgICAgICBuZXdJbXBvcnQsXG4gICAgICAgICkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvcHM7XG59XG4iXX0=