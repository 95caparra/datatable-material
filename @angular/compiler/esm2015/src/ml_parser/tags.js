/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export var TagContentType;
(function (TagContentType) {
    TagContentType[TagContentType["RAW_TEXT"] = 0] = "RAW_TEXT";
    TagContentType[TagContentType["ESCAPABLE_RAW_TEXT"] = 1] = "ESCAPABLE_RAW_TEXT";
    TagContentType[TagContentType["PARSABLE_DATA"] = 2] = "PARSABLE_DATA";
})(TagContentType || (TagContentType = {}));
export function splitNsName(elementName) {
    if (elementName[0] != ':') {
        return [null, elementName];
    }
    const colonIndex = elementName.indexOf(':', 1);
    if (colonIndex == -1) {
        throw new Error(`Unsupported format "${elementName}" expecting ":namespace:name"`);
    }
    return [elementName.slice(1, colonIndex), elementName.slice(colonIndex + 1)];
}
// `<ng-container>` tags work the same regardless the namespace
export function isNgContainer(tagName) {
    return splitNsName(tagName)[1] === 'ng-container';
}
// `<ng-content>` tags work the same regardless the namespace
export function isNgContent(tagName) {
    return splitNsName(tagName)[1] === 'ng-content';
}
// `<ng-template>` tags work the same regardless the namespace
export function isNgTemplate(tagName) {
    return splitNsName(tagName)[1] === 'ng-template';
}
export function getNsPrefix(fullName) {
    return fullName === null ? null : splitNsName(fullName)[0];
}
export function mergeNsAndName(prefix, localName) {
    return prefix ? `:${prefix}:${localName}` : localName;
}
// see http://www.w3.org/TR/html51/syntax.html#named-character-references
// see https://html.spec.whatwg.org/multipage/entities.json
// This list is not exhaustive to keep the compiler footprint low.
// The `&#123;` / `&#x1ab;` syntax should be used when the named character reference does not
// exist.
export const NAMED_ENTITIES = {
    'Aacute': '\u00C1',
    'aacute': '\u00E1',
    'Acirc': '\u00C2',
    'acirc': '\u00E2',
    'acute': '\u00B4',
    'AElig': '\u00C6',
    'aelig': '\u00E6',
    'Agrave': '\u00C0',
    'agrave': '\u00E0',
    'alefsym': '\u2135',
    'Alpha': '\u0391',
    'alpha': '\u03B1',
    'amp': '&',
    'and': '\u2227',
    'ang': '\u2220',
    'apos': '\u0027',
    'Aring': '\u00C5',
    'aring': '\u00E5',
    'asymp': '\u2248',
    'Atilde': '\u00C3',
    'atilde': '\u00E3',
    'Auml': '\u00C4',
    'auml': '\u00E4',
    'bdquo': '\u201E',
    'Beta': '\u0392',
    'beta': '\u03B2',
    'brvbar': '\u00A6',
    'bull': '\u2022',
    'cap': '\u2229',
    'Ccedil': '\u00C7',
    'ccedil': '\u00E7',
    'cedil': '\u00B8',
    'cent': '\u00A2',
    'Chi': '\u03A7',
    'chi': '\u03C7',
    'circ': '\u02C6',
    'clubs': '\u2663',
    'cong': '\u2245',
    'copy': '\u00A9',
    'crarr': '\u21B5',
    'cup': '\u222A',
    'curren': '\u00A4',
    'dagger': '\u2020',
    'Dagger': '\u2021',
    'darr': '\u2193',
    'dArr': '\u21D3',
    'deg': '\u00B0',
    'Delta': '\u0394',
    'delta': '\u03B4',
    'diams': '\u2666',
    'divide': '\u00F7',
    'Eacute': '\u00C9',
    'eacute': '\u00E9',
    'Ecirc': '\u00CA',
    'ecirc': '\u00EA',
    'Egrave': '\u00C8',
    'egrave': '\u00E8',
    'empty': '\u2205',
    'emsp': '\u2003',
    'ensp': '\u2002',
    'Epsilon': '\u0395',
    'epsilon': '\u03B5',
    'equiv': '\u2261',
    'Eta': '\u0397',
    'eta': '\u03B7',
    'ETH': '\u00D0',
    'eth': '\u00F0',
    'Euml': '\u00CB',
    'euml': '\u00EB',
    'euro': '\u20AC',
    'exist': '\u2203',
    'fnof': '\u0192',
    'forall': '\u2200',
    'frac12': '\u00BD',
    'frac14': '\u00BC',
    'frac34': '\u00BE',
    'frasl': '\u2044',
    'Gamma': '\u0393',
    'gamma': '\u03B3',
    'ge': '\u2265',
    'gt': '>',
    'harr': '\u2194',
    'hArr': '\u21D4',
    'hearts': '\u2665',
    'hellip': '\u2026',
    'Iacute': '\u00CD',
    'iacute': '\u00ED',
    'Icirc': '\u00CE',
    'icirc': '\u00EE',
    'iexcl': '\u00A1',
    'Igrave': '\u00CC',
    'igrave': '\u00EC',
    'image': '\u2111',
    'infin': '\u221E',
    'int': '\u222B',
    'Iota': '\u0399',
    'iota': '\u03B9',
    'iquest': '\u00BF',
    'isin': '\u2208',
    'Iuml': '\u00CF',
    'iuml': '\u00EF',
    'Kappa': '\u039A',
    'kappa': '\u03BA',
    'Lambda': '\u039B',
    'lambda': '\u03BB',
    'lang': '\u27E8',
    'laquo': '\u00AB',
    'larr': '\u2190',
    'lArr': '\u21D0',
    'lceil': '\u2308',
    'ldquo': '\u201C',
    'le': '\u2264',
    'lfloor': '\u230A',
    'lowast': '\u2217',
    'loz': '\u25CA',
    'lrm': '\u200E',
    'lsaquo': '\u2039',
    'lsquo': '\u2018',
    'lt': '<',
    'macr': '\u00AF',
    'mdash': '\u2014',
    'micro': '\u00B5',
    'middot': '\u00B7',
    'minus': '\u2212',
    'Mu': '\u039C',
    'mu': '\u03BC',
    'nabla': '\u2207',
    'nbsp': '\u00A0',
    'ndash': '\u2013',
    'ne': '\u2260',
    'ni': '\u220B',
    'not': '\u00AC',
    'notin': '\u2209',
    'nsub': '\u2284',
    'Ntilde': '\u00D1',
    'ntilde': '\u00F1',
    'Nu': '\u039D',
    'nu': '\u03BD',
    'Oacute': '\u00D3',
    'oacute': '\u00F3',
    'Ocirc': '\u00D4',
    'ocirc': '\u00F4',
    'OElig': '\u0152',
    'oelig': '\u0153',
    'Ograve': '\u00D2',
    'ograve': '\u00F2',
    'oline': '\u203E',
    'Omega': '\u03A9',
    'omega': '\u03C9',
    'Omicron': '\u039F',
    'omicron': '\u03BF',
    'oplus': '\u2295',
    'or': '\u2228',
    'ordf': '\u00AA',
    'ordm': '\u00BA',
    'Oslash': '\u00D8',
    'oslash': '\u00F8',
    'Otilde': '\u00D5',
    'otilde': '\u00F5',
    'otimes': '\u2297',
    'Ouml': '\u00D6',
    'ouml': '\u00F6',
    'para': '\u00B6',
    'permil': '\u2030',
    'perp': '\u22A5',
    'Phi': '\u03A6',
    'phi': '\u03C6',
    'Pi': '\u03A0',
    'pi': '\u03C0',
    'piv': '\u03D6',
    'plusmn': '\u00B1',
    'pound': '\u00A3',
    'prime': '\u2032',
    'Prime': '\u2033',
    'prod': '\u220F',
    'prop': '\u221D',
    'Psi': '\u03A8',
    'psi': '\u03C8',
    'quot': '\u0022',
    'radic': '\u221A',
    'rang': '\u27E9',
    'raquo': '\u00BB',
    'rarr': '\u2192',
    'rArr': '\u21D2',
    'rceil': '\u2309',
    'rdquo': '\u201D',
    'real': '\u211C',
    'reg': '\u00AE',
    'rfloor': '\u230B',
    'Rho': '\u03A1',
    'rho': '\u03C1',
    'rlm': '\u200F',
    'rsaquo': '\u203A',
    'rsquo': '\u2019',
    'sbquo': '\u201A',
    'Scaron': '\u0160',
    'scaron': '\u0161',
    'sdot': '\u22C5',
    'sect': '\u00A7',
    'shy': '\u00AD',
    'Sigma': '\u03A3',
    'sigma': '\u03C3',
    'sigmaf': '\u03C2',
    'sim': '\u223C',
    'spades': '\u2660',
    'sub': '\u2282',
    'sube': '\u2286',
    'sum': '\u2211',
    'sup': '\u2283',
    'sup1': '\u00B9',
    'sup2': '\u00B2',
    'sup3': '\u00B3',
    'supe': '\u2287',
    'szlig': '\u00DF',
    'Tau': '\u03A4',
    'tau': '\u03C4',
    'there4': '\u2234',
    'Theta': '\u0398',
    'theta': '\u03B8',
    'thetasym': '\u03D1',
    'thinsp': '\u2009',
    'THORN': '\u00DE',
    'thorn': '\u00FE',
    'tilde': '\u02DC',
    'times': '\u00D7',
    'trade': '\u2122',
    'Uacute': '\u00DA',
    'uacute': '\u00FA',
    'uarr': '\u2191',
    'uArr': '\u21D1',
    'Ucirc': '\u00DB',
    'ucirc': '\u00FB',
    'Ugrave': '\u00D9',
    'ugrave': '\u00F9',
    'uml': '\u00A8',
    'upsih': '\u03D2',
    'Upsilon': '\u03A5',
    'upsilon': '\u03C5',
    'Uuml': '\u00DC',
    'uuml': '\u00FC',
    'weierp': '\u2118',
    'Xi': '\u039E',
    'xi': '\u03BE',
    'Yacute': '\u00DD',
    'yacute': '\u00FD',
    'yen': '\u00A5',
    'yuml': '\u00FF',
    'Yuml': '\u0178',
    'Zeta': '\u0396',
    'zeta': '\u03B6',
    'zwj': '\u200D',
    'zwnj': '\u200C',
};
// The &ngsp; pseudo-entity is denoting a space. see:
// https://github.com/dart-lang/angular/blob/0bb611387d29d65b5af7f9d2515ab571fd3fbee4/_tests/test/compiler/preserve_whitespace_test.dart
export const NGSP_UNICODE = '\uE500';
NAMED_ENTITIES['ngsp'] = NGSP_UNICODE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2NvbXBpbGVyL3NyYy9tbF9wYXJzZXIvdGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxNQUFNLENBQU4sSUFBWSxjQUlYO0FBSkQsV0FBWSxjQUFjO0lBQ3hCLDJEQUFRLENBQUE7SUFDUiwrRUFBa0IsQ0FBQTtJQUNsQixxRUFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUpXLGNBQWMsS0FBZCxjQUFjLFFBSXpCO0FBaUJELE1BQU0sVUFBVSxXQUFXLENBQUMsV0FBbUI7SUFDN0MsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDNUI7SUFFRCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQyxJQUFJLFVBQVUsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixXQUFXLCtCQUErQixDQUFDLENBQUM7S0FDcEY7SUFFRCxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRSxDQUFDO0FBRUQsK0RBQStEO0FBQy9ELE1BQU0sVUFBVSxhQUFhLENBQUMsT0FBZTtJQUMzQyxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxjQUFjLENBQUM7QUFDcEQsQ0FBQztBQUVELDZEQUE2RDtBQUM3RCxNQUFNLFVBQVUsV0FBVyxDQUFDLE9BQWU7SUFDekMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDO0FB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QUUsUUFBUTtJQUNqQixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixLQUFLLEVBQUUsUUFBUTtJQUNmLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLEdBQUc7SUFDVCxNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsUUFBUTtJQUNsQixRQUFRLEVBQUUsUUFBUTtJQUNsQixRQUFRLEVBQUUsUUFBUTtJQUNsQixRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixRQUFRLEVBQUUsUUFBUTtJQUNsQixRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixLQUFLLEVBQUUsUUFBUTtJQUNmLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLElBQUksRUFBRSxRQUFRO0lBQ2QsUUFBUSxFQUFFLFFBQVE7SUFDbEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsS0FBSyxFQUFFLFFBQVE7SUFDZixLQUFLLEVBQUUsUUFBUTtJQUNmLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLElBQUksRUFBRSxHQUFHO0lBQ1QsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLFFBQVE7SUFDakIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsSUFBSSxFQUFFLFFBQVE7SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsUUFBUTtJQUNmLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsUUFBUTtJQUNsQixRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixRQUFRLEVBQUUsUUFBUTtJQUNsQixRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixTQUFTLEVBQUUsUUFBUTtJQUNuQixTQUFTLEVBQUUsUUFBUTtJQUNuQixPQUFPLEVBQUUsUUFBUTtJQUNqQixJQUFJLEVBQUUsUUFBUTtJQUNkLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixJQUFJLEVBQUUsUUFBUTtJQUNkLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLFFBQVE7SUFDZixRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLFFBQVE7SUFDakIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLFFBQVE7SUFDZixRQUFRLEVBQUUsUUFBUTtJQUNsQixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixRQUFRLEVBQUUsUUFBUTtJQUNsQixRQUFRLEVBQUUsUUFBUTtJQUNsQixNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLEtBQUssRUFBRSxRQUFRO0lBQ2YsUUFBUSxFQUFFLFFBQVE7SUFDbEIsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsS0FBSyxFQUFFLFFBQVE7SUFDZixLQUFLLEVBQUUsUUFBUTtJQUNmLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLEtBQUssRUFBRSxRQUFRO0lBQ2YsT0FBTyxFQUFFLFFBQVE7SUFDakIsU0FBUyxFQUFFLFFBQVE7SUFDbkIsU0FBUyxFQUFFLFFBQVE7SUFDbkIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsSUFBSSxFQUFFLFFBQVE7SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsUUFBUTtDQUNqQixDQUFDO0FBRUYscURBQXFEO0FBQ3JELHdJQUF3STtBQUN4SSxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBRXJDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCBlbnVtIFRhZ0NvbnRlbnRUeXBlIHtcbiAgUkFXX1RFWFQsXG4gIEVTQ0FQQUJMRV9SQVdfVEVYVCxcbiAgUEFSU0FCTEVfREFUQVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhZ0RlZmluaXRpb24ge1xuICBjbG9zZWRCeVBhcmVudDogYm9vbGVhbjtcbiAgcmVxdWlyZWRQYXJlbnRzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn07XG4gIHBhcmVudFRvQWRkOiBzdHJpbmc7XG4gIGltcGxpY2l0TmFtZXNwYWNlUHJlZml4OiBzdHJpbmd8bnVsbDtcbiAgY29udGVudFR5cGU6IFRhZ0NvbnRlbnRUeXBlO1xuICBpc1ZvaWQ6IGJvb2xlYW47XG4gIGlnbm9yZUZpcnN0TGY6IGJvb2xlYW47XG4gIGNhblNlbGZDbG9zZTogYm9vbGVhbjtcblxuICByZXF1aXJlRXh0cmFQYXJlbnQoY3VycmVudFBhcmVudDogc3RyaW5nKTogYm9vbGVhbjtcblxuICBpc0Nsb3NlZEJ5Q2hpbGQobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0TnNOYW1lKGVsZW1lbnROYW1lOiBzdHJpbmcpOiBbc3RyaW5nIHwgbnVsbCwgc3RyaW5nXSB7XG4gIGlmIChlbGVtZW50TmFtZVswXSAhPSAnOicpIHtcbiAgICByZXR1cm4gW251bGwsIGVsZW1lbnROYW1lXTtcbiAgfVxuXG4gIGNvbnN0IGNvbG9uSW5kZXggPSBlbGVtZW50TmFtZS5pbmRleE9mKCc6JywgMSk7XG5cbiAgaWYgKGNvbG9uSW5kZXggPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGZvcm1hdCBcIiR7ZWxlbWVudE5hbWV9XCIgZXhwZWN0aW5nIFwiOm5hbWVzcGFjZTpuYW1lXCJgKTtcbiAgfVxuXG4gIHJldHVybiBbZWxlbWVudE5hbWUuc2xpY2UoMSwgY29sb25JbmRleCksIGVsZW1lbnROYW1lLnNsaWNlKGNvbG9uSW5kZXggKyAxKV07XG59XG5cbi8vIGA8bmctY29udGFpbmVyPmAgdGFncyB3b3JrIHRoZSBzYW1lIHJlZ2FyZGxlc3MgdGhlIG5hbWVzcGFjZVxuZXhwb3J0IGZ1bmN0aW9uIGlzTmdDb250YWluZXIodGFnTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBzcGxpdE5zTmFtZSh0YWdOYW1lKVsxXSA9PT0gJ25nLWNvbnRhaW5lcic7XG59XG5cbi8vIGA8bmctY29udGVudD5gIHRhZ3Mgd29yayB0aGUgc2FtZSByZWdhcmRsZXNzIHRoZSBuYW1lc3BhY2VcbmV4cG9ydCBmdW5jdGlvbiBpc05nQ29udGVudCh0YWdOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIHNwbGl0TnNOYW1lKHRhZ05hbWUpWzFdID09PSAnbmctY29udGVudCc7XG59XG5cbi8vIGA8bmctdGVtcGxhdGU+YCB0YWdzIHdvcmsgdGhlIHNhbWUgcmVnYXJkbGVzcyB0aGUgbmFtZXNwYWNlXG5leHBvcnQgZnVuY3Rpb24gaXNOZ1RlbXBsYXRlKHRhZ05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gc3BsaXROc05hbWUodGFnTmFtZSlbMV0gPT09ICduZy10ZW1wbGF0ZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROc1ByZWZpeChmdWxsTmFtZTogc3RyaW5nKTogc3RyaW5nO1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5zUHJlZml4KGZ1bGxOYW1lOiBudWxsKTogbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBnZXROc1ByZWZpeChmdWxsTmFtZTogc3RyaW5nIHwgbnVsbCk6IHN0cmluZ3xudWxsIHtcbiAgcmV0dXJuIGZ1bGxOYW1lID09PSBudWxsID8gbnVsbCA6IHNwbGl0TnNOYW1lKGZ1bGxOYW1lKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTnNBbmROYW1lKHByZWZpeDogc3RyaW5nLCBsb2NhbE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwcmVmaXggPyBgOiR7cHJlZml4fToke2xvY2FsTmFtZX1gIDogbG9jYWxOYW1lO1xufVxuXG4vLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUxL3N5bnRheC5odG1sI25hbWVkLWNoYXJhY3Rlci1yZWZlcmVuY2VzXG4vLyBzZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZW50aXRpZXMuanNvblxuLy8gVGhpcyBsaXN0IGlzIG5vdCBleGhhdXN0aXZlIHRvIGtlZXAgdGhlIGNvbXBpbGVyIGZvb3RwcmludCBsb3cuXG4vLyBUaGUgYCYjMTIzO2AgLyBgJiN4MWFiO2Agc3ludGF4IHNob3VsZCBiZSB1c2VkIHdoZW4gdGhlIG5hbWVkIGNoYXJhY3RlciByZWZlcmVuY2UgZG9lcyBub3Rcbi8vIGV4aXN0LlxuZXhwb3J0IGNvbnN0IE5BTUVEX0VOVElUSUVTOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdBYWN1dGUnOiAnXFx1MDBDMScsXG4gICdhYWN1dGUnOiAnXFx1MDBFMScsXG4gICdBY2lyYyc6ICdcXHUwMEMyJyxcbiAgJ2FjaXJjJzogJ1xcdTAwRTInLFxuICAnYWN1dGUnOiAnXFx1MDBCNCcsXG4gICdBRWxpZyc6ICdcXHUwMEM2JyxcbiAgJ2FlbGlnJzogJ1xcdTAwRTYnLFxuICAnQWdyYXZlJzogJ1xcdTAwQzAnLFxuICAnYWdyYXZlJzogJ1xcdTAwRTAnLFxuICAnYWxlZnN5bSc6ICdcXHUyMTM1JyxcbiAgJ0FscGhhJzogJ1xcdTAzOTEnLFxuICAnYWxwaGEnOiAnXFx1MDNCMScsXG4gICdhbXAnOiAnJicsXG4gICdhbmQnOiAnXFx1MjIyNycsXG4gICdhbmcnOiAnXFx1MjIyMCcsXG4gICdhcG9zJzogJ1xcdTAwMjcnLFxuICAnQXJpbmcnOiAnXFx1MDBDNScsXG4gICdhcmluZyc6ICdcXHUwMEU1JyxcbiAgJ2FzeW1wJzogJ1xcdTIyNDgnLFxuICAnQXRpbGRlJzogJ1xcdTAwQzMnLFxuICAnYXRpbGRlJzogJ1xcdTAwRTMnLFxuICAnQXVtbCc6ICdcXHUwMEM0JyxcbiAgJ2F1bWwnOiAnXFx1MDBFNCcsXG4gICdiZHF1byc6ICdcXHUyMDFFJyxcbiAgJ0JldGEnOiAnXFx1MDM5MicsXG4gICdiZXRhJzogJ1xcdTAzQjInLFxuICAnYnJ2YmFyJzogJ1xcdTAwQTYnLFxuICAnYnVsbCc6ICdcXHUyMDIyJyxcbiAgJ2NhcCc6ICdcXHUyMjI5JyxcbiAgJ0NjZWRpbCc6ICdcXHUwMEM3JyxcbiAgJ2NjZWRpbCc6ICdcXHUwMEU3JyxcbiAgJ2NlZGlsJzogJ1xcdTAwQjgnLFxuICAnY2VudCc6ICdcXHUwMEEyJyxcbiAgJ0NoaSc6ICdcXHUwM0E3JyxcbiAgJ2NoaSc6ICdcXHUwM0M3JyxcbiAgJ2NpcmMnOiAnXFx1MDJDNicsXG4gICdjbHVicyc6ICdcXHUyNjYzJyxcbiAgJ2NvbmcnOiAnXFx1MjI0NScsXG4gICdjb3B5JzogJ1xcdTAwQTknLFxuICAnY3JhcnInOiAnXFx1MjFCNScsXG4gICdjdXAnOiAnXFx1MjIyQScsXG4gICdjdXJyZW4nOiAnXFx1MDBBNCcsXG4gICdkYWdnZXInOiAnXFx1MjAyMCcsXG4gICdEYWdnZXInOiAnXFx1MjAyMScsXG4gICdkYXJyJzogJ1xcdTIxOTMnLFxuICAnZEFycic6ICdcXHUyMUQzJyxcbiAgJ2RlZyc6ICdcXHUwMEIwJyxcbiAgJ0RlbHRhJzogJ1xcdTAzOTQnLFxuICAnZGVsdGEnOiAnXFx1MDNCNCcsXG4gICdkaWFtcyc6ICdcXHUyNjY2JyxcbiAgJ2RpdmlkZSc6ICdcXHUwMEY3JyxcbiAgJ0VhY3V0ZSc6ICdcXHUwMEM5JyxcbiAgJ2VhY3V0ZSc6ICdcXHUwMEU5JyxcbiAgJ0VjaXJjJzogJ1xcdTAwQ0EnLFxuICAnZWNpcmMnOiAnXFx1MDBFQScsXG4gICdFZ3JhdmUnOiAnXFx1MDBDOCcsXG4gICdlZ3JhdmUnOiAnXFx1MDBFOCcsXG4gICdlbXB0eSc6ICdcXHUyMjA1JyxcbiAgJ2Vtc3AnOiAnXFx1MjAwMycsXG4gICdlbnNwJzogJ1xcdTIwMDInLFxuICAnRXBzaWxvbic6ICdcXHUwMzk1JyxcbiAgJ2Vwc2lsb24nOiAnXFx1MDNCNScsXG4gICdlcXVpdic6ICdcXHUyMjYxJyxcbiAgJ0V0YSc6ICdcXHUwMzk3JyxcbiAgJ2V0YSc6ICdcXHUwM0I3JyxcbiAgJ0VUSCc6ICdcXHUwMEQwJyxcbiAgJ2V0aCc6ICdcXHUwMEYwJyxcbiAgJ0V1bWwnOiAnXFx1MDBDQicsXG4gICdldW1sJzogJ1xcdTAwRUInLFxuICAnZXVybyc6ICdcXHUyMEFDJyxcbiAgJ2V4aXN0JzogJ1xcdTIyMDMnLFxuICAnZm5vZic6ICdcXHUwMTkyJyxcbiAgJ2ZvcmFsbCc6ICdcXHUyMjAwJyxcbiAgJ2ZyYWMxMic6ICdcXHUwMEJEJyxcbiAgJ2ZyYWMxNCc6ICdcXHUwMEJDJyxcbiAgJ2ZyYWMzNCc6ICdcXHUwMEJFJyxcbiAgJ2ZyYXNsJzogJ1xcdTIwNDQnLFxuICAnR2FtbWEnOiAnXFx1MDM5MycsXG4gICdnYW1tYSc6ICdcXHUwM0IzJyxcbiAgJ2dlJzogJ1xcdTIyNjUnLFxuICAnZ3QnOiAnPicsXG4gICdoYXJyJzogJ1xcdTIxOTQnLFxuICAnaEFycic6ICdcXHUyMUQ0JyxcbiAgJ2hlYXJ0cyc6ICdcXHUyNjY1JyxcbiAgJ2hlbGxpcCc6ICdcXHUyMDI2JyxcbiAgJ0lhY3V0ZSc6ICdcXHUwMENEJyxcbiAgJ2lhY3V0ZSc6ICdcXHUwMEVEJyxcbiAgJ0ljaXJjJzogJ1xcdTAwQ0UnLFxuICAnaWNpcmMnOiAnXFx1MDBFRScsXG4gICdpZXhjbCc6ICdcXHUwMEExJyxcbiAgJ0lncmF2ZSc6ICdcXHUwMENDJyxcbiAgJ2lncmF2ZSc6ICdcXHUwMEVDJyxcbiAgJ2ltYWdlJzogJ1xcdTIxMTEnLFxuICAnaW5maW4nOiAnXFx1MjIxRScsXG4gICdpbnQnOiAnXFx1MjIyQicsXG4gICdJb3RhJzogJ1xcdTAzOTknLFxuICAnaW90YSc6ICdcXHUwM0I5JyxcbiAgJ2lxdWVzdCc6ICdcXHUwMEJGJyxcbiAgJ2lzaW4nOiAnXFx1MjIwOCcsXG4gICdJdW1sJzogJ1xcdTAwQ0YnLFxuICAnaXVtbCc6ICdcXHUwMEVGJyxcbiAgJ0thcHBhJzogJ1xcdTAzOUEnLFxuICAna2FwcGEnOiAnXFx1MDNCQScsXG4gICdMYW1iZGEnOiAnXFx1MDM5QicsXG4gICdsYW1iZGEnOiAnXFx1MDNCQicsXG4gICdsYW5nJzogJ1xcdTI3RTgnLFxuICAnbGFxdW8nOiAnXFx1MDBBQicsXG4gICdsYXJyJzogJ1xcdTIxOTAnLFxuICAnbEFycic6ICdcXHUyMUQwJyxcbiAgJ2xjZWlsJzogJ1xcdTIzMDgnLFxuICAnbGRxdW8nOiAnXFx1MjAxQycsXG4gICdsZSc6ICdcXHUyMjY0JyxcbiAgJ2xmbG9vcic6ICdcXHUyMzBBJyxcbiAgJ2xvd2FzdCc6ICdcXHUyMjE3JyxcbiAgJ2xveic6ICdcXHUyNUNBJyxcbiAgJ2xybSc6ICdcXHUyMDBFJyxcbiAgJ2xzYXF1byc6ICdcXHUyMDM5JyxcbiAgJ2xzcXVvJzogJ1xcdTIwMTgnLFxuICAnbHQnOiAnPCcsXG4gICdtYWNyJzogJ1xcdTAwQUYnLFxuICAnbWRhc2gnOiAnXFx1MjAxNCcsXG4gICdtaWNybyc6ICdcXHUwMEI1JyxcbiAgJ21pZGRvdCc6ICdcXHUwMEI3JyxcbiAgJ21pbnVzJzogJ1xcdTIyMTInLFxuICAnTXUnOiAnXFx1MDM5QycsXG4gICdtdSc6ICdcXHUwM0JDJyxcbiAgJ25hYmxhJzogJ1xcdTIyMDcnLFxuICAnbmJzcCc6ICdcXHUwMEEwJyxcbiAgJ25kYXNoJzogJ1xcdTIwMTMnLFxuICAnbmUnOiAnXFx1MjI2MCcsXG4gICduaSc6ICdcXHUyMjBCJyxcbiAgJ25vdCc6ICdcXHUwMEFDJyxcbiAgJ25vdGluJzogJ1xcdTIyMDknLFxuICAnbnN1Yic6ICdcXHUyMjg0JyxcbiAgJ050aWxkZSc6ICdcXHUwMEQxJyxcbiAgJ250aWxkZSc6ICdcXHUwMEYxJyxcbiAgJ051JzogJ1xcdTAzOUQnLFxuICAnbnUnOiAnXFx1MDNCRCcsXG4gICdPYWN1dGUnOiAnXFx1MDBEMycsXG4gICdvYWN1dGUnOiAnXFx1MDBGMycsXG4gICdPY2lyYyc6ICdcXHUwMEQ0JyxcbiAgJ29jaXJjJzogJ1xcdTAwRjQnLFxuICAnT0VsaWcnOiAnXFx1MDE1MicsXG4gICdvZWxpZyc6ICdcXHUwMTUzJyxcbiAgJ09ncmF2ZSc6ICdcXHUwMEQyJyxcbiAgJ29ncmF2ZSc6ICdcXHUwMEYyJyxcbiAgJ29saW5lJzogJ1xcdTIwM0UnLFxuICAnT21lZ2EnOiAnXFx1MDNBOScsXG4gICdvbWVnYSc6ICdcXHUwM0M5JyxcbiAgJ09taWNyb24nOiAnXFx1MDM5RicsXG4gICdvbWljcm9uJzogJ1xcdTAzQkYnLFxuICAnb3BsdXMnOiAnXFx1MjI5NScsXG4gICdvcic6ICdcXHUyMjI4JyxcbiAgJ29yZGYnOiAnXFx1MDBBQScsXG4gICdvcmRtJzogJ1xcdTAwQkEnLFxuICAnT3NsYXNoJzogJ1xcdTAwRDgnLFxuICAnb3NsYXNoJzogJ1xcdTAwRjgnLFxuICAnT3RpbGRlJzogJ1xcdTAwRDUnLFxuICAnb3RpbGRlJzogJ1xcdTAwRjUnLFxuICAnb3RpbWVzJzogJ1xcdTIyOTcnLFxuICAnT3VtbCc6ICdcXHUwMEQ2JyxcbiAgJ291bWwnOiAnXFx1MDBGNicsXG4gICdwYXJhJzogJ1xcdTAwQjYnLFxuICAncGVybWlsJzogJ1xcdTIwMzAnLFxuICAncGVycCc6ICdcXHUyMkE1JyxcbiAgJ1BoaSc6ICdcXHUwM0E2JyxcbiAgJ3BoaSc6ICdcXHUwM0M2JyxcbiAgJ1BpJzogJ1xcdTAzQTAnLFxuICAncGknOiAnXFx1MDNDMCcsXG4gICdwaXYnOiAnXFx1MDNENicsXG4gICdwbHVzbW4nOiAnXFx1MDBCMScsXG4gICdwb3VuZCc6ICdcXHUwMEEzJyxcbiAgJ3ByaW1lJzogJ1xcdTIwMzInLFxuICAnUHJpbWUnOiAnXFx1MjAzMycsXG4gICdwcm9kJzogJ1xcdTIyMEYnLFxuICAncHJvcCc6ICdcXHUyMjFEJyxcbiAgJ1BzaSc6ICdcXHUwM0E4JyxcbiAgJ3BzaSc6ICdcXHUwM0M4JyxcbiAgJ3F1b3QnOiAnXFx1MDAyMicsXG4gICdyYWRpYyc6ICdcXHUyMjFBJyxcbiAgJ3JhbmcnOiAnXFx1MjdFOScsXG4gICdyYXF1byc6ICdcXHUwMEJCJyxcbiAgJ3JhcnInOiAnXFx1MjE5MicsXG4gICdyQXJyJzogJ1xcdTIxRDInLFxuICAncmNlaWwnOiAnXFx1MjMwOScsXG4gICdyZHF1byc6ICdcXHUyMDFEJyxcbiAgJ3JlYWwnOiAnXFx1MjExQycsXG4gICdyZWcnOiAnXFx1MDBBRScsXG4gICdyZmxvb3InOiAnXFx1MjMwQicsXG4gICdSaG8nOiAnXFx1MDNBMScsXG4gICdyaG8nOiAnXFx1MDNDMScsXG4gICdybG0nOiAnXFx1MjAwRicsXG4gICdyc2FxdW8nOiAnXFx1MjAzQScsXG4gICdyc3F1byc6ICdcXHUyMDE5JyxcbiAgJ3NicXVvJzogJ1xcdTIwMUEnLFxuICAnU2Nhcm9uJzogJ1xcdTAxNjAnLFxuICAnc2Nhcm9uJzogJ1xcdTAxNjEnLFxuICAnc2RvdCc6ICdcXHUyMkM1JyxcbiAgJ3NlY3QnOiAnXFx1MDBBNycsXG4gICdzaHknOiAnXFx1MDBBRCcsXG4gICdTaWdtYSc6ICdcXHUwM0EzJyxcbiAgJ3NpZ21hJzogJ1xcdTAzQzMnLFxuICAnc2lnbWFmJzogJ1xcdTAzQzInLFxuICAnc2ltJzogJ1xcdTIyM0MnLFxuICAnc3BhZGVzJzogJ1xcdTI2NjAnLFxuICAnc3ViJzogJ1xcdTIyODInLFxuICAnc3ViZSc6ICdcXHUyMjg2JyxcbiAgJ3N1bSc6ICdcXHUyMjExJyxcbiAgJ3N1cCc6ICdcXHUyMjgzJyxcbiAgJ3N1cDEnOiAnXFx1MDBCOScsXG4gICdzdXAyJzogJ1xcdTAwQjInLFxuICAnc3VwMyc6ICdcXHUwMEIzJyxcbiAgJ3N1cGUnOiAnXFx1MjI4NycsXG4gICdzemxpZyc6ICdcXHUwMERGJyxcbiAgJ1RhdSc6ICdcXHUwM0E0JyxcbiAgJ3RhdSc6ICdcXHUwM0M0JyxcbiAgJ3RoZXJlNCc6ICdcXHUyMjM0JyxcbiAgJ1RoZXRhJzogJ1xcdTAzOTgnLFxuICAndGhldGEnOiAnXFx1MDNCOCcsXG4gICd0aGV0YXN5bSc6ICdcXHUwM0QxJyxcbiAgJ3RoaW5zcCc6ICdcXHUyMDA5JyxcbiAgJ1RIT1JOJzogJ1xcdTAwREUnLFxuICAndGhvcm4nOiAnXFx1MDBGRScsXG4gICd0aWxkZSc6ICdcXHUwMkRDJyxcbiAgJ3RpbWVzJzogJ1xcdTAwRDcnLFxuICAndHJhZGUnOiAnXFx1MjEyMicsXG4gICdVYWN1dGUnOiAnXFx1MDBEQScsXG4gICd1YWN1dGUnOiAnXFx1MDBGQScsXG4gICd1YXJyJzogJ1xcdTIxOTEnLFxuICAndUFycic6ICdcXHUyMUQxJyxcbiAgJ1VjaXJjJzogJ1xcdTAwREInLFxuICAndWNpcmMnOiAnXFx1MDBGQicsXG4gICdVZ3JhdmUnOiAnXFx1MDBEOScsXG4gICd1Z3JhdmUnOiAnXFx1MDBGOScsXG4gICd1bWwnOiAnXFx1MDBBOCcsXG4gICd1cHNpaCc6ICdcXHUwM0QyJyxcbiAgJ1Vwc2lsb24nOiAnXFx1MDNBNScsXG4gICd1cHNpbG9uJzogJ1xcdTAzQzUnLFxuICAnVXVtbCc6ICdcXHUwMERDJyxcbiAgJ3V1bWwnOiAnXFx1MDBGQycsXG4gICd3ZWllcnAnOiAnXFx1MjExOCcsXG4gICdYaSc6ICdcXHUwMzlFJyxcbiAgJ3hpJzogJ1xcdTAzQkUnLFxuICAnWWFjdXRlJzogJ1xcdTAwREQnLFxuICAneWFjdXRlJzogJ1xcdTAwRkQnLFxuICAneWVuJzogJ1xcdTAwQTUnLFxuICAneXVtbCc6ICdcXHUwMEZGJyxcbiAgJ1l1bWwnOiAnXFx1MDE3OCcsXG4gICdaZXRhJzogJ1xcdTAzOTYnLFxuICAnemV0YSc6ICdcXHUwM0I2JyxcbiAgJ3p3aic6ICdcXHUyMDBEJyxcbiAgJ3p3bmonOiAnXFx1MjAwQycsXG59O1xuXG4vLyBUaGUgJm5nc3A7IHBzZXVkby1lbnRpdHkgaXMgZGVub3RpbmcgYSBzcGFjZS4gc2VlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2RhcnQtbGFuZy9hbmd1bGFyL2Jsb2IvMGJiNjExMzg3ZDI5ZDY1YjVhZjdmOWQyNTE1YWI1NzFmZDNmYmVlNC9fdGVzdHMvdGVzdC9jb21waWxlci9wcmVzZXJ2ZV93aGl0ZXNwYWNlX3Rlc3QuZGFydFxuZXhwb3J0IGNvbnN0IE5HU1BfVU5JQ09ERSA9ICdcXHVFNTAwJztcblxuTkFNRURfRU5USVRJRVNbJ25nc3AnXSA9IE5HU1BfVU5JQ09ERTtcbiJdfQ==