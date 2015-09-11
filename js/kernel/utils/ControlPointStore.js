var ControlPointStore = (function () {
    function ControlPointStore() {
        this._pointList = [];
        this._gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this._gElement.id = "cpstore";
        this.hideCPoints();
    }
    ControlPointStore.prototype.addPoint = function (point, relatedPolygon) {
        var newPoint = new ControlPoint(point.x, point.y, relatedPolygon);
        this._gElement.appendChild(newPoint.point);
        this._pointList.push(newPoint);
    };
    ControlPointStore.prototype.addPoints = function (points, relatedPolygon) {
        var self = this;
        points.forEach(function (p) {
            self.addPoint(p, relatedPolygon);
        });
    };
    ControlPointStore.prototype.removePoints = function (selector) {
        var pointsToRemove = [];
        var self = this;
        this._pointList.forEach(function (point) {
            if (selector === ERemove.remove_selected) {
                if (point.selected) {
                    pointsToRemove.push(point);
                }
            }
            else if (selector === ERemove.remove_all) {
                pointsToRemove.push(point);
            }
            else {
                console.warn("Please select type of ControlPoints removal");
            }
        });
        while (pointsToRemove.length) {
            this.removePoint(pointsToRemove.pop());
        }
    };
    ControlPointStore.prototype.removePoint = function (pointToRemove) {
        pointToRemove.point.parentNode.removeChild(pointToRemove.point);
        this._pointList.splice(this._pointList.indexOf(pointToRemove), 1);
    };
    ControlPointStore.prototype.showCPoints = function () {
        this._gElement.style.visibility = "visible";
    };
    ControlPointStore.prototype.hideCPoints = function () {
        this._gElement.style.visibility = "hidden";
        this.elementsList.forEach(function (cp) {
            cp.selected = false;
            cp.styleDeselect();
        });
    };
    Object.defineProperty(ControlPointStore.prototype, "storeElement", {
        get: function () {
            return this._gElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlPointStore.prototype, "elementsList", {
        get: function () {
            return this._pointList;
        },
        enumerable: true,
        configurable: true
    });
    return ControlPointStore;
})();
//# sourceMappingURL=ControlPointStore.js.map