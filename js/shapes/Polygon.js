var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon(id) {
        _super.call(this);
        this._polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        if (id != undefined) {
            this._polygon.id = id;
        }
        this._element = this._polygon; //TODO mozna by to mohlo byt primo vytvarene do elementu predka a this._polygon plne nahradit this._element (pozor na nastaveni stylu v editON/OFF)
        this.type = ElementType.polygon;
        // this.gElement.appendChild(this._polygon);
        this.setStyle('lightblue', 0.5, 1, '#73ffff');
    }
    Polygon.prototype.controlPointMoved = function (e) {
        this.setCoordinates(this._controlPointStore.elementsList);
    };
    Polygon.prototype.setCoordinates = function (coords, finished) {
        if (finished === void 0) { finished = false; }
        _super.prototype.setCoordinates.call(this, coords, finished);
        this._polygon.setAttribute("points", Utils.convertPointListToString(coords));
    };
    return Polygon;
})(ElementBase);
//# sourceMappingURL=Polygon.js.map