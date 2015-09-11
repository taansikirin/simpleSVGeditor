enum BtnType{
	small_draw,
	small_edit,
	layer_btn,
	layer_item,
	tree_item,
	long
}

class Button extends ComponentBase{
	public component:HTMLButtonElement;
	
	constructor(private _handler:IComponentHandler, title:string = '', type:BtnType = BtnType.small_draw, label:string = '', img:string = ''){
		super();
		this.component = document.createElement("button");
		if (this._handler) this.component.addEventListener("click", this._handler);
		if(title != ''){
			this.component.title = title;
		}
		switch(type){
			case BtnType.tree_item:
				this.component.className = 'tree-btn';
				break;
			case BtnType.layer_item:
				this.component.className = 'layer-item-btn';
				break;
			case BtnType.layer_btn:
				this.component.className = 'layer-btn';
				break;
			case BtnType.small_edit:
				this.component.className = 'small-btn manage-btn';
				break;
			case BtnType.small_draw:
				this.component.className = 'small-btn draw-btn';
				break;
			case BtnType.long:
				this.component.className = 'long-btn';
				break;
			default:
				this.component.className = 'small-btn';
				break;
		}
		this.component.classList.add('btn');
		
		if(label != ''){
			this.component.innerHTML = label;
		}
		if(img != ''){
			this.component.style.backgroundImage = 'url('+img+')';
			this.component.style.backgroundSize = 'cover';
			this.component.style.backgroundRepeat = "norepeat";
		}
	}
	
	public enable():void{
		this.component.removeEventListener("click", this._handler);
		if (this._handler) this.component.addEventListener("click", this._handler);
		this.component.style.opacity = '1';
	}
	
	public disable():void{
		this.component.removeEventListener("click", this._handler);
		this.component.style.opacity = '0.5';
	}
}