class HorizontalContainer extends ComponentBase{
	public component:HTMLElement;
	constructor(label:string, component:ComponentBase){
		super();
		this.component = document.createElement("div");
		this.component.className = 'horizontal-container';
		
		var labelElement:HTMLElement = document.createElement("div");
		labelElement.className = 'horizontal-container-label';
		labelElement.innerHTML = label;
		
		component.component.style.cssFloat = "right";
		
		this.component.appendChild(labelElement);
		this.component.appendChild(component.component);
	}
}