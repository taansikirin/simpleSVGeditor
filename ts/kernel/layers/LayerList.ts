class LayerList{
	private static _instance:LayerList = new LayerList();
	private _listElementBody:HTMLElement;
	private _addBtn:Button;
	private _list: {[id:string]:Layer;} = {};
	private static _c:number = 0;
	public actualLayer:Layer;
	private _svgParser:SVGParser;
	
	constructor(){
		if(LayerList._instance){
			throw Error("LayerList instance already exists. Use getter instance to get LayerList intance.");
		}
		
		LayerList._instance = this;
	}
	
	public static get instance():LayerList{
		return LayerList._instance;
	}
	
	public init(svgParser:SVGParser):void{
		this._svgParser = svgParser;
		this._listElementBody = document.getElementById("layerListBody");
		this._listElementBody.addEventListener(Layer.DESELECT, this.deselectAllLayers.bind(this));
		var listHead:HTMLElement = document.getElementById("layerListHead");
		
		this._addBtn = new Button(this.addLayer.bind(this), "Add new layer", BtnType.layer_btn, "Add new layer");
		listHead.appendChild(this._addBtn.component);
		
		this.addLayer();
	}
	
	private addLayer():void{
		var strId:string = "layer"+(LayerList._c++);
		this._list[strId] = new Layer(strId);
		this.actualLayer = this.getLayer(strId);
		SVGStage.instance.appedToSVGStage(this.actualLayer.layerElement);
		this.showSVGcode();
	}

    private getLayer(id: string): Layer {
        return this._list[id];
    }
    
    public removeLayer(id: string): void {
		// console.log("remove layer");
		if(Object.keys(this._list).length > 1){
			var layerToRemove:Layer = this.getLayer(id);
			layerToRemove.onLayerRemove();
	        layerToRemove.layerElement.parentElement.removeChild(layerToRemove.layerElement);
	        SVGStage.instance.removeChildClass(layerToRemove);
	        delete this._list[id];
		}else{
			var lastLayer:Layer = this.getLayer(id);
			this.actualLayer = lastLayer;
			var toRem:Array<ElementBase> = [];
			lastLayer.elementsList.forEach(el =>{
				toRem.push(el);
			});
			
			var self = this;
			toRem.forEach(remEl =>{
				self.removeElement(lastLayer, remEl, false);
			});
		}
		this.showSVGcode();
    }
	
	public addLayerItem(item:LayerItem):void{
		this._listElementBody.appendChild(item.body);	
	}
	
	public deselectAllLayers(e:CustomEvent):void{
		for(var layerId in this._list){
			if(layerId != e.detail) this.getLayer(layerId).deselect();
		}
	}
	
    public removeElements(selector: ERemove): void {
        // console.log("remove elements "+selector);
        for (var key in this._list) {
            var layer: Layer = <Layer>this._list[key];
			var toRem:Array<ElementBase> = [];
            layer.elementsList.forEach(el => {
               if (selector === ERemove.remove_selected) {
                   if (el.selected) {
					   toRem.push(el);
                    }
                } else if (selector === ERemove.remove_all) {
                    this.removeLayer(layer.id);//pokud chceme smazat uplne vse, muzeme mazat rovnou vrstvy (reference na elementy vrstvy by meli byt pouze v mazane vrstve - overit pres profilovani?).
                } else {
                    console.warn("Please select type of Polygon removal");
                }
            });
			
			if(toRem.length){
				var self = this;
				toRem.forEach(el =>{
					self.removeElement(layer,el);
				});
				toRem = [];
			}
        }
    }
    
    public removeElement(parentLayer:Layer, elementToRemove:ElementBase, callRemoveLayer:boolean = true):void{
		parentLayer.layerItem.removeTreeItem(elementToRemove.treeItem);
		parentLayer.removeElement(elementToRemove, callRemoveLayer);
		this.showSVGcode();
    }
    
	//TODO zvazit, zda misto tohoto neaktualizovat pole vybranych elementu na stagi pri vyberu elemnetu
	public getSelectedElements():Array<ElementBase>{
		var selectedElements:Array<ElementBase> = [];
		for (var key in this._list) {
            var layer: Layer = <Layer>this._list[key];
			layer.elementsList.forEach(el => {
				if(el.selected) selectedElements.push(el);
			});
		}
		return selectedElements;
	}
	
    private showSVGcode():void{
        if(this._svgParser.popup.open) this._svgParser.showCode(<SVGElement>SVGStage.instance.mainStage.cloneNode(true), 'cpstore');
    }
}