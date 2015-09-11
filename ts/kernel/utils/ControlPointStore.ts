class ControlPointStore {

    private _gElement: SVGGElement;
    private _pointList: Array<ControlPoint> = [];
    
    constructor() {
        this._gElement = <SVGGElement>document.createElementNS("http://www.w3.org/2000/svg", "g");
        this._gElement.id = "cpstore";
        this.hideCPoints();
    }

    public addPoint(point: Point, relatedPolygon: SVGElement): void {
        var newPoint = new ControlPoint(point.x, point.y, relatedPolygon);
        this._gElement.appendChild(newPoint.point);
        this._pointList.push(newPoint);
    }
    
    public addPoints(points:Array<Point>, relatedPolygon: SVGElement):void{
        var self = this;
        points.forEach(p => {
            self.addPoint(p,relatedPolygon);
        });
    }

    public removePoints(selector: ERemove): void {
        var pointsToRemove: Array<ControlPoint> = [];
        var self = this;
        this._pointList.forEach(function (point: ControlPoint) {
            if (selector === ERemove.remove_selected) {
                if (point.selected) {
                    pointsToRemove.push(point);
                }
            } else if (selector === ERemove.remove_all) {
                pointsToRemove.push(point);
            } else {
                console.warn("Please select type of ControlPoints removal");
            }
        });
        
        while (pointsToRemove.length) {
            this.removePoint(pointsToRemove.pop());
        }
    }

    private removePoint(pointToRemove: ControlPoint): void {
        pointToRemove.point.parentNode.removeChild(pointToRemove.point);
        this._pointList.splice(this._pointList.indexOf(pointToRemove), 1);
    }

    public showCPoints(): void {
        this._gElement.style.visibility = "visible";
    }

    public hideCPoints(): void {
        this._gElement.style.visibility = "hidden";
        this.elementsList.forEach(function (cp: ControlPoint) {
            cp.selected = false;
            cp.styleDeselect();
        });
    }

    public get storeElement(): SVGGElement {
        return this._gElement;
    }

    public get elementsList(): Array<ControlPoint> {
        return this._pointList;
    }
}