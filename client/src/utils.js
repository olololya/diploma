

export function updateBindings(component, functions) {
	functions.forEach((func) => {
		component[func] = component[func].bind(component);
	});
}

export function refSaver(ref, name) {
	this[name] = ref;
}
