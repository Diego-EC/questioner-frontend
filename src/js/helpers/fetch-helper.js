// TODO: alias
function doPostFetch(endpoint, headers, data){
    doFetch(endpoint, "POST", headers, data);
};
function doFetch(endpoint, method, headers, data){
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
                return response.json();
            } else {
                throw Error(response.status);
            }
        })
        .catch(error => {
            // TODO: gestionar errores: 422
            alert(error);
            return null;
        });
};
        