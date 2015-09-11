var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(id) {
        _super.call(this);
        this._rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        if (id != undefined) {
            this._rect.id = id;
        }
        this._element = this._rect;
        this.type = ElementType.rectangle;
        // this.gElement.appendChild(this._rect);
        this.setStyle('lightblue', 0.5, 1, '#73ffff');
    }
    Rectangle.prototype.controlPointMoved = function (e) {
        this._vertexes = [];
        this._vertexes = this._controlPointStore.elementsList;
        this.setDimensions();
    };
    Rectangle.prototype.setDimensions = function () {
        var first = this._vertexes[0];
        var second = this._vertexes[1];
        if (first.x - second.x > 0 && first.y - second.y > 0) {
            //x+, y+
            this.x = this._vertexes[1].x;
            this.y = this._vertexes[1].y;
        }
        else if (first.x - second.x > 0 && first.y - second.y < 0) {
            //x+, y-
            this.x = this._vertexes[1].x;
            this.y = this._vertexes[0].y;
        }
        else if (first.x - second.x < 0 && first.y - second.y > 0) {
            //x-, y+
            this.x = this._vertexes[0].x;
            this.y = this._vertexes[1].y;
        }
        else if (first.x - second.x == 0 || first.y - second.y == 0) {
        }
        else {
            //x-, y-
            this.x = this._vertexes[0].x;
            this.y = this._vertexes[0].y;
        }
        this.width = Math.abs(second.x - first.x);
        this.height = Math.abs(second.y - first.y);
    };
    Object.defineProperty(Rectangle.prototype, "x", {
        set: function (value) {
            this._rect.setAttribute("x", String(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y", {
        set: function (value) {
            this._rect.setAttribute("y", String(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "width", {
        set: function (value) {
            this._rect.setAttribute("width", String(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        set: function (value) {
            this._rect.setAttribute("height", String(value));
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.setCoordinates = function (coords, finished) {
        if (finished === void 0) { finished = false; }
        _super.prototype.setCoordinates.call(this, coords.slice(0, 2), finished);
        this.setDimensions();
    };
    return Rectangle;
})(ElementBase);
//# sourceMappingURL=Rectangle.js.map