var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(id) {
        _super.call(this);
        // console.log("new circle");
        this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        if (id != undefined) {
            this._circle.id = id;
        }
        this._element = this._circle;
        this.type = ElementType.circle;
        this.setStyle('lightblue', 0.5, 1, '#73ffff');
    }
    Circle.prototype.controlPointMoved = function (e) {
        this._vertexes = [];
        this._vertexes = this._controlPointStore.elementsList;
        var origX = parseInt(this._circle.getAttribute("cx"));
        var origY = parseInt(this._circle.getAttribute("cy"));
        var dx = this._vertexes[0].x - origX;
        var dy = this._vertexes[0].y - origY;
        if (dx != 0 || dy != 0) {
            this.setPosition();
            var secondCP = this._controlPointStore.elementsList[1];
            secondCP.setx = secondCP.x + dx;
            secondCP.sety = secondCP.y + dy;
        }
        else {
            this.setRadius();
        }
    };
    Circle.prototype.setPosition = function () {
        this.x = this._vertexes[0].x;
        this.y = this._vertexes[0].y;
    };
    Circle.prototype.setRadius = function (radiusPoint) {
        var second;
        if (radiusPoint) {
            second = radiusPoint;
        }
        else {
            second = this._vertexes[1];
        }
        var dx = this._vertexes[0].x - second.x;
        var dy = this._vertexes[0].y - second.y;
        var dx2 = Math.pow(dx, 2);
        var dy2 = Math.pow(dy, 2);
        this.r = Math.sqrt(dx2 + dy2);
    };
    Object.defineProperty(Circle.prototype, "x", {
        set: function (value) {
            this._circle.setAttribute("cx", String(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "y", {
        set: function (value) {
            this._circle.setAttribute("cy", String(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "r", {
        set: function (value) {
            this._circle.setAttribute("r", String(value));
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.setCoordinates = function (coords, finished) {
        if (finished === void 0) { finished = false; }
        _super.prototype.setCoordinates.call(this, coords.slice(0, 2), finished);
        this.setPosition();
        this.setRadius();
    };
    return Circle;
})(ElementBase);
//# sourceMappingURL=Circle.js.map