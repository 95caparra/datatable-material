/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isNgContent } from '../ml_parser/tags';
var NG_CONTENT_SELECT_ATTR = 'select';
var LINK_ELEMENT = 'link';
var LINK_STYLE_REL_ATTR = 'rel';
var LINK_STYLE_HREF_ATTR = 'href';
var LINK_STYLE_REL_VALUE = 'stylesheet';
var STYLE_ELEMENT = 'style';
var SCRIPT_ELEMENT = 'script';
var NG_NON_BINDABLE_ATTR = 'ngNonBindable';
var NG_PROJECT_AS = 'ngProjectAs';
export function preparseElement(ast) {
    var selectAttr = null;
    var hrefAttr = null;
    var relAttr = null;
    var nonBindable = false;
    var projectAs = '';
    ast.attrs.forEach(function (attr) {
        var lcAttrName = attr.name.toLowerCase();
        if (lcAttrName == NG_CONTENT_SELECT_ATTR) {
            selectAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
            hrefAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_REL_ATTR) {
            relAttr = attr.value;
        }
        else if (attr.name == NG_NON_BINDABLE_ATTR) {
            nonBindable = true;
        }
        else if (attr.name == NG_PROJECT_AS) {
            if (attr.value.length > 0) {
                projectAs = attr.value;
            }
        }
    });
    selectAttr = normalizeNgContentSelect(selectAttr);
    var nodeName = ast.name.toLowerCase();
    var type = PreparsedElementType.OTHER;
    if (isNgContent(nodeName)) {
        type = PreparsedElementType.NG_CONTENT;
    }
    else if (nodeName == STYLE_ELEMENT) {
        type = PreparsedElementType.STYLE;
    }
    else if (nodeName == SCRIPT_ELEMENT) {
        type = PreparsedElementType.SCRIPT;
    }
    else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
        type = PreparsedElementType.STYLESHEET;
    }
    return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs);
}
export var PreparsedElementType;
(function (PreparsedElementType) {
    PreparsedElementType[PreparsedElementType["NG_CONTENT"] = 0] = "NG_CONTENT";
    PreparsedElementType[PreparsedElementType["STYLE"] = 1] = "STYLE";
    PreparsedElementType[PreparsedElementType["STYLESHEET"] = 2] = "STYLESHEET";
    PreparsedElementType[PreparsedElementType["SCRIPT"] = 3] = "SCRIPT";
    PreparsedElementType[PreparsedElementType["OTHER"] = 4] = "OTHER";
})(PreparsedElementType || (PreparsedElementType = {}));
var PreparsedElement = /** @class */ (function () {
    function PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs) {
        this.type = type;
        this.selectAttr = selectAttr;
        this.hrefAttr = hrefAttr;
        this.nonBindable = nonBindable;
        this.projectAs = projectAs;
    }
    return PreparsedElement;
}());
export { PreparsedElement };
function normalizeNgContentSelect(selectAttr) {
    if (selectAttr === null || selectAttr.length === 0) {
        return '*';
    }
    return selectAttr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcHJlcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvY29tcGlsZXIvc3JjL3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9wcmVwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTlDLElBQU0sc0JBQXNCLEdBQUcsUUFBUSxDQUFDO0FBQ3hDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztBQUM1QixJQUFNLG1CQUFtQixHQUFHLEtBQUssQ0FBQztBQUNsQyxJQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztBQUNwQyxJQUFNLG9CQUFvQixHQUFHLFlBQVksQ0FBQztBQUMxQyxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFDOUIsSUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDO0FBQ2hDLElBQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDO0FBQzdDLElBQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUVwQyxNQUFNLFVBQVUsZUFBZSxDQUFDLEdBQWlCO0lBQy9DLElBQUksVUFBVSxHQUFXLElBQU0sQ0FBQztJQUNoQyxJQUFJLFFBQVEsR0FBVyxJQUFNLENBQUM7SUFDOUIsSUFBSSxPQUFPLEdBQVcsSUFBTSxDQUFDO0lBQzdCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDbkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1FBQ3BCLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsSUFBSSxVQUFVLElBQUksc0JBQXNCLEVBQUU7WUFDeEMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDekI7YUFBTSxJQUFJLFVBQVUsSUFBSSxvQkFBb0IsRUFBRTtZQUM3QyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUN2QjthQUFNLElBQUksVUFBVSxJQUFJLG1CQUFtQixFQUFFO1lBQzVDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLG9CQUFvQixFQUFFO1lBQzVDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDcEI7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksYUFBYSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN4QjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxVQUFVLEdBQUcsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxJQUFJLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7SUFDdEMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekIsSUFBSSxHQUFHLG9CQUFvQixDQUFDLFVBQVUsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxJQUFJLGFBQWEsRUFBRTtRQUNwQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO0tBQ25DO1NBQU0sSUFBSSxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ3JDLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsSUFBSSxZQUFZLElBQUksT0FBTyxJQUFJLG9CQUFvQixFQUFFO1FBQ3RFLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7S0FDeEM7SUFDRCxPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2xGLENBQUM7QUFFRCxNQUFNLENBQU4sSUFBWSxvQkFNWDtBQU5ELFdBQVksb0JBQW9CO0lBQzlCLDJFQUFVLENBQUE7SUFDVixpRUFBSyxDQUFBO0lBQ0wsMkVBQVUsQ0FBQTtJQUNWLG1FQUFNLENBQUE7SUFDTixpRUFBSyxDQUFBO0FBQ1AsQ0FBQyxFQU5XLG9CQUFvQixLQUFwQixvQkFBb0IsUUFNL0I7QUFFRDtJQUNFLDBCQUNXLElBQTBCLEVBQVMsVUFBa0IsRUFBUyxRQUFnQixFQUM5RSxXQUFvQixFQUFTLFNBQWlCO1FBRDlDLFNBQUksR0FBSixJQUFJLENBQXNCO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDOUUsZ0JBQVcsR0FBWCxXQUFXLENBQVM7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQUcsQ0FBQztJQUMvRCx1QkFBQztBQUFELENBQUMsQUFKRCxJQUlDOztBQUdELFNBQVMsd0JBQXdCLENBQUMsVUFBa0I7SUFDbEQsSUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2xELE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBodG1sIGZyb20gJy4uL21sX3BhcnNlci9hc3QnO1xuaW1wb3J0IHtpc05nQ29udGVudH0gZnJvbSAnLi4vbWxfcGFyc2VyL3RhZ3MnO1xuXG5jb25zdCBOR19DT05URU5UX1NFTEVDVF9BVFRSID0gJ3NlbGVjdCc7XG5jb25zdCBMSU5LX0VMRU1FTlQgPSAnbGluayc7XG5jb25zdCBMSU5LX1NUWUxFX1JFTF9BVFRSID0gJ3JlbCc7XG5jb25zdCBMSU5LX1NUWUxFX0hSRUZfQVRUUiA9ICdocmVmJztcbmNvbnN0IExJTktfU1RZTEVfUkVMX1ZBTFVFID0gJ3N0eWxlc2hlZXQnO1xuY29uc3QgU1RZTEVfRUxFTUVOVCA9ICdzdHlsZSc7XG5jb25zdCBTQ1JJUFRfRUxFTUVOVCA9ICdzY3JpcHQnO1xuY29uc3QgTkdfTk9OX0JJTkRBQkxFX0FUVFIgPSAnbmdOb25CaW5kYWJsZSc7XG5jb25zdCBOR19QUk9KRUNUX0FTID0gJ25nUHJvamVjdEFzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcnNlRWxlbWVudChhc3Q6IGh0bWwuRWxlbWVudCk6IFByZXBhcnNlZEVsZW1lbnQge1xuICBsZXQgc2VsZWN0QXR0cjogc3RyaW5nID0gbnVsbCAhO1xuICBsZXQgaHJlZkF0dHI6IHN0cmluZyA9IG51bGwgITtcbiAgbGV0IHJlbEF0dHI6IHN0cmluZyA9IG51bGwgITtcbiAgbGV0IG5vbkJpbmRhYmxlID0gZmFsc2U7XG4gIGxldCBwcm9qZWN0QXMgPSAnJztcbiAgYXN0LmF0dHJzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgY29uc3QgbGNBdHRyTmFtZSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChsY0F0dHJOYW1lID09IE5HX0NPTlRFTlRfU0VMRUNUX0FUVFIpIHtcbiAgICAgIHNlbGVjdEF0dHIgPSBhdHRyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAobGNBdHRyTmFtZSA9PSBMSU5LX1NUWUxFX0hSRUZfQVRUUikge1xuICAgICAgaHJlZkF0dHIgPSBhdHRyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAobGNBdHRyTmFtZSA9PSBMSU5LX1NUWUxFX1JFTF9BVFRSKSB7XG4gICAgICByZWxBdHRyID0gYXR0ci52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGF0dHIubmFtZSA9PSBOR19OT05fQklOREFCTEVfQVRUUikge1xuICAgICAgbm9uQmluZGFibGUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoYXR0ci5uYW1lID09IE5HX1BST0pFQ1RfQVMpIHtcbiAgICAgIGlmIChhdHRyLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcHJvamVjdEFzID0gYXR0ci52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBzZWxlY3RBdHRyID0gbm9ybWFsaXplTmdDb250ZW50U2VsZWN0KHNlbGVjdEF0dHIpO1xuICBjb25zdCBub2RlTmFtZSA9IGFzdC5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGxldCB0eXBlID0gUHJlcGFyc2VkRWxlbWVudFR5cGUuT1RIRVI7XG4gIGlmIChpc05nQ29udGVudChub2RlTmFtZSkpIHtcbiAgICB0eXBlID0gUHJlcGFyc2VkRWxlbWVudFR5cGUuTkdfQ09OVEVOVDtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBTVFlMRV9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNUWUxFO1xuICB9IGVsc2UgaWYgKG5vZGVOYW1lID09IFNDUklQVF9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNDUklQVDtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBMSU5LX0VMRU1FTlQgJiYgcmVsQXR0ciA9PSBMSU5LX1NUWUxFX1JFTF9WQUxVRSkge1xuICAgIHR5cGUgPSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRVNIRUVUO1xuICB9XG4gIHJldHVybiBuZXcgUHJlcGFyc2VkRWxlbWVudCh0eXBlLCBzZWxlY3RBdHRyLCBocmVmQXR0ciwgbm9uQmluZGFibGUsIHByb2plY3RBcyk7XG59XG5cbmV4cG9ydCBlbnVtIFByZXBhcnNlZEVsZW1lbnRUeXBlIHtcbiAgTkdfQ09OVEVOVCxcbiAgU1RZTEUsXG4gIFNUWUxFU0hFRVQsXG4gIFNDUklQVCxcbiAgT1RIRVJcbn1cblxuZXhwb3J0IGNsYXNzIFByZXBhcnNlZEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB0eXBlOiBQcmVwYXJzZWRFbGVtZW50VHlwZSwgcHVibGljIHNlbGVjdEF0dHI6IHN0cmluZywgcHVibGljIGhyZWZBdHRyOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgbm9uQmluZGFibGU6IGJvb2xlYW4sIHB1YmxpYyBwcm9qZWN0QXM6IHN0cmluZykge31cbn1cblxuXG5mdW5jdGlvbiBub3JtYWxpemVOZ0NvbnRlbnRTZWxlY3Qoc2VsZWN0QXR0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNlbGVjdEF0dHIgPT09IG51bGwgfHwgc2VsZWN0QXR0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJyonO1xuICB9XG4gIHJldHVybiBzZWxlY3RBdHRyO1xufVxuIl19