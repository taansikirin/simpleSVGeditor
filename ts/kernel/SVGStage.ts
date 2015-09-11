class SVGStage {
    
    public static EDITING_START: string = "editStart";
    public static EDITING_STOP: string = "editStop";
    public static CREATING_START: string = "createStart";
    public static CREATING_END: string = "createEnd";
    
    private static _instance: SVGStage = new SVGStage();
    private _stageDblClickHandler:any = this.stageDblClickHandler.bind(this);
    private _stageMoveHandler:any = this.stageMouseMoveHandler.bind(this);
    private _mainSvg: SVGSVGElement;
    private _init: boolean = false;
    private _childClasses: Array<Layer> = [];
    private _editor:SVGEditor;
    public canClick:boolean = false;
    private _firstClick:boolean = true;
    private _tmpPoints:Array<Point> = [];
    private _lastIdx:number = 0;
    public editedShape:ElementBase;
        
    constructor() {
        if (SVGStage._instance) {
            throw new Error("Instance allready initialized. Use getInstance() instead.");
        }
        SVGStage._instance = this;

        this._mainSvg = <SVGSVGElement>document.createElementNS("http://www.w3.org/2000/svg", "svg");
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

    public static get instance(): SVGStage {
        return SVGStage._instance;
    }

    public initSVGStage(parent: HTMLElement, editor:SVGEditor): void {
        if (!this._init) {
            parent.appendChild(this._mainSvg);
            this._editor = editor;
            this._mainSvg.setAttribute("viewBox", "0 0 "+parent.clientWidth+" "+parent.clientHeight);
            this._mainSvg.addEventListener("click", this.stageClickHandler.bind(this));
            this._mainSvg.addEventListener(SVGStage.EDITING_START, this.editStartHandler.bind(this));
            this._mainSvg.addEventListener(SVGStage.EDITING_STOP, this.editStopHandler.bind(this));
            this._mainSvg.addEventListener(SVGStage.CREATING_START, this.createNewStartHandler.bind(this));
            this._mainSvg.addEventListener(SVGStage.CREATING_END, this.createNewStopHandler.bind(this));
            this._init = true;
        }
    }

    public appedToSVGStage(element: SVGElement): void {
        this._mainSvg.appendChild(element);
    }
    
    public removeFromStage(element:SVGElement):void{
        this._mainSvg.removeChild(element);
    }

    public addChildClass(classToAdd: Layer): void {
        this._childClasses.push(classToAdd);
    }

    public removeChildClass(classToremove: Layer): void {
        this._childClasses.splice(this._childClasses.indexOf(classToremove), 1);
    }

    public get mainStage(): SVGSVGElement {
        return this._mainSvg;
    }
    
    private stageMouseMoveHandler(e:MouseEvent):void{
        if(this._tmpPoints.length > this._lastIdx){
            this._tmpPoints.pop();
        }
        this._tmpPoints.push(this.getPoint(e));
        this._editor.tmpShape.setCoordinates(this._tmpPoints);
    }
    
    private stageClickHandler(e: MouseEvent): void {
        if(this.canClick){
            var point:Point = this.getPoint(e);
            this._tmpPoints.push(point);
            this._lastIdx++;
            if(this._firstClick){
                this._firstClick = false;
                this._mainSvg.addEventListener('mousemove',this._stageMoveHandler);
            }
        }
    }
    
    private stageDblClickHandler(e:MouseEvent):void {
        Utils.dispatchCreatingEnd();
    }
    
    private getPoint(e:MouseEvent):Point{
        var x: number;
        var y: number;
        
        if(Utils.detectFirefox()){
            x = e.layerX;
            y = e.layerY;
        }else{
            x = e.offsetX;
            y = e.offsetY;
        }
        
        return new Point(x,y);        
    }

    private editStartHandler(e: CustomEvent): void {
        this._editor.disableAllBtn();
        this._editor.enableEditBtn();
        this.editedShape = e.detail.data;
        this._childClasses.forEach(function (cl: Layer) {
            cl.disable();
        });
    }

    private editStopHandler(e: CustomEvent): void {
        // console.log("edit stop");
        this._editor.enableAllBtn();
        this._editor.disableEditBtn();
        this.editedShape = undefined;
        this._childClasses.forEach(function (cl: Layer) {
            cl.enable();
        });
    }
    
    private createNewStartHandler(e: CustomEvent): void{
        this.canClick = true;
        this._mainSvg.addEventListener("dblclick", this._stageDblClickHandler);
        this.editStartHandler(e);
        this._editor.disableEditBtn();
    }
    
    private createNewStopHandler(e:CustomEvent): void{
        // console.log("create new end");
        this._mainSvg.removeEventListener('mousemove', this._stageMoveHandler);
        this._editor.finishActual(this._tmpPoints.slice(0,-2));
        this.removeDblClickHandler();
        this.editStopHandler(e);
    }
    
    public removeDblClickHandler():void{
        this.canClick = false;
        this._firstClick = true;
        this._tmpPoints = [];
        this._lastIdx = 0;
        this._mainSvg.removeEventListener("dblclick", this._stageDblClickHandler);
    }
} 