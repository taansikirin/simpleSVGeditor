class Point {
    constructor(public x: number, public y: number) {
    }
}

class ControlPoint extends Point {
    public static CONTROL_POINT_MOVED: string = "controlPointMoved";

    public selected: boolean = false;
    private _point: SVGCircleElement;
    private _pointSize: number = 20;
    private _moveHander: any = this.mouseMoveHandler.bind(this);
    private _upHander: any = this.mouseUpHandler.bind(this);
    private _xorig: number;
    private _yorig: number;

    constructor(x: number, y: number, private _relatedPolygon: SVGElement) {
        super(x,y);
        this._point = <SVGCircleElement>document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.setx = x;
        this.sety = y;
        this._xorig = this.x;
        this._yorig = this.y;
        this._point.setAttribute("r", String(this._pointSize / 5));
        this.setStyle();
        this._point.style.cursor = "pointer";
        
        this._point.addEventListener("mouseover", this.mouseOverHandler.bind(this));
        this._point.addEventListener("mouseout", this.mouseOutHandler.bind(this));
        this._point.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        this._point.addEventListener("dblclick", this.dblHandler.bind(this));
    }

    public get point(): SVGCircleElement {
        return this._point;
    }

    private mouseOverHandler(e: MouseEvent): void {
        this.styleSelect();
    }

    private mouseOutHandler(e: MouseEvent): void {
        if (!this.selected) {
            this.styleDeselect();
        }
    }

    private dblHandler(e: MouseEvent): void {
        //console.log("dbl click");
        this.selected = !this.selected;
        if (this.selected) {
            this.styleSelect();
        } else {
            this.styleDeselect();
        }
    }

    private mouseDownHandler(e: MouseEvent): void {
        //console.log("mouse down");
        this._point.addEventListener("mouseup", this._upHander);
        this._point.addEventListener("mousemove", this._moveHander);
        SVGStage.instance.mainStage.addEventListener("mouseup", this._upHander);
        SVGStage.instance.mainStage.addEventListener("mousemove", this._moveHander);
    }

    private mouseUpHandler(e: MouseEvent): void {
        //console.log("mouse up");
        this._point.removeEventListener("mouseup", this._upHander);
        this._point.removeEventListener("mousemove", this._moveHander);
        SVGStage.instance.mainStage.removeEventListener("mouseup", this._upHander);
        SVGStage.instance.mainStage.removeEventListener("mousemove", this._moveHander);
        this._xorig = this.x;
        this._yorig = this.y;
    }

    private mouseMoveHandler(e: MouseEvent): void {
        this.setStyle('red', 3, 0.5);
        // console.log("mouse move x: " + e.offsetX + ", y: " + e.offsetY);
        if (Math.abs(this._xorig - e.offsetX) > 5 || Math.abs(this._yorig - e.offsetY) > 5) {
            if(Utils.detectFirefox()){
                this.setx = e.layerX;
                this.sety = e.layerY;
            } else {
                this.setx = e.offsetX;
                this.sety = e.offsetY;
            }

            var moveEvent: CustomEvent = <CustomEvent>document.createEvent('CustomEvent');
            moveEvent.initCustomEvent(ControlPoint.CONTROL_POINT_MOVED, true, true, { x: this.x, y: this.y });
            this._relatedPolygon.dispatchEvent(moveEvent);
        } else {
            this.x = this._xorig;
            this.y = this._yorig;
        }
    }
    
    private setStyle(fill:string = 'yellow', strokeWidth:number = 1, fillOpacity:number = 1, strokeColor:string = 'black'):void{
        this._point.style.fill = fill;
        this._point.style.fillOpacity = String(fillOpacity);
        this._point.style.strokeWidth = strokeWidth + 'px';
        this._point.style.stroke = strokeColor;
    }

    public styleSelect(): void {
        this.setStyle('red', 3);
        this._point.setAttribute('r', String(this._pointSize / 5 * 2));
    }

    public styleDeselect(): void {
        this.setStyle();
        this._point.setAttribute('r', String(this._pointSize / 5));
    }

    public set setx(value: number) {
        this.x = value;
        this._point.setAttribute("cx", this.x + "px");
    }

    public set sety(value: number) {
        this.y = value;
        this._point.setAttribute("cy", this.y + "px");
    }
} 