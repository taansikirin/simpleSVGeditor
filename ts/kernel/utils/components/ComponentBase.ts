interface IComponentHandler{
	():void;
}

class ComponentBase{
	public component:any;
	constructor(){}
	public enable():void{}
	public disable():void{}
}