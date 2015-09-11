var PopUpBase = (function () {
    function PopUpBase(_titleText, _initWidth, _initHeight, _top, _left) {
        this._titleText = _titleText;
        this._initWidth = _initWidth;
        this._initHeight = _initHeight;
        this._top = _top;
        this._left = _left;
        this._headHeight = 40;
        this._dragstart = this.dragstart.bind(this);
        this._dragmove = this.dragmove.bind(this);
        this._dragend = this.dragend.bind(this);
        this._resizestart = this.resizestart.bind(this);
        this._resizeend = this.resizeend.bind(this);
        this._resizeHandler = this.resizeHandler.bind(this);
        this._diff = [];
        this.open = false;
        this.popup = document.createElement("div");
        this.popup.id = "popup";
        this.popup.className = "popup";
        this.popup.style.left = this._left + "px";
        this.popup.style.top = this._top + "px";
        this.popup.style.width = this._initWidth + "px";
        this.popup.style.height = this._initHeight + "px";
        this._dragger = document.createElement("div");
        this._dragger.className = 'popup-dragger';
        this._title = document.createElement("div");
        this._title.className = 'popup-title';
        this._title.innerHTML = this._titleText;
        this.popup.appendChild(this._title);
        var close = document.createElement("div");
        close.className = "popup-close";
        close.onclick = this.close.bind(this);
        this.popup.appendChild(close);
        this._resizer = document.createElement("div");
        this._resizer.className = 'popup-resizer';
        this._resizerFase = document.createElement("div");
        this._resizerFase.className = 'popup-resizer-face';
        this.popup.appendChild(this._resizerFase);
        this._content = document.createElement("div");
        this._content.className = "popup-content";
        this._content.style.height = (this._initHeight - this._headHeight) + "px";
        this.popup.appendChild(this._content);
    }
    PopUpBase.prototype.showPopUp = function (content) {
        if (!this.open) {
            document.body.appendChild(this.popup);
            this.enable();
            this.open = true;
        }
    };
    PopUpBase.prototype.dragstart = function (e) {
        this._diff = [e.pageX - this.popup.offsetLeft, e.pageY - this.popup.offsetTop];
        this._dragger.addEventListener("mousemove", this._dragmove);
        this.popup.appendChild(this._dragger);
        document.body.style.cursor = "move";
    };
    PopUpBase.prototype.dragmove = function (e) {
        this.popup.style.left = (e.pageX - this._diff[0]) + "px";
        this.popup.style.top = (e.pageY - this._diff[1]) + "px";
    };
    PopUpBase.prototype.dragend = function (e) {
        this._dragger.removeEventListener("mousemove", this._dragmove);
        this.popup.removeChild(this._dragger);
        document.body.style.removeProperty("cursor");
    };
    PopUpBase.prototype.resizestart = function (e) {
        this._diff = [(this.popup.offsetLeft + this.popup.clientWidth) - e.pageX, (this.popup.offsetTop + this.popup.clientHeight) - e.pageY];
        this._resizer.addEventListener("mousemove", this._resizeHandler);
        this.popup.appendChild(this._resizer);
        document.body.style.cursor = "se-resize";
    };
    PopUpBase.prototype.resizeHandler = function (e) {
        this.popup.style.width = (e.pageX + this._diff[0] - this.popup.offsetLeft) + "px";
        this.popup.style.height = (e.pageY + this._diff[1] - this.popup.offsetTop) + "px";
        this._content.style.height = (e.pageY + this._diff[1] - this.popup.offsetTop - this._headHeight) + "px";
    };
    PopUpBase.prototype.resizeend = function (e) {
        this._resizer.removeEventListener("mousemove", this._resizeHandler);
        this.popup.removeChild(this._resizer);
        document.body.style.removeProperty("cursor");
    };
    PopUpBase.prototype.addHorizontalContainer = function (label, component) {
        var container = new HorizontalContainer(label, component);
        this._content.appendChild(container.component);
        return component;
    };
    PopUpBase.prototype.enable = function () {
        this._dragger.addEventListener("mouseup", this._dragend);
        this._title.addEventListener("mousedown", this._dragstart);
        this._title.addEventListener("mouseup", this._dragend);
        this._resizer.addEventListener("mouseup", this._resizeend);
        this._resizerFase.addEventListener("mousedown", this._resizestart);
        this._resizerFase.addEventListener("mouseup", this._resizestart);
    };
    PopUpBase.prototype.disable = function () {
        this._dragger.removeEventListener("mouseup", this._dragend);
        this._title.removeEventListener("mousedown", this._dragstart);
        this._title.removeEventListener("mouseup", this._dragend);
        this._resizer.removeEventListener("mouseup", this._resizeend);
        this._resizerFase.removeEventListener("mousedown", this._resizestart);
        this._resizerFase.removeEventListener("mouseup", this._resizestart);
    };
    PopUpBase.prototype.close = function () {
        this.open = false;
        this.disable();
        var popupCloseEvent = document.createEvent('CustomEvent');
        popupCloseEvent.initCustomEvent(PopUpBase.POPUP_CLOSE, true, false, null);
        this.popup.dispatchEvent(popupCloseEvent);
        this.popup.parentElement.removeChild(this.popup);
    };
    PopUpBase.prototype.save = function (data, close) {
        if (close === void 0) { close = true; }
        var popupSaveEvent = document.createEvent('CustomEvent');
        popupSaveEvent.initCustomEvent(PopUpBase.POPUP_SAVE, true, false, data);
        this.popup.dispatchEvent(popupSaveEvent);
        if (close)
            this.close();
    };
    PopUpBase.POPUP_CLOSE = "popupClose";
    PopUpBase.POPUP_SAVE = "popupSave";
    return PopUpBase;
})();
//# sourceMappingURL=PopupBase.js.map