class PopUpBase{
    
    public static POPUP_CLOSE:string = "popupClose";
    public static POPUP_SAVE:string = "popupSave";
    
    public popup:HTMLElement;
    protected _dragger:HTMLElement;
    protected _title:HTMLElement;
    protected _resizer:HTMLElement;
    protected _resizerFase:HTMLElement;
    protected _content:HTMLElement;
    protected _headHeight:number = 40;
    
    private _dragstart:any = this.dragstart.bind(this);
    private _dragmove:any = this.dragmove.bind(this);
    private _dragend:any = this.dragend.bind(this);
    private _resizestart:any = this.resizestart.bind(this);
    private _resizeend:any = this.resizeend.bind(this);
    private _resizeHandler:any = this.resizeHandler.bind(this);
    protected _diff:Array<number> = [];
    public open:boolean = false;
    
    constructor(private _titleText:string, protected _initWidth:number, protected _initHeight:number, private _top:number, private _left){
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
        
        var close:HTMLElement = document.createElement("div");
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
    
    public showPopUp(content?:any){
        if(!this.open){
            document.body.appendChild(this.popup);
            this.enable();
            this.open = true;
        }
    }
    
    private dragstart(e:MouseEvent):void{
        this._diff = [e.pageX - this.popup.offsetLeft, e.pageY - this.popup.offsetTop];
        this._dragger.addEventListener("mousemove", this._dragmove);
        this.popup.appendChild(this._dragger);
        document.body.style.cursor = "move";
    }
    
    private dragmove(e:MouseEvent):void{
        this.popup.style.left = (e.pageX - this._diff[0]) + "px";
        this.popup.style.top = (e.pageY - this._diff[1]) + "px";
    }
    
    private dragend(e:MouseEvent):void{
        this._dragger.removeEventListener("mousemove", this._dragmove);
        this.popup.removeChild(this._dragger);
        document.body.style.removeProperty("cursor");
    }
    
    private resizestart(e:MouseEvent):void{
        this._diff = [(this.popup.offsetLeft + this.popup.clientWidth) - e.pageX, (this.popup.offsetTop + this.popup.clientHeight) - e.pageY];
        this._resizer.addEventListener("mousemove", this._resizeHandler)
        this.popup.appendChild(this._resizer);
        document.body.style.cursor = "se-resize";
    }
    
    protected resizeHandler(e:MouseEvent):void{
        this.popup.style.width = (e.pageX + this._diff[0] - this.popup.offsetLeft) + "px";
        this.popup.style.height = (e.pageY + this._diff[1] - this.popup.offsetTop) + "px";
        this._content.style.height = (e.pageY + this._diff[1] - this.popup.offsetTop - this._headHeight) + "px";
    }
    
    private resizeend(e:MouseEvent):void{
        this._resizer.removeEventListener("mousemove", this._resizeHandler);
        this.popup.removeChild(this._resizer);
        document.body.style.removeProperty("cursor");
    }
    
    protected addHorizontalContainer(label:string, component:ComponentBase):ComponentBase{
        var container:HorizontalContainer = new HorizontalContainer(label, component);
        this._content.appendChild(container.component);
        return component;
    }
    
    private enable(){
        this._dragger.addEventListener("mouseup", this._dragend);
        this._title.addEventListener("mousedown", this._dragstart);
        this._title.addEventListener("mouseup", this._dragend);
        this._resizer.addEventListener("mouseup", this._resizeend);
        this._resizerFase.addEventListener("mousedown", this._resizestart);
        this._resizerFase.addEventListener("mouseup", this._resizestart);
    }
    private disable(){
        this._dragger.removeEventListener("mouseup", this._dragend);
        this._title.removeEventListener("mousedown", this._dragstart);
        this._title.removeEventListener("mouseup", this._dragend);
        this._resizer.removeEventListener("mouseup", this._resizeend);
        this._resizerFase.removeEventListener("mousedown", this._resizestart);
        this._resizerFase.removeEventListener("mouseup", this._resizestart);
    }
    
    protected close():void{
        this.open = false;
        this.disable();
        
        var popupCloseEvent:CustomEvent = <CustomEvent>document.createEvent('CustomEvent');
        popupCloseEvent.initCustomEvent(PopUpBase.POPUP_CLOSE, true, false, null);
        this.popup.dispatchEvent(popupCloseEvent);
        
        this.popup.parentElement.removeChild(this.popup);
    }
    
    protected save(data:any, close:boolean = true):void{
        var popupSaveEvent:CustomEvent = <CustomEvent>document.createEvent('CustomEvent');
        popupSaveEvent.initCustomEvent(PopUpBase.POPUP_SAVE, true, false, data);
        this.popup.dispatchEvent(popupSaveEvent);
        
        if(close) this.close();
    }
}