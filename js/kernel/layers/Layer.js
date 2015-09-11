var ElementType;
(function (ElementType) {
    ElementType[ElementType["polygon"] = 0] = "polygon";
    ElementType[ElementType["rectangle"] = 1] = "rectangle";
    ElementType[ElementType["circle"] = 2] = "circle";
    ElementType[ElementType["polyline"] = 3] = "polyline";
})(ElementType || (ElementType = {}));
var Layer = (function () {
    function Layer(id, elementType) {
        this.id = id;
        this.layerSelected = false;
        this._elements = [];
        this._layerElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this._layerElement.id = this.id;
        SVGStage.instance.appedToSVGStage(this._layerElement);
        SVGStage.instance.addChildClass(this);
        this.layerItem = new LayerItem(this);
        this.select();
    }
    Layer.prototype.addPolygon = function () {
        this._actualShape = new Polygon();
        this.addActual();
    };
    Layer.prototype.addRectangle = function () {
        this._actualShape = new Rectangle();
        this.addActual();
    };
    Layer.prototype.addCircle = function () {
        this._actualShape = new Circle();
        this.addActual();
    };
    Layer.prototype.addPolyline = function () {
        this._actualShape = new Polyline();
        this.addActual();
    };
    Layer.prototype.addActual = function () {
        this._elements.push(this._actualShape);
        this._layerElement.appendChild(this._actualShape.gElement);
        this._actualShape.layer = this;
    };
    Layer.prototype.addElement = function (element) {
        this._elements.push(element);
        this._layerElement.appendChild(element.gElement);
        element.gElement.insertBefore(element.element, element.gElement.childNodes[0]);
        element.layer = this;
        element.treeItem = this.layerItem.addTreeItem(element);
    };
    Layer.prototype.removeElement = function (toRemove, callRemoveLayer) {
        if (callRemoveLayer === void 0) { callRemoveLayer = true; }
        // console.log("remove element");
        this._layerElement.removeChild(toRemove.gElement);
        this._elements.splice(this.elementsList.indexOf(toRemove), 1);
        this._actualShape = undefined;
        if (!this._elements.length && callRemoveLayer) {
            LayerList.instance.removeLayer(this.id);
        }
    };
    Layer.prototype.onLayerRemove = function () {
        this.layerItem.body.parentElement.removeChild(this.layerItem.body);
        this.layerItem = null;
    };
    Layer.prototype.setCoordinates = function (coords, finished) {
        this._actualShape.setCoordinates(coords, finished);
    };
    Layer.prototype.layerSelectHandler = function () {
        this.layerSelected = !this.layerSelected;
        // console.log("layerSelected: " + this.layerSelected);
        var fillColor = null;
        var stroke = null;
        var strokeWidth = null;
        if (this.layerSelected) {
            LayerList.instance.actualLayer = this;
            fillColor = '#fa734b';
            strokeWidth = 3;
        }
        var self = this;
        this._elements.forEach(function (pol) {
            pol.selected = self.layerSelected;
            if (pol.type == ElementType.polyline) {
                pol.setStyle('none', 1, strokeWidth, stroke);
            }
            else {
                pol.setStyle(fillColor);
            }
        });
    };
    Layer.prototype.select = function () {
        this.layerSelected = true;
        this._elements.forEach(function (pol) {
            if (pol.type == ElementType.polyline) {
                pol.setStyle('none', 1, 3, '#fa734');
            }
            else {
                pol.setStyle('#fa734b');
            }
        });
    };
    Layer.prototype.deselect = function (drawNew) {
        if (drawNew === void 0) { drawNew = false; }
        // console.log("deselect method");
        this.layerSelected = false;
        if (!drawNew)
            this.layerItem.body.style.backgroundColor = 'transparent';
        this.elementsList.forEach(function (pol) {
            pol.deselect();
            pol.setStyle();
        });
    };
    Object.defineProperty(Layer.prototype, "elementsList", {
        get: function () {
            return this._elements;
        },
        enumerable: true,
        configurable: true
    });
    Layer.prototype.enable = function () {
        this.deselect(true);
        this.elementsList.forEach(function (pol) {
            pol.enable();
        });
    };
    Layer.prototype.disable = function () {
        this.deselect(true);
        this.elementsList.forEach(function (pol) {
            pol.disable();
        });
    };
    Layer.prototype.show = function () {
        this._layerElement.style.visibility = "visible";
    };
    Layer.prototype.hide = function () {
        this._layerElement.style.visibility = "hidden";
        var self = this;
        this.elementsList.forEach(function (p) {
            if (self.layerSelected) {
                p.elementClickHandler(null);
            }
            else if (p.editMode) {
                p.polygonDblClickHandler(null);
            }
        });
    };
    Object.defineProperty(Layer.prototype, "layerElement", {
        get: function () {
            return this._layerElement;
        },
        enumerable: true,
        configurable: true
    });
    Layer.DESELECT = "deselectLayer";
    return Layer;
})();
//# sourceMappingURL=Layer.js.map