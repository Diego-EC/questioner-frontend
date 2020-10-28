import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../component/bootstrap/button";
import { Context } from "../store/app-context";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	function goToMainView() {
		history.push("/questions");
	}

	async function signIn() {
		let data = {
			email: "diegoezquerro@gmail.com",
			password: "123456"
		};

		let json = await actions.fetchLogin(data);
		if (json.status === "KO") {
			alert("Usuario no existe");
		} else {
			localStorage.setItem("accessToken", json.access_token);
			alert("Usuario correcto");
		}
		/*
		fetch("https://3000-f4686e89-3f28-4d9f-b041-346f4456ba04.ws-eu01.gitpod.io/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.status === "KO") {
					alert("Usuario no existe");
				} else {
					localStorage.setItem("accessToken", responseJson.access_token);
					alert("Usuario correcto");
				}
            });
            */
	}

	return (
		<div className="container">
			<h1 className="text-center">Questioner</h1>
			<h4 className="text-center">Where the answers live</h4>

			<form action="">
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Enter password"
						name="password"
					/>
				</div>
				<div className="form-group form-check">
					<input type="checkbox" className="form-check-input" id="check" />
					<label className="form-check-label" htmlFor="check">
						Remember me
					</label>
				</div>
				<div className="form-group">
					<Button label={"Sign in"} color={"primary"} onClick={signIn} />
				</div>
				<div className="form-group">
					<p>
						<Link to={"/create-user"}>New around here? Sign up</Link>
					</p>
					<p>
						<Link to={"/forgot-password"}>Forgot password?</Link>
					</p>
				</div>
			</form>
		</div>
	);
};
