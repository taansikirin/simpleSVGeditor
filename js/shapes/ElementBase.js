var ElementBase = (function () {
    function ElementBase() {
        this.selected = false;
        this.editMode = false;
        this._fill = '#F2FF4F';
        this._stroke = '#2465FF';
        this._strokeWidth = 1;
        this._opacity = 0.59;
        this._elementClickHandler = this.elementClickHandler.bind(this);
        this._dblClickHandler = this.polygonDblClickHandler.bind(this);
        this._cpmoveHandler = this.controlPointMoved.bind(this);
        this._overHandler = this.mouseoverHandler.bind(this);
        this._outHandler = this.mouseoutHandler.bind(this);
        this._vertexes = [];
        this.gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this._controlPointStore = new ControlPointStore();
        this.gElement.appendChild(this._controlPointStore.storeElement);
        Utils.dispatchCreatingStart({ data: this });
    }
    ElementBase.prototype.enable = function () {
        // console.log("element enable");
        this.gElement.addEventListener("click", this._elementClickHandler);
        this._element.addEventListener("mouseover", this._overHandler);
        this._element.addEventListener("mouseout", this._outHandler);
        if (!this.editMode) {
            this._element.addEventListener("dblclick", this._dblClickHandler);
        }
        this.treeItem.enable();
    };
    ElementBase.prototype.disable = function () {
        this.gElement.removeEventListener("click", this._elementClickHandler);
        this._element.removeEventListener("mouseover", this._overHandler);
        this._element.removeEventListener("mouseout", this._outHandler);
        if (!this.editMode) {
            this._element.removeEventListener("dblclick", this._dblClickHandler);
        }
        this.treeItem.disable();
    };
    ElementBase.prototype.removeClickHandles = function () {
        this.gElement.removeEventListener("click", this._elementClickHandler);
        this._element.removeEventListener("dblclick", this._dblClickHandler);
    };
    ElementBase.prototype.addClickHandlers = function () {
        this.gElement.addEventListener("click", this._elementClickHandler);
        this._element.addEventListener("dblclick", this._dblClickHandler);
    };
    ElementBase.prototype.elementClickHandler = function (e) {
        // console.log("element click handler");
        this.selected = !this.selected;
        var fillColor = null;
        var stroke = null;
        var strokeWidth = null;
        this.treeItem.body.style.backgroundColor = 'transparent';
        if (this.selected) {
            fillColor = '#fa734b';
            stroke = fillColor;
            strokeWidth = 3;
            this.treeItem.body.style.backgroundColor = fillColor;
        }
        if (this.type == ElementType.polyline) {
            this.setStyle('none', 1, strokeWidth, stroke);
        }
        else {
            this.setStyle(fillColor);
        }
        var clickEvent = document.createEvent("CustomEvent");
        clickEvent.initCustomEvent(ElementBase.POLYGON_CLICK, true, true, {});
        this.gElement.parentNode.dispatchEvent(clickEvent);
    };
    ElementBase.prototype.polygonDblClickHandler = function (e) {
        this.editMode = !this.editMode;
        // console.log("dbl click handler - edit mode: "+this.editMode);
        if (this.editMode) {
            this.editModeOn();
        }
        else {
            this.editModeOff();
        }
    };
    ElementBase.prototype.mouseoverHandler = function (e) {
        if (!this.selected && !this.editMode && !this.layer.layerSelected) {
            this.setStyle('#F2FF4F', 1, 3);
        }
    };
    ElementBase.prototype.mouseoutHandler = function (e) {
        if (!this.selected && !this.editMode && !this.layer.layerSelected) {
            this.setStyle();
        }
    };
    ElementBase.prototype.deselect = function () {
        // console.log("element deselect");
        this.selected = false;
        this.setStyle();
        this.treeItem.body.style.backgroundColor = 'transparent';
    };
    ElementBase.prototype.editModeOn = function () {
        Utils.dispatchEditingStart({ data: this });
        this.setStyle('lightblue', 0.5, 1, '#73ffff');
        this._element.addEventListener(ControlPoint.CONTROL_POINT_MOVED, this._cpmoveHandler);
        this.displayControlPoints();
    };
    ElementBase.prototype.editModeOff = function () {
        Utils.dispatchEditingStop({ data: this });
        this.setStyle();
        this.hideControlPoints();
        this._element.removeEventListener(ControlPoint.CONTROL_POINT_MOVED, this._cpmoveHandler);
    };
    ElementBase.prototype.setStyle = function (fill, opacity, strokeWidth, strokeColor, setPermanent) {
        if (setPermanent === void 0) { setPermanent = false; }
        if (this.type != ElementType.polyline) {
            if (fill != undefined && fill != '') {
                this._element.style.fill = fill;
                if (setPermanent)
                    this._fill = fill;
            }
            else {
                this._element.style.fill = this._fill;
            }
        }
        else {
            this._element.style.fill = 'none';
        }
        if (opacity != undefined) {
            this._element.style.fillOpacity = String(opacity);
            if (setPermanent)
                this._opacity = opacity;
        }
        else {
            this._element.style.fillOpacity = String(this._opacity);
        }
        if (strokeWidth != undefined) {
            this._element.style.strokeWidth = strokeWidth + "px";
            if (setPermanent)
                this._strokeWidth = strokeWidth;
        }
        else {
            this._element.style.strokeWidth = this._strokeWidth + 'px';
        }
        if (strokeColor != undefined && strokeColor != '') {
            this._element.style.stroke = strokeColor;
            if (setPermanent)
                this._stroke = strokeColor;
        }
        else {
            this._element.style.stroke = this._stroke;
        }
    };
    ElementBase.prototype.controlPointMoved = function (e) {
    };
    ElementBase.prototype.displayControlPoints = function () {
        this._controlPointStore.showCPoints();
    };
    ElementBase.prototype.hideControlPoints = function () {
        this._controlPointStore.hideCPoints();
    };
    Object.defineProperty(ElementBase.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    ElementBase.prototype.setCoordinates = function (coords, finished) {
        if (finished === void 0) { finished = false; }
        this._vertexes = coords;
        if (finished) {
            this._controlPointStore.addPoints(this._vertexes, this._element);
        }
    };
    ElementBase.prototype.removeControlPoints = function () {
        this._controlPointStore.removePoints(ERemove.remove_selected);
        if ((this.type == ElementType.polyline && this._controlPointStore.elementsList.length < 2) || (this.type != ElementType.polyline && this._controlPointStore.elementsList.length < 3)) {
            Utils.dispatchEditingStop(this);
            LayerList.instance.removeElement(this.layer, this);
        }
        else {
            this._cpmoveHandler(null);
        }
    };
    ElementBase.POLYGON_CLICK = "polygonClick";
    return ElementBase;
})();
//# sourceMappingURL=ElementBase.js.map