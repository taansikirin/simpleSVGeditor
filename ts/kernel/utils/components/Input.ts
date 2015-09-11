class Input extends ComponentBase{
	
	public component:HTMLInputElement;
	
	constructor(private _handler:IComponentHandler, placeHolder:string, title:string = '', defaultValue?:string){
		super();
		this.component = document.createElement("input");
		this.component.type = "text";
		this.component.className = 'input';
		if (this._handler) this.component.addEventListener("input", this._handler);
		this.component.placeholder = placeHolder;
		if(title != undefined || title != '') this.component.title = title;
		if(defaultValue) this.component.defaultValue = defaultValue;
	}
	
	public enable():void{
		this.component.removeEventListener("input", this._handler);
		if (this._handler) this.component.addEventListener("input", this._handler);
		this.component.removeAttribute("disabled");
		this.component.style.opacity = '1';
	}
	
	public disable():void{
		this.component.removeEventListener("input", this._handler);
		this.component.setAttribute("disabled", "disabled");
		this.component.style.opacity = '0.5';
	}
	
	public get value():string{
		return this.component.value;
	}
}