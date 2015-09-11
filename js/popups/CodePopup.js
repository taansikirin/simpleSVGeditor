var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PopUpCode = (function (_super) {
    __extends(PopUpCode, _super);
    function PopUpCode(titleText, initWidth, initHeight, top, left) {
        if (titleText === void 0) { titleText = ''; }
        if (initWidth === void 0) { initWidth = 800; }
        if (initHeight === void 0) { initHeight = 400; }
        if (top === void 0) { top = 150; }
        if (left === void 0) { left = 100; }
        _super.call(this, titleText, initWidth, initHeight, top, left);
        this._codeSheet = document.createElement("textarea");
        this._codeSheet.id = "codeSheet";
        this._codeSheet.className = "popup-text-area";
        this._content.appendChild(this._codeSheet);
    }
    PopUpCode.prototype.showPopUp = function (content) {
        _super.prototype.showPopUp.call(this);
        if (!this.open) {
            this._codeSheet.value = content;
        }
        else {
            this._codeSheet.value = content;
        }
    };
    return PopUpCode;
})(PopUpBase);
//# sourceMappingURL=CodePopup.js.map