var ERemove;
(function (ERemove) {
    ERemove[ERemove["remove_all"] = 0] = "remove_all";
    ERemove[ERemove["remove_selected"] = 1] = "remove_selected";
})(ERemove || (ERemove = {}));
var Utils = (function () {
    function Utils() {
    }
    Utils.detectFirefox = function () {
        if (window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    Utils.convertPointListToString = function (points) {
        var pointString = "";
        points.forEach(function (point) {
            pointString += point.x + "," + point.y + " ";
        });
        pointString = pointString.trim();
        return pointString;
    };
    Utils.dispatchEditingStop = function (details) {
        if (details === void 0) { details = null; }
        var createNewEnd = document.createEvent('CustomEvent');
        createNewEnd.initCustomEvent(SVGStage.EDITING_STOP, true, true, details);
        SVGStage.instance.mainStage.dispatchEvent(createNewEnd);
    };
    Utils.dispatchEditingStart = function (details) {
        if (details === void 0) { details = null; }
        var createNewStart = document.createEvent('CustomEvent');
        createNewStart.initCustomEvent(SVGStage.EDITING_START, true, true, details);
        SVGStage.instance.mainStage.dispatchEvent(createNewStart);
    };
    Utils.dispatchCreatingEnd = function (details) {
        if (details === void 0) { details = null; }
        var createNewEnd = document.createEvent('CustomEvent');
        createNewEnd.initCustomEvent(SVGStage.CREATING_END, true, true, details);
        SVGStage.instance.mainStage.dispatchEvent(createNewEnd);
    };
    Utils.dispatchCreatingStart = function (details) {
        if (details === void 0) { details = null; }
        var createNewStart = document.createEvent('CustomEvent');
        createNewStart.initCustomEvent(SVGStage.CREATING_START, true, true, details);
        SVGStage.instance.mainStage.dispatchEvent(createNewStart);
    };
    return Utils;
})();
//# sourceMappingURL=utils.js.map