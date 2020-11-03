import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../component/bootstrap/button";
import { Context } from "../store/app-context";
import { doPostFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";

export const Login = () => {
	const LOGIN_ENDPOINT = "login";
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function signIn() {
		if (email == "" || password == "") {
			alert("Please, enter valid email and password.");
			return;
		}

		let data = {
			email: email,
			password: password
		};

		let json = await doPostFetch(Constant.BACKEND_ROOT + LOGIN_ENDPOINT, data);
		if (json !== null && json.status === "OK") {
			localStorage.setItem("accessToken", json.access_token);
			actions.setLoggedUserData(json.user, json.access_token);
			history.push("/questions");
		} else {
			alert("Usuario no existe");
		}
	}

	return (
		<div className="container">
			<h1 className="text-center">Questioner</h1>
			<h4 className="text-center">Where the answers live</h4>

			<form action="">
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Enter email"
						name="email"
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Enter password"
						name="password"
						onChange={e => setPassword(e.target.value)}
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
