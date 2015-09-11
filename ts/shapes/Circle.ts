class Circle extends ElementBase {
	
	private _circle: SVGCircleElement;
	
	constructor(id?:string){
		super();
		// console.log("new circle");
		this._circle = <SVGCircleElement>document.createElementNS("http://www.w3.org/2000/svg","circle");
		if(id != undefined){
            this._circle.id = id;
        }
		this._element = this._circle;
		this.type = ElementType.circle;
		
		this.setStyle('lightblue', 0.5, 1, '#73ffff');
	}
	
	public controlPointMoved(e: CustomEvent): void {
		this._vertexes = [];
		this._vertexes = this._controlPointStore.elementsList;
        
		var origX:number = parseInt(this._circle.getAttribute("cx"));
		var origY:number = parseInt(this._circle.getAttribute("cy"));
		var dx:number = this._vertexes[0].x - origX;
		var dy:number = this._vertexes[0].y - origY;
		
		if(dx != 0 || dy != 0){
			this.setPosition();
			var secondCP:ControlPoint = this._controlPointStore.elementsList[1];
			secondCP.setx = secondCP.x + dx;
			secondCP.sety = secondCP.y + dy;
		}else{
			this.setRadius();
		}
    }
	
	private setPosition():void{
		this.x = this._vertexes[0].x;
		this.y = this._vertexes[0].y;
	}
	
	private setRadius(radiusPoint?:Point):void{
		var second:Point;
		if(radiusPoint){
			second = radiusPoint;
		}else{
			second = this._vertexes[1];
		}
		var dx:number = this._vertexes[0].x-second.x;
		var dy:number = this._vertexes[0].y-second.y;
		var dx2:number = Math.pow(dx,2);
		var dy2:number = Math.pow(dy,2);
		this.r = Math.sqrt(dx2+dy2);	
	}
	
	private set x(value:number){
		this._circle.setAttribute("cx", String(value));
	}
	
	private set y(value:number){
		this._circle.setAttribute("cy", String(value));
	}
	
	private set r(value:number){
		this._circle.setAttribute("r", String(value));
	}
	
	public setCoordinates(coords:Array<Point>, finished:boolean = false):void{
		super.setCoordinates(coords.slice(0,2), finished);
		this.setPosition();
		this.setRadius();
    }
}