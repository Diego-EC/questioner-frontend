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

		await doPostFetch(Constant.BACKEND_ROOT + LOGIN_ENDPOINT, data)
			.then(json => {
				if (json.status === "OK") {
					localStorage.setItem("accessToken", json.access_token);
					actions.setLoggedUserData(json.user, json.access_token);
					history.push("/questions");
				}
			})
			.catch(response => {
				alert("No ha sipo posible realizar el Login");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	let buttonLoginHTML = "";
	let textSingUpHTML = "";
	if (loading === true) {
		buttonLoginHTML = <Button color={"q-primary"} isDisabled={true} hasSpinner={true} />;
		textSingUpHTML = "";
	} else {
		buttonLoginHTML = (
			<Button label={"Sign in"} color={"q-primary"} onClick={signIn} isDisabled={false} hasSpinner={false} />
		);
		textSingUpHTML = <Link to={"/create-user"}>New around here? Sign up</Link>;
	}

	return (
		<div className="container bg-q-secondary border-q-default shadow-sm mt-4 p-3">
			<div className="">
				<h1 className="text-center">Questioner</h1>
				<h4 className="text-center">Where the answers live</h4>
			</div>

			<div className="row">
				<div className="col-3"></div>
				<div className="col-6">
					<form action="">
						<div className="form-group mt-5">
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
						<div className="form-group mt-4">
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
						<div className="form-group mt-5">{buttonLoginHTML}</div>
						<div className="form-group mt-5">
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
				<div className="col-3"></div>
			</div>
		</div>
	);
};
