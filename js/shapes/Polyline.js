var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Polyline = (function (_super) {
    __extends(Polyline, _super);
    function Polyline(id) {
        _super.call(this);
        this._polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        this._polyline.setAttribute("class", 'polyline');
        if (id != undefined) {
            this._polyline.id = id;
        }
        this._element = this._polyline; //TODO mozna by to mohlo byt primo vytvarene do elementu predka a this._polygon plne nahradit this._element (pozor na nastaveni stylu v editON/OFF)
        this.type = ElementType.polyline;
        // this.gElement.appendChild(this._polyline);
        this._fill = 'none';
        this.setStyle('none', 0.5, 1, '#73ffff');
    }
    Polyline.prototype.controlPointMoved = function (e) {
        this.setCoordinates(this._controlPointStore.elementsList);
    };
    Polyline.prototype.setCoordinates = function (coords, finished) {
        if (finished === void 0) { finished = false; }
        _super.prototype.setCoordinates.call(this, coords, finished);
        this._polyline.setAttribute("points", Utils.convertPointListToString(coords));
    };
    Polyline.prototype.editModeOn = function () {
        _super.prototype.editModeOn.call(this);
        this.setStyle('', 0.5, 3, '#73ffff');
    };
    return Polyline;
})(ElementBase);
//# sourceMappingURL=Polyline.js.map