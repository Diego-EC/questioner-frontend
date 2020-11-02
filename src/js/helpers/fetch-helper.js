// TODO: quitar headers, se puede condicionar el de autenticación a tener el token en flux
export async function doPostFetch(endpoint, headers, data) {
	return await doFetch(endpoint, "POST", headers, data);
}
export async function doGetFetch(endpoint, headers, data) {
	return await doFetch(endpoint, "GET", headers, data);
}
export async function doPutFetch(endpoint, headers, data) {
	return await doFetch(endpoint, "PUT", headers, data);
}
export async function doDeleteFetch(endpoint, headers, data) {
	return await doFetch(endpoint, "DELETE", headers, data);
}
async function doFetch(endpoint, method, headers, data) {
	console.log("doFetch - INI");
	let fetchOptions = {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	};
	// TODOs: header application/json aquí y body condicionarlo también a si
	// le paso algo en data.
	console.log("fetch");
	console.log(endpoint);
	console.log(fetchOptions);
	return fetch(endpoint, fetchOptions)
		.then(response => {
			if (response.ok) {
				console.log("doFetch - OK");
				return response.json();
			} else {
				console.log("doFetch - ELSE");
				throw Error(response.status);
			}
		})
		.catch(error => {
			// TODO: gestionar errores: 422
			// 401 - unautorized
			alert(error);
			return null;
		});
	console.log("doFetch - FIN");
}
