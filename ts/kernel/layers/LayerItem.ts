class LayerItem {
    
    public body:HTMLElement;
    private _itemName:HTMLElement;
    private _remBtn:Button;
    private _visibilityBtn:Button;
    private _treeBtn:Button;
    private _treeItemsContainer:HTMLElement;
    
    public selected:boolean;
    private _treeList: Array<LayerTreeItem> = [];
    private _expanded:boolean = true;
    private _layerVisible:boolean = true;
    
    constructor(private _layer:Layer){
        this.body = document.createElement("div");
        this.body.style.cssText = "width:100%;float:left;background-color:rgba(160,160,160,0.35);";
        
        this._itemName = document.createElement("div");
        this._itemName.style.cssText = "width:95%;height:30px;line-height:30px;font-size:16px;font-weight:bold;position:relative;padding-left:5%;";
        this._itemName.innerHTML = this._layer.id;
        this._itemName.addEventListener("click", this.layerItemClickHandler.bind(this));
        this.body.appendChild(this._itemName);
        
        this._treeBtn = new Button(this.expandTree.bind(this),"Expand/collapse elements tree", BtnType.layer_item, "", "css/assets/collaps.png");
        this._treeBtn.component.style.marginLeft = "20px";
        this.body.appendChild(this._treeBtn.component);
        
        this._visibilityBtn = new Button(this.toggleVisible.bind(this),"Toggle visibility", BtnType.layer_item, "", "css/assets/visible.png");
        this.body.appendChild(this._visibilityBtn.component);
        
        this._remBtn = new Button(this.removeLayer.bind(this),"Remove layer", BtnType.layer_item, "", "css/assets/remove.png");
        this.body.appendChild(this._remBtn.component);
        
        this._treeItemsContainer = document.createElement("div");
        this._treeItemsContainer.className = "tree-item-container"; 
        this.body.appendChild(this._treeItemsContainer);
        
        LayerList.instance.addLayerItem(this);
        this.dispatchDeselectLayers(this._layer.id);
    }
    
    private layerItemClickHandler():void{
        this.dispatchDeselectLayers(this._layer.id);
        // console.log("click layer item");
        this._layer.layerSelectHandler();
        var bgColor:string;
        if(this._layer.layerSelected){
            bgColor = 'rgba(160,160,160,0.35)';
        }else{
            bgColor = "transparent";
            this._layer.elementsList.forEach(el => { el.treeItem.body.style.backgroundColor = bgColor; }); //odvybere vsechny tree items ve vrstve
        }
        this.body.style.backgroundColor = bgColor;
    }
    
    private removeLayer():void{
        LayerList.instance.removeLayer(this._layer.id);
    }
    
    private toggleVisible():void{
        this._layerVisible = !this._layerVisible;
        if(this._layerVisible){
            this._layer.show();
            this._visibilityBtn.component.style.backgroundImage = "url(css/assets/visible.png)";
        }else{
            this._layer.hide();
            this._visibilityBtn.component.style.backgroundImage = "url(css/assets/invisible.png)";
        }
    }
    
    private expandTree():void{
        this._expanded = !this._expanded;
        if(this._expanded){
            this._treeBtn.component.style.backgroundImage = "url(css/assets/collaps.png)";
            this._treeItemsContainer.classList.remove("tree-item-container-collapsed");
        }else{
            this._treeBtn.component.style.backgroundImage = "url(css/assets/expand.png)";
            this._treeItemsContainer.classList.add("tree-item-container-collapsed");
        }
    }
    
    public addTreeItem(element:ElementBase): LayerTreeItem {
        var newTreeItem:LayerTreeItem = new LayerTreeItem(this._layer,element); 
        this._treeList.push(newTreeItem);
        this._treeItemsContainer.appendChild(newTreeItem.body);
        return newTreeItem;
    }
    
    public removeTreeItem(item:LayerTreeItem):void{
        // console.log("remove tree item");
        // console.log(item);
        this._treeList.splice(this._treeList.indexOf(item),1);
        item.body.parentElement.removeChild(item.body);
        item = null;
    }
    
    private dispatchDeselectLayers(details:any = this):void{
        var deselectLayer:CustomEvent = <CustomEvent>document.createEvent('CustomEvent');
        deselectLayer.initCustomEvent(Layer.DESELECT, true, true, details);
        // console.log("dispatch deselect layers");
        // console.log(this.body);
        this.body.dispatchEvent(deselectLayer);
    }
}