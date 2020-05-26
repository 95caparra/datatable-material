/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as html from './ast';
import { ParseTreeResult } from './parser';
import { NGSP_UNICODE } from './tags';
export const PRESERVE_WS_ATTR_NAME = 'ngPreserveWhitespaces';
const SKIP_WS_TRIM_TAGS = new Set(['pre', 'template', 'textarea', 'script', 'style']);
// Equivalent to \s with \u00a0 (non-breaking space) excluded.
// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
const WS_CHARS = ' \f\n\r\t\v\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff';
const NO_WS_REGEXP = new RegExp(`[^${WS_CHARS}]`);
const WS_REPLACE_REGEXP = new RegExp(`[${WS_CHARS}]{2,}`, 'g');
function hasPreserveWhitespacesAttr(attrs) {
    return attrs.some((attr) => attr.name === PRESERVE_WS_ATTR_NAME);
}
/**
 * Angular Dart introduced &ngsp; as a placeholder for non-removable space, see:
 * https://github.com/dart-lang/angular/blob/0bb611387d29d65b5af7f9d2515ab571fd3fbee4/_tests/test/compiler/preserve_whitespace_test.dart#L25-L32
 * In Angular Dart &ngsp; is converted to the 0xE500 PUA (Private Use Areas) unicode character
 * and later on replaced by a space. We are re-implementing the same idea here.
 */
export function replaceNgsp(value) {
    // lexer is replacing the &ngsp; pseudo-entity with NGSP_UNICODE
    return value.replace(new RegExp(NGSP_UNICODE, 'g'), ' ');
}
/**
 * This visitor can walk HTML parse tree and remove / trim text nodes using the following rules:
 * - consider spaces, tabs and new lines as whitespace characters;
 * - drop text nodes consisting of whitespace characters only;
 * - for all other text nodes replace consecutive whitespace characters with one space;
 * - convert &ngsp; pseudo-entity to a single space;
 *
 * Removal and trimming of whitespaces have positive performance impact (less code to generate
 * while compiling templates, faster view creation). At the same time it can be "destructive"
 * in some cases (whitespaces can influence layout). Because of the potential of breaking layout
 * this visitor is not activated by default in Angular 5 and people need to explicitly opt-in for
 * whitespace removal. The default option for whitespace removal will be revisited in Angular 6
 * and might be changed to "on" by default.
 */
export class WhitespaceVisitor {
    visitElement(element, context) {
        if (SKIP_WS_TRIM_TAGS.has(element.name) || hasPreserveWhitespacesAttr(element.attrs)) {
            // don't descent into elements where we need to preserve whitespaces
            // but still visit all attributes to eliminate one used as a market to preserve WS
            return new html.Element(element.name, html.visitAll(this, element.attrs), element.children, element.sourceSpan, element.startSourceSpan, element.endSourceSpan, element.i18n);
        }
        return new html.Element(element.name, element.attrs, html.visitAll(this, element.children), element.sourceSpan, element.startSourceSpan, element.endSourceSpan, element.i18n);
    }
    visitAttribute(attribute, context) {
        return attribute.name !== PRESERVE_WS_ATTR_NAME ? attribute : null;
    }
    visitText(text, context) {
        const isNotBlank = text.value.match(NO_WS_REGEXP);
        if (isNotBlank) {
            return new html.Text(replaceNgsp(text.value).replace(WS_REPLACE_REGEXP, ' '), text.sourceSpan, text.i18n);
        }
        return null;
    }
    visitComment(comment, context) { return comment; }
    visitExpansion(expansion, context) { return expansion; }
    visitExpansionCase(expansionCase, context) { return expansionCase; }
}
export function removeWhitespaces(htmlAstWithErrors) {
    return new ParseTreeResult(html.visitAll(new WhitespaceVisitor(), htmlAstWithErrors.rootNodes), htmlAstWithErrors.errors);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF93aGl0ZXNwYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2NvbXBpbGVyL3NyYy9tbF9wYXJzZXIvaHRtbF93aGl0ZXNwYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEtBQUssSUFBSSxNQUFNLE9BQU8sQ0FBQztBQUM5QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFFcEMsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsdUJBQXVCLENBQUM7QUFFN0QsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRXRGLDhEQUE4RDtBQUM5RCxtR0FBbUc7QUFDbkcsTUFBTSxRQUFRLEdBQUcsMEVBQTBFLENBQUM7QUFDNUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxRQUFRLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUUvRCxTQUFTLDBCQUEwQixDQUFDLEtBQXVCO0lBQ3pELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQW9CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsQ0FBQztBQUNuRixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQWE7SUFDdkMsZ0VBQWdFO0lBQ2hFLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQVksQ0FBQyxPQUFxQixFQUFFLE9BQVk7UUFDOUMsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwRixvRUFBb0U7WUFDcEUsa0ZBQWtGO1lBQ2xGLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUNuQixPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQ3RGLE9BQU8sQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkU7UUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FDbkIsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUN0RixPQUFPLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxjQUFjLENBQUMsU0FBeUIsRUFBRSxPQUFZO1FBQ3BELE9BQU8sU0FBUyxDQUFDLElBQUksS0FBSyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckUsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFlLEVBQUUsT0FBWTtRQUNyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRCxJQUFJLFVBQVUsRUFBRTtZQUNkLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUNoQixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxRjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUFxQixFQUFFLE9BQVksSUFBUyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFMUUsY0FBYyxDQUFDLFNBQXlCLEVBQUUsT0FBWSxJQUFTLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVsRixrQkFBa0IsQ0FBQyxhQUFpQyxFQUFFLE9BQVksSUFBUyxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUM7Q0FDbkc7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsaUJBQWtDO0lBQ2xFLE9BQU8sSUFBSSxlQUFlLENBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxpQkFBaUIsRUFBRSxFQUFFLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUNuRSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBodG1sIGZyb20gJy4vYXN0JztcbmltcG9ydCB7UGFyc2VUcmVlUmVzdWx0fSBmcm9tICcuL3BhcnNlcic7XG5pbXBvcnQge05HU1BfVU5JQ09ERX0gZnJvbSAnLi90YWdzJztcblxuZXhwb3J0IGNvbnN0IFBSRVNFUlZFX1dTX0FUVFJfTkFNRSA9ICduZ1ByZXNlcnZlV2hpdGVzcGFjZXMnO1xuXG5jb25zdCBTS0lQX1dTX1RSSU1fVEFHUyA9IG5ldyBTZXQoWydwcmUnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAnc2NyaXB0JywgJ3N0eWxlJ10pO1xuXG4vLyBFcXVpdmFsZW50IHRvIFxccyB3aXRoIFxcdTAwYTAgKG5vbi1icmVha2luZyBzcGFjZSkgZXhjbHVkZWQuXG4vLyBCYXNlZCBvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9SZWdFeHBcbmNvbnN0IFdTX0NIQVJTID0gJyBcXGZcXG5cXHJcXHRcXHZcXHUxNjgwXFx1MTgwZVxcdTIwMDAtXFx1MjAwYVxcdTIwMjhcXHUyMDI5XFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1ZmVmZic7XG5jb25zdCBOT19XU19SRUdFWFAgPSBuZXcgUmVnRXhwKGBbXiR7V1NfQ0hBUlN9XWApO1xuY29uc3QgV1NfUkVQTEFDRV9SRUdFWFAgPSBuZXcgUmVnRXhwKGBbJHtXU19DSEFSU31dezIsfWAsICdnJyk7XG5cbmZ1bmN0aW9uIGhhc1ByZXNlcnZlV2hpdGVzcGFjZXNBdHRyKGF0dHJzOiBodG1sLkF0dHJpYnV0ZVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiBhdHRycy5zb21lKChhdHRyOiBodG1sLkF0dHJpYnV0ZSkgPT4gYXR0ci5uYW1lID09PSBQUkVTRVJWRV9XU19BVFRSX05BTUUpO1xufVxuXG4vKipcbiAqIEFuZ3VsYXIgRGFydCBpbnRyb2R1Y2VkICZuZ3NwOyBhcyBhIHBsYWNlaG9sZGVyIGZvciBub24tcmVtb3ZhYmxlIHNwYWNlLCBzZWU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGFydC1sYW5nL2FuZ3VsYXIvYmxvYi8wYmI2MTEzODdkMjlkNjViNWFmN2Y5ZDI1MTVhYjU3MWZkM2ZiZWU0L190ZXN0cy90ZXN0L2NvbXBpbGVyL3ByZXNlcnZlX3doaXRlc3BhY2VfdGVzdC5kYXJ0I0wyNS1MMzJcbiAqIEluIEFuZ3VsYXIgRGFydCAmbmdzcDsgaXMgY29udmVydGVkIHRvIHRoZSAweEU1MDAgUFVBIChQcml2YXRlIFVzZSBBcmVhcykgdW5pY29kZSBjaGFyYWN0ZXJcbiAqIGFuZCBsYXRlciBvbiByZXBsYWNlZCBieSBhIHNwYWNlLiBXZSBhcmUgcmUtaW1wbGVtZW50aW5nIHRoZSBzYW1lIGlkZWEgaGVyZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VOZ3NwKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBsZXhlciBpcyByZXBsYWNpbmcgdGhlICZuZ3NwOyBwc2V1ZG8tZW50aXR5IHdpdGggTkdTUF9VTklDT0RFXG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoTkdTUF9VTklDT0RFLCAnZycpLCAnICcpO1xufVxuXG4vKipcbiAqIFRoaXMgdmlzaXRvciBjYW4gd2FsayBIVE1MIHBhcnNlIHRyZWUgYW5kIHJlbW92ZSAvIHRyaW0gdGV4dCBub2RlcyB1c2luZyB0aGUgZm9sbG93aW5nIHJ1bGVzOlxuICogLSBjb25zaWRlciBzcGFjZXMsIHRhYnMgYW5kIG5ldyBsaW5lcyBhcyB3aGl0ZXNwYWNlIGNoYXJhY3RlcnM7XG4gKiAtIGRyb3AgdGV4dCBub2RlcyBjb25zaXN0aW5nIG9mIHdoaXRlc3BhY2UgY2hhcmFjdGVycyBvbmx5O1xuICogLSBmb3IgYWxsIG90aGVyIHRleHQgbm9kZXMgcmVwbGFjZSBjb25zZWN1dGl2ZSB3aGl0ZXNwYWNlIGNoYXJhY3RlcnMgd2l0aCBvbmUgc3BhY2U7XG4gKiAtIGNvbnZlcnQgJm5nc3A7IHBzZXVkby1lbnRpdHkgdG8gYSBzaW5nbGUgc3BhY2U7XG4gKlxuICogUmVtb3ZhbCBhbmQgdHJpbW1pbmcgb2Ygd2hpdGVzcGFjZXMgaGF2ZSBwb3NpdGl2ZSBwZXJmb3JtYW5jZSBpbXBhY3QgKGxlc3MgY29kZSB0byBnZW5lcmF0ZVxuICogd2hpbGUgY29tcGlsaW5nIHRlbXBsYXRlcywgZmFzdGVyIHZpZXcgY3JlYXRpb24pLiBBdCB0aGUgc2FtZSB0aW1lIGl0IGNhbiBiZSBcImRlc3RydWN0aXZlXCJcbiAqIGluIHNvbWUgY2FzZXMgKHdoaXRlc3BhY2VzIGNhbiBpbmZsdWVuY2UgbGF5b3V0KS4gQmVjYXVzZSBvZiB0aGUgcG90ZW50aWFsIG9mIGJyZWFraW5nIGxheW91dFxuICogdGhpcyB2aXNpdG9yIGlzIG5vdCBhY3RpdmF0ZWQgYnkgZGVmYXVsdCBpbiBBbmd1bGFyIDUgYW5kIHBlb3BsZSBuZWVkIHRvIGV4cGxpY2l0bHkgb3B0LWluIGZvclxuICogd2hpdGVzcGFjZSByZW1vdmFsLiBUaGUgZGVmYXVsdCBvcHRpb24gZm9yIHdoaXRlc3BhY2UgcmVtb3ZhbCB3aWxsIGJlIHJldmlzaXRlZCBpbiBBbmd1bGFyIDZcbiAqIGFuZCBtaWdodCBiZSBjaGFuZ2VkIHRvIFwib25cIiBieSBkZWZhdWx0LlxuICovXG5leHBvcnQgY2xhc3MgV2hpdGVzcGFjZVZpc2l0b3IgaW1wbGVtZW50cyBodG1sLlZpc2l0b3Ige1xuICB2aXNpdEVsZW1lbnQoZWxlbWVudDogaHRtbC5FbGVtZW50LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGlmIChTS0lQX1dTX1RSSU1fVEFHUy5oYXMoZWxlbWVudC5uYW1lKSB8fCBoYXNQcmVzZXJ2ZVdoaXRlc3BhY2VzQXR0cihlbGVtZW50LmF0dHJzKSkge1xuICAgICAgLy8gZG9uJ3QgZGVzY2VudCBpbnRvIGVsZW1lbnRzIHdoZXJlIHdlIG5lZWQgdG8gcHJlc2VydmUgd2hpdGVzcGFjZXNcbiAgICAgIC8vIGJ1dCBzdGlsbCB2aXNpdCBhbGwgYXR0cmlidXRlcyB0byBlbGltaW5hdGUgb25lIHVzZWQgYXMgYSBtYXJrZXQgdG8gcHJlc2VydmUgV1NcbiAgICAgIHJldHVybiBuZXcgaHRtbC5FbGVtZW50KFxuICAgICAgICAgIGVsZW1lbnQubmFtZSwgaHRtbC52aXNpdEFsbCh0aGlzLCBlbGVtZW50LmF0dHJzKSwgZWxlbWVudC5jaGlsZHJlbiwgZWxlbWVudC5zb3VyY2VTcGFuLFxuICAgICAgICAgIGVsZW1lbnQuc3RhcnRTb3VyY2VTcGFuLCBlbGVtZW50LmVuZFNvdXJjZVNwYW4sIGVsZW1lbnQuaTE4bik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBodG1sLkVsZW1lbnQoXG4gICAgICAgIGVsZW1lbnQubmFtZSwgZWxlbWVudC5hdHRycywgaHRtbC52aXNpdEFsbCh0aGlzLCBlbGVtZW50LmNoaWxkcmVuKSwgZWxlbWVudC5zb3VyY2VTcGFuLFxuICAgICAgICBlbGVtZW50LnN0YXJ0U291cmNlU3BhbiwgZWxlbWVudC5lbmRTb3VyY2VTcGFuLCBlbGVtZW50LmkxOG4pO1xuICB9XG5cbiAgdmlzaXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBodG1sLkF0dHJpYnV0ZSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gYXR0cmlidXRlLm5hbWUgIT09IFBSRVNFUlZFX1dTX0FUVFJfTkFNRSA/IGF0dHJpYnV0ZSA6IG51bGw7XG4gIH1cblxuICB2aXNpdFRleHQodGV4dDogaHRtbC5UZXh0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGlzTm90QmxhbmsgPSB0ZXh0LnZhbHVlLm1hdGNoKE5PX1dTX1JFR0VYUCk7XG5cbiAgICBpZiAoaXNOb3RCbGFuaykge1xuICAgICAgcmV0dXJuIG5ldyBodG1sLlRleHQoXG4gICAgICAgICAgcmVwbGFjZU5nc3AodGV4dC52YWx1ZSkucmVwbGFjZShXU19SRVBMQUNFX1JFR0VYUCwgJyAnKSwgdGV4dC5zb3VyY2VTcGFuLCB0ZXh0LmkxOG4pO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IGh0bWwuQ29tbWVudCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGNvbW1lbnQ7IH1cblxuICB2aXNpdEV4cGFuc2lvbihleHBhbnNpb246IGh0bWwuRXhwYW5zaW9uLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gZXhwYW5zaW9uOyB9XG5cbiAgdmlzaXRFeHBhbnNpb25DYXNlKGV4cGFuc2lvbkNhc2U6IGh0bWwuRXhwYW5zaW9uQ2FzZSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGV4cGFuc2lvbkNhc2U7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVdoaXRlc3BhY2VzKGh0bWxBc3RXaXRoRXJyb3JzOiBQYXJzZVRyZWVSZXN1bHQpOiBQYXJzZVRyZWVSZXN1bHQge1xuICByZXR1cm4gbmV3IFBhcnNlVHJlZVJlc3VsdChcbiAgICAgIGh0bWwudmlzaXRBbGwobmV3IFdoaXRlc3BhY2VWaXNpdG9yKCksIGh0bWxBc3RXaXRoRXJyb3JzLnJvb3ROb2RlcyksXG4gICAgICBodG1sQXN0V2l0aEVycm9ycy5lcnJvcnMpO1xufVxuIl19