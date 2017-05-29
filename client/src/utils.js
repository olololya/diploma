

export function updateBindings(component, functions) {
	functions.forEach((func) => {
		component[func] = component[func].bind(component);
	});
}

export function refSaver(ref, name) {
	this[name] = ref;
}

export function createAction (store, action, typeAction, data) {
    const newAction = Object.assign({}, action, {
        type: typeAction,
        payload: data
    });
    store.dispatch(newAction);
}
