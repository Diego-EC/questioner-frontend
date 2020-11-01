import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const CheckProtected = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    let responseJson = await actions.fetchCheckProtected();
    if (responseJson.status !== undefined && responseJson.status === "OK") {
        alert("Usuario correcto");
        setLoading(false);
    } else {
        alert("Usuario no existe");
        history.push("/");
    }
        
	if (loading == true) {
		return "Loading...";
	}
}