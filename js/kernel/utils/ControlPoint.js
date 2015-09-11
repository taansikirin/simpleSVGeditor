var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
})();
var ControlPoint = (function (_super) {
    __extends(ControlPoint, _super);
    function ControlPoint(x, y, _relatedPolygon) {
        _super.call(this, x, y);
        this._relatedPolygon = _relatedPolygon;
        this.selected = false;
        this._pointSize = 20;
        this._moveHander = this.mouseMoveHandler.bind(this);
        this._upHander = this.mouseUpHandler.bind(this);
        this._point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.setx = x;
        this.sety = y;
        this._xorig = this.x;
        this._yorig = this.y;
        this._point.setAttribute("r", String(this._pointSize / 5));
        this.setStyle();
        this._point.style.cursor = "pointer";
        this._point.addEventListener("mouseover", this.mouseOverHandler.bind(this));
        this._point.addEventListener("mouseout", this.mouseOutHandler.bind(this));
        this._point.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        this._point.addEventListener("dblclick", this.dblHandler.bind(this));
    }
    Object.defineProperty(ControlPoint.prototype, "point", {
        get: function () {
            return this._point;
        },
        enumerable: true,
        configurable: true
    });
    ControlPoint.prototype.mouseOverHandler = function (e) {
        this.styleSelect();
    };
    ControlPoint.prototype.mouseOutHandler = function (e) {
        if (!this.selected) {
            this.styleDeselect();
        }
    };
    ControlPoint.prototype.dblHandler = function (e) {
        //console.log("dbl click");
        this.selected = !this.selected;
        if (this.selected) {
            this.styleSelect();
        }
        else {
            this.styleDeselect();
        }
    };
    ControlPoint.prototype.mouseDownHandler = function (e) {
        //console.log("mouse down");
        this._point.addEventListener("mouseup", this._upHander);
        this._point.addEventListener("mousemove", this._moveHander);
        SVGStage.instance.mainStage.addEventListener("mouseup", this._upHander);
        SVGStage.instance.mainStage.addEventListener("mousemove", this._moveHander);
    };
    ControlPoint.prototype.mouseUpHandler = function (e) {
        //console.log("mouse up");
        this._point.removeEventListener("mouseup", this._upHander);
        this._point.removeEventListener("mousemove", this._moveHander);
        SVGStage.instance.mainStage.removeEventListener("mouseup", this._upHander);
        SVGStage.instance.mainStage.removeEventListener("mousemove", this._moveHander);
        this._xorig = this.x;
        this._yorig = this.y;
    };
    ControlPoint.prototype.mouseMoveHandler = function (e) {
        this.setStyle('red', 3, 0.5);
        // console.log("mouse move x: " + e.offsetX + ", y: " + e.offsetY);
        if (Math.abs(this._xorig - e.offsetX) > 5 || Math.abs(this._yorig - e.offsetY) > 5) {
            if (Utils.detectFirefox()) {
                this.setx = e.layerX;
                this.sety = e.layerY;
            }
            else {
                this.setx = e.offsetX;
                this.sety = e.offsetY;
            }
            var moveEvent = document.createEvent('CustomEvent');
            moveEvent.initCustomEvent(ControlPoint.CONTROL_POINT_MOVED, true, true, { x: this.x, y: this.y });
            this._relatedPolygon.dispatchEvent(moveEvent);
        }
        else {
            this.x = this._xorig;
            this.y = this._yorig;
        }
    };
    ControlPoint.prototype.setStyle = function (fill, strokeWidth, fillOpacity, strokeColor) {
        if (fill === void 0) { fill = 'yellow'; }
        if (strokeWidth === void 0) { strokeWidth = 1; }
        if (fillOpacity === void 0) { fillOpacity = 1; }
        if (strokeColor === void 0) { strokeColor = 'black'; }
        this._point.style.fill = fill;
        this._point.style.fillOpacity = String(fillOpacity);
        this._point.style.strokeWidth = strokeWidth + 'px';
        this._point.style.stroke = strokeColor;
    };
    ControlPoint.prototype.styleSelect = function () {
        this.setStyle('red', 3);
        this._point.setAttribute('r', String(this._pointSize / 5 * 2));
    };
    ControlPoint.prototype.styleDeselect = function () {
        this.setStyle();
        this._point.setAttribute('r', String(this._pointSize / 5));
    };
    Object.defineProperty(ControlPoint.prototype, "setx", {
        set: function (value) {
            this.x = value;
            this._point.setAttribute("cx", this.x + "px");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlPoint.prototype, "sety", {
        set: function (value) {
            this.y = value;
            this._point.setAttribute("cy", this.y + "px");
        },
        enumerable: true,
        configurable: true
    });
    ControlPoint.CONTROL_POINT_MOVED = "controlPointMoved";
    return ControlPoint;
})(Point);
//# sourceMappingURL=ControlPoint.js.map