var SVGStage = (function () {
    function SVGStage() {
        this._stageDblClickHandler = this.stageDblClickHandler.bind(this);
        this._stageMoveHandler = this.stageMouseMoveHandler.bind(this);
        this._init = false;
        this._childClasses = [];
        this.canClick = false;
        this._firstClick = true;
        this._tmpPoints = [];
        this._lastIdx = 0;
        if (SVGStage._instance) {
            throw new Error("Instance allready initialized. Use getInstance() instead.");
        }
        SVGStage._instance = this;
        this._mainSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._mainSvg.setAttribute("width", "100%");
        this._mainSvg.setAttribute("height", "100%");
        this._mainSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        //TODO why it does not create usable filter?
        // var defs:SVGDefsElement = <SVGDefsElement>document.createElementNS("http://www.w3.org/2000/svg", "defs");
        // var filter:Document = new DOMParser().parseFromString('<filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">'+
        //                                                         '<feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />'+
        //                                                         '<feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />'+
        //                                                         '<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />'+
        //                                                       '</filter>', 'image/svg+xml');
        // defs.appendChild(filter.documentElement);
        // this._mainSvg.appendChild(defs);
    }
    Object.defineProperty(SVGStage, "instance", {
        get: function () {
            return SVGStage._instance;
        },
        enumerable: true,
        configurable: true
    });
    SVGStage.prototype.initSVGStage = function (parent, editor) {
        if (!this._init) {
            parent.appendChild(this._mainSvg);
            this._editor = editor;
            this._mainSvg.setAttribute("viewBox", "0 0 " + parent.clientWidth + " " + parent.clientHeight);
            this._mainSvg.addEventListener("click", this.stageClickHandler.bind(this));
            this._mainSvg.addEventListener(SVGStage.EDITING_START, this.editStartHandler.bind(this));
            this._mainSvg.addEventListener(SVGStage.EDITING_STOP, this.editStopHandler.bind(this));
            this._mainSvg.addEventListener(SVGStage.CREATING_START, this.createNewStartHandler.bind(this));
            this._mainSvg.addEventListener(SVGStage.CREATING_END, this.createNewStopHandler.bind(this));
            this._init = true;
        }
    };
    SVGStage.prototype.appedToSVGStage = function (element) {
        this._mainSvg.appendChild(element);
    };
    SVGStage.prototype.removeFromStage = function (element) {
        this._mainSvg.removeChild(element);
    };
    SVGStage.prototype.addChildClass = function (classToAdd) {
        this._childClasses.push(classToAdd);
    };
    SVGStage.prototype.removeChildClass = function (classToremove) {
        this._childClasses.splice(this._childClasses.indexOf(classToremove), 1);
    };
    Object.defineProperty(SVGStage.prototype, "mainStage", {
        get: function () {
            return this._mainSvg;
        },
        enumerable: true,
        configurable: true
    });
    SVGStage.prototype.stageMouseMoveHandler = function (e) {
        if (this._tmpPoints.length > this._lastIdx) {
            this._tmpPoints.pop();
        }
        this._tmpPoints.push(this.getPoint(e));
        this._editor.tmpShape.setCoordinates(this._tmpPoints);
    };
    SVGStage.prototype.stageClickHandler = function (e) {
        if (this.canClick) {
            var point = this.getPoint(e);
            this._tmpPoints.push(point);
            this._lastIdx++;
            if (this._firstClick) {
                this._firstClick = false;
                this._mainSvg.addEventListener('mousemove', this._stageMoveHandler);
            }
        }
    };
    SVGStage.prototype.stageDblClickHandler = function (e) {
        Utils.dispatchCreatingEnd();
    };
    SVGStage.prototype.getPoint = function (e) {
        var x;
        var y;
        if (Utils.detectFirefox()) {
            x = e.layerX;
            y = e.layerY;
        }
        else {
            x = e.offsetX;
            y = e.offsetY;
        }
        return new Point(x, y);
    };
    SVGStage.prototype.editStartHandler = function (e) {
        this._editor.disableAllBtn();
        this._editor.enableEditBtn();
        this.editedShape = e.detail.data;
        this._childClasses.forEach(function (cl) {
            cl.disable();
        });
    };
    SVGStage.prototype.editStopHandler = function (e) {
        // console.log("edit stop");
        this._editor.enableAllBtn();
        this._editor.disableEditBtn();
        this.editedShape = undefined;
        this._childClasses.forEach(function (cl) {
            cl.enable();
        });
    };
    SVGStage.prototype.createNewStartHandler = function (e) {
        this.canClick = true;
        this._mainSvg.addEventListener("dblclick", this._stageDblClickHandler);
        this.editStartHandler(e);
        this._editor.disableEditBtn();
    };
    SVGStage.prototype.createNewStopHandler = function (e) {
        // console.log("create new end");
        this._mainSvg.removeEventListener('mousemove', this._stageMoveHandler);
        this._editor.finishActual(this._tmpPoints.slice(0, -2));
        this.removeDblClickHandler();
        this.editStopHandler(e);
    };
    SVGStage.prototype.removeDblClickHandler = function () {
        this.canClick = false;
        this._firstClick = true;
        this._tmpPoints = [];
        this._lastIdx = 0;
        this._mainSvg.removeEventListener("dblclick", this._stageDblClickHandler);
    };
    SVGStage.EDITING_START = "editStart";
    SVGStage.EDITING_STOP = "editStop";
    SVGStage.CREATING_START = "createStart";
    SVGStage.CREATING_END = "createEnd";
    SVGStage._instance = new SVGStage();
    return SVGStage;
})();
//# sourceMappingURL=SVGStage.js.map