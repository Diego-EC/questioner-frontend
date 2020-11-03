import React, { useContext } from "react";
import { Context } from "../store/app-context";

function setHeaders() {
	const accessToken = localStorage.getItem("accessToken");
	let headers = {};
	if (accessToken === null) {
		headers = { "Content-Type": "application/json" };
	} else {
		headers = { "Content-Type": "application/json", Authorization: "Bearer " + accessToken };
	}
	return headers;
}

export async function doPostFetch(endpoint, data) {
	const headers = setHeaders();
	return await doFetch(endpoint, "POST", headers, data);
}
export async function doGetFetch(endpoint, data) {
	const headers = setHeaders();
	return await doFetch(endpoint, "GET", headers, data);
}
export async function doPutFetch(endpoint, data) {
	const headers = setHeaders();
	return await doFetch(endpoint, "PUT", headers, data);
}
export async function doDeleteFetch(endpoint, data) {
	const headers = setHeaders();
	return await doFetch(endpoint, "DELETE", headers, data);
}
async function doFetch(endpoint, method, headers, data) {
	let fetchOptions = {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	};
	// TODOs: header application/json aquí y body condicionarlo también a si
	// le paso algo en data.
	console.log("doFetch");
	console.log(endpoint);
	console.log(fetchOptions);
	return fetch(endpoint, fetchOptions)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error(response.status);
			}
		})
		.catch(error => {
			// TODO: gestionar errores: 422
			// 401 - unautorized
			alert(error);
			return null;
		});
}
