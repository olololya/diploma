import getConfig from './middelwares/config';

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
        payload: data,
        url: null
    });
    store.dispatch(newAction);
}

export function saveToLocalStorage(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || null;
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}


export function getFromUrl(url) {
    return fetch(url, getConfig())
        .then((res) => res.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getFromUrlGET(url) {
    return fetch(url)
        .then((res) => res.json())
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getFromUrlWithBody(url, body) {
    return fetch(url, getConfig(body))
        .then((res) => res.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getUsersMessagers(id) {
    const url = `http://localhost:3000/users/messages/${id}`;

    return fetch(url, getConfig(id))
        .then((res) => res.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
