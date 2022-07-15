function generate_canvas(layer) {
	c = document.createElement("canvas");
	c.style.width='100%';
	c.style.height='100%';
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	c.style.position='absolute';
	c.style.left=0;
	c.style.top=0;
	c.style.zIndex = layer;
	document.body.appendChild(c);
	return c
}
