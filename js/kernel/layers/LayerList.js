var LayerList = (function () {
    function LayerList() {
        this._list = {};
        if (LayerList._instance) {
            throw Error("LayerList instance already exists. Use getter instance to get LayerList intance.");
        }
        LayerList._instance = this;
    }
    Object.defineProperty(LayerList, "instance", {
        get: function () {
            return LayerList._instance;
        },
        enumerable: true,
        configurable: true
    });
    LayerList.prototype.init = function (svgParser) {
        this._svgParser = svgParser;
        this._listElementBody = document.getElementById("layerListBody");
        this._listElementBody.addEventListener(Layer.DESELECT, this.deselectAllLayers.bind(this));
        var listHead = document.getElementById("layerListHead");
        this._addBtn = new Button(this.addLayer.bind(this), "Add new layer", BtnType.layer_btn, "Add new layer");
        listHead.appendChild(this._addBtn.component);
        this.addLayer();
    };
    LayerList.prototype.addLayer = function () {
        var strId = "layer" + (LayerList._c++);
        this._list[strId] = new Layer(strId);
        this.actualLayer = this.getLayer(strId);
        SVGStage.instance.appedToSVGStage(this.actualLayer.layerElement);
        this.showSVGcode();
    };
    LayerList.prototype.getLayer = function (id) {
        return this._list[id];
    };
    LayerList.prototype.removeLayer = function (id) {
        // console.log("remove layer");
        if (Object.keys(this._list).length > 1) {
            var layerToRemove = this.getLayer(id);
            layerToRemove.onLayerRemove();
            layerToRemove.layerElement.parentElement.removeChild(layerToRemove.layerElement);
            SVGStage.instance.removeChildClass(layerToRemove);
            delete this._list[id];
        }
        else {
            var lastLayer = this.getLayer(id);
            this.actualLayer = lastLayer;
            var toRem = [];
            lastLayer.elementsList.forEach(function (el) {
                toRem.push(el);
            });
            var self = this;
            toRem.forEach(function (remEl) {
                self.removeElement(lastLayer, remEl, false);
            });
        }
        this.showSVGcode();
    };
    LayerList.prototype.addLayerItem = function (item) {
        this._listElementBody.appendChild(item.body);
    };
    LayerList.prototype.deselectAllLayers = function (e) {
        for (var layerId in this._list) {
            if (layerId != e.detail)
                this.getLayer(layerId).deselect();
        }
    };
    LayerList.prototype.removeElements = function (selector) {
        var _this = this;
        // console.log("remove elements "+selector);
        for (var key in this._list) {
            var layer = this._list[key];
            var toRem = [];
            layer.elementsList.forEach(function (el) {
                if (selector === ERemove.remove_selected) {
                    if (el.selected) {
                        toRem.push(el);
                    }
                }
                else if (selector === ERemove.remove_all) {
                    _this.removeLayer(layer.id); //pokud chceme smazat uplne vse, muzeme mazat rovnou vrstvy (reference na elementy vrstvy by meli byt pouze v mazane vrstve - overit pres profilovani?).
                }
                else {
                    console.warn("Please select type of Polygon removal");
                }
            });
            if (toRem.length) {
                var self = this;
                toRem.forEach(function (el) {
                    self.removeElement(layer, el);
                });
                toRem = [];
            }
        }
    };
    LayerList.prototype.removeElement = function (parentLayer, elementToRemove, callRemoveLayer) {
        if (callRemoveLayer === void 0) { callRemoveLayer = true; }
        parentLayer.layerItem.removeTreeItem(elementToRemove.treeItem);
        parentLayer.removeElement(elementToRemove, callRemoveLayer);
        this.showSVGcode();
    };
    //TODO zvazit, zda misto tohoto neaktualizovat pole vybranych elementu na stagi pri vyberu elemnetu
    LayerList.prototype.getSelectedElements = function () {
        var selectedElements = [];
        for (var key in this._list) {
            var layer = this._list[key];
            layer.elementsList.forEach(function (el) {
                if (el.selected)
                    selectedElements.push(el);
            });
        }
        return selectedElements;
    };
    LayerList.prototype.showSVGcode = function () {
        if (this._svgParser.popup.open)
            this._svgParser.showCode(SVGStage.instance.mainStage.cloneNode(true), 'cpstore');
    };
    LayerList._instance = new LayerList();
    LayerList._c = 0;
    return LayerList;
})();
//# sourceMappingURL=LayerList.js.map