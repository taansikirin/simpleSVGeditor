class Stepper extends ComponentBase{
	
	public component:HTMLInputElement;
	
	constructor(private _handler:IComponentHandler, title:string = '', defaultValue?:number, step?:number, min?:number, max?:number){
		super();
		this.component = document.createElement("input");
		this.component.type = "number";
		this.component.className = 'stepper';
		if (this._handler) this.component.addEventListener("input", this._handler);
		if(title != undefined || title != '') this.component.title = title;
		if(defaultValue != undefined) this.component.value = String(defaultValue);
		if(step != undefined) this.component.step = String(step);
		if(min != undefined) this.component.min = String(min);
		if(max != undefined) this.component.max = String(max);
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
	
	public get value():number{
		return Number(this.component.value);
	}
}