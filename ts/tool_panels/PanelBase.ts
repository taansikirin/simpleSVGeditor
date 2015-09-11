enum EPanelOrientation{
    HORIZONTAL,
    VERTICAL
}

class PanelBase{
    public btnContainer:HTMLElement;
    protected _allComponent:Array<ComponentBase> = [];
    
    constructor(protected _editor:SVGEditor){
        this.btnContainer = document.createElement("div");
        this.btnContainer.style.cssFloat = "left";
        this.createBtns();
    }
    
    public createBtns():void{}
    protected appendComponent(component:ComponentBase):ComponentBase{
        this.btnContainer.appendChild(component.component);
        this._allComponent.push(component);
        return component;
    }
    public dockTo(dock:HTMLElement, orientation:EPanelOrientation = EPanelOrientation.VERTICAL):void{
        if(orientation == EPanelOrientation.VERTICAL) this.btnContainer.style.paddingTop = "5px";
        else if(orientation == EPanelOrientation.HORIZONTAL) this.btnContainer.style.paddingLeft = "5px";
        dock.appendChild(this.btnContainer);
    }
    public enable():void{
        this._allComponent.forEach(comp => { comp.enable(); });
    }
    public disable():void{
        this._allComponent.forEach(comp => { comp.disable(); });
    }
}