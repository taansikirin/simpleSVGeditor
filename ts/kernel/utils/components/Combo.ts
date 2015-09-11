class Combo extends ComponentBase{
	
	public component:HTMLElement;
	private _combo:HTMLInputElement;
	
	constructor(private _handler:IComponentHandler, listId:string, valueList:Array<string>, placeHolder:string, title:string = '', defaultValue?:string){
		super();
		
		this.component = document.createElement("div");
		
		var dataList:HTMLDataListElement = document.createElement("datalist");
		dataList.id = listId;
		valueList.forEach(value => {
			var option:HTMLOptionElement = document.createElement("option");
			option.value = value;
			dataList.appendChild(option);
		});
		this._combo = document.createElement("input");
		this._combo.type = "text";
		// this._combo.list = dataList; //does not work
		this._combo.setAttribute("list",dataList.id);
		this._combo.className = 'input';
		this._combo.style.width = "100%";
		if (this._handler) this._combo.addEventListener("input", this._handler);
		this._combo.placeholder = placeHolder;
		if(title != undefined || title != '') this._combo.title = title;
		if(defaultValue) this._combo.defaultValue = defaultValue;
		
		this.component.appendChild(this._combo);
		this.component.appendChild(dataList);
	}
	
	public enable():void{
		this._combo.removeEventListener("input", this._handler);
		if (this._handler) this._combo.addEventListener("input", this._handler);
		this._combo.removeAttribute("disabled");
		this._combo.style.opacity = '1';
	}
	
	public disable():void{
		this._combo.removeEventListener("input", this._handler);
		this._combo.setAttribute("disabled", "disabled");
		this._combo.style.opacity = '0.5';
	}
	
	public get value():string{
		return this._combo.value;
	}
}