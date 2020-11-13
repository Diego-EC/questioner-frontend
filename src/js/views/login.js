import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../component/bootstrap/button";
import { Context } from "../store/app-context";
import { doPostFetch } from "../helpers/fetch-helper";
import * as Constant from "../helpers/constants";
import { Modal } from "../component/bootstrap/modal";

export const Login = () => {
	const LOGIN_ENDPOINT = "login";
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function signIn() {
		if (email == "" || password == "") {
			$("#unfilledFields").modal({ show: true, keyboard: false, backdrop: "static" });
			return;
		}

		setLoading(true);

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
			$("#userDontExist").modal({ show: true, keyboard: false, backdrop: "static" });
		}
		setLoading(false);
	}

	let buttonLoginHTML = "";
	let textSingUpHTML = "";
	if (loading === true) {
		buttonLoginHTML = (
			<button className="btn btn-primary" type="button" disabled>
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				<span> Loading...</span>
			</button>
		);
		textSingUpHTML = "";
	} else {
		buttonLoginHTML = <Button label={"Sign in"} color={"primary"} onClick={signIn} />;
		textSingUpHTML = <Link to={"/create-user"}>New around here? Sign up</Link>;
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
						defaultValue={email}
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
						defaultValue={password}
					/>
				</div>
				{/*// TODO: cambia la duración del token
				<div className="form-group form-check">
					<input
						type="checkbox"
						className="form-check-input"
						id="check"
						onClick={e => setRememberMe(e.target.checked)}
						defaultChecked={rememberMe}
					/>
					<label className="form-check-label" htmlFor="check">
						Remember me
                    </label>
				</div>
                */}
				<div className="form-group">{buttonLoginHTML}</div>
				<div className="form-group">
					<p>{textSingUpHTML}</p>
				</div>
				<div>
					<Modal
						id={"unfilledFields"}
						title={"Data Validation Error"}
						text={"Please, enter valid email and password"}
					/>
					<Modal id={"userDontExist"} title={"User Validation Error"} text={"User does not exist"} />
				</div>
			</form>
		</div>
	);
};
