var SVGParser = (function () {
    function SVGParser() {
        this._mockParent = document.createElement("div");
        this._text = '';
        this._tabs = [];
        this._firstCall = true;
        this.popup = new PopUpCode("SVG structure");
    }
    SVGParser.prototype.showCode = function (element, idToRemove) {
        this.clear();
        this.popup.showPopUp(this.parse(element, idToRemove));
    };
    SVGParser.prototype.clear = function () {
        this._text = '';
        this._firstCall = true;
    };
    SVGParser.prototype.parse = function (element, idToRemove) {
        if (element.id == idToRemove) {
            element.parentNode.removeChild(element);
            return '';
        }
        else {
            var elementClone = element.cloneNode(false);
            this._mockParent.appendChild(elementClone);
            var elementType = element.nodeName.toLowerCase();
            if (elementType != 'g' || element.id != "") {
                if (!this._firstCall) {
                    this._tabs.push("\t");
                    this._text += "\n" + this._tabs.join('') + this._mockParent.innerHTML.substring(0, this._mockParent.innerHTML.indexOf("</" + elementType + ">"));
                }
                else {
                    this._firstCall = false;
                    this._text += this._tabs.join('') + this._mockParent.innerHTML.substring(0, this._mockParent.innerHTML.indexOf("</" + elementType + ">"));
                    this._text += "\n\t<title>Created by taansikirin's Free SVG Editor<title>";
                }
            }
            this._mockParent.removeChild(elementClone);
            if (element.childNodes.length) {
                for (var i = 0; i < element.childNodes.length; i++) {
                    this.parse(element.childNodes.item(i), idToRemove);
                }
            }
            else {
                this._text += "</" + elementType + ">";
                this._tabs.pop();
                return this._text;
            }
        }
        if (elementType != 'g' || element.id != "") {
            this._text += "\n" + this._tabs.join('') + "</" + elementType + ">";
            this._tabs.pop();
        }
        return this._text;
    };
    return SVGParser;
})();
//# sourceMappingURL=Parser.js.map